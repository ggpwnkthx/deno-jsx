/**
 * JSX types for the automatic runtime.
 * @module
 */

import { Fragment } from "./types.ts";
import type { ComponentType, Key, VNode } from "./types.ts";

/**
 * Primitive values that can be rendered directly in JSX.
 */
export type JsxPrimitive = string | number | bigint | boolean | null | undefined;

/**
 * Type of a JSX component function.
 * @template TProps - The props type for the component.
 */
export type JsxComponent<
  Props extends Record<string, unknown> = Record<string, unknown>,
> = ComponentType<Props>;

/**
 * Valid JSX element types: HTML tags, Fragment, or component functions.
 */
export type JsxTag = string | typeof Fragment | JsxComponent;

/**
 * Optional key type for JSX elements.
 */
export type JsxKey = Key | null;

/**
 * Types that can be rendered as JSX children.
 */
export type JsxRenderable =
  | JsxPrimitive
  | VNode
  | readonly JsxRenderable[];

/**
 * Props object for intrinsic JSX elements.
 */
export interface JsxProps {
  readonly children?: JsxRenderable;
  readonly [key: string]: unknown;
}

/**
 * Critical: JSX expressions must have the same type your runtime returns.
 */
export type JsxElement = VNode;
