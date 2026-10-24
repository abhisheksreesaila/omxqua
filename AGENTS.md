# AGENTS.md: omxqua quick reference

omxqua (always lowercase; omx + aqua) is one design language for every app, phone and web: **Material texture** (opaque tonal surfaces, state layers, one soft shadow scale) with **Liquid motion** (real springs, press squash, morph from source). This file is what you need to build a screen. The full rules and their reasons are in `LANGUAGE.md`; the live reference is `docs/showcase.html`.

Don't invent values. Every colour, radius, size and curve is a `--oq-*` token in `src/tokens.css`.

## 1. Load it

Copy the package into your project with `bin/omxqua-sync <dest-dir>` (see README), then link the four files in this order:

```html
<link rel="stylesheet" href="omxqua/src/fonts.css">       <!-- Geist, Geist Mono, Fraunces, Nunito (self-hosted) -->
<link rel="stylesheet" href="omxqua/src/tokens.css">      <!-- every --oq-* value: themes, families, skins, accents -->
<link rel="stylesheet" href="omxqua/src/components.css">  <!-- every reusable part, scoped under .oq-root -->
<script src="omxqua/src/omxqua.js" defer></script>        <!-- press, logo, motion helpers on window.Omxqua (the logo's look is in components.css) -->
```

Root classes go on one element (usually `<html>` or the app frame):

```
oq-root  oq-night | oq-light  oq-family-<dev|travel|kids|money>  [oq-skin-<name>]  [oq-top | oq-dock]
```

- `oq-top` (Top islands) is the default shell for new apps; `oq-dock` puts the nav pill at the bottom. `oq-islands` (side island) and no shell class (plain sidebar) exist for dense admin tools only.
- The root element must also be a size container, because the phone rules are container queries. The islands (brand, nav pill, tab bar, Beacon) are `position: fixed`, so they stick while the page or `.main` scrolls. Full-page app: nothing else to do. Inside a frame or preview: give the frame `contain: layout` so they pin to it instead of the window. The showcase's `.cx-screen` does this:
  `display: flex; flex-direction: column; container-type: inline-size; position: relative; overflow: hidden; contain: layout;`
- Components use `:where(.oq-root) .part`, so the scope adds no specificity: one class of yours overrides a part. Rules starting with a root class (`.oq-family-kids .mark`) are as specific as they look.
- An app without a family can use `oq-app-<ink|teal|amber|violet|sage|rose>` for its accent and `oq-compact` for density (both in tokens.css).

## 2. Families and skins

A family sets surfaces, accent, data palette and character for Night and Light. A skin is an alternative look for a family: same components, different surfaces, colour, type and texture. All pairs pass 4.5:1 (`tests/contrast.test.cjs` checks every family and skin).

| Family (`oq-family-…`) | For | Night / Light surface-0 | Accent (Night / Light) | Targets, cards, type | Beacon accent |
|---|---|---|---|---|---|
| `dev` · Graphite | libraries, PyPI packages, consoles | #0b0b0d / #eeeef1 | ink #ededef / #0b0b0d | 34 px, cards 12, 13.5 px, mono-forward | #3ccf6e |
| `travel` · Coast | trips, places, days | #0b1214 / #f4f0e9 | sea teal #5fd4c8 / #0b6e69 | 40 px, cards 16, 14 px; kinds carry colour, days never do | #5fd4c8 |
| `kids` · Playground | children's apps | #171221 / #fff6ea | tangerine #ffad66 / #c2410c | 48 px, cards 22, inputs 14, 15.5 px, title 32 | #ffad66 |
| `money` · Ledger | accounts, spending, budgets | #0d0c12 / #f1f0f5 | violet #b8aaff / #5b4bd6 | 40 px, cards 16, 14 px; every amount mono and tabular, categories carry the data colours | #4ade9b |

