/**
 * Canonical types for the core JSX runtime.
 * @module
 */

/**
 * Symbol used to identify Fragment nodes in the virtual DOM.
 */
export const FRAGMENT_SYMBOL = Symbol.for("@ggpwnkthx/jsx.fragment");

/**
 * Fragment type marker interface.
 * Groups multiple elements without creating a DOM node.
 * Implemented by the global `Fragment` constant.
 */
export interface Fragment {
  (props: { children?: unknown }): unknown;
  readonly $$typeof: typeof FRAGMENT_SYMBOL;
}

/**
 * Fragment type marker and factory function for grouping children.
 * Used as a JSX tag to group multiple elements without adding DOM nodes.
 */
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
 * @remarks The `type` field contains the tag name (e.g., "div", "span").
 * The `props` field contains all element attributes and children.
 */
export interface ElementVNode extends BaseVNode {
  kind: "element";
  type: string;
  props: Record<string, unknown> | null;
}

/**
 * Virtual node representing a text string.
 * @remarks The `type` field is always the literal string "text".
 */
export interface TextVNode extends BaseVNode {
  kind: "text";
  type: string;
  props: null;
}

/**
 * Virtual node representing a Fragment grouping.
 * @remarks The `type` field is always `typeof Fragment`.
 * Keyless Fragments are flattened during child normalization.
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
 * @remarks Components are eagerly evaluated during JSX rendering.
 * The `type` field holds the component function reference.
 */
export interface ComponentVNode extends BaseVNode {
  kind: "component";
  type: ComponentType<Record<string, unknown>>;
  props: (Record<string, unknown> & { children?: VNode[] }) | null;
}

/**
 * Union of all virtual node types.
 * @remarks Variants are distinguished by the `kind` discriminant field:
 * - `"element"` for HTML/SVG tags
 * - `"text"` for string literals
 * - `"fragment"` for Fragment groupings
 * - `"component"` for rendered components
 */
export type VNode =
  | ElementVNode
  | TextVNode
  | FragmentVNode
  | ComponentVNode;

/**
 * Types that can be normalized into virtual nodes.
 * @remarks During child normalization:
 * - `string` and `number` become TextVNodes
 * - `boolean`, `null`, and `undefined` are skipped
 * - VNodes are returned as-is
 * - Arrays are recursively flattened
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
 * @remarks Populated by the compiler when using jsxDEV.
 */
export interface JsxDevSource {
  fileName: string;
  lineNumber: number;
  columnNumber: number;
}

/**
 * Props type for intrinsic (built-in) HTML/SVG elements.
 * @remarks The `children` prop is optional and represents nested content.
 * Additional props are spread from the element attributes.
 */
export interface JsxIntrinsicElementProps {
  children?: unknown;
  [key: string]: unknown;
}

/**
 * Declaration merging target for intrinsic element props.
 * @remarks Extend this interface to add custom elements or
 * override props for built-in HTML/SVG elements.
 * @example
 * ```typescript
 * declare module "@ggpwnkthx/jsx" {
 *   interface IntrinsicElements {
 *     "my-element": { name: string };
 *   }
 * }
 * ```
 */
export interface JsxIntrinsicElements {
  [elementName: string]: JsxIntrinsicElementProps;
}
