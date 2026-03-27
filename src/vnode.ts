/**
 * Low-level vnode creation helpers.
 * @module
 */

import type {
  ComponentType,
  ComponentVNode,
  ElementVNode,
  FragmentVNode,
  Key,
  TextVNode,
  VNode,
} from "./types.ts";
import { Fragment } from "./types.ts";

/**
 * Creates an element virtual node.
 * @param type - HTML or SVG tag name.
 * @param props - Element attributes and props (null for no props).
 * @param key - Optional vnode key.
 * @param children - Child virtual nodes.
 * @returns A new ElementVNode.
 */
export function createElementVNode(
  type: string,
  props: Record<string, unknown> | null,
  key: Key | null = null,
  children: readonly VNode[] = [],
): ElementVNode {
  return {
    kind: "element",
    type,
    props: props === null ? null : { ...props },
    key,
    children: [...children],
  };
}

/**
 * Creates a text virtual node.
 * @param value - The text content.
 * @returns A new TextVNode.
 */
export function createTextVNode(value: string | number): TextVNode {
  return {
    kind: "text",
    type: String(value),
    props: null,
    key: null,
    children: [],
  };
}

/**
 * Creates a fragment virtual node.
 * @param key - Optional vnode key.
 * @param children - Child virtual nodes.
 * @returns A new FragmentVNode.
 */
export function createFragmentVNode(
  key: Key | null = null,
  children: readonly VNode[] = [],
): FragmentVNode {
  return {
    kind: "fragment",
    type: Fragment,
    props: null,
    key,
    children: [...children],
  };
}

/**
 * Creates a component virtual node.
 * @template TProps - The props type of the component.
 * @param type - The component function.
 * @param props - Props passed to the component (null for no props).
 * @param key - Optional vnode key.
 * @param children - Child virtual nodes.
 * @returns A new ComponentVNode.
 */
export function createComponentVNode<
  TProps extends Record<string, unknown> = Record<string, unknown>,
>(
  type: ComponentType<TProps>,
  props: (TProps & { children?: VNode[] }) | null,
  key: Key | null = null,
  children: readonly VNode[] = [],
): ComponentVNode {
  return {
    kind: "component",
    type: type as ComponentType<Record<string, unknown>>,
    props: props === null ? null : { ...props },
    key,
    children: [...children],
  };
}

/**
 * Type guard to check if a vnode is an element.
 * @param vnode - The vnode to check.
 * @returns True if the vnode is an ElementVNode.
 */
export function isElementVNode(vnode: VNode): vnode is ElementVNode {
  return vnode.kind === "element";
}

/**
 * Type guard to check if a vnode is a text node.
 * @param vnode - The vnode to check.
 * @returns True if the vnode is a TextVNode.
 */
export function isTextVNode(vnode: VNode): vnode is TextVNode {
  return vnode.kind === "text";
}

/**
 * Type guard to check if a vnode is a fragment.
 * @param vnode - The vnode to check.
 * @returns True if the vnode is a FragmentVNode.
 */
export function isFragmentVNode(vnode: VNode): vnode is FragmentVNode {
  return vnode.kind === "fragment";
}

/**
 * Type guard to check if a vnode is a component.
 * @param vnode - The vnode to check.
 * @returns True if the vnode is a ComponentVNode.
 */
export function isComponentVNode(vnode: VNode): vnode is ComponentVNode {
  return vnode.kind === "component";
}
