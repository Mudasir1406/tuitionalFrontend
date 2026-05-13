# Component — `TutorSection` (grade-subject-level tutor block)

Title + tutor cards (GridView or ListView). Data fetched server-side by `getTutorsByFilter(curriculum, subject, "en")`. Used on every grade-subject-level page that has a `Tutor Section` block.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\tutor-section\TutorSection.tsx` + `style.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\tutor-section\TutorSection.tsx` |
| Arabic variant | `ArTutorSection.tsx` (MUI side) |

## §1 MUI source — extracted properties

### Layout tree

```
div .main                                          (radius 16px, padding 0 24px; mobile: 0 12px)
  Typography variant=headerTag||h3 .title          dangerouslySetInnerHTML data.header
  div .mt1                                         (marginTop: 2vh)
    GridView | ListView (data.view === "Row View")
```

### Dimensions & spacing (from `style.module.css`)

| Element | Property | Value (≥576px) | Mobile (<576px) |
|---|---|---|---|
| `.main` | border-radius | 16px | 16px |
| `.main` | padding | **0 24px** | **0 12px** |
| `.title` | text-align | center | center |
| `.title` | margin-bottom | **1vh** | 1vh |
| `.mt1` | margin-top | **2vh** | 2vh |

### Typography

| Text | MUI variant | Mobile | Tablet | Desktop | Weight | Font |
|---|---|---|---|---|---|---|
| Title (from `data.header`) | `headerTag` or default `h3` | 1.125rem | 1.25rem | 1.5rem | 700 | League Spartan |

### Animations / interactions
None at section level. Card-level interactions live in GridView/ListView.

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 27 | `mx-auto max-w-[1440px] px-6 py-12 lg:py-16` | MUI `.main { padding: 0 24px }` on ≥576px and `0 12px` on <576px. No `max-width`, no vertical padding, no `mx-auto`. | **High** — Port adds vertical padding (12/16 × 8 = 96px / 128px) that MUI doesn't have, and clamps width at 1440px. |
| B2 | 27 | `px-6` (=24px) on all sizes | MUI: 24px ≥576px, **12px <576px** (`px-3`) | **Med** — mobile horizontal padding too wide |
| B3 | 27 | (no `rounded-2xl`) | MUI `.main { border-radius: 16px }` (cosmetic — `.main` has no background so corners aren't visible; can be dropped) | **Low** |
| B4 | 29 | `text-h3-mobile sm:text-h3-tablet lg:text-h3 text-ink-900` | Matches MUI when `headerTag` defaults to `h3`. | OK |
| B5 | 29 | (no font-weight override needed; tokens carry 700) | matches | OK |
| B6 | 29 | (port doesn't apply `mb-[1vh]`) | MUI `.title { margin-bottom: 1vh }` | **Med** — missing 1vh margin-bottom on title |
| B7 | 32 | `mt-8` (=32px) | MUI `.mt1 { margin-top: 2vh }` (≈14-19px at typical viewports) | **High** — gap is too large |
| B8 | 24 | HeaderTag dynamic via `data?.headerTag?.trim() || "h3"` | matches MUI logic | OK |

## §3 Corrected Tailwind classNames

```tsx
<div className="px-3 sm:px-6">
  <HeaderTag
    className="mb-[1vh] text-center font-heading text-h3-mobile text-ink-900 sm:text-h3-tablet lg:text-h3"
    dangerouslySetInnerHTML={{ __html: data?.header ?? "" }}
  />
  <div className="mt-[2vh]">
    {data?.view === "Row View" ? (
      <ListView data={val} locale="en" />
    ) : (
      <GridView cardsData={val} locale="en" />
    )}
  </div>
</div>
```

Drop `mx-auto max-w-[1440px] py-12 lg:py-16` — MUI has no equivalent. Outer page-level `my-[5vh] lg:my-[10vh]` rhythm should come from the parent route layout, not from this component.

## §4 Verification at 4 widths

- **375 (xs)**: title h3-mobile (18px), `px-3` (12px), title margin-bottom 1vh.
- **768 (sm)**: title h3-tablet (20px), `px-6` (24px).
- **1280 (lg)**: title h3 (24px), `px-6` (24px); content `mt-[2vh]` below title.
- **1920**: same as lg.

## §5 RTL notes

- `ArTutorSection.tsx` (MUI side) wraps content with `dir="rtl"`. Tailwind side already relies on global `dir` from layout.
- Title `text-center` is direction-agnostic.
- Cards (Grid/List view) handle their own RTL — see [tutor-grid-view.md](./tutor-grid-view.md), [tutor-list-view.md](./tutor-list-view.md).
