/**
 * Centralized child normalization and JSX evaluation.
 * All normalization rules flow through appendNormalized().
 * @module
 */

import {
  type ComponentType,
  type ComponentVNode,
  Fragment,
  type Key,
  type VNode,
} from "./types.ts";
import {
  createComponentVNode,
  createElementVNode,
  createFragmentVNode,
  createTextVNode,
} from "./vnode.ts";

const CLASS_PREFIX = "class ";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function describeValue(value: unknown): string {
  if (typeof value === "function") {
    return value.name.length > 0 ? `function ${value.name}` : "anonymous function";
  }

  if (typeof value === "symbol") {
    return value.toString();
  }

  if (typeof value === "bigint") {
    return `${value}n`;
  }

  if (isRecord(value)) {
    return Object.prototype.toString.call(value);
  }

  return String(value);
}

function normalizeKey(value: unknown): Key | null {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  throw new TypeError("JSX key must be a string, number, null, or undefined.");
}

function normalizeJsxPropsInput(
  props: Record<string, unknown> | null | undefined,
): Record<string, unknown> {
  if (props === null || props === undefined) {
    return {};
  }

  if (!isRecord(props)) {
    throw new TypeError("JSX props must be an object, null, or undefined.");
  }

  return { ...props };
}

function normalizeElementProps(
  props: Record<string, unknown> | null,
): Record<string, unknown> | null {
  if (props === null) {
    return null;
  }

  const next = { ...props };
  delete next.children;
  delete next.key;

  return Object.keys(next).length === 0 ? null : next;
}

function buildComponentProps(
  props: Record<string, unknown> | null,
  children: readonly VNode[],
): Record<string, unknown> & { children: VNode[] } {
  return {
    ...(props ?? {}),
    children: [...children],
  };
}

function normalizeExistingVNode(vnode: VNode): VNode {
  switch (vnode.kind) {
    case "text":
      return vnode.key === null
        ? createTextVNode(vnode.type)
        : { ...createTextVNode(vnode.type), key: vnode.key };

    case "element":
      return createElementVNode(
        vnode.type,
        normalizeElementProps(vnode.props),
        vnode.key,
        normalizeChildren(vnode.children),
      );

    case "fragment":
      return createFragmentVNode(vnode.key, normalizeChildren(vnode.children));

    case "component":
      return createComponentVNode(
        vnode.type,
        vnode.props,
        vnode.key,
        normalizeChildren(vnode.children),
      );
  }
}

function evaluateComponentVNode(vnode: ComponentVNode): unknown {
  const props = buildComponentProps(vnode.props, vnode.children);
  return vnode.type(props);
}

function applyCallsiteKey(vnode: VNode, key: Key | null): VNode {
  if (key === null) {
    return vnode;
  }

  if (vnode.key === null) {
    return { ...vnode, key };
  }

  return createFragmentVNode(key, [vnode]);
}

function appendNormalized(into: VNode[], value: unknown): void {
  if (value === null || value === undefined || typeof value === "boolean") {
    return;
  }

  if (typeof value === "string" || typeof value === "number") {
    into.push(createTextVNode(value));
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      appendNormalized(into, item);
    }
    return;
  }

  if (!isVNode(value)) {
    throw new TypeError(
      `Unsupported JSX child value: ${describeValue(value)}.`,
    );
  }

  const normalizedVNode = normalizeExistingVNode(value);

  if (normalizedVNode.kind === "component") {
    const rendered = normalizeChild(evaluateComponentVNode(normalizedVNode));

    if (rendered === null) {
      if (normalizedVNode.key !== null) {
        into.push(createFragmentVNode(normalizedVNode.key, []));
      }
      return;
    }

    appendNormalized(into, applyCallsiteKey(rendered, normalizedVNode.key));
    return;
  }

  if (normalizedVNode.kind === "fragment" && normalizedVNode.key === null) {
    for (const child of normalizedVNode.children) {
      appendNormalized(into, child);
    }
    return;
  }

  into.push(normalizedVNode);
}

