/**
 * End-to-end TSX authoring test using deno.json jsxImportSource.
 * @module
 */

import { assertEquals } from "@std/assert";

function Badge(props: { label: string }) {
  return <span>{props.label}</span>;
}

Deno.test("TSX authoring works with the package runtime", () => {
  const vnode = (
    <section id="app">
      <Badge label="ready" />
      {1}
      {false}
      {"!"}
    </section>
  );

  assertEquals(vnode.kind, "element");
  assertEquals(vnode.type, "section");
  assertEquals(vnode.props, { id: "app" });
  assertEquals(vnode.children.length, 3);
  assertEquals(vnode.children[0].kind, "element");
  assertEquals(vnode.children[0].type, "span");
  assertEquals(vnode.children[0].children[0].type, "ready");
  assertEquals(vnode.children[1].kind, "text");
  assertEquals(vnode.children[1].type, "1");
  assertEquals(vnode.children[2].kind, "text");
  assertEquals(vnode.children[2].type, "!");
});
