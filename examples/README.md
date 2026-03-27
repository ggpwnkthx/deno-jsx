# JSX Runtime Examples

Example files demonstrating usage of `@ggpwnkthx/jsx`.

## TSX Authoring Examples

These examples demonstrate how to write JSX using angle-bracket syntax.
They show the recommended way to use this library for application code.

| File                     | Description                                             |
| ------------------------ | ------------------------------------------------------- |
| `basic-setup.tsx`        | Minimal component with TSX syntax                       |
| `intrinsic-elements.tsx` | HTML elements with props and children                   |
| `components.tsx`         | Function components with props                          |
| `fragments.tsx`          | Fragment syntax (`<>...</>`) and keyless/keyed behavior |
| `children.tsx`           | Child normalization (filtering, arrays, conditionals)   |
| `nested-components.tsx`  | Composing components with shared data                   |

### Running TSX Examples

```bash
deno run --allow-read examples/basic-setup.tsx
deno run --allow-read examples/intrinsic-elements.tsx
deno run --allow-read examples/components.tsx
deno run --allow-read examples/fragments.tsx
deno run --allow-read examples/children.tsx
deno run --allow-read examples/nested-components.tsx
```

## Runtime API Examples

These examples demonstrate the lower-level runtime functions that TSX compiles to.
They are useful for understanding how the runtime works or for writing code
without TSX syntax.

| File                       | Description                                        |
| -------------------------- | -------------------------------------------------- |
| `runtime/jsx.ts`           | Manual `jsx()` and `jsxs()` calls                  |
| `runtime/jsxdev.ts`        | Manual `jsxDEV()` with source location tracking    |
| `runtime/fragments.ts`     | Fragment behavior, `createFragment`, keyless/keyed |
| `runtime/normalization.ts` | Child normalization behavior                       |

### Running Runtime Examples

```bash
deno run --allow-read examples/runtime/jsx.ts
deno run --allow-read examples/runtime/jsxdev.ts
deno run --allow-read examples/runtime/fragments.ts
deno run --allow-read examples/runtime/normalization.ts
```

## Setup

Ensure your `deno.jsonc` has the correct configuration for TSX authoring:

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

## Key Concepts

- **TSX authoring** - Use angle-bracket syntax (`<div>`, `<Component />`)
- **`jsx(type, props, key)`** - Runtime function for creating VNodes; TSX compiles to this
- **`jsxDEV(type, props, key, isStaticChildren, source, self)`** - Development mode with source info
- **`Fragment`** - Symbol for fragment containers; use `<>...</>` shorthand in TSX
- **Components are eagerly evaluated** - Component functions run during `jsx()` call
- **Child normalization** - null, undefined, booleans filtered; strings/numbers become text nodes
