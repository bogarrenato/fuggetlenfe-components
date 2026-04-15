import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const packageJson = JSON.parse(await readFile(path.join(repoRoot, 'package.json'), 'utf8'));

const currentVersion = packageJson.version;
const versions = Array.from(
  new Set(
    (process.env.DOCS_VERSIONS ?? currentVersion)
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean)
      .concat(currentVersion)
  )
).sort(compareVersionsDesc);

const repoName = process.env.DOCS_REPO_NAME ?? 'fuggetlenfe-components';
const basePath = process.env.DOCS_BASE_PATH ?? `/${repoName}`;
const storybookSourceDir = path.join(repoRoot, 'storybook-static');
const siteDir = path.join(repoRoot, 'site');

await rm(siteDir, { recursive: true, force: true });
await mkdir(siteDir, { recursive: true });

await writeFile(
  path.join(siteDir, 'index.html'),
  `<meta http-equiv="refresh" content="0; url=${basePath}/latest/" />\n`
);

await writeFile(
  path.join(siteDir, 'versions.json'),
  `${JSON.stringify({ latest: currentVersion, versions }, null, 2)}\n`
);

for (const version of versions) {
  const versionDir = version === currentVersion ? path.join(siteDir, 'latest') : path.join(siteDir, `v${version}`);
  await mkdir(versionDir, { recursive: true });
  await writeFile(path.join(versionDir, 'index.html'), buildHtml({ basePath, currentVersion, selectedVersion: version, versions }));

  if (version === currentVersion) {
    const versionArchiveDir = path.join(siteDir, `v${version}`);
    await mkdir(versionArchiveDir, { recursive: true });
    await writeFile(path.join(versionArchiveDir, 'index.html'), buildHtml({ basePath, currentVersion, selectedVersion: version, versions }));
  }
}

if (await exists(storybookSourceDir)) {
  await cp(storybookSourceDir, path.join(siteDir, 'latest', 'storybook'), { recursive: true });
  await cp(storybookSourceDir, path.join(siteDir, `v${currentVersion}`, 'storybook'), { recursive: true });
}

console.log(`Built versioned docs site into ${siteDir}`);

