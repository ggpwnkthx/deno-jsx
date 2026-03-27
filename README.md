# @ggpwnkthx/jsx

[![Deno v2.7+](https://img.shields.io/badge/deno-2.7%2B-blue.svg)](https://deno.land/)
[![JSR](https://img.shields.io/badge/jsr-@ggpwnkthx%2Fjsx-blue.svg)](https://jsr.io/@ggpwnkthx/jsx)
[![CI](https://github.com/ggpwnkthx/deno-jsx/workflows/CI/badge.svg)](https://github.com/ggpwnkthx/deno-jsx)

A JSX runtime library for Deno v2.7+ providing `jsx`, `jsxs`, `jsxDEV` functions and
Fragment support. Creates normalized Virtual Node (VNode) representations for any
rendering engine.

## Installation

```typescript
import { Fragment, jsx, jsxs } from "jsr:@ggpwnkthx/jsx@0.1.7";
```

## Usage

Configure your `deno.jsonc`:

```jsonc
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@ggpwnkthx/jsx",
    "strict": true,
    "lib": ["deno.ns", "esnext"]
  }
}
```

Then write JSX:

```tsx
import { Fragment, jsx } from "jsr:@ggpwnkthx/jsx@0.1.7";

function Greeting({ name }: { name: string }) {
  return <div>Hello, {name}!</div>;
}

const vnode = jsx(Greeting, { name: "World" });

// Fragments
const list = (
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
);
```

## API

### Runtime Functions

| Function                                                   | Description                                                    |
| ---------------------------------------------------------- | -------------------------------------------------------------- |
| `jsx(type, props, key?)`                                   | Creates a VNode for an element, Fragment, or calls a component |
| `jsxs(type, props, key?)`                                  | Static children optimization (alias for `jsx`)                 |
| `jsxDEV(type, props, key, isStaticChildren, source, self)` | Development mode with source location tracking                 |
| `createFragment(children?)`                                | Helper to create a Fragment VNode with optional children       |

### VNode Helpers

| Function                                             | Description               |
| ---------------------------------------------------- | ------------------------- |
| `createElementVNode(type, props, key?, children?)`   | Creates an element VNode  |
| `createTextVNode(value)`                             | Creates a text VNode      |
| `createFragmentVNode(key?, children?)`               | Creates a fragment VNode  |
| `createComponentVNode(type, props, key?, children?)` | Creates a component VNode |

### Type Guards

`isVNode`, `isElementVNode`, `isTextVNode`, `isFragmentVNode`, `isComponentVNode`,
`isComponentType`, `isFragmentType`

### Normalization

`normalizeChild`, `normalizeChildren`

### Constants

| Constant   | Description                                                    |
| ---------- | -------------------------------------------------------------- |
| `Fragment` | `Symbol.for("@ggpwnkthx/jsx.fragment")` - used as Fragment tag |

## VNode Types

The runtime produces four kinds of VNodes:

| Kind        | Description                                         |
| ----------- | --------------------------------------------------- |
| `element`   | HTML tags like `"div"`, `"span"`                    |
| `text`      | Strings and numbers rendered as text                |
| `fragment`  | `<>` or `<Fragment>` wrappers                       |
| `component` | Unevaluated function components (evaluated eagerly) |

## Key Features

- **Eager component evaluation** - Components are called immediately during `jsx()`
- **Fragment flattening** - Keyless fragments are flattened into parent children
- **Child normalization** - `null`, `undefined`, and `boolean` are filtered; strings/numbers become text VNodes
- **Class component rejection** - Throws `TypeError("Class components are not supported")`

## Resources

- [Examples](./examples/) - Usage examples
- [CHANGELOG](./CHANGELOG.md) - Version history
- [CONTRIBUTING](./CONTRIBUTING.md) - Contribution guidelines
- [LICENSE](./LICENSE.md) - MIT License