function splitJsxProps(props: Record<string, unknown>): {
  props: Record<string, unknown> | null;
  children: VNode[];
} {
  const next = { ...props };
  const rawChildren = next.children;
  delete next.children;
  delete next.key;

  const children = rawChildren === undefined
    ? []
    : normalizeChildren(Array.isArray(rawChildren) ? rawChildren : [rawChildren]);

  return {
    props: Object.keys(next).length === 0 ? null : next,
    children,
  };
}

/**
 * Checks if a value is a valid virtual node.
 * @param value - The value to check.
 * @returns True if the value is a VNode.
 */
export function isVNode(value: unknown): value is VNode {
  if (!isRecord(value)) {
    return false;
  }

  const kind = value.kind;
  const type = value.type;
  const props = value.props;
  const key = value.key;
  const children = value.children;

  if (
    key !== null && key !== undefined && typeof key !== "string"
    && typeof key !== "number"
  ) {
    return false;
  }

  if (!Array.isArray(children)) {
    return false;
  }

  switch (kind) {
    case "element":
      return typeof type === "string" && (props === null || isRecord(props));

    case "text":
      return typeof type === "string" && props === null;

    case "fragment":
      return type === Fragment && props === null;

    case "component":
      return typeof type === "function" && (props === null || isRecord(props));

    default:
      return false;
  }
}

/**
 * Checks if a value is a function component (not a class constructor).
 * @param value - The value to check.
 * @returns True if the value is a function component.
 */
export function isComponentType(
  value: unknown,
): value is (...args: readonly unknown[]) => unknown {
  if (typeof value !== "function") {
    return false;
  }

  const source = Function.prototype.toString.call(value);
  return !source.startsWith(CLASS_PREFIX);
}

/**
 * Checks if a value is the Fragment symbol.
 * @param value - The value to check.
 * @returns True if the value is the Fragment symbol.
 */
export function isFragmentType(value: unknown): value is typeof Fragment {
  return value === Fragment;
}

/**
 * Normalizes a single child value into a VNode or null.
 * @param value - The child value to normalize.
 * @returns A VNode, null if the value is null/undefined/boolean, or a fragment containing multiple nodes.
 */
export function normalizeChild(value: unknown): VNode | null {
  const normalized = normalizeChildren([value]);

  if (normalized.length === 0) {
    return null;
  }

  if (normalized.length === 1) {
    return normalized[0];
  }

  return createFragmentVNode(null, normalized);
}

/**
 * Normalizes an array of child values into VNodes.
 * @param children - The child values to normalize.
 * @returns An array of VNodes with null/undefined/booleans filtered out.
 */
export function normalizeChildren(children: readonly unknown[]): VNode[] {
  const normalized: VNode[] = [];

  for (const child of children) {
    appendNormalized(normalized, child);
  }

  return normalized;
}

/**
 * Creates a normalized element vnode from JSX input.
 * @template TProps - The props type.
 * @param type - HTML tag name, Component function, or Fragment.
 * @param props - Props object (null for no props).
 * @param key - Optional vnode key.
 * @returns A normalized VNode.
 */
export function createJSXVNode<TProps extends Record<string, unknown>>(
  type: string | ComponentType<TProps> | typeof Fragment,
  props: (TProps & { children?: unknown }) | null,
  key?: Key | null,
): VNode {
  const rawProps = normalizeJsxPropsInput(props);
  const normalizedKey = key !== undefined
    ? normalizeKey(key)
    : normalizeKey(rawProps.key);

  const { props: normalizedProps, children } = splitJsxProps(rawProps);

  if (isFragmentType(type)) {
    return createFragmentVNode(normalizedKey, children);
  }

  if (typeof type === "string") {
    return createElementVNode(type, normalizedProps, normalizedKey, children);
  }

  if (isComponentType(type)) {
    const componentVNode = createComponentVNode(
      type as ComponentType<Record<string, unknown>>,
      buildComponentProps(normalizedProps, children),
      normalizedKey,
      children,
    );

    return normalizeChild(componentVNode)
      ?? createFragmentVNode(normalizedKey, []);
  }

  if (typeof type === "function") {
    throw new TypeError(
      "Class components are not supported by this runtime.",
    );
  }

  throw new TypeError(
    "Unsupported JSX type. Expected an intrinsic element name, Fragment, or a function component.",
  );
}
