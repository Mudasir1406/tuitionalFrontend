# Component — `<FormDialog>` (`form-dialouge.tsx`, sic)

A "Get Started" modal dialog opened from the popup buttons across the site. Contains: name + email row, phone + grade row, curriculum + subject row, message textarea, and a primary submit button. White rounded card with inner shadow + a divider between header and body.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\home\form-dialouge.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\home\form-dialouge.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\home\ar-form-dialouge.tsx` (handled via `useI18n().locale` in port) |

> ⚠️ Filename misspelling (`dialouge` instead of `dialogue`) is intentional — imports depend on it. Don't rename.

---

## §1 MUI source — extracted properties

### Layout tree

```
<Dialog open keepMounted maxWidth={false} sx={{ MuiPaper-*: transparent + no shadow }}>
└── <DialogContent sx={styles.contanier}>           white card, rounded-30px, inset shadow
    ├── <Box sx={styles.header}>                    flex justify-between, mx-3vh, mt-3vh, mb-2vh
    │   ├── <Typography sx={styles.dialogHeading}>  "Get Started" — 3vh font, 500wt
    │   └── <ClearRoundedIcon onClick={handleClose} w/h: 30px>
    ├── <Divider />
    └── <Box sx={styles.mainDiv}>                   paddingX/Y 2%
        └── <form>
            ├── <Box sx={styles.inputDivTop}>       flex col→row at lg, columnGap 24px, rowGap 12px
            │   ├── <Box sx={styles.inputInner}>    flex col, flex=1
            │   │   ├── <Input name="FirstName" sx={styles.input}> 
            │   │   └── {error && <Typography sx={styles.error} variant="caption">}
            │   └── <Box sx={styles.inputInner}>    EmailAddress
            ├── <Box sx={styles.inputDiv}>          flex col→row at lg, columnGap 24px, NO rowGap
            │   ├── <div style={styles.div}>        flex=1 — PhoneInput
            │   └── <div style={styles.div}>        Grade DropDown
            ├── <Box sx={styles.inputDiv}>          Curriculum + Subject row
            ├── <TextField multiline rows=5>        Message
            └── <Button sx={styles.containedButton}>  Submit Now
