/**
 * Intrinsic Elements Example
 *
 * Demonstrates using HTML elements with various props.
 * Run with: deno run --allow-read examples/intrinsic-elements.tsx
 *
 * @module
 */

import { jsx } from "@ggpwnkthx/jsx";

const write = (s: string) =>
  Deno.stdout.writeSync(new Uint8Array([...s].map((c) => c.charCodeAt(0))));

const print = (label: string, data: unknown) => {
  write(`${label}\n${Deno.inspect(data, { colors: false, depth: Infinity })}\n`);
};

const vnode = jsx(
  "div",
  {
    id: "container",
    className: "main-wrapper",
    "data-active": true,
    children: [
      jsx("h1", { className: "title", children: ["My Page"] }, null),
      jsx("p", {
        children: [
          "A paragraph with ",
          jsx("strong", { children: ["bold"] }, null),
          " text.",
        ],
      }, null),
      jsx("ul", {
        children: [
          jsx("li", { key: "1", children: ["Item one"] }, null),
          jsx("li", { key: "2", children: ["Item two"] }, null),
          jsx("li", { key: "3", children: ["Item three"] }, null),
        ],
      }, null),
      jsx("button", {
        disabled: false,
        onClick: () => write("clicked!\n"),
        children: ["Click me"],
      }, null),
    ],
  },
  null,
);

print("Intrinsic Elements VNode:", vnode);
