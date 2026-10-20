---
name: Universal Language
colors:
  background: '#eeeef1'
  on-background: '#0b0b0d'
  surface: '#eeeef1'
  surface-bright: '#ffffff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ffffff'
  surface-container: '#ffffff'
  surface-container-high: '#ffffff'
  surface-container-highest: '#ffffff'
  on-surface: '#0b0b0d'
  on-surface-variant: '#5b5b63'
  inverse-surface: '#0b0b0d'
  inverse-on-surface: '#ededef'
  outline: '#c9c9cf'
  outline-variant: '#e3e3e8'
  primary: '#0b0b0d'
  on-primary: '#ffffff'
  primary-container: '#1d1d21'
  on-primary-container: '#ededef'
  secondary: '#5b5b63'
  on-secondary: '#ffffff'
  error: '#c01f25'
  on-error: '#ffffff'
  surface-0: '#eeeef1'
  surface-1: '#ffffff'
  surface-2: '#ffffff'
  surface-3: '#ffffff'
  ink: '#0b0b0d'
  ink-2: '#5b5b63'
  ink-faint: '#c9c9cf'
  line: '#e3e3e8'
  line-2: '#efeff2'
  accent: '#0b0b0d'
  on-accent: '#ffffff'
  beacon: '#0b0b0d'
  ok: '#137036'
  warn: '#8f5400'
  bad: '#c01f25'
  info: '#0960b5'
  data-1: '#6d5cf0'
  data-2: '#0a7fe0'
  data-3: '#0f9483'
  data-4: '#e0661a'
  data-5: '#d42a2f'
  data-6: '#a88400'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.6px
  headline-lg:
    fontFamily: Geist
    fontSize: 22px
    fontWeight: '650'
    lineHeight: 28px
    letterSpacing: -0.3px
  headline-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  body:
    fontFamily: Geist
    fontSize: 13.5px
    fontWeight: '400'
    lineHeight: 20px
  body-medium:
    fontFamily: Geist
    fontSize: 13.5px
    fontWeight: '500'
    lineHeight: 20px
  caption:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  mono-data:
    fontFamily: Geist Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  mono-badge:
    fontFamily: Geist Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 11px
  mono-source:
    fontFamily: Geist Mono
    fontSize: 11.5px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  xs: 4px
  sm: 8px
  DEFAULT: 10px
  md: 12px
  lg: 16px
  xl: 22px
  full: 9999px
spacing:
  space-1: 4px
  space-2: 8px
  space-3: 12px
  space-4: 16px
  space-5: 24px
  space-6: 32px
  space-7: 48px
  target: 44px
  target-compact: 34px
  column-max: 1120px
---

# Universal Language: Material texture, Liquid motion

One design language for every app, phone and web. Opaque tonal surfaces, Material state layers and one soft shadow scale. The front matter is the **Developer · Graphite (Light)** family; other families swap surfaces, accent and data palette (below) but keep every rule.

