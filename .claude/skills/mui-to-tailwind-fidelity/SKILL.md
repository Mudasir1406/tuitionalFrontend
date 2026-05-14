---
name: mui-to-tailwind-fidelity
description: Use whenever a component or page in tuitionalFrontend (Tailwind) doesn't visually match the tuitionalFrontend-mui-baseline source. Covers font-size drift, intra-component spacing, inter-section spacing on pages, breakpoint mismatches, and the 20-device responsive verification protocol. Trigger phrases — "fix styling to match MUI", "responsive on mobile/tablet", "spacing is off", "font sizes wrong", "looks different from the old site".
---

# MUI → Tailwind Fidelity Skill

## The problem this skill solves

`tuitionalFrontend` was ported from `tuitionalFrontend-mui-baseline` to Tailwind. Four classes of bug recur across the port:

1. **Font sizes** — the Tailwind `text-h1 / text-h1-tablet / text-h1-mobile` triplet is defined correctly in `tailwind.config.ts` but components inconsistently chain it. MUI's mobile `html { font-size: 15px }` rem shrink isn't reproduced.
2. **Intra-component spacing** — MUI's `Grid columnSpacing={2} rowSpacing={1}` (16px × 8px) is regularly mistranslated to `gap-x-4 gap-y-5` (16px × 20px) etc.
3. **Inter-component spacing on pages** — MUI uses `sx={{ marginY: { xs, sm, lg } }}` per section; ports often pick arbitrary `py-*` values.
4. **Breakpoint inversion** — MUI Grid `lg={6} md={12}` splits to 2 columns **only at 1200px+**. Ports use `sm:grid-cols-2`, splitting at 600px (the 600-1199px band breaks).

The two repos sit side-by-side on disk. The MUI repo is the source of truth.

| Repo | Path | Status |
|---|---|---|
| MUI baseline (read-only reference) | `C:\Users\pc\Desktop\Work\Tuitional\tuitionalFrontend-mui-baseline\` | **DO NOT EDIT** — this is the design source of truth |
| Tailwind port (active) | `C:\Users\pc\Desktop\Work\Tuitional\tuitionalFrontend\` | Edit here |

## When to invoke

- A specific component looks wrong (cramped, wrong font size, breaking on a phone size) — **always** invoke before editing className strings by feel.
- The user says "match the old site", "compare with mui", "the spacing is off", "fix responsive".
- Before adding any `text-*`, `gap-*`, `p-*`, `m-*`, `grid-cols-*` class — look up the equivalent MUI value first.

## Workflow (always follow in order)

### Phase 1 — Inspect MUI source

1. Locate the matching file in `tuitionalFrontend-mui-baseline\src\`. Path usually mirrors the Tailwind side 1:1.
2. Read the full file, including any `.module.css` sibling.
3. Note every `sx={{}}`, `style={{}}`, `<Grid>` prop, MUI `<Typography variant=...>`, and the CSS-module rules.

### Phase 2 — Extract token values

Use the reference tables to translate every MUI value to its Tailwind equivalent **literally**. Never round, never guess.

| Look up | In |
|---|---|
| Typography variants (`<Typography variant="h2">`, `body1`, `subtitle1` …) | [01-token-mapping.md §Typography](./01-token-mapping.md) |
| MUI Grid `xs/sm/md/lg/xl={n}` patterns | [01-token-mapping.md §Grid](./01-token-mapping.md) |
| MUI `spacing(n)` / `p={n}` / `m={n}` / `gap={n}` / `columnSpacing={n}` | [01-token-mapping.md §Spacing](./01-token-mapping.md) |
| MUI breakpoint object `{ xs, sm, md, lg, xl }` | [02-spacing-translation.md](./02-spacing-translation.md) |
| `theme.palette.*`, `theme.spacing()`, `theme.breakpoints.*` | [01-token-mapping.md](./01-token-mapping.md) |

### Phase 3 — Apply Tailwind translation

Rules (all enforced — single violation blocks the change):

- **Never invent values.** Every Tailwind class must trace to a MUI source line. If MUI used `pt: 5`, write `pt-10` (5 × 8 = 40px), not `pt-12`.
- **Never approximate `vh`/`vw` to pixels.** MUI uses `vh` heavily; keep `vh` literal: `my-[4vh] sm:my-[5vh] lg:my-[6vh]`.
- **Always use the mobile/tablet/desktop typography triplet.** Every text element gets `text-h2-mobile sm:text-h2-tablet lg:text-h2` (or the variant's equivalent). See [01-token-mapping.md §Typography](./01-token-mapping.md) for the full mapping.
- **Breakpoint inversion**: if MUI says `<Grid item lg={6} md={12}>`, the Tailwind equivalent is `grid-cols-1 lg:grid-cols-2` — **never** `sm:grid-cols-2` or `md:grid-cols-2`.
- **Cite the MUI source.** When writing a non-obvious value, leave a single comment with the file:line reference, e.g. `// from GetInTouch.tsx:42 rowSpacing={1}`. Skip comments for trivial 1:1 translations.
- **Foundation fixes ride at the foundation layer.** Don't try to fix mobile `font-size: 15px` per-component — fix it once in `globals.css`. See [04-foundation-fixes.md](./04-foundation-fixes.md).
- **Preserve the legacy file/path quirks.** If the file is named `form-dialouge.tsx` (sic), don't rename it during the fix.

