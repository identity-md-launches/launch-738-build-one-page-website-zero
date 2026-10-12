# Zero To One ($ZTO)

The home page for launch #737 plus two static X (Twitter) player-card landing pages: `/buy/` and, new in this job, `/mint/`. React, TypeScript and Vite source lives in `web/`; the complete production export lives in `dist/`. The home page's wording, token facts, sections and destinations are unchanged. The shared header navigation now has a small **Mint** link right after **Buy**, on the home page and on the buy page.

`web/public/mint/index.html` is copied **byte-for-byte** by Vite to `dist/mint/index.html`, exactly like the buy page. All 16 requested Twitter/Open Graph tags, the heading "Mint Pepeolithic", the one-line description, the iframe and the "Open the mint page in a new tab" fallback exist in the raw HTML, so X's crawler reads them without running JavaScript. It is not a React route and needs no rewrite rule. Its only script is the local `mint/theme.js`, a copy of the buy page's theme control that shares the `zto-theme` preference. No wallet code, analytics or script from another host was added. The iframe and the `twitter:player` tag point at the widget's real home, `https://inverted0888.github.io/zto/mint/`, unchanged.

The home `index.html` head also gained Open Graph tags (`og:title`, `og:description`, `og:url`, `og:image` using the project's existing `$ZTO` card at the widget host, declared at its real 1200×1200 size) so a shared home link unfurls. Nothing visible on the home page changed.

## Install and develop

Use Node 22.12 or newer. This assignment used Node 24.21.0 and npm 11.19.0.

```sh
cd web
npm ci
npm run dev
```

`web/package.json`, `web/package-lock.json`, the Vite configuration and the TypeScript configuration are unchanged. Installation needs the registry or a populated npm cache. Keep `node_modules` and caches out of the submission; no vendored registry is needed.

## Typecheck, rebuild and preview

```sh
cd web
npm run typecheck
npm run build
npm run preview -- --host 127.0.0.1
```

Vite replaces repository-root `dist/`. The existing `base: './'` keeps bundled assets relative; the buy and mint pages use relative CSS, JavaScript and favicon URLs. Open `/buy/` and `/mint/` at the preview URL. To preview the finished export without installing anything, run `python3 -m http.server 8080 --directory dist` from the repository root and open `http://localhost:8080/mint/`.

For this bounded worker assignment the build ran in a scratch copy of `web/` (`test/scratch/build/web`, deleted before submission) with `npm ci --ignore-scripts --no-audit --no-fund`, then `npm run typecheck` (exit 0) and `npx vite build --outDir <repo>/dist --emptyOutDir` (exit 0) after the final source change. `node --check web/public/mint/theme.js` also passed. No dependency, lockfile, build configuration, ignore file or repository `node_modules` was modified.

## Publish at the existing address

The network publisher must publish **all contents of `dist/`**, preserving `mint/index.html`, `mint/mint.css`, `mint/theme.js`, `buy/index.html`, `buy/buy.css`, `buy/theme.js`, `assets/` and `favicon.svg`, as the next version of **zto.site.identitymd.eth**, served at **https://zto.sites.imd.fun/**. Publish the directory, not only its root HTML, and serve `/mint/` and `/buy/` as directory indexes without rewriting them to the home page. Keep the widget and player-card URLs exactly as supplied. No on-chain deployment is involved.

The Buy and Mint navigation destinations are root-relative `/buy/` and `/mint/`, so deploy this export at the site's root. Assets and return links resolve relatively, including a direct visit under a gateway subpath.

**Publication status:** the export is ready for the network publisher; no publishing capability is exposed to this worker, so the live update was not performed here. During this assignment a GET of the public `https://zto.sites.imd.fun/buy/` returned the player-card page from the previous job, and a GET of `https://zto.sites.imd.fun/mint/` returned the currently deployed home-page HTML (HTTP 200, no player tags). Local GETs of the new export at `/mint/` and `/preview/mint/` returned the exact static file with all 16 tags. After publication, fetch `https://zto.sites.imd.fun/mint/` and compare its raw body to `dist/mint/index.html`; then validate the URL in X's card validator.

Only `dist/` is runtime content. Submit source, the existing manifests/lockfile, documentation and the complete export; exclude dependencies, caches and test scaffolding. Git metadata is managed by the network submission process.

## Validation actually performed

The final production build and TypeScript check passed. `artifacts/check.mjs` passed all 38 checks in Google Chrome 150.0.7871.114 (driven by Playwright 1.64) against its own foreground static server serving the actual export at root and under `/preview/`:

- Raw HTTP fetches of `/mint/` and `/preview/mint/` return HTML with all 16 tags exactly; `dist/mint/index.html` is byte-identical to the public source; the iframe, fallback link, heading and line match the request exactly; the only script is the local `./theme.js`.
- Home, buy, mint and `/preview/mint/` at 320, 390, 704, 705, 768, 992 and 1440 CSS pixels in both themes: 56 samples with no horizontal overflow.
- At 390 wide the heading, line and the start of the mint widget are on the first screen, and all five navigation links sit on one row at 44px height without overlapping.
- Navigation: home → Mint, mint → Buy, buy → Mint, mint → home section, wordmark return from a subpath; relative asset loading under `/preview/`.
- Keyboard: skip link first, full tab order, 2px solid focus outline at every parent stop, forced-colors focus; theme toggle with persistence to the home page and system-scheme following.
- Fallback link opens the widget in a new tab with no `window.opener`; the live widget renders inside the frame; JavaScript-disabled rendering; 200% root text reflow at 320 and 1440.
- axe-core 4.10.3: zero violations in both themes on the parent page (iframe excluded). Measured parent text contrast is at least 5.9:1 and focus contrast at least 5.39:1 in both themes.
- No console errors, uncaught page errors or failed requests.

One defect was found and fixed during the run: the heading word "Pepeolithic" overflowed at 200% text on a 320px viewport; `mint.css` now lets it break only when it cannot fit. Known limitations: at 320px "Mint" wraps alone onto a second navigation row (deliberately left, to keep the shared header's look); the external widget clips some of its own text inside a 272px-wide frame; the home page's pre-existing 200%-text overflow at 320px is outside this job. Screen readers, physical devices, Safari, Firefox, native zoom, X's actual card rendering and any transaction were not tested. See [the six-domain review](artifacts/validation.md), [machine-readable checks](artifacts/checks.json), the screenshots in `artifacts/`, and [the implemented design](DESIGN.md). The network excludes `artifacts/` from the Git submission and uploads it separately, so those files travel with the job rather than the repository.

The supplied browser connector blocks `file:` URLs and provides no preview server, so the script runs its own. To repeat it without adding product dependencies, point it at any Playwright 1.50+ package and, optionally, axe-core:

```sh
npm install --prefix /tmp/zto-check-tools --no-audit --no-fund playwright@1.56.1 axe-core@4.10.3
ZTO_PLAYWRIGHT=/tmp/zto-check-tools/node_modules/playwright \
ZTO_AXE=/tmp/zto-check-tools/node_modules/axe-core/axe.min.js \
ZTO_CHROME=chrome node artifacts/check.mjs
```

Run from the repository root with Google Chrome installed (`ZTO_CHROME` accepts a channel name or an executable path). The script owns and closes its server and browser and rewrites the evidence under `artifacts/`. The live widget may change independently of this static export.

## Provenance

Token facts and wording follow the existing assignment and source. No token contract, supply, ownership, launch destination or existing Uniswap link was changed. Design review uses the pinned Better Interface reference; design-documentation methodology uses the pinned Impeccable reference. Their notices and licenses, and the bundled React runtime license, remain in [docs/NOTICE.md](docs/NOTICE.md).
