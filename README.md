# Zero To One ($ZTO)

A one-page site for launch #737: a plain community token on Ethereum, chain ID 1. React, TypeScript and Vite source lives in `web/`. The complete production export lives in `dist/`; publish that directory without rebuilding.

The page includes the full contract address, copy and manual-copy recovery, an Etherscan link, an Ethereum Uniswap swap link with ZTO prefilled, the 1,000,000,000 supply and 88% / 10% / 2% split, launch/source links, and the community-token disclaimer. The 2% launcher share is the remainder of the supplied allocation. There is no wallet connection, backend, analytics, external script, remote font, or runtime API call. The only stored preference is `zto-theme` in local storage.

## Install and develop

Use Node 22.12 or newer (validated with Node 22.23.3 and npm 10.9.9).

```sh
cd web
npm ci
npm run dev
```

`web/package-lock.json` pins the dependency tree. Initial dependency installation needs the registry or a populated local npm cache. No npm registry mirror or dependency archive is included. Generated `node_modules` and caches are development-only and must not enter the submission. No ignore file was added or changed.

## Typecheck, rebuild and preview

```sh
cd web
npm run typecheck
npm run build
npm run preview -- --host 127.0.0.1
```

Vite replaces repository-root `dist/`. `base: './'` emits relative asset URLs. Preview the HTTP URL printed by Vite; opening the HTML with `file://` is not a supported module-loading setup.

To preview the supplied export without installing anything, run `python3 -m http.server 8080 --directory dist` from the repository root and open `http://localhost:8080/`.

## Publish

Upload **all contents of `dist/`**, keeping `assets/` alongside `index.html` and `favicon.svg`, to a static HTTPS host or IPFS directory. It works at a root or gateway subpath. Use the directory URL with a trailing slash; no SPA rewrite or server function is needed. The site uses in-page fragment links only. Serve `.js` as JavaScript and `.css` as CSS. HTTPS enables the normal Clipboard API; if copying is blocked, the page provides a selectable-address fallback.

Deploy only `dist/`, not the source, test evidence, or development dependencies. No deployment was performed in this assignment. The network submission process can collect the source, lockfile, documentation and export without any Git metadata modifications by this worker.

## Validation actually performed

The final production build and `npm run typecheck` both passed. To respect the repository's protected dependency paths, the source was copied to `/tmp/zto-build/web`; dependencies were installed there, and the generated lockfile/export were copied back. A subsequent `npm ci --offline --cache /tmp/zto-npm-cache --ignore-scripts --no-audit --no-fund` also passed from the lockfile and populated cache. This does not claim a fresh offline machine can install without its dependencies.

`artifacts/check.mjs` passed against the final `dist/` served under `/preview/` in Chromium 153. It owns and closes its foreground preview server and browser. Checks included:

- Six widths (320, 390, 704, 768, 992 and 1440px) in both themes: no horizontal document overflow; interactive targets at least 44px high.
- Real clipboard roundtrip, repeated keyboard copying, pending state, clipboard denial/absence, and manual selection of the exact address, including at 320px.
- Skip link, twelve keyboard focus stops, three section links, and all five external link destinations.
- Theme switching by mouse and keyboard, persistence, live system preference, and blocked local storage.
- Four axe scans: zero violations. Axe flags the decorative hero arrow for manual contrast review; sampled rendered text pairs pass 4.5:1. This is not a full accessibility certification.
- Forced-colors focus, reduced-motion preference, and 200% root text at desktop width. No console errors, failed asset requests, or external runtime requests.

Screenshots were opened and inspected, not just generated. See [the six-domain review](artifacts/validation.md), [machine-readable results](artifacts/checks.json), [link checks](artifacts/links.json), and [design documentation](DESIGN.md). Native browser zoom, screen-reader use, physical devices, Safari and Firefox were not tested. Etherscan blocked the HTTP availability probe with 403; its exact-address link was checked structurally. Uniswap, the swarm token page, GitHub and imd.fun returned HTTP 200. No wallet or swap transaction was exercised.

To repeat the browser checks without adding test dependencies to the product:

```sh
npm install --prefix /tmp/zto-browser --cache /tmp/zto-npm-cache --no-audit --no-fund playwright@1.63.0 @axe-core/playwright@4.13.0
PLAYWRIGHT_BROWSERS_PATH=/tmp/zto-browsers node /tmp/zto-browser/node_modules/playwright/cli.js install chromium
ZTO_BROWSER_TOOLS=/tmp/zto-browser PLAYWRIGHT_BROWSERS_PATH=/tmp/zto-browsers node artifacts/check.mjs
```

Run those commands from the repository root. Browser packages and binaries are not included in the submission. The checks regenerate evidence in `artifacts/`.

## Provenance

The token facts and wording follow the assignment. The [source repository](https://github.com/identity-md-launches/launch-737-zero-to-one) corroborates the supply and split. The explorer publishes this launch at [its token-address route](https://explorer.imd.fun/token/0xd782bdea4ef02a0bd391eb9089470c8080f0a68e), not `/launch/737`. Swap parameters follow Uniswap's [custom-linking documentation](https://developers.uniswap.org/docs/trading/custom-interface-links) and [chain parameter documentation](https://developers.uniswap.org/docs/trading/embed-app). See [third-party notices](docs/NOTICE.md) for the pinned design-guide attribution and runtime license.
