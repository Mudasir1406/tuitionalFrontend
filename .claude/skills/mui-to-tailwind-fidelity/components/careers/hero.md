# Component — `Hero` (careers)

Careers page hero. Plain text-only block: `<h1>` with an accent span ("together"), short description, and a primary "Get in touch" CTA. No image/illustration. Left-aligned on desktop, center-aligned below `lg`.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\careers\hero.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\careers\hero.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\careers\ar-hero.tsx` |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Box>                                    // root wrapper — width:100%, paddingBottom:{lg:"15vh"}
├── <Typography variant="h1">            // styles.heading — heading line 1 + <br/> + line 2 + accent <span>
│   └── <Typography variant="h1" span>   // styles.expertText — "together" accent (#51B893)
├── <Typography variant="body2">         // styles.desc — "Passionate Educators And Change Lives"
└── <Box>                                // CTA wrapper — width / margin / display switching
    └── <Button variant="contained">     // styles.containedBtn — "Get in touch"
```

### Dimensions & spacing

| Element | Property | Mobile (<600) | Tablet (600-1199) | Desktop (≥1200) |
|---|---|---|---|---|
| Root `<Box>` | `width` | `"100%"` | `"100%"` | `"100%"` |
| Root `<Box>` | `paddingBottom` | — | — | `"15vh"` |
| Heading | `width` | `"100%"` | `"100%"` | `"80%"` |
| Heading | `textAlign` | `"center"` | `"center"` | `"start"` |
| Heading | `marginTop` | (none) | `"5vh"` (`sm`) | `"5vh"` (inherits from sm) |
| Heading | `color` | `"#000000"` | `"#000000"` | `"#000000"` |
| Accent span | `color` | `"#51B893"` | `"#51B893"` | `"#51B893"` |
| Accent span | `display` | `"inline"` | `"inline"` | `"inline"` |
| Desc `<Typography>` | `textAlign` | `"center"` | `"center"` | `"start"` |
| Desc `<Typography>` | `paddingX` | `"20px"` | `"20px"` | `0` |
| Desc `<Typography>` | `marginTop` | `"22px"` | `"22px"` | `"10px"` |
| Desc `<Typography>` | `color` | `"#000000"` | `"#000000"` | `"#000000"` |
| CTA wrapper `<Box>` | `width` | `"100%"` | `"100%"` | `"70%"` |
| CTA wrapper `<Box>` | `marginTop` | `"5vh"` | `"5vh"` | `"5vh"` |
| CTA wrapper `<Box>` | `marginBottom` | — | — | `"10vh"` |
| CTA wrapper `<Box>` | `display` | `"flex"` | `"flex"` | `"block"` |
| CTA wrapper `<Box>` | `alignItems` | `"center"` | `"center"` | `"center"` |
| CTA wrapper `<Box>` | `justifyContent` | `"center"` | `"center"` | `"center"` |
| Button `containedBtn` | `width` | `"50%"` | `"50%"` | `"50%"` |
| Button `containedBtn` | `padding` | `"2vh"` | `"2vh"` | `"2vh"` |
| Button `containedBtn` | `borderRadius` | `"10px"` | `"10px"` | `"10px"` |
| Button `containedBtn` | `boxShadow` | `"1px 4px 24px 0px #38B6FFB2"` | same | same |
| Button `containedBtn` | `backgroundColor` | `"#38B6FF"` | same | same |
| Button `containedBtn` | `textTransform` | `"none"` | same | same |
| Button `containedBtn` | `letterSpacing` | `"-2%"` | same | same |

### Typography

| Element | MUI variant | Mobile | Tablet | Desktop | Weight | Color | Font |
|---|---|---|---|---|---|---|---|
| Heading `<h1>` | `variant="h1"` | 1.75rem (28px) | 2.25rem (36px) | 3rem (48px) | 700 | `#000000` | `leagueSpartan.className` |
| Accent span (`together`) | `variant="h1"` span | inherit h1 | inherit h1 | inherit h1 | 700 | `#51B893` | `leagueSpartan.className` |
| Desc `<p>` | `variant="body2"` | 14px | 14px | 14px | 400 | `#000000` | `leagueSpartan.className` |
| Button label | MUI Button default | 15px | 16px | 16px | 500 (button) | white | `leagueSpartan.className` |

