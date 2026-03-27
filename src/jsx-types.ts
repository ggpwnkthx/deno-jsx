/**
 * JSX types for the automatic runtime.
 * @module
 */

import { Fragment } from "./types.ts";
import type { ComponentType, Key, VNode } from "./types.ts";

/**
 * Primitive values that can be rendered as JSX children.
 * @remarks `boolean`, `bigint`, `null`, and `undefined` are filtered during rendering.
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
 * Valid JSX element types: HTML/SVG tag names, the Fragment symbol, or component functions.
 */
export type JsxTag = string | typeof Fragment | JsxComponent;

/**
 * Optional key type for JSX elements.
 * @remarks `null` indicates no explicit key was provided.
 */
export type JsxKey = Key | null;

/**
 * Types that can be rendered as JSX children.
 * @remarks Includes primitives, VNodes, and nested arrays of renderables.
 */
export type JsxRenderable =
  | JsxPrimitive
  | VNode
  | readonly JsxRenderable[];

/**
 * Props object for intrinsic JSX elements.
 * @remarks The optional `children` prop represents nested JSX content.
 * Additional properties are spread from element attributes.
 */
export interface JsxProps {
  readonly children?: JsxRenderable;
  readonly [key: string]: unknown;
}

/**
 * The return type of JSX expressions.
 * @remarks Must match what your runtime's jsx/jsxs/jsxDEV functions return.
 */
export type JsxElement = VNode;
