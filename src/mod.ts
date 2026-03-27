/**
 * Public entrypoint for the core JSX runtime.
 * @module
 */

export { jsx, jsxs } from "./jsx-runtime.ts";
export { jsxDEV, type JsxDevSource } from "./jsx-dev-runtime.ts";

export {
  createJSXVNode,
  isComponentType,
  isFragmentType,
  isVNode,
  normalizeChild,
  normalizeChildren,
} from "./normalize.ts";

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
