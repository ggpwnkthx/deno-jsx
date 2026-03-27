# AGENTS.md

This document provides guidance for AI agents operating in this repository.

## Project Overview

A JSX runtime library for Deno v2.7+. Provides `jsx`, `jsxs`, `jsxDEV` functions and Fragment support for building JSX-based UIs.

## Build/Lint/Test Commands

### Standard Tasks

```bash
deno task ci         # Run all CI checks (fmt && lint --fix && check && test)
deno task test       # Run all tests with coverage
deno task coverage    # Generate LCOV coverage report
deno task coverage:check  # Verify coverage thresholds
deno task bench       # Run benchmarks
deno task fmt         # Format code
deno task lint        # Lint code
deno task check       # Type-check src/mod.ts
```

### Single Test Execution

```bash
# Run a specific test file (use .tsx for JSX files)
deno test -A --no-check --sloppy-imports ./tests/jsx.test.ts

# Run a specific test by name (uses regex)
deno test -A --no-check --sloppy-imports --filter "test name pattern" ./tests/

# Run with coverage
deno test -A --no-check --sloppy-imports --coverage=coverage ./tests
```

Note: `--no-check --sloppy-imports` are required for TSX tests due to jsxImportSource.

### Permissions

- `--allow-read` - File system access
- `--allow-write` - File system writes
- `--allow-net` - Network access
- `--allow-env` - Environment variables

## Code Style Guidelines

### TypeScript

- **Strict mode always** - `strict: true` in deno.jsonc
- **Avoid `any`** - Use `unknown` + type narrowing
- **Prefer generics** over large union types
- Use `interface` for object shapes; `type` for unions/intersections
- Use `Record<string, unknown>` for untyped props, not `any`

### Imports

- Use jsr.io packages only; never `https://deno.land`
- Pin versions: `import { X } from "jsr:@scope/pkg@1.2.3";`
- Current deps: `@std/assert@1.0.19`
- Sort: external → internal (@ggpwnkthx/jsx) → relative (./src)

### Formatting (from deno.jsonc)

```json
{
  "lineWidth": 88,
  "indentWidth": 2,
  "useTabs": false,
  "semiColons": true,
  "singleQuote": false,
  "proseWrap": "preserve",
  "trailingCommas": "onlyMultiLine",
  "operatorPosition": "nextLine"
}
```

### Naming Conventions

- **Files**: kebab-case (`my-file.ts`)
- **Types/Interfaces**: PascalCase
- **Functions/Methods**: camelCase
- **Constants**: SCREAMING_SNAKE_CASE
- **Enums**: PascalCase with UPPER values

## Documentation Standards

### Module Docs

Every public entrypoint must have a `/** @module */` doc:

```typescript
/**
 * Production JSX runtime implementation.
 * @module
 */
```

### Exported Symbols

All exported functions, types, and constants need JSDoc:

```typescript
/**
 * Creates a normalized element vnode.
 * @param type - HTML tag name or component function
 * @param props - Element props (null for no props)
 * @param key - Optional vnode key
 * @returns A typed VNode
 */
export function createElementVNode(...): ElementVNode;
```

## Architecture

### Directory Structure

```
src/              # Source code
  mod.ts          # Public entry point
  jsx-runtime.ts       # Production jsx/jsxs runtime
  jsx-dev-runtime.ts    # Dev-mode jsxDEV runtime
  normalize.ts    # Child normalization & component evaluation
  vnode.ts        # VNode creation helpers
  fragment.ts     # Fragment symbol and helpers
  types.ts        # Type definitions, Fragment constant
tests/            # Test suite (mirrors src structure)
benchmarks/      # Performance benchmarks
deno.jsonc       # Deno configuration
```

### Key Concepts

- **VNode**: Virtual node representation (`kind: "element" | "text" | "fragment" | "component"`)
- **Fragment**: `Symbol.for("@ggpwnkthx/jsx.fragment")` - used as Fragment tag
- **normalize.ts**: Central child normalization, component evaluation, Fragment flattening
- Components are **eagerly evaluated** during jsx() call
- Keyless fragments are **flattened** in child lists; keyed fragments are **preserved**

## Testing Guidelines

- Use `@std/assert` for assertions
- Tests use `--no-check --sloppy-imports` flags
- Use descriptive test names: `"jsx creates fragment vnodes for Fragment"`

### Test Patterns

```typescript
import { assertEquals, assertThrows } from "@std/assert@1.0.19";

Deno.test("myFeature works correctly", () => {
  assertEquals(myFeature(), expected);
});

Deno.test("invalid input throws TypedError", () => {
  assertThrows(() => myFunction(invalidInput), TypeError, "clear message");
});
```

## Error Handling

- Use typed errors with clear messages
- Components should return `Normalizable` (VNode | string | number | boolean | null | undefined | Normalizable[])
- Class components are not supported - throws `TypeError("Class components are not supported")`

## Pull Request Checklist

- [ ] Branch from `main`
- [ ] Add/update tests for all changes
- [ ] Run `deno task ci` - all checks must pass
- [ ] Update documentation if public API changed
- [ ] Verify no `any` types introduced

## Configuration

```jsonc
// deno.jsonc compilerOptions
{
  "jsx": "react-jsx",
  "jsxImportSource": "@ggpwnkthx/jsx",
  "strict": true,
  "lib": ["deno.ns", "esnext"]
}
```

## Quick Reference

```bash
# Run CI checks
deno task ci

# Run specific test  
deno test -A --no-check --sloppy-imports ./tests/jsx.test.ts

# Type-check
deno check ./src/mod.ts

# Format and lint
deno fmt && deno lint ./src ./tests
```
