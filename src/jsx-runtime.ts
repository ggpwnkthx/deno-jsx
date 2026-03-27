/**
 * Production JSX runtime with jsx and jsxs functions.
 * @module
 */

import { createJSXVNode } from "./normalize.ts";
import type { ComponentType, Key, VNode } from "./types.ts";
import { Fragment } from "./types.ts";

export { Fragment };

/**
 * Creates a virtual node for production JSX.
 * @template TProps - The props type.
 * @param type - HTML tag name, Component function, or Fragment.
 * @param props - Props object (null for no props).
 * @param key - Optional vnode key.
 * @returns A normalized VNode.
 */
export function jsx<TProps extends Record<string, unknown>>(
  type: string | ComponentType<TProps> | typeof Fragment,
  props: (TProps & { children?: unknown }) | null,
  key?: Key | null,
): VNode {
  return createJSXVNode(type, props, key);
}

/**
 * Creates a virtual node for production JSX with multiple children.
 * @template TProps - The props type.
 * @param type - HTML tag name, Component function, or Fragment.
 * @param props - Props object (null for no props).
 * @param key - Optional vnode key.
 * @returns A normalized VNode.
 */
export function jsxs<TProps extends Record<string, unknown>>(
  type: string | ComponentType<TProps> | typeof Fragment,
  props: (TProps & { children?: unknown }) | null,
  key?: Key | null,
): VNode {
  return createJSXVNode(type, props, key);
}
