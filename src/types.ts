/**
 * Canonical types for the core JSX runtime.
 * @module
 */

export const Fragment = Symbol.for("@ggpwnkthx/jsx.fragment");

export type Key = string | number;
export type VNodeKind = "element" | "text" | "fragment" | "component";

interface BaseVNode {
  key: Key | null;
  children: VNode[];
}

export interface ElementVNode extends BaseVNode {
  kind: "element";
  type: string;
  props: Record<string, unknown> | null;
}

export interface TextVNode extends BaseVNode {
  kind: "text";
  type: string;
  props: null;
}

export interface FragmentVNode extends BaseVNode {
  kind: "fragment";
  type: typeof Fragment;
  props: null;
}

export interface ComponentType<
  TProps extends Record<string, unknown> = Record<string, unknown>,
> {
  (props: TProps & { children?: VNode[] }): Normalizable;
}

export interface ComponentVNode extends BaseVNode {
  kind: "component";
  type: ComponentType<Record<string, unknown>>;
  props: (Record<string, unknown> & { children?: VNode[] }) | null;
}

export type VNode =
  | ElementVNode
  | TextVNode
  | FragmentVNode
  | ComponentVNode;

export type Normalizable =
  | VNode
  | string
  | number
  | boolean
  | null
  | undefined
  | readonly Normalizable[];

export interface JsxDevSource {
  fileName: string;
  lineNumber: number;
  columnNumber: number;
}

export type JsxIntrinsicElementProps = Record<string, unknown> & {
  children?: unknown;
};

export interface JsxIntrinsicElements {
  [elementName: string]: JsxIntrinsicElementProps;
}
