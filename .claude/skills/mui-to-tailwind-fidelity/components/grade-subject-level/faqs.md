# Component — `FrequentlyQuestions` (Faqs)

Q&A accordion with an h3-styled section title, supporting paragraph, and a list of expandable question/answer cards. First item is open by default; clicking another collapses the current and opens the new one.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\faqs.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\faqs.tsx` |

## §1 MUI source — extracted properties

### Layout tree

```
Box .contanier (mx lg:4vh xs:1vh)
  Box
    Typography variant=headerTag||h3 .frequently     (text-align center)
    Typography variant=body2 p .frequentlyDesc       (color #2D2D2D, text-center, w lg:55%, mx auto, p xs:2vh 0 / sm:2vh)
  Box .faqContanier (mx auto, maxW sm:100% md:80vw, px lg:2vh)
    Grid container spacing=1
      × N Grid item xs=12 sm=12 md=12 lg=12
        Box .question (bg active #9EDCFF / inactive #F3FBFF, radius 2vh, border 0.784px #EBEBEB, backdrop-blur 5px, p 3vh, mt xs:1vh md:3vh, w 100% min-w 300px box-border)
          Box .questionBox (flex justify-between items-center)
            Typography subtitle2 p .boxhed                       question text
            Box onClick handleToggle cursor:pointer
              Image upicon|downicon style.icon (4vh × 4vh)
          Collapse in=expanded===index
            Typography body2 p .boxdesc (w lg:100%, mt 2vh)      answer text
```

### Dimensions & spacing

| Element | Property | Value |
|---|---|---|
| `.contanier` | marginX | xs 1vh, lg 4vh |
| `.frequently` (title) | text-align | center |
| `.frequentlyDesc` | color | `#2D2D2D` |
| `.frequentlyDesc` | width | lg 55% |
| `.frequentlyDesc` | margin | 0 auto |
| `.frequentlyDesc` | padding | xs 2vh 0, sm 2vh |
| `.frequentlyDesc` | text-align | center |
| `.faqContanier` | mx | auto |
| `.faqContanier` | maxWidth | sm 100%, md 80vw |
| `.faqContanier` | paddingX | lg 2vh |
| Grid container | spacing | 1 (=8px) |
| Grid items | xs/sm/md/lg | 12 (always full-width) |
| `.question` | border-radius | 2vh |
| `.question` | border | `0.784px #EBEBEB` |
| `.question` | backdropFilter | blur(5px) |
| `.question` | padding | 3vh |
| `.question` | margin-top | xs 1vh, md 3vh |
| `.question` | width | 100% |
| `.question` | min-width | 300px |
| `.question` | box-sizing | border-box |
| `.question` bg active | | `#9EDCFF` |
| `.question` bg inactive | | `#F3FBFF` |
| `.questionBox` | display | flex space-between items-center |
| `.boxhed` | (typography variant subtitle2) | |
| `.boxdesc` | width | lg 100% |
| `.boxdesc` | margin-top | 2vh |
| `.icon` | height × width | 4vh × 4vh |

### Typography

| Text | MUI variant | Mobile | Tablet | Desktop | Weight | Font |
|---|---|---|---|---|---|---|
| Title | `headerTag` or `h3` | 1.125rem | 1.25rem | 1.5rem | 700 | League Spartan |
| Description | `body2` | 0.875rem | 0.875rem | 0.875rem | 400 | League Spartan |
| Question | `subtitle2` | 0.875rem (uppercase) | 0.875rem | 0.875rem | (default 500) | League Spartan |
| Answer | `body2` | 0.875rem | 0.875rem | 0.875rem | 400 | League Spartan |

### Colors

| MUI value | Tailwind |
|---|---|
| `#9EDCFF` (active) | arbitrary `bg-[#9EDCFF]` (close to `bg-brand-300` if available) |
| `#F3FBFF` (inactive) | arbitrary `bg-[#F3FBFF]` |
| `#2D2D2D` text | `text-ink-900` |
| `#EBEBEB` border | arbitrary `border-[#EBEBEB]` |

### Animations / interactions

- MUI `<Collapse>` uses `timeout="auto"` (~250ms based on content height).
- Click on toggle area swaps icon (down → up) and expands content.
- Backdrop-blur 5px applied to question cards.

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 21 | `mx-[1vh] lg:mx-[4vh]` | matches MUI `.contanier { mx xs:1vh, lg:4vh }` ✓ | OK |
| B2 | 23 | `text-h2-mobile sm:text-h2-tablet md:text-h2 lg:text-h2 font-semibold` | MUI variant defaults to `h3` → `text-h3-mobile sm:text-h3-tablet lg:text-h3` with weight 700. Port uses h2 sizes (1.375/1.75/2.25rem) AND adds `font-semibold` (600). **Wrong variant.** | **High** — title oversized |
| B3 | 27 | `text-[0.875rem] leading-[1.5] py-[2vh] sm:p-[2vh] lg:w-[55%]` | MUI body2 → `text-small` (=0.875rem) ✓. Padding: MUI is `xs: 2vh 0; sm: 2vh`. Port `py-[2vh] sm:p-[2vh]` ✓. Width `lg:w-[55%]` ✓. Color `text-[#2D2D2D]` = `text-ink-900` close enough. | OK |
| B4 | 27 | (no `mx-auto`) | MUI `margin: 0 auto` | **Med** — desc may not be centered when narrower than parent |
| B5 | 31 | `max-w-full md:max-w-[80vw]` ✓ + `lg:px-[2vh]` ✓ | matches | OK |
| B6 | 32 | `gap-2` (=8px) | matches MUI Grid `spacing={1}` (=8px) ✓ | OK |
| B7 | 39 | `mt-[3vh]` (always) | MUI `.question { marginTop: xs 1vh, md 3vh }`. Port forces 3vh on mobile. | **Med** — mobile spacing too wide |
| B8 | 39 | active `bg-brand-200` | MUI `#9EDCFF`. `brand-200` may not equal `#9EDCFF` exactly — check `tailwind.config.ts`. | **Verify** |
| B9 | 39 | inactive `bg-[#F3FBFF]` ✓ | matches | OK |
| B10 | 39 | `rounded-[2vh]` ✓ + `p-[3vh]` ✓ + `min-w-[300px]` ✓ + `backdrop-blur-[5px]` ✓ + `box-border` ✓ | matches | OK |
| B11 | 39 | (no border) | MUI `border: 0.784px solid #EBEBEB`. Port omits border. | **Low** — likely invisible on inactive bg but should be added |
| B12 | 45 | question text `m-0 font-heading font-medium uppercase tracking-[0.05em] text-[0.875rem] leading-[1.4]` | MUI variant=subtitle2 → `text-stat-label uppercase` (token expands to 14px uppercase, plus League Spartan). Port has `uppercase tracking-[0.05em]` ✓ but uses arbitrary `text-[0.875rem]` instead of `text-stat-label`. Equivalent value. | OK (cosmetic — prefer token) |
| B13 | 58 | icon `h-[4vh] w-[4vh]` ✓ | matches | OK |
| B14 | 62-68 | uses CSS grid trick `grid-rows-[0fr]` ↔ `grid-rows-[1fr]` with 300ms ease-in-out | MUI uses `<Collapse timeout="auto">` (~250ms based on content). Close enough; behavior matches conceptually. | OK |
| B15 | 70 | answer `m-0 mt-[2vh] text-[0.875rem]` | matches MUI `.boxdesc { mt: 2vh }` + body2 token ✓ | OK |

## §3 Corrected Tailwind classNames

```tsx
<div className="mx-[1vh] lg:mx-[4vh]">
  <HeaderTag
    className="text-center font-heading text-h3-mobile text-ink-900 sm:text-h3-tablet lg:text-h3"
    dangerouslySetInnerHTML={{ __html: data?.header ?? "" }}
  />
  <div
    className="mx-auto py-[2vh] text-center font-body text-small text-ink-900 sm:p-[2vh] lg:w-[55%]"
    dangerouslySetInnerHTML={{ __html: data?.paragraph ?? "" }}
  />

  <div className="mx-auto w-full max-w-full md:max-w-[80vw] lg:px-[2vh]">
    <div className="flex flex-col gap-2">
      {data?.faqs.map((item, index) => {
        const isOpen = expanded === index;
        return (
          <div
            key={index}
            className={cn(
              "box-border w-full min-w-[300px] rounded-[2vh] border border-[#EBEBEB] p-[3vh] backdrop-blur-[5px] transition-colors mt-[1vh] md:mt-[3vh]",
              isOpen ? "bg-[#9EDCFF]" : "bg-[#F3FBFF]",
            )}
          >
            <div className="flex items-center justify-between">
              <p className="m-0 font-heading text-stat-label uppercase text-ink-900"
                dangerouslySetInnerHTML={{ __html: item?.question }} />
              <button type="button" onClick={() => setExpanded(isOpen ? 0 : index)} className="cursor-pointer shrink-0" aria-label="Toggle answer" aria-expanded={isOpen}>
                <Image src={isOpen ? upicon : downicon} alt="" className="h-[4vh] w-[4vh]" />
              </button>
            </div>
            <div className={cn("grid transition-[grid-template-rows] duration-300 ease-in-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
              <div className="overflow-hidden">
                <p className="m-0 mt-[2vh] font-body text-small text-ink-700"
                  dangerouslySetInnerHTML={{ __html: item?.answer }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</div>
```

## §4 Verification at 4 widths

- **375**: title h3-mobile (18px) center, desc 14px center; question card mt-[1vh]; active card `#9EDCFF`.
- **768**: title h3-tablet (20px); card mt-[3vh].
- **1280**: title h3 (24px); FAQ container max-w 80vw; desc width 55% centered.
- **1920**: same as lg.

## §5 RTL notes

- Title/desc center-aligned → direction-agnostic.
- Question card `flex justify-between` → toggle icon stays on trailing end (right LTR / left RTL) automatically.
- `mx-auto` and arbitrary `vh` values are direction-agnostic.
- Question/answer text inherits `dir` from parent.
