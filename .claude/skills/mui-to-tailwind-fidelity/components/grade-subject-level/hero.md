# Component — `Hero` (grade-subject-level)

Left-column hero block: bold `h1` headline + descriptive paragraph + 4 stat chip rows (or single subtitle if `withForm`) + Trustpilot rating row. Used inside `<GradeSubjectLevel>` and `<GradeSubjectLevelV2>` (both v1 and v2 use the same `Hero` component).

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\hero.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\hero.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\ar-hero.tsx` |

## §1 MUI source — extracted properties

### Layout tree

```
Box (outer)
  height: { lg: 65vh }
  paddingInlineStart: { lg: 5vw }
  display: flex; flexDirection: column; justifyContent: center
  - Typography variant=h1 (dynamic via headerTag) — styles.heading
  - Typography variant=body2 — styles.desc
  - Box width 100% / lg 100%
    - Box (chips wrapper)
      display: flex; flexWrap: wrap
      justifyContent: { xs: center, lg: space-between }
      gap: 16px
      marginTop: 3vh
      width: { xs: 100%, sm: 60%, lg: 100% }; marginX: auto
      - if withForm: <Typography variant="subtitle1">imageAltText / fallback</Typography>
      - else: 4 chip Boxes (CircleIcon + Typography variant="caption")
        each Box: display flex; alignItems center; justifyContent {xs:center,sm:center,lg:left}; flex:1 1 calc(50%-24px); maxWidth: calc(50%-24px); cursor:pointer
        CircleIcon: color #38B6FF, fontSize 1rem, marginRight 8px
  - Box width: { xs: 100%, lg: 75vh } (trustpilot wrapper)
    - Box flex-row, alignItems {xs:center, lg:flex-start}, justifyContent {xs:center, lg:start}, marginTop 4vh, gap 1rem
      - Image greenstar h:3vh w:3vh
      - Typography variant="subtitle2" padding:.7vh 0 0 1vh → "Trustpilot"
      - Typography variant="caption" padding:1vh 0 0 0 → "Excellent (4.7/5)"
      - Image greenstars h:3vh w:14vh padding:.7vh 0 0 2vh
```

### Dimensions & spacing

| Element | Property | xs | sm | md | lg |
|---|---|---|---|---|---|
| Outer Box | height | — | — | — | 65vh |
| Outer Box | paddingInlineStart | — | — | — | 5vw |
| `styles.heading` | width | 100% | 100% | — | — (commented lg 35vw removed) |
| `styles.heading` | textAlign | center | center | center | start |
| `styles.heading` | marginTop | 3vh | 3vh | 3vh | 0vh |
| `styles.heading` | color | `#000000` | | | |
| `styles.desc` | width | — | 100% | — | 90% |
| `styles.desc` | textAlign | center | — | — | start |
| `styles.desc` | marginTop | 2vh | | | |
| chips wrapper | width | 100% | 60% | — | 100% |
| chips wrapper | marginTop | 3vh | | | |
| chips wrapper | gap | 16px | | | |
| each chip Box | flex | `1 1 calc(50% - 24px)`; maxWidth: `calc(50% - 24px)` | | | |
| trustpilot wrapper | width | 100% | — | — | 75vh |
| trustpilot row | marginTop | 4vh | | | |
| trustpilot row | gap | 1rem (=16px) | | | |
| greenstar/stars | h | 3vh / 3vh | | | |
| greenstars | w | 14vh | | | |
| CircleIcon | fontSize / marginRight | 1rem / 8px | | | |

### Typography

| Text | MUI variant | Mobile | Tablet | Desktop | Weight | Font |
|---|---|---|---|---|---|---|
| Headline (`data.header`) | `h1` (default; can be overridden by headerTag) | 1.75rem (28px) | 2.25rem (36px) | 3rem (48px) | 700 | League Spartan |
| Description (paragraph) | `body2` | 0.875rem (14px) | 0.875rem | 0.875rem | 400 | League Spartan |
| `withForm` subtitle | `subtitle1` (statNumber) | 1.75rem | 2.25rem | 3rem | 700 | League Spartan |
| Chip label (e.g. "9756 Active Students") | `caption` | 0.875rem | 0.875rem | 0.875rem | 400 | League Spartan |
| "Trustpilot" | `subtitle2` (statLabel) | 0.875rem uppercase | 0.875rem | 0.875rem | — | League Spartan |
| "Excellent (4.7/5)" | `caption` | 0.875rem | 0.875rem | 0.875rem | 400 | League Spartan |

### Colors

| MUI hex | Tailwind |
|---|---|
| `#38B6FF` (CircleIcon) | `text-brand-500` |
| `#000000` (heading) | `text-black` (or `text-ink-900`) |