```

### Dimensions & spacing

| Element | Property | Mobile (<600) | Tablet (600-899) | Desktop (≥900) |
|---|---|---|---|---|
| `.contanier` | `width` | 100% | 100% | 50vw (md+) |
| `.contanier` | `borderRadius` | 30px | 30px | 30px |
| `.contanier` | `padding` | 0 | 0 | 0 |
| `.contanier` | `boxShadow` | `0px -3px 8px 0px rgba(0,0,0,0.15) inset, 0px 2px 1px 0px rgba(0,0,0,0.05)` | same | same |
| `.contanier` | `backgroundColor` | white | white | white |
| `.contanier` | `overflow` | auto | auto | auto |
| `.mainDiv` | `paddingX` / `paddingY` | 2% / 2% | same | same |
| `.header` | `marginX` | 3vh | 3vh | 3vh |
| `.header` | `marginTop` | 3vh | 3vh | 3vh |
| `.header` | `marginBottom` | 2vh | 2vh | 2vh |
| `.header` | `display` / `alignItems` / `justifyContent` | flex / center / space-between | same | same |
| `.dialogHeading` | `fontSize` | 3vh | 3vh | 3vh |
| `.dialogHeading` | `lineHeight` | 2.2vh | 2.2vh | 2.2vh |
| `.dialogHeading` | `fontWeight` / `color` / `letterSpacing` | 500 / `rgba(0,0,0,1)` / -2% | same | same |
| ClearRoundedIcon | `width` / `height` / `cursor` | 30px / 30px / pointer | same | same |
| `.inputDivTop` (FirstName+Email row) | `display` / `flexDirection` | flex column | flex column (md still column) | flex row (lg only) |
| `.inputDivTop` | `columnGap` / `rowGap` | 24px / 12px | same | same |
| `.inputDivTop` | `flex` | 1 | 1 | 1 |
| `.inputDiv` (Phone+Grade row, Curriculum+Subject row) | `display` / `flexDirection` | flex column | flex column | flex row (lg) |
| `.inputDiv` | `columnGap` | 24px | 24px | 24px |
| `.inputDiv` | `rowGap` | (not set) | (not set) | (not set) |
| `.input` (TextField) | `boxShadow` | `0px 1px 4px 0px rgba(0,0,0,0.08)` | same | same |
| `.input` | `marginTop` / `marginBottom` | 1.5vh / 1vh | same | same |
| `.input` | `borderRadius` | 10px | 10px | 10px |
| `.input` | `backgroundColor` | white | white | white |
| `.input` | `color` | `rgba(0,0,0,0.77)` | same | same |
| `.input` | `fontWeight` | 400 | 400 | 400 |
| `.input` | (inner `MuiOutlinedInputRoot` height) | 5.5vh | 5.5vh | 5.5vh |
| `.error` | `color` / `marginTop` / `marginLeft` | red / 6px / 6px | same | same |
| `.containedButton` | `padding-x` / `padding-y` | 1.8vw / 1.5vh | same | same |
| `.containedButton` | `marginY` / `marginX` | 2vh / 2% | same | same |
| `.containedButton` | `width` | 96% | 96% | 96% |
| `.containedButton` | `boxShadow` | `1px 15px 34px 0px rgba(56,182,255,0.4)` | same | same |
| `.containedButton` | `backgroundColor` / `color` | `#38B6FF` / white | same | same |
| `.containedButton` | `fontSize` | 1.5vh | 1.5vh (sm/md) | 2vh (lg) |
| `.containedButton` | `fontWeight` / `lineHeight` | 700 / 18.4px | same | same |
| `.containedButton` | `borderRadius` | 10px | 10px | 10px |
| `.phoneInput` | `boxShadow` | `0px 1px 4px 0px rgba(0,0,0,0.08)` | same | same |
| `.phoneInput` | `paddingLeft` | 10px | 10px | 10px |
| `.phoneInput` | `marginTop` | 1.5vh | 1.5vh | 1.5vh |
| `.phoneInput` | `borderRadius` / `height` | 10px / 5.5vh | same | same |
| `.phoneInput` | `backgroundColor` / `color` / `zIndex` | white / `rgba(0,0,0,0.77)` / 2 | same | same |

### Typography

| Element | Source | Mobile | Tablet | Desktop | Weight | Color | Font |
|---|---|---|---|---|---|---|---|
| Dialog heading "Get Started" | inline `fontSize: 3vh, lineHeight: 2.2vh, fontWeight: 500` | 3vh | 3vh | 3vh | 500 | `rgba(0,0,0,1)` | League Spartan |
| Error text `<Typography variant="caption">` | caption | 14px (theme caption→small) | 14px | 14px | 400 | red | League Spartan |
| Button label | inline `fontSize: { xs/sm/md: 1.5vh, lg: 2vh }, fontWeight: 700, lineHeight: 18.4px` | 1.5vh | 1.5vh | 2vh (lg) | 700 | white | League Spartan |

### Colors

- `white` → `bg-white`
- `rgba(0,0,0,0.77)` → `text-ink-800`
- `red` → `text-danger`
- `#38B6FF` → `bg-brand-500`
- container shadow → `shadow-[0px_-3px_8px_0px_rgba(0,0,0,0.15)_inset,0px_2px_1px_0px_rgba(0,0,0,0.05)]`
- input shadow → `shadow-card`
- button shadow → `shadow-[1px_15px_34px_0px_rgba(56,182,255,0.4)]`

### Animations / interactions

