# Stitch review · Universal Language (2026-10-20)

Project: https://stitch.google.com/projects/16428631202563231164 (id 16428631202563231164)
Workspace for insights: "Universal Language · review". Raw files: `captures/`, `insights/`, `stitch-screens/`.

## Agree · fix now
1. Night has no accent values for teal, violet, sage, rose (3.5–4.2:1); white on amber is 3.46:1 in both themes.
2. The source-line "copy" button is a 4 px-radius square, 17 px tall; tappable must be a pill.
3. Several controls fall below their family's `--ul-target`.
4. The Beacon close is a custom 26–28 px `.x`, not the standard 32 px `.xbtn`.
5. Kit: a field still shows a static label, not the floating label.
6. `.xbtn` and the field styles live only in the showcase; move them into a shared CSS next to `tokens.css`.
7. Landing B and C closing CTAs lack the `›` link; there is no 140 px section token.
8. Kids · Dock: the floating nav covers "I did a quest!".

## Disagree
- Slider and skeleton "gradients": the slider is a solid fill written with gradient syntax and the skeleton is a loading state, not chrome. (Write the exception into LANGUAGE.md.)
- "Press release jumps": the spring ends at scale 1, the resting state.
- "Demo bar too small": `bare=1` hides it; it isn't part of the language.

## Unsure
- Quest tiles have no source line: Kids may need an exception to "every card ends in a source line".
- "Get the alpha" / "Try it free" are generic CTAs; "Start a trip" is specific enough.
- The logo stroke dash length (120) is fixed; fine for short marks, may need measuring for long wordmarks.

## What Stitch did differently in its own screens
1. Kept the three top islands for Travel and Kids; merged omxcore into one bar with the Beacon as a chip; on phone the Beacon became a full-width bar.
2. A mono source line on every card and stat, stricter than ours.
3. Worth borrowing: the budget bar split by kind; day chips with neighbourhood labels; reward chips on quest tiles.
4. Broke our rules: two filled "Publish 0.3.0" buttons, a gradient header strip (Travel desktop), emoji (Kids phone), a gradient reward card, a doubled tick on "I did a quest!".
5. Added cards nobody asked for: "Quick Verification", "Ask AI", a streak counter.

## Notes on the CLI (v0.11.1)
- `--device MOBILE` is ignored; pass `{"deviceType":"MOBILE"}` in the JSON payload.
- Insights review a workspace against a priority, not a screen.
- Pages that embed the app in an iframe capture blank.
