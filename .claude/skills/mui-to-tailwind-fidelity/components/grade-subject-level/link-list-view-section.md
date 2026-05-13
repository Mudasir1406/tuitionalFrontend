# Component — `LinkListViewSection`

Long-tail SEO link block. Title + rich-text description + a 3-column (≥961px) / 2-column (601-960px) / 1-column (<601px) grid of subject links, each with an `ArrowCircleRight` icon and a label. Used at the bottom of grade-subject-level pages.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\link-list-view\LinkListViewSection.tsx` + `LinkListViewSection.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\link-list-view\LinkListViewSection.tsx` |

## §1 MUI source — extracted properties

### Layout tree

```
section .main (flex col, overflow-hidden, padding 0vh 5vw)
  Typography variant=headerTag .title (text-align start, fontSize clamp(1.5rem, 4vw, 2rem), lh 1.3, fw 600, my 0.5em)
  if hasParagraph:
    Typography variant=body2 .description div  (mt 1.5em mb 1.25em, fontSize clamp(1rem, 2.5vw, 1.125rem), lh 1.7, color #333, text-align left, word-break break-word)
      — :global(ul): pl 1.75rem (mobile 1.25rem); list-position outside; my 1em/1.25em
      — :global(li): mb 0.6em; lh 1.65
      — :global(h3): fontSize clamp(1.2rem, 3vw, 1.5rem), lh 1.35, fw 600, mt 1.5em mb 0.4em
  div .list (grid; cols 3 ≥961, 2 at 601-960, 1 <601; gap 0.5rem 1rem; my 1.5em)
    × N a.item (flex items-center; column-gap 10px; min-h 36px; cursor pointer; transition; radius 12px; p 10px 0)
      ArrowCircleRight (color #38b6ff)
      Typography variant=caption p (fontSize sx xs:0.9rem sm:1.4rem md:1.7rem) ls.name
```

### Dimensions & spacing

| Element | Property | Mobile | Tablet | Desktop |
|---|---|---|---|---|
| `.main` | padding | 0vh 5vw | 0vh 5vw | 0vh 5vw |
| `.title` | fontSize | clamp(1.5rem, 4vw, 2rem) | same | same |
| `.title` | line-height | 1.3 | | |
| `.title` | font-weight | 600 | | |
| `.title` | margin-bottom | 0.5em | | |
| `.title` | margin-top | 0.5em | | |
| `.title` | text-align | start | | |
| `.description` | fontSize | clamp(1rem, 2.5vw, 1.125rem) | same | same |
| `.description` | line-height | 1.7 | | |
| `.description` | color | `#333` | | |
| `.description` | margin-top | 1.5em | | |
| `.description` | margin-bottom | 1.25em | | |
| `.list` | grid-template-columns | 1fr (<600px) | 2 cols (601-960) | 3 cols (≥961) |
| `.list` | gap | 0.5rem 1rem (= row 8px col 16px) | | |
| `.list` | margin | 1.5em 0 | | |
| `.listNoParagraph` | margin-top | 0.5em (when no paragraph) | | |
| `.item` | column-gap | 10px | | |
| `.item` | min-height | 36px | | |
| `.item` | border-radius | 12px | | |
| `.item` | padding | 10px 0 | | |
| `.item` | transition | `transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease` | | |
| `.item:hover` | transform | translateY(-4px) | | |
| `.item` typography | fontSize | xs 0.9rem | sm 1.4rem | md 1.7rem |

### Typography
- Uses `clamp()` and overrides for fontSize directly in `.module.css` and inline `sx` — already pixel-perfect.
- Font: League Spartan via `leagueSpartan.className`.

### Colors

| MUI value | Tailwind |
|---|---|
| `#38b6ff` arrow | `text-brand-500` |
| `#333` desc | arbitrary `text-[#333]` |

### Animations

- Item hover lifts `translateY(-4px)` over 200ms.
- No CSS keyframes.

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 39 | `flex flex-col overflow-hidden px-[5vw] py-0` ✓ | matches | OK |
| B2 | 41 | title `text-start text-[clamp(1.5rem,4vw,2rem)] font-semibold leading-[1.3] mt-[2em] mb-[0.5em]` | MUI: mt `0.5em` (port has `2em`), mb `0.5em` ✓. Font weight 600 ✓ (`font-semibold`). | **High** — `mt-[2em]` is 4× MUI |
| B3 | 47-51 | desc `text-[clamp(1rem,2.5vw,1.125rem)] leading-[1.7] text-[#333] mt-[1.5em] mb-[1.25em] break-words` + child selectors for ul/li/h3 ✓ | matches MUI :global rules | OK |
| B4 | 56 | grid: `grid-cols-1 gap-x-4 gap-y-5 my-[1.5em] min-[601px]:grid-cols-2 min-[961px]:grid-cols-3` | MUI: `gap: 0.5rem 1rem` = row 8px col 16px. Port: `gap-x-4 gap-y-5` = col 16px ✓ but row 20px (MUI is 8px). | **Med** — row gap 12px too wide |
| B5 | 56 | `min-[601px]:grid-cols-2 min-[961px]:grid-cols-3` ✓ | matches MUI breakpoints 601/961 | OK |
| B6 | 61 | item `flex items-center gap-3 rounded-xl px-0 py-1` | MUI: `column-gap 10px` (port `gap-3` = 12px), `min-height 36px` (missing), `padding 10px 0` (port `py-1` = 4px). | **High** — padding & min-height wrong |
| B7 | 61 | `transition-transform duration-200 ease-out hover:-translate-y-1` | MUI hover `translateY(-4px)` ✓ (Tailwind `-translate-y-1` = -4px ✓) | OK |
| B8 | 61 | `focus-visible:ring-2 focus-visible:ring-[#38b6ff]` | nice-to-have not in MUI | OK (improvement) |
| B9 | 63 | `<ArrowCircleRightFilled>` inline SVG | matches MUI `<ArrowCircleRight>` (24×24). Port uses 25×25 — 1px off. | **Low** |
| B10 | 65 | label `text-[clamp(1rem,1.6vw,1.25rem)] font-medium leading-none translate-y-[12px]` | MUI: `fontSize sx xs:0.9rem sm:1.4rem md:1.7rem` (no clamp, three discrete values). Port's clamp range (1rem-1.25rem) is much smaller than MUI (0.9rem-1.7rem). Port also adds `translate-y-[12px]` (alignment hack) and `leading-none` — both not in MUI. | **High** — labels are smaller than MUI on tablet/desktop |

## §3 Corrected Tailwind classNames

```tsx
<section className="flex flex-col overflow-hidden px-[5vw]">
  <HeaderTag
    className="font-heading text-start text-[clamp(1.5rem,4vw,2rem)] font-semibold leading-[1.3] my-[0.5em] text-ink-900"
    dangerouslySetInnerHTML={{ __html: data?.header ?? "" }}
  />

  {hasParagraph && (
    <div
      className="font-heading text-start text-[clamp(1rem,2.5vw,1.125rem)] leading-[1.7] text-[#333] mt-[1.5em] mb-[1.25em] break-words
                 [&_ul]:list-outside [&_ul]:pl-[1.75rem] [&_ul]:mt-[1em] [&_ul]:mb-[1.25em]
                 max-[600px]:[&_ul]:pl-[1.25rem]
                 [&_li]:mb-[0.6em] [&_li]:leading-[1.65]
                 [&_h3]:text-[clamp(1.2rem,3vw,1.5rem)] [&_h3]:leading-[1.35] [&_h3]:font-semibold [&_h3]:mt-[1.5em] [&_h3]:mb-[0.4em]"
      dangerouslySetInnerHTML={{ __html: semanticParagraph! }}
    />
  )}

  <div className={cn(
    "grid grid-cols-1 gap-y-2 gap-x-4 my-[1.5em] min-[601px]:grid-cols-2 min-[961px]:grid-cols-3",
    !hasParagraph && "mt-[0.5em]"
  )}>
    {data?.subjects?.map((ls, i) => (
      <a key={i} href={ls.link}
        className="flex min-h-[36px] items-center gap-[10px] rounded-xl px-0 py-[10px] transition-transform duration-200 ease-out hover:-translate-y-1">
        <ArrowCircleRightFilled className="shrink-0 text-brand-500" />
        <p className="font-heading text-[0.9rem] font-medium text-ink-900 sm:text-[1.4rem] md:text-[1.7rem]"
          dangerouslySetInnerHTML={{ __html: ls.name }} />
      </a>
    ))}
  </div>
</section>
```

## §4 Verification at 4 widths

- **375**: 1-col grid; item padding 10px 0, min-h 36px; label 0.9rem.
- **768 (601-960 band)**: 2-col grid; label 1.4rem (sm:).
- **1280 (≥961)**: 3-col grid; label 1.7rem (md:).
- **1920**: same as 1280.

## §5 RTL notes

- `text-start` correctly logical → flips RTL ✓
- Grid is direction-agnostic.
- `gap-[10px]` between arrow and label — arrow stays on the start side automatically in RTL (`flex-row` default reverses with `dir`).
- `ArrowCircleRight` icon points right in MUI — in RTL it should logically point left. MUI auto-flips MaterialIcons that have `IconButton` directional metadata; the inline SVG in Tailwind port does NOT auto-flip. Consider conditional swap or `rtl:scale-x-[-1]` mirror.
