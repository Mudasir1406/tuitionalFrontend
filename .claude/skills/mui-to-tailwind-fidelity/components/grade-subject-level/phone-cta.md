# Component — `PhoneCta`

A centered "Call/Book Now" callout: section title + supporting paragraph + a single primary action button (no actual phone input — the form input is commented out in MUI source).

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\phone-cta.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\phone-cta.tsx` |
| Arabic variant | `ar-phone-cta.tsx` (Tailwind side) |

## §1 MUI source — extracted properties

### Layout tree

```
Box .contanier  (flex justify-center items-center; margin xs/sm:2vh 3vw / lg:0)
  Box .inner   (w 100% max-w 145vh, text-center)
    Typography variant=headerTag .finding   (text-align center)  data.header
    Typography variant=body2 .description   (text-align center, padding xs:1.5vh 0 / lg:2vh 0, color #2D2D2D)  data.paragraph
    PopUpButton .button                     (bg #38B6FF, color #FFF, w xs:80% sm:60% md:50% lg:40%, p xs:12px 16px / sm:14px 20px / lg:16px 24px, fontSize xs:0.875rem sm:1rem lg:1.1rem, radius 14px, lineHeight 1.4, shadow `0px -5px 15px 0px rgba(0,0,0,0.20) inset`)
```

### Dimensions & spacing

| Element | Property | Mobile | Tablet (sm) | md | Desktop (lg) |
|---|---|---|---|---|---|
| outer container | margin | 2vh 3vw | 2vh 3vw | inherit | 0 |
| inner | max-width | 145vh | 145vh | 145vh | 145vh |
| inner | text-align | center | center | center | center |
| desc | padding | 1.5vh 0 | 1.5vh 0 | 1.5vh 0 | 2vh 0 |
| desc | color | `#2D2D2D` | | | |
| button | width | 80% | 60% | 50% | 40% |
| button | padding | 12px 16px | 14px 20px | 14px 20px | 16px 24px |
| button | fontSize | 0.875rem | 1rem | 1rem | 1.1rem |
| button | bg / color | #38B6FF / white | | | |
| button | borderRadius | 14px | | | |
| button | line-height | 1.4 | | | |
| button | shadow | `0px -5px 15px 0px rgba(0,0,0,0.20) inset` | | | |

### Typography

| Text | MUI variant | Mobile | Tablet | Desktop | Weight | Font |
|---|---|---|---|---|---|---|
| Heading | `data.headerTag` (default h3) | 1.125rem | 1.25rem | 1.5rem | 700 | League Spartan |
| Description | `body2` | 0.875rem | 0.875rem | 0.875rem | 400 | League Spartan |
| Button | inline `fontSize: xs 0.875 sm 1 lg 1.1rem` | varies | varies | varies | default | League Spartan |

### Colors

| MUI value | Tailwind |
|---|---|
| `#38B6FF` button bg | `bg-brand-500` |
| `#2D2D2D` desc text | `text-ink-900` |

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 24 | `mx-[3vw] my-[2vh] flex items-center justify-center sm:mx-[3vw] sm:my-[2vh] lg:m-0` | matches MUI `.contanier { margin xs/sm: 2vh 3vw; lg: 0 }`. Duplicate `sm:` prefixes redundant. ✓ | OK |
| B2 | 25 | `w-full max-w-[145vh] text-center` ✓ | matches `.inner` | OK |
| B3 | 27 | `text-h3-mobile sm:text-h3-tablet lg:text-h3 text-ink-900` | matches default h3 variant ✓; if `headerTag` is `h2` then port still renders h3 sizes. | **Med** — variant-driven sizing missing |
| B4 | 31 | desc `text-body-mobile sm:text-body text-ink-900` | MUI variant=body2 → `text-small` (0.875rem). Port uses `text-body` (1rem on desktop). | **Med** — desc too large |
| B5 | 31 | `py-[1.5vh] lg:py-[2vh]` ✓ | matches `.description.padding` ✓ | OK |
| B6 | 31 | `text-ink-900` | MUI `color: #2D2D2D` = `text-ink-900` ✓ | OK |
| B7 | 38 | button: `w-4/5 sm:w-3/5 md:w-1/2 lg:w-2/5` | matches MUI w `xs:80% sm:60% md:50% lg:40%` ✓ | OK |
| B8 | 38 | button padding `p-[12px_16px] sm:p-[14px_20px] lg:p-[16px_24px]` | matches ✓ | OK |
| B9 | 38 | button fontSize `text-[0.875rem] sm:text-[1rem] lg:text-[1.1rem]` | matches ✓ | OK |
| B10 | 38 | button `rounded-[14px] bg-brand-500 leading-[1.4] shadow-[0px_-5px_15px_0px_rgba(0,0,0,0.20)_inset]` | matches ✓ | OK |
| B11 | 38 | (no `text-white` color override needed — bg-brand-500 implies) | actually `text-white` IS present ✓ | OK |

## §3 Corrected Tailwind classNames

```tsx
<div className="m-0 flex items-center justify-center mx-[3vw] my-[2vh] lg:m-0">
  <div className="w-full max-w-[145vh] text-center">
    <HeaderTag
      className="text-center font-heading text-h3-mobile text-ink-900 sm:text-h3-tablet lg:text-h3"
      dangerouslySetInnerHTML={{ __html: data?.header ?? "" }}
    />
    <div
      className="py-[1.5vh] text-center font-body text-small text-ink-900 lg:py-[2vh]"
      dangerouslySetInnerHTML={{ __html: data?.paragraph ?? "" }}
    />
    <PopUpButton
      href={data.link}
      text={data?.buttonText}
      values={formData}
      className="mx-auto h-auto w-4/5 rounded-[14px] bg-brand-500 p-[12px_16px] text-[0.875rem] leading-[1.4] text-white shadow-[0px_-5px_15px_0px_rgba(0,0,0,0.20)_inset] hover:bg-brand-500 sm:w-3/5 sm:p-[14px_20px] sm:text-[1rem] md:w-1/2 lg:w-2/5 lg:p-[16px_24px] lg:text-[1.1rem]"
    />
  </div>
</div>
```

## §4 Verification at 4 widths

- **375**: title h3-mobile center; desc 14px center; button w-4/5 (80%) with `text-[0.875rem]` and `p-[12px_16px]`.
- **768**: title h3-tablet; desc 14px; button w-3/5 (60%).
- **1280**: title h3; desc 14px; button w-2/5 (40%) with `p-[16px_24px]` and `text-[1.1rem]`.
- **1920**: same as lg.

## §5 RTL notes

- All content is `text-center`; mx-based margins are direction-agnostic.
- Button `mx-auto` (added in corrected version) keeps it centered in both directions.
- `ar-phone-cta.tsx` (Tailwind side) likely just substitutes translated content; no layout flip needed.
