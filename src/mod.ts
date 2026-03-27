/**
 * Public entrypoint for the core JSX runtime.
 * @module
 */

/**
 * Creates a virtual node for production JSX.
 * @see {@link https://github.com/nicolo-ribaudo/jsx-transform-rfc | JSX Transform RFC}
 */
export { jsx, jsxs } from "./jsx-runtime.ts";

/**
 * Creates a virtual node for development JSX with source tracking.
 * @see {@link https://github.com/nicolo-ribaudo/jsx-transform-rfc | JSX Transform RFC}
 */
export { jsxDEV, type JsxDevSource } from "./jsx-dev-runtime.ts";

/**
 * Creates a normalized vnode from JSX input (element, fragment, or component).
 * @param type - HTML tag name, Component function, or Fragment.
 * @param props - Props object (null for no props).
 * @param key - Optional vnode key.
 * @returns A normalized VNode.
 */
export {
  createJSXVNode,
  isComponentType,
  isFragmentType,
  isVNode,
  normalizeChild,
  normalizeChildren,
} from "./normalize.ts";

/**
 * VNode creation helpers for building virtual node trees.
 */
export {
  createComponentVNode,
  createElementVNode,
  createFragmentVNode,
  createTextVNode,
  isComponentVNode,
  isElementVNode,
  isFragmentVNode,
  isTextVNode,
} from "./vnode.ts";

/**
 * Core type definitions for VNodes, Fragment, and related types.
 */
export {
  type ComponentType,
  type ComponentVNode,
  type ElementVNode,
  Fragment,
  type FragmentVNode,
  type JsxIntrinsicElementProps,
  type Key,
  type Normalizable,
  type TextVNode,
  type VNode,
  type VNodeKind,
} from "./types.ts";

import { FragmentVNode, VNode } from "./types.ts";
import { createFragmentVNode } from "./vnode.ts";

/**
 * Creates a Fragment vnode with the given children.
 * @param children - Child virtual nodes.
 * @returns A new FragmentVNode.
 */
export function createFragment(children: readonly VNode[] = []): FragmentVNode {
  return createFragmentVNode(null, children);
}
