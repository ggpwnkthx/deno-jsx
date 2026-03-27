/**
 * Tests for mod.ts exports.
 * @module
 */

import { assertEquals } from "@std/assert";
import { createFragment, Fragment } from "../src/mod.ts";

Deno.test("createFragment creates empty fragment with no args", () => {
  const fragment = createFragment();

  assertEquals(fragment.kind, "fragment");
  assertEquals(fragment.type, Fragment);
  assertEquals(fragment.key, null);
  assertEquals(fragment.children, []);
});

Deno.test("createFragment creates fragment with children", () => {
  const fragment = createFragment([
    { kind: "text" as const, type: "a", props: null, key: null, children: [] },
    { kind: "text" as const, type: "b", props: null, key: null, children: [] },
  ]);

  assertEquals(fragment.kind, "fragment");
  assertEquals(fragment.type, Fragment);
  assertEquals(fragment.key, null);
  assertEquals(fragment.children.length, 2);
  assertEquals(fragment.children[0].type, "a");
  assertEquals(fragment.children[1].type, "b");
});
