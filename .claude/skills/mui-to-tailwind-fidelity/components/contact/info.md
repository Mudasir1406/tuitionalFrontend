# Component — `<Info>`

Three pill-shaped info cards (Address / Contact / Email) shown on the `/contact` page. Each card is a rounded-10px tinted box with a floating circular icon hovering above its top edge.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\contact\info.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\contact\info.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\contact\ar-info.tsx` (see [ar-info.md](./ar-info.md)) — Tailwind side reuses this component via the `isRTL` flag |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Grid container spacing={2} justifyContent="center">
├── <Grid item> InfoBox (heading="Address", icon="address")
├── <Grid item> InfoBox (heading="Contact", icon="phone")
└── <Grid item> InfoBox (heading="Email",   icon="email")

InfoBox = <Box> (rounded-10px tinted card, position: relative, marginTop: 70px)
├── <Box .icon>  (absolute, top: -50px, circular white, shadowed)
│   └── <Icon> (35×30, color #009BF5)
├── <Typography .heading> (centered, fontWeight 500)
└── <Typography .dec>     (centered, fontWeight 400)
```

### Dimensions & spacing

| Element | Property | xs (<600) | sm (≥600) | md (≥900) | lg (≥1200) |
|---|---|---|---|---|---|
| `<Grid container spacing={2}>` | gap | 16px (both axes) | 16px | 16px | 16px |
| `InfoBox` (`<Box>`) | `paddingY` | `48px` | `50px` | `70px` | `100px` |
| `InfoBox` | `paddingX` | — (commented out `20px`) | — | — | — |
| `InfoBox` | `minWidth` | `340px` | `340px` | `340px` | `420px` |
| `InfoBox` | `marginTop` | `70px` | `70px` | `70px` | `70px` |
| `InfoBox` | `borderRadius` | `10px` | — | — | — |
| `InfoBox` | `backgroundColor` | `#F0FAFF` | — | — | — |
| `InfoBox` | `boxShadow` | `0px -3px 8px 0px #009BF526 inset, 0px 2px 1px 0px #0000000D` | — | — | — |
| `.icon` (circle) | `position` | `absolute`, `top: -50px` | — | — | — |
| `.icon` | `width` / `height` | `85px` / `85px` | `95px` / `95px` | `100px` / `100px` | `115px` / `115px` |
| `.icon` | `backgroundColor` | `white` | — | — | — |
| `.icon` | `borderRadius` | `60px` (renders as full circle) | — | — | — |
| `.icon` | `boxShadow` | `0px -2px 4px 0px #0000005C inset, 0px 4px 12.6px 0px #009BF526` | — | — | — |
| `.icon` | `zIndex` | `10` | — | — | — |
| Inner SVG | `width` / `height` | `35px` / `30px` | — | — | — |
| Inner SVG | `color` | `#009BF5` | — | — | — |
| `styles.heading` | `marginBottom` | `22px` | — | — | — |
| `styles.dec` | `marginBottom` | — | — | — | — |

### Typography

| Element | MUI source | Mobile (<600) | Tablet (600-1199) | Desktop (≥1200) | Weight | Color | Font |
|---|---|---|---|---|---|---|---|
| `.heading` "Address" / "Contact" / "Email" | `<Typography sx={styles.heading}>` | `fontSize: 35px / lineHeight: 35px` | `30px / 35px` (sm); `35px / 35px` (md) | `35px / 33px` (lg) | `500` | inherits (default ink) | `leagueSpartan.className` |
| `.dec` value text | `<Typography sx={styles.dec}>` | `fontSize: 18px / lineHeight: 27px` | `22px / 23px` (sm); `25px / 23px` (md) | `25px / 23px` (lg) | `400` | inherits | `leagueSpartan.className` |

Note: MUI does **not** apply its `variant="h?"` cascade here — the sizes come from the inline `sx.fontSize` breakpoint object. So the Tailwind triplet (`text-h2-mobile sm:text-h2-tablet lg:text-h2`) does NOT apply — use arbitrary `text-[Npx]` to match the literal values.

### Colors