| Skin (`oq-skin-…`) | Family | Character | Accent (Night / Light) |
|---|---|---|---|
| `azulejo` | travel | paper + tile blue, Fraunces display, crisper corners (cards 10, title 36) | #8fb4ea / #1f4f8f |
| `golden` | travel | peach / espresso, rounder (cards 22, title 34) | #ffb45c / #a34a0a |
| `sticker` | kids | Nunito, chunky ledge shadows, buttons and tiles press down 4 px (`--oq-press: ledge`) | #4fb3ff / #1971c2 |
| `crayon` | kids | Nunito, pastel tiles tinted with their own colour, berry accent, cards 28 | #ff8fb8 / #c2185b |

**Picked looks (owner, 2026-10-21): Travel apps use `oq-skin-azulejo`; Kids apps use the base Playground (no skin class).** Coast, Golden hour, Sticker and Crayon stay available as alternates. Without a skin class you get the family's base look.

Colour rules: one accent per app, used only for the one loud button per card and the focus ring. Data colours (`--oq-data-1..6`) are for series and kinds and never double as the accent. States (`ok`, `warn`, `bad`, `info`) always come with the word. `--oq-ink-faint` is never text.

## 3. Components

Every part below has hover, press, focus and disabled states built in. Press is never CSS: `omxqua.js` squashes anything tappable (see Motion). Icons are `<svg class="ico" viewBox="0 0 24 24">` with Lucide-style strokes (1.7, round caps).

### Buttons: `.btn` + `.fill | .tonal | .text | .danger`, sizes `.sm | .lg`, `.icon`
```html
<button class="btn fill"><svg class="ico">…</svg>Publish 0.3.0</button>
<button class="btn tonal">Preview</button> <button class="btn text">Cancel</button>
<button class="btn tonal icon" aria-label="Search"><svg class="ico">…</svg></button>
```
States: hover = state-layer tint (fill lifts 1 px to shadow-2); `[disabled]` = 45% and no pointer. Rule: **one `.fill` per card**, with a specific verb ("Serve qwen2.5-0.5b", never "Submit"); the rest tonal or text. Pill shape = tappable.

**Flat inside panels:** put `.oq-flat` on a panel, blade, sheet or command bar and its buttons sit on the surface: no shadow, no hover lift, tonal gets a state tint. Elevation is for things that float (islands, the Beacon, menus), not buttons on a card.

### Close: `.xbtn`
```html
<button class="xbtn" aria-label="Close"><svg class="ico">x</svg></button>
```
A 32 px circle, 16 px icon dead centre, tinted state layer. Top-right, centred on the title line (in a 20 px-padded dialog: 14 px from top and right). Never a text "✕".

### Badges: `.badge` + `.ok | .warn | .bad | .info`
```html
<span class="badge ok"><i></i>passed</span> <span class="badge">v0.2.0</span>
```
Status = a square-cornered mono badge; the `<i>` is the dot. Always a word, never colour alone.

### Chips: `.chip`, `.chip.on`, `.chip .x`
```html
<button class="chip on">All</button> <button class="chip">linux <span class="x"><svg class="ico">…</svg></span></button>
```
Filters and suggested edits. Your JS toggles `.on`. No outline: off is a light state tint with `ink-2` text, on is a 16% tint of the accent with ink text in 600 weight (2026-10-24).

