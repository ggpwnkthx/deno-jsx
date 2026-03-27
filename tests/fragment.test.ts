/**
 * Unit tests for Fragment symbol and fragment-related functionality.
 * @module
 */

import { assertEquals, assertStrictEquals } from "@std/assert";
import {
  createFragmentVNode,
  createTextVNode,
  Fragment,
  isFragmentType,
  isFragmentVNode,
} from "@ggpwnkthx/jsx";

Deno.test("Fragment symbol is correctly exported", () => {
  assertStrictEquals(Fragment, Fragment);
});

Deno.test("Fragment type is correctly identified", () => {
  assertEquals(isFragmentType(Fragment), true);
  assertEquals(isFragmentType(Fragment), true);
  assertEquals(isFragmentType("div"), false);
});

Deno.test("Fragment vnode is correctly identified", () => {
  assertEquals(isFragmentVNode(createFragmentVNode()), true);
  assertEquals(isFragmentVNode(createTextVNode("test")), false);
});

Deno.test("Fragment vnode - keyed fragment has correct shape", () => {
  const child = createTextVNode("child");
  const vnode = createFragmentVNode("frag-key", [child]);
  assertEquals(vnode.kind, "fragment");
  assertEquals(vnode.type, Fragment);
  assertEquals(vnode.props, null);
  assertEquals(vnode.key, "frag-key");
  assertEquals(vnode.children, [child]);
});

Deno.test("Fragment vnode - keyless fragment has null key", () => {
  const child = createTextVNode("child");
  const vnode = createFragmentVNode(null, [child]);
  assertEquals(vnode.kind, "fragment");
  assertEquals(vnode.key, null);
});
