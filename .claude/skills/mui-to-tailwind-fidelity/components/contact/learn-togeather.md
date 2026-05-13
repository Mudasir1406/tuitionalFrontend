# Component — `<LearnTogeather>`

A banner-style block on `/contact` with two stacked headings ("Let's Learn Together" / "Anywhere & Everywhere"), an absolutely-positioned hat icon, and a globe image. Lives inside a 60vw wide brand-50 panel on desktop.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\contact\learn-togeather.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\contact\learn-togeather.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\contact\ar-learn-togeather.tsx` (see [ar-learn-togeather.md](./ar-learn-togeather.md)) — Tailwind side reuses this component via the `isRTL` flag |

Filename note: the original file is misspelled **`learn-togeather.tsx`** (sic — "togeather" not "together"). **Do not rename it** — imports depend on the misspelling.

---

## §1 MUI source — extracted properties

### Layout tree

```
<Box .contanier>  (flex-wrap, bg #D7F0FF, width 100% / 60vw at lg)
├── <Box .contanierText>  (empty styles object — visual no-op wrapper)
│   ├── <Box .hat>  (absolute, top + left offsets responsive, zIndex 22)
│   │   └── <Image src={hat} width={70} />
│   ├── <Typography variant="h1" component="h1">"Let's Learn Together"</Typography>
│   └── <Typography variant="h2" component="h2" className="text-accent">
│        "Anywhere & Everywhere"
│       </Typography>
└── <Image src={globe} height={100} />
```

### Dimensions & spacing

| Element | Property | xs (<600) | sm (≥600) | md (≥900) | lg (≥1200) |
|---|---|---|---|---|---|
| `.contanier` | `display` | `flex` | — | — | — |
| `.contanier` | `flexWrap` | `wrap` | — | — | — |
| `.contanier` | `textAlign` | `center` | — | — | — |
| `.contanier` | `justifyContent` | `center` | `center` | `center` | **`left`** |
| `.contanier` | `background` | `#D7F0FF` | — | — | — |
| `.contanier` | `width` | `100%` | `100%` | `100%` | **`60vw`** |
| `.contanier` | padding / margin / gap | **none specified** | — | — | — |
| `.hat` | `position` | `absolute` | — | — | — |
| `.hat` | `zIndex` | `22` | — | — | — |
| `.hat` | `left` | `30%` | `30%` | **`33%`** | **`9%`** |
| `.hat` | `top` | `11%` | `11%` | **`22%`** | **`26%`** |
| Hat `<Image>` | `width` | `70px` | — | — | — |
| Globe `<Image>` | `height` | `100px` | — | — | — |

### Typography

| Element | MUI variant | Mobile (<600) | Tablet (600-1199) | Desktop (≥1200) | Weight | Color | Font |
|---|---|---|---|---|---|---|---|
| "Let's Learn Together" `<h1>` | `variant="h1"` | `1.75rem` (28px) | `2.25rem` (36px) | `3rem` (48px) | 700 | inherits (default ink) | `font-heading` |
| "Anywhere & Everywhere" `<h2>` | `variant="h2"`, `className="text-accent"` | `1.375rem` (22px) | `1.75rem` (28px) | `2.25rem` (36px) | 700 | `.text-accent` global class (resolves to brand accent — check `globals.css`. In this codebase, brand accent = `#38B6FF` / `text-brand-500`) | `font-heading` |
| Both | `textAlign` | `center` (xs) | `center` (sm) | `center` (md) → **`start`** (lg) | | | |
| Both | `position` | `relative` | — | — | — | | |

Commented-out (unused) MUI overrides in the source — **do not port**:
- `fontSize: { xs: 40px, sm: 50px, md: 85px, lg: 85px }`
- `lineHeight: { xs: 50px, sm: 55px, md: 100px, lg: 100px }`
- `fontWeight: 700`

Because those are commented out, the actual rendered sizes come from the MUI `variant="h1"` / `variant="h2"` cascade (see `typographyTokens.ts`).

### Colors

| Value | Token mapping |
|---|---|
| `#D7F0FF` (panel background) | `bg-brand-50` |
| `.text-accent` class | Global class. In this codebase resolves to brand accent. Use `text-brand-500` in the Tailwind port. |

### Animations / interactions

None.

---

## §2 Tailwind port — bug list

Comparing `tuitionalFrontend\src\components\contact\learn-togeather.tsx` line-by-line against §1.

| # | Line | Current Tailwind | Expected (per MUI) | Severity |
|---|---|---|---|---|
| B1 | 14 | `relative flex w-full flex-wrap justify-center bg-brand-50 lg:w-[60vw] lg:justify-start` | ✓ Matches: `flex flex-wrap`, `bg #D7F0FF` → `bg-brand-50`, `width: 100% / lg: 60vw`, `justifyContent: center / lg: left` → `justify-center lg:justify-start`. The `relative` added is OK (parent for absolute hat). | — |
| B2 | 14 | (missing) `textAlign: center` on the container | MUI sets `textAlign: "center"` at the container level. Tailwind port omits a global `text-center` and instead puts it per-heading (acceptable; identical rendered effect). | minor (acceptable) |
| B3 | 15 | `<div>` wrapper (no className) | Matches MUI's empty `.contanierText` Box. ✓ | — |
| B4 | 16 | `absolute z-[22] start-[30%] top-[11%] md:start-[33%] md:top-[22%] lg:start-[9%] lg:top-[26%]` | Almost ✓ but MUI uses `left` (LTR-only), not the logical `start`. **For the EN component**, `left-[30%]` is more accurate to MUI source. The AR variant uses `right-[30%]` etc. Since the port uses a single component with `start-*` (logical), behavior matches MUI's two-file split — keep `start-*`. ✓ acceptable | — |
| B5 | 16 | (no sm prefix specified) `md:start-[33%]` jumps from xs to md | MUI: `left: { xs: "30%", md: "33%", lg: "9%" }` — same gap (no sm override). ✓ Matches | — |
| B6 | 17 | `<Image src={hat} width={70} />` | ✓ Matches MUI `width={70}` | — |
| B7 | 19-24 | `<h1 className={cn("relative text-h1-mobile sm:text-h1-tablet lg:text-h1 text-center lg:text-start", isRTL ? "font-arabic" : "font-heading")}>` | ✓ Correct triplet for `variant="h1"`. `text-center lg:text-start` matches `textAlign: { xs/sm/md: center, lg: start }`. ✓ | — |
| B8 | 27-32 | `<h2 className={cn("relative text-h2-mobile sm:text-h2-tablet lg:text-h2 text-center lg:text-start text-brand-500", ...)}>` | ✓ Correct triplet for `variant="h2"`. `text-brand-500` correctly resolves the `.text-accent` MUI global class. `text-center lg:text-start` matches. ✓ | — |
| B9 | 37 | `<Image src={globe} priority height={100} />` | ✓ Matches MUI `height={100}` | — |
| B10 | (missing) | No `priority` prop on hat? | MUI: `<Image src={hat} alt="hat" priority width={70} />`. Tailwind port (line 17): `<Image src={hat} alt="hat" priority width={70} />` — ✓ matches | — |
| B11 | (missing) | No row/column gap | MUI specifies none → none needed. ✓ | — |

**Total real bugs: 0.** Port is faithful. Minor stylistic notes:
- The use of `start-*` instead of `left-*` is the project's preferred RTL-safe convention; matches behavior with the AR file's `right-*`.
- Single bilingual component replaces MUI's two-file split (EN + AR) — this is a port-level refactor, not a bug.

---

## §3 Corrected Tailwind classNames

No corrections required. The current port is faithful to the MUI source.

---

## §4 Verification at 4 widths

| Width | Expected behavior |
|---|---|
| **375px** (iPhone SE) | Panel full-width (`w-full`). Content centers (`justify-center`, headings `text-center`). Hat absolutely positioned at `start-[30%] top-[11%]`. Globe wraps below headings (flex-wrap kicks in). h1 = `28px`, h2 = `22px`. |
| **768px** (iPad Mini) | Same as 375 but typography upgrades at sm: h1 = `36px`, h2 = `28px`. Hat still at xs/sm position `start-[30%] top-[11%]` (no sm override in MUI). |
| **1280px** (Laptop) | Panel becomes `w-[60vw]` (≈768px wide), `justify-start`. Headings switch to `text-start` (left-aligned). Hat repositions to `start-[9%] top-[26%]`. Globe sits on the right side of the panel (since the parent is now constrained to 60vw, the flex-wrap behavior changes — both children fit on one row). h1 = `48px`, h2 = `36px`. |
| **1920px** (Desktop) | Same as 1280 (no further override). Panel = 60vw ≈ 1152px wide, content left-aligned. |

---

## §5 RTL notes

- The AR MUI variant flips: `justifyContent: { xs: center, lg: right }` and hat `right: { xs: "30%", md: "33%", lg: "9%" }` (instead of `left`). On the Tailwind side, **`justify-start`** under `dir="rtl"` automatically becomes "start on the right" — this is what `start-*` and `lg:justify-start` give us.
- Hat `start-[30%] / start-[33%] / start-[9%]` correctly mirrors to `right` offsets when `dir="rtl"`.
- AR variant's heading 2 color is `rgba(56, 182, 255, 1)` = `#38B6FF` = `text-brand-500`. EN variant uses the global `.text-accent` class which also resolves to brand-500. Both paths converge on `text-brand-500` in the port. ✓
- AR uses `font-arabic` (Noto Sans Arabic / Cairo). Port handles via `isRTL ? "font-arabic" : "font-heading"`. ✓
- The MUI EN file used `<h1>` and `<h2>` semantics; MUI AR file used `<h1>` for **both** headings (likely a bug in the AR source). The Tailwind port keeps `<h1>` + `<h2>` for both languages — semantically correct.

---

## §6 Things to leave alone

- The misspelled filename `learn-togeather.tsx` — **never rename**. Imports depend on it.
- The `font-arabic` / `font-heading` ternary — project convention.
- The merged EN/AR component — do not split back into two files.
- The use of `start-*` / `text-start` over `left-*` / `text-left` — RTL-safe.
- The `priority` prop on both images — matches MUI source.
