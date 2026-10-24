Status: approved · built 2026-10-24

# One showcase app: Contoso

## Why
- The current showcase is three apps behind about 15 header toggles; finding one part means flipping toggles. The owner can't judge what the language needs.
- This page is the owner's review tool for deciding what stays in omxqua. Completeness beats polish (the home page stays the pitch).

## Who
- The owner, reviewing the language and giving feedback, on desktop. Later, people adopting omxqua.

## What v1 does
1. **One app, Contoso** (a travel planner, fictional; no private app's name or data), containing every component and the everyday screens: sign-in, home, trip list, trip detail, add/edit form, search, settings, plus empty, error and loading states. (assumed list)
2. **Theme picker** at the top: Graphite, Azulejo, Playground, Ledger, and Light/Night. A theme changes everything tokens set: colours, fonts, corners, tap size, density. The header holds theme, Light/Night and a View switch (Screens, All screens, Components), which the table needs.
3. **Each screen shows web and phone side by side**, picked from a list of screens on the left. No size toggle.
4. **Component table**, its own page: three columns, component | web | phone, with each cell rendering the real part. (assumed: replaces the Pairs view)

## Not in v1
- Domain-only parts that don't fit travel: Kids quest tiles, Developer CLI source lines, Money ledgers. They stay documented in AGENTS.md. (assumed)
- The old three-app showcase, Kit and Touch lab move to `docs/kit-v1.html`, still reachable but unlinked from the nav. (Built 2026-10-24: not `docs/_before/`, which is git-ignored and so would not be published; `landing.html` still frames it.)

## Look and feel
- Calm, complete, labelled: every frame names the screen and theme so feedback can say "Azulejo · trip detail · phone".

## Done means
- Every component in AGENTS.md §3–4 appears at least once in Contoso, and the component table lists them all.
- Switching theme re-skins both frames at once; the owner reviews any screen in one click.
- The tests pass, the reviewer passes it, and it's published to the site; the home page iframes point at Contoso.

## Decisions and trade-offs
- One app, themes instead of apps: much easier to compare. Accepted cost: each family's domain patterns are not shown.
- Side by side over a toggle: no hunting. Accepted cost: the desktop frame is scaled down on small monitors.
- Themes change everything tokens set: Kids looks like Kids. Accepted cost: tap size and density shift layouts between themes.

## Added during design (2026-10-24)
- An Assistant tab and seven agent concepts built on the Beacon (live steps, needs-you approval, heads-up diff, several at once, voice, receipt with undo), shown as concepts; their CSS stays in the showcase.
- Look: kept Crisp; borrowed Soft's tinted chips and coloured icons into the package (`.ic-tile`), tested at 3:1.

## Open questions
- None blocking. Sign-up and passkey screens are left out unless wanted.
