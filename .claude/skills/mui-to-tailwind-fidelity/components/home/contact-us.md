# Component — `<ContactUs>`

Home-page "Schedule a Call" section: a left-column illustration of a girl + a right-column glass form (name / email / phone / curriculum / grade / subject / message + submit). Sits on a gradient background with two decorative blue blobs behind the form.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\home\contact-us.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\home\contact-us.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\home\ar-contact-us.tsx` (locale handled in Tailwind port via `useI18n()`) |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Box sx={styles.container} (position: relative)>
├── <Box sx={styles.background}>                 absolute gradient (-z-2)
├── <Grid container>
│   ├── <Grid item lg={5} md/sm/xs=12>           "girl" image column (hidden < lg)
│   │   └── <Box sx={styles.girlImage}>
│   │       └── <Image className="girlGrid" />
│   └── <Grid item lg={7} md/sm/xs=12>           form column
│       └── <Box sx={styles.inner}>              flex col, items-center; block at lg+
│           ├── <Typography variant="h2" sx={styles.heading}>  "Schedule a Call" + ::before linesInvert
│           ├── <Typography variant="body2" sx={styles.desc}>  description
│           └── <Box component="form" sx={styles.contactForm}>  glass form
│               ├── <Box sx={styles.formBox} />               decorative blob TR
│               ├── <Box sx={styles.formInner} />             decorative blob BL
│               ├── <Grid container columnSpacing={2}>        2-col grid at lg+
│               │   ├── <Grid item lg={6}…> FirstName + Phone + Curriculum
│               │   └── <Grid item lg={6}…> Email + Grade + Subject
│               ├── <TextField multiline rows=4>  Message
│               └── <Button variant="contained" sx={styles.containedButton}>  Submit
└── <Image className="girlContact" />            second img (handled by global CSS)
```

### Dimensions & spacing

| Element | Property | Mobile (<600) | Tablet (600-1199) | Desktop (≥1200) |
|---|---|---|---|---|
| `.container` | `position` | relative | relative | relative |
| `.background` | `background` | `linear-gradient(to bottom, rgba(255,255,255,0.7), #D7F0FF)` | same | same |
| `.background` | `position` / `zIndex` | absolute / -2 / 100% × 100% | same | same |
| `.girlImage` | `display` | none | none (md also none) | flex (lg+) |
| `<Grid item>` | column span | 12/12 (full width) | 12/12 | image=5, form=7 |
| `.inner` | `display` | flex col, items-center | flex col, items-center | block (lg+) |
| `.heading` (::before image) | `height` × `width` | 19px × 20px | 35px × 43px | 35px × 43px |
| `.heading` (::before) | `top` / `left` | -20 / -14% | -35 / -8% (sm), -35 / -6% (md) | -35 / -4% |
| `.desc` | `width` | 75% | 75% | 75% |
| `.desc` | `marginBottom` | 2vh | 2vh | 2vh |
| `.desc` | `textAlign` | center | center (md center) | start |
| `.desc` | `paddingX` | 20px | 22px (sm), 0px (md) | 0px |
| `.contactForm` | `width` | 75% | 75% (md 75%) | 65% |
| `.contactForm` | `paddingX` | 35px | 40px (sm), 45px (md) | 50px |
| `.contactForm` | `paddingY` | 35px | 40px (sm), 45px (md) | 50px |
| `.contactForm` | `borderRadius` | 20px | 20px | 20px |
| `.contactForm` | `marginBottom` | 60px | 60px (sm), 100px (md) | 100px |
| `.contactForm` | `boxShadow` | `0px -3px 8px 0px rgba(0,0,0,0.06) inset, 0px 3px 8px 0px rgba(0,0,0,0.06) inset` | same | same |
| `.contactForm` | `backgroundColor` | `rgba(255,255,255,0.7)` | same | same |
| `.formBox` (blob TR) | `width` × `height` | 100×100 | 180×180 (sm), 200×200 (md) | 200×200 |
| `.formBox` | `top` / `right` | -30 / -10 | -80 / -40 (sm), -80 / -60 (md) | -80 / -80 |
| `.formBox` | `backgroundColor` | `rgba(56, 182, 255, 1)` | same | same |
| `.formBox` | `borderRadius` / `zIndex` | 100px / -1 | same | same |
| `.formInner` (blob BL) | `width` × `height` | 60×60 | 80×80 (sm), 100×100 (md) | 100×100 |
| `.formInner` | `bottom` / `left` | -80 / -20 | -80 / -20 (sm), -80 / -30 (md) | -30 / -30 |
| `.formInner` | `backgroundColor` / `borderRadius` / `zIndex` | `rgba(56, 182, 255, 1)` / 100px / -1 | same | same |
| `<Grid container>` (fields) | `columnSpacing` | 2 (=16px) | 2 | 2 |
| `<Grid item lg={6}>` | column span | 12 | 12 (md=12) | 6 (lg only) |
| `.inputDiv` (around each input) | `marginY` | 2vh | 2vh | 2vh |
| `.input` (TextField, Message) | `marginY` | 2vh | 2vh | 2vh |
| `.input` | `backgroundColor` | white | white | white |
| `.input` | `borderRadius` | 5px | 5px | 5px |
| `.input` | `boxShadow` | `0px 1px 4px 0px rgba(0, 0, 0, 0.08)` | same | same |
| `.input` | `color` | `rgba(0,0,0,0.77)` | same | same |
| `.phoneInput` | `boxShadow` | `0px 1px 4px 0px rgba(0,0,0,0.08)` | same | same |
| `.phoneInput` | `paddingLeft` | 10px | 10px | 10px |
| `.phoneInput` | `backgroundColor` | white | white | white |
| `.phoneInput` | `marginY` | 2vh | 2vh | 2vh |
| `.phoneInput` | `borderRadius` / `height` | 10px / 5.5vh | same | same |
| `.phoneInput` | `color` / `zIndex` | `rgba(0,0,0,0.77)` / 2 | same | same |
| `.error` | `color` | red | red | red |
| `.error` | `marginTop` / `marginLeft` | 6px / 6px | same | same |
| `.containedButton` | `padding` | 18px | 18px | 18px |
| `.containedButton` | `marginY` | 20px | 20px | 20px |
| `.containedButton` | `borderRadius` / `width` | 10px / 100% | same | same |
| `.containedButton` | `backgroundColor` | `#38B6FF` | same | same |
| `.containedButton` | `boxShadow` | `1px 15px 34px 0px rgba(56, 182, 255, 0.4)` | same | same |
| `.containedButton` | `textTransform` | none | none | none |

