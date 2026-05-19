# Component — `TopTalent` (careers)

Two-column "Why Top Talent chooses Tuitional" section: image left (`careerTalent.png`, 90% width, ~75% height) and copy block right (h2 with accent "Tuitional", long body description, "Get in touch" CTA). Switches between stacked (xs/sm) and side-by-side at **md** (900px+) — `Grid item xs={12} md={7} / md={5}`.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\careers\top-talent.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\careers\top-talent.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\careers\ar-top-talent.tsx` |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Grid container rowSpacing={4}>                        // 32px row gap between cells
├── <Grid item xs={12} md={7}>                          // LEFT — image
│   └── <Box (h:{xs:'80%', md:'75%'}, w:100%, flex, justify:center, relative, mt:{xs:70, sm/md/lg:60})>
│       └── <Image careerTalent style={{height:auto, width:"90%"}}>
└── <Grid item xs={12} md={5}>                          // RIGHT — copy + CTA
    └── <Box>
        ├── <Typography component="h3" variant="h2" styles.heading>
        │   "Why Top Talent <br/> chooses <span styles.expertText>Tuitional</span>"
        ├── <Typography component="p" variant="body2" styles.desc>  (long body)
        └── <Box (flex row, items center, justify {xs:center, md:left}, mt:40px)>
            └── <Button variant="contained" styles.containedBtn> "Get in touch"
```

### Dimensions & spacing

#### `<Grid container rowSpacing={4}>`
| Property | All |
|---|---|
| `rowSpacing` | `4` → `32px` row gap |
| `columnSpacing` | (none, defaults to 0) |

#### LEFT image wrapper `<Box>`
| Property | Mobile (xs) | sm | md | lg |
|---|---|---|---|---|
| `height` | `80%` (xs) | `80%` (inherits) | `75%` | `75%` (inherits md) |
| `width` | `100%` | same | same | same |
| `display`/`justify`/`position` | `flex / center / relative` | same | same | same |
| `marginTop` | `70px` | `60px` | `60px` | `60px` |

Image inline: `style={{ height: "auto", width: "90%" }}` — fixed 90% width, no responsive change.

#### RIGHT content `<Box>` → `.heading` (h3 with `variant="h2"`)
| Property | xs | sm | md | lg |
|---|---|---|---|---|
| `color` | `#000000` | same | same | same |
| `textAlign` | `center` | `center` | `left` | `left` |
| `marginTop` | `0px` | `0px` | `95px` | `105px` |
| `position` | `relative` | same | same | same |
| `paddingX` | `20px` | `20px` | `20px` | `20px` |
| `::before` lines `top` (px) | `-20` | `-40` | `-30` | `-50` |
| `::before` lines `left` (px) | — | — | `-30` | `-30` |
| `::before` lines bg | `linesMobile` | `linesInvert` | `linesInvert` | `linesInvert` |
| `::before` lines `height`/`width` | `35px`/`43px` (constant) | same | same | same |
| `::before` `zIndex` | `10` | same | same | same |
| `::before` `marginBottom` | `20px` | same | same | same |

#### `.expertText` (accent "Tuitional" span)
| Property | All |
|---|---|
| `color` | `#009FFC` |
| `display` | `inline` |
| `position` | `relative` |

#### `.desc` (body2 description)
| Property | xs | sm | md | lg |
|---|---|---|---|---|
| `paddingX` | `20px` | `20px` | `20px` | `20px` |
| `width` | `auto` | `auto` | `auto` | `68%` |
| `color` | `rgba(0,0,0,0.77)` | same | same | same |
| `marginTop` | `20px` | same | same | same |
| `textAlign` | `center` | `center` | `left` | `left` |

#### CTA wrapper `<Box>`
| Property | xs | sm | md | lg |
|---|---|---|---|---|
| `display`/`flexDirection`/`alignItems` | `flex row, items-center` | same | same | same |
| `justifyContent` | `center` | `center` | `left` (`flex-start`) | `left` |
| `marginTop` | `40px` | same | same | same |

#### `.containedBtn` (button)
| Property | xs | sm | md | lg |
|---|---|---|---|---|
| `boxShadow` | `"1px 4px 24px 0px #38B6FFB2"` | same | same | same |
| `backgroundColor` | `#38B6FF` | same | same | same |
| `textAlign` | `center` | same | same | same |
| `width` | `180px` | `200px` | `200px` | `200px` |
| `padding` | `18px` (symmetric) | same | same | same |
| `textTransform` | `none` | same | same | same |
| `borderRadius` | `10px` | same | same | same |
| `letterSpacing` | `-2%` | same | same | same |

