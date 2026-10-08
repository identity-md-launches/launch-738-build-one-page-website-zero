# Zero To One — implemented design

## Overview

This is a reading and navigation page for people looking up $ZTO. A large typographic `0 → 1` introduces the name; sections 00, 01 and 02 explain the token, its allocation and its origin. The page is deliberately sparse: system monospace, warm amber, straight edges, flat surfaces and thin structural rules. ZTO has its own wordmark; IMD appears as the pool pair and in one linked footer credit.

The home page source of truth is `web/src/styles.css`, with markup and behavior in `web/src/main.tsx`. The added `/buy/` page is static HTML in `web/public/buy/index.html`; `buy.css` copies the existing tokens and header styles into a stable public asset, and `theme.js` implements only the matching theme control. Vite copies these files unchanged to `dist/buy/`. Keep the duplicated header/token values in sync when changing the design system. There are no image assets in the hero. The local favicon is a small SVG mark in `web/public/favicon.svg`.

## Colors

All component colors use semantic CSS properties. Hex values are canonical. `:root` defines dark mode; `[data-theme="light"]` overrides the same roles.

| Token | Dark | Light | Role |
| --- | --- | --- | --- |
| `--color-page` | `#111110` | `#faf9f6` | Page background |
| `--color-surface` | `#181817` | `#f2f0e9` | Contract panel; resource hover |
| `--color-text` | `#f4f3ef` | `#171714` | Main text and controls |
| `--color-muted` | `#a6a49e` | `#62615b` | Descriptions and metadata |
| `--color-border` | `#353532` | `#d5d2c9` | Structural hairlines, ticker |
| `--color-control-border` | `#75746e` | `#858178` | Button outlines |
| `--color-accent` | `#f5a623` | `#985700` | Brand mark, primary action, section indices |
| `--color-on-accent` | `#111110` | `#ffffff` | Primary action and selected text |
| `--color-action-hover` | `#ffb944` | `#7b4500` | Primary hover/active fill |
| `--color-hover` | `#242422` | `#e8e5dc` | Secondary control hover/active |
| `--color-focus` | `#f5a623` | `#985700` | Keyboard outline |
| `--color-pool` | `#f5a623` | `#985700` | Pool allocation indicator |
| `--color-swarm` | `#c9c7c0` | `#5c5b55` | Swarm allocation indicator |
| `--color-launcher` | `#75746e` | `#969289` | Launcher allocation indicator |

Amber represents the brand and emphasis, not a success/error status. Copy outcomes also use explicit words and an icon. Allocation labels and numbers carry all meaning independently of the decorative bar colors. The primary Uniswap link is the only filled action. Structural rules do not carry text contrast requirements.

For the new landing page, measured text/page pairs are 17.02:1 (main text) and 7.58:1 (muted text) in dark mode; 17.06:1 and 5.90:1 in light mode. Focus/page pairs are 9.32:1 dark and 5.39:1 light. Exact computed colors and WCAG luminance ratios are in `artifacts/checks.json`. These measurements cover the parent page, not the external widget, and are not a conformance claim.

## Typography

The stack is `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`, inherited throughout including buttons and the address. No font files are downloaded. Normal weight is 400; the wordmark requests 700. `font-synthesis: none` avoids synthetic styles. Actual glyph shapes depend on installed system fonts; only the Chromium/Linux rendering was inspected.

| Role | Source value | Line height / treatment |
| --- | --- | --- |
| Body | `--text-body: 1rem` | 1.6 |
| Small / action | `--text-small: .875rem` | Inherited 1.6 |
| Labels | `--text-label: .8125rem` | Inherited 1.6; a few mobile metadata labels use .75rem |
| H1 name | `clamp(1.875rem, 3.5vw, 3rem)` | 1.3; -.045em tracking |
| General H2 | `--text-heading: clamp(1.5rem, 2.6vw, 2rem)` | 1.25; -.045em tracking |
| Origin H2 | `clamp(1.75rem, 3.5vw, 2.625rem)` | 1.25 |
| Supply H2 caption | `1rem` | 1.25; normal tracking |
| Decorative hero | `clamp(7.5rem, 25vw, 20rem)` | 1.12; -.08em tracking; arrow is .75em |
| Total supply | `clamp(1.75rem, 4.25vw, 3.25rem)` | 1.2; -.065em tracking |
| Split percentages | `2.5rem`, mobile `2rem` | 1.2; percent sign 1.25rem |

Headings balance; paragraphs use `text-wrap: pretty`. Home descriptions have a 58ch maximum measure; the buy-page disclosure uses 64ch and wraps naturally instead of forcing a single physical line. The full contract address and source label use `overflow-wrap: anywhere`, never ellipsis. Numbers use tabular figures. The address is explicitly left-to-right and selectable. Existing home labels retain their lower-case voice. The new Buy link, heading, disclosure and fallback retain the exact wording and capitalization from the assignment.

## Layout

Spacing tokens are `.5rem`, `1rem`, `1.5rem`, `2rem`, `3rem` and `5rem` (`--space-1` through `--space-6`). Fine label gaps use .25rem/.375rem; control insets also use .75rem/1.25rem. The centered `.site-shell` has a 76rem maximum width including its 3rem side padding.

`.numbered-section` uses a 13rem label column and a flexible content column, separated by 2rem; each section has 5rem vertical padding. The hero and footer share the outer alignment. The supply bar has three tracks in an 88:10:2 ratio with 3px separators; explicit percentages remain the source of exact values.

