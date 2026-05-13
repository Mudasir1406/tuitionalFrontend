# Component — `BenifitsSectionV2`

V2 variant of `BenifitsSection`. Same shell (gradient bg, title, 8-card grid, CTA) with slightly different card labels and a `PopUpButtonV2` (V2 CTA = brand blue solid button instead of white outlined). Shares the SAME `BenifitsSection.module.css`.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\benifts-section\BenifitsSectionV2.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\benifts-section\BenifitsSectionV2.tsx` |

## §1 MUI source — extracted properties

### Layout tree
Identical to [benifits-section.md](./benifits-section.md) §1 with these label differences:

1. "Pool of 500 + Tutors" (was "Pool of 100s of Tutors to choose from")
2. "24/7 On-Demand Academic Support." (was "Recorded classes for review")
3. "Real-Time Parent Dashboard" (was "Parental Updates")
4. Others unchanged.

### Dimensions & spacing
Identical to [benifits-section.md](./benifits-section.md) — same CSS module.

### Button (CTA) styling

| Property | MUI value |
|---|---|
| boxShadow | `1px 4px 24px 0px #38B6FFB2` |
| backgroundColor | white (note: same as v1; the V2 button STYLES match v1's sx; what differs is the **component** `PopUpButtonV2` which internally may re-style) |
| color | `#38B6FF` |
| paddingY | xs 1vh, lg 10px |
| width | xs 50%, sm 40%, md 30%, lg 30% |
| textTransform | none |
| borderRadius | 10px |
| transition | `all .5s ease-in-out` |
| hover | `transform: scale(1.05); backgroundColor: white; same shadow` |

**Note:** MUI source defines `containedBtn` with `backgroundColor: white` + `color: #38B6FF` — identical to v1. The visual difference between v1 and v2 buttons in the Tailwind port (v2 currently uses `bg-brand-500 text-white`) does NOT reflect the MUI baseline. Confirm with design what v2 should look like before fixing.

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 65 | `pb-[5vh] sm:pb-[6vh]` | matches | OK |
| B2 | 65 | `bg-gradient-to-b from-white to-[#58b9f6]` | matches `bg-benefit-fade` (or arbitrary) | OK |
| B3 | 67 | `text-h3-mobile sm:text-h3-tablet lg:text-h3` (no color) | should add `text-ink-900` | **Low** |
| B4 | 75 | `h-[100px] ... sm:h-[140px]` | MUI `.smallCard { min-height: 120px (<576px), 140px (≥576px); height: auto }`. Port pins hard heights. | **Med** |
| B5 | 80 | `text-caption` (=0.75rem per config) | MUI caption = 0.875rem → `text-small` | **Med** — labels too small |
| B6 | 89 | `w-1/2 ... sm:w-1/5 lg:py-[10px]` + `bg-brand-500 text-white shadow-…` + hover scale 1.03 | MUI: `width: xs 50%, sm 40%, md 30%, lg 30%; backgroundColor: white; color: #38B6FF; transform scale(1.05) on hover; transition .5s`. Port has the wrong width breakpoints (`sm:w-1/5` = 20% at 640px instead of 40% at 600px), wrong bg/color (brand-500 instead of white), wrong hover scale (1.03 vs 1.05), wrong duration (200ms vs 500ms). | **Critical** — totally different button visual |
| B7 | 3-11 | lucide-react icons | MUI uses `@mui/icons-material`. Lucide is a new dependency outside MUI/MUI baseline. | **Critical** — same as v1 |

## §3 Corrected Tailwind classNames

```tsx
<div className="bg-benefit-fade px-6 pb-[5vh] pt-0 sm:pb-[6vh]">
  <HeaderTag
    className="text-center font-heading text-h3-mobile text-ink-900 sm:text-h3-tablet lg:text-h3"
    dangerouslySetInnerHTML={{ __html: data?.section ?? "" }}
  />

  <div className="mx-auto mt-6 grid w-full grid-cols-2 gap-4 min-[992px]:w-4/5 min-[992px]:grid-cols-4">
    {items.map((item, idx) => (
      <div
        key={idx}
        className="flex min-h-[120px] flex-col items-center justify-center rounded-lg bg-white p-4 text-center transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-[5px] hover:shadow-[inset_0px_6px_10px_rgba(0,0,0,0.15),0px_4px_10px_rgba(0,0,0,0.1)] sm:min-h-[140px]"
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f7ff]">
          {item.icon}
        </div>
        <p className="font-heading text-small">{item.label}</p>
      </div>
    ))}
  </div>

  <div className="mt-9 flex justify-center">
    <PopUpButtonV2
      text="Book a Demo"
      href="popup"
      className="w-1/2 rounded-[10px] bg-white py-[1vh] font-heading text-button-mobile text-brand-500 shadow-[1px_4px_24px_0px_#38B6FFB2] transition-all duration-500 ease-in-out hover:scale-105 hover:bg-white sm:w-2/5 sm:text-button md:w-[30%] lg:w-[30%] lg:py-[10px]"
    />
  </div>
</div>
```

## §4 Verification at 4 widths

- **375**: 2-col grid; cards `min-h-[120px]`; button width 50%; button bg white text brand-500.
- **768**: 2-col grid; cards `min-h-[140px]`; button width 40%.
- **1280**: 4-col grid; button width 30% with `py-[10px]`.
- **1920**: same as lg.

## §5 RTL notes
Same as [benifits-section.md](./benifits-section.md) §5 — grid + centered text are direction-agnostic.
