/**
 * Child Normalization Example
 *
 * Demonstrates how different child types are normalized:
 * - strings/numbers become text VNodes
 * - null, undefined, booleans are filtered out
 * - arrays are flattened recursively
 * - nested JSX is evaluated
 * Run with: deno run --allow-read examples/children.tsx
 *
 * @module
 */

import { Fragment, jsx } from "@ggpwnkthx/jsx";

const write = (s: string) =>
  Deno.stdout.writeSync(new Uint8Array([...s].map((c) => c.charCodeAt(0))));

const print = (label: string, data: unknown) => {
  write(`${label}\n${Deno.inspect(data, { colors: false, depth: Infinity })}\n`);
};

function Show({ condition, children }: { condition: boolean; children: unknown }) {
  return condition ? jsx(Fragment, { children: [children] }, null) : null;
}

function List({ items }: { items: string[] }) {
  return jsx(
    "ul",
    {
      children: items.map((item, i) => jsx("li", { key: i, children: [item] }, null)),
    },
    null,
  );
}

function MixedChildren() {
  return jsx(
    "div",
    {
      children: [
        "Plain string",
        42,
        null,
        undefined,
        true,
        false,
        ["nested array", "items"],
        jsx("strong", { children: ["JSX element"] }, null),
        jsx(Fragment, { children: ["Fragment children"] }, null),
      ],
    },
    null,
  );
}

function ConditionalRendering() {
  const user = { name: "Alice", active: true, admin: false };
  return jsx(
    "section",
    {
      children: [
        jsx("h1", { key: "name", children: [user.name] }, null),
        jsx(
          Show,
          { key: "status", condition: user.active, children: "User is active" },
          null,
        ),
        jsx(
          Show,
          { key: "admin-badge", condition: user.admin, children: "Admin" },
          null,
        ),
        jsx(Show, {
          key: "offline",
          condition: !user.active,
          children: "User is offline",
        }, null),
      ],
    },
    null,
  );
}

const mixedVnode = jsx(MixedChildren, null, null);
const conditionalVnode = jsx(ConditionalRendering, null, null);
const listVnode = jsx(List, { items: ["Apple", "Banana", "Cherry"] }, null);

print("Mixed Children (notice null/boolean filtering):", mixedVnode);
print("Conditional Rendering:", conditionalVnode);
print("List Items:", listVnode);