### Typography

| Element | MUI variant | Mobile | Tablet | Desktop | Weight | Color | Font |
|---|---|---|---|---|---|---|---|
| h3 (rendered as `component="h3"` w/ `variant="h2"`) | `h2` | 1.375rem (22px) | 1.75rem (28px) | 2.25rem (36px) | 700 | `#000000` | `leagueSpartan` |
| Accent span "Tuitional" | `variant="h2"` span | inherit h2 | inherit | inherit | 700 | `#009FFC` | `leagueSpartan` |
| Desc `<p>` | `variant="body2"` | 14px | 14px | 14px | 400 | `rgba(0,0,0,0.77)` | `leagueSpartan` |
| Button label | MUI Button default | 15px | 16px | 16px | 500 | white | `leagueSpartan` |

> AR variant: same typography. Heading `textAlign` flips `md/lg → right` (under RTL is logical "start"). Desc `textAlign` flips `md/lg → right`. CTA `justifyContent: {xs:"center", md:"right"}`.

### Colors

| MUI | Tailwind |
|---|---|
| `#000000` (heading) | `text-black` |
| `#009FFC` (accent) | inline `text-[#009FFC]` (no `brand-*` token for `#009FFC` — keep arbitrary) |
| `rgba(0,0,0,0.77)` (desc) | `text-ink-800` |
| `#38B6FF` (button bg) | `bg-brand-500` |
| `#38B6FFB2` (button shadow alpha) | inline in `shadow-[1px_4px_24px_0px_#38B6FFB2]` |

### Animations / interactions

- None.
- Button hover re-asserts same `boxShadow`, `backgroundColor`, `padding`, `letterSpacing`, `borderRadius`, `textAlign` — **no visible hover effect**.

---

## §2 Tailwind port — bug list

Reference: `tuitionalFrontend\src\components\careers\top-talent.tsx`.

