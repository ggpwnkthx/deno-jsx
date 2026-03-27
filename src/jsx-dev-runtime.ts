/**
 * Development JSX runtime with jsxDEV function for debugging.
 * @module
 */

import { createJSXVNode } from "./normalize.ts";
import type { ComponentType, JsxDevSource, Key, VNode } from "./types.ts";
import { Fragment } from "./types.ts";

export { Fragment };
export type { JsxDevSource };

/**
 * Creates a virtual node for development JSX with source tracking.
 * @template TProps - The props type.
 * @param type - HTML tag name, Component function, or Fragment.
 * @param props - Props object (null for no props).
 * @param key - Optional vnode key.
 * @param _isStaticChildren - Whether children are static.
 * @param _source - Source location for debugging.
 * @param _self - Reference to self (unused in runtime).
 * @returns A normalized VNode.
 */
export function jsxDEV<TProps extends Record<string, unknown>>(
  type: string | ComponentType<TProps> | typeof Fragment,
  props: (TProps & { children?: unknown }) | null,
  key: Key | null | undefined,
  _isStaticChildren: boolean,
  _source: JsxDevSource | undefined,
  _self: unknown,
): VNode {
  return createJSXVNode(type, props, key);
}
