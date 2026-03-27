/**
 * Child Normalization Example
 *
 * Demonstrates how different child types are handled in JSX:
 * - strings/numbers become text VNodes
 * - null, undefined, booleans are filtered out
 * - arrays are flattened recursively
 * Run with: deno run --allow-read examples/children.tsx
 *
 * @module
 */

import { print } from "./shared.ts";

function Show({ condition, children }: { condition: boolean; children: unknown }) {
  return condition ? <>{children}</> : null;
}

function List({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

function MixedChildren() {
  return (
    <div>
      Plain string
      {42}
      {null}
      {undefined}
      {true}
      {false}
      {["nested array", "items"]}
      <strong>JSX element</strong>
      Fragment children
    </div>
  );
}

function ConditionalRendering() {
  const user = { name: "Alice", active: true, admin: false };
  return (
    <section>
      <h1>{user.name}</h1>
      <Show condition={user.active}>User is active</Show>
      <Show condition={user.admin}>Admin</Show>
      <Show condition={!user.active}>User is offline</Show>
    </section>
  );
}

const mixedVnode = <MixedChildren />;
const conditionalVnode = <ConditionalRendering />;
const listVnode = <List items={["Apple", "Banana", "Cherry"]} />;

print("Mixed Children (null/boolean filtering):", mixedVnode);
print("Conditional Rendering:", conditionalVnode);
print("List Items:", listVnode);
