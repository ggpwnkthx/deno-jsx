/**
 * Development JSX runtime with jsxDEV function for debugging.
 * @module
 */

import { createJSXVNode } from "./normalize.ts";
import type { ComponentType, JsxDevSource, Key, VNode } from "./types.ts";
import { Fragment } from "./types.ts";

import type { JsxKey, JsxProps, JsxRenderable } from "./jsx-types.ts";

/**
 * Fragment type marker and factory.
 * Used as a JSX tag to group multiple elements without adding DOM nodes.
 */
export { Fragment };

/**
 * Source location information for debugging JSX.
 */
export type { JsxDevSource };

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
   * @remarks Use declaration merging to add custom elements or override defaults.
   */
  export interface IntrinsicElements {
    [name: string]: JsxProps;
  }

  /**
   * Valid element types in JSX: tag names or component functions.
   */
  export type ElementType =
    | keyof IntrinsicElements
    | ((props: Record<string, unknown>) => Element);

  /**
   * Types allowed as JSX children.
   */
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
