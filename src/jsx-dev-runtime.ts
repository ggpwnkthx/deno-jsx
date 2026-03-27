import { createJSXVNode } from "./normalize.ts";
import type { ComponentType, JsxDevSource, Key, VNode } from "./types.ts";
import { Fragment } from "./types.ts";

export { Fragment };
export type { JsxDevSource };

export function jsxDEV<TProps extends Record<string, unknown>>(
  type: string | ComponentType<TProps> | typeof Fragment,
  props: (TProps & { children?: unknown }) | null,
  key: Key | null | undefined,
  _isStaticChildren: boolean,
  _source: JsxDevSource | undefined,
  _self: unknown,
): VNode {
  return createJSXVNode(type, props, key);
}
