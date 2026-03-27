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

export function createTextVNode(value: string | number): TextVNode {
  return {
    kind: "text",
    type: String(value),
    props: null,
    key: null,
    children: [],
  };
}

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

export function isElementVNode(vnode: VNode): vnode is ElementVNode {
  return vnode.kind === "element";
}

export function isTextVNode(vnode: VNode): vnode is TextVNode {
  return vnode.kind === "text";
}

export function isFragmentVNode(vnode: VNode): vnode is FragmentVNode {
  return vnode.kind === "fragment";
}

export function isComponentVNode(vnode: VNode): vnode is ComponentVNode {
  return vnode.kind === "component";
}
