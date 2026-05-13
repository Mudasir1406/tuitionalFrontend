# Component — `LanguageSwitcher`

In-place locale toggle that flips `useI18n().locale` between `en` and `ar` without changing the route. Single outlined button. Used inside the header where the route already encodes the language separately.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\language-switcher.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\language-switcher.tsx` |
| Related | `route-language-switcher.tsx` (the routed variant — uses `/ar` URL prefix) |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Box.container>
  └─ <Button variant="outlined" onClick={toggleLanguage} className={leagueSpartan.className}>
       {locale === 'en' ? 'عربي' : 'English'}
     </Button>
```

### Dimensions & spacing (language-switcher.tsx:30-53)

| Element | Property | Value | Tailwind |
|---|---|---|---|
| container | `marginLeft` | `{ xs: 8px, lg: 12px }` | `ms-2 lg:ms-3` |
| container | `marginRight` | `{ xs: 8px, lg: 12px }` | `me-2 lg:me-3` |
| Button | `minWidth` | `70px` | `min-w-[70px]` |
| Button | `height` | `35px` | `h-[35px]` |
| Button | `borderRadius` | `8px` | `rounded-lg` |

### Typography

| Element | `fontSize` | Weight | LH | Color | Font |
|---|---|---|---|---|---|
| Button label | `14px` (`text-sm`) | `600` | default | `#38B6FF` | `leagueSpartan` (LTR) / `'Noto Sans Arabic'` (RTL via `buttonRTL` style) |

### Colors

| Token | Value |
|---|---|
| Border | `#38B6FF` (brand-500) |
| Text | `#38B6FF` |
| Hover bg | `rgba(56,182,255,0.1)` |
| Hover border | `#38B6FF` |

### Animations / interactions
- `textTransform: "none"` — preserves Arabic casing.
- Hover background `rgba(56,182,255,0.1)`.

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| L1 | language-switcher.tsx:14 | `mx-2 lg:mx-3` (shorthand) | MUI sets BOTH `marginLeft` AND `marginRight` to the same values — `mx-*` is correct logical equivalent, but losing RTL `ms/me` distinction is fine because values match. No bug. | none |
| L2 | language-switcher.tsx:18 | `px-3` | MUI has no horizontal padding; relies on `min-w-[70px]` for size. The extra `px-3` widens beyond 70px when label is "English" (~57 px chars). Acceptable visual, but drift from MUI. | low |
| L3 | language-switcher.tsx:18 | `transition` (default tw transitions) | MUI button has no explicit transition; MUI default ripple/hover. Acceptable. | none |
| L4 | language-switcher.tsx:18 | `hover:bg-brand-500/10` | MUI: `:hover { backgroundColor: rgba(56,182,255,0.1) }` — equivalent. | none |
| L5 | language-switcher.tsx:18 | Missing `text-center` | MUI inherits MUI Button's center alignment. Tailwind `<button>` text-aligns left by default — add `text-center` for parity. | low |
| L6 | language-switcher.tsx:18 | `font-semibold` | MUI: `fontWeight: 600` → `font-semibold`. Correct. | none |
| L7 | language-switcher.tsx:18 | `normal-case` | MUI: `textTransform: "none"`. Correct. | none |

---

## §3 Corrected Tailwind classNames

```tsx
<div className="flex items-center mx-2 lg:mx-3">
  <button
    type="button"
    onClick={toggleLanguage}
    className={cn(
      leagueSpartan.className,
      isRTL && "font-arabic",
      "h-[35px] min-w-[70px] rounded-lg border border-brand-500",
      "text-sm font-semibold normal-case text-center text-brand-500",
      "hover:bg-brand-500/10 hover:border-brand-500"
    )}
  >
    {locale === "en" ? "عربي" : "English"}
  </button>
</div>
```

## §4 Verification at 4 widths

- **375 px / 768 px**: `mx-2` = 8 px gutter; chip ~70 px wide × 35 px tall.
- **1280 px / 1920 px**: `lg:mx-3` = 12 px gutter; same chip size.

## §5 RTL notes

- MUI `buttonRTL` sets `fontFamily: "'Noto Sans Arabic', sans-serif"` — the port adds `font-arabic` conditionally. Both are valid.
- No flip needed (single button, no row layout).
- Symmetric margins (`mx-*`) work in both directions.
