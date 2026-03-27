/**
 * Unit tests for VNode type guard functions.
 * @module
 */

import { assertEquals } from "@std/assert";
import {
  createComponentVNode,
  createElementVNode,
  createFragmentVNode,
  createTextVNode,
  Fragment,
  isComponentType,
  isComponentVNode,
  isElementVNode,
  isFragmentType,
  isFragmentVNode,
  isTextVNode,
  isVNode,
} from "@ggpwnkthx/jsx";

Deno.test("isVNode - correctly identifies vnodes", () => {
  assertEquals(isVNode(createTextVNode("test")), true);
  assertEquals(isVNode(createElementVNode("div", null)), true);
  assertEquals(isVNode(createFragmentVNode()), true);
  assertEquals(isVNode(null), false);
  assertEquals(isVNode("string"), false);
  assertEquals(isVNode(123), false);
  assertEquals(isVNode({ kind: "element" }), false);
});

Deno.test("isComponentType - correctly identifies functions", () => {
  function fn() {}
  assertEquals(isComponentType(fn), true);
  assertEquals(isComponentType(() => null), true);
  assertEquals(isComponentType("string"), false);
  assertEquals(isComponentType(null), false);
});

Deno.test("isFragmentType - correctly identifies fragment symbols", () => {
  assertEquals(isFragmentType(Fragment), true);
  assertEquals(isFragmentType(Fragment), true);
  assertEquals(isFragmentType(Symbol.for("preact.fragment")), false);
  assertEquals(isFragmentType("div"), false);
  assertEquals(isFragmentType(null), false);
});

Deno.test("isElementVNode - correctly identifies element vnodes", () => {
  assertEquals(isElementVNode(createElementVNode("div", null)), true);
  assertEquals(isElementVNode(createTextVNode("test")), false);
  assertEquals(isElementVNode(createFragmentVNode()), false);
});

Deno.test("isTextVNode - correctly identifies text vnodes", () => {
  assertEquals(isTextVNode(createTextVNode("test")), true);
  assertEquals(isTextVNode(createElementVNode("div", null)), false);
  assertEquals(isTextVNode(createFragmentVNode()), false);
});

Deno.test("isFragmentVNode - correctly identifies fragment vnodes", () => {
  assertEquals(isFragmentVNode(createFragmentVNode()), true);
  assertEquals(isFragmentVNode(createTextVNode("test")), false);
  assertEquals(isFragmentVNode(createElementVNode("div", null)), false);
});

Deno.test("isComponentVNode - correctly identifies component vnodes", () => {
  function MyComponent() {
    return createTextVNode("test");
  }
  assertEquals(isComponentVNode(createComponentVNode(MyComponent, {})), true);
  assertEquals(isComponentVNode(createElementVNode("div", null)), false);
  assertEquals(isComponentVNode(createTextVNode("test")), false);
});