- None (no transitions on dialog open/close beyond MUI Dialog defaults).
- Hover on button keeps same background (`#38B6FF`).

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 275 | `-m-4 sm:-m-6 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-[30px] bg-white shadow-[...]` | MUI: `width: { xs: "100%", md: "50vw" }`. Current uses negative margins to escape parent padding then `w-calc`. This is a port-specific workaround for the HouseDialog padding — acceptable IF the dialog parent has known padding. To match MUI: add `md:w-[50vw]` somewhere on the outer container, or remove the `-m-*` hack if HouseDialog is unpadded. | med |
| B2 | 275 | `max-h-[calc(100dvh-2rem)]` | MUI `.contanier` does not set max-height (relies on dialog defaults). Add as-is — keeps modal scrollable on short screens. ✓ acceptable. | low |
| B3 | 276 | header: `mx-4 mb-3 mt-4 flex items-center justify-between sm:mx-6` | MUI: `marginX: 3vh, marginTop: 3vh, marginBottom: 2vh`. Should be `mx-[3vh] mt-[3vh] mb-[2vh]` — not `mx-4/sm:mx-6/mb-3/mt-4`. | high |
| B4 | 277 | h2: `font-heading text-h5 font-medium tracking-tight text-black sm:text-h4` | MUI: `fontSize: 3vh, lineHeight: 2.2vh, fontWeight: 500, letterSpacing: -2%`. Should be `text-[3vh] leading-[2.2vh] font-medium tracking-[-0.02em]`. The current `text-h5 sm:text-h4` (16px → 20px) is too small (3vh ≈ 22-30px depending on viewport height) | high |
| B5 | 286 | `<X size={30} />` | MUI uses `<ClearRoundedIcon sx={{ width: "30px", height: "30px", cursor: "pointer" }}>`. The lucide `X` at `size={30}` is visually similar but a different glyph. Drift — acceptable but worth noting. | low |
| B6 | 289 | `<hr className="border-ink-200" />` | MUI `<Divider />` is `border-bottom: 1px solid rgba(0,0,0,0.12)`. `border-ink-200` should be similar dark line. ✓ matches | — |
| B7 | 291 | body: `px-4 py-4 sm:px-6 sm:py-5` | MUI `.mainDiv`: `paddingX: 2%, paddingY: 2%`. Should be `px-[2%] py-[2%]`. The current px-4 (16px) on a 50vw dialog is much tighter. | high |
| B8 | 298 | grid: `grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2` | MUI uses TWO separate `flex` rows for the 3 row pairs, with `flexDirection: { xs: "column", lg: "row" }, columnGap: 24px`. The Tailwind port consolidates into a 2-col grid that breaks at sm (600px). MUI breaks to row at lg (1200px). **Breakpoint inversion**: should be `grid-cols-1 lg:grid-cols-2` (not `sm:grid-cols-2`). Also `gap-x-4` (16px) ≠ MUI 24px column gap. Should be `gap-x-6` (24px). `gap-y-1` (4px) ≠ MUI rowGap 12px on top row and unset on rows 2/3. | **high — biggest miss** |
| B9 | 305 | inputCls = `my-1 rounded-md bg-white font-heading text-ink-800 shadow-card` | MUI `.input`: `marginTop: 1.5vh, marginBottom: 1vh`. Should be `mt-[1.5vh] mb-[1vh]`. Also `rounded-md` (10px) ✓ matches MUI 10px. ✓ partial. Fix margins. | high |
| B10 | 330 | PhoneInput: `relative z-[2] my-1 h-11 min-h-[44px] rounded-md bg-white ps-[10px] text-ink-800 shadow-card outline-none` | MUI `.phoneInput`: `marginTop: 1.5vh`, `borderRadius: 10px`, `height: 5.5vh`. Should be `mt-[1.5vh] h-[5.5vh] min-h-[44px] rounded-[10px]`. Current `h-11` (44px) ≠ `5.5vh`. | high |
| B11 | 271 | errCls = `ms-1 mt-1 font-body text-small text-danger` | MUI: 6px / 6px. Use `ms-[6px] mt-[6px]`. | med |
| B12 | 392 | Button: `my-4 w-full rounded-md py-[18px] font-heading text-button leading-[18.4px] shadow-[1px_15px_34px_0px_rgba(56,182,255,0.4)]` | MUI: `paddingX: 1.8vw, paddingY: 1.5vh, marginY: 2vh, marginX: 2%, width: 96%, fontSize: { xs/sm/md: 1.5vh, lg: 2vh }, fontWeight: 700, lineHeight: 18.4px, borderRadius: 10px`. Should be `mx-[2%] my-[2vh] w-[96%] rounded-[10px] px-[1.8vw] py-[1.5vh] font-heading text-[1.5vh] lg:text-[2vh] font-bold leading-[18.4px] bg-brand-500 hover:bg-brand-500 text-white shadow-[…]`. Current uses `text-button` (16px) which is bigger than MUI's 1.5vh on mobile. | high |
| B13 | (between rows) | port has no `rowGap` distinction between the FirstName+Email row (12px) and Phone+Grade row (0px). | MUI distinguishes them. If using a single grid (as Tailwind does), use `gap-y-3` (12px) and accept the unified rhythm — acceptable simplification. | low |
| B14 | 377 | textarea wrapper: `mt-2` (8px) | MUI: `marginTop: 1.5vh` on `.input`. Use `mt-[1.5vh]`. | med |

