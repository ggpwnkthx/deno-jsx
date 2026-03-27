/**
 * JSX types for the automatic runtime.
 * @module
 */

export type JsxPrimitive = string | number | bigint | boolean | null | undefined;

export interface JsxComponent<
  Props extends Record<string, unknown> = Record<string, unknown>,
> {
  (props: Props): JsxRenderable;
}

export type JsxTag = string | symbol | JsxComponent;
export type JsxKey = string | number | null;

export type JsxRenderable =
  | JsxPrimitive
  | JsxElement
  | readonly JsxRenderable[];

export interface JsxProps {
  readonly children?: JsxRenderable;
  readonly [key: string]: unknown;
}

export interface JsxElement {
  readonly type: JsxTag;
  readonly props: JsxProps;
  readonly key: JsxKey;
}
