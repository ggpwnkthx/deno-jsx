/**
 * Fragments Example
 *
 * Demonstrates Fragment usage and keyless vs keyed fragment behavior.
 * - Keyless fragments are flattened into parent children
 * - Keyed fragments are preserved as wrappers
 * Run with: deno run --allow-read examples/fragments.tsx
 *
 * @module
 */

import { createFragment, Fragment, jsx } from "@ggpwnkthx/jsx";

const write = (s: string) =>
  Deno.stdout.writeSync(new Uint8Array([...s].map((c) => c.charCodeAt(0))));

const print = (label: string, data: unknown) => {
  write(`${label}\n${Deno.inspect(data, { colors: false, depth: Infinity })}\n`);
};

function KeylessFragmentDemo() {
  return jsx(
    "div",
    {
      children: [
        jsx(Fragment, { children: ["First ", "Second ", "Third"] }, null),
      ],
    },
    null,
  );
}

function KeyedFragmentDemo() {
  return jsx(
    "div",
    {
      children: [
        jsx(Fragment, { children: ["Keyed First", "Keyed Second"] }, "my-key"),
      ],
    },
    null,
  );
}

function TableRow({ cells }: { cells: string[] }) {
  return jsx(
    "tr",
    {
      children: [
        jsx(Fragment, {
          children: cells.map((c, i) => jsx("td", { key: i, children: [c] }, null)),
        }, null),
      ],
    },
    null,
  );
}

function UsingCreateFragment() {
  const frag = createFragment([
    jsx("span", { key: "1", children: ["A"] }, null),
    jsx("span", { key: "2", children: ["B"] }, null),
    jsx("span", { key: "3", children: ["C"] }, null),
  ]);
  return jsx("div", { children: [frag] }, null);
}

const keylessVnode = jsx(KeylessFragmentDemo, null, null);
const keyedVnode = jsx(KeyedFragmentDemo, null, null);
const tableRowVnode = jsx(TableRow, { cells: ["Cell 1", "Cell 2", "Cell 3"] }, null);
const createFragVnode = jsx(UsingCreateFragment, null, null);

print("Keyless Fragment (flattened):", keylessVnode);
print("Keyed Fragment (preserved):", keyedVnode);
print("Table Row with Fragment:", tableRowVnode);
print("createFragment helper:", createFragVnode);
