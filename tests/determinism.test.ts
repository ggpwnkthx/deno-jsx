/**
 * Unit tests for determinism and serialization of vnodes.
 * @module
 */

import { assertEquals } from "@std/assert";
import { createElementVNode, createTextVNode } from "@ggpwnkthx/jsx";

Deno.test("vnode serialization - vnodes are plain objects", () => {
  const vnode = createElementVNode("div", { class: "test" }, "key", [
    createTextVNode("hello"),
  ]);
  const serialized = JSON.parse(JSON.stringify(vnode));
  assertEquals(serialized.kind, "element");
  assertEquals(serialized.type, "div");
  assertEquals(serialized.props.class, "test");
  assertEquals(serialized.key, "key");
  assertEquals(serialized.children[0].type, "hello");
});
