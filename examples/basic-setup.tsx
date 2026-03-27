/**
 * Basic Setup Example
 *
 * Demonstrates minimal JSX usage with this runtime library.
 * Run with: deno run --allow-read examples/basic-setup.tsx
 *
 * @module
 */

import { jsx } from "@ggpwnkthx/jsx";

const write = (s: string) =>
  Deno.stdout.writeSync(new Uint8Array([...s].map((c) => c.charCodeAt(0))));

const print = (label: string, data: unknown) => {
  write(`${label}\n${Deno.inspect(data, { colors: false, depth: Infinity })}\n`);
};

function Greeting({ name }: { name: string }) {
  return jsx("div", { children: [`Hello, ${name}!`] }, null);
}

function App() {
  return jsx(
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
}

const vnode = jsx(App, null, null);
print("Basic VNode:", vnode);