| Value | Token mapping |
|---|---|
| `#F0FAFF` (card tint) | No exact Tailwind token — use arbitrary `bg-[#F0FAFF]`. (`bg-brand-50` = `#D7F0FF` is darker — do not substitute.) |
| `#009BF5` (icon color) | No exact token. Use arbitrary `text-[#009BF5]`. Inset shadow color `#009BF526` (alpha ~15%) likewise arbitrary. |
| `white` (icon bg) | `bg-white` |
| Body default ink | inherits from theme (no override) — leave to `<body>` color |

### Animations / interactions

None. No hover, no transition, no animation.

---

## §2 Tailwind port — bug list

Comparing `tuitionalFrontend\src\components\contact\info.tsx` line-by-line against §1.

| # | Line | Current Tailwind | Expected (per MUI) | Severity |
|---|---|---|---|---|
| B1 | 21 | `flex flex-wrap justify-center gap-4` | `flex flex-wrap justify-center gap-4` is OK (Grid `spacing={2}` = 16px = `gap-4`). ✓ Keep | — |
| B2 | 52 | `mt-[70px]` | ✓ Matches `marginTop: { xs: "70px" }` | — |
| B3 | 52 | `rounded-md` (10px via tailwind.config) | ✓ Matches `borderRadius: "10px"` | — |
| B4 | 52 | `bg-[#F0FAFF]` | ✓ Matches | — |
| B5 | 52 | `min-w-[340px]` | ✓ Matches xs/sm/md | — |
| B6 | 53 | `px-5 py-12 sm:py-[50px] md:py-[70px] lg:min-w-[420px] lg:py-[100px]` | **`px-0`** (MUI has NO horizontal padding — the `paddingX: "20px"` is commented out). `py-12` ≈ 48px, MUI is `48px` ✓. `sm:py-[50px]`, `md:py-[70px]`, `lg:py-[100px]` ✓. `lg:min-w-[420px]` ✓. **Remove `px-5`** | **major** |
| B7 | 54 | `shadow-[0px_-3px_8px_0px_#009BF526_inset,0px_2px_1px_0px_#0000000D]` | ✓ Matches exactly | — |
| B8 | 59 | `absolute -top-[50px] z-10 flex items-center justify-center rounded-full bg-white` | ✓ Matches | — |
| B9 | 60 | `h-[85px] w-[85px] sm:h-[95px] sm:w-[95px] md:h-[100px] md:w-[100px] lg:h-[115px] lg:w-[115px]` | ✓ Matches all four breakpoints | — |
| B10 | 61 | `shadow-[0px_-2px_4px_0px_#0000005C_inset,0px_4px_12.6px_0px_#009BF526]` | ✓ Matches | — |
| B11 | 64 | `h-[30px] w-[35px] text-[#009BF5]` | ✓ Matches — MUI SVG is `width: 35px, height: 30px` (w-35 / h-30, port is correct: `w-[35px] h-[30px]`) | — |
| B12 | 66-68 | `<h3 className="mb-[22px] text-center text-[35px] font-medium leading-[35px] sm:text-[30px] sm:leading-[35px] md:text-[35px] md:leading-[35px] lg:text-[35px] lg:leading-[33px]">` | ✓ Matches `styles.heading`: 35/30/35/35 px with 35/35/35/33 lh, fontWeight 500, mb 22px | — |
| B13 | 69 | `isRTL ? "font-arabic" : "font-heading"` | ✓ Acceptable — MUI uses `leagueSpartan.className` for EN. For AR, the port adds `font-arabic` which is correct project convention. | — |
| B14 | 74-78 | `<p className="text-center text-[18px] font-normal leading-[27px] sm:text-[22px] sm:leading-[23px] md:text-[25px] md:leading-[23px] lg:text-[25px] lg:leading-[23px]">` | ✓ Matches `styles.dec`: 18/22/25/25 with 27/23/23/23 lh, fontWeight 400 | — |
| B15 | 77 | `isRTL ? "font-arabic" : "font-heading"` | ✓ Port reuses leagueSpartan for EN; font-arabic for AR. Note MUI `.dec` also uses `leagueSpartan.className`. | — |
| B16 | (missing) | No `xl`/`xxl` paddingY override | MUI has `xl: "100px", xxl: "100px"` — same as `lg`, so the port doesn't need an explicit `xl:` class. ✓ | — |
| B17 | (missing in port) | `<Icon>` uses lucide-react icons (Mail/Phone/MapPin) | MUI uses `EmailOutlinedIcon`, `LocalPhoneOutlinedIcon`, `PlaceOutlinedIcon` from `@mui/icons-material`. Lucide icons render visually similar but **glyph differs**. Acceptable for the port given the no-MUI rule, but document the divergence. | **minor (intentional)** |

