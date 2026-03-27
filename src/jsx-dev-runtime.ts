/**
 * Development JSX runtime with jsxDEV function for debugging.
 * @module
 */

import { createJSXVNode } from "./normalize.ts";
import type { ComponentType, JsxDevSource, Key, VNode } from "./types.ts";
import { Fragment } from "./types.ts";

import type { JsxKey, JsxProps, JsxRenderable } from "./jsx-types.ts";

export { Fragment };
export type { JsxDevSource };
export type {
  JsxElement,
  JsxKey,
  JsxProps,
  JsxRenderable,
  JsxTag,
} from "./jsx-types.ts";

// deno-lint-ignore no-namespace
export namespace JSX {
  export type Element = VNode;

  export interface ElementChildrenAttribute {
    children: unknown;
  }

  export interface IntrinsicAttributes {
    key?: JsxKey;
  }

  export interface IntrinsicElements {
    [name: string]: JsxProps;
  }

  export type ElementType =
    | keyof IntrinsicElements
    | ((props: Record<string, unknown>) => Element);

  export type Child = JsxRenderable;
}

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
