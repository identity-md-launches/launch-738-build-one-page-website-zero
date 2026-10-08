# Zero To One ($ZTO)

The existing home page for launch #737 plus a static `/buy/` player-card landing page. React, TypeScript and Vite source lives in `web/`; the complete production export lives in `dist/`. The home page's wording, token facts, sections and existing destinations are preserved. Its navigation now includes **Buy**, with narrow-screen spacing to accommodate the fourth link. Initial fragment navigation also works when returning from the new page.

`web/public/buy/index.html` is copied **byte-for-byte** by Vite to `dist/buy/index.html`. All 16 requested Twitter/Open Graph tags, the heading, disclosure, iframe and fallback link exist in the raw HTML. This is not a React route and requires no SPA rewrite or JavaScript to expose its content. Its only script is the local `buy/theme.js`, which preserves the home page's `zto-theme` preference. The landing page adds no wallet code, analytics or external scripts. The external iframe itself runs the widget at its unchanged home, `https://inverted0888.github.io/zto/`.

## Install and develop

Use Node 22.12 or newer. This assignment used Node 22.23.3 and npm 10.9.9.

```sh
cd web
npm ci
npm run dev
```

The existing `web/package.json`, `web/package-lock.json`, Vite configuration and TypeScript configuration are unchanged. Installation needs the registry or a populated npm cache. Keep development dependencies and caches out of the submission; no vendored npm registry is needed.

## Typecheck, rebuild and preview

```sh
cd web
npm run typecheck
npm run build
npm run preview -- --host 127.0.0.1
```

Vite replaces repository-root `dist/`. The existing `base: './'` keeps bundled assets relative; the buy page also uses relative CSS, JavaScript and favicon URLs. Open `/buy/` at the HTTP preview URL. To preview the finished export without installing dependencies, run `python3 -m http.server 8080 --directory dist` from the repository root and open `http://localhost:8080/buy/`.

For this bounded worker assignment, builds ran in an isolated copy at `/tmp/zto-buy-build-yShVHQ/web`, with `npm ci --ignore-scripts --no-audit --no-fund`. After the final source correction, `npm run typecheck` and `npm run build` passed there, and the complete generated `dist/` replaced the repository export. No dependency, lockfile, build configuration, ignore file or repository `node_modules` was modified. `node --check web/public/buy/theme.js` also passed; the existing TypeScript command checks the React source, not public JavaScript.

## Publish at the existing address

The network publisher must publish **all contents of `dist/`**, preserving `buy/index.html`, `buy/buy.css`, `buy/theme.js`, `assets/` and `favicon.svg`, as the next version of **zto.site.identitymd.eth**, served at **https://zto.sites.imd.fun/**. Publish the directory, not only its root HTML, and serve `/buy/` as its directory index without rewriting it to the home page. Keep the widget and player-card URLs exactly as supplied. No on-chain deployment is involved.

The required Buy navigation destination is root-relative `/buy/`; deploy this export at the existing site's root. Other assets and return links resolve relatively, including a direct visit under a gateway subpath. A gateway serving only a prefixed directory must also expose the explicitly requested root `/buy/` destination for that navigation link.

**Publication status:** the new export is ready for the network publisher. No publishing capability is exposed to this worker, so the live update was not performed here. An HTTP GET of the public `/buy/` during this assignment returned the previously deployed home-page HTML (HTTP 200, without the player tags). Local HTTP GETs of the new export at `/buy/` and `/preview/buy/` returned the exact static file and all 16 tags. These are separate checks; local success is not a claim of live publication or X card approval. After publication, fetch `https://zto.sites.imd.fun/buy/` and compare its raw body to `dist/buy/index.html`.

Only `dist/` is runtime content. Submit source, the existing manifests/lockfile, documentation and the complete export; exclude dependencies, caches and test scaffolding. Git metadata is managed by the network submission process, not modified by this worker.

## Validation actually performed

The final production build and TypeScript check passed. `artifacts/check.mjs` passed all 11 checks in Chromium 156.0.8078.4 against a foreground HTTP server serving the actual export at root and `/preview/`:

- Exact raw HTML metadata, byte-identical public-file copy, exact iframe and fallback attributes, and relative local assets.
- Both pages at 320, 390, 704, 705, 768, 992 and 1440 CSS pixels in light and dark themes: 28 samples with no parent-document horizontal overflow.
- Home → Buy, Buy → all three home sections, wordmark return, home clipboard copy, keyboard skip/focus, theme switching and persistence, and fallback new-tab navigation with no opener.
- Buy page with JavaScript disabled and the frame deliberately blocked; live system theme changes and unavailable local storage.
- Buy-page 200% root text at 1440 and 320px, forced-colors focus and reduced motion. This is text enlargement, not native browser zoom.
- Real remote widget rendering at its required URL; no wallet connection or transaction was performed.
- No console errors, uncaught page errors or failed requests in the normal browser context (deliberately blocked-frame tests were separate).
- Two axe scans of the parent landing page: zero violations. The external iframe was excluded from those scoped scans. Measured parent text contrast passes 4.5:1 in both themes; focus versus page background passes 3:1.

The supplied browser connector returned `Transport closed`; local Playwright supplied the rendered checks instead. Final screenshots were opened and inspected. See [the six-domain review](artifacts/validation.md), [machine-readable checks](artifacts/checks.json), and [implemented design](DESIGN.md). Screen readers, physical devices, Safari, Firefox, native zoom, X's actual card rendering and transaction execution were not tested. At a 272px iframe viewport, the external widget has some clipped route/fee text; an initial cross-frame accessibility scan also flagged widget contrast and landmark ambiguity. Its source is outside this assignment, its URL and dimensions are deliberately unchanged, and the requested fallback remains available.

To repeat the browser checks without adding product dependencies:

```sh
npm install --prefix /tmp/zto-check-tools --no-audit --no-fund playwright@1.64.0 @axe-core/playwright@4.13.0
PLAYWRIGHT_BROWSERS_PATH=/tmp/zto-check-browsers node /tmp/zto-check-tools/node_modules/playwright/cli.js install chromium
ZTO_BROWSER_TOOLS=/tmp/zto-check-tools PLAYWRIGHT_BROWSERS_PATH=/tmp/zto-check-browsers node artifacts/check.mjs
```

Run from the repository root. The script owns and closes its server and browser and writes evidence under `artifacts/`. The live widget may change or become unavailable independently of this static export.

## Provenance

Token facts and wording follow the existing assignment and source. No token contract, supply, ownership, launch destination or existing Uniswap link was changed. Design review uses the pinned Better Interface reference; design-documentation methodology uses the pinned Impeccable reference. Their notices and licenses, and the bundled React runtime license, remain in [docs/NOTICE.md](docs/NOTICE.md).
