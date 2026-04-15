# fuggetlenfe-components

Framework-independent Stencil primitives for the Fuggetlenfe platform.

## Scope

This repository owns only the web component core:

- framework-independent logic
- DOM contract
- SSR hydrate module
- Storybook
- versioned component documentation site
- structural CSS that consumes the external semantic-first token contract

It does not own:

- React wrapper generation
- Angular wrapper generation
- tokens or official brand packs

Those live in separate repositories and consume the published npm packages.

## Engineering guardrails

- The component layer is unstyled in the product-brand sense: it reads only the published `--ff-*` contract.
- Shared control tokens such as radius and padding come from `@fuggetlenfe/tokens`; concrete brand values come from `@fuggetlenfe/brand-styles`.
- React and Angular wrappers must stay thin and consume this package as an external dependency, not through cross-repo source coupling.

## Primitive governance

The shipped surface is governed by the **Source Alignment Gate**. A Stencil component may be added to this package only if it has a matching entry in the authoritative Figma Source Manifest at `fuggetlenfe-tokens/src/figma-source-manifest.json` with `status: "stable"` and `shipping` including `"core"`.

Today the package ships a single stable primitive, `ff-button`. `ff-input` is registered as `status: "roadmap"` in the manifest and is blocked on two recorded design decisions. Previously inventoried components (`ff-dropdown`, `ff-modal`, `ff-data-table`) were removed in 2026-04 because they had no Figma source and are tracked under the manifest's `nonShippedInventory` audit trail. They are not re-introduced without a new Figma source.

## Local commands

```bash
npm install
npm run build
npm test
npm run build-storybook
npm run build:docs-site
```

## Release order

Release this repository after `fuggetlenfe-tokens` and before the wrapper repositories.

1. `@fuggetlenfe/tokens`
2. `@fuggetlenfe/brand-styles`
3. `@fuggetlenfe/components`
4. `@fuggetlenfe/react-wrapper`
5. `@fuggetlenfe/angular-wrapper`

## Publishing

Publishing is handled by GitHub Actions and requires:

- `NPM_TOKEN` repository secret
- a previously published `@fuggetlenfe/tokens` version

The release workflow:

1. bumps the package version
2. installs published token dependencies
3. builds the Stencil package
4. runs tests
5. builds Storybook
6. builds a versioned docs site
7. publishes to npm
8. pushes the release tag
9. deploys versioned docs to GitHub Pages