---

## §3 Corrected Tailwind classNames (key fixes)

| From | To |
|---|---|
| Line 275: `-m-4 sm:-m-6 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] …` | Add explicit `md:w-[50vw]` somewhere; or rely on HouseDialog being unpadded and use `w-full md:w-[50vw]` |
| Line 276: `mx-4 mb-3 mt-4 … sm:mx-6` | `mx-[3vh] mb-[2vh] mt-[3vh]` |
| Line 277: heading classes | `font-heading text-[3vh] leading-[2.2vh] font-medium tracking-[-0.02em] text-black` |
| Line 291: body wrapper | `px-[2%] py-[2%]` |
| Line 298: grid | `grid grid-cols-1 gap-x-6 gap-y-3 lg:grid-cols-2` (24px col, 12px row, breaks at lg) |
| Line 305 (`inputCls`): | `mt-[1.5vh] mb-[1vh] rounded-[10px] bg-white font-heading text-ink-800 shadow-card` |
| Line 330 (PhoneInput): | `relative z-[2] mt-[1.5vh] h-[5.5vh] min-h-[44px] rounded-[10px] bg-white ps-[10px] text-ink-800 shadow-card outline-none` |
| Line 271 (`errCls`): | `ms-[6px] mt-[6px] font-body text-small text-danger` |
| Line 377: textarea wrapper | `mt-[1.5vh]` |
| Line 392: Button | `mx-[2%] my-[2vh] w-[96%] rounded-[10px] bg-brand-500 px-[1.8vw] py-[1.5vh] font-heading text-[1.5vh] lg:text-[2vh] font-bold leading-[18.4px] text-white shadow-[1px_15px_34px_0px_rgba(56,182,255,0.4)] hover:bg-brand-500` |

## §4 Verification at 4 widths

- **375 (iPhone SE)**: Dialog 100% width. Header h2 at 3vh (~22px) with X icon top-right. Grid single column. Each input mt-1.5vh/mb-1vh, 5.5vh height. Button 96% width, my-2vh.
- **768 (iPad Mini)**: Dialog 50vw (since md=900 → still 100% at 768). Re-verify: MUI uses md=900 as switch point, so at 768 the dialog is full width. Same grid structure.
- **1280 (Laptop S)**: Dialog 50vw (~640px). Grid breaks to 2 columns. Button font-size 2vh.
- **1920**: Dialog 50vw (~960px). 2-col grid wider. Same component rhythm.

## §5 RTL notes

- AR variant flips the heading to read right-to-left and aligns the close X icon on the left.
- Tailwind port uses `flex items-center justify-between` on the header — under `dir="rtl"` the children auto-flip (heading right, X left). ✓
- Form fields: each cell uses logical `ms-*`/`me-*` already via `errCls = "ms-[6px]"`. Phone input `ps-[10px]` is logical. ✓
- `tracking-[-0.02em]` is direction-agnostic.
- No directional decorations.
