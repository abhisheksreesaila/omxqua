# omxqua

**Live:** https://abhisheksreesaila.github.io/omxqua/ (cover) · [kit](https://abhisheksreesaila.github.io/omxqua/docs/showcase.html) · [landing layouts](https://abhisheksreesaila.github.io/omxqua/docs/landing.html)


omxqua (omx + aqua, always lowercase) is the design language I use for every app, on the phone and on the web. It's touch-native: every press springs back, toggles stretch toward where they're going, and the Beacon morphs open from the pill you tapped. I borrowed the best of Apple (the motion), Google (Material's solid, tonal surfaces and state layers) and the terminal (mono numbers and a source line under every card), and left out the glass, the ripples and anyone's trademarks.

## Quick start

1. Copy the package into your project (pinned to the latest tag, or any ref):

   ```sh
   ~/Projects/omxqua/bin/omxqua-sync static/            # -> static/omxqua/{src,fonts,VERSION}
   ~/Projects/omxqua/bin/omxqua-sync static/ --ref v0.1.0
   ```

2. Link the files, in this order:

   ```html
   <link rel="stylesheet" href="/static/omxqua/src/fonts.css">
   <link rel="stylesheet" href="/static/omxqua/src/tokens.css">
   <link rel="stylesheet" href="/static/omxqua/src/components.css">
   <script src="/static/omxqua/src/omxqua.js" defer></script>
   ```

3. Put the root classes on your app's root element (it also needs `container-type: inline-size; position: relative`):

   ```html
   <html class="oq-root oq-night oq-family-dev oq-top">
   ```

   Theme `oq-night | oq-light`, family `oq-family-dev | travel | kids`, optional skin `oq-skin-azulejo | golden | sticker | crayon`, shell `oq-top` (default) or `oq-dock`.

Then build with the parts in [AGENTS.md](AGENTS.md).

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
