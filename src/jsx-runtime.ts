/**
 * Production JSX runtime with jsx and jsxs functions.
 * @module
 */

import { createJSXVNode } from "./normalize.ts";
import type { ComponentType, Key, VNode } from "./types.ts";
import { Fragment } from "./types.ts";

import type { JsxKey, JsxProps, JsxRenderable } from "./jsx-types.ts";

/**
 * @internal
 */
export type {
  JsxElement,
  JsxKey,
  JsxProps,
  JsxRenderable,
  JsxTag,
} from "./jsx-types.ts";

/**
 * Fragment type marker and factory.
 * Used as a JSX tag to group multiple elements without adding DOM nodes.
 */
export { Fragment };

/**
 * JSX namespace for type checking JSX expressions.
 * @remarks This namespace is automatically injected by the JSX transformer.
 * Extend `IntrinsicElements` to add custom element types.
 */
// deno-lint-ignore no-namespace
export namespace JSX {
  /**
   * The return type of JSX expressions.
   */
  export type Element = VNode;

  /**
   * Marks the children prop type for intrinsic elements.
   */
  export interface ElementChildrenAttribute {
    children: unknown;
  }

  /**
   * Attributes common to all intrinsic elements.
   */
  export interface IntrinsicAttributes {
    key?: JsxKey;
  }

  /**
   * Props for built-in HTML/SVG elements mapped by tag name.
   * @remarks Includes all standard HTML elements and SVG elements.
   * Use declaration merging to add custom elements or override defaults.
   */
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

  /**
   * Valid element types in JSX: tag names, Fragment, or component functions.
   */
  export type ElementType =
    | keyof IntrinsicElements
    | typeof Fragment
    // deno-lint-ignore no-explicit-any -- JSX type system requires any here
    | ((props: any) => Element | null);

  /**
   * Types allowed as JSX children.
   */
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