## Texture
- Depth is tone plus one shadow scale: page surface-0 (#eeeef1); cards surface-1 (#ffffff) + shadow-1 (0 1px 2px rgba(16,16,20,.06), 0 0 0 1px rgba(16,16,20,.04)); menus, popovers and floating islands surface-2 + shadow-2 (0 6px 18px rgba(16,16,20,.10)); dialogs surface-3 + shadow-3 (0 18px 48px rgba(16,16,20,.18)) over a scrim.
- **No glass, no blur, no translucency, no gradients** on any chrome or surface.
- Hover / press / selected = the ink colour at 8% / 12% / 16% over the surface. Never a new colour.

## Shape
- **Pill (9999px) = tappable**: buttons, chips, segmented controls, tabs, nav.
- **Status = a 4px-radius mono badge** (e.g. `running`, `401`, `p50 exact`), 11px Geist Mono, 1px hairline border.
- Cards 16px (12px compact / Developer), inputs 10px, menus 14px with 8px items. Concentric corners: inner radius = outer minus padding.

## Type
- Geist for words, Geist Mono for numbers, IDs, paths, commands, times and every source line. Tabular, right-aligned numbers in tables.
- Developer body 13.5px; Travel 14px; Kids 15.5px with 32px titles.

## Colour
- **One accent per app**; it fills the one loud button per card and the focus ring, nothing else. Developer accent = ink (near-black in Light, near-white in Night).
- **Data palette** data-1..6 is separate from the accent: chart series and kinds. A thing keeps its data colour everywhere. Never reuse the accent as a data colour.
- States ok / warn / bad / info always come with the word, never colour alone.
- Text is 4.5:1 on its surface. ink-faint is never text. A data colour used as a fill behind text must reach 4.5:1 with its text.

## Families (an app picks one)
| Family | For | Light page / accent | Night page / accent | Character |
|---|---|---|---|---|
| Developer · Graphite | libraries, PyPI packages, consoles | cool grey #eeeef1 / ink #0b0b0d | near-black #0b0b0d / #ededef | compact 34px controls, cards 12px, mono-forward, numbers and source lines everywhere |
| Travel · Coast | trips, places, days | warm sand #f4f0e9, cards #fffdf9, ink #1d1a16 / sea teal #0b6e69 | deep sea #0b1214 / #5fd4c8 | 40px targets, cards 16px; kinds carry colour (flight #2f6fbf, stay #8a4fa8, food #c2462b, see sage #3f7a46), days never do |
| Kids · Playground | children's apps | cream #fff6ea, ink #2a1d12 / tangerine #c2410c | plum #171221 / #ffad66 | roomy 48px targets, cards 22px, 15.5px type, big icon tiles, one hero card, a big "I did it!" button |

Skins (same components, different surface and type): Travel **Azulejo** (paper + tile blue, Fraunces serif display, crisper corners), **Golden hour** (peach / espresso, amber accent, rounder). Kids **Sticker** (Nunito, chunky ledge shadows that press down 4px, sky-blue accent), **Crayon** (Nunito, pastel tiles tinted with their own colour, berry accent).

## Shells (symmetric, preferred over a sidebar)
- Content sits in a centred column, max 1120px. Content scrolls under floating islands.
- **Top islands**: brand island top-left · one centred nav pill with a sliding accent thumb · Beacon top-right, all floating 14px from the top, solid surface-2 + shadow-2.
- **Dock**: the nav pill floats at the bottom centre (identical to the phone tab bar) · Beacon top centre · brand island top-left.
- **Nav island** (dense tools): the sidebar as a floating vertical pill, 60px wide, radius 26, icons only at rest (active item = accent pill), widens to 224px with labels on hover.
- Phone: a floating bottom tab bar (3–5 items), never a hamburger for main nav. Bottom sheets instead of modals.

## Signature components
- **Beacon**: a near-black pill near the top (both themes) showing one live activity (a build, a flight, a timer): icon or progress ring + label + one mono value. Tapping morphs it into a card with details and up to 3 actions. One per app; hidden when nothing is live.
- **Buttons**: pill. Filled = accent + shadow-1 with a specific verb ("Publish 0.3.0", not "Submit"); one filled button per card. Tonal = surface-2 + shadow-1. Text = no fill.
- **Field**: outlined, 10px radius, floating label that sits inside and floats into a gap in the border on focus; help line below; error as a sentence under the field in bad red. No filled or underlined fields.
- **Close button**: a 32px circle with a 16px x icon, top-right. Never a text glyph.
- **Tables**: hairline rows, mono right-aligned numbers, sticky header; long lists scroll inside their card.
- **Show your work**: every card ends in a mono source line (the query, command or file) on a hairline top border.
- States: loading = skeleton rows (never zeros); empty = one line + the action; error = what happened + what to do.
- Icons: Lucide-style line icons. Never SF Symbols, SF Pro, Segoe or Fluent icons. No emoji as icons.

## Motion budget (for handoff; static screens show the resting state)
The more often something happens, the less it moves. Springs only for small things under the finger (press squash 0.96, toggles, segmented thumbs). Panels and sheets settle (fade + 12px slide, 280ms, no bounce). Menus and popovers are gentle (220ms fade + 4px drop). Keyboard-driven and live data: instant. No ripples, no halos.

## Landing layer (marketing pages)
Same family, turned up: hero type 64–168px at line-height ≤ 1 and −5% tracking (Geist 800 for Developer, Fraunces italic for Travel, Nunito 900 for Kids); two-tone headings (claim in ink, continuation in ink-2); one idea per screen, 140px between sections, centred column ≤ 1120px; the Top islands nav with one filled CTA; CTAs = one filled pill with a specific verb + a text link with ›. Show the real app in a frame. No gradient text, no glass, no carousels.