- At **62rem and below**, outer padding becomes 2rem, section labels become a 9rem column, and the address/copy row stacks. The buy row can wrap.
- At **44rem and below**, padding becomes 1.5rem, navigation gets a separate row with an 8px minimum column gap and can wrap under text enlargement, sections use one column and 3rem vertical padding, the buy action spans the content width, and allocation items become stacked rows with right-aligned values. Contract metadata and copy recovery stack; the footer wraps.
- There is no fixed header, hidden horizontal overflow, content clipping or truncated token address. The progress rule is a static decorative motif, not a live progress meter.

The final home and buy exports were checked at 320, 390, 704, 705, 768, 992 and 1440px in both themes with no parent-document horizontal overflow. Buy-page desktop and mobile screenshots were inspected. The buy page also reflowed at 200% root text at 1440 and 320px; its wordmark may wrap between spans at enlarged text sizes. Native browser zoom and other browser engines remain unverified.

The buy page centers its H1, a single disclosure paragraph, the iframe, and an underlined fallback link. `.buy-content` has 5rem vertical padding, reduced to 3rem at 44rem and below. The disclosure has 1.5rem top and 2rem bottom margin; the fallback has 1.5rem top margin and a 44px minimum target height. The iframe remains 480 × 560 CSS pixels with `max-width: 100%`, so it narrows to the available content width while retaining height. At 320px the frame is 272px wide. The external widget currently has minor internal horizontal overflow at that width; its styling cannot be controlled by the parent and its required dimensions remain unchanged.

## Elevation & Depth

The system is flat. A slightly different surface fill identifies the contract panel. One-pixel borders separate sections, controls and resource rows. There are no shadows, gradients, floating cards or overlays. The only elevated element is the skip link while focused (`z-index: 2`).

## Shapes

Controls and panels have square corners; `button` explicitly has `border-radius: 0`. Status/category markers are small squares. Inline utility SVGs use `currentColor` and a 1.5px stroke. The hero is text, not an SVG or bitmap. The favicon's drawn mark is a separate local browser icon. The buy iframe's explicitly requested 14px radius is an exception to the surrounding square control system; no rounded card or shadow was added around it.

## Components

These are local components and patterns, not an exported component library.

| Component/pattern | Location | Behavior and reuse |
| --- | --- | --- |
| `ThemeToggle` | `web/src/main.tsx:15` | Native button names its destination theme; follows system preference until chosen; persists `zto-theme`; storage failure does not prevent switching. The small inline script in `web/index.html` sets the initial theme before React. |
| `Contract` | `web/src/main.tsx:50` | Full address, copy button and explorer link. Idle, pending, copied and failed states; disables only while pending. A stable polite status announces feedback. Failure adds `select address`, which selects the exact value for manual copying. Feedback persists. |
| `Arrow` | `web/src/main.tsx:11` | Decorative external-destination glyph hidden from the accessibility tree. |
| `.wordmark` | `web/src/main.tsx:108` | `$ZTO / 0 → 1` home link. Accessible name includes the visible symbol. |
| `.numbered-section` | `web/src/styles.css:86` | Section index, lowercase label and content column; single column on phones. |
| `.primary-button` | `web/src/styles.css` | Native anchor for navigation; 52px minimum height; amber fill; 44px or higher secondary controls. |
| `.resource-links` | `web/src/styles.css` | Whole-row anchors with a title, descriptive secondary line and arrow; borders preserve structure. |
| `.allocations` | `web/src/main.tsx` | Semantic definition list with visible labels, percentages and token amounts. |
| Static buy header | `web/public/buy/index.html:31`, `web/public/buy/theme.js` | Same wordmark, section labels, colors and theme button as home; section links return to the home fragments and Buy has `aria-current="page"`. The local script follows system preference until chosen and shares `zto-theme`; when JavaScript is disabled the theme button stays hidden while the static content remains. |
| Player landing | `web/public/buy/index.html:39` | One H1, exact disclosure, titled iframe and underlined new-tab fallback. The external widget is the sole trading UI. No parent wallet, analytics, remote font or external script is added. |

All parent-page interactive controls use native keyboard behavior. `:focus-visible` draws a 2px amber outline with 5px offset; forced-colors mode substitutes system `Highlight`. A first-in-order skip link targets focusable `main`. Hover styles run only under `(hover: hover)`. There are no animations or transitions, so reduced-motion users get the same immediate, static behavior and theme changes do not crossfade. The parent pages have no forms, dialogs, data loading, filters or empty result sets. The embedded widget has its own third-party interface and loading behavior; these are outside the parent design system.

## Do's and Don'ts

- Reuse `.site-shell`, `.numbered-section` and the semantic color/spacing tokens for another section or page; preserve a single H1 and descriptive heading order.
- Keep one filled primary action; use native anchors for destinations and buttons for local actions. Preserve 44px targets and visible focus.
- Keep the complete address available, and retain exact chain/token parameters in the Uniswap URL.
- Preserve the system monospace stack, amber accent, square surfaces and quiet spacing. Do not introduce terminal green, external fonts, gradients or decorative illustrations. Preserve the explicitly required iframe radius without changing the surrounding controls.
- Keep required facts and disclaimer readable independently of decorative marks and colors. New pages should have their own title, reuse the existing header, and use fragment links or explicit static exports. The buy brief requests only its header and minimal purchase content, so it has no footer. Keep player metadata in raw public HTML and keep both the iframe and player URL at the widget’s original host.

Documentation method adapted from the pinned Impeccable guide; design review uses the pinned Better Interface guide. Attribution and licenses are in `docs/NOTICE.md` and `docs/design-guidance-LICENSE.txt`.
