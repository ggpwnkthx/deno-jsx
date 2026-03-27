/**
 * Intrinsic Elements Example
 *
 * Demonstrates using HTML elements with various props.
 * Run with: deno run --allow-read examples/intrinsic-elements.tsx
 *
 * @module
 */

import { print } from "./shared.ts";

const vnode = (
  <div id="container" className="main-wrapper" data-active>
    <h1 className="title">My Page</h1>
    <p>
      A paragraph with <strong>bold</strong> text.
    </p>
    <ul>
      <li key="1">Item one</li>
      <li key="2">Item two</li>
      <li key="3">Item three</li>
    </ul>
    <button type="button" disabled={false}>
      Click me
    </button>
  </div>
);

print("Intrinsic Elements VNode:", vnode);
