# Component — `DemoPointers`

Two-column "Demo Pointers" block: left = title + tutoring image + CTA; right = accordion of N expandable points. First item open by default.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\demo-pointers.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\demo-pointers.tsx` |

## §1 MUI source — extracted properties

### Layout tree

```
Box .contanier (mx xs:3vw / lg:5vw)
  Grid container spacing xs:0 sm:0 md:2 lg:2
    Grid item xs=12 sm=12 md=12 lg=6  (mb xs/sm/md:2 = 16px)
      Box .imgDiv
        Typography variant=headerTag .tutorheading  (w xs:auto, text-align xs:center sm/lg:left)
        Box .imageContanier (text-align xs:center sm:left)
          Image tutors style.image (w 80%, h 100%)
        PopUpButton .containButton (bg #38B6FF, color #FFF, w xs:80% sm:50% md:50% lg:60%, p xs:10px 16px / sm:12px 20px / lg:14px 24px, radius 2vh, mt 2vh, mb xs:3vh lg:0, mx auto, shadow `1px 15px 34px 0px rgba(56,182,255,0.4)`)
    Grid item xs=12 lg=6
      Grid container spacing xs:0 sm:2 md:2 lg:2
        × N Accordion (bg #D3EFFF, radius 12px, shadow `0px -5px 15px 0px rgba(56,182,255,0.2) inset`, mb 16px, minH 72px)
          AccordionSummary (minH 72px, expandIcon=Box 32×32 bg #30AFFF round; Add/Remove icons white)
            Typography subtitle2 p (League Spartan)  box.header
          AccordionDetails
            Typography body2 p animation `fadeIn 0.3s`  box.body
```

### Dimensions & spacing

| Element | Property | Mobile | Tablet | Desktop |
|---|---|---|---|---|
| outer | mx | 3vw | 3vw | 5vw |
| Grid container outer | spacing | 0 | 0 | 16px (md=2) | 16px (lg=2) |
| left Grid item | mb | 16px (xs/sm/md=2) | 16px | 16px on md, lg has no override (=0) |
| title | text-align | center | left | left |
| image | width / height | 80% / 100% | same | same |
| image container | text-align | center | left | left |
| right Grid inner | spacing | 0 | 16px | 16px | 16px |
| Accordion | bg | #D3EFFF | | |
| Accordion | borderRadius | 12px | | |
| Accordion | shadow | `0px -5px 15px 0px rgba(56,182,255,0.2) inset` | | |
| Accordion | mb | 16px | | |
| Accordion | minHeight | 72px | | |
| AccordionSummary | minHeight | 72px | | |
| AccordionSummary content | margin | 12px 0 | | |
| expand icon Box | w × h | 32 × 32 | | |
| expand icon Box | bg | `#30AFFF` | | |
| expand icon Box | radius | 50% | | |
| Add/Remove icon | color | white | | |
| CTA button | bg | #38B6FF | | |
| CTA button | color | white | | |
| CTA button | width | 80% | 50% | 50%/60% (md/lg) |
| CTA button | padding | 10px 16px | 12px 20px | 14px 24px |
| CTA button | radius | 2vh | | |
| CTA button | margin | mt 2vh, mb xs:3vh lg:0, mx auto | | |
| CTA button | shadow | `1px 15px 34px 0px rgba(56,182,255,0.4)` | | |
| CTA button | line-height | 1.4 | | |

### Typography

| Text | MUI variant | Mobile | Tablet | Desktop | Font |
|---|---|---|---|---|---|
| Heading | `data.headerTag` (h2/h3/h4) | per variant | per variant | per variant | League Spartan |
| Accordion title | `subtitle2` | 0.875rem | same | same | League Spartan (text-stat-label) |
| Accordion body | `body2` | 0.875rem | same | same | League Spartan |
| Button | inline | default MUI Button (with `lineHeight: 1.4`) | same | same | League Spartan |

### Animations / interactions

- Accordion uses MUI's default expand animation (~250ms).
- Accordion details typography has `animation: "fadeIn 0.3s ease-in-out"`.
- Expand icon switches Add (+) / Remove (−) based on `expandedIndex`.

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 20 | `mx-[3vw] lg:mx-[5vw]` ✓ | matches | OK |
| B2 | 21 | `grid grid-cols-1 gap-0 md:gap-4 lg:grid-cols-2` | MUI Grid: outer spacing `md:2 lg:2`. Port `md:gap-4` (=16px) ✓, `lg:grid-cols-2` ✓. Mobile `gap-0` matches xs/sm spacing 0 ✓. | OK |
| B3 | 22 | `mb-4 sm:mb-4 md:mb-4` | MUI left grid item mb `xs/sm/md: 2` (=16px). Port has `mb-4 sm:mb-4 md:mb-4` ✓ but should drop the duplicate prefix → `mb-4` would suffice (mb-4 only on <lg). Need `lg:mb-0`. | **Low** — works but verbose |
| B4 | 24 | `text-h3-mobile sm:text-h3-tablet lg:text-h3` hardcoded | MUI uses `data.headerTag` variant (default h3). If `headerTag === "h2"`, port still renders h3 sizes. | **Med** — variant-driven sizing missing |
| B5 | 24 | `text-center sm:text-start` ✓ | matches MUI title text-align `xs:center sm/lg:left` | OK |
| B6 | 27-35 | image wrapper `text-center sm:text-start` ✓, image `h-full w-4/5` ✓ | matches | OK |
| B7 | 39 | button `mx-auto mb-[3vh] mt-[2vh] w-4/5 ... p-[10px_16px] sm:w-1/2 sm:p-[12px_20px] md:w-1/2 lg:mb-0 lg:w-3/5 lg:p-[14px_24px] rounded-[2vh] bg-brand-500 ... shadow-[1px_15px_34px_0px_rgba(56,182,255,0.4)] leading-[1.4]` | MUI: w `xs:80% sm:50% md:50% lg:60%`. Port: `w-4/5` (=80%) ✓, `sm:w-1/2` (=50%) ✓, `md:w-1/2` (=50%) ✓, `lg:w-3/5` (=60%) ✓. Margins ✓. Padding ✓. Shadow ✓. Line-height ✓. | OK |
| B8 | 43 | `flex flex-col gap-4` | MUI right Grid inner: spacing `xs:0 sm/md/lg:2` — port `gap-4` (=16px) always, MUI is 0 on mobile. Plus MUI `mb-16px` per Accordion gives same visual effect since `mb: 16px` provides spacing. | **Low** — actually works because of Accordion mb |
| B9 | 47 | Disclosure wrapper `rounded-xl bg-[#D3EFFF] shadow-[0px_-5px_15px_0px_rgba(56,182,255,0.2)_inset]` | MUI Accordion: `borderRadius: 12px`, bg ✓, shadow ✓. Tailwind `rounded-xl` = 24px (per config), but MUI 12px. Should be `rounded-[12px]`. | **Med** — corners too round |
| B10 | 47 | (no `min-h-[72px]` on wrapper) | MUI `minHeight: 72px` | **Med** |
| B11 | 48 | DisclosureButton `flex w-full items-center justify-between px-4 py-3` | MUI AccordionSummary `minHeight: 72px; content margin: 12px 0`. Port `px-4 py-3` is 16px/12px — vertical insufficient for min-height 72px without additional content height. | **Med** |
| B12 | 50 | title `text-start font-heading text-h6 font-semibold text-ink-900` | MUI variant=subtitle2 → `text-stat-label uppercase`. Port uses `text-h6` (1rem) `font-semibold` — no uppercase. MUI subtitle2 IS rendered uppercase via the theme. **Verify.** | **High** — title typography wrong (no uppercase, wrong size/weight) |
| B13 | 53 | expand icon container `h-8 w-8 rounded-full bg-[#30AFFF]` ✓ | matches MUI `width: 32, height: 32, bg #30AFFF, radius 50%` ✓ | OK |
| B14 | 55-57 | Plus/Minus from `lucide-react` size 18 | MUI uses `AddOutlinedIcon`/`RemoveOutlinedIcon` (default 24px) color white. Lucide is a NEW DEPENDENCY. Also size is 18 vs MUI default 24. | **Critical** — lucide dep + wrong size |
| B15 | 61 | DisclosurePanel `px-4 pb-3` | MUI AccordionDetails default padding (8px 16px 16px). Close but not exact. | **Low** |
| B16 | 63 | body `font-heading text-small text-ink-700` | matches MUI body2 → `text-small` ✓, font ✓. No fade animation port-side. | **Low** — missing fade-in (cosmetic) |
| B17 | 45 | Uses `@headlessui/react` Disclosure | NEW DEPENDENCY — `@headlessui/react` is not in the approved stack. | **Critical** — verify dep is approved |

## §3 Corrected Tailwind classNames

```tsx
<div className="mx-[3vw] lg:mx-[5vw]">
  <div className="grid grid-cols-1 gap-0 md:gap-4 lg:grid-cols-2">
    <div className="mb-4 lg:mb-0">
      <HeaderTag
        className="text-center font-heading text-h3-mobile text-ink-900 sm:text-start sm:text-h3-tablet lg:text-h3"
        dangerouslySetInnerHTML={{ __html: data?.header ?? "" }}
      />
      <div className="text-center sm:text-start">
        <Image src={tutors.src} alt="" width={tutors.width} height={tutors.height} className="h-full w-4/5" />
      </div>
      <PopUpButton ... className="... (current ✓)" />
    </div>

    <div className="flex flex-col gap-4">
      {data?.demoPointersData?.map((box, index) => (
        <Disclosure key={index} defaultOpen={index === 0}>
          {({ open }) => (
            <div className="min-h-[72px] rounded-[12px] bg-[#D3EFFF] shadow-[0px_-5px_15px_0px_rgba(56,182,255,0.2)_inset]">
              <DisclosureButton className="flex min-h-[72px] w-full items-center justify-between px-4 py-3">
                <p className="text-start font-heading text-stat-label uppercase text-ink-900"
                  dangerouslySetInnerHTML={{ __html: box.header }} />
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#30AFFF]">
                  {/* Replace lucide with MUI icon or inline SVG: */}
                  {open ? <span className="text-white text-[24px] leading-none">−</span> : <span className="text-white text-[24px] leading-none">+</span>}
                </div>
              </DisclosureButton>
              <DisclosurePanel className="px-4 pb-3">
                <p className="font-body text-small text-ink-700"
                  dangerouslySetInnerHTML={{ __html: box.body }} />
              </DisclosurePanel>
            </div>
          )}
        </Disclosure>
      ))}
    </div>
  </div>
</div>
```

## §4 Verification at 4 widths

- **375**: 1 col grid; title center text-h3-mobile; image center 80%; button w-4/5; accordion stack with min-h 72px.
- **768**: 1 col still (md/lg=2); title left text-h3-tablet; button w-1/2.
- **1280**: 2 cols (lg=2); title left text-h3; button w-3/5.
- **1920**: same as lg.

## §5 RTL notes

- Title `sm:text-start` flips correctly ✓
- Image container `sm:text-start` flips ✓
- Accordion summary `justify-between` puts expand icon on the trailing side — auto-flips ✓
- Button `mx-auto` is direction-agnostic ✓
- No physical positioning issues.
