/**
 * JSX types for the automatic runtime.
 * @module
 */

import { Fragment } from "./types.ts";
import type { ComponentType, Key, VNode } from "./types.ts";

export type JsxPrimitive = string | number | bigint | boolean | null | undefined;

export type JsxComponent<
  Props extends Record<string, unknown> = Record<string, unknown>,
> = ComponentType<Props>;

export type JsxTag = string | typeof Fragment | JsxComponent;

export type JsxKey = Key | null;

export type JsxRenderable =
  | JsxPrimitive
  | VNode
  | readonly JsxRenderable[];

export interface JsxProps {
  readonly children?: JsxRenderable;
  readonly [key: string]: unknown;
}

/**
 * Critical: JSX expressions must have the same type your runtime returns.
 */
export type JsxElement = VNode;
