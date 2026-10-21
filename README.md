# omxqua

**Live:** https://abhisheksreesaila.github.io/omxqua/ (cover) · [kit](https://abhisheksreesaila.github.io/omxqua/docs/showcase.html) · [landing layouts](https://abhisheksreesaila.github.io/omxqua/docs/landing.html)


omxqua (omx + aqua, always lowercase) is the design language I use for every app, on the phone and on the web. It's touch-native: every press springs back, toggles stretch toward where they're going, and the Beacon morphs open from the pill you tapped. I borrowed the best of Apple (the motion), Google (Material's solid, tonal surfaces and state layers) and the terminal (for developer apps: mono numbers and the command behind each card), and left out the glass, the ripples and anyone's trademarks.

## Use it

### With Claude Code: install the skill

```
/plugin install omxqua --marketplace abhisheksreesaila/omxqua
```

On older Claude Code, add the marketplace first: `/plugin marketplace add abhisheksreesaila/omxqua`, then `/plugin install omxqua@omxqua`. After that, ask for things like "a trip planner home screen in omxqua" and Claude reads the reference, picks a family and builds with the real parts.

### With another agent that reads skills (Codex, Cursor, and others)

Copy [`skills/omxqua/`](skills/omxqua/SKILL.md) into the agent's skills folder (for Claude Code without the plugin: `~/.claude/skills/omxqua/`). The skill fetches `AGENTS.md` from this repo when it isn't next to it.

### With any agent or chat: paste this prompt

```text
Build this UI in omxqua, a touch-native design language (Material texture, Liquid motion).
Before writing any markup, read the reference:
https://raw.githubusercontent.com/abhisheksreesaila/omxqua/main/AGENTS.md
Link these four files in this order, pinned to a tag:
https://cdn.jsdelivr.net/gh/abhisheksreesaila/omxqua@v0.1.4/src/fonts.css
https://cdn.jsdelivr.net/gh/abhisheksreesaila/omxqua@v0.1.4/src/tokens.css
https://cdn.jsdelivr.net/gh/abhisheksreesaila/omxqua@v0.1.4/src/components.css
https://cdn.jsdelivr.net/gh/abhisheksreesaila/omxqua@v0.1.4/src/omxqua.js (defer)
Put the root classes on <html>: oq-root, oq-light or oq-night, a family
(oq-family-dev for tools, oq-family-travel for trips, oq-family-kids for children),
and oq-top for the top-island shell. Use only the classes and --oq-* tokens in the
reference. One filled button per card, no glass, no gradients, no emoji icons,
no :active scale rules. Check it at 390 px wide and on desktop, in light and night.

What I want: <describe the screen>
```

### By hand

Try it from the CDN with the four links above. To ship it, vendor the files so nothing loads from a third party: copy `src/` and `fonts/` side by side into your project, or from a clone run:

```sh
bin/omxqua-sync static/                 # -> static/omxqua/{src,fonts,VERSION}, latest tag
bin/omxqua-sync static/ --ref v0.1.4    # a specific tag
```

```html
<link rel="stylesheet" href="/static/omxqua/src/fonts.css">
<link rel="stylesheet" href="/static/omxqua/src/tokens.css">
<link rel="stylesheet" href="/static/omxqua/src/components.css">
<script src="/static/omxqua/src/omxqua.js" defer></script>

<html class="oq-root oq-night oq-family-dev oq-top">
```

The root element also needs `container-type: inline-size; position: relative`. Theme `oq-night | oq-light`, family `oq-family-dev | travel | kids`, optional skin `oq-skin-azulejo | golden` (travel) or `sticker | crayon` (kids), shell `oq-top` (default) or `oq-dock`. Then build with the parts in [AGENTS.md](AGENTS.md).

## Structure

```
src/tokens.css       every --oq-* value: core, themes, families, skins, accents
src/components.css   every reusable part, scoped under .oq-root
src/fonts.css        @font-face for Geist, Geist Mono, Fraunces, Nunito
src/omxqua.js        press, the self-writing logo, motion helpers (window.Omxqua)
fonts/               the four variable woff2 files and their licences
docs/showcase.html   every family, skin, shell and component, live (App, Kit, Touch views)
docs/landing.html    the landing layer: A Statement, B Editorial, C Bento
docs/index.html      start page
LANGUAGE.md          the rules and why
AGENTS.md            quick reference for agents building screens
review/              the 2026-10-20 Google Stitch review (historical)
bin/omxqua-sync      copies src/ and fonts/ at a ref into another project
skills/omxqua/       the skill agents load (SKILL.md)
.claude-plugin/      Claude Code plugin + marketplace manifests
```

## Docs

- [AGENTS.md](AGENTS.md): load order, root classes, every component with markup, shells, Beacon, motion budget, the Never list, how to verify a screen.
- [LANGUAGE.md](LANGUAGE.md): texture, shape, type, colour, families, motion, shells, patterns, licences, dated decisions.
- `docs/showcase.html` and `docs/landing.html`: open them over HTTP (`python3 -m http.server` in the repo root), not as files.

## Versioning

Semver tags (`v0.1.0`, …) with every change listed in [CHANGELOG.md](CHANGELOG.md). Renaming or removing a token, class or helper is a breaking change. Projects pin a tag with `omxqua-sync --ref`; the copied `omxqua/VERSION` records the ref and commit.

## Licences

- Code (CSS, JS, docs, scripts): MIT, see [LICENSE](LICENSE).
- Fonts: Geist and Geist Mono (Vercel), Fraunces and Nunito (their project authors), each under the SIL Open Font License 1.1; the licence files sit next to the fonts in `fonts/`. The MIT licence doesn't cover them.
