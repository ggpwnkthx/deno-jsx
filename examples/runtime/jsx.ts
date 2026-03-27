/**
 * Runtime API: jsx and jsxs
 *
 * Demonstrates manual usage of the jsx() and jsxs() runtime functions.
 * These are the core functions that TSX syntax compiles to.
 * Run with: deno run --allow-read examples/runtime/jsx.ts
 *
 * @module
 */

import { jsx, jsxs } from "@ggpwnkthx/jsx";
import { print } from "../shared.ts";

function Greeting({ name }: { name: string }) {
  return jsx("div", { children: [`Hello, ${name}!`] }, null);
}

const vnode1 = jsx(
  "main",
  {
    children: [
      jsx("h1", { children: ["Welcome"] }, null),
      jsx(Greeting, { name: "Deno" }, null),
      jsx(Greeting, { name: "World" }, null),
    ],
  },
  null,
);

const vnode2 = jsxs(
  "section",
  {
    children: [
      jsx("p", { children: ["Static children are compiled to jsxs"] }, null),
      jsx("p", { children: ["Both produce identical VNodes"] }, null),
    ],
  },
  null,
);

print("jsx() creates an element VNode:", vnode1);
print("jsxs() is equivalent for static children:", vnode2);