### Typography

| Element | MUI variant | Mobile size | Tablet size | Desktop size | Weight | Color | Font |
|---|---|---|---|---|---|---|---|
| "Schedule a Call" `<Typography component="h5" variant="h2">` | h2 | 1.375rem (22px) | 1.75rem (28px) | 2.25rem (36px) | 700 | `#000000` | League Spartan |
| Description `<Typography variant="body2">` | body2 | 0.875rem (14px) | 14px | 14px | 400 | `#000000` | League Spartan |
| Error `<Typography variant="caption">` | caption | 14px (theme maps caption→small) | 14px | 14px | 400 | red | League Spartan |
| Button "Submit Now" | MUI Button default | 0.9375rem (15px) | 1rem (16px) | 1rem | 700 (theme) | white | League Spartan |

### Colors

- `#D7F0FF` → `bg-brand-50` (gradient end)
- `rgba(255,255,255,0.7)` → `bg-white/70` (gradient start & form bg)
- `#38B6FF` → `bg-brand-500` (button + blobs)
- `rgba(56, 182, 255, 1)` → `bg-brand-500` (blobs)
- `rgba(0,0,0,0.77)` → `text-ink-800` (input text)
- `#000000` → `text-black` (heading + desc)
- `red` (error) → `text-danger`
- form shadow `0px -3px 8px 0px rgba(0,0,0,0.06) inset, 0px 3px 8px 0px rgba(0,0,0,0.06) inset` → arbitrary `shadow-[0px_-3px_8px_0px_rgba(0,0,0,0.06)_inset,0px_3px_8px_0px_rgba(0,0,0,0.06)_inset]`
- input shadow `0px 1px 4px 0px rgba(0,0,0,0.08)` → `shadow-card`
- button shadow `1px 15px 34px 0px rgba(56,182,255,0.4)` → arbitrary `shadow-[1px_15px_34px_0px_rgba(56,182,255,0.4)]`

### Animations / interactions

- Hover on button: same background, same shadow, same padding (intentionally no visual change). No transition.

---

## §2 Tailwind port — bug list

