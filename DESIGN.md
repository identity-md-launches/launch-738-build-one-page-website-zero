# Zero To One — implemented design

## Overview

This is a reading and navigation page for people looking up $ZTO. A large typographic `0 → 1` introduces the name; sections 00, 01 and 02 explain the token, its allocation and its origin. The page is deliberately sparse: system monospace, warm amber, straight edges, flat surfaces and thin structural rules. ZTO has its own wordmark; IMD appears as the pool pair and in one linked footer credit.

The source of truth is `web/src/styles.css`, with markup and behavior in `web/src/main.tsx`. There are no image assets in the hero. The local favicon is a small SVG mark in `web/public/favicon.svg`.

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

Measured rendered normal-text samples range from 7.13:1 to 17.02:1 in dark mode and 5.39:1 to 17.06:1 in light mode. The primary button measures 9.32:1 dark and 5.68:1 light. Exact foreground/background pairs are in `artifacts/checks.json`; these are WCAG luminance ratios, not APCA scores or a conformance claim.

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

Headings balance; paragraphs use `text-wrap: pretty`. Descriptions have a 58ch maximum measure. The full contract address and source label use `overflow-wrap: anywhere`, never ellipsis. Numbers use tabular figures. The address is explicitly left-to-right and selectable. Labels are written in the requested lower-case voice; the proper token name and symbol preserve their case.

## Layout

Spacing tokens are `.5rem`, `1rem`, `1.5rem`, `2rem`, `3rem` and `5rem` (`--space-1` through `--space-6`). Fine label gaps use .25rem/.375rem; control insets also use .75rem/1.25rem. The centered `.site-shell` has a 76rem maximum width including its 3rem side padding.

`.numbered-section` uses a 13rem label column and a flexible content column, separated by 2rem; each section has 5rem vertical padding. The hero and footer share the outer alignment. The supply bar has three tracks in an 88:10:2 ratio with 3px separators; explicit percentages remain the source of exact values.

- At **62rem and below**, outer padding becomes 2rem, section labels become a 9rem column, and the address/copy row stacks. The buy row can wrap.
- At **44rem and below**, padding becomes 1.5rem, navigation gets a separate row, sections use one column and 3rem vertical padding, the buy action spans the content width, and allocation items become stacked rows with right-aligned values. Contract metadata and copy recovery stack; the footer wraps.
- There is no fixed header, hidden horizontal overflow, content clipping or truncated token address. The progress rule is a static decorative motif, not a live progress meter.

Final source/export was checked at 320, 390, 704, 768, 992 and 1440px in both themes. Rendered mobile and desktop screenshots were inspected. 200% root text at 1440px also reflowed without document overflow. Native browser zoom and other browser engines remain unverified.

## Elevation & Depth

The system is flat. A slightly different surface fill identifies the contract panel. One-pixel borders separate sections, controls and resource rows. There are no shadows, gradients, floating cards or overlays. The only elevated element is the skip link while focused (`z-index: 2`).

## Shapes

Controls and panels have square corners; `button` explicitly has `border-radius: 0`. Status/category markers are small squares. Inline utility SVGs use `currentColor` and a 1.5px stroke. The hero is text, not an SVG or bitmap. The favicon's drawn mark is a separate local browser icon.

## Components

These are local components and patterns, not an exported component library.

| Component/pattern | Location | Behavior and reuse |
| --- | --- | --- |
| `ThemeToggle` | `web/src/main.tsx:15` | Native button names its destination theme; follows system preference until chosen; persists `zto-theme`; storage failure does not prevent switching. The small inline script in `web/index.html` sets the initial theme before React. |
| `Contract` | `web/src/main.tsx:50` | Full address, copy button and explorer link. Idle, pending, copied and failed states; disables only while pending. A stable polite status announces feedback. Failure adds `select address`, which selects the exact value for manual copying. Feedback persists. |
| `Arrow` | `web/src/main.tsx:11` | Decorative external-destination glyph hidden from the accessibility tree. |
| `.wordmark` | `web/src/main.tsx:100` | `$ZTO / 0 → 1` home link. Accessible name includes the visible symbol. |
| `.numbered-section` | `web/src/styles.css:86` | Section index, lowercase label and content column; single column on phones. |
| `.primary-button` | `web/src/styles.css` | Native anchor for navigation; 52px minimum height; amber fill; 44px or higher secondary controls. |
| `.resource-links` | `web/src/styles.css` | Whole-row anchors with a title, descriptive secondary line and arrow; borders preserve structure. |
| `.allocations` | `web/src/main.tsx:130` | Semantic definition list with visible labels, percentages and token amounts. |

All interactive controls use native keyboard behavior. `:focus-visible` draws a 2px amber outline with 5px offset; forced-colors mode substitutes system `Highlight`. A first-in-order skip link targets focusable `main`. Hover styles run only under `(hover: hover)`. There are no animations or transitions, so reduced-motion users get the same immediate, static behavior and theme changes do not crossfade. Forms, dialogs, loading data, filters and empty result sets do not exist in this product.

## Do's and Don'ts

- Reuse `.site-shell`, `.numbered-section` and the semantic color/spacing tokens for another section or page; preserve a single H1 and descriptive heading order.
- Keep one filled primary action; use native anchors for destinations and buttons for local actions. Preserve 44px targets and visible focus.
- Keep the complete address available, and retain exact chain/token parameters in the Uniswap URL.
- Preserve the system monospace stack, amber accent, square surfaces and quiet spacing. Do not introduce terminal green, external fonts, gradients, rounded cards or decorative illustrations.
- Keep required facts and disclaimer readable independently of decorative marks and colors. New pages should have their own title, reuse the existing header/footer, and use fragment links or explicit static exports.

Documentation method adapted from the pinned Impeccable guide; design review uses the pinned Better Interface guide. Attribution and licenses are in `docs/NOTICE.md` and `docs/design-guidance-LICENSE.txt`.
