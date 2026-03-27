/**
 * Tests for centralized normalization.
 * @module
 */

import { assertEquals, assertStrictEquals, assertThrows } from "@std/assert";
import {
  createComponentVNode,
  createElementVNode,
  createFragmentVNode,
  createJSXVNode,
  createTextVNode,
  Fragment,
  isComponentType,
  isFragmentType,
  isVNode,
  type Key,
  normalizeChild,
  normalizeChildren,
} from "../src/mod.ts";

Deno.test("normalizeChild converts strings and numbers into text vnodes", () => {
  const text = normalizeChild("hello");
  const numeric = normalizeChild(42);

  assertEquals(text?.kind, "text");
  assertEquals(text?.type, "hello");
  assertEquals(numeric?.kind, "text");
  assertEquals(numeric?.type, "42");
});

Deno.test("normalizeChild drops booleans and nullish values", () => {
  assertEquals(normalizeChild(null), null);
  assertEquals(normalizeChild(undefined), null);
  assertEquals(normalizeChild(true), null);
  assertEquals(normalizeChild(false), null);
});

Deno.test("normalizeChildren flattens nested arrays and preserves order", () => {
  const children = normalizeChildren(["a", ["b", [1, "c"]], null, false, "d"]);

  assertEquals(children.map((child) => child.type), ["a", "b", "1", "c", "d"]);
});

Deno.test("normalizeChildren flattens keyless fragments but preserves keyed ones", () => {
  const keyless = createFragmentVNode(null, [
    createTextVNode("x"),
    createTextVNode("y"),
  ]);
  const keyed = createFragmentVNode("frag-key", [createTextVNode("z")]);

  const children = normalizeChildren([
    createTextVNode("a"),
    keyless,
    keyed,
  ]);

  assertEquals(children.length, 4);
  assertEquals(children[0].type, "a");
  assertEquals(children[1].type, "x");
  assertEquals(children[2].type, "y");
  assertEquals(children[3].kind, "fragment");
  assertEquals(children[3].key, "frag-key");
});

Deno.test("normalizeChild evaluates component vnode returns", () => {
  function Greeting(props: { name: string }) {
    return createElementVNode("span", null, null, [
      createTextVNode(`Hello ${props.name}`),
    ]);
  }

  const vnode = normalizeChild(
    createComponentVNode(Greeting, { name: "Deno" }, null, []),
  );

  assertEquals(vnode?.kind, "element");
  assertEquals(vnode?.type, "span");
  assertEquals(vnode?.children[0].type, "Hello Deno");
});

Deno.test("normalizeChild wraps multi-root component results in a fragment", () => {
  function Pair() {
    return ["a", "b"];
  }

  const vnode = normalizeChild(createComponentVNode(Pair, null, null, []));

  assertEquals(vnode?.kind, "fragment");
  assertEquals(vnode?.children.map((child) => child.type), ["a", "b"]);
});

Deno.test("normalizeChild preserves callsite keys for evaluated components", () => {
  function Item() {
    return createElementVNode("li", null, null, [createTextVNode("value")]);
  }

  const vnode = normalizeChild(createComponentVNode(Item, null, "item-1", []));

  assertEquals(vnode?.kind, "element");
  assertEquals(vnode?.key, "item-1");
  assertEquals(vnode?.type, "li");
});

Deno.test("normalizeChild preserves inner keys by wrapping with a keyed fragment", () => {
  function InnerKeyed() {
    return createElementVNode("li", null, "inner-key", []);
  }

  const vnode = normalizeChild(
    createComponentVNode(InnerKeyed, null, "outer-key", []),
  );

  assertEquals(vnode?.kind, "fragment");
  assertEquals(vnode?.key, "outer-key");
  assertEquals(vnode?.children[0].key, "inner-key");
});

Deno.test("normalize helpers reject unsupported child objects", () => {
  assertThrows(
    () => normalizeChild({ invalid: true }),
    TypeError,
    "Unsupported JSX child value",
  );
});

Deno.test("type guards identify vnodes, components, and fragments", () => {
  class LegacyComponent {
    render() {
      return null;
    }
  }

  const vnode = createElementVNode("div", null);

  assertEquals(isVNode(vnode), true);
  assertEquals(isComponentType(() => null), true);
  assertEquals(isComponentType(LegacyComponent), false);
  assertEquals(isFragmentType(Fragment), true);
});

Deno.test("normalizeChild passes through existing vnodes canonically", () => {
  const original = createElementVNode("div", { id: "x" }, null, []);
  const normalized = normalizeChild(original);

  assertEquals(normalized?.kind, "element");
  assertEquals(normalized?.type, "div");
  assertEquals(normalized?.props, { id: "x" });
  assertStrictEquals(normalized?.key, null);
});

Deno.test("normalizeKey throws on invalid key types", () => {
  assertThrows(
    () => createJSXVNode("div", null, Symbol("test") as unknown as Key),
    TypeError,
    "JSX key must be a string, number, null, or undefined.",
  );
});

Deno.test("normalizeJsxPropsInput throws on non-object props", () => {
  assertThrows(
    () => createJSXVNode("div", "string" as unknown as Record<string, unknown>),
    TypeError,
    "JSX props must be an object, null, or undefined.",
  );
});

Deno.test("normalizeExistingVNode preserves text vnode with key", () => {
  const textVnode = createTextVNode("hello");
  const keyed = { ...textVnode, key: "my-key" };
  const normalized = normalizeChild(keyed);

  assertEquals(normalized?.kind, "text");
  assertEquals(normalized?.key, "my-key");
});

Deno.test("appendNormalized handles component returning null with key", () => {
  function NullComponent() {
    return null;
  }

  const vnode = normalizeChild(
    createComponentVNode(NullComponent, null, "comp-key", []),
  );

  assertEquals(vnode?.kind, "fragment");
  assertEquals(vnode?.key, "comp-key");
  assertEquals(vnode?.children, []);
});

Deno.test("isVNode rejects invalid key types", () => {
  const invalidKeyVnode = {
    kind: "element",
    type: "div",
    props: null,
    key: true,
    children: [],
  };

  assertEquals(isVNode(invalidKeyVnode), false);
});

Deno.test("isVNode returns false for unknown kinds", () => {
  const unknownKindVnode = {
    kind: "unknown",
    type: "div",
    props: null,
    key: null,
    children: [],
  };

  assertEquals(isVNode(unknownKindVnode), false);
});

Deno.test("createJSXVNode throws on invalid type", () => {
  assertThrows(
    () => createJSXVNode(123 as unknown as string, null),
    TypeError,
    "Unsupported JSX type",
  );
});
