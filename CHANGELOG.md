# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.6] - 2026-03-27

### Added

- Public documentation for `Fragment` re-export in jsx-runtime.ts and jsx-dev-runtime.ts
- Public documentation for `JsxDevSource` type export in jsx-dev-runtime.ts

## [0.1.5] - 2026-03-27

### Added

- JSDoc documentation for internal type re-exports and Fragment re-exports in jsx-runtime.ts and jsx-dev-runtime.ts

## [0.1.4] - 2026-03-27

### Added

- JSDoc documentation for remaining undocumented exports: `Fragment`, `JsxPrimitive`, `JsxComponent`, `JsxTag`, `JsxKey`, `JsxRenderable`, `JsxProps`

## [0.1.3] - 2026-03-27

### Fixed

- Fixed `IntrinsicElements` to use `keyof HTMLElementTagNameMap` instead of generic string index to prevent custom components from being incorrectly typed as intrinsic elements
- Made `Fragment` a callable interface with `$$typeof` property to satisfy TypeScript's JSX element type requirements
- Updated `ElementType` return type to include `null` to support components returning `null`
- Removed non-existent `benchmarks` directory from `deno.jsonc` check and lint tasks

## [0.1.2] - 2026-03-27

### Added

- Added `src/jsx-types.ts` with JSX types for automatic runtime compatibility (`JsxPrimitive`, `JsxComponent`, `JsxTag`, `JsxKey`, `JsxRenderable`, `JsxProps`, `JsxElement`)

### Changed

- Restructured examples into TSX authoring examples (`examples/*.tsx`) and runtime API examples (`examples/runtime/*.ts`)
- Updated all TSX examples to use actual angle-bracket JSX syntax instead of manual `jsx()` calls
- Added `examples/shared.ts` with shared `print` utility for cleaner example code
- Replaced `declare global { namespace JSX { ... } }` with `export namespace JSX { ... }` in `jsx-runtime.ts` and `jsx-dev-runtime.ts` for JSR compliance

### Fixed

- Global `JSX.IntrinsicElements` declaration to fix "implicit any" error when using JSX syntax

## [0.1.1] - 2026-03-27

### Added

- Module documentation for all entrypoints (`jsx-runtime.ts`, `jsx-dev-runtime.ts`)
- JSDoc documentation for all exported symbols (types, functions, interfaces)

## [0.1.0] - 2026-03-27

### Added

- Initial release of `@ggpwnkthx/jsx`
- `jsx` function for creating VNodes from elements, Fragments, or components
- `jsxs` function as an alias for `jsx` (used for static children optimization)
- `jsxDEV` function for development mode with source location tracking
- `Fragment` constant (`Symbol.for("@ggpwnkthx/jsx.fragment")`)
- VNode creation helpers: `createElementVNode`, `createTextVNode`, `createFragmentVNode`, `createComponentVNode`
- Type guards: `isVNode`, `isElementVNode`, `isTextVNode`, `isFragmentVNode`, `isComponentVNode`, `isComponentType`, `isFragmentType`
- Normalization functions: `normalizeChild`, `normalizeChildren`
- Fragment helper: `createFragment`
- `Fragment` symbol support in JSX syntax via `jsxImportSource`
- Support for Deno v2.7+ with JSR distribution