function buildHtml({ basePath, currentVersion, selectedVersion, versions }) {
  const versionOptions = versions
    .map((version) => {
      const targetPath = version === currentVersion ? `${basePath}/latest/` : `${basePath}/v${version}/`;
      const isSelected = version === selectedVersion ? ' selected' : '';
      return `<option value="${targetPath}"${isSelected}>v${version}</option>`;
    })
    .join('');

  const storybookHref =
    selectedVersion === currentVersion ? `${basePath}/latest/storybook/` : `${basePath}/v${selectedVersion}/storybook/`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Fuggetlenfe Components</title>
    <style>
      :root {
        color-scheme: light;
        --canvas: #f5f7fb;
        --surface: rgba(255, 255, 255, 0.9);
        --surface-strong: #ffffff;
        --border: #d6dde4;
        --text: #10243d;
        --text-soft: #526173;
        --accent: #0f9f6e;
        --accent-soft: rgba(15, 159, 110, 0.14);
        --radius-lg: 28px;
        --radius-md: 18px;
        --radius-sm: 12px;
        --shadow: 0 24px 60px rgba(16, 36, 61, 0.08);
        --font-body: "IBM Plex Sans", "Segoe UI", Arial, sans-serif;
        --font-heading: "Space Grotesk", "Segoe UI", Arial, sans-serif;
        --font-code: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-width: 320px;
        background:
          radial-gradient(circle at top left, rgba(15, 159, 110, 0.17), transparent 30%),
          radial-gradient(circle at bottom right, rgba(16, 36, 61, 0.08), transparent 36%),
          var(--canvas);
        color: var(--text);
        font-family: var(--font-body);
      }
      a { color: inherit; }
      .layout {
        width: min(1200px, calc(100vw - 2rem));
        margin: 0 auto;
        padding: 1.25rem 0 3rem;
        display: grid;
        gap: 1rem;
      }
      .hero, .card {
        border: 1px solid var(--border);
        background: var(--surface);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow);
      }
      .hero {
        padding: 1.5rem;
        display: grid;
        gap: 1rem;
      }
      .hero-top {
        display: flex;
        justify-content: space-between;
        align-items: start;
        gap: 1rem;
        flex-wrap: wrap;
      }
      .brand {
        display: inline-flex;
        gap: 0.55rem;
        align-items: center;
        padding: 0.4rem 0.7rem;
        border-radius: 999px;
        background: var(--accent-soft);
        color: var(--accent);
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }
      .brand-dot {
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 999px;
        background: var(--accent);
      }
      .version-panel {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.7rem 0.9rem;
        border-radius: var(--radius-sm);
        border: 1px solid var(--border);
        background: var(--surface-strong);
      }
      .version-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.35rem 0.6rem;
        border-radius: 999px;
        background: var(--accent-soft);
        color: var(--accent);
        font-size: 0.78rem;
        font-weight: 700;
      }
      .version-select {
        min-width: 9rem;
        border: 1px solid var(--border);
        border-radius: 10px;
        background: white;
        padding: 0.45rem 0.65rem;
        font: inherit;
      }
      h1 {
        margin: 0;
        font-family: var(--font-heading);
        font-size: clamp(2.2rem, 5vw, 4rem);
        line-height: 0.95;
      }
      .copy {
        max-width: 74ch;
        color: var(--text-soft);
        line-height: 1.8;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 1rem;
      }
      .card {
        padding: 1.1rem 1.15rem;
      }
      .card h2 {
        margin: 0 0 0.5rem;
        font-family: var(--font-heading);
        font-size: 1.4rem;
      }
      .card p {
        margin: 0 0 1rem;
        color: var(--text-soft);
        line-height: 1.7;
      }
      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
      }
      .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.75rem 1rem;
        border-radius: 999px;
        border: 1px solid transparent;
        background: var(--accent);
        color: white;
        text-decoration: none;
        font-weight: 700;
      }
      .button.secondary {
        background: white;
        color: var(--text);
        border-color: var(--border);
      }
      code {
        font-family: var(--font-code);
      }
      ul {
        margin: 0;
        padding-left: 1.15rem;
        color: var(--text-soft);
        line-height: 1.8;
      }
      @media (max-width: 720px) {
        .hero-top {
          align-items: stretch;
        }
        .version-panel {
          width: 100%;
          justify-content: space-between;
        }
      }
    </style>
  </head>
  <body>
    <main class="layout">
      <section class="hero">
        <div class="hero-top">
          <div>
            <span class="brand"><span class="brand-dot"></span>Stencil Core</span>
            <h1>Fuggetlenfe Components</h1>
          </div>
          <div class="version-panel">
            <span class="version-badge">Latest v${currentVersion}</span>
            <label>
              <span class="sr-only" style="position:absolute;left:-9999px">Documentation version</span>
              <select class="version-select" onchange="if (this.value) window.location.href=this.value;">
                ${versionOptions}
              </select>
            </label>
          </div>
        </div>
        <p class="copy">
          Framework-independent, token-driven Stencil primitives for the Fuggetlenfe platform.
          This site is versioned per published package release so consumer teams can align
          documentation, Storybook, and npm artifacts to the same released contract.
        </p>
      </section>

      <section class="grid">
        <article class="card">
          <h2>Current Release</h2>
          <p>
            You are viewing <strong>v${selectedVersion}</strong>. The latest published version is
            <strong>v${currentVersion}</strong>.
          </p>
          <div class="actions">
            <a class="button" href="${storybookHref}">Open Storybook</a>
            <a class="button secondary" href="https://www.npmjs.com/package/@fuggetlenfe/components">View on npm</a>
          </div>
        </article>

        <article class="card">
          <h2>Install</h2>
          <p>Consumer applications install the published package from npm and pair it with the token contract.</p>
          <pre><code>npm install @fuggetlenfe/components @fuggetlenfe/tokens @fuggetlenfe/brand-styles</code></pre>
        </article>

        <article class="card">
          <h2>Repository Map</h2>
          <ul>
            <li><a href="https://github.com/bogarrenato/fuggetlenfe-components">fuggetlenfe-components</a> owns the web component core and Storybook.</li>
            <li><a href="https://github.com/bogarrenato/fuggetlenfe-tokens">fuggetlenfe-tokens</a> owns the semantic-first token sync and official brand packs.</li>
            <li><a href="https://github.com/bogarrenato/fuggetlenfe-react-wrapper">fuggetlenfe-react-wrapper</a> and <a href="https://github.com/bogarrenato/fuggetlenfe-angular-wrapper">fuggetlenfe-angular-wrapper</a> stay thin framework bridges.</li>
            <li>Documentation is versioned with the released package so the repo boundary stays visible to consumers.</li>
          </ul>
        </article>
      </section>
    </main>
  </body>
</html>
`;
}

async function exists(targetPath) {
  try {
    await readFile(path.join(targetPath, 'index.html'));
    return true;
  } catch {
    return false;
  }
}

function compareVersionsDesc(left, right) {
  const leftParts = left.split('.').map(Number);
  const rightParts = right.split('.').map(Number);

  for (let index = 0; index < Math.max(leftParts.length, rightParts.length); index += 1) {
    const diff = (rightParts[index] ?? 0) - (leftParts[index] ?? 0);
    if (diff !== 0) {
      return diff;
    }
  }

  return 0;
}
