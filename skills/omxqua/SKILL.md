---
name: omxqua
description: Build or restyle web and phone UI in omxqua, a touch-native design language (Material texture, Liquid motion; opaque surfaces, springs, no glass). Use when the user asks for omxqua, for an app, page, screen or component "in omxqua", or when a project's CLAUDE.md or AGENTS.md says its design language is omxqua.
---

# omxqua

omxqua (always lowercase; omx + aqua) is a small design language for apps on the phone and the web: **Material texture** (opaque tonal surfaces, state layers, one soft shadow) with **Liquid motion** (springs, a squash on every press, panels that settle without bouncing). Plain HTML, CSS and JS: no framework, no build step.

## 1. Read the reference first

The full reference is `AGENTS.md`: every component with its markup, the shells, the Beacon, the motion budget, the Never list and how to verify a screen. Read it before writing markup. Don't guess class names.

- Installed as a Claude Code plugin, or with the repo cloned: `../../AGENTS.md` from this skill's folder (the repo root).
- Otherwise: https://raw.githubusercontent.com/abhisheksreesaila/omxqua/main/AGENTS.md
- The reasons behind each rule: `LANGUAGE.md` in the same place.
- See it live: https://abhisheksreesaila.github.io/omxqua/docs/showcase.html (every family, skin, shell and part).

## 2. Load it

Trying it out or prototyping: link it from jsDelivr, pinned to a tag (the fonts come along):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/abhisheksreesaila/omxqua@v0.1.5/src/fonts.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/abhisheksreesaila/omxqua@v0.1.5/src/tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/abhisheksreesaila/omxqua@v0.1.5/src/components.css">
<script src="https://cdn.jsdelivr.net/gh/abhisheksreesaila/omxqua@v0.1.5/src/omxqua.js" defer></script>
```

Shipping it: vendor the files into the project so nothing loads from a third party. Copy `src/` and `fonts/` side by side (for example `static/omxqua/src` and `static/omxqua/fonts`), or run `bin/omxqua-sync <dest-dir> --ref <tag>` from a clone. Keep the four links in the same order.

## 3. Pick, then build

Ask, or decide from the brief, and say which you picked:

| Choice | Options | Default |
|---|---|---|
| Family | `oq-family-dev` (tools, packages, consoles) · `oq-family-travel` (trips, places) · `oq-family-kids` (children's apps) | the closest one |
| Skin (optional) | travel: `oq-skin-azulejo`, `oq-skin-golden` · kids: `oq-skin-sticker`, `oq-skin-crayon` | none |
| Theme | `oq-night` · `oq-light` | follow the system |
| Shell | `oq-top` (top islands) · `oq-dock` (nav pill at the bottom) | `oq-top` |

```html
<html class="oq-root oq-light oq-family-travel oq-top">
```

The app's root element also needs `container-type: inline-size; position: relative`, since the phone layout uses container queries.

## 4. The rules that matter most

- Use `--oq-*` tokens for every colour, radius, size and curve. Never invent a value.
- One accent per app, used only for the one filled button in a card and the focus ring. One `.fill` per card, with a specific verb ("Start a trip", not "Submit").
- `omxqua.js` owns press. Never write `:active { transform: scale(…) }`.
- Motion budget: springs only for small things under the finger. Panels and details settle (fade + 12 px, no bounce); menus and toasts get a gentle 220 ms; repeated or live items get none.
- Developer apps only: numbers in mono, and each card ends in a mono source line (the command or query behind it). Travel and Kids leave it out.
- Close buttons are `.xbtn`. Status always comes with a word, never colour alone. Touch targets: dev 34 px, travel 40 px, kids 48 px.
- Never: glass, blur, gradients on chrome, emoji as icons (use Lucide-style SVGs), ripples, a sidebar for a new app, Apple or Microsoft fonts, icons or names (no SF Pro, "Dynamic Island", "Liquid Glass").

## 5. Before you say it's done

Open the page at 390 px wide and at desktop width, in Night and Light, and check against `AGENTS.md` §10: contrast 4.5:1, target sizes, nothing overflowing sideways, reduced motion still works, and the rules above. Compare it with the showcase at the same family, skin and theme.