| # | Line | Current | Expected (per MUI) | Severity |
|---|---|---|---|---|
| B1 | 17 | wraps everything in `<a id="careersForm" className="block">` | MUI source has no anchor wrap (the original `<Button>` is plain). The AR variant has `<Button component="a" href="#careersForm">`. This `<a>` wrapper appears to be the port's smooth-scroll anchor target. **Acceptable** — it doesn't affect layout. Note that AR target uses `href="#careersForm"`, so the anchor id is correct. | — (audit) |
| B2 | 18 | grid `grid grid-cols-1 gap-y-8 md:grid-cols-12` | ✗ MUI `Grid container rowSpacing={4}` = 32px gap = `gap-y-8` ✓. Switch to 12-col at `md` ✓ matches `xs=12 md=7/5`. | — |
| B3 | 19 | `md:col-span-7` for image col, `md:col-span-5` for copy col | ✓ matches | — |
| B4 | 20 | image wrapper `relative mt-[70px] flex h-[80%] w-full justify-center sm:mt-[60px] md:mt-[60px] md:h-[75%] lg:mt-[60px]` | ✓ matches MUI `marginTop:{xs:"70px", sm:"60px", md:"60px", lg:"60px"}` + `height:{xs:'80%', md:'75%'}`. | — |
| B5 | 26 | image `h-auto w-[90%]` | ✓ matches inline `style={{ height: "auto", width: "90%" }}` | — |
| B6 | 32 | heading `relative mt-0 px-5 text-center font-heading text-h2-mobile sm:text-h2-tablet md:mt-[95px] md:text-start lg:mt-[105px] lg:text-h2 text-black` | ✓ matches all dims. Typography triplet correct. `text-start` is logical (flips under RTL). `px-5` = 20px = MUI `paddingX:"20px"`. | — |
| B7 | 33-38 | mobile lines decoration `<Image src={linesMobile} className="absolute -top-5 z-10 mb-5 h-[35px] w-[43px] object-contain sm:hidden" />` | ✗ MUI mobile (xs) sets `top: -20` (px), not `-top-5` (20px). `-top-5` = -20px so actually ✓. **But** MUI mobile sets `height: "35px"` and `width: "43px"` (constant across all bps) — current `h-[35px] w-[43px]` ✓. Position `left` for xs is **omitted** in MUI source (no value), so the mobile decoration has no horizontal offset specified — it sits at default `left: 0`. Current port also doesn't specify mobile `left`. ✓ | — |
| B8 | 39-44 | sm+ lines decoration `<Image src={linesInvert} className="absolute -left-[30px] -top-[30px] z-10 mb-5 hidden h-[35px] w-[43px] object-contain sm:-top-10 sm:block md:-top-[30px] lg:-top-[50px]" />` | ✗ MUI: `top: { xs:-20, sm:-40, md:-30, lg:-50 }`, `left: { md:-30, lg:-30 }` (no xs/sm left). Current uses `-left-[30px]` as base which **applies at sm** since sm:block. MUI sm sets no `left` explicitly. `sm:-top-10` = -40px ✓ matches sm:-40. `md:-top-[30px]` ✓. `lg:-top-[50px]` ✓. The `-left-[30px]` defaults from base — at sm there's no left override in MUI, so technically should be `left: auto` at sm and only `-30px` at md/lg. **Minor — currently applies -30px from sm, MUI applies -30px from md.** | low |
| B9 | 46-47 | "lead" + "accent" inline rendering with `<br />` between line 1 and line 2 | ✓ Translation has line 1, line 2 lead ("chooses"), accent ("Tuitional") split into i18n keys. Matches MUI's `"Why Top Talent <br/> chooses <span>Tuitional</span>"` literally. ✓ | — |
| B10 | 47 | accent `<span className="relative inline text-[#009FFC]">` | ✓ matches MUI `color:"#009FFC"`, `display:"inline"`, `position:"relative"` | — |
| B11 | 49 | desc `mt-5 px-5 text-center font-heading text-body-mobile sm:text-body lg:w-[68%] lg:text-start text-ink-800 whitespace-pre-line` | ✗ MUI `variant="body2"` = 14px = `text-small` (per token table). The port uses `text-body-mobile sm:text-body` (= 15px / 16px). **Off by 1-2px.** Should be `text-small`. | **med** |
| B12 | 49 | desc `mt-5` = 20px | ✓ matches MUI `marginTop:"20px"` | — |
| B13 | 49 | desc `px-5` and `lg:w-[68%]` | ✓ matches `paddingX:{all}:"20px"`, `width:{xs:"auto", lg:"68%"}` | — |
| B14 | 49 | desc `text-center ... md:text-start` (logical) | ✗ MUI textAlign for desc: `{xs:"center", md:"left"}`. The port jumps **at lg** (`lg:text-start`), not at `md`. Should be `md:text-start`. **Bug**. | **med** |
| B15 | 49 | desc `whitespace-pre-line` | ✓ needed for MUI's literal `<br />`/`\n` in description text | — |
| B16 | 52 | CTA wrapper `mt-10 flex flex-row items-center justify-center md:justify-start` | ✓ matches MUI `marginTop:"40px"`, `justifyContent:{xs:"center", md:"left"}`. `mt-10` = 40px ✓, `md:justify-start` ✓ (`flex-start` = `left` for LTR). | — |
| B17 | 54 | Button `w-[180px] rounded-md px-0 py-[18px] shadow-[1px_4px_24px_0px_#38B6FFB2] sm:w-[200px] md:w-[200px] lg:w-[200px]` | ✗ MUI `padding:"18px"` (symmetric). Current `px-0 py-[18px]` zeros the horizontal padding. Should be `p-[18px]`. Also missing `tracking-[-0.02em]` (letterSpacing -2%), `normal-case` (textTransform: none), and explicit typography. | **high** |
| B18 | 54 | Button — no `bg-brand-500` explicit | Relies on `variant="primary"` from `@/components/ui/button`. Verify resolves to `#38B6FF`. | med (audit) |
| B19 | 54 | Button width responsive `w-[180px] sm:w-[200px] md:w-[200px] lg:w-[200px]` | ✓ matches MUI `width:{xs:"180px", sm:"200px", md:"200px", lg:"200px"}` | — |
| B20 | 54 | Button no text content typography overrides | MUI uses MUI Button default fontSize. Add `text-button-mobile sm:text-button font-heading`. | low (audit) |

**Net effective bugs**: B11 (desc font-size off — should be `text-small` not `text-body-*`), B14 (desc `md:text-start` not `lg:`), B17 (button `px-0` zeros horizontal padding; missing `tracking` / `normal-case`).

---

## §3 Corrected Tailwind classNames

