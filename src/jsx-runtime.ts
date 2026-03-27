/**
 * Production JSX runtime with jsx and jsxs functions.
 * @module
 */

import { createJSXVNode } from "./normalize.ts";
import type { ComponentType, Key, VNode } from "./types.ts";
import { Fragment } from "./types.ts";

import type { JsxKey, JsxProps, JsxRenderable } from "./jsx-types.ts";

export type {
  JsxElement,
  JsxKey,
  JsxProps,
  JsxRenderable,
  JsxTag,
} from "./jsx-types.ts";

export { Fragment };

// deno-lint-ignore no-namespace
export namespace JSX {
  export type Element = VNode;

  export interface ElementChildrenAttribute {
    children: unknown;
  }

  export interface IntrinsicAttributes {
    key?: JsxKey;
  }

  export type IntrinsicElements =
    & {
      [K in keyof HTMLElementTagNameMap]?: JsxProps;
    }
    & {
      Fragment: {
        key?: string | number;
        children?: unknown;
      };
    };

  export type ElementType =
    | keyof IntrinsicElements
    | typeof Fragment
    // deno-lint-ignore no-explicit-any -- JSX type system requires any here
    | ((props: any) => Element | null);

  export type Child = JsxRenderable;
}

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
