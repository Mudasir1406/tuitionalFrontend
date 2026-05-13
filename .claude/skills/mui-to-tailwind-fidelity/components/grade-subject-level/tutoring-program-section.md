# Component — `TutoringProgramSection`

A centered marketing block with a gradient fade background, h3 title, paragraph, and a primary CTA button. Used to introduce the tutoring program.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\tutoring-program-section\TutoringProgramSection.tsx` + `.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\tutoring-program-section\TutoringProgramSection.tsx` |

## §1 MUI source — extracted properties

### Layout tree

```
div .main (linear-gradient bg, position relative, pb 7vh / mobile 5vh, text-center, px 5vw)
  Typography variant=headerTag .title           data.header
  Typography variant=body2 .description (mt 2.5vh)  data.paragraph
  if buttonLink === "popup":
    div .btnDiv (mt 24px)
      PopUpButton style.contactButton
  else if buttonTitle:
    div .btnDiv
      Button variant=contained style.contactButton onClick=redirect
```

### Dimensions & spacing (from .module.css + inline sx)

| Element | Property | Mobile (<576) | sm | md | lg |
|---|---|---|---|---|---|
| `.main` | bg | `linear-gradient(to top, #d7f0ff, rgba(255,255,255,0.7))` | same | same | same |
| `.main` | padding | px 5vw / pb 5vh | px 5vw / pb 7vh | same | same |
| `.main` | text-align | center | | | |
| `.main` | position | relative | | | |
| `.description` | margin-top | 2.5vh | | | |
| `.btnDiv` | margin-top | 24px | | | |
| contactButton (inline sx, NOT module's `.contactButton`) | bg | `rgba(56,182,255,1)` (=#38B6FF) | same | same | same |
| contactButton | color | white | | | |
| contactButton | border-radius | 10px | | | |
| contactButton | line-height | 23px | | | |
| contactButton | letter-spacing | -2% | | | |
| contactButton | text-transform | none | | | |
| contactButton | paddingY | 1.5vh | 1.5vh | 2vh | 2vh |
| contactButton | paddingX | 25px | 25px | 22px | 25px |
| contactButton | shadow | `1px 15px 34px 0px rgba(0,0,0,0.2)` | same | same | same |

NOTE: The CSS module ALSO defines `.contactButton` with different styles (white bg, blue text, large fontSize 4vw…) but the COMPONENT uses inline `sx` (`style.contactButton`) which OVERRIDES — the CSS module `.contactButton` is dead code.

### Typography

| Text | MUI variant | Mobile | Tablet | Desktop | Weight | Font |
|---|---|---|---|---|---|---|
| Header | `data.headerTag` (default h3) | h3 triplet | h3 triplet | h3 triplet | 700 | League Spartan |
| Description | `body2` | 0.875rem | same | same | 400 | League Spartan |
| Button label | inline (`textTransform: none`, default Button fontSize) | 0.9375rem | 1rem | 1rem | 500 | League Spartan |

### Colors

| MUI value | Tailwind |
|---|---|
| gradient `#d7f0ff → rgba(255,255,255,0.7)` | use arbitrary `bg-[linear-gradient(to_top,#d7f0ff,rgba(255,255,255,0.7))]` |
| `rgba(56,182,255,1)` (#38B6FF) | `bg-brand-500` |
| `rgba(0,0,0,0.2)` shadow | arbitrary `shadow-[1px_15px_34px_0_rgba(0,0,0,0.2)]` |

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 32 | `bg-[linear-gradient(to_top,#d7f0ff,rgba(255,255,255,0.7))] px-[5vw] pb-[5vh] text-center sm:pb-[7vh]` | matches MUI: bg ✓, px 5vw ✓, pb 5vh mobile + 7vh ≥sm ✓ | OK |
| B2 | 16-20 | HEADER_SIZE map | matches MUI variant-driven triplet ✓. Improvement over other components. | OK |
| B3 | 34 | header `text-[rgba(0,0,0,0.87)]` | MUI does not explicitly set a color (defaults to body text). MUI text default in this theme is `#2D2D2D` (`text-ink-900`). `rgba(0,0,0,0.87)` is MUI's default primary text — close but not exact. | **Low** |
| B4 | 38 | desc `mt-[2.5vh] font-heading text-[0.875rem] leading-[1.43] text-[rgba(0,0,0,0.87)]` | matches MUI ✓ | OK |
| B5 | 43 | btn wrapper `mt-6 flex justify-center` | matches `.btnDiv { margin-top: 24px }` ✓ + centering | OK |
| B6 | 23 | button class `bg-[#009bf5]` | MUI `backgroundColor: rgba(56,182,255,1)` = `#38B6FF`. Port uses `#009BF5` (darker shade). | **High** — wrong button color |
| B7 | 23 | button `hover:bg-[#009bf5]` | MUI hover same as base (`rgba(56,182,255,1)`) — port hover also stays the same color (just wrong color). | (carry over from B6) |
| B8 | 23 | button `px-[25px] py-[1.5vh]` mobile | matches MUI `paddingX: 25, paddingY: 1.5vh` ✓ | OK |
| B9 | 23 | `md:px-[22px] md:py-[2vh] lg:px-[25px]` | matches MUI `paddingX: md:22 lg:25; paddingY: md/lg:2vh` ✓ | OK |
| B10 | 23 | button `text-sm font-normal normal-case` | MUI Button defaults uppercase (overridden by `textTransform: "none"` ✓ = `normal-case` ✓). MUI Button default fontSize 0.9375rem → `text-button-mobile sm:text-button`. Port uses `text-sm` (=0.875rem per default Tailwind). | **Med** — slightly off |
| B11 | 23 | button `font-normal` | MUI Button default font-weight 500 → `font-medium`. Port uses normal (400). | **Med** |
| B12 | 23 | `tracking-[-0.02em]` ✓, `leading-[23px]` ✓ | matches | OK |
| B13 | 23 | `shadow-[1px_15px_34px_0_rgba(0,0,0,0.2)]` ✓ | matches | OK |
| B14 | 23 | `rounded-[10px]` ✓ | matches | OK |

## §3 Corrected Tailwind classNames

```tsx
const BUTTON_CLASSES =
  "inline-flex cursor-pointer items-center justify-center rounded-[10px] bg-brand-500 px-[25px] py-[1.5vh] font-heading text-button-mobile font-medium normal-case leading-[23px] tracking-[-0.02em] text-white shadow-[1px_15px_34px_0_rgba(0,0,0,0.2)] transition-colors hover:bg-brand-500 sm:text-button md:px-[22px] md:py-[2vh] lg:px-[25px]";

return (
  <div className="bg-[linear-gradient(to_top,#d7f0ff,rgba(255,255,255,0.7))] px-[5vw] pb-[5vh] text-center sm:pb-[7vh]">
    <HeaderTag
      className={`font-heading text-ink-900 ${HEADER_SIZE[tag]}`}
      dangerouslySetInnerHTML={{ __html: data?.header ?? "" }}
    />
    <div
      className="mt-[2.5vh] font-body text-small leading-[1.43] text-ink-900"
      dangerouslySetInnerHTML={{ __html: data?.paragraph ?? "" }}
    />
    {data?.buttonTitle && (
      <div className="mt-6 flex justify-center">
        {data?.buttonLink === "popup" ? (
          <PopUpButton text={data.buttonTitle} href="popup" className={BUTTON_CLASSES} />
        ) : (
          <button type="button" onClick={() => handleRedirect(data.buttonLink)} className={BUTTON_CLASSES}>
            {data.buttonTitle}
          </button>
        )}
      </div>
    )}
  </div>
);
```

## §4 Verification at 4 widths

- **375**: gradient bg; header h3-mobile; desc 14px center; button p-[25px_1.5vh] brand-500.
- **768**: header h3-tablet; button px-[22px] py-[2vh] (md applies at 900 in Tailwind; verify breakpoint match).
- **1280**: header h3; button px-[25px] py-[2vh].
- **1920**: same as lg.

## §5 RTL notes

- All content `text-center` → direction-agnostic.
- Button `mx`-style padding only — no logical issues.