### Colors

| Hex | Tailwind token |
|---|---|
| `#000000` (heading + desc text) | `text-black` |
| `#51B893` (accent span "together") | `text-success` |
| `#38B6FF` (button bg) | `bg-brand-500` |
| `#38B6FFB2` (button shadow color, alpha) | inline in `shadow-[1px_4px_24px_0px_#38B6FFB2]` |
| white (button label) | `text-white` |

### Animations / interactions

- None. Button has `:hover` that **re-asserts** the same `boxShadow` and `backgroundColor` — i.e. **no visible hover change** (intentionally inert). Translate as a no-op `hover:bg-brand-500 hover:shadow-[1px_4px_24px_0px_#38B6FFB2]` if the project `Button variant="primary"` doesn't already pin those.

---

## §2 Tailwind port — bug list

Reference: `tuitionalFrontend\src\components\careers\hero.tsx`.

| # | Line | Current | Expected (per MUI) | Severity |
|---|---|---|---|---|
| B1 | 12 | `<div className="w-full lg:pb-[15vh]">` | ✓ matches MUI `width:"100%"` + `paddingBottom:{lg:"15vh"}` | — |
| B2 | 13 | `text-h1-mobile sm:text-h1-tablet ... lg:text-h1` heading | ✓ correct typography triplet | — |
| B3 | 13 | `relative w-full text-center ... lg:w-[80%] lg:text-start` | ✓ MUI has `width:{xs:"100%",lg:"80%"}` + `textAlign:{xs:"center",lg:"start"}` | — |
| B4 | 13 | `sm:mt-[5vh]` on `<h1>` | ✓ matches MUI `marginTop:{sm:"5vh"}` | — |
| B5 | 13 | `font-heading` | ✓ matches `leagueSpartan.className` | — |
| B6 | 17 | accent span `relative inline text-success` | ✓ MUI: `color:"#51B893"` → `text-success`, `display:"inline"` → `inline`, `position:"relative"` → `relative` | — |
| B7 | 23 | desc `<p>` uses `text-small` (14px) | ✓ MUI `variant="body2"` = 14px = `text-small` | — |
| B8 | 23 | desc `mt-[22px] px-5 ... lg:mt-[10px] lg:px-0 lg:text-start` | ✓ matches MUI desc style | — |
| B9 | 23 | desc has `font-heading` | ✗ MUI uses `body2` which is `font-body` (Inter). However all baselines pass `leagueSpartan.className` which **overrides** to League Spartan. Keep `font-heading` to preserve MUI override. **Acceptable**. | low |
| B10 | 27 | CTA wrapper `mt-[5vh] flex w-full items-center justify-center lg:mb-[10vh] lg:block lg:w-[70%]` | ✓ matches MUI `width:{lg:"70%",xs:"100%"}`, `marginTop:"5vh"`, `marginBottom:{lg:"10vh"}`, `display:{xs:"flex",lg:"block"}` | — |
| B11 | 31 | Button `w-1/2 rounded-md px-0 py-[2vh]` | ✗ MUI `borderRadius:"10px"` → `rounded-md` is correct (10px in this repo). `padding:"2vh"` is symmetric → use `p-[2vh]`, not `px-0 py-[2vh]`. The `px-0` zeros horizontal padding that MUI sets to 2vh. | **high** |
| B12 | 31 | Button shadow `shadow-[1px_4px_24px_0px_#38B6FFB2]` | ✓ matches | — |
| B13 | 31 | Button — no `bg-brand-500` explicitly set; relies on `variant="primary"` from `@/components/ui/button` to map to `#38B6FF` | Verify `Button variant="primary"` resolves to `bg-brand-500`. If not, add `bg-brand-500 hover:bg-brand-500`. | med (audit) |
| B14 | 31 | Button — no `text-button-mobile sm:text-button` triplet, no `letterSpacing` | MUI sets `letterSpacing:"-2%"` and inherits MUI Button typography. Add `text-button-mobile sm:text-button tracking-[-0.02em]`. | med |
| B15 | 31 | Button — no explicit `textTransform: none` | MUI sets `textTransform:"none"`. If `variant="primary"` already does normal-case this is fine; otherwise add `normal-case`. | low (audit) |
| B16 | (missing) | No `position: relative` on heading `<h1>` … wait, present | ✓ `relative` is on the `<h1>` className | — |

