# Component — `BlogCta`

A "Subscribe to our blog" CTA block: section title (left-aligned), description paragraph, primary button on the right (desktop) or below (mobile), plus two decorative `elpse-white*.svg` shapes positioned absolute on the right edge at lg+.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\blog-cta.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\blog-cta.tsx` |

## §1 MUI source — extracted properties

### Layout tree

```
Box (outer)  paddingX 5vw, marginY 10vh
  Typography variant=headerTag .reviewheading      data.header (w xs:100% sm:90% lg:70vw; h lg:10vh; text-align xs/sm/lg:left)
  Box (row container)  flex; flexDirection xs:column lg:row; justify-between; items-center; gap xs:2vh lg:0
    Typography variant=body2 .reviewdeesc          (p xs:2vh 0 / lg:8vh 0 5vh 0; w xs:100% lg:55vw; text-align xs:justify lg:left)
    Box
      PopUpButton .containedBtn                    (bg #38B6FF, fontSize 2vh, fontWeight 700, paddingY 1.5vh, paddingX 4vh, margin xs:3vh 0 sm:2vh 0 lg:5vh 20vh 0 0, width xs/sm/md:100% lg:auto, radius 10px, shadow `1px 4px 24px 0px #38B6FFB2`)
  Box (decoration 1) absolute right:20 top:20; display xs:none lg:block
    Image elpse1
  Box (decoration 2) absolute right:0; display xs:none lg:block
    Image elpse2 style.height 14vh
```

### Dimensions & spacing

| Element | Property | Mobile | Tablet (sm) | Desktop (lg) |
|---|---|---|---|---|
| outer | paddingX | 5vw | 5vw | 5vw |
| outer | marginY | 10vh | 10vh | 10vh |
| outer | position | (default — but decoration is absolute, so outer should be relative) — MUI does NOT set position relative, which means decorations attach to nearest positioned ancestor. Likely deliberate (top-level page). | | |
| heading | width | 100% | 90% | 70vw |
| heading | height | — | — | 10vh |
| heading | text-align | left | left | left |
| row container | flex direction | column | (inherit column from xs) | row |
| row container | gap | 2vh | (inherit) | 0 |
| description | padding | 2vh 0 | 2vh 0 | 8vh 0 5vh 0 |
| description | width | 100% | 100% | 55vw |
| description | text-align | justify | justify | left |
| button | bg | `#38B6FF` | same | same |
| button | fontSize | 2vh | same | same |
| button | fontWeight | 700 | same | same |
| button | paddingY | 1.5vh | same | same |
| button | paddingX | 4vh | same | same |
| button | margin | 3vh 0 | 2vh 0 | 5vh 20vh 0 0 (mt 5vh, mr 20vh, mb 0, ml 0) |
| button | width | 100% | 100% | auto |
| button | borderRadius | 10px | 10px | 10px |
| button | shadow | `1px 4px 24px 0px #38B6FFB2` | same | same |
| decoration 1 | position | (hidden xs/sm) | (hidden) | absolute right:20 top:20 |
| decoration 2 | position | (hidden) | (hidden) | absolute right:0; height 14vh |

### Typography

| Text | MUI variant | Notes |
|---|---|---|
| Heading | `data.headerTag` (h2/h3/h4) | League Spartan, weight 700 (h2/h3) or 600 (h4) |
| Description | `body2` | 0.875rem (`text-small`) |
| Button | inline `fontSize: 2vh, fontWeight: 700` (overrides MUI button defaults) | uses `text-[2vh] font-bold` |

### Colors

| MUI value | Tailwind |
|---|---|
| `#38B6FF` button bg | `bg-brand-500` |
| `#38B6FFB2` shadow | arbitrary |

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 13 | `relative my-[10vh] px-[5vw]` | matches; port adds `relative` which MUI omits — but decorations rely on a positioned ancestor, so adding `relative` is **correct** and an improvement. | OK (intentional fix) |
| B2 | 15 | `text-h3-mobile sm:text-h3-tablet lg:text-h2` | MUI uses `data.headerTag` (default h3). Port forces `lg:text-h2` regardless of headerTag. If `headerTag === "h2"` then `lg:text-h2` matches; if `headerTag === "h3"` then it diverges. | **Med** — desktop size hardcoded vs variant-driven |
| B3 | 15 | `text-start sm:text-start (implicit via text-start) lg:text-start` ✓ | matches (always left/start) | OK |
| B4 | 15 | `lg:h-[10vh] lg:w-[70vw]` ✓, mobile `w-full` ✓, sm `w-[90%]` ✓ | matches | OK |
| B5 | 18 | `flex flex-col items-center justify-between gap-[2vh] lg:flex-row lg:gap-0` | matches MUI | OK |
| B6 | 20 | desc `text-body-mobile lg:text-body text-ink-700` | MUI body2 → `text-small` (0.875rem all breakpoints). Port uses body (1rem mobile/desktop). | **Med** — desc text too large |
| B7 | 20 | `text-justify lg:text-start` ✓ | matches | OK |
| B8 | 20 | `py-[2vh] lg:py-[8vh] lg:pb-[5vh]` | MUI `padding: xs 2vh 0 / lg 8vh 0 5vh 0`. Port `lg:py-[8vh]` sets pt=pb=8vh then `lg:pb-[5vh]` overrides → pt 8vh / pb 5vh ✓ | OK |
| B9 | 20 | `lg:w-[55vw]` ✓ | matches | OK |
| B10 | 27 | button: `my-[3vh] ... sm:my-[2vh] lg:mb-0 lg:me-[20vh] lg:ms-0 lg:mt-[5vh]` | MUI margin: xs `3vh 0` (= my-[3vh]), sm `2vh 0` (= my-[2vh] ✓), lg `5vh 20vh 0 0` = mt:5vh mr:20vh mb:0 ml:0. Tailwind logical `me-[20vh]` flips correctly in RTL ✓. **`lg:mb-0` is correct.** | OK |
| B11 | 27 | button: `w-full ... lg:w-auto` ✓ | matches | OK |
| B12 | 27 | button: `px-[4vh] py-[1.5vh] text-[2vh] font-bold text-white rounded-[10px] bg-brand-500 shadow-[1px_4px_24px_0px_#38B6FFB2]` ✓ | matches | OK |
| B13 | 33 | decoration `right-5 top-5 hidden lg:block` | MUI `right: 20, top: 20`. Tailwind `right-5` = 20px ✓, `top-5` = 20px ✓ | OK |
| B14 | 33 | `right-5` is physical — does NOT flip in RTL | MUI `right: 20` also doesn't flip. Both static — but for RTL the decoration should be on the start side. Consider `end-5 top-5`. | **Low** — RTL improvement |
| B15 | 36 | second decoration `right-0 hidden lg:block h-[14vh]` ✓ | matches MUI `right: 0; height: 14vh` ✓ | OK |
| B16 | 32 | (no `top` on second decoration in port) | MUI `position: absolute; right: 0` (no top) — auto-positions at top of container. Port has no `top` ✓ | OK |

## §3 Corrected Tailwind classNames

```tsx
<div className="relative my-[10vh] px-[5vw]">
  <HeaderTag
    className={cn(
      "w-full text-start font-heading text-ink-900 sm:w-[90%] lg:h-[10vh] lg:w-[70vw]",
      // Variant-driven sizing (heading defaults to h3):
      "text-h3-mobile sm:text-h3-tablet lg:text-h3",
      // If headerTag === "h2", caller should pass an override or use a switch in component
    )}
    dangerouslySetInnerHTML={{ __html: data?.header ?? "" }}
  />
  <div className="flex flex-col items-center justify-between gap-[2vh] lg:flex-row lg:gap-0">
    <div
      className="w-full py-[2vh] text-justify font-body text-small text-ink-700 lg:w-[55vw] lg:py-[8vh] lg:pb-[5vh] lg:text-start"
      dangerouslySetInnerHTML={{ __html: data?.paragraph ?? "" }}
    />
    <div>
      <PopUpButton
        href={data.link}
        text={data.buttonText}
        className="my-[3vh] w-full rounded-[10px] bg-brand-500 px-[4vh] py-[1.5vh] text-[2vh] font-bold text-white shadow-[1px_4px_24px_0px_#38B6FFB2] hover:bg-brand-500 sm:my-[2vh] lg:mb-0 lg:me-[20vh] lg:ms-0 lg:mt-[5vh] lg:w-auto"
      />
    </div>
  </div>
  <div className="absolute end-5 top-5 hidden lg:block">
    <Image src={elpse1} alt="" aria-hidden="true" />
  </div>
  <div className="absolute end-0 hidden lg:block">
    <Image src={elpse2} alt="" aria-hidden="true" className="h-[14vh]" />
  </div>
</div>
```

## §4 Verification at 4 widths

- **375**: heading text-h3-mobile (18px), w-full, text-start; desc text-small (14px) text-justify w-full; button w-full mb 3vh; decorations hidden.
- **768**: heading text-h3-tablet (20px), w-90%; desc text-small text-justify; button w-full my-[2vh]; decorations hidden.
- **1280**: heading text-h3 (24px), w-70vw, h-10vh, left; desc text-small left, w-55vw, py-[8vh]/pb-[5vh]; button auto width with `me-[20vh] mt-[5vh]`; decorations visible (right 20 top 20 + right 0 h 14vh).
- **1920**: same as lg.

## §5 RTL notes

- Heading `text-start` flips correctly ✓
- Desc `lg:text-start` flips correctly ✓ (mobile `text-justify` is direction-agnostic).
- Button `me-[20vh] ms-0` flips correctly ✓
- Decoration positions: physical `right-X` does NOT flip; should be `end-X` (logical) for proper RTL mirroring. Current port uses physical positioning.
- Test in Arabic to confirm `end-5 top-5` / `end-0` move decorations to the LEFT edge.
