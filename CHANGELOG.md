# Changelog

All notable changes to omxqua. Versions follow [semver](https://semver.org); each release is a git tag.

## v0.1.3 · 2026-10-20
- Source lines are a Developer-family rule; Travel and Kids leave them out (or use a `↳` note). The cover's terminal card says so.
- Cover: the phones are 20% bigger with an "open full size" link each; "a few of our own" shows all three (top islands, the growing pill, a big logo that writes itself when it scrolls in or you tap it).
- Cover: the header Beacon shows a live status (the section you're in and how far down the page) and says what it is when tapped; the old press counter is gone.
- Fix: the terminal demo's `$` prompts picked up the playground tile style.

## v0.1.2 · 2026-10-20
- Cover: "three apps, one feel": the developer, travel and kids apps live on three iPhones you can tap.
- Showcase bare mode drops its own phone bezel when embedded.
- Root index.html forwards to docs/ for GitHub Pages.

## v0.1.1 · 2026-10-20
- docs/index.html is now the cover page: "every touch, a tiny joy." A live playground (press, toggles, segmented, floating label, Beacon), a squish pad, borrowed-honestly cards, size and contrast toys, light/night.
- Reduced motion again covers ::before/::after and forces a calm ease-out (the v0.1.0 merge had weakened it).

## v0.1.0 · 2026-10-20

First packaged release, renamed from Universal Language. No visual change: `docs/showcase.html` and `docs/landing.html` render the same computed styles as the originals (kept in `docs/_before/`, not committed).

### Renamed
- Prefix `ul-` → `oq-` everywhere: classes (`oq-root`, `oq-night`, `oq-light`, `oq-family-*`, `oq-skin-*`, `oq-top`, `oq-dock`, `oq-islands`, `oq-app-*`, `oq-logo`, …), custom properties (`--ul-*` → `--oq-*`), `data-ul-*` → `data-oq-*`, the press animation id (`ul-press` → `oq-press`).
- `ul.js` → `src/omxqua.js`; `window.UL` → `window.Omxqua`.
- "Universal Language" → "omxqua" in titles, comments and docs.

### Packaged
- `src/tokens.css`: the old tokens.css merged with the token rules that lived inline in the showcase (families, skins, theme shadows, `--oq-font-display`, `--oq-island-spring`, `--oq-beacon-accent` per family and skin, `--oq-text`, `--oq-title`).
- `src/components.css`: every reusable part from the showcase, scoped with `:where(.oq-root)` so specificity is unchanged.
- `src/fonts.css`: the four `@font-face` rules, pointing at `fonts/`.
- `src/omxqua.js`: new helpers on `window.Omxqua`, moved from the showcase without changing behaviour: `placeThumb`, `settle`, `gentleIn`, `gentleOut`, `toast`, `sizeBeacon`, `layoutTopnav`, `openTopnav`, `foldTopnavLater`, `holdTopnav` (plus the existing `writeLogo`). Top nav and toast timers are now kept per element instead of one page-wide timer.
- `AGENTS.md`, `README.md`, `bin/omxqua-sync`, MIT `LICENSE` for the code.

### Where the showcase and the old tokens.css disagreed (the showcase won)
- `--oq-font`: dropped the `"Inter"` fallback (`"Geist", system-ui, sans-serif`).
- `--oq-font-mono`: dropped the `"JetBrains Mono"` fallback (`"Geist Mono", ui-monospace, monospace`).
- `--oq-radius-card` base: 16px → 14px (families still set 12 / 16 / 22).
- `--oq-target` base: 44px → 36px (families still set 34 / 40 / 48).
- `--oq-spring-fast-dur` on touch screens: 430ms → 300ms (laptops were already 300ms; `--oq-spring-dur` and `--oq-spring-slow-dur` keep their phone and laptop values).
- Light theme `--oq-shadow-1..3`: tinted `rgba(20,16,10,…)` instead of `rgba(16,16,20,…)`; shadow-1's ring alpha .04 → .045. (`--oq-shadow-4` keeps the old value; the showcase had none.)
- Reduced motion: the rule is the showcase's, `.oq-root * { transition-duration: 150ms; animation-duration: 150ms }` (both `!important`); it no longer forces `transition-timing-function: ease-out` or covers `::before`/`::after`.
- `.oq-root` now also sets `font-size: var(--oq-text)` and `-webkit-font-smoothing: antialiased`.
