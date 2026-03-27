/**
 * Tests for jsx/jsxs/jsxDEV runtime entrypoints.
 * @module
 */

import { assertEquals, assertThrows } from "@std/assert";
import { Fragment, jsx, jsxDEV, jsxs } from "../src/mod.ts";

Deno.test("jsx creates intrinsic element vnodes with normalized children", () => {
  const vnode = jsx("div", {
    id: "root",
    children: ["hello", 1, null, false, "world"],
  }, "k1");

  assertEquals(vnode.kind, "element");
  assertEquals(vnode.type, "div");
  assertEquals(vnode.props, { id: "root" });
  assertEquals(vnode.key, "k1");
  assertEquals(vnode.children.map((child) => child.type), [
    "hello",
    "1",
    "world",
  ]);
});

Deno.test("jsx creates fragment vnodes for Fragment", () => {
  const vnode = jsx(Fragment, { children: ["a", "b"] }, null);

  assertEquals(vnode.kind, "fragment");
  assertEquals(vnode.key, null);
  assertEquals(vnode.children.map((child) => child.type), ["a", "b"]);
});

Deno.test("jsx eagerly evaluates function components", () => {
  function Greeting(props: { name: string }) {
    return jsx("span", { children: [`Hello `, props.name] }, null);
  }

  const vnode = jsx(Greeting, { name: "Deno" }, "greeting");

  assertEquals(vnode.kind, "element");
  assertEquals(vnode.type, "span");
  assertEquals(vnode.key, "greeting");
  assertEquals(vnode.children.map((child) => child.type), ["Hello ", "Deno"]);
});

Deno.test("jsxs behaves the same as jsx", () => {
  const left = jsx("div", { children: ["a", "b"] }, "same-key");
  const right = jsxs("div", { children: ["a", "b"] }, "same-key");

  assertEquals(right.kind, left.kind);
  assertEquals(right.type, left.type);
  assertEquals(right.key, left.key);
  assertEquals(right.children.map((child) => child.type), ["a", "b"]);
});

Deno.test("jsxDEV ignores dev metadata but preserves runtime behavior", () => {
  const vnode = jsxDEV(
    "section",
    { title: "demo", children: "content" },
    "dev-key",
    false,
    {
      fileName: "file:///app.tsx",
      lineNumber: 10,
      columnNumber: 5,
    },
    undefined,
  );

  assertEquals(vnode.kind, "element");
  assertEquals(vnode.type, "section");
  assertEquals(vnode.props, { title: "demo" });
  assertEquals(vnode.key, "dev-key");
  assertEquals(vnode.children[0].type, "content");
});

Deno.test("jsx rejects class components", () => {
  class LegacyComponent {
    render() {
      return null;
    }
  }

  assertThrows(
    () => jsx(LegacyComponent as never, null, null),
    TypeError,
    "Class components are not supported",
  );
});
