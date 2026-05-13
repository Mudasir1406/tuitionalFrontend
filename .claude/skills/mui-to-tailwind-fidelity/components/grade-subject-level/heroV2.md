# Component — `HeroV2`

Variant of Hero that renders **green-check bullet points** instead of the 4-chip stat block, when `withForm` is true. When `withForm=false`, falls through to the same Trustpilot row pattern as `Hero`. Used in alternative grade-subject-level pages.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\heroV2.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\heroV2.tsx` |

## §1 MUI source — extracted properties

### Layout tree

```
Box (outer)
  height: { lg: 65vh }
  paddingLeft: { lg: 5vw }   // ← note: paddingLeft, not paddingInlineStart (LTR-only)
  display: flex; flexDirection: column; justifyContent: center
  - Typography variant=h1 — styles.heading
  - Typography variant=body2 — styles.desc
  - Box width 100% (empty placeholder)
  - Box width: { xs: 100%, lg: 75vh }
    if withForm:
      Box → bullets column
        display: flex; flexDirection: column; gap: 12px
        marginTop: { xs: 2vh, md: 3vh }; marginBottom: 2vh
        each bullet:
          Box flex/items-center justifyContent: {xs:center, lg:flex-start}
            CheckCircleIcon color #22C55E fontSize 1.2rem marginRight 8px
            Typography variant="body2" fontWeight 500 color #374151 → feature text
    else (no form):
      Trustpilot greenstar/greenstars row — same as Hero
```

### Dimensions & spacing

| Element | Property | xs | sm | md | lg |
|---|---|---|---|---|---|
| Outer | height | — | — | — | 65vh |
| Outer | paddingLeft | — | — | — | 5vw |
| heading | marginTop | 3vh | 3vh | 3vh | 0vh |
| heading | textAlign | center | center | center | start |
| desc | textAlign | center | — | — | start |
| desc | marginTop | 2vh | | | |
| desc | width | — | 100% | — | 90% |
| bullets wrapper | gap | 12px | | | |
| bullets wrapper | marginTop | 2vh | — | 3vh | — |
| bullets wrapper | marginBottom | 2vh | | | |
| CheckCircleIcon | fontSize / marginRight | 1.2rem / 8px | | | |

### Typography

| Text | Variant | Size | Weight | Color | Font |
|---|---|---|---|---|---|
| Headline | h1 | 28/36/48px | 700 | `#000000` | League Spartan |
| Description | body2 | 14px | 400 | default | League Spartan |
| Bullet text | body2 | 14px | **500 (override)** | `#374151` | League Spartan |
| (no form) "Trustpilot" | subtitle2 | 14px | — | default | League Spartan |
| (no form) "Excellent" | caption | 14px | 400 | default | League Spartan |

### Colors

| MUI hex | Tailwind |
|---|---|
| `#22C55E` (CheckCircleIcon green) | `text-success` (#51B893 is the success token — note `#22C55E` is Tailwind green-500, NOT the project's success token). Use arbitrary `text-[#22C55E]` to match MUI exactly. |
| `#374151` (bullet text) | `text-ink-700` (close approximation) |

### Animations / interactions
None.

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 22 | `lg:h-[65vh] lg:ps-[5vw]` | matches `height: 65vh, paddingLeft: 5vw`. ✓ port uses `ps-*` which is logical, while MUI used physical `paddingLeft`. In LTR identical; in RTL the port mirrors but MUI does not (intentional or bug in MUI — port is arguably more correct for AR). | Low (port more RTL-correct than MUI) |
| B2 | 43 | `<CheckCircle size={20} className="me-2 text-success" />` | MUI: `color: "#22C55E"`, `fontSize: 1.2rem` (=19.2px). Tailwind `text-success` token resolves to `#51B893`, not `#22C55E`. | **Med** — wrong green shade. Use `text-[#22C55E]` to match. |
| B3 | 44 | `size={20}` | MUI 1.2rem ≈ 19.2px; 20px close enough | OK |
| B4 | 48 | `text-small font-medium text-ink-700` | matches `body2` (14px), fontWeight 500 (`font-medium`), color `#374151` (`text-ink-700`) | OK |
| B5 | 37 | `mt-[2vh] mb-[2vh] flex flex-col gap-3 md:mt-[3vh]` | matches MUI `marginTop: {xs:2vh, md:3vh}; marginBottom: 2vh; gap: 12px` (`gap-3` = 12px ✓) | OK |
| B6 | 35 | `<div className="w-full lg:w-[75vh]">` | matches | OK |
| B7 | 24 | headline `text-h1-mobile sm:text-h1-tablet … lg:text-h1` | matches | OK |
| B8 | 31 | description `text-small` | matches `body2` | OK |
| B9 | 41 | `justify-center lg:justify-start` (bullet row) | matches | OK |
| B10 | 56-72 | Trustpilot row (no-form branch) identical to Hero port | matches Hero's MUI | OK |

## §3 Corrected Tailwind classNames

Single fix — bullet check icon color:

```tsx
<CheckCircle size={20} className="me-2 text-[#22C55E]" aria-hidden="true" />
```

## §4 Verification at 4 widths

- **375**: heading 28px center, desc 14px center, bullets stacked center-aligned, no Trustpilot if withForm.
- **768**: heading 36px center; bullets gap-3 stacked center.
- **1280**: heading 48px start-aligned, ps-[5vw], bullets left-aligned `lg:justify-start`.
- **1920**: same as lg.

## §5 RTL notes

No dedicated `ar-heroV2.tsx` in either repo. If used with `dir="rtl"`:
- Bullet `me-2` (margin-end) flips correctly.
- `paddingLeft` in MUI is **physical** — does not flip in RTL. Port uses `ps-[5vw]` (logical), which **does** flip. Port is more RTL-friendly here.
- `lg:justify-start` and `lg:text-start` both flip correctly.
