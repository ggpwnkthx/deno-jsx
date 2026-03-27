import type { Plugin } from "@opencode-ai/plugin";

const MAX_CONTEXT_FILES = 5;

type LogLevel = "debug" | "info" | "warn" | "error";

export const CodeGradePromptPlugin: Plugin = async (
  { client, worktree },
) => {
  let changed = false;
  let running = false;
  let lastEditedPath: string | null = null;

  const log = async (
    level: LogLevel,
    message: string,
    extra?: Record<string, unknown>,
  ) => {
    await client.app.log({
      body: {
        service: "code-grade-prompt",
        level,
        message,
        extra,
      },
    });
  };

  const runReview = async () => {
    if (running) return;
    running = true;

    try {
      const changedFiles = await getChangedFiles(log, worktree);
      if (changedFiles.length === 0) {
        await log("debug", "No changed files found for grading");
        return;
      }

      const primaryFile =
        lastEditedPath && changedFiles.includes(lastEditedPath)
          ? lastEditedPath
          : changedFiles[0];

      const contextFiles = prioritizeFiles(primaryFile, changedFiles).slice(
        0,
        MAX_CONTEXT_FILES,
      );

      const prompt = buildReviewPrompt(primaryFile, contextFiles);

      await client.tui.appendPrompt({
        body: {
          text: prompt,
        },
      });

      await client.tui.submitPrompt();

      await log("info", "Submitted code grade review prompt", {
        primaryFile,
        contextFiles,
      });

      changed = false;
      lastEditedPath = null;
    } catch (error) {
      await log("error", "Failed to submit code grade prompt", {
        error: error instanceof Error ? error.message : String(error),
      });
    } finally {
      running = false;
    }
  };

  return {
    event: async ({ event }) => {
      if (event.type === "file.edited") {
        changed = true;
        lastEditedPath = extractEditedPath(event);
      }

      if (event.type === "session.idle" && changed) {
        await runReview();
      }
    },
  };
};

function extractEditedPath(event: unknown): string | null {
  if (!event || typeof event !== "object") return null;

  const e = event as Record<string, unknown>;
  if (e.type !== "file.edited") return null;

  const properties = e.properties as { file: string } | undefined;
  if (!properties?.file) return null;

  return properties.file;
}

async function getChangedFiles(
  log: (
    level: LogLevel,
    message: string,
    extra?: Record<string, unknown>,
  ) => Promise<void>,
  worktree: string,
): Promise<string[]> {
  const commands = [
    ["git", "diff", "--name-only", "--diff-filter=ACMR"],
    ["git", "diff", "--cached", "--name-only", "--diff-filter=ACMR"],
    ["git", "ls-files", "--others", "--exclude-standard"],
  ];

  const files = new Set<string>();

  for (const cmd of commands) {
    const proc = Bun.spawn({
      cmd: [cmd[0], ...cmd.slice(1)],
      cwd: worktree,
      stdout: "pipe",
      stderr: "pipe",
    });

    const [stdout, stderr, exitCode] = await Promise.all([
      proc.stdout ? new Response(proc.stdout).text() : Promise.resolve(""),
      proc.stderr ? new Response(proc.stderr).text() : Promise.resolve(""),
      proc.exited,
    ]);

    if (exitCode !== 0) {
      await log("warn", `Git command failed: ${cmd.join(" ")}`, {
        exitCode,
        stderr: stderr.slice(0, 500),
      });
      continue;
    }

    for (const line of stdout.split(/\r?\n/)) {
      const file = line.trim();
      if (!file) continue;
      if (isReviewableFile(file)) {
        files.add(file);
      }
    }
  }

  return [...files].sort();
}

function prioritizeFiles(primaryFile: string, files: string[]): string[] {
  const unique = [...new Set(files)];
  const withoutPrimary = unique.filter((file) => file !== primaryFile);
  return [primaryFile, ...withoutPrimary];
}

function isReviewableFile(path: string): boolean {
  const normalized = path.replaceAll("\\", "/");

  if (
    normalized.startsWith(".git/") ||
    normalized.startsWith("node_modules/") ||
    normalized.startsWith("dist/") ||
    normalized.startsWith("build/") ||
    normalized.startsWith(".opencode/") ||
    normalized.includes("/node_modules/") ||
    normalized.includes("/dist/") ||
    normalized.includes("/build/")
  ) {
    return false;
  }

  return /\.(ts|tsx|js|jsx|mts|cts|mjs|cjs|go|rs|py|java|kt|swift|php|rb|cs)$/
    .test(
      normalized,
    );
}

function buildReviewPrompt(
  primaryFile: string,
  contextFiles: string[],
): string {
  const referencedFiles = contextFiles.map((file) => `@${file}`).join(" ");
  const secondaryFiles = contextFiles.filter((file) => file !== primaryFile);

  const secondarySection = secondaryFiles.length === 0
    ? "- No additional changed-file context."
    : secondaryFiles.map((file) => `- @${file}`).join("\n");

  return [
    "Perform a strict code-quality review of the changed code.",
    "",
    `Primary file to grade: @${primaryFile}`,
    "",
    contextFiles.length > 0
      ? `Changed-file context: ${referencedFiles}`
      : "Changed-file context: none",
    "",
    "Review instructions:",
    "- Be fairly critical.",
    "- Focus primarily on the primary file, but use the other changed files as supporting context when relevant.",
    "- Inspect the current diff for the primary file before grading.",
    "- Do not make code changes. Review only.",
    "- Do not be nice for the sake of being nice.",
    "- Treat B+ as the minimum acceptable bar.",
    "- Any category below B+ must be addressed.",
    "- Any overall grade below B+ must be addressed.",
    "- Call out specific symbols, code paths, and complexity hot spots.",
    "- Flag memory-risk patterns such as whole-payload reads, unnecessary buffering, missing pagination/cursors, and avoidable O(n^2) scans.",
    "- Flag missing centralized validation for HTTP input, params, env, files, and parsed JSON.",
    "- Flag weak typing at boundaries: domain entities, config, external I/O, and errors.",
    "- Flag poor modularity, duplication, poor folder placement, or code that does not look production-grade.",
    "",
    "Grade these categories using letter grades:",
    "1. DRY / modularity / clear folder boundaries",
    "2. Memory safety / streaming / chunking / pagination / complexity awareness",
    "3. Validation of untrusted input / fail-fast typed errors",
    "4. Strong typing for entities, boundaries, config, and errors",
    "",
    "Use this exact output structure:",
    "",
    "## Overall grade",
    "- Grade: <A+|A|A-|B+|B|B-|C+|C|C-|D|F>",
    "- Verdict: <1-3 sentences>",
    "",
    "## Category grades",
    "- DRY / modularity / folders: <grade>",
    "- Memory safety / complexity: <grade>",
    "- Validation / typed failures: <grade>",
    "- Strong typing / interfaces: <grade>",
    "",
    "## What is good",
    "- <bullets>",
    "",
    "## What is weak",
    "- <bullets>",
    "",
    "## Must address before merge",
    "- Include this section if ANY category or the overall grade is below B+.",
    "- Be concrete and prioritized.",
    "",
    "## Complexity and memory hot spots",
    "- <bullets>",
    "",
    "## Suggested next edits",
    "- <small, concrete changes>",
    "",
    "Secondary changed files:",
    secondarySection,
  ].join("\n");
}
