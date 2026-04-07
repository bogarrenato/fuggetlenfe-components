import { Config } from '@stencil/core';

/**
 * Standalone polyrepo Stencil configuration.
 *
 * This repository owns only the framework-independent web component runtime.
 * React and Angular wrappers consume the published npm package from their own
 * repositories; this build never writes into sibling repos.
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
