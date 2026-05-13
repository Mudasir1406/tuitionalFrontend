# Component — `BenifitsSection`

A gradient-faded "Benefits of Our Tutoring Program" block: section title + 8 icon cards arranged in a 4×2 grid (desktop) / 2×4 (≤991px) / 2×4 (≤575px) + a "Book a Demo" CTA at the bottom.

(Spelling: "Benifits" — keep this typo, imports depend on it.)

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\benifts-section\BenifitsSection.tsx` + `BenifitsSection.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\benifts-section\BenifitsSection.tsx` |
| Arabic variant | `ArBenifitsSection.tsx` (MUI side) |

## §1 MUI source — extracted properties

### Layout tree

```
div .main                                      (gradient bg, padding 0 24px 6vh 24px; mobile 0 24px 5vh 24px)
  Typography variant=sectionTag||h3 .title     (text-align center)
  div .cards                                   (grid 4 cols desktop / 2 cols ≤991px, gap 16px, mt 24px, w 80% mx auto)
    × 8 div .smallCard                         (white bg, radius 16px, p 16px, min-h 140px / mobile 120px, flex col items-center)
      div .iconDiv                             (48×48 round, bg #e8f7ff, mb 16px)
        icon (35×30, #009BF5) | TutorIcon image
      Typography caption                       (label text)
  Box buttonContainer (mt 36px, flex justify-center)
    PopUpButton style.containedBtn
```

### Dimensions & spacing (from `BenifitsSection.module.css` + inline sx)

| Element | Property | Mobile (<576px) | sm-md (576-991px) | lg+ (≥992px) |
|---|---|---|---|---|
| `.main` | padding | **0 24px 5vh 24px** | 0 24px 6vh 24px | 0 24px 6vh 24px |
| `.main` | background | `linear-gradient(to bottom, white, #58b9f6)` | same | same |
| `.cards` | grid-template-columns | repeat(2, 1fr) | repeat(2, 1fr) | repeat(4, 1fr) |
| `.cards` | width | 100% | 100% | 80% (then 100% from 992-1199; back to 80% ≥1200 implicit since no override) |
| `.cards` | gap | 16px | 16px | 16px |
| `.cards` | margin-top | 24px | 24px | 24px |
| `.cards` | margin-x | auto | auto | auto |
| `.smallCard` | min-height | **120px** | 140px | 140px |
| `.smallCard` | padding | 16px | 16px | 16px |
| `.smallCard` | border-radius | 16px | 16px | 16px |
| `.smallCard` | bg | white | white | white |
| `.iconDiv` | width × height | 48 × 48 | same | same |
| `.iconDiv` | border-radius | 50px (=full) | same | same |
| `.iconDiv` | margin-bottom | 16px | same | same |
| `.iconDiv` | background | `#e8f7ff` | same | same |
| icons | size | 35 × 30 (`style.icon`) | same | same |
| icons | color | `#009BF5` | same | same |
| `buttonContainer` | margin-top | 36px | 36px | 36px |
| CTA button | paddingY | **1vh** | 1vh | **10px** |
| CTA button | width | 50% | 40% | 30% (md=30%, lg=30%) |
| CTA button | border-radius | 10px | same | same |
| CTA button | box-shadow | `1px 4px 24px 0px #38B6FFB2` | same | same |
| CTA button | bg / color | white / `#38B6FF` | same | same |
| CTA hover | transform | `scale(1.05)`; shadow same | | |

Card hover: `box-shadow: inset 0px 6px 10px rgba(0,0,0,0.15), 0px 4px 10px rgba(0,0,0,0.1); transform: translateY(-5px)`. Transition: `box-shadow 0.3s ease, transform 0.3s ease`.

### Typography

| Text | MUI variant | Mobile | Tablet | Desktop | Weight | Font |
|---|---|---|---|---|---|---|
| Title | `sectionTag` or `h3` | 1.125rem | 1.25rem | 1.5rem | 700 | League Spartan |
| Card label | `caption` (component=p) | 0.875rem | 0.875rem | 0.875rem | 400 | League Spartan |
| Button label | inline (`textTransform: none`) | inherit | inherit | inherit | 500 | League Spartan |

### Colors

| MUI value | Tailwind |
|---|---|
| gradient `white → #58b9f6` | `bg-benefit-fade` |
| `#e8f7ff` icon bg | bg-arbitrary `bg-[#e8f7ff]` |
| `#009BF5` icon color | bg-arbitrary `text-[#009BF5]` |
| `#38B6FF` button text | `text-brand-500` |
| `#38B6FFB2` shadow | arbitrary `shadow-[1px_4px_24px_0px_#38B6FFB2]` |

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 41 | `px-6 pb-[5vh] pt-0 sm:pb-[6vh]` | MUI `.main { padding: 0 24px 6vh 24px }` and mobile `0 24px 5vh 24px`. Port has `px-6` ✓ and `pt-0` ✓ but breakpoint inverted: should be `pb-[5vh] sm:pb-[6vh]` (mobile-first base = 5vh, sm+ = 6vh). | OK — port actually matches |
| B2 | 41 | (no gradient bg in className) | Should include `bg-benefit-fade` for `linear-gradient(to bottom, white, #58b9f6)` | **High** — port uses `bg-gradient-to-b from-white to-[#58b9f6]` which equals `bg-benefit-fade`. Verify the token exists in `tailwind.config.ts` `backgroundImage`. If not, the arbitrary version is fine. |
| B3 | 43 | `text-h3-mobile sm:text-h3-tablet lg:text-h3` (no text-ink-900) | MUI title has no explicit color (inherits `#2d2d2d`). Port should add `text-ink-900` for consistency. | **Low** |
| B4 | 47 | `mt-6 grid w-full grid-cols-2 gap-4 min-[992px]:w-4/5 min-[992px]:grid-cols-4` | MUI `.cards { grid-template-columns: repeat(4, 1fr) }` default; below 992px → 2 cols + width 100%. Tailwind `min-[992px]` ✓ matches MUI 992px breakpoint. Default Tailwind `lg:` = 1200px (different!). Port uses correct arbitrary breakpoint. | OK — but mt-6 (24px) ✓ |
| B5 | 51 | `h-[100px] flex-col … sm:h-[140px]` | MUI `.smallCard { min-height: 120px (<576px); 140px (≥576px) }` and `height: auto`. Port pins `h-[100px]` mobile then `h-[140px]` sm+ — should be `min-h-[120px]` / `sm:min-h-[140px]`. | **Med** — mobile cards 20px short and rigid |
| B6 | 51 | `rounded-lg` (=16px) | matches `.smallCard { border-radius: 16px }` | OK |
| B7 | 51 | `p-4` (=16px) | matches | OK |
| B8 | 51 | `hover:-translate-y-[5px] hover:shadow-[inset_0px_6px_10px_rgba(0,0,0,0.15),0px_4px_10px_rgba(0,0,0,0.1)]` | matches MUI `.smallCard:hover` | OK |
| B9 | 53 | `h-12 w-12 rounded-full bg-[#e8f7ff]` | matches `.iconDiv { 48×48 round #e8f7ff }` ✓, but missing alignment — MUI has `flex-direction: column; justify-content: center; align-items: center`. Tailwind `flex items-center justify-center` ✓ | OK |
| B10 | 53 | `mb-4` (=16px) | matches | OK |
| B11 | 56 | `font-heading text-caption` | MUI `variant="caption"` → `text-small` (0.875rem). Port `text-caption` = 0.75rem per tailwind config. | **Med** — label text 14px MUI vs 12px port |
| B12 | 28-34 | uses `lucide-react` icons (`Mic`, `Calendar`, `BookOpen`, etc.) | MUI uses `@mui/icons-material` (`Mic`, `CalendarMonth`, `BookSharp`, `BarChart`, `ScheduleOutlined`, `Insights`, `SupervisorAccount`). Lucide is a NEW DEPENDENCY (not allowed per skill rules). **HARD VIOLATION** | **Critical** — lucide-react not approved; CMS allows only MUI icons. Verify if lucide is in tuitionalFrontend's allowed icon library; if not, swap for SVG inline or MUI icons (if Tailwind side allows). |
| B13 | 28-34 | icons sized `h-[30px] w-[35px]` | matches `style.icon { width: 35px, height: 30px }` (note width/height intentionally NOT square) | OK |
| B14 | 61 | `mt-9` (=36px) ✓ | matches | OK |
| B15 | 66 | button: `w-1/2 ... sm:w-2/5 md:w-[30%] lg:w-[30%]` | matches MUI width `xs:50% sm:40% md:30% lg:30%` ✓ | OK |
| B16 | 66 | `py-[1vh] lg:py-[10px]` | matches MUI paddingY `xs:1vh, lg:10px` ✓ | OK |
| B17 | 66 | `rounded-[10px]` ✓, `shadow-[1px_4px_24px_0px_#38B6FFB2]` ✓, hover scale ✓ | matches | OK |
| B18 | 66 | (no text-button typography) | MUI button label is `subtitle1`-default — but MUI `<Button>` default `variant="contained"` uses `text-button` (15/16px). Port doesn't specify text size — relies on PopUpButton's internal default. **Verify PopUpButton applies text-button-mobile sm:text-button.** | **Verify** |

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
          {item.icon /* h-[30px] w-[35px] text-[#009BF5] */}
        </div>
        <p className="font-heading text-small">{item.label}</p>
      </div>
    ))}
  </div>

  <div className="mt-9 flex justify-center">
    <PopUpButton
      text="Book a Demo"
      href="popup"
      userFormV1
      className="w-1/2 rounded-[10px] bg-white py-[1vh] font-heading text-button-mobile text-brand-500 shadow-[1px_4px_24px_0px_#38B6FFB2] transition-all duration-500 ease-in-out hover:scale-105 hover:bg-white sm:w-2/5 sm:text-button md:w-[30%] lg:w-[30%] lg:py-[10px]"
    />
  </div>
</div>
```

**Critical**: Replace lucide-react imports. Use MUI icons (`@mui/icons-material/Mic`, `@mui/icons-material/CalendarMonth`, etc.) if Tailwind side supports them; otherwise inline SVG.

## §4 Verification at 4 widths

- **375 (xs)**: 2-col grid, card `min-h-[120px]`, padding `pb-[5vh]`, button width 50% with `py-[1vh]`.
- **768 (sm)**: 2-col grid still (MUI breakpoint at 992px), card `min-h-[140px]`, button width 40%.
- **1280 (lg)**: **4-col grid** (Tailwind `min-[992px]:grid-cols-4` ✓), cards 80% width container, button width 30% with `py-[10px]`.
- **1920**: same as lg.

## §5 RTL notes

- `ArBenifitsSection.tsx` is essentially the same component with `dir="rtl"` parent. Tailwind layout (grid, centered text) is direction-agnostic.
- Card layout `flex-col items-center` does not change under RTL.
- Button shadow and gradient are direction-agnostic.