### Phase 4 — Verify on the device matrix

Before marking the fix complete, walk through the 20-device matrix in [03-responsiveness.md](./03-responsiveness.md) and the section-rhythm check in the matching example file. **Visual side-by-side** with the MUI baseline at four reference widths is mandatory: 375 / 768 / 1280 / 1920.

A change that passes type-check and lint but visually diverges from MUI at any of those widths is not done.

## Table of contents

### Quick fix (start here for any UI issue)

| File | Purpose |
|---|---|
| [QUICKFIX.md](./QUICKFIX.md) | **Single-file reference** — typography, spacing, grid, colors, header compensation, RTL, i18n, verification. Start here. Only go to the files below for deep-dives. |

### Reference docs (deep-dive)

| File | Purpose |
|---|---|
| [01-token-mapping.md](./01-token-mapping.md) | Authoritative MUI → Tailwind token tables (typography, breakpoints, Grid, spacing, colors, shadows, radii) |
| [02-spacing-translation.md](./02-spacing-translation.md) | Systematic rules for translating MUI `sx`/`Grid`/`spacing` to Tailwind classes |
| [03-responsiveness.md](./03-responsiveness.md) | 20-device test matrix + Chrome DevTools workflow + per-device check list |
| [04-foundation-fixes.md](./04-foundation-fixes.md) | `globals.css` and `tailwind.config.ts` edits required to match MUI base behavior |

### Per-component & per-page specs (look up what you're editing)

| File | Purpose |
|---|---|
| [components-catalogue.md](./components-catalogue.md) | Index of EVERY component grouped by folder. Each row links to a detailed spec extracting the exact MUI properties + Tailwind bug list. |
| [pages-catalogue.md](./pages-catalogue.md) | Index of EVERY user-facing route. Each row links to a page-level spec documenting section sequence, inter-section spacing, and containers. |

### Workflow

Before changing any component:
1. Find the component in [components-catalogue.md](./components-catalogue.md) → open its spec.
2. Read §1 (MUI properties) and §2 (bug list).
3. Apply §3 (corrected classNames).
4. Verify per §4 (4 reference widths) + [03-responsiveness.md](./03-responsiveness.md) (full 20-device matrix).

Before changing any page (route-level layout):
1. Find the route in [pages-catalogue.md](./pages-catalogue.md) → open its spec.
2. Verify the section sequence matches MUI.
3. Verify the inter-section margins (`my-[5vh] md:my-[10vh]` is the default).
4. For each section, drill into its component spec via the catalogue.

## Hard rules (single violation blocks the change)

1. Never invent token values. Always trace to a MUI source line.
2. Never approximate `vh`/`vw` to pixels.
3. Always use the mobile/tablet/desktop typography triplet, in that order.
4. Never use `sm:grid-cols-2` / `md:grid-cols-2` when MUI used `lg={6}`. Use `lg:grid-cols-2`.
5. Never edit `tuitionalFrontend-mui-baseline\` — it is read-only reference.
6. Never rename legacy-misspelled files (`form-dialouge.tsx`, `Image-input.tsx`, `get_started.tsx`) — imports depend on them.
7. Never add a new dependency (no Playwright, no new icon pack, no new font, no new CSS framework). All deps lock to `package.json`.
8. Foundation file edits (`globals.css`, `tailwind.config.ts`, `fonts.ts`) require reading [04-foundation-fixes.md](./04-foundation-fixes.md) first to confirm the edit is sanctioned.
9. Every visual fix must be verified at 375 / 768 / 1280 / 1920 widths against the MUI baseline before being declared done.
10. When extracting a new component spec on-demand (one not in `examples/`), follow the same MUI-read → token-lookup → Tailwind-write flow. Add the result to `examples/` if it's likely to be reused.
11. **Header is sticky in flow (Tailwind) but absolute in MUI.** MUI outer `<Box>` is `position: absolute` — zero flow space. Tailwind `<Header>` is `position: sticky` — consumes `calc(2vh + 72px)` at xs, `calc(2vh + 80px)` at sm+. Any hero container with `height: 100vh` must add `margin-top: calc(-2vh - 72px)` (xs) / `calc(-2vh - 80px)` (sm+) to cancel this. Pages using `pt-*` compensation must add the same amount as padding-top. See [04-foundation-fixes.md §6](./04-foundation-fixes.md) and [components/shared/header.md §5](./components/shared/header.md) for the full pattern.
12. **Decorative strip z-index must be `z-[-1]`.** The MUI `circleBox` is `z-index: -2`. Tailwind's strip must be `z-[-1]` — `z-0` places it in the stacking context above hero content, visually covering it.
13. **`t()` uses `??` not `||`.** Locale values that are intentionally empty strings `""` must render as `""`, not fall back to the key. The `language-context.tsx` uses `??` — never change it back to `||`.
14. **Pages with full-viewport hero strips must pass `heroClassName` to `<Header>`.** Default `DEFAULT_HERO_BG` is a fixed-pixel solid color (for non-hero pages). Pages that replicate MUI's gradient strip must override: `heroClassName="h-[10vh] sm:h-[10vh] md:h-[20vh] lg:h-[30vh] bg-gradient-to-b from-[#D7F0FF] to-white/70"`.