**Total real bugs: 1 (B6 — remove `px-5`).** Everything else is a 1:1 translation or an intentional library swap.

---

## §3 Corrected Tailwind classNames

Only one element needs editing.

### Element: `InfoBox` root `<div>` (line 51-55)

| From | To |
|---|---|
| `"relative mt-[70px] flex min-w-[340px] flex-col items-center justify-center rounded-md bg-[#F0FAFF]"` | (unchanged) |
| `"px-5 py-12 sm:py-[50px] md:py-[70px] lg:min-w-[420px] lg:py-[100px]"` | **`"py-12 sm:py-[50px] md:py-[70px] lg:min-w-[420px] lg:py-[100px]"`** (drop `px-5`) |
| `"shadow-[0px_-3px_8px_0px_#009BF526_inset,0px_2px_1px_0px_#0000000D]"` | (unchanged) |

### Rationale

MUI commented out `paddingX: "20px"`, so the card has no horizontal padding. The text wraps based on `minWidth` (340px / 420px) only. Adding `px-5` (20px each side) pulls inner content inward and shifts the text-to-edge ratio — the icon-overlap composition reads differently when the card has padding vs. doesn't.

---

## §4 Verification at 4 widths

| Width | Expected behavior |
|---|---|
| **375px** (iPhone SE) | Cards stack 1-up (flex-wrap). Card `min-w-[340px]` → almost full-width minus the 24px outer page padding. Card `py-12` (48px). Icon circle 85×85 sitting half above the card top edge. Heading `35px / lh 35px` font-medium, centered. Description `18px / lh 27px`. `mt-[70px]` between adjacent cards. |
| **768px** (iPad Mini) | Cards still stack 1-up (no `flex-row` until natural wrap fits 2 cards × 340px+gap = 696px+gap, which **just** fits at 768px minus gutters — likely one row of 2, then wrap to a 3rd). At sm: card `py-[50px]`, icon `95×95`, heading still `30px / lh 35px` (sm breakpoint shrinks heading), dec `22px / lh 23px`. |
| **1280px** (Laptop) | Cards fit 3-up at lg: each min-w 420px × 3 = 1260px + gap = fits. Card `py-[100px]` (tall), icon `115×115`, heading `35px / lh 33px`, dec `25px / lh 23px`. |
| **1920px** (Desktop) | Same as 1280px (no further breakpoint override). 3-up row, cards centered by `justify-center` on the wrap container. |

The card composition relies on the icon's `-top-[50px]` offset, which is consistent at all widths.

---

## §5 RTL notes

- `<Grid container dir="rtl">` in the AR MUI source has no Tailwind equivalent at the component root — RTL is handled globally via `<html dir="rtl">` in the layout (Tailwind's `start-*`/`end-*`/`ms-*`/`me-*` utilities then mirror automatically).
- Both EN and AR cards use **`textAlign: "center"`** on heading/dec — no directional flip needed.
- Both EN and AR icons sit centered above the card — no directional flip.
- Font swap: EN uses `font-heading` (League Spartan) for heading and dec; AR must use `font-arabic` (Noto Sans Arabic / Cairo). The Tailwind port already does this via `isRTL ? "font-arabic" : "font-heading"`. ✓
- The MUI AR variant adds `textAlign: "center"` explicitly on heading/dec; EN omits it (defaults to inherited). Both render centered — no port action.

---

## §6 Things to leave alone

- The lucide-react icon swap (Mail / Phone / MapPin) — Tailwind side already removed MUI icons. Don't restore.
- The `font-arabic` / `font-heading` ternary — matches project convention.
- The use of `cn()` — preserve.
- Inner SVG `h-[30px] w-[35px]` — looks transposed but matches MUI's literal `width: 35px, height: 30px`.
