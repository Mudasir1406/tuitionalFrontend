# Component — `<ArInfo>` (Arabic variant of `<Info>`)

Arabic-language version of the three info cards (Address / Contact / Email) used on `/ar/contact`. In the MUI baseline this is a separate file; in the Tailwind port the same `<Info>` component handles both languages via the `isRTL` flag (see [info.md](./info.md)).

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\contact\ar-info.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\contact\info.tsx` (unified — no separate AR file) |
| EN counterpart | [info.md](./info.md) |

---

## §1 MUI source — extracted properties

The AR file is a clone of `info.tsx` with three differences:
1. `<Grid container dir="rtl">` on the outer Grid.
2. Strings are Arabic: heading "العنوان" / "الاتصال" / "البريد الإلكتروني"; dec "مسجل في دولة الإمارات العربية المتحدة".
3. `styles.heading` and `styles.dec` add explicit **`textAlign: "center"`** (the EN version omits this — both still render centered because of `flexDirection: column` + `alignItems: center` on the parent).

### Layout tree

Identical to `info.tsx`:

```
<Grid container spacing={2} justifyContent="center" dir="rtl">
├── <Grid item> ArInfoBox (heading="العنوان", icon="address")
├── <Grid item> ArInfoBox (heading="الاتصال", icon="phone")
└── <Grid item> ArInfoBox (heading="البريد الإلكتروني", icon="email")

ArInfoBox = same shape as InfoBox (see info.md §1)
```

### Dimensions & spacing

Identical to EN — see [info.md §1 Dimensions table](./info.md). No AR-specific overrides.

### Typography

Same sizes / weights / line-heights as EN. The only AR-specific addition:

| Element | AR-specific property | Value |
|---|---|---|
| `styles.heading` | `textAlign` | `center` (EN omits this; AR adds it explicitly) |
| `styles.dec` | `textAlign` | `center` (EN omits this; AR adds it explicitly) |

**Font**: MUI applies `leagueSpartan.className` even in the AR file (this is a latent MUI issue — League Spartan doesn't render Arabic glyphs well). The Tailwind port corrects this by using `font-arabic` when `isRTL` is true.

### Colors

Identical to EN.

### Animations / interactions

None.

---

## §2 Tailwind port — bug list

The Tailwind side merges EN + AR into a single `info.tsx`. Bugs apply to AR-specific behavior only.

| # | Line | Current Tailwind | Expected for AR | Severity |
|---|---|---|---|---|
| BAR-1 | 21 | `<div className="flex flex-wrap justify-center gap-4">` (no `dir`) | OK — `dir="rtl"` is set globally on `<html>` by the Next.js layout. No per-component `dir` attribute needed. ✓ | — |
| BAR-2 | 67-78 | `isRTL ? "font-arabic" : "font-heading"` | ✓ Correctly substitutes Arabic font when in RTL mode. MUI source bug (using League Spartan for Arabic) is **intentionally not preserved** — the Tailwind port is more correct than MUI here. | — |
| BAR-3 | 66, 74 | `text-center` on heading + dec | ✓ Matches AR explicit `textAlign: "center"` (and matches EN's flex-centered effective alignment). No drift. | — |
| BAR-4 | 22-39 | Heading strings come from `t("contact.info.address_heading")` etc. | Verify the i18n bundle has both EN ("Address" / "Contact" / "Email") and AR ("العنوان" / "الاتصال" / "البريد الإلكتروني"). Out of scope for this spec — assume i18n is wired. | — |
| BAR-5 | 30 | Phone number `+971 56 490 0376` is hardcoded (not translated) | ✓ Matches MUI AR which also hardcodes the same number. Phone numbers are not language-dependent. | — |
| BAR-6 | 36 | Email `hello@tuitionaledu.com` hardcoded | ✓ Matches MUI AR. | — |

**Total AR-specific bugs: 0.** The unified Tailwind component handles AR correctly via `isRTL`.

---

## §3 Corrected Tailwind classNames

No corrections required. The same fix as the EN spec (drop `px-5` — see [info.md §3](./info.md) bug B6) applies to both languages, since it's the same component.

---

## §4 Verification at 4 widths

Test at `/ar/contact` (Arabic locale).

| Width | Expected behavior |
|---|---|
| **375px** | 1-up stacked cards. Heading "العنوان" / "الاتصال" / "البريد الإلكتروني" rendered in Noto Sans Arabic / Cairo, centered, 35px / lh 35px. Dec rendered in same font, 18px / lh 27px. Icon circle centered (no directional swap). `mt-[70px]` between cards. |
| **768px** | 1-up stacked (still). sm typography: heading 30px, dec 22px. Icon `95×95`. |
| **1280px** | 3-up row at lg. Cards `min-w-[420px]`, `py-[100px]`. Icon `115×115`. Heading 35px / lh 33px. Dec 25px / lh 23px. |
| **1920px** | Same as 1280 (no further breakpoint). |

Visual diff vs EN: only the glyph and the font face differ. Layout, colors, shadows, spacing are identical.

---

## §5 RTL notes

- **Document direction**: `<html dir="rtl">` is set by the Next.js layout when the locale is Arabic. The Tailwind utility behavior (`start-*`, `end-*`, `ms-*`, `me-*`, `text-start`, `text-end`) mirrors automatically.
- **No directional content in this component**: the card is column-flex, items are centered. The icon is centered absolutely above the card. So there's nothing to flip — both EN and AR render identically except for the text glyphs.
- **Font override**: `isRTL ? "font-arabic" : "font-heading"` is the correct project pattern. Do not apply `font-arabic` to EN content (it would degrade Latin glyph rendering).
- **No `dir="rtl"` attribute** on the component root — handled by `<html>`. Adding it locally would be redundant.

---

## §6 Things to leave alone

- The single bilingual component (no separate `ar-info.tsx`) — keep merged.
- The hardcoded phone number and email — they don't translate.
- The `lucide-react` icon swap — keep.
- The `font-arabic` / `font-heading` ternary — keep.

---

## §7 Diff from EN

Only meaningful differences when comparing the AR MUI file to the EN MUI file:
1. `dir="rtl"` attribute on outer `<Grid>`.
2. Arabic translated strings.
3. Explicit `textAlign: "center"` in `styles.heading` and `styles.dec` (cosmetic — EN renders centered anyway via flex centering).

No layout, color, spacing, or sizing difference. The Tailwind unified component captures all of this correctly via `isRTL` + i18n keys.