### Animations / interactions
None. Chips have `cursor: pointer` but no onClick.

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 27 | `lg:h-[50vh] lg:ps-[5vw]` | MUI: `lg: 65vh` | **High** — 15vh shorter at desktop |
| B2 | 29 | `text-h1-mobile sm:text-h1-tablet … lg:text-h1` | matches | OK |
| B3 | 36 | `text-small` (description) | matches `body2` (14px) | OK |
| B4 | 36 | `font-heading` (League Spartan) | matches `leagueSpartan.className` | OK |
| B5 | 41 | `mx-auto mt-[3vh] flex w-full flex-wrap justify-center gap-4 sm:w-3/5 lg:w-full lg:justify-between` | matches MUI chip wrapper | OK |
| B6 | 44 | `withForm` text uses `text-h3-mobile … lg:text-h3 font-bold` | MUI uses `variant="subtitle1"` → `text-stat-number-mobile sm:text-stat-number-tablet lg:text-stat-number` (font-bold, 1.75rem/2.25rem/3rem). Port substitutes h3 sizes (1.125/1.25/1.5rem). | **High** — withForm subtitle is much smaller than MUI (h3 instead of stat-number) |
| B7 | 54 | `flex flex-1 basis-1/2 cursor-pointer items-center justify-center max-w-[calc(50%-24px)] lg:justify-start` | matches MUI `flex: 1 1 calc(50% - 24px); maxWidth: calc(50% - 24px); justifyContent: {xs:center, sm:center, lg:left}` | OK |
| B8 | 58 | dot `h-2 w-2 rounded-full bg-brand-500` (=8px) | MUI `CircleIcon fontSize: 1rem` (=16px) | Med — 50% smaller than MUI |
| B9 | 60 | `text-small leading-none text-ink-900` | MUI is `variant="caption"` → `text-small` ✓. `leading-none` is overly tight (chips will look cramped). MUI has default body line-height. | Low |
| B10 | 70 | `lg:w-[75vh]` (trustpilot wrapper) | matches | OK |
| B11 | 71 | `mt-[4vh] flex flex-row items-center justify-center gap-4 lg:justify-start` | MUI alignItems lg flex-start, justifyContent lg:start, marginTop 4vh, gap 1rem (16px) | OK; minor: missing `lg:items-start` |
| B12 | 78 | Trustpilot label uses `text-stat-label uppercase leading-[3vh]` | matches `subtitle2` → `text-stat-label uppercase` ✓ | OK |
| B13 | 83 | "Excellent" uses `text-small leading-[3vh]` | matches `caption` → `text-small` ✓ | OK |
| B14 | 67-68 | port doesn't use `mx-auto` for chips wrapper | MUI explicit `marginX: auto` | Low (only affects when w<100%) |

## §3 Corrected Tailwind classNames

```tsx
// outer
<div className="flex h-auto flex-col justify-center lg:h-[65vh] lg:ps-[5vw]">

// withForm subtitle (use stat-number tokens to match MUI subtitle1)
<p
  className="text-center font-heading text-stat-number-mobile font-bold text-ink-900 sm:text-stat-number-tablet lg:text-start lg:text-stat-number"
  dangerouslySetInnerHTML={...}
/>

// chip dot — bump to 16px (1rem) to match MUI CircleIcon
<span aria-hidden="true" className="me-2 inline-block h-4 w-4 shrink-0 rounded-full bg-brand-500" />

// chip label — drop leading-none, keep default leading-normal
<span className="font-heading text-small text-ink-900">{label}</span>

// trustpilot row — add lg:items-start
<div className="mt-[4vh] flex flex-row items-center justify-center gap-4 lg:items-start lg:justify-start">
```

## §4 Verification at 4 widths

- **375 (xs)**: heading text-h1-mobile (28px), description text-small (14px), 4 chips wrapped 2x2 centered; trustpilot row centered, `mt-[4vh]`.
- **768 (sm)**: heading text-h1-tablet (36px), chips wrapper width 60% centered.
- **1280 (lg)**: heading text-h1 (48px), left-aligned; chips span full width justify-between; trustpilot row left-aligned. `h-[65vh]` outer.
- **1920**: same as lg.

## §5 RTL notes

`ar-hero.tsx` sets `direction: "rtl"` on outer Box. Tailwind side should:
- Use `paddingInlineStart` semantics — `ps-*` and `pe-*` already direction-aware.
- Chip dot's `me-2` (margin-end) flips correctly in RTL.
- `textAlign: start` flips correctly via `text-start` (not `text-left`).
- Trustpilot row alignment `lg:items-start lg:justify-start` is the start side, flips naturally.
- Headline `lg:text-start` is correct (not `lg:text-left`).
