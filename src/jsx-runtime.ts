import { createJSXVNode } from "./normalize.ts";
import type { ComponentType, Key, VNode } from "./types.ts";
import { Fragment } from "./types.ts";

export { Fragment };

export function jsx<TProps extends Record<string, unknown>>(
  type: string | ComponentType<TProps> | typeof Fragment,
  props: (TProps & { children?: unknown }) | null,
  key?: Key | null,
): VNode {
  return createJSXVNode(type, props, key);
}

export function jsxs<TProps extends Record<string, unknown>>(
  type: string | ComponentType<TProps> | typeof Fragment,
  props: (TProps & { children?: unknown }) | null,
  key?: Key | null,
): VNode {
  return createJSXVNode(type, props, key);
}
