# Component — `ApplyNow` (careers)

Full-width gradient panel with a left illustration (`applynow.png`, shown only at `lg+`) and a right-side glassmorphic application form. Form has 2-column field grid at `lg+`, with First/Email/Country in left column, Last/Phone/Position in right column, and a full-width Message textarea + "Apply Now" submit button. Decorative blue circles (`formBox`, `formInner`) bleed outside the form's corners.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\careers\apply-now.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\careers\apply-now.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\careers\ar-apply-now.tsx` |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Box styles.container>                                  // position:relative
├── <Box styles.background>                             // absolute, gradient, z:-2
└── <Grid container>                                    // 12-col grid
    ├── <Grid item lg={5} md={12} sm={12} xs={12}>      // LEFT image column — shown only ≥lg
    │   └── <Box (display:none below lg, h:915px lg)>
    │       └── <Image applynow absolute top:90>
    └── <Grid item lg={7} md={12} sm={12} xs={12}>      // RIGHT form column
        └── <Box (flex/col, centered <lg; block at lg; mt:5 xs, 10 md)>
            ├── <Typography variant="h2" styles.heading>     // "Apply Now" with ::before lines image
            └── <Box component="form" styles.contactForm>    // glass card
                ├── <Box styles.formBox>                     // big blue circle, abs top-right
                ├── <Box styles.formInner>                   // small blue circle, abs bot-left
                ├── <Grid container columnSpacing={2} rowSpacing={2}>
                │   ├── <Grid item xs={12} md={12} lg={6}>   // LEFT col fields
                │   │   ├── <Input FirstName>
                │   │   ├── (error caption)
                │   │   ├── <Box my> <Input EmailAddress> + error </Box>
                │   │   ├── <Input Country>
                │   │   └── (error caption)
                │   ├── <Grid item xs={12} lg={6}>            // RIGHT col fields
                │   │   ├── <Input LastName> + error
                │   │   ├── <PhoneInput> + error
                │   │   ├── <Input Position> + error
                │   ├── <Grid item xs={12}>                   // full-width row
                │   │   └── <TextField multiline rows={5} Message>
                ├── <Button containedButton>                  // "Apply Now"
