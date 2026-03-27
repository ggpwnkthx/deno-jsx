/**
 * Canonical types for the core JSX runtime.
 * @module
 */

/**
 * Symbol used to identify Fragment nodes in the virtual DOM.
 */
export const FRAGMENT_SYMBOL = Symbol.for("@ggpwnkthx/jsx.fragment");

export interface Fragment {
  (props: { children?: unknown }): unknown;
  readonly $$typeof: typeof FRAGMENT_SYMBOL;
}

export const Fragment: Fragment = ((
  _props: { children?: unknown },
): unknown => {
  throw new Error(
    "Fragment is not meant to be called at runtime. It is only a type marker.",
  );
}) as Fragment;

Object.defineProperty(Fragment, "$$typeof", {
  value: FRAGMENT_SYMBOL,
  writable: false,
  configurable: false,
});

/**
 * Valid types for vnode keys.
 */
export type Key = string | number;

/**
 * Discriminant for the different kinds of virtual nodes.
 */
export type VNodeKind = "element" | "text" | "fragment" | "component";

interface BaseVNode {
  key: Key | null;
  children: VNode[];
}

/**
 * Virtual node representing an HTML or SVG element.
 */
export interface ElementVNode extends BaseVNode {
  kind: "element";
  type: string;
  props: Record<string, unknown> | null;
}

/**
 * Virtual node representing a text string.
 */
export interface TextVNode extends BaseVNode {
  kind: "text";
  type: string;
  props: null;
}

/**
 * Virtual node representing a Fragment grouping.
 */
export interface FragmentVNode extends BaseVNode {
  kind: "fragment";
  type: typeof Fragment;
  props: null;
}

/**
 * Type of a function component that receives props and returns a normalizable value.
 * @template TProps - The props type for the component.
 */
export interface ComponentType<
  TProps extends Record<string, unknown> = Record<string, unknown>,
> {
  (props: TProps & { children?: VNode[] }): Normalizable;
}

/**
 * Virtual node representing a rendered component instance.
 */
export interface ComponentVNode extends BaseVNode {
  kind: "component";
  type: ComponentType<Record<string, unknown>>;
  props: (Record<string, unknown> & { children?: VNode[] }) | null;
}

/**
 * Union of all virtual node types.
 */
export type VNode =
  | ElementVNode
  | TextVNode
  | FragmentVNode
  | ComponentVNode;

/**
 * Types that can be normalized into virtual nodes.
 */
export type Normalizable =
  | VNode
  | string
  | number
  | boolean
  | null
  | undefined
  | readonly Normalizable[];

/**
 * Source location information for debugging JSX.
 */
export interface JsxDevSource {
  fileName: string;
  lineNumber: number;
  columnNumber: number;
}

/**
 * Props type for intrinsic (built-in) elements.
 */
export interface JsxIntrinsicElementProps {
  children?: unknown;
  [key: string]: unknown;
}

/**
 * Declaration Merging target for intrinsic element props.
 */
export interface JsxIntrinsicElements {
  [elementName: string]: JsxIntrinsicElementProps;
}
