/**
 * jsxDEV Example
 *
 * Demonstrates using jsxDEV for development mode, which includes
 * source location metadata for debugging.
 * Run with: deno run --allow-read examples/jsxdev-example.tsx
 *
 * @module
 */

import { Fragment, jsxDEV } from "@ggpwnkthx/jsx";

const write = (s: string) =>
  Deno.stdout.writeSync(new Uint8Array([...s].map((c) => c.charCodeAt(0))));

const print = (label: string, data: unknown) => {
  write(`${label}\n${Deno.inspect(data, { colors: false, depth: Infinity })}\n`);
};

function DevButton({ label, onClick }: { label: string; onClick: () => void }) {
  return jsxDEV(
    "button",
    {
      className: "dev-button",
      onClick,
      children: [label],
    },
    null,
    false,
    {
      fileName: "file:///examples/jsxdev-example.tsx",
      lineNumber: 14,
      columnNumber: 12,
    },
    undefined,
  );
}

function DevInfoPanel({ title }: { title: string }) {
  return jsxDEV(
    "div",
    {
      className: "info-panel",
      children: [
        jsxDEV("h2", { key: "title", children: [title] }, null, false, {
          fileName: "file:///examples/jsxdev-example.tsx",
          lineNumber: 28,
          columnNumber: 8,
        }, undefined),
        jsxDEV(
          "p",
          { key: "desc", children: ["Debug info is included in VNodes"] },
          null,
          false,
          {
            fileName: "file:///examples/jsxdev-example.tsx",
            lineNumber: 29,
            columnNumber: 8,
          },
          undefined,
        ),
        jsxDEV(
          Fragment,
          { key: "frag", children: ["Source location data"] },
          null,
          false,
          {
            fileName: "file:///examples/jsxdev-example.tsx",
            lineNumber: 30,
            columnNumber: 8,
          },
          undefined,
        ),
      ],
    },
    "info-panel-key",
    true,
    {
      fileName: "file:///examples/jsxdev-example.tsx",
      lineNumber: 27,
      columnNumber: 5,
    },
    undefined,
  );
}

const vnode = jsxDEV(
  "main",
  {
    children: [
      jsxDEV(
        "h1",
        { key: "header", children: ["Development Mode Demo"] },
        null,
        false,
        {
          fileName: "file:///examples/jsxdev-example.tsx",
          lineNumber: 40,
          columnNumber: 5,
        },
        undefined,
      ),
      jsxDEV(
        DevButton,
        {
          key: "btn1",
          label: "Click Me",
          onClick: () => write("button clicked!\n"),
        },
        null,
        false,
        {
          fileName: "file:///examples/jsxdev-example.tsx",
          lineNumber: 41,
          columnNumber: 5,
        },
        undefined,
      ),
      jsxDEV(DevInfoPanel, { key: "panel", title: "Info" }, null, false, {
        fileName: "file:///examples/jsxdev-example.tsx",
        lineNumber: 42,
        columnNumber: 5,
      }, undefined),
    ],
  },
  null,
  true,
  { fileName: "file:///examples/jsxdev-example.tsx", lineNumber: 39, columnNumber: 1 },
  undefined,
);

print("jsxDEV VNode with source info:", vnode);