### Field: `.mo` (floating label in the border)
```html
<label class="mo"><input placeholder=" "><span class="fl">Package name</span></label>
<div class="mf-help">Lowercase, used in pip install</div>
```
- `placeholder=" "` is required (the label floats on `:placeholder-shown`).
- Error: `.mo.err` + `<div class="mf-help err">That email is missing its domain, like maya@example.com</div>` (a sentence, below).
- Leading icon: `.mo.has-lead` with `<span class="lead"><svg class="ico">…</svg></span>` before the input; a shortcut hint is a `<kbd>` after the label.
- Select: `<button class="mo sel"><span class="fl">Python</span><span class="val">3.11 and newer</span><span class="chev">…</span></button>` (reset the button's font, colour, text-align and border) opening a `.menu`.
- Legacy (label above): `.field > label + .input > input`, `.help`, `.err`, `.input.is-err`, `.select`. New screens use `.mo`.
Rule: no filled or underlined fields.

### Toggles: `.switch`, `.check`, `.radio` (all `.on`), row wrapper `.row-ctl`
```html
<div class="row-ctl"><button class="switch on" aria-pressed="true"></button>Email me on release</div>
<div class="row-ctl"><button class="check on"></button>Linux <button class="radio on"></button>Public</div>
```
The switch knob stretches toward where it will go while held, then settles. No halo. Your JS toggles `.on` (one radio per group).

### Segmented: `.seg2` · Tabs: `.tabs`
```html
<div class="seg2"><i></i><button class="on">Day</button><button>Week</button></div>
<div class="tabs"><i></i><button class="on">Overview</button><button>Releases</button></div>
```
The first child `<i>` is the thumb. After render and on every click (move `.on` first): `Omxqua.placeThumb(group)`.

### Slider: `.slider`
```html
<input type="range" class="slider" value="40" style="--v:40%" oninput="this.style.setProperty('--v', this.value + '%')">
```
The track is a solid fill to `--v` (the one allowed gradient syntax).

### Card: `.card` > `.card-h` (`h3`, `.sp` spacer) + `.card-b` + `.src`
```html
<section class="card">
  <div class="card-h"><h3>Downloads</h3><span class="sp"></span><span class="badge">main</span></div>
  <div class="card-b">…</div>
  <div class="src">pypistats recent omxcore <button class="cp">copy</button></div>
</section>
```
Rule (Developer family): **every card ends in a mono source line** (the query, the command, the file). Travel and Kids leave it out, or use `.src.note` when something was left out. `.src` prints `$`; `.src.note` prints `↳` for a plain note ("3 of 14 shown").

### Table: `.tbl` (`th.num`, `td.num`) · Stats: `.stats` + `.delta.up | .down`
```html
<table class="tbl"><thead><tr><th>Name</th><th class="num">Size</th></tr></thead><tbody><tr><td>sdist</td><td class="num">0.9 MB</td></tr></tbody></table>
<div class="stats"><div><b>5,912<span class="delta up">+11%</span></b><span>downloads / week</span></div>…</div>
```
Hairline rows, mono right-aligned tabular numbers. A long list scrolls inside its card. Stats are 4 columns, 2 on phone.

### Progress and loading: `.prog` (`> i` with a width), `.prog.indet`, `.skel`
Loading is skeleton rows, never zeros. Empty: `.empty` with `.ring` icon, `<b>` line and the one action that fills it:
```html
<div class="empty"><div class="ring"><svg class="ico">…</svg></div><b>No releases yet</b>Publish your first version to see it here.<div><button class="btn fill sm">Publish</button></div></div>
```

### Overlays: `.menu` (`.mi`, `.mi.danger`, `.lab`, `hr`, `kbd`), `.tip`, `.toast`, `.scrim` + `.dialog`, `.sheet` + `.grab`
```html
<div class="menu" hidden><div class="lab">Release</div><button class="mi"><svg class="ico">…</svg>Copy install command<kbd>⌘C</kbd></button><hr><button class="mi danger">Yank 0.1.4</button></div>
<div class="tip" hidden>Search<kbd>⌘K</kbd></div>
<div class="toast" hidden><span>Copied</span><button class="btn text sm">Undo</button></div>
<div class="scrim" hidden><div class="dialog" style="position:relative"><button class="xbtn" style="position:absolute;top:14px;right:14px" aria-label="Close">…</button><h3>Publish 0.3.0?</h3><p>…</p><div class="acts"><button class="btn text">Cancel</button><button class="btn fill">Publish 0.3.0</button></div></div></div>
<div class="sheet" hidden><div class="grab"></div>…</div>
```
- Menus and tips are absolutely placed by you (below the trigger, 6 px gap), opened with `Omxqua.gentleIn(el)` and closed with `Omxqua.gentleOut(el)`. Themed, never the browser's list.
- Toast: `Omxqua.toast(toastEl, "Release 0.3.0 published", msgSpan)`; it fades out 2.6 s after the last call. Offer Undo.
- Dialog and sheet sit over `.scrim`; the sheet rises 40 px over 320 ms (Settle tier). Their open/close glue is still inline in the showcase (section 9).

### Coloured icons: `.ic-tile`, `.ico-c`, nav items with `--c`
```html
<h3><span class="ic-tile" style="--c:var(--oq-data-1)"><svg class="ico">…</svg></span>Friday in Lisbon</h3>
<span class="ic-tile lg" style="--c:var(--oq-data-3)"><svg class="ico">…</svg></span>   <!-- 36 px, for list rows -->
<button data-i="2" style="--c:var(--oq-data-3)"><svg class="ico">…</svg>Assistant</button>   <!-- in .topnav or .tabbar -->
```
Set `--c` to a data colour. `.ic-tile` is a 28 px rounded square in a 15% tint of that colour with the icon in the colour; `.ico-c` is a bare coloured icon; a nav item with `--c` shows its icon in colour until it's picked. The glyph is mixed toward ink by `--oq-icon-mix` (Night 100%, Light 88%, Kids Light 60%) so it clears 3:1 on its tile, the card and the nav in every theme (`tests/contrast.test.cjs`). Colour here marks what a thing is, never its state, and never doubles as the accent.

### Avatar `.avatar` · Icon `.ico` · helpers
`<span class="avatar" style="background:var(--oq-data-1)">AS</span>`. Layout helpers: `.grid` with `.g-2` (1.6fr 1fr), `.g-3`, `.g-2e`; `.wrap-row`; `.mono`; `.ink2` (secondary ink); `.hide-n` (hidden on phone).

## 4. Shells

All shells share one markup; root classes pick the layout.

```html
<div class="oq-root oq-night oq-family-dev oq-top screen">
  <div class="shell">
    <aside class="side">…brand, .nav items, .grp, .foot…</aside>   <!-- shown only by the sidebar / side-island shells -->
    <main class="main">
      <div class="ph"><div><h1>omxcore</h1><div class="sub">MX frame engine · Apache-2.0</div></div><span class="sp"></span><div class="acts">…</div></div>
      …cards…
    </main>
  </div>
  <nav class="tabbar"><i class="tb-thumb"></i><button class="on" aria-label="Overview"><svg class="ico">…</svg>Overview</button>…</nav>
  <nav class="topnav" id="topnav"><i class="tb-thumb"></i><button class="on" data-i="0">…</button>…<button class="more" data-more>+<span>3</span></button></nav>
  <div class="brand-isl"><span class="mark">ox</span>omxcore</div>
  <div class="beacon">…</div>
</div>
```

- **Top islands (`oq-top`, default):** brand island left · nav pill centre · Beacon right, all floating 14 px from the top; content in a centred column (max 1120 px) that scrolls under them.
- **Dock (`oq-dock`):** the nav pill floats at the bottom centre (the same pill as the phone tab bar), Beacon top centre, brand island top left.
- **Top nav pill (`.topnav`):** 4 items at rest plus `+N`; `+N` widens it to all items; it folds back 3.5 s after the pointer leaves. Call `Omxqua.layoutTopnav(nav)` after render; on `+N` call `Omxqua.openTopnav(nav, true)`; on pointer-out `Omxqua.foldTopnavLater(nav)`; on pointer-over `Omxqua.holdTopnav(nav)`. Items need `data-i` (0…n) and the `+N` button `data-more`.
- **Phone (container ≤ 640 px), every shell:** the floating tab bar `.tabbar` (3 to 5 items, **icon + label at rest, icons only while scrolling down**: `omxqua.js` sets `.oq-tabs-min` on the root as `.main` or the page scrolls down past 60 px and clears it on the way up; keep the label text and `aria-label` in each button; accent thumb `.tb-thumb` via `Omxqua.placeThumb`) at the bottom. The thumb is liquid: it stretches as it moves, and you can hold the bar and slide (the thumb lifts, follows the finger and drops on the tab you let go over; `omxqua.js` clicks that tab for you); `.side`, `.topnav` and `.brand-isl` hide; grids stack. Never a hamburger for main nav.
- **Phone counterparts (container ≤ 640 px, same markup):** menu and select list → action sheet along the bottom edge (44 px rows, no shortcut hints; closing on a tap outside is your JS, as on desktop); tooltip → none (icon buttons carry `aria-label`); dialog → actions stack full width, verb on top; toast → above the tab bar; fields → 16 px text (iOS zooms below that); buttons → at least 44 px tall (`.sm` excepted, except Undo in a toast); `.xbtn` keeps its 32 px circle with a 44 px hit area. Touch screens (`hover: none`) get no hover lift or tint. See them side by side in the showcase's **Components** view (`showcase.html?opt=t`): component | web | phone.
- **Brand (`.brand-isl`):** `.mark` (letters or an icon) and the name in the display face, sitting straight on the page: no pill, no shadow. Once content scrolls under it (`.main` or the page scrolled past 4 px), `omxqua.js` adds `.oq-scrolled` to the root and the brand frosts over with the nav glass, so the name stays readable.
- **Glass:** the nav pill and tab bar are frosted (`--oq-glass-mix` 58% of surface-2, `--oq-glass-blur`); they fall back to solid surface-2 under reduced transparency.
- **Side island (`oq-islands`) and Sidebar (no shell class):** dense admin tools only. The island is a 64 px vertical pill that widens to 224 px on hover; `.pin-btn[data-pin]` toggles `.side.pinned`. Wrap each nav label in `<span class="lbl">`. Add `oq-sidebar-only` to hide the Beacon.

### Beacon (one per app, hidden when nothing is live)
```html
<div class="beacon">
  <div class="bc-compact"><span class="live"></span><svg class="ico">…</svg>TAP 1352<span class="mono">boards 42 min</span></div>
  <div class="bc-open"><button class="x" aria-label="Close">…</button><h4><svg class="ico">…</svg>JFK → LIS · TAP 1352</h4><div class="sub2">Gate B12 · Seat 14C</div>
    <div class="big">42 min</div><div class="bar2"><i style="width:30%"></i></div>
    <div class="bacts"><button class="bbtn pri">Boarding pass</button><button class="bbtn">Directions to gate</button></div></div>
</div>
```
A near-black pill in both themes showing one live activity (icon or progress `.ring`, label, one mono value updated in place). Tap: add `.open` and call `Omxqua.sizeBeacon(beacon, true)`; it morphs (width, height, radius, 460 ms, no overshoot) into a card with up to 3 actions. × or a tap outside removes `.open` and calls `sizeBeacon` again. On first render call `sizeBeacon(beacon, false)` inside `requestAnimationFrame`. It carries `--oq-beacon-accent`. Nothing in it bounces.

## 5. Motion

**Motion budget: the more often something happens, the less it moves.** When in doubt, drop a tier.

| Tier | Motion | Gets it | Helper |
|---|---|---|---|
| Settle | fade + 12 px rise in over 280 ms, decelerating; no scale, no bounce; out 160 ms; sheet rises 40 px over 320 ms | blades, side panels, sheets, a new view | `Omxqua.settle(el)` |
| Gentle | in over 220 ms (fade, 4 px drop, 3% scale), out over 150 ms | menus, dropdowns, popovers, tooltips, toasts, confirm dialogs | `Omxqua.gentleIn/gentleOut(el)`, `Omxqua.toast` |
| None | instant | anything repeated many times a minute, keyboard-driven (⌘K, arrows), live data | none |

- **Press is `omxqua.js`, never CSS.** Buttons, `a.cta`, `a.more`, `[data-press]`, chips, nav items, rows, tiles and the logo squash on pointer-down and spring back (`--oq-spring-fast`); the amount follows size: ≤ 48 px 0.90 · ≤ 260 px 0.96 · larger 0.985. **Never write an `:active { transform: scale() }` rule.** A skin or element may set `--oq-press: ledge` to sink 4 px instead. Opt out with `data-nopress`.
- **The logo writes itself:** every `.mark` draws its letters (or icon strokes) as a stroke and then fills, once on load and on every press (~0.9 s, no bounce). `Omxqua.writeLogo(mark)` replays it.
- Springs are for small things under the finger (press, thumbs, toggles, drag release). Panels and pop-ups never bounce.
- Reorder and filter keep identity (FLIP); live numbers update in place; the tap answers within 100 ms.
- **Reduced motion:** `prefers-reduced-motion` turns every transition and animation into 150 ms; `omxqua.js` skips the press, the logo and every helper animation (elements still open in the right place).

## 6. Landing layer (marketing pages)

Same family, fonts and colours as the app, turned up: huge display type (hero `clamp(64px, 12vw, 168px)`), two-tone headings (claim in ink, continuation in `ink-2`), one idea per screen, 140 px between sections, motion only on scroll (words rise once, sections rise 28 px, the product frame unfolds, a read-along paragraph, numbers count up once), the real app live in an iframe (`showcase.html?bare=1&size=phone&screen=home&theme=…`; `landing.html` still frames the earlier three-app kit, `kit-v1.html`). `docs/landing.html` loads only `fonts.css` and `omxqua.js`; its CSS is its own (`.L` root). Three concepts, `?c=a|b|c`:

- **A · Statement:** Developer · Graphite, night, Geist 800.
- **B · Editorial:** Travel · Azulejo, paper, Fraunces 500 italic hero + 300 numerals.
- **C · Bento:** Kids · Sticker, light, Nunito 900, tiles holding live parts (Beacon, quest tiles, bars).

Not on landing pages: gradients on text, glass, autoplay video with sound, carousels, cookie walls in front of the hero.

## 7. Never

- Glass, blur or translucency anywhere except the nav islands (nav pill, tab bar).
- Gradients on chrome or text. Allowed: the slider's solid fill and the skeleton shimmer.
- Emoji as icons. Use Lucide-style SVGs (vendor the real Lucide SVGs with its ISC licence).
- Apple or Microsoft fonts, icons or names: no SF Pro, SF Symbols, New York, Segoe UI, Fluent; no "Dynamic Island", "Liquid Glass", "Live Activities", "Mica", "Acrylic". Ours are Beacon, Nav island, Settle.
- Ripples or Material halos. Feedback is squash + a state-layer tint.
- Two filled buttons in one card.
- Per-component press rules (`:active` scale). `omxqua.js` owns press.
- A sidebar for a new app. Use Top islands (or Dock).
- A font service (Google Fonts and the like). Fonts ship in `fonts/`; vendor them with the rest of omxqua before shipping (jsDelivr links are for trying it out).

## 8. Dated decisions (2026-10-20, from LANGUAGE.md)

- The language itself: Material texture with Liquid motion, for every app, phone and web.
- Panels and pop-ups never bounce: the detail view has "very little motion, subtle". Hence the budget.
- Buttons (owner-approved): pill; filled = accent + shadow-1, hover lifts 1 px to shadow-2; tonal = surface-2 + shadow-1; text = no fill; state-layer tint on hover, squash on press.
- Symmetric shells over any sidebar (the sidebar "feels asymmetric"): Top islands and Dock.
- Skins Azulejo, Golden hour, Sticker and Crayon are candidates for the owner to pick.
- 2026-10-21: every desktop part gets a phone counterpart (menu → action sheet and the rest, §4), shown in the showcase's Components view; the islands are `position: fixed` and stick.
- 2026-10-21: picked. Travel = Azulejo, Kids = Playground (base). The other skins stay as alternates.
- Micro-interactions: one press for everything (`omxqua.js`); the logo writes itself; press-in on checkbox, radio, chips and icon buttons; Apple-style switch; no ripples or halos; our field with a floating label; one `.xbtn` close.
- Console pattern: no editable sentence on action forms (it read as "very weird" on Serve a model); an action form is a normal form with one filled verb button and its CLI twin as the source line.
- Google Stitch review (`review/FINDINGS.md`): agreed fixes applied; borrowed day-chip neighbourhoods, budget split by kind, reward chips on quest tiles.
- 2026-10-21: the nav islands become frosted glass and the brand loses its pill (the logo blends into the page). Overrides "islands are solid" for the nav pill and tab bar only.
- 2026-10-21: the phone tab bar shows labels at rest and goes icons-only while scrolling down (first tried icons only; the research says unlabeled icons get misread), and its thumb is liquid (stretches when it moves, drag to switch tabs). Phones get every effect desktop has: press, logo, thumbs; no iOS grey tap flash, no double-tap delay.
- 2026-10-24: the showcase is one app, **Contoso** (a made-up trip planner), in every theme, with web and phone side by side per screen and a component | web | phone table. The earlier three-app kit is `docs/kit-v1.html`.
- 2026-10-24: kept the crisp look (outlined fields, hairline rows, square mono badges, shadows on tonal buttons) over a softer tinted one; borrowed two things from it: chips without outlines (tinted, accent tint when on) and coloured icons (`.ic-tile`, coloured nav icons), tested at 3:1.

## 9. Patterns in the showcase, not yet packaged

These live only in `docs/kit-v1.html`, the earlier three-app kit (inline CSS, demo JS). Copy them from there if you need one; don't link them as if they were part of the package. Their skin restyles (Azulejo, Golden, Sticker, Crayon) are inline too. The agent concepts in `docs/showcase.html` (the Beacon's live steps, approval options, change diff, voice levels, receipts: `.ag-*`, and the app's `.cx-*` layout) are demo CSS there, also not packaged.

- `.day` (`.days` strip): Travel day chips: weekday, big date, neighbourhood; the selected day is an ink fill.
- `.blk` (`.rail` with `.t` times): Travel itinerary blocks coloured by kind (`--oq-data-*`), white text in Light, surface-0 text in Night.
- `.tile` (`.tiles` grid, `.ic` icon square, `.rw` reward chip, `.done`): Kids quest tiles; `--c` is the tile's data colour.
- `.hero`: Kids greeting card in the accent with a `.stars` count.
- Also demo-only: `.install`, `.chart`, `.runs`, `.map`/`.pin`/`.legend`, `.week`, `.kit`, `.swatches`, `.surfs`, the Touch lab (`.tl`, `.mh`, `.mcheck`, `.mradio`, `.mswitch`, `.mf`, `.rp`/`.ripple`: rejected Material variants kept for comparison), `.statusbar`, `.bar`/`.pseg`, `.stage`/`.screen`.
- JS still inline in the kit and the showcase: toggling `.on` on toggles, chips, nav items and day chips; menu and tooltip positioning; dialog and sheet open/close; the Touch lab; the Beacon's live counters.

## 10. Verify a screen

1. **Contrast:** text 4.5:1 on its surface in Night and Light (`ink-2` included); a data colour behind text 4.5:1, behind an icon only 3:1.
2. **Touch targets:** at least the family's `--oq-target`: Developer 34 px, Travel 40 px, Kids 48 px (base 36 px; 44 px on consumer phone screens).
3. **Phone at 390 px:** tab bar visible, nothing overflows sideways, grids stacked, cards scroll inside.
4. **Reduced motion:** turn it on in DevTools (Rendering → prefers-reduced-motion); nothing springs, everything still opens in the right place.
5. **Rules:** one filled button per card, Developer cards end in a source line, no glass, gradients, emoji icons or `:active` scale rules.
6. **Compare:** put it next to `docs/showcase.html` in the same theme (`?opt=a&theme=azulejo&mode=light&screen=home`); every screen there shows web and phone side by side.
