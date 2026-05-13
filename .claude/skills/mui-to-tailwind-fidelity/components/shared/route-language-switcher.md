# Component — `RouteLanguageSwitcher`

Locale switch that mutates the URL (`/foo` ↔ `/ar/foo`) and triggers a Next.js route push. Renders as the same outlined button used inside the header, but also has a `fullWidth` mode used in the drawer.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\route-language-switcher.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\route-language-switcher.tsx` |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Box.container [+ fullWidth override]>
  └─ <Button variant="outlined" [+ buttonRTL] [+ fullWidth override]>
       {isArabic ? "English" : "عربي"}
     </Button>
```

### Dimensions & spacing (route-language-switcher.tsx:60-95)

**Base button (NOT fullWidth — header mode):**
| Property | Value | Tailwind |
|---|---|---|
| `borderRadius` | `8px` | `rounded-lg` |
| `paddingY` | `1.2vh` | `py-[1.2vh]` |
| `paddingX` | `1.5vw` | `px-[1.5vw]` |
| `fontSize` | `1.5vh` | `text-[1.5vh]` |
| `lineHeight` | `1.84vh` | `leading-[1.84vh]` |
| `fontWeight` | `700` | `font-bold` |
| `minWidth` | `fit-content` | `min-w-fit` |
| `whiteSpace` | `nowrap` | `whitespace-nowrap` |
| `transition` | `none` | `transition-none` |
| `display` | `{ xs: none, lg: flex }` | `hidden lg:flex` |

**fullWidth (drawer mode) overrides:**
| Property | Value | Tailwind |
|---|---|---|
| container `width` | `100%` | `w-full` |
| container `marginX` | `0` | (omit `mx-*`) |
| Button `width` | `100%` | `w-full` |
| Button `height` | `auto` | `h-auto` |
| Button `paddingY` | `1.2vh` | `py-[1.2vh]` |
| Button `fontSize` | `1.1rem` | `text-[1.1rem]` |

**Container (base):**
| Property | Value | Tailwind |
|---|---|---|
| `marginLeft`/`marginRight` | `{ xs: 8px, lg: 12px }` | `mx-2 lg:mx-3` |

### Typography

| Mode | Font-size | Line-height | Weight | Color |
|---|---|---|---|---|
| Header (base) | `1.5vh` | `1.84vh` | `700` | `#38B6FF` |
| Drawer (fullWidth) | `1.1rem` | `1.84vh` | `700` | `#38B6FF` |
| RTL | adds `fontFamily: "'Noto Sans Arabic', sans-serif"` | — | — | — |

### Colors

| Token | Value |
|---|---|
| Border | `#38B6FF` |
| Text | `#38B6FF` |
| Hover bg | `rgba(56,182,255,0.1)` |

### Animations / interactions
- `transition: none` — explicit (MUI Button has its own transitions; this disables them).
- `textTransform: "none"`.
- `display: { xs: none, lg: flex }` — base mode is hidden below 1200 px (only visible in header on desktop).

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| R1 | route-language-switcher.tsx:32 | Uses house `Button` with `variant="outline"` (not `variant="outlined"`) | Verify house outline variant produces brand border. If not, override colors manually. | low |
| R2 | route-language-switcher.tsx:32 | `rounded` (token = 8px in this tailwind config?) | MUI: `borderRadius: 8px` → `rounded-lg`. Confirm config: in tailwind.config.ts `rounded-lg` = 16px usually; here `rounded` default may be different. Should explicitly be `rounded-[8px]` or `rounded-lg` aligned with config. | medium |
| R3 | route-language-switcher.tsx:34 | Base mode: `px-[1.5vw] py-[1.2vh] text-[1.5vh] leading-[1.84vh] h-auto` | Matches MUI base. Missing `hidden lg:flex` visibility — MUI hides this below `lg`! | high |
| R4 | route-language-switcher.tsx:36 | fullWidth: `text-[1.1rem]` | Correct. | none |
| R5 | route-language-switcher.tsx:27 | Container: `flex items-center` + `mx-2 lg:mx-3` (when !fullWidth) | Matches MUI. | none |
| R6 | route-language-switcher.tsx:38 | `isArabic && "font-arabic"` | MUI uses inline `fontFamily: "'Noto Sans Arabic'"` — equivalent. | none |
| R7 | route-language-switcher.tsx:32 | Missing explicit `text-brand-500 border-brand-500 hover:bg-brand-500/10 text-center` (depends on house Button variant default) | MUI: `color: #38B6FF, borderColor: #38B6FF, :hover bg rgba(56,182,255,0.1)` | medium (verify variant) |

---

## §3 Corrected Tailwind classNames

```tsx
<div className={cn("flex items-center", !fullWidth && "mx-2 lg:mx-3", fullWidth && "w-full")}>
  <Button
    variant="outline"
    onClick={handleLanguageSwitch}
    className={cn(
      "rounded-lg font-heading font-bold whitespace-nowrap min-w-fit transition-none",
      "text-brand-500 border-brand-500 hover:bg-brand-500/10 normal-case text-center",
      !fullWidth && [
        "hidden lg:flex", // MUI: display.xs/sm/md = none
        "px-[1.5vw] py-[1.2vh] text-[1.5vh] leading-[1.84vh] h-auto",
      ],
      fullWidth && "w-full h-auto py-[1.2vh] text-[1.1rem] leading-[1.84vh]",
      isArabic && "font-arabic",
    )}
  >
    {isArabic ? "English" : "عربي"}
  </Button>
</div>
```

## §4 Verification at 4 widths

- **375 px / 768 px / 1024 px** (drawer-only): base button is `hidden lg:flex` → NOT visible in header. Drawer mode (fullWidth) shows full-width chip with `py-[1.2vh] text-[1.1rem]`.
- **1280 px / 1920 px**: base mode visible in header → small pill with `text-[1.5vh]` and `min-w-fit`.

## §5 RTL notes

- `font-arabic` swaps the family to `Noto Sans Arabic`.
- Container margins (`mx-2 lg:mx-3`) are symmetric — no flip needed.
- The pathname rewrite (`/ar` prefix add/remove) is the only stateful RTL behavior.
