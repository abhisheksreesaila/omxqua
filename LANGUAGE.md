# omxqua

The person's one design language for every app, phone and web (chosen 2026-10-20): **Material texture with Liquid motion**. Opaque tonal surfaces, state layers and one soft shadow scale, moving on real springs. Use the tokens in `src/tokens.css` and the parts in `src/components.css`; don't invent values. Agents: start with `AGENTS.md`.

<!-- Source: the Design System artifact (published under the language's earlier name) (https://claude.ai/artifact/DgbFfFoixUQJXqbLuUjfM6, not
     shared with Claude yet) and the reviewed doc https://claude.ai/code/artifact/5a5f6999-e903-414e-8091-cf9c96041e69.
     Since v0.1.0 this repo's src/ is the source of truth; keep the --oq-* names. -->

## Three layers
An app only adds to the layer above it, never overrides it.

1. **Core** (every app): texture, shape, type, colour, motion, shells, everyday parts, states. Everything below.
2. **Patterns** (opt in): Explore and Console, at the end. New patterns are added there, not to the core.
3. **App layer**: one line in the project's `CLAUDE.md`:
   `Design: omxqua · accent ink · density compact · shell sidebar · patterns console`

## Texture
- Depth is tone plus one shadow scale: page `surface-0`; cards `surface-1` + `shadow-1`; menus, popovers, islands `surface-2` + `shadow-2`; dialogs and the palette `surface-3` + `shadow-3` over a scrim.
- **No glass, blur, translucency or gradients on chrome**, on any platform. (This replaces Liquid's glass control layer.)
- Hover, press and selected are Material state layers: ink at 8% / 12% / 16% over the surface (`rgb(var(--oq-state) / .08)`), never a new colour.

## Shape
- **Pill = tappable** (buttons, chips, segmented, tabs). **Status = a `radius-xs` mono badge** (`running`, `401`, `p50 exact`).
- Cards 16 (12 compact), inputs 10, menus 14 with items 8. Concentric corners: inner radius = outer − padding.
- Shape carries state: a pressed control squashes to 0.96 and springs back.

## Type
One sans for words, one mono for numbers, ids, paths, commands and every source line; both ship with the app. Tabular, right-aligned numbers in tables. An app may pick its pair (Geist + Geist Mono, Inter + JetBrains Mono).

## Colour
- **One accent per app**, set by its family (below) or `oq-app-ink | teal | amber | violet | sage | rose`. `ink` is near-black in Light, near-white in Night. The accent fills the one loud button per card and the focus ring, nothing else.
- **Data palette** (`--oq-data-1..6`), separate from the accent: chart series, model signals, kinds. A thing keeps its data colour everywhere.
- **States** ok, warn, bad, info: always with the word, never colour alone.
- **Contrast**: text 4.5:1 on its surface in Light and Night; `ink-faint` is never text.

## Families (an app class picks one)
Each family sets surfaces, accent, data palette and character for Night and Light. Root: `oq-root oq-night|oq-light oq-family-<dev|travel|kids|money>`. All pairs below pass 4.5:1. Live: `docs/showcase.html` (App and Kit views, Night/Light, desktop/phone).

| Family | For | Night | Light | Accent | Character |
|---|---|---|---|---|---|
| **Developer · Graphite** (`dev`) | libraries, PyPI packages, consoles (mxconsole, omxcore) | near-black #0b0b0d | cool grey #eeeef1 | ink (white / black) | compact (34 px), cards 12, mono-forward, numbers and source lines everywhere |
| **Travel · Coast** (`travel`) | trips, places, days (gitaway) | deep sea #0b1214 | warm sand #f4f0e9 | sea teal #5fd4c8 / #0b6e69 | 40 px targets, cards 16, kinds carry colour (flight, stay, food, see), days never do |
| **Kids · Playground** (`kids`) | children's apps (questly) | plum #171221 | cream #fff6ea | tangerine #ffad66 / #c2410c | roomy (48 px), cards 22, type 15.5 px, big icon tiles, one hero card, a big "I did it!" button |
| **Money · Ledger** (`money`) | accounts, spending, budgets (finxplorer) | near-black #0d0c12 | cool paper #f1f0f5 | violet #b8aaff / #5b4bd6 | 40 px targets, cards 16, every amount mono and tabular, categories carry the data colours, in / out are ok / bad with the word |

Rules:
- The accent never doubles as a data colour (Travel's "see" is sage, not the teal accent).
- A data colour used as a **fill behind text** must give 4.5:1 with its text (white in Light, dark ink in Night); a fill behind an **icon only** needs 3:1, else use a dark icon (Kids' yellow tile).
- **Skins (candidates, owner to pick, 2026-10-20):** a family can offer alternative skins: same components, different surfaces, colour, type and texture. Root adds `oq-skin-<name>`. Travel: Coast (base), **Azulejo** (paper + tile blue, Fraunces serif display, crisper corners), **Golden hour** (peach / espresso, amber accent, rounder). Kids: Playground (base), **Sticker** (Nunito, chunky ledge shadows that press down 4px, sky-blue accent), **Crayon** (Nunito, pastel tiles tinted with their own colour, berry accent, pastel hero). Fonts ship in `fonts/` (Fraunces, Nunito: SIL OFL).
- Money · Ledger added 2026-10-20 (owner approved on the finxplorer mockup); its data colours are finxplorer's colour-blind-checked category cycle without the violet.
- New families (notes, health) are added here with the same table row and a contrast check.

## Motion (Liquid)
Springs (`--oq-spring-fast` mostly) are for small things under your finger: press squash, segmented thumbs, toggles, drag release. Panels and pop-ups never bounce (owner, 2026-10-20: the detail view must have "very little motion, subtle").

**Motion budget: the more often something happens, the less it moves.** Most pop-ups get no liquid motion.

| Tier | Motion | Gets it |
|---|---|---|
| Settle | subtle: fade + 12px slide in over 280 ms, decelerating (`--oq-ease-in`), no scaling, no bounce; out in 160 ms. Switching what an open panel shows is a 180 ms content fade, never a close-and-reopen | blades, side panels, bottom sheets (sheet: 40px rise, 320 ms) |
| Gentle | eases in over `--oq-gentle-in` (220 ms: fade, 4px drop, 3% scale, decelerating, no overshoot); fades out in 150 ms | menus, dropdowns, popovers, slot pickers, tooltips, toasts, confirm dialogs |
| None | instant | anything repeated many times a minute, keyboard-driven (⌘K, arrows), live data |

When in doubt, drop a tier. Also:
- Press: 0.96 squash on `--oq-spring-fast`. Hover (laptop): one tone + one shadow step.
- Reorder and filter keep identity: items slide to new places (FLIP), they don't jump.
- An expanding card grows where it sits; the others make way.
- Drag follows the finger 1:1, keeps momentum on release, rubber-bands at edges (the designer skill's `touch.md`).
- Live numbers and traces update in place, never bounce.
- The tap answers within 100 ms; the spring is the answer, never a wait before it.
- `prefers-reduced-motion`: every spring becomes a 150 ms fade; overlays still open in the right place.

## Shells (an app picks one)
| Shell | Desktop | Phone | Fits |
|---|---|---|---|
| Sidebar | left menu 232, collapses to an icon rail with tooltips | floating tab bar (3–5) + a More sheet | consoles, dashboards |
| Canvas | floating islands over the work; one round button opens nav | the same islands, tools in a bottom strip | editors, maps |
| Docked | toolbar + content + docked inspector (reference 1180×760) | the same parts restacked; inspector becomes a bottom sheet | Explore apps |

Never a hamburger for main nav on phone. Top bar: mark, name, trust and speed badges, search or ⌘K. Islands are solid `surface-2`, not glass.

## Everyday parts
Each with hover, press, focus, disabled and error states:
- Buttons: one filled accent button per card, with a specific verb ("Serve qwen2.5-0.5b", not "Submit"); the rest tonal or text.
    - The detail (owner-approved 2026-10-20): pill shape; filled = accent + `shadow-1`, hover lifts 1px to `shadow-2`; tonal = `surface-2` + `shadow-1`; text = no fill; every button gets a state-layer tint on hover and a 0.96 squash on press (`--oq-spring-fast`).
- Fields: label above, help line below, the error as a sentence under the field.
- Dropdowns, menus, popovers: themed (never the browser's list), gentle tier.
- Tables: hairline rows, mono right-aligned numbers, sticky header; a long list scrolls inside its card, which never grows past the screen.
- Toast with Undo, tooltip with shortcut, command palette, dialog with scrim, bottom sheet (grabber, peek / half / full).
- States: loading = skeleton rows (never zeros); empty = one line + the action that fills it; error = what happened + what to do; offline = a badge in the top bar.
- **Show your work** (Developer family): every card ends in a mono source line (the query, the command, the file); say what was left out. Travel and Kids skip it; a card there may end in a plain `↳` note when something was left out.

**Density**: roomy (phone and consumer apps, 44 px targets) or compact (desktop tools, 32–36 px controls, tighter rows, smaller corners).

## Signature components (ours)
- **Beacon**: a near-black pill centred at the top (both themes) that shows one live activity: a build, a flight, a timer, a model loading. Compact: icon or progress ring + label + one mono value, updated in place. Tap: it morphs (width, height, radius on a no-overshoot spring, 460 ms) into a card with the details and up to 3 actions; × or a tap outside folds it back. One Beacon per app; nothing in it bounces; it carries the family's beacon accent. Phone: same pill under the status bar. Hidden when nothing is live.
- **Symmetric shells (preferred over any sidebar, owner 2026-10-20: the sidebar "feels asymmetric")**: content sits in a centred column (max 1120 px); navigation is one centred pill with a sliding accent thumb. **Top islands**: brand island left · nav pill centre · Beacon right, all floating 14 px from the top. **Dock**: nav pill floating at the bottom centre (identical to the phone tab bar, so one pattern on every screen) · Beacon top centre · brand island top left. Content scrolls under the floating islands.
- **Nav island**: the sidebar as a floating vertical pill (60 px, `surface-2`, `shadow-3`, radius 26) inset from the left edge. Icons only at rest (active item = accent pill); hover widens it to 224 px with labels on the same spring; a chevron pins it open. Phone: the floating tab bar. The plain sidebar stays available for dense admin tools.

## Originality and licences
Patterns (sidebars, tab bars, segmented controls, sheets, a status pill) are conventions, not property; their exact assets and names are. So:
- Never use: SF Symbols, SF Pro or New York fonts (Apple licence limits them to Apple platforms), Segoe UI or Fluent icons, Apple or Microsoft screenshots, sounds or wallpapers.
- Never name ours after theirs: no "Dynamic Island", "Liquid Glass", "Live Activities", "Mica", "Acrylic". Ours are **Beacon**, **Nav island**, **Settle**.
- Don't copy a signature shape pixel for pixel (Apple's notch-hugging island geometry); the Beacon floats below the top edge with its own size, radius and content rules.
- Everything we ship is open: Geist and Geist Mono, Fraunces, Nunito (SIL OFL 1.1); icons drawn in Lucide's style (Lucide is ISC; vendor the real Lucide SVGs with its licence when building); Material's guidelines are free to use. Keep each licence file next to its font (`fonts/`).

## Micro-interactions (decided 2026-10-20)
- **One press for everything (`src/omxqua.js`):** every tappable thing (buttons, chips, tabs, day chips, rows, tiles, nav items, the logo) squashes on pointer-down and springs back on release; the amount follows size (≤ 48 px 0.90 · ≤ 260 px 0.96 · larger 0.985). Never write per-component `:active` scale rules. A skin may set `--oq-press: ledge` to sink 4 px instead (Sticker). Opt out with `data-nopress`.
- **Logo writes itself:** the `.mark` letters (or icon strokes) draw as a stroke and then fill, once when the page loads and again on every press (~0.9 s, no bounce).
- **Press-in, everywhere small:** checkbox, radio, chips and icon buttons squash to 0.9 on `--oq-spring-fast` and spring back. It's the "pressing into something" feel; every toggle shares it.
- **Switch (Apple-style):** on press the knob stretches toward where it will go (18 → 24 px), then slides and settles. No halo.
- **No ripples, no Material halos.** Feedback is squash + a state-layer tint.
- **Field = ours + a floating label** (borrowed from Material's outlined field): the label sits inside like a placeholder and floats up into a gap in the border on focus or when filled (200 ms, decelerating). Error: border and label turn `bad`, the sentence stays below. A leading icon (search) moves the label with it. No filled/underlined fields.
- **Close button:** one component, `.xbtn`: a 32 px circle, `x` icon 16 px dead centre, tinted state layer. Top-right, centred on the title line (in a 20 px-padded dialog: 14 px from top and right). Never a text "✕" glyph.

## Landing layer (marketing pages)
Same family, fonts and colours as the app, turned up: the app is quiet and dense, the landing page is loud, huge and moves with the scroll. Live: `docs/landing.html` (A Statement, B Editorial, C Bento).
- **Type:** the family's display font at hero 64–168 px (`clamp(64px, 12vw, 168px)`), section titles 40–88 px, line-height ≤ 1, tracking −4.5 to −5.5 %. Body 19 px, ledes 22–30 px. Geist 800 (Developer), Fraunces 500 italic hero + 300 numerals (Travel), Nunito 900 (Kids). Fonts self-hosted, never a font CDN.
- **Two-tone headings:** the claim in ink, its continuation in `ink-2` ("A million rows. *Under a millisecond.*").
- **One idea per screen,** 140 px between sections, centred column ≤ 1120 px.
- **Nav:** the app's Top islands, lighter: brand left, a pill of section links centre, one filled CTA right; solid background (no blur).
- **CTAs:** one filled pill with a specific verb + a text link with `›`.
- **Motion happens on scroll, never on idle:** the hero's words rise in once (staggered, ~70 ms apart); sections rise 28 px as they enter; the product frame unfolds (scale 0.82 → 1, corners 40 → 14 px) while sticky; one read-along paragraph lights up word by word; numbers count up once. Reduced motion: everything static and visible.
- **Show the real app,** live in a frame (`docs/showcase.html?bare=1`), never a fake screenshot. Bento tiles hold real components (Beacon, quest tiles, charts).
- **Gradient syntax is fine for solid fills and loading states** (a slider track filled to its value, a skeleton shimmer); the ban is on decorative colour gradients on chrome or text.
- **Not on landing pages:** gradients on text, glass, autoplay video with sound, carousels, cookie walls in front of the hero.

## Pattern: Explore (opt in)
For asking questions of data (omxplorer, finxplorer).
1. The sentence is the interface: one editable plain-English sentence per view; voice, typing and taps all edit it. Max 6 slots a line; the rest folds into one "where…" slot. Slot pickers are gentle-tier popovers.
2. Offer the next move: 3–6 chips phrased as edits, plus a `Changed:` line.
3. The toolbar inserts; the inspector configures and shows only controls that apply.
4. Don'ts: sentence and view disagree ("top 5" with 3 shown); inspector controls that don't apply; a tile that restates a filter; area or bar axes not starting at zero.

## Pattern: Console (opt in)
For watching and running things (mxconsole, abode).
1. Every view is a command (consoles and dev tools only, e.g. mxconsole): each card's source line is its CLI twin, copyable.
2. Live status: one lane per running thing (dot, name, trace, two numbers); state as dot + word.
3. No editable sentence on action forms (owner, 2026-10-20: it read as "very weird" on Serve a model). An action form is a normal form: a pick-list of options with fit badges, segmented controls for settings, a labelled meter for the cost (memory, quota), and a footer with a one-line plain summary + the one filled button with a specific verb. The CLI twin is the source line under it.
4. One signature moment per page; the rest stays quiet.

## Reference
mxconsole concept (desktop + phone, Night + Light, motion budget applied): `~/Projects/mxstudio/docs/design/universal/mxconsole-concept.html`.

## What it isn't
- Not Liquid Glass: no translucent controls anywhere.
- Not flat Material: springs, morphs and shape-on-press are half the language.
- Not motion everywhere: the budget decides, and most things don't morph.

## Reviews
- 2026-10-20 · Google Stitch: `review/FINDINGS.md` (agreed fixes applied the same day; borrowed day-chip neighbourhoods, budget split by kind, reward chips on quest tiles).
