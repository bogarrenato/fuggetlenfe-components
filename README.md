# @fuggetlenfe/components

Stencil web components – framework-agnostic, Figma-backed primitives.

## Components

- **ff-button** — The sole Figma-backed button primitive. Visual identity is supplied externally via CSS custom properties (token contract + brand pack).

## Build

```bash
npm install
npm run build
```

## SSR / Hydrate

The `hydrate` export provides `renderToString` and `hydrateDocument` for server-side rendering with Declarative Shadow DOM.
