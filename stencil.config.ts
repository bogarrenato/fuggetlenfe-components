import { Config } from '@stencil/core';

/**
 * Stencil build configuration — standalone polyrepo version.
 *
 * This package is the single source of truth for every framework-independent primitive.
 * The output targets fan out the compiled component runtime to three delivery channels:
 *
 *   1. `dist`                    — legacy ESM/CJS bundle used by CDN consumers.
 *   2. `dist-custom-elements`    — tree-shakeable per-component modules (browser runtime).
 *   3. `dist-hydrate-script`     — Node-compatible `hydrate` module exposing renderToString
 *                                  and hydrateDocument for SSR / SSG with Declarative Shadow DOM.
 *
 * Framework wrappers (React, Angular) live in their own repositories and consume this
 * package as an npm dependency. The wrapper code is generated during the monorepo PoC
 * build via @stencil/react-output-target and @stencil/angular-output-target, then
 * committed to their respective repos.
 *
 * SSR contract enforcement:
 * - Every component MUST guard DOM access with `typeof window` / `typeof document` checks.
 * - Interaction-time APIs are only allowed inside componentDidLoad (client-only lifecycle).
 * - State that differs between server and client must be injected through props/attributes.
 */
export const config: Config = {
  namespace: 'fuggetlenfe',
  srcDir: 'src',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'dist-custom-elements',
      dir: 'components',
      externalRuntime: false
    },
    {
      type: 'dist-hydrate-script',
      dir: 'hydrate'
    },
    {
      type: 'docs-readme'
    }
  ],
  testing: {
    browserHeadless: 'shell'
  }
};
