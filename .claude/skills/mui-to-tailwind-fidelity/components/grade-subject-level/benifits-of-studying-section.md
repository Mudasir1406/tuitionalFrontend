# Component — `BenifitsOfStudyingSection`

A 2-column block (1-col on mobile/tablet) where each column lists 3 expandable subject highlights. Used for "Benefits of Studying in Dubai" style content. Gradient fade background, first item open by default in each column.

(Spelling: "Benifits" + "Studying" — preserve.)

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\benifts-of-studying-section\BenifitsOfStudyingSection.tsx` + `.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\benifts-of-studying-section\BenifitsOfStudyingSection.tsx` |

## §1 MUI source — extracted properties

### Layout tree

```
div .main (gradient bg)
  Typography variant=headerTag .title             data.header (centered)
  div .sections                                   (flex; row at ≥992px, col below; column-gap 24px)
    div .eachSection                              (m 36px 0 / mobile 12px 0; flex 0.4 desktop, flex 1 mobile)
      Typography variant=subTextLeftTag||h4 .title  data.subTextLeft
      × 3 Grid item xs=12
        div .boxes (expanded) | .boxesWhite (collapsed)
          Box
            Typography subtitle2 p                box.name
            if expanded: Typography caption .mt1  box.paragraph
          Box onClick toggleBox
            Image minusIcon (h 5vh w 5vh)
    div .eachSection (right column, mirror)
      ...
