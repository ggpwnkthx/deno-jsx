# JSX Runtime Examples

Example files demonstrating usage of `@ggpwnkthx/jsx`.

## Setup

Ensure your `deno.jsonc` has the correct configuration:

```jsonc
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@ggpwnkthx/jsx"
  },
  "imports": {
    "@ggpwnkthx/jsx": "./src/mod.ts"
  }
}
```

## Running Examples

```bash
deno run --allow-read examples/basic-setup.tsx
deno run --allow-read examples/intrinsic-elements.tsx
deno run --allow-read examples/components.tsx
deno run --allow-read examples/fragments.tsx
deno run --allow-read examples/children.tsx
deno run --allow-read examples/nested-components.tsx
deno run --allow-read examples/jsxdev-example.tsx
```

## Examples

| File                     | Description                                   |
| ------------------------ | --------------------------------------------- |
| `basic-setup.tsx`        | Minimal component, importing and using `jsx`  |
| `intrinsic-elements.tsx` | HTML elements with props and children         |
| `components.tsx`         | Function components with props                |
| `fragments.tsx`          | Fragment usage, keyless vs keyed behavior     |
| `children.tsx`           | Child normalization (filtering, arrays, etc.) |
| `nested-components.tsx`  | Composing components with shared data         |
| `jsxdev-example.tsx`     | Using `jsxDEV` for development mode           |

## Key Concepts

- **`jsx(type, props, key)`** - Create VNodes for elements or call components
- **`jsxDEV(type, props, key, isStaticChildren, source, self)`** - Development mode with source info
- **`Fragment`** - Symbol for fragment containers; keyless fragments are flattened
- **Components are eagerly evaluated** - Component functions run during `jsx()` call
- **Child normalization** - null, undefined, booleans filtered; strings/numbers become text nodes
