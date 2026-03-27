/**
 * Runtime API: jsxDEV
 *
 * Demonstrates using jsxDEV() for development mode, which includes
 * source location metadata for debugging. This is the development-mode
 * counterpart to jsx/jsxs.
 * Run with: deno run --allow-read examples/runtime/jsxdev.ts
 *
 * @module
 */

import { Fragment, jsxDEV } from "@ggpwnkthx/jsx";
import { print } from "../shared.ts";

function DevButton({ label }: { label: string }) {
  return jsxDEV(
    "button",
    {
      className: "dev-button",
      children: [label],
    },
    null,
    false,
    {
      fileName: "file:///examples/runtime/jsxdev.ts",
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
          fileName: "file:///examples/runtime/jsxdev.ts",
          lineNumber: 28,
          columnNumber: 8,
        }, undefined),
        jsxDEV(
          "p",
          { key: "desc", children: ["Debug info is included in VNodes"] },
          null,
          false,
          {
            fileName: "file:///examples/runtime/jsxdev.ts",
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
            fileName: "file:///examples/runtime/jsxdev.ts",
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
      fileName: "file:///examples/runtime/jsxdev.ts",
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
          fileName: "file:///examples/runtime/jsxdev.ts",
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
        },
        null,
        false,
        {
          fileName: "file:///examples/runtime/jsxdev.ts",
          lineNumber: 41,
          columnNumber: 5,
        },
        undefined,
      ),
      jsxDEV(DevInfoPanel, { key: "panel", title: "Info" }, null, false, {
        fileName: "file:///examples/runtime/jsxdev.ts",
        lineNumber: 42,
        columnNumber: 5,
      }, undefined),
    ],
  },
  null,
  true,
  { fileName: "file:///examples/runtime/jsxdev.ts", lineNumber: 39, columnNumber: 1 },
  undefined,
);

print("jsxDEV VNode with source info:", vnode);
