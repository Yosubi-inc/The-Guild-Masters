# The Guild Masters — Project Handoff

> Current-state note (2026-10-03): The dated development history now lives in `docs/archive/ACTIONS.md` (moved 2026-11-05). The early prototype-only description below predates the later Supabase/Stripe source work recorded in that history file. Neither historical live-test notes nor the presence of backend code attest to the current deployment of the Yosubi fork. Use `STATUS.md` for present evidence and `CONTEXT.md` for execution boundaries; preserve the game rules and visual decisions below.

Companion app to **The Tavern**, a physical space. Gamifies everyday tasks and
services (odd jobs, professional services, social outings) as an MMORPG/isekai
guild system. The local prototype and committed single-file bundle coexist with
later optional backend source; see the current-state note above.

## Current state

The editable source lives in `app/` — a Vite + React project (`app/src/App.jsx`,
`constants.js`, `components/QuestCard.jsx`, etc.). `npm run build` in `app/`
produces `app/dist/index.html` as a **fully self-contained, single-file**
bundle (via `vite-plugin-singlefile`); that output gets copied over the
repo-root `index.html`, which the upstream GitHub Pages setup historically deployed at
`https://madcowg.github.io/The-Guild-Masters/`. The Yosubi fork's active hosting is unverified. `app/node_modules/` and
`app/dist/` are gitignored — only source is tracked. There is still no CI/build
step on the deploy side: rebuild locally and commit the updated root
`index.html` alongside any `app/src` changes.

**Gotcha specific to this codebase:** a plain-quoted JSX attribute like
`placeholder="•••"` is NOT interpreted as a JS escape — JSX
treats quoted attribute values as literal text (like HTML), so it renders the
literal backslash-u text instead of the intended character. Any `\uXXXX`
(or similar) escape in an attribute must be wrapped in a JS expression:
`placeholder={"•••"}`. This bit the OTP-dots and several
ellipsis/em-dash placeholders once already — watch for it when adding new
placeholder/label text with non-ASCII characters.

## Critical bug already hit once — avoid repeating it

If you ever rebuild the standalone HTML bundle yourself: **do not import the
app's source file via an absolute filesystem path that lives outside the
bundler's project directory** (e.g. `import App from "/mnt/somewhere/App.jsx"`
from a different project root). Doing this caused esbuild to silently bundle
**two separate copies of React** — react-dom set its internal hook dispatcher
on one copy while the app's `useState` calls read from the other, which stayed
`null` forever. Symptom: blank page, console error `Cannot read properties of
null (reading 'useState')`, page renders nothing, no build errors at all.
Fix: always bundle from a relative import within the same project/node_modules
tree. Verify by counting `react.production` occurrences in the output bundle
— there should be exactly one set (react + react-dom share it), never a
duplicate set.

Also learned: GitHub Pages is case-sensitive and expects the root file to be
named exactly `index.html` (lowercase) — a mobile-uploaded `Index.html` caused
a silent 404 once. And GitHub Pages runs Jekyll by default, which chokes on
`{{ }}` patterns that show up incidentally in minified JS — an empty
`.nojekyll` file at repo root is required and is already in place.

## Core game design rules (do not casually change without re-checking math)

**Ranks:** F → E → D → C → B → A → S. Rank gates real-world access:
- Below E: cannot enter The Tavern at all.
- E+: can enter The Tavern.
- D+: Tavern club membership + guild-covered insurance for sanctioned quests.
- B+: contracts only acceptable *while physically checked into* The Tavern.
- A party (2+ members) lets the party attempt quests one rank above the
  highest member's own rank.

**XP curve (steepens sharply — intentional, gates late ranks behind real
commitment):**
```
E: 10 XP   D: 100 XP   C: 600 XP   B: 2,400 XP   A: 8,000 XP   S: 24,000 XP
```
(cumulative totals to attempt each rank's trial)

**Character level** (separate from rank) costs more XP each level:
`xpForLevel(n) = 25 * (n-1) * n` — i.e. level 2 costs 50 XP, level 3 costs
100 more, etc.

**Stat rewards per completed quest, gated by the quest's rank** — this is a
hard rule, not a suggestion:
| Rank band | # distinct stats trainable | Total points awarded |
|---|---|---|
| F, E | 1 | 1 |
| D, C | 2 | 2 |
| B, A | 3 | 3 |
| S | 4 | 4 |

Six stats: STR, DEX, CON, INT, WIS, CHA — mapped thematically to job type
(labor→STR, crafts/repairs→DEX, endurance/treks→CON, tutoring/coding→INT,
planning/searching→WIS, social/hosting→CHA). Stats have **unlimited growth**
(no cap) — the character sheet displays them as an MvC2-style character-select
grid of tiles rather than progress bars specifically so the UI doesn't break
as numbers grow arbitrarily large. Tile frame color escalates through named
tiers as a stat climbs: Novice (0+) → Tempered (10+) → Gilded (20+) →
Mythril (40+) → Legendary (80+).

## Visual language (intentional, keep consistent)

- **No emoji anywhere in the game board/cards** — every icon is a
  hand-authored inline SVG line-art icon in the app's ink color, to preserve a
  woodcut/engraved aesthetic. (Emoji are fine in casual chrome like toast
  messages, achievements list, buffs list — just not on quest cards or stat
  icons.)
- Quest cards are **wooden tablets hanging from a peg**, not tarot-style
  parchment cards (an earlier iteration used parchment; it was deliberately
  replaced). Each card has a drilled hole with a peg visibly passing through
  it, wood grain via inline SVG texture, chamfered (sawn-plank) corners, and a
  subtle "swing on hover" animation pivoting around the peg hole.
- Cards the player is under-ranked for show **rope bindings**, not padlocks
  or "locked" text. Binding complexity escalates with the quest's rank:
  - F/E: single sagging wrap + simple tied loop knot, frayed rope ends
  - D/C: two wraps (horizontal + vertical) + package-tie knot
  - B/A/S: double vertical + woven ring boss knot
  - Rope color = the quest's rank color. E is steel-gray specifically so it's
    visually distinct from D's teal (this was a deliberate fix — don't let E
    drift back toward green).
- Barter-board cards are the same wooden-tablet shape but sage-green stained
  wood, to distinguish the barter economy from the scrip economy at a glance.
- Attribute icons (hand-authored, keep the metaphor if redesigning): STR =
  flexed bicep silhouette, DEX = feather, CON = heart, INT = open book,
  WIS = all-seeing eye, CHA = theater/mask motif.
- Logo: a woodcut medallion — a guild-hall silhouette with a pennant, inside a
  notched circular ring border, line-art only.
- Fonts: Cinzel (headers/UI chrome), Alegreya (body), IM Fell English
  (italic/flavor text) — high-fantasy serif stack, loaded via Google Fonts.


## Older sections

The feature inventory, product roadmap, "Done since the original handoff" and "Beta to launch technical requirements" sections moved to `docs/archive/ACTIONS.md` (unchanged). Read that file only when the task needs them.

Compatibility pointer: migrations and older notes cite "CLAUDE.md Tier 1" to "Tier 5", "Beta to launch technical requirements" and the product roadmap. Those sections now live in `docs/archive/ACTIONS.md` under the same names.