**Net effective bugs**: B11 (button has `px-0` stripping horizontal padding), B14 (missing tracking/typography on button label). B9/B13/B15 require verification of the shared `Button` component.

---

## §3 Corrected Tailwind classNames

```tsx
<div className="w-full lg:pb-[15vh]">
  <h1 className="relative w-full text-center font-heading text-h1-mobile sm:mt-[5vh] sm:text-h1-tablet lg:w-[80%] lg:text-start lg:text-h1 text-black">
    {t("careers.hero.heading_line_1")}
    <br />
    {t("careers.hero.heading_line_2_lead")}{" "}
    <span className="relative inline text-success">
      {" "}
      {t("careers.hero.heading_line_2_accent")}{" "}
    </span>
  </h1>

  <p className="mt-[22px] px-5 text-center font-heading text-small text-black lg:mt-[10px] lg:px-0 lg:text-start">
    {t("careers.hero.description")}
  </p>

  <div className="mt-[5vh] flex w-full items-center justify-center lg:mb-[10vh] lg:block lg:w-[70%]">
    <Button
      variant="primary"
      onClick={scrollToApplyForm}
      className="w-1/2 rounded-md p-[2vh] font-heading text-button-mobile tracking-[-0.02em] normal-case shadow-[1px_4px_24px_0px_#38B6FFB2] hover:bg-brand-500 hover:shadow-[1px_4px_24px_0px_#38B6FFB2] sm:text-button"
    >
      {t("careers.hero.cta")}
    </Button>
  </div>
</div>
```

### From → to (only changed values)

| line 31 | from | to |
|---|---|---|
| Button padding | `px-0 py-[2vh]` | `p-[2vh]` |
| Button typography | (none) | `font-heading text-button-mobile sm:text-button tracking-[-0.02em] normal-case` |
| Button hover | (none) | `hover:bg-brand-500 hover:shadow-[1px_4px_24px_0px_#38B6FFB2]` |

---

## §4 Verification at 4 widths

- **375px** — heading 1.75rem (28px), centered, full-width. Desc 14px, center, px-20. Button 50% width, p-2vh. No `lg:pb-15vh` applied. Margin between desc and CTA wrapper = `5vh`.
- **768px** — heading 2.25rem (36px) (`sm:text-h1-tablet`), still centered (lg:text-start not yet applied), `mt-5vh` from `sm:mt-[5vh]`. Desc unchanged size. Button still 50% width.
- **1280px** — heading 3rem (48px) (`lg:text-h1`), left-aligned, width 80%. Desc 14px, left-aligned, no px. CTA wrapper 70% width, `block` display, `mb-10vh`. Root has `pb-15vh`.
- **1920px** — identical to 1280 layout (no `xl:` rules in MUI source).

---

## §5 RTL notes

Arabic variant: `ar-hero.tsx` adds `dir="rtl"` to the root `<Box>` and translates strings. Style values are otherwise **identical to LTR** — `textAlign:"start"` naturally flips to right via `dir="rtl"`. No left/right margins to mirror.

Tailwind port: apply `dir="rtl"` (or use `isRTL` from `useI18n()`). The `lg:text-start` class on `<h1>` and `lg:text-start` on desc automatically flip with `dir="rtl"` because `start` is logical. Inline `text-center` on mobile stays centered in both directions. No additional flex flipping needed (no flex-row containers with directional children in this component).
