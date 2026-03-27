# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.2] - 2026-03-27

### Changed

- Restructured examples into TSX authoring examples (`examples/*.tsx`) and runtime API examples (`examples/runtime/*.ts`)
- Updated all TSX examples to use actual angle-bracket JSX syntax instead of manual `jsx()` calls
- Added `examples/shared.ts` with shared `print` utility for cleaner example code

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