```tsx
<a id="careersForm" className="block">
  <div className="grid grid-cols-1 gap-y-8 md:grid-cols-12">
    <div className="md:col-span-7">
      <div className="relative mt-[70px] flex h-[80%] w-full justify-center sm:mt-[60px] md:mt-[60px] md:h-[75%] lg:mt-[60px]">
        <Image
          src={careerTalent.src} width={careerTalent.width} height={careerTalent.height}
          alt={t("careers.top_talent.image_alt")}
          className="h-auto w-[90%]"
        />
      </div>
    </div>

    <div className="md:col-span-5">
      <div>
        <h3 className="relative mt-0 px-5 text-center font-heading text-h2-mobile text-black sm:text-h2-tablet md:mt-[95px] md:text-start lg:mt-[105px] lg:text-h2">
          <Image
            src={linesMobile} alt="" aria-hidden="true"
            className="absolute -top-5 z-10 mb-5 h-[35px] w-[43px] object-contain sm:hidden"
          />
          <Image
            src={linesInvert} alt="" aria-hidden="true"
            className={cn(
              "absolute z-10 mb-5 hidden h-[35px] w-[43px] object-contain",
              "sm:-top-10 sm:block",
              "md:-left-[30px] md:-top-[30px]",
              "lg:-left-[30px] lg:-top-[50px]",
            )}
          />
          {t("careers.top_talent.heading_line_1")} <br />
          {lead && <>{lead}</>}{" "}
          <span className="relative inline text-[#009FFC]">{accent}</span>
        </h3>

        {/* B11: text-small (body2 = 14px). B14: md:text-start, not lg: */}
        <p className="mt-5 px-5 text-center font-heading text-small text-ink-800 md:text-start lg:w-[68%] whitespace-pre-line">
          {t("careers.top_talent.description")}
        </p>

        <div className="mt-10 flex flex-row items-center justify-center md:justify-start">
          {/* B17: full symmetric padding, tracking, normal-case */}
          <Button
            variant="primary"
            className={cn(
              "w-[180px] rounded-md p-[18px] font-heading text-button-mobile tracking-[-0.02em] normal-case",
              "shadow-[1px_4px_24px_0px_#38B6FFB2] hover:bg-brand-500 hover:shadow-[1px_4px_24px_0px_#38B6FFB2]",
              "sm:w-[200px] sm:text-button md:w-[200px] lg:w-[200px]",
            )}
          >
            {t("careers.top_talent.cta")}
          </Button>
        </div>
      </div>
    </div>
  </div>
</a>
```

### From → to summary

| Aspect | From | To |
|---|---|---|
| Desc font-size | `text-body-mobile sm:text-body` | `text-small` |
| Desc text alignment | `lg:text-start` | `md:text-start` |
| Button padding | `px-0 py-[18px]` | `p-[18px]` |
| Button typography | (none) | `font-heading text-button-mobile sm:text-button tracking-[-0.02em] normal-case` |
| Button hover | (none) | `hover:bg-brand-500 hover:shadow-[1px_4px_24px_0px_#38B6FFB2]` |
| sm+ lines `left` | `-left-[30px]` base from sm | `md:-left-[30px] lg:-left-[30px]` (no sm left) |

---

## §4 Verification at 4 widths

- **375px** — image full-width 100%, h=80%, mt=70. Image inside is 90% width. Heading centered, 22px (`text-h2-mobile`), mt=0, no left offset. Mobile lines image visible (`-top-5`), `sm:hidden` hides desktop variant. Desc 14px center, mt=20, px=20. Button 180px wide, p=18px symmetric, center-justified.
- **768px** — still stacked single column (md=900 not reached). Image wrapper mt=60 (sm:mt-60). Heading 28px (`sm:text-h2-tablet`), still centered, mt=0. Mobile lines hidden, sm+ lines image visible without left offset, `-top-10` (= -40px). Desc still centered. Button 200px wide.
- **1280px** — switches to 12-col side-by-side. Image col=7, image wrapper mt=60. Copy col=5, heading 36px (`lg:text-h2`) **left-aligned** (`md:text-start`), mt=105, padding-left=20 (logical via `px-5`). sm+ lines image at `-left-[30px] -top-[50px]`. Desc 14px, **left-aligned** (`md:text-start`), w=68%. Button 200px, left-aligned (`md:justify-start`), p=18px.
- **1920px** — same as 1280; no `xl:` rules.

---

## §5 RTL notes

Arabic variant: `ar-top-talent.tsx` adds `dir="rtl"` to the root `<Grid container>`. Mirror changes:

