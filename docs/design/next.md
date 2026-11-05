# omxqua next: November 2026 research

What best-in-class systems do now (Vercel Geist, Linear, Radix, Apple, Material 3 Expressive, Emil Kowalski, Rauno Freiberg), checked against omxqua's code. Live comparison: `docs/design/next.html`.

## Shipped with this note (no taste involved)

- **Focus ring.** The docs said every part had a focus state, but only fields did. Now `:focus-visible` puts a 2 px accent outline 2 px clear of any button, link, `[tabindex]`, slider or `summary` (inset on menu rows and table rows; the Beacon's accent on the Beacon). Meets WCAG 2.2's focus appearance (2 px, 3:1 change).
- **Radio dot** grows from 0.5 and fades in, never from `scale(0)` (Kowalski).
- **Type:** headings `text-wrap: balance`; prose `text-wrap: pretty`; stats, deltas, badges, the Beacon's numbers and `kbd` get tabular figures so changing numbers don't shift sideways.
- **`color-scheme`** on Night and Light: native scrollbars, form controls and autofill match the theme.
- **`overscroll-behavior: contain`** on menus, sheets and the scrim: scrolling a sheet never scrolls the page under it.
- **`Omxqua.gentleIn(el, trigger)`**: pass the trigger and the pop-up grows from it (origin-aware), not from its own centre.
- **Toasts** get `role="status"` + `aria-live="polite"`: screen readers read them without stealing focus.
- **Press** springs back over `--oq-spring-fast-dur` instead of a hard-coded 320 ms, so retuning the token retunes the press.

## Proposed (your pick, see next.html)

1. **Geist Serif as the display face** for Travel (replacing Fraunces) and the editorial landing; Kids titles may use its heart dots (`ELSH 100`). Released 2026-10-30, OFL, same cap height (710) and x-height (530) as Geist. One weight so far.
2. **Amounts in Geist Sans with `tnum`**, Mono only for codes, commands, IDs and times (Vercel's rule). Today Ledger sets every amount in mono.
3. **Springs as duration + bounce** (Apple's model), generated into `linear()`. Today: fast = 0.32 s · bounce 0.23, slow = 0.39 s · bounce 0.5 (past Apple's "careful above 0.4"; unused inside the package). Proposed: fast 0.30 s · 0.15, slow capped at 0.2, and colour or opacity never bounce (Material's effects springs).
4. **Concentric corners:** `--oq-radius-inner = card radius − padding` for rows, tiles and inner panels (Apple WWDC25, Vercel guidelines).
5. **Split button** (`.split`): Material 3 Expressive's connected pair, for a main verb with variants.
6. **Tooltip timing** packaged as `Omxqua.tips(container)`: the first tip waits 500 ms, neighbours show instantly, 125 ms fade.

## Bigger moves for later

- **OKLCH seeds per family** (Linear's base + accent + contrast; Tailwind v4 is all OKLCH). Surfaces, lines and state layers derived with relative colour / `color-mix()`; the contrast tests stay the gate. Supported in every current browser.
- **Move overlay glue from JS to the platform:** `[popover]` + `@starting-style` + `transition-behavior: allow-discrete` for Gentle (Baseline 2024), `<dialog>` for Settle and sheets, CSS anchor positioning for menus and tips (Chrome 125, Safari 26, Firefox 147). Press, the liquid thumb drag and the Beacon morph stay in JS (they need velocity and measurement).
- **Fallback font metrics** (`size-adjust` on a local fallback) to stop the layout shift while Geist loads (Safari still lacks `ascent-override`).
- **Fonts to v1.9.1** from the release zip (glyph fixes only; our 1.8/1.7 have the same features). Don't copy from the repo's main branch: its Mono still has the default-ligature bug.
- **APCA as an extra check** beside WCAG 2's 4.5:1 (APCA left the WCAG 3 draft; 4.5:1 stays the legal gate).

## Already right, keep

Monochrome chrome with one accent (Linear limits accent tint; Geist is grey-first). Exit faster than enter (280/160 ms). No animation on keyboard and high-frequency actions (Rauno). Press around 0.96–0.97 (Kowalski: 0.97). 44 px phone targets, 16 px phone inputs, `touch-action: manipulation` (Vercel).

## Sources

- Geist releases and Geist Serif: github.com/vercel/geist-font/releases · vercel.com/blog/introducing-geist-serif · vercel.com/blog/introducing-geist-pixel
- Vercel Web Interface Guidelines: vercel.com/design/guidelines · vercel.com/design.md · vercel.com/geist/colors
- Apple: WWDC23 "Animate with springs" (developer.apple.com/videos/play/wwdc2023/10158) · WWDC25 session 356 (concentric shapes)
- Material 3 Expressive: androidx `ExpressiveMotionTokens.kt` / `StandardMotionTokens.kt` · design.google/library/expressive-material-design-google-research · material-components-android ButtonGroup.md
- Linear: linear.app/now/how-we-redesigned-the-linear-ui · Radix: radix-ui.com/colors/docs/palette-composition/understanding-the-scale
- Craft: emilkowal.ski/ui/7-practical-animation-tips · rauno.me/craft/interaction-design · evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl
- Contrast: w3.org/WAI/WCAG22/Understanding/focus-appearance.html · git.apcacontrast.com
