# fuggetlenfe-components

Framework-independent Stencil primitives for the Fuggetlenfe platform.

## Scope

This repository owns only the web component core:

- framework-independent logic
- DOM contract
- SSR hydrate module
- Storybook
- versioned component documentation site

It does not own:

- React wrapper generation
- Angular wrapper generation
- tokens or official brand packs

Those live in separate repositories and consume the published npm packages.

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