- Heading `textAlign: { xs:"center", sm:"center", md:"right" }` (LTR uses `left` at md/lg). Under RTL, "right" = visually flipped to right edge, which is the "start" side.
- Heading `::before` lines: `right: { md:-30, lg:-30 }` (LTR uses `left`).
- Desc `textAlign: { xs:"center", md:"right" }` (LTR uses `left`).
- CTA wrapper `justifyContent: { xs:"center", md:"right" }` (LTR uses `left`).
- Button has `component="a"` + `href="#careersForm"` in AR (LTR has no anchor — but the port adds `<a id="careersForm">` wrapper which scoping works for both).

Tailwind port action (single source supporting both):
- `text-start` (logical) on heading + desc already auto-flips under `dir="rtl"`. Keep `md:text-start` instead of writing `md:text-right` AR-only.
- `md:justify-start` (logical) on CTA wrapper already auto-flips.
- For the sm+ lines decoration's `left` offset, swap to a logical equivalent OR use `ltr:` / `rtl:` modifiers:
  ```tsx
  className="absolute z-10 ... sm:-top-10 sm:block md:-top-[30px] lg:-top-[50px] ltr:md:-left-[30px] ltr:lg:-left-[30px] rtl:md:-right-[30px] rtl:lg:-right-[30px]"
  ```
- The mobile `linesMobile` image at base width has no `left` override in MUI (LTR) nor `right` override in AR — keep default positioning.

## §6 Late-discovered drift (2026-05-19)

### Button base utilities fight component overrides
- `<Button>` component ([button.tsx](../../../../src/components/ui/button.tsx)) base `size="md"` sets `h-10 px-6` (40px hard-cap). MUI `padding: 18px` symmetric → ~58px height. Direct `p-[18px]` does NOT win over `h-10`.
- **Fix:** add `!h-auto` to override `h-10` so padding controls height.
- Also: `text-button-mobile`/`text-button` tokens have `fontWeight: "600"` baked in. MUI button looks bolder. Add `!font-bold` to force 700 — wins over the token's embedded 600.
- Also: MUI `borderRadius: 10px`. Use `rounded-[10px]`, not `rounded-md` (6px).

### Lines decoration — explicit left:0 / left:20px anchor
- MUI `::before` pseudo-element with `left: auto` is positioned at h3 content-area top-left (after `padding-left: 20px`).
- A real `<Image>` first-child with `absolute` + no `left` class also goes to static position, BUT can drift inside text-aligned containers.
- **Safer port:** set explicit `left-5` (20px) at base/sm to anchor it at `padding-left` edge of h3. Then `md:-left-[30px] lg:-left-[30px]` per MUI breakpoints.

### §6.2 Lines icon at text-center breakpoints — static-position mismatch
- MUI `::before` is an inline pseudo with `content: ''`. With `text-align: center` on h3, the pseudo's STATIC position is at the centered inline-start (i.e. where the heading text begins horizontally). Browser uses that as the `left: auto` value.
- A real `<Image>` first-child in the port is block-level. With `position: absolute, left: auto`, its static position is at h3 content-area top-left (after `padding-left`) — NOT near the centered text. Result: icon sits at h3 left edge instead of near "W" of "Why".
- **Fix (mobile/sm text-center):** anchor explicitly via `left-1/2 -translate-x-[90px]` (linesMobile) / `-translate-x-[110px]` (linesInvert at sm). Reset at md+ with `md:left-0 md:translate-x-0 md:-left-[30px]` since md+ is text-start (no centering offset needed).

### §6.3 Section needs outer container padding on mobile
- Careers page wraps each section in `<div className="mx-auto lg:max-w-[1650px]">` — no `px-*`. At <lg, sections (TeamValues cards, TopTalent grid) touch viewport edges.
- **Fix:** add `px-4 sm:px-6 md:px-8 lg:px-8` to the wrapper. Mirrors MUI Container's default xs:16px / sm+:24px+ inset.

### §6.4 Lines icon — match ApplyNow's flex/percent approach
- Block h3 with `text-center` + absolute Image first-child = static position lands at h3 left edge, not text-start. `-left-[N%]` based on full h3 width is unreliable.
- **Fix:** convert h3 to `w-fit mx-auto` at mobile/sm (shrinks h3 to text width, centered as block). At md+ revert with `md:mx-0 md:w-auto`. Then mirror ApplyNow's icon positioning:
  - linesMobile: `-left-[10%] -top-3 h-[19px] w-5` (small mobile asset)
  - linesInvert: `sm:-left-[8%] sm:-top-[35px] md:-left-[6%] md:-top-[30px] lg:-left-[4%] lg:-top-[50px]`
- Use the smaller `h-[19px] w-5` for the mobile linesMobile variant, not 35×43 — the asset is designed for mobile size.