| # | Line | Current className | Expected | Severity |
|---|---|---|---|---|
| B1 | 199 | `grid grid-cols-1 lg:grid-cols-12` (custom 5/7 split via col-span 5 / 7) | OK — preserves 5/7 ratio at lg+ ✓ | — |
| B2 | 201 | `flex h-auto items-end justify-center` on girl wrapper | OK — MUI `.girlImage` is `position: relative; display: flex` (only at lg+) ✓ | low |
| B3 | 200 | `lg:col-span-5` | ✓ matches `lg={5}` | — |
| B4 | 213 | inner: `z-[4] flex flex-col items-center md:items-stretch lg:block` | MUI `.inner` is `display: flex; flex-direction: column; alignItems: center` from xs..md, then `display: block` at lg. The current `md:items-stretch` deviates — should stay items-center until lg. **Replace `md:items-stretch` with nothing** | med |
| B5 | 214 | h2: `relative ms-0 mb-5 mt-0 flex … md:ms-[60px] lg:ms-[65px]` | MUI heading has only `marginLeft: { xs: "0px" }` (no md/lg). The `md:ms-[60px] lg:ms-[65px]` are inventions. Drop them. | high |
| B6 | 214 | `mb-5` (20px) on heading | MUI heading has no explicit margin-bottom (the desc has `marginBottom: 2vh` but heading itself doesn't). The 20px gap below the heading is invented. Drop `mb-5`. | med |
| B7 | 219-220 | linesMobile: `-left-[10%] -top-3 h-[19px] w-5` | MUI ::before mobile: `top: -20`, `left: -14%`, size 19px × 20px. Should be `-left-[14%] -top-5 h-[19px] w-5` | med |
| B8 | 223-226 | linesInvert: `sm:-left-[8%] sm:-top-[35px] … md:-left-[6%] lg:-left-[4%]` | matches MUI ✓ (but missing `md:-top-[35px] lg:-top-[35px]` — value is unchanged so it inherits sm `-top-[35px]` — OK) | low |
| B9 | 229 | desc: `px-5 text-center font-heading text-small lg:px-0 lg:text-start text-black` | MUI desc paddingX: `xs=20px, sm=22px, md=0, lg=0`. Current `px-5` = 20px, `lg:px-0` skips the sm=22px / md=0 distinction. Should be `px-5 sm:px-[22px] md:px-0 lg:px-0`. Also missing `w-3/4` (MUI width 75%) and `mb-[2vh]` | high |
| B10 | 229 | desc font: `font-heading text-small` (14px both sizes) | MUI body2 = 14px (no responsive). ✓ Acceptable. | — |
| B11 | 233 | form wrapper: `relative mt-4 w-full` | **Missing entirely**: the form's glass `bg-white/70`, `shadow`, `rounded-[20px]`, `paddingX/Y`, `marginBottom`, the two decorative blobs (`.formBox`, `.formInner`), and the `w-{75%/65%}` constraint. The form is rendered as a bare div on the page. | **high — biggest miss** |
| B12 | 234 | grid: `z-[1] grid grid-cols-1 gap-x-4 gap-y-2 lg:grid-cols-2` | ✓ matches `columnSpacing={2}` (16px) + `lg={6}` split. Note: MUI has no `rowSpacing` (commented out), so `gap-y-2` (8px) is a small invention but acceptable since fields have their own `marginY: 2vh` | low |
| B13 | 235, 271 | inner column: `flex flex-col gap-2` (8px) | MUI doesn't gap the column children — each field has `marginY: 2vh`. The `gap-2` over-tightens the field rhythm. Replace with `flex flex-col` only and let each field carry `my-[2vh]` | med |
| B14 | 254 | PhoneInput: `relative z-[2] my-1 h-[5.5vh] min-h-[44px] rounded-md bg-white ps-[10px] text-ink-800 shadow-card outline-none` | MUI: `marginY: 2vh`, `rounded-[10px]`, height 5.5vh. Replace `my-1` → `my-[2vh]`, `rounded-md` → `rounded-[10px]` | high |
| B15 | 193 | `inputCls = "my-1 rounded-md bg-white font-heading text-ink-800 shadow-card"` | MUI `.input` has `marginY: 2vh`, `borderRadius: 5px` (not 10!), the 5px is intentional. Replace `my-1` → `my-[2vh]`, `rounded-md` → `rounded-[5px]` | high |
| B16 | 194 | `errCls = "ms-1 mt-1 font-body text-small text-danger"` | MUI: `marginTop: 6px`, `marginLeft: 6px`. Use `ms-[6px] mt-[6px]` | med |
| B17 | 310 | message wrapper: `mt-2` (8px) | MUI Message TextField has `marginY: 2vh`. Use `mt-[2vh]` (or fold into the `inputCls` which is already applied) | med |
| B18 | 322-325 | Button: `my-4 w-full rounded-md py-[18px] font-heading text-button leading-[18.4px] shadow-[…]` | MUI: `padding: 18px` (all sides, not just y), `marginY: 20px`, `borderRadius: 10px`, `width: 100%`. Replace `my-4` → `my-5` (=20px), `rounded-md` → `rounded-[10px]`, add `p-[18px]` instead of just `py-[18px]`, add `bg-brand-500 hover:bg-brand-500` | high |
| B19 | (missing) | (no `.formBox` / `.formInner` blobs) | Add two absolutely-positioned `<span aria-hidden>` divs inside the form with the responsive sizes / offsets from §1 | high |
| B20 | 199 | grid wrapped at top level | the gradient `background` from `.background` (with `-z-2`) is passed in via `style={background as any}` prop. Acceptable since the parent supplies it, but the **default** path (no `background` prop) renders no gradient — original always renders the gradient. Verify the parent always passes it; otherwise add `bg-gradient-to-b from-white/70 to-brand-50` as a fallback. | low |
| B21 | 343-346 | trailing `<Image className="girlContact" />` | MUI has the same second image with global CSS `girlContact` class (likely mobile-only). The Tailwind port preserves the class — assumes `globals.css` defines it. ✓ |
| B22 | 199 | parent grid has no `position: relative` on the visible form area | MUI's `.contactForm` is `position: relative` so blobs (`zIndex: -1`) sit behind it. When restoring B19/B11, ensure form root is `relative` so blobs anchor correctly. | high (only matters when B19 lands) |

---

### B23 — Submit button stuck at h-10 (40px)

House `<Button>` `size="md"` injects `h-10` (40px). MUI Button has no explicit height — `padding: 18px` all sides + ~24px line-height = ~60px tall. `p-[18px]` on className does NOT override `h-10`. **Always add `h-auto`** when porting MUI Buttons that use padding-based sizing.

### B24 — Default `<Input>`/`<Textarea>` browser border bleeds through

House `<Textarea>` (and `<Input>`) carries no explicit `border` class. Browser default user-agent stylesheet draws a 1px border on `<textarea>`. MUI `TextField` with custom `notchedOutline: border: none` removes it. **Add `border-0`** when passing custom `className` to neutralize the UA border. Same applies to `<Input>` if visible UA borders appear.

### B27 — Decorative blobs too saturated at full opacity

MUI `.formBox` / `.formInner` use `backgroundColor: "rgba(56, 182, 255, 1)"` (full opacity `#38B6FF`). Literal port `bg-brand-500` reads as harsh solid disks on the soft `bg-white/70` glass form. Drop to **`bg-brand-500/30`** for a soft tint that still reads as the brand-blue accent without overpowering the form.

### B28 — Mobile gap to Footer too small

Page-level wrapper `<div className="my-[5vh] md:my-[10vh]"><ContactUs/></div>` gives only `~33px` bottom margin at 667px viewport before `<ServerFooter>` starts. Form's internal `mb-[60px]` is inside the gradient bg of ContactUs, so the visible gap between the gradient edge and footer is just the wrapper's `5vh`.

Fix: bump mobile bottom margin specifically:
```tsx
<div className="my-[5vh] md:my-[10vh] mb-[10vh] md:mb-[10vh]">
  <ContactUs filterData={filterData} />
</div>
```

Keeps MUI parity at md+ (10vh) while doubling the mobile gap to 10vh.

### B26 — Two-column MUI Grid breaks mobile field order

Porting MUI's `<Grid item lg={6}>` left+right columns as two `<div className="flex flex-col">` siblings inside `<div className="grid grid-cols-1 lg:grid-cols-2">` produces a **broken mobile order**: on `grid-cols-1` the left column dumps fully, then right column dumps fully → `Name, Phone, Curriculum, Email, Grade, Subject`. Email lands after Curriculum on phones — bad UX.

MUI has the same flaw in source; preserving fidelity here makes the port unusable on mobile.

Fix: flatten to a single grid with 6 children in the desired mobile order. Desktop `grid-cols-2` with default row-fill rebuilds the original pairings:

```tsx
<div className="z-[1] grid w-full grid-cols-1 gap-x-4 gap-y-[2vh] lg:grid-cols-2">
  <div>Name</div>      {/* row 1 col 1 on lg */}
  <div>Email</div>     {/* row 1 col 2 on lg */}
  <div>Phone</div>     {/* row 2 col 1 on lg */}
  <div>Grade</div>     {/* row 2 col 2 on lg */}
  <div>Curriculum</div>{/* row 3 col 1 on lg */}
  <div>Subject</div>   {/* row 3 col 2 on lg */}
</div>
```

Mobile order: `Name → Email → Phone → Grade → Curriculum → Subject`. Logical.

Pattern reusable for **any** MUI 2-column Grid form. Default to flat grid + row-fill instead of nested column flexboxes.

### B25 — Per-field `my-[2vh]` wrappers double the gap when adjacent errors break collapse

Stacking `<div className="my-[2vh]">` per field looks fine until errors render between siblings (margin collapse breaks). Result: 2vh + error + 2vh ≈ 4vh effective gap. Fix: put `gap-[2vh]` on the column flex container and drop per-field margins. Cleaner and collapse-safe:

```tsx
<div className="flex flex-col gap-[2vh]">
  <div><Input /> {error}</div>
  <div><PhoneInput /> {error}</div>
  <div><DropDown /> {error}</div>
</div>
```

## §3 Corrected Tailwind classNames

```tsx
return (
  <div className="relative bg-gradient-to-b from-white/70 to-brand-50" style={background as any}>
    <div className="absolute inset-0 -z-[2] h-full w-full" style={padding as any} />

    <div className="grid grid-cols-1 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="relative hidden items-end justify-center lg:flex">
          <Image src={girl.src} width={girl.width} height={girl.height} alt={s.girl_alt} className="girlGrid relative bottom-0" />
        </div>
      </div>

      <div className="lg:col-span-7">
        <div className="z-[4] flex flex-col items-center lg:block">
          <h2 className="relative flex font-heading text-h2-mobile sm:text-h2-tablet lg:text-h2 text-black">
            <Image src={linesMobile} alt="" aria-hidden="true"
              className="absolute -left-[14%] -top-5 h-[19px] w-5 object-contain sm:hidden" />
            <Image src={linesInvert} alt="" aria-hidden="true"
              className="absolute hidden h-[35px] w-[43px] object-contain sm:-left-[8%] sm:-top-[35px] sm:block md:-left-[6%] lg:-left-[4%]" />
            {t("home.contact_us.heading")}
          </h2>
          <p className="mb-[2vh] w-3/4 px-5 text-center font-heading text-small text-black sm:px-[22px] md:px-0 lg:text-start lg:px-0">
            {t("home.contact_us.description")}
          </p>

          <form onSubmit={handleSubmit}
            className="relative mb-[60px] flex w-3/4 flex-col items-center justify-center rounded-[20px] bg-white/70 px-[35px] py-[35px] shadow-[0px_-3px_8px_0px_rgba(0,0,0,0.06)_inset,0px_3px_8px_0px_rgba(0,0,0,0.06)_inset] sm:w-3/4 sm:px-[40px] sm:py-[40px] sm:mb-[60px] md:w-3/4 md:px-[45px] md:py-[45px] md:mb-[100px] lg:w-[65%] lg:px-[50px] lg:py-[50px] lg:mb-[100px]">
            {/* Decorative blob TR */}
            <span aria-hidden className="absolute -top-[30px] -right-[10px] -z-[1] h-[100px] w-[100px] rounded-full bg-brand-500 sm:-top-20 sm:-right-10 sm:h-[180px] sm:w-[180px] md:-top-20 md:-right-[60px] md:h-[200px] md:w-[200px] lg:-top-20 lg:-right-20 lg:h-[200px] lg:w-[200px]" />
            {/* Decorative blob BL */}
            <span aria-hidden className="absolute -bottom-20 -left-5 -z-[1] h-[60px] w-[60px] rounded-full bg-brand-500 sm:-bottom-20 sm:-left-5 sm:h-20 sm:w-20 md:-bottom-20 md:-left-[30px] md:h-[100px] md:w-[100px] lg:-bottom-[30px] lg:-left-[30px] lg:h-[100px] lg:w-[100px]" />

            <div className="z-[1] grid w-full grid-cols-1 gap-x-4 lg:grid-cols-2">
              <div className="flex flex-col">
                <div className="my-[2vh]">
                  <Input … className="rounded-[5px] bg-white text-ink-800 shadow-card" />
                  {errors.FirstName && <p className="ms-[6px] mt-[6px] font-body text-small text-danger">{errors.FirstName}</p>}
                </div>
                <PhoneInput … className="relative z-[2] my-[2vh] h-[5.5vh] min-h-[44px] rounded-[10px] bg-white ps-[10px] text-ink-800 shadow-card outline-none" />
                {errors.PhoneNumber && <p className="ms-[6px] mt-[6px] font-body text-small text-danger">{errors.PhoneNumber}</p>}
                <div className="my-[2vh]">
                  <TranslatableDropDown … />
                  {errors.Curriculum && <p className="ms-[6px] mt-[6px] font-body text-small text-danger">{errors.Curriculum}</p>}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="my-[2vh]">
                  <Input name="EmailAddress" … className="rounded-[5px] bg-white text-ink-800 shadow-card" />
                  {errors.EmailAddress && <p className="ms-[6px] mt-[6px] font-body text-small text-danger">{errors.EmailAddress}</p>}
                </div>
                <div className="my-[2vh]">
                  <TranslatableDropDown name="Grade" … />
                  {errors.Grade && <p className="ms-[6px] mt-[6px] font-body text-small text-danger">{errors.Grade}</p>}
                </div>
                <div className="my-[2vh]">
                  <TranslatableDropDown name="Subject" multiple … />
                  {errors.Subject && <p className="ms-[6px] mt-[6px] font-body text-small text-danger">{errors.Subject}</p>}
                </div>
              </div>
            </div>

            <Textarea rows={4} … className="my-[2vh] w-full rounded-[5px] bg-white text-ink-800 shadow-card" />
            {errors.Message && <p className="ms-[6px] mt-[6px] font-body text-small text-danger">{errors.Message}</p>}

            <Button type="submit" disabled={loading}
              className="my-5 w-full self-center rounded-[10px] bg-brand-500 p-[18px] font-heading text-button !text-white shadow-[1px_15px_34px_0px_rgba(56,182,255,0.4)] hover:bg-brand-500">
              {loading ? <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" aria-label="loading" /> : t("home.contact_us.submit")}
            </Button>
          </form>
        </div>
      </div>
    </div>
    <Image src={girl.src} width={girl.width} height={girl.height} alt={s.girl_alt} className="girlContact" />
  </div>
);
```

## §4 Verification at 4 widths

- **375 (iPhone SE)**: girl image hidden. Heading 22px centered with linesMobile icon at -14%/-20px. Description 14px center, w-3/4, 20px outer padding. Form is 75% width, padding 35px, gradient blobs visible top-right (100×100) and bottom-left (60×60). Each field full-width with 2vh vertical breathing. Button 100% width, 18px padding, blue shadow.
- **768 (iPad Mini)**: still column. Form 75% width, padding 40px. Top-right blob 180×180. Description sm 22px padding-x. Same single-column field grid.
- **1280 (Laptop S)**: image column reveals (5/12), form column 7/12. Form 65% width inside form column. Heading text-h2 (36px). Description left-aligned no padding. Field grid splits to 2 columns. Form margin-bottom 100px.
- **1920 (Desktop FHD)**: same as 1280 (lg breakpoint sustained).

## §5 RTL notes

- AR variant sets `direction: "rtl"` on root and `textAlign: "right"` on heading and `textAlign: "start"` (which flips to right) on desc.
- Tailwind port relies on `useI18n().isRTL` + `dir="rtl"` from layout. The `ms-*`, `me-*`, `ps-*`, `pe-*` classes will auto-flip. The `lg:text-start` (currently `text-start`) is already direction-aware. Decorative `.formBox` (top-right) and `.formInner` (bottom-left) should mirror in RTL — use `start-*` / `end-*` instead of `left-*` / `right-*` when restoring B19, or accept the LTR-only layout if MUI's AR variant doesn't mirror them either (verify in `ar-contact-us.tsx`).
- Phone input: AR variant defaults to `defaultCountry="AE"` while LTR defaults to `"SA"`. Tailwind port currently hardcodes `"SA"` — switch with `defaultCountry={isRTL ? "AE" : "SA"}` for parity.
