/**
 * Tests for low-level vnode creation helpers.
 * @module
 */

import { assertEquals, assertStrictEquals } from "@std/assert";
import {
  createComponentVNode,
  createElementVNode,
  createFragmentVNode,
  createTextVNode,
  Fragment,
  isComponentVNode,
  isElementVNode,
  isFragmentVNode,
  isTextVNode,
} from "../src/mod.ts";

Deno.test("createElementVNode creates the canonical element shape", () => {
  const vnode = createElementVNode("div", { id: "root" }, "k1", [
    createTextVNode("hello"),
  ]);

  assertEquals(vnode.kind, "element");
  assertEquals(vnode.type, "div");
  assertEquals(vnode.props, { id: "root" });
  assertEquals(vnode.key, "k1");
  assertEquals(vnode.children.length, 1);
  assertEquals(vnode.children[0].type, "hello");
});

Deno.test("createTextVNode creates the canonical text shape", () => {
  const vnode = createTextVNode(42);

  assertEquals(vnode.kind, "text");
  assertEquals(vnode.type, "42");
  assertEquals(vnode.props, null);
  assertEquals(vnode.key, null);
  assertEquals(vnode.children, []);
});

Deno.test("createFragmentVNode creates the canonical fragment shape", () => {
  const child = createTextVNode("child");
  const vnode = createFragmentVNode("frag-1", [child]);

  assertEquals(vnode.kind, "fragment");
  assertStrictEquals(vnode.type, Fragment);
  assertEquals(vnode.props, null);
  assertEquals(vnode.key, "frag-1");
  assertEquals(vnode.children, [child]);
});

Deno.test("createComponentVNode creates the canonical component shape", () => {
  function Example() {
    return createTextVNode("ok");
  }

  const vnode = createComponentVNode(Example, { label: "x" }, "c1", []);

  assertEquals(vnode.kind, "component");
  assertStrictEquals(vnode.type, Example);
  assertEquals(vnode.props, { label: "x" });
  assertEquals(vnode.key, "c1");
  assertEquals(vnode.children, []);
});

Deno.test("type guards discriminate vnode variants", () => {
  function Example() {
    return createTextVNode("ok");
  }

  assertEquals(isElementVNode(createElementVNode("div", null)), true);
  assertEquals(isTextVNode(createTextVNode("text")), true);
  assertEquals(isFragmentVNode(createFragmentVNode()), true);
  assertEquals(isComponentVNode(createComponentVNode(Example, null)), true);
});

Deno.test("element and text vnodes are plain JSON-safe objects", () => {
  const vnode = createElementVNode("div", { role: "note" }, null, [
    createTextVNode("hello"),
  ]);

  const serialized = JSON.parse(JSON.stringify(vnode));

  assertEquals(serialized.kind, "element");
  assertEquals(serialized.type, "div");
  assertEquals(serialized.props.role, "note");
  assertEquals(serialized.children[0].type, "hello");
});