└── <Image applynow girlContact (mobile-only float, css elsewhere)>
```

### Dimensions & spacing

| Element | Property | Mobile (<600) | Tablet 600-899 (sm) | Tablet 900-1199 (md) | Desktop ≥1200 (lg) |
|---|---|---|---|---|---|
| `.container` | `position` | `relative` | same | same | same |
| `.background` | `background` | `linear-gradient(to bottom, rgba(255,255,255,0.7),#D7F0FF)` | same | same | same |
| `.background` | `position` | `absolute` | same | same | same |
| `.background` | `zIndex` | `-2` | same | same | same |
| `.background` | `height`/`width` | `100%` / `100%` | same | same | same |
| LEFT col image `<Box>` | `display` | `none` | `none` | `none` | `flex` |
| LEFT col image `<Box>` | `height` | `auto` (xs) | `auto` | `auto` | `915px` |
| LEFT col image `<Box>` | `margin` | `auto` | same | same | same |
| LEFT col image `<Image>` | `position` | `absolute` | same | same | same |
| LEFT col image `<Image>` | `top` | `90` (px) | `90` | `90` | `90` |
| RIGHT col wrapper `<Box>` | `display` | `flex` | `flex` | `flex` | `block` |
| RIGHT col wrapper `<Box>` | `alignItems` | `center` | same | same | same |
| RIGHT col wrapper `<Box>` | `flexDirection` | `column` | same | same | same |
| RIGHT col wrapper `<Box>` | `zIndex` | `4` | same | same | same |
| RIGHT col wrapper `<Box>` | `marginTop` | `5` (40px) | `5` (40px) | `10` (80px) | `10` |
| `.heading` (h2) | `display` | `flex` | same | same | same |
| `.heading` (h2) | `marginTop` | `0px` | `0px` | `0px` | `5px` |
| `.heading` (h2) | `marginBottom` | `40px` | `20px` | `20px` | `20px` |
| `.heading` (h2) | `marginLeft` | `0px` | `0px` (inherits xs) | `60px` | `65px` |
| `.heading::before` lines `height` | (decorative) | `19px` | `35px` | `35px` | `35px` |
| `.heading::before` lines `width` | | `20px` | `43px` | `43px` | `43px` |
| `.heading::before` lines `top` (offset px) | | `-12` | `-35` | `-35` | `-35` |
| `.heading::before` lines `left` (%) | | `-10%` | `-8%` | `-6%` | `-4%` |
| `.heading::before` lines bg image | | `linesMobile` | `linesInvert` | `linesInvert` | `linesInvert` |
| `.contactForm` | `boxShadow` | `"0px -3px 8px 0px rgba(0,0,0,0.06) inset, 0px 3px 8px 0px rgba(0,0,0,0.06) inset"` | same | same | same |
| `.contactForm` | `backgroundColor` | `rgba(255,255,255,0.7)` | same | same | same |
| `.contactForm` | `width` | `75%` | `75%` | `75%` | `65%` |
| `.contactForm` | `paddingX` | `35px` | `40px` | `45px` | `50px` |
| `.contactForm` | `paddingY` | `35px` | `40px` | `45px` | `50px` |
| `.contactForm` | `borderRadius` | `20px` | same | same | same |
| `.contactForm` | `marginBottom` | `60px` | `60px` | `100px` | `100px` |
| `.contactForm` | `display`/`flex` | `flex col, items-center, justify-center, relative` | same | same | same |
| `.formBox` (blue circle TR) | `width`/`height` | `100px`/`100px` | `180px`/`180px` | `200px`/`200px` | `200px`/`200px` |
| `.formBox` | `borderRadius` | `100px` (pill) | same | same | same |
| `.formBox` | `backgroundColor` | `rgba(56,182,255,1)` | same | same | same |
| `.formBox` | `position` / `top` (px) / `right` (px) / `zIndex` | `absolute, -30, -10, -1` | `-80, -40` | `-80, -60` | `-80, -80` |
| `.formInner` (blue circle BL) | `width`/`height` | `60px` | `80px` | `100px` | `100px` |
| `.formInner` | `borderRadius` | `100px` | same | same | same |
| `.formInner` | `bottom` (px) / `left` (px) | `-80, -20` | `-80, -20` | `-80, -30` | `-30, -30` |
| `.formInner` | `display` | `block` | (no entry — default block from md) | `block` | (md cascade applies) |
| Inner `<Grid container columnSpacing={2} rowSpacing={2}>` | gaps | `16px / 16px` | same | same | same |
| Inner `<Grid container>` | `zIndex` | `1` | same | same | same |
| Field Grid item LEFT | span | `xs=12 md=12 lg=6` | (12) | (12) | 6 |
| Field Grid item RIGHT | span | `xs=12 lg=6` | (12) | (12) | 6 |
| Field Grid item MESSAGE | span | `xs=12` (full) | (12) | (12) | (12) |
| `.input` | `backgroundColor` / `width` / `position`/`zIndex` | `white / 100% / relative / 2` | same | same | same |
| `.input` | `color` | `rgba(0,0,0,0.77)` | same | same | same |
| `.input` | `& .MuiOutlinedInput-notchedOutline { border: none }` | — | — | — | — |
| `.input` | `boxShadow` | `0px 1px 4px 0px rgba(0, 0, 0, 0.08)` | same | same | same |
| `.input` | `borderRadius` | **`5px`** | same | same | same |
| `.my` wrapper | `marginTop`/`marginBottom` | `2vh / 2vh` | same | same | same |
| `.phoneInput` | `boxShadow` / `paddingLeft` / `bg` / `marginTop`/`marginBottom` | `card / 10px / white / 2vh / 2vh` | same | same | same |
| `.phoneInput` | `borderRadius` | `10px` | same | same | same |
| `.phoneInput` | `height` | `5.5vh` | same | same | same |
| `.phoneInput` | `color` | `rgba(0,0,0,0.77)` | same | same | same |
| `.phoneInput` | `zIndex` | `2` | same | same | same |
| `.error` | `color` / `marginTop` / `marginLeft` | `red / 6px / 6px` | same | same | same |
| `.containedButton` | `boxShadow` | `1px 15px 34px 0px rgba(56,182,255,0.4)` | same | same | same |
| `.containedButton` | `backgroundColor` | `#38B6FF` | same | same | same |
| `.containedButton` | `fontSize` | `25px` | `25px` | `25px` | `25px` |
| `.containedButton` | `fontWeight` | `700` | same | same | same |
| `.containedButton` | `lineHeight` | `18.4px` | same | same | same |
| `.containedButton` | `letterSpacing` | `-2%` | same | same | same |
| `.containedButton` | `textTransform` | `none` | same | same | same |
| `.containedButton` | `borderRadius` | `10px` | same | same | same |
| `.containedButton` | `width` | `100%` | same | same | same |
| `.containedButton` | `padding` | `18px` | same | same | same |
| `.containedButton` | `marginY` | `20px` | same | same | same |

### Typography

| Element | MUI variant | Mobile | Tablet | Desktop | Weight | Color | Font |
|---|---|---|---|---|---|---|---|
| "Apply Now" `<h2>` | `variant="h2"` | 1.375rem (22px) | 1.75rem (28px) | 2.25rem (36px) | 700 | `#000` (inherit) | `leagueSpartan` (`font-heading`) |
| Error captions | `variant="caption"` | 14px | 14px | 14px | 400 | `red` | `leagueSpartan` (`font-heading`) |
| Button label | inline `fontSize:25px` (all bps) | 25px | 25px | 25px | 700 | white | `leagueSpartan` |

### Colors

| Hex / rgba | Tailwind token |
|---|---|
| `#D7F0FF` (gradient bottom) | `bg-brand-50` (in gradient: `to-brand-50`) |
| `rgba(255,255,255,0.7)` (form bg + gradient top) | `bg-white/70` / `from-white/70` |
| `rgba(0,0,0,0.06)` (form inset shadow) | inline in `shadow-[...]` |
| `rgba(56,182,255,1)` (`#38B6FF` decorative circles + button) | `bg-brand-500` |
| `rgba(56,182,255,0.4)` (button glow alpha) | inline in `shadow-[...]` |
| `rgba(0,0,0,0.77)` (input text) | `text-ink-800` |
| `rgba(0,0,0,0.08)` (input card shadow) | `shadow-card` |
| `red` (error text) | `text-danger` |

### Animations / interactions

- No keyframes on this component.
- Button `:hover` re-asserts identical shadow/bg/padding/fontSize/lineHeight/borderRadius — **no visible hover effect**. Use `hover:bg-brand-500 hover:shadow-[...]` (inert overrides).

---

## §2 Tailwind port — bug list

Reference: `tuitionalFrontend\src\components\careers\apply-now.tsx`.

| # | Line | Current | Expected (per MUI) | Severity |
|---|---|---|---|---|
| B1 | 206 | root `<div className="relative">` | ✓ matches `.container` | — |
| B2 | 207 | gradient overlay `<div className="absolute inset-0 -z-[2] h-full w-full" />` | ✗ **missing `background` gradient class**. MUI: `linear-gradient(to bottom, rgba(255,255,255,0.7), #D7F0FF)`. Add `bg-gradient-to-b from-white/70 to-brand-50`. | **high** |
| B3 | 209 | outer grid `grid grid-cols-1 lg:grid-cols-12` | ✓ matches MUI `<Grid container>` with `lg=5 / lg=7` mapping. The 12-col approach is correct given uneven split. | — |
| B4 | 210, 222 | columns `lg:col-span-5` and `lg:col-span-7` | ✓ matches `Grid item lg={5}` / `lg={7}` | — |
| B5 | 211 | image wrapper `relative m-auto hidden h-[915px] lg:flex` | ✓ matches `display:{xs:"none",sm:"none",md:"none",lg:"flex"}` + `height:{lg:"915px",xs:"auto"}` + `margin:"auto"` | — |
| B6 | 217 | image `className="girlGrid absolute top-[90px]"` | ✓ matches inline `style={{position:"absolute", top:90}}` | — |
| B7 | 223 | RIGHT wrapper `z-[4] mt-5 flex flex-col items-center md:mt-10 lg:mt-0 lg:block` | ✗ MUI: `marginTop:{xs:5, md:10}` (no `lg:0`). The `lg:mt-0` is wrong — should keep `md:mt-10` cascading to lg. Remove `lg:mt-0`. | **med** |
| B8 | 224 | heading `relative ms-0 mb-10 mt-0 flex font-heading text-h2-mobile sm:mb-5 sm:text-h2-tablet md:ms-[60px] md:mb-5 md:mt-0 lg:ms-[65px] lg:mb-5 lg:mt-[5px] lg:text-h2 text-black` | Mostly correct. MUI uses `marginLeft` (LTR); `ms-*` is logical, will flip under RTL. ✓ Acceptable. Verify mb cascade: xs=40, sm=20, md=20, lg=20 → `mb-10 sm:mb-5` (10*4=40, 5*4=20) is correct. | — |
| B9 | 224 | heading `mt-0` everywhere, `lg:mt-[5px]` | ✓ matches MUI marginTop: 0/0/0/5px | — |
| B10 | 226-236 | heading decorative `<Image>` lines absolutely positioned | ✓ Correct two-image swap (mobile linesMobile vs sm+ linesInvert) with offsets matching MUI `top: -12/-35` and `left: -10%/-8%/-6%/-4%`. Verify md/lg `left` offsets are explicit. Currently `lg:-left-[4%]` is present, `md:-left-[6%]` present. ✓ | — |
| B11 | 240 | form `<form className="relative w-full">` | ✗ **Missing all `.contactForm` styles**: width responsive 75%→65%, padding 35/40/45/50, glass bg, borderRadius:20, marginBottom 60/100, glass shadow, decorative circles. Currently the form has no card styling at all. | **CRITICAL** |
| B12 | 240 | (missing) | Should include `mx-auto`, `w-[75%] lg:w-[65%]`, `px-[35px] py-[35px] sm:p-10 md:p-[45px] lg:p-[50px]`, `rounded-[20px]`, `bg-white/70`, `shadow-[0px_-3px_8px_0px_rgba(0,0,0,0.06)_inset,0px_3px_8px_0px_rgba(0,0,0,0.06)_inset]`, `mb-[60px] md:mb-[100px]`, `flex flex-col items-center justify-center` | **CRITICAL** |
| B13 | 240 | (missing) decorative `<div>` `formBox` (large blue circle TR, abs) | Add. Responsive size 100/180/200/200, position `top -30/-80/-80/-80` `right -10/-40/-60/-80`, `rounded-full bg-brand-500 absolute -z-[1]`. | **high** |
| B14 | 240 | (missing) decorative `<div>` `formInner` (small blue circle BL) | Add. Sizes 60/80/100/100, position `bottom -80 lg:-30`, `left -20 md:-30 lg:-30`, `rounded-full bg-brand-500 absolute -z-[1]`. | **high** |
| B15 | 241 | inner grid `z-[1] grid grid-cols-1 gap-x-4 gap-y-4 lg:grid-cols-2` | ✗ `gap-y-4` (16px) is correct for `rowSpacing={2}=16px`. ✓ But: the field layout structure differs — MUI has the **First/Email/Country** stacked in a single `<Grid item lg=6>` (left col) with explicit `.my` wrappers separating them, and **Last/Phone/Position** stacked in another `<Grid item lg=6>` (right col). The current port also does this (`flex flex-col gap-2` per col), but the `gap-2` (8px) is too tight — MUI uses `<Box styles.my>` which is `marginY: 2vh` (~16-20px) between fields. **Replace `gap-2` with `gap-y-[2vh]`** or wrap individual fields in `my-[2vh]`. | **high** |
| B16 | 242 | LEFT field col `flex flex-col gap-2` | ✗ as above — use `gap-y-[2vh]` (or restructure fields with explicit `my-[2vh]`). | **high** |
| B17 | 275 | RIGHT field col `flex flex-col gap-2` | ✗ same — `gap-y-[2vh]`. | **high** |
| B18 | 293 | PhoneInput `relative z-[2] my-1 h-[5.5vh] min-h-[44px] rounded-[10px] bg-white ps-[10px] text-ink-800 shadow-card outline-none` | ✗ `my-1` is wrong. MUI `.phoneInput` has `marginTop:"2vh", marginBottom:"2vh"`. Use `my-[2vh]`. Also missing `text-[2.3vh]` and `leading-[3.5vh]` (defined in this codebase pattern for phone inputs but **NOT in MUI source here**). MUI ApplyNow's phoneInput does not set fontSize/lineHeight, so leave default. ✓ for sizes. But `my-1` (4px) is the bug. | **med** |
| B19 | 309 | Message wrapper `<div className="lg:col-span-2">` | ✗ should be `col-span-1 lg:col-span-2` (works) but the **Textarea** itself uses `inputCls` which has `my-1 rounded-[5px]`. ✓ `rounded-[5px]` matches MUI `.input` 5px radius. `my-1` here is fine (Grid item provides its own gap). | low |
| B20 | 202 | `inputCls = "my-1 rounded-[5px] bg-white font-heading text-ink-800 shadow-card"` | Mostly ✓. MUI `.input` has `width:"100%"`, `position:"relative"`, `zIndex:2`, `color:"rgba(0,0,0,0.77)"`, `boxShadow:"0px 1px 4px 0px rgba(0, 0, 0, 0.08)"`, `borderRadius:"5px"`, removes default border. The `my-1` (4px) doesn't appear in MUI — `.input` has no margin (the separation comes from `.my` Box wrapper). **Remove `my-1` from `inputCls`** to keep input as the static field, and use `gap`/`my-[2vh]` on the container. | **med** |
| B21 | 203 | `errorCls = "ms-1 mt-1 font-body text-small text-danger"` | ✗ MUI `.error` has `marginTop:"6px"`, `marginLeft:"6px"`. Should be `ms-[6px] mt-[6px]`. | low |
| B22 | 325 | Button `my-4 w-full rounded-md py-[18px] text-button shadow-[1px_15px_34px_0px_rgba(56,182,255,0.4)]` | ✗ MUI `.containedButton` has `marginY:"20px"` (so `my-5`), `padding:"18px"` (symmetric, so `p-[18px]`, not just `py-[18px]`), `fontSize:25px` (use `text-[25px]`), `fontWeight:700` (`font-bold`), `lineHeight:18.4px` (`leading-[18.4px]`), `letterSpacing:-2%` (`tracking-[-0.02em]`), `textTransform:none` (`normal-case`). `text-button` is 16px not 25px. | **high** |
| B23 | 325 | Button — relies on shared `Button` for `bg-brand-500` | Verify or add `bg-brand-500 hover:bg-brand-500 text-white` (MUI's hover re-asserts same bg). | med (audit) |
| B24 | 340-346 | bottom `<Image ... className="girlContact">` | This is the mobile floating image used in old MUI globals.css. Keep as-is — the global class lives in the legacy CSS. ✓ | — |

**Net critical bugs**: B11–B14 (form card has zero styling — bg, padding, radius, shadow, decorative circles missing). B15–B17 (field vertical rhythm wrong). B22 (button typography drift, padding direction wrong). B2 (background gradient missing).

---

## §3 Corrected Tailwind classNames

```tsx
const inputCls = "rounded-[5px] bg-white font-heading text-ink-800 shadow-card";
const errorCls = "ms-[6px] mt-[6px] font-body text-small text-danger";

return (
  <div className="relative">
    {/* B2: full-bleed gradient background */}
    <div className="absolute inset-0 -z-[2] h-full w-full bg-gradient-to-b from-white/70 to-brand-50" />

    <div className="grid grid-cols-1 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="relative m-auto hidden h-[915px] lg:flex">
          <Image
            src={applynow.src}
            width={applynow.width}
            height={applynow.height}
            alt={t("careers.apply_now.image_alt")}
            className="girlGrid absolute top-[90px]"
          />
        </div>
      </div>

      <div className="lg:col-span-7">
        {/* B7: drop lg:mt-0 — MUI keeps the md value cascading */}
        <div className="z-[4] mt-5 flex flex-col items-center md:mt-10 lg:block">
          <h2 className="relative ms-0 mb-10 mt-0 flex font-heading text-h2-mobile text-black sm:mb-5 sm:text-h2-tablet md:ms-[60px] md:mb-5 md:mt-0 lg:ms-[65px] lg:mb-5 lg:mt-[5px] lg:text-h2">
            <Image src={linesMobile} alt="" aria-hidden="true"
              className="absolute -left-[10%] -top-3 h-[19px] w-5 object-contain sm:hidden" />
            <Image src={linesInvert} alt="" aria-hidden="true"
              className="absolute hidden h-[35px] w-[43px] object-contain sm:-left-[8%] sm:-top-[35px] sm:block md:-left-[6%] lg:-left-[4%]" />
            {t("careers.apply_now.heading")}
          </h2>

          {/* B11/B12: full glass-card styling on the <form> */}
          <form
            onSubmit={handleSubmit}
            className={cn(
              "relative flex w-[75%] flex-col items-center justify-center rounded-[20px] bg-white/70",
              "mx-auto px-[35px] py-[35px] sm:px-10 sm:py-10 md:px-[45px] md:py-[45px] lg:w-[65%] lg:px-[50px] lg:py-[50px]",
              "mb-[60px] md:mb-[100px]",
              "shadow-[0px_-3px_8px_0px_rgba(0,0,0,0.06)_inset,0px_3px_8px_0px_rgba(0,0,0,0.06)_inset]",
            )}
          >
            {/* B13: large decorative circle, top-right */}
            <div className="absolute -z-[1] h-[100px] w-[100px] rounded-full bg-brand-500 -top-[30px] -right-[10px] sm:h-[180px] sm:w-[180px] sm:-top-[80px] sm:-right-[40px] md:h-[200px] md:w-[200px] md:-right-[60px] lg:-right-[80px]" />
            {/* B14: small decorative circle, bottom-left */}
            <div className="absolute -z-[1] h-[60px] w-[60px] rounded-full bg-brand-500 -bottom-[80px] -left-[20px] sm:h-[80px] sm:w-[80px] md:h-[100px] md:w-[100px] md:-left-[30px] lg:-bottom-[30px] lg:-left-[30px]" />

            {/* B15: 2-col field grid; vertical rhythm 2vh between fields in same col */}
            <div className="z-[1] grid w-full grid-cols-1 gap-x-4 gap-y-4 lg:grid-cols-2">
              {/* LEFT COL */}
              <div className="flex flex-col">
                <div>
                  <Input name="FirstName" value={formData.FirstName} onChange={handleChange}
                    placeholder={t("careers.apply_now.placeholder_first_name")} className={inputCls} />
                  {errors.FirstName && <p className={errorCls}>{errors.FirstName}</p>}
                </div>
                <div className="my-[2vh]">
                  <Input name="EmailAddress" value={formData.EmailAddress} onChange={handleChange}
                    placeholder={t("careers.apply_now.placeholder_email")} className={inputCls} />
                  {errors.EmailAddress && <p className={errorCls}>{errors.EmailAddress}</p>}
                </div>
                <div>
                  <Input name="Country" value={formData.Country} onChange={handleChange}
                    placeholder={t("careers.apply_now.placeholder_country")} className={inputCls} />
                  {errors.Country && <p className={errorCls}>{errors.Country}</p>}
                </div>
              </div>

              {/* RIGHT COL */}
              <div className="flex flex-col">
                <div>
                  <Input name="LastName" value={formData.LastName} onChange={handleChange}
                    placeholder={t("careers.apply_now.placeholder_last_name")} className={inputCls} />
                  {errors.LastName && <p className={errorCls}>{errors.LastName}</p>}
                </div>
                <div className="my-[2vh]">
                  <PhoneInput defaultCountry="SA" value={formData?.PhoneNumber || ""}
                    onChange={(e) => handleChange("PhoneNumber", String(e))}
                    inputComponent={CustomInput}
                    placeholder={t("careers.apply_now.placeholder_phone")}
                    className="relative z-[2] h-[5.5vh] min-h-[44px] rounded-[10px] bg-white ps-[10px] text-ink-800 shadow-card outline-none" />
                  {errors.PhoneNumber && <p className={errorCls}>{errors.PhoneNumber}</p>}
                </div>
                <div>
                  <Input name="Position" value={formData.Position} onChange={handleChange}
                    placeholder={t("careers.apply_now.placeholder_position")} className={inputCls} />
                  {errors.Position && <p className={errorCls}>{errors.Position}</p>}
                </div>
              </div>

              {/* MESSAGE — full width */}
              <div className="col-span-1 lg:col-span-2">
                <Textarea name="Message" rows={5} value={formData.Message}
                  onChange={(e) => handleChange("Message", e.target.value)}
                  placeholder={t("careers.apply_now.placeholder_message")}
                  className={inputCls} />
                {errors.Message && <p className={errorCls}>{errors.Message}</p>}
              </div>
            </div>

            {/* B22: button — full padding, big 25px label, tracking, normal-case */}
            <Button
              type="submit"
              disabled={loading}
              className={cn(
                "my-5 w-full self-center rounded-[10px] bg-brand-500 hover:bg-brand-500",
                "p-[18px] font-heading text-[25px] font-bold leading-[18.4px] tracking-[-0.02em] normal-case !text-white",
                "shadow-[1px_15px_34px_0px_rgba(56,182,255,0.4)]",
              )}
            >
              {loading ? (
                <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" aria-label="loading" />
              ) : (
                t("careers.apply_now.submit")
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>

    <Image
      src={applynow.src} width={applynow.width} height={applynow.height}
      alt={t("careers.apply_now.image_alt")}
      className="girlContact"
    />
  </div>
);
```

### Key from→to summary

| Aspect | From | To |
|---|---|---|
| Background gradient | (missing, only `-z-[2]` empty div) | `bg-gradient-to-b from-white/70 to-brand-50` |
| Form card bg/padding/radius/shadow | (none) | `bg-white/70 rounded-[20px]` + responsive padding 35/40/45/50 + glass shadow + `w-[75%] lg:w-[65%] mb-[60px] md:mb-[100px]` |
| Decorative circles | (none) | 2 absolute `rounded-full bg-brand-500` divs with responsive size + position |
| Field column gap | `gap-2` (8px) | per-row `my-[2vh]` wrappers (MUI's `.my`) |
| `inputCls` | `my-1 rounded-[5px] ...` | drop `my-1` |
| `errorCls` | `ms-1 mt-1 ...` | `ms-[6px] mt-[6px] ...` |
| Button | `my-4 w-full rounded-md py-[18px] text-button shadow-[...]` | `my-5 w-full rounded-[10px] bg-brand-500 hover:bg-brand-500 p-[18px] font-heading text-[25px] font-bold leading-[18.4px] tracking-[-0.02em] normal-case !text-white shadow-[...]` |

---

## §4 Verification at 4 widths

- **375px** — left image hidden. Form 75% width, padding 35px all, mb 60px. Heading 22px centered (`text-h2-mobile`). Fields stack 1-col with 2vh between, message full-width. Decorative top-right circle 100x100, offset (-30 top, -10 right). Bottom-left circle 60x60, (-80 bottom, -20 left). Button 100% width, 18px padding, label 25px / 18.4px lh.
- **768px** — left image still hidden. Form 75% width, padding 40 (sm), mb 60. Heading 28px (`text-h2-tablet`), centered. Fields still 1-col (lg breakpoint, not yet). Decorative circles 180x180 / 80x80.
- **1280px** — left image **visible**, abs top:90, full column 5/12. Form column 7/12, form 65% width, padding 50/50, mb 100. Heading 36px (`text-h2`), `text-start`-flavored (no, MUI sets no textAlign override; flex row inherits). Heading `ms-[65px] mt-[5px] mb-5`. Fields 2-col, message full-width. Circles 200x200 / 100x100.
- **1920px** — same as 1280; no `xl:` rules.

---

## §5 RTL notes

Arabic variant: `ar-apply-now.tsx` adds `dir="rtl"` to the root, translates strings to Arabic, and mirrors a few decorative positions:
- `.heading::before` lines decoration uses `right: { xs:"11%", sm:"-6%", ... }` instead of `left:`.
- `.formBox` (large circle) uses `left` instead of `right` (so it sits **top-left** under RTL).
- `.formInner` (small circle) uses `right` instead of `left` (so it sits **bottom-right** under RTL).
- `.phoneInput` uses `paddingRight: "10px"` instead of `paddingLeft`.
- AR `container` adds an extra `linear-gradient(to bottom, #D3EFFE, rgba(255,255,255,0.7))` background (different stop direction) and `padding: 20/30/40/50` plus `minHeight: 100vh/130vh`. **These are AR-specific styling deviations**, not pure mirrors.

Tailwind port action under RTL (using `isRTL` from `useI18n()` or `dir="rtl"` on root):
- Use logical properties for paddings on phone input: `ps-[10px]` already flips.
- For the decorative circles, since their `right`/`left` swap, build them with `ltr:` and `rtl:` variants OR conditionally toggle classes. Recommended:
  ```tsx
  // big circle: TR under LTR, TL under RTL
  className="absolute -z-[1] -top-[30px] sm:-top-[80px] ... ltr:-right-[10px] ltr:sm:-right-[40px] ltr:md:-right-[60px] ltr:lg:-right-[80px] rtl:-left-[10px] rtl:sm:-left-[40px] rtl:md:-left-[60px] rtl:lg:-left-[80px]"
  // small circle: BL under LTR, BR under RTL
  className="absolute -z-[1] -bottom-[80px] lg:-bottom-[30px] ... ltr:-left-[20px] ltr:md:-left-[30px] ltr:lg:-left-[30px] rtl:-right-[20px] rtl:md:-right-[30px] rtl:lg:-right-[30px]"
  ```
- Heading `ms-[60px]` / `ms-[65px]` is already logical — auto-flips.
- Note: do NOT port the AR-only background gradient `#D3EFFE → rgba(255,255,255,0.7)` and the `100vh/130vh` minHeight unless verifying that the design system wants AR to look different from LTR. Default to the LTR background (`from-white/70 to-brand-50`) for consistency.

## §6 Late-discovered drift (2026-05-19)

### Form `mx-auto` shifts form right at lg+
- At lg the col-7 parent uses `lg:block`. `mx-auto` on the 65%-width form centers it inside col-7 → form ends up biased right of true page center.
- MUI form has NO auto margin: form sits at LEFT edge of col-7. Drop `mx-auto`. At <lg the parent `flex items-center` already centers cross-axis, so removal does not affect mobile.

### Textarea browser border bleeds through `<Textarea>`
- House `<Textarea>` ([input.tsx](../../../../src/components/ui/input.tsx)) does not set `border-none`. UA-default textarea border (1px solid) shows through with `bg-white` + `shadow-card`.
- **Fix on per-instance className** (`inputCls`): add `border-none focus:ring-0 focus:outline-none`. Skip if doing this globally — only this form requires borderless inputs per MUI baseline.

### Submit button overrides
- Same `<Button>` `h-10` cap as top-talent. Add `!h-auto`. Add `!font-bold` to overwrite text-button token's embedded 600 weight.

### Inter-section gap to TopTalent + Footer
- ApplyNow heading must sit lower than TopTalent's "Get in touch" button. Add `mt-[5vh] md:mt-[10vh]` to the page-level `#careersForm` wrapper.
- Form `mb-[60px] md:mb-[100px]` alone is not enough to guarantee gap to Footer. Add `pb-[5vh] md:pb-[10vh]` on the same `#careersForm` wrapper.