```

### Dimensions & spacing

| Element | Property | Mobile (<576) | sm (576-767) | md (768-991) | lg (≥992) |
|---|---|---|---|---|---|
| `.main` | padding | **12px** | 16px | 24px | 0 24px |
| `.main` | bg | `linear-gradient(to bottom, white, #58b9f6)` | same | same | same |
| `.sections` | display | flex column | column | column | row |
| `.sections` | column-gap | n/a | n/a | n/a | 24px |
| `.eachSection` | margin | 12px 0 | (default 36px 0) | 36px 0 | 36px 0 |
| `.eachSection` | flex | 1 | 1 | 1 | 0.4 |
| `.title` (section heading) | text-align | center | center | center | center |
| `.title` | margin-bottom | 1vh | 1vh | 1vh | 1vh |
| `.boxes` (active) bg | | `#D3EFFF` | | | |
| `.boxesWhite` (collapsed) bg | | white | | | |
| `.boxes` / `.boxesWhite` | width | 90% | | | |
| `.boxes` / `.boxesWhite` | padding | 24px | | | |
| `.boxes` / `.boxesWhite` | display | flex row justify-between | | | |
| `.boxes` / `.boxesWhite` | border-radius | 2vh | | | |
| `.boxes` / `.boxesWhite` | margin-bottom | 16px | | | |
| `.boxes` / `.boxesWhite` | shadow | `inset 0px -5px 15px 0px rgba(56,182,255,0.2)` | | | |
| `.boxes` / `.boxesWhite` | backdrop-filter | blur(10px) | | | |
| `.boxes` / `.boxesWhite` | align-items | flex-start | | | |
| `.boxes` / `.boxesWhite` | transition | `background-color 0.3s ease` | | | |
| `.mt1` | margin-top | 1vh | | | |
| icon | w × h | 5vh × 5vh | | | |

### Typography

| Text | MUI variant | Sizes | Weight | Font |
|---|---|---|---|---|
| Outer heading | `data.headerTag` (h3 default) | h3 triplet | 700 | League Spartan |
| Column heading | `subTextLeftTag/subTextRightTag` (h4 default) | h4 triplet | 600 | League Spartan |
| Box title | `subtitle2` (text-stat-label, uppercase) | 0.875rem | 500 | League Spartan |
| Box paragraph | `caption` | 0.875rem | 400 | League Spartan |

### Colors

| MUI value | Tailwind |
|---|---|
| gradient white→#58b9f6 | `bg-benefit-fade` |
| `#D3EFFF` active | arbitrary `bg-[#D3EFFF]` |
| `inset shadow rgba(56,182,255,0.2)` | `shadow-benefit-box` |

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 56 | `self-center bg-benefit-fade px-3 sm:px-4 md:px-6` | MUI mobile padding 12px (px-3 ✓), sm 16px (px-4 ✓), md 24px (px-6 ✓). Lg keeps 0 24px (`px-6`) ✓. | OK |
| B2 | 58 | header `text-h3-mobile sm:text-h3-tablet lg:text-h3 mb-[1vh]` ✓ | matches | OK |
| B3 | 61 | sections `flex w-full flex-col justify-center min-[992px]:flex-row min-[992px]:gap-x-6` | matches MUI: column below 992, row at 992+, column-gap 24px (`gap-x-6`) ✓ | OK |
| B4 | 62 | left col `my-3 flex flex-col items-center min-[992px]:my-9 min-[992px]:flex-[0.4]` | MUI mobile margin `12px 0` (`my-3` ✓), desktop `36px 0` (`my-9` ✓), flex 0.4 ✓ | OK |
| B5 | 64 | column heading `text-h4-mobile sm:text-h4-tablet lg:text-h4 mb-[1vh]` ✓ | matches | OK |
| B6 | 39 | box title `text-small font-medium` | MUI variant=subtitle2 → `text-stat-label uppercase` (14px uppercase, font-medium). Port has `text-small` (14px ✓) + `font-medium` ✓ but **missing `uppercase`**. | **Med** |
| B7 | 41 | box paragraph `text-caption text-ink-700 mt-[1vh]` | MUI variant=caption → `text-small` (0.875rem). Port `text-caption` = 0.75rem per config. | **Med** — paragraph 2px small |
| B8 | 34 | box wrapper `mb-4 flex w-[90%] flex-row items-start justify-between rounded-[2vh] p-6 shadow-benefit-box transition-colors duration-300` | matches MUI: w 90% ✓, mb 16px (`mb-4`) ✓, p 24px (`p-6`) ✓, rounded 2vh ✓, shadow ✓, transition ✓ | OK |
| B9 | 35 | active bg `bg-[#D3EFFF]` / collapsed `bg-white` ✓ | matches | OK |
| B10 | 34 | (no `backdrop-blur-[10px]`) | MUI `backdrop-filter: blur(10px)` | **Low** — bg is opaque so blur is invisible |
| B11 | 50 | icon `h-[5vh] w-[5vh]` ✓ | matches | OK |
| B12 | 47 | toggle button `ml-3 shrink-0` | physical margin; in RTL should flip. Use `ms-3`. | **Low** — RTL improvement |

## §3 Corrected Tailwind classNames

```tsx
<div className="bg-benefit-fade px-3 sm:px-4 md:px-6">
  <HeaderTag
    className="mb-[1vh] text-center font-heading text-h3-mobile text-ink-900 sm:text-h3-tablet lg:text-h3"
    dangerouslySetInnerHTML={{ __html: data?.header ?? "" }}
  />
  <div className="flex w-full flex-col justify-center min-[992px]:flex-row min-[992px]:gap-x-6">
    {[/* left and right columns */].map(({ Tag, header, items, expandedState, toggle }) => (
      <div className="my-3 flex flex-col items-center min-[992px]:my-9 min-[992px]:flex-[0.4]">
        <Tag className="mb-[1vh] text-center font-heading text-h4-mobile text-ink-900 sm:text-h4-tablet lg:text-h4"
          dangerouslySetInnerHTML={{ __html: header }} />
        {items.map((box, index) => (
          <div key={index} className={cn(
            "mb-4 flex w-[90%] flex-row items-start justify-between rounded-[2vh] p-6 shadow-benefit-box backdrop-blur-[10px] transition-colors duration-300",
            expandedState[index] ? "bg-[#D3EFFF]" : "bg-white"
          )}>
            <div className="flex-1">
              <p className="font-heading text-stat-label uppercase text-ink-900">{box.name}</p>
              {expandedState[index] && <p className="mt-[1vh] font-body text-small text-ink-700">{box.paragraph}</p>}
            </div>
            <button type="button" onClick={() => toggle(index)} className="ms-3 shrink-0" aria-label={expandedState[index] ? "Collapse" : "Expand"}>
              <Image src={minusIcon} alt="" className="h-[5vh] w-[5vh]" />
            </button>
          </div>
        ))}
      </div>
    ))}
  </div>
</div>
```

## §4 Verification at 4 widths

- **375**: px-3 (12px); 1-col layout; box w-90% with rounded-2vh p-6.
- **768**: px-6 (24px MUI side at 768) — Tailwind `md:px-6` kicks in at 900 not 768. Adjust to `min-[768px]:px-6` if exactness matters.
- **1280**: row layout; columns flex-[0.4]; gap-x-6.
- **1920**: same as lg.

## §5 RTL notes

- Outer heading center-aligned → flips automatically ✓
- Section heading center ✓
- Box `flex-row justify-between` puts toggle on trailing end — auto-flips ✓
- Use `ms-3` for icon margin (logical) — port currently uses `ml-3` (physical).
