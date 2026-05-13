# Component — `Hero` (testimonials)

Page hero on `/testimonials` (and `/ar/testimonials`). Headline with a green accent word and a decorative "lines" image floating over the accent, a one-line subtitle, then a contained "View More" CTA + a text "Write A Review" CTA.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\testimonials\hero.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\testimonials\hero.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\testimonials\ar-hero.tsx` (LTR port reuses the same file via i18n) |

---

## §1 MUI source — extracted properties

### Layout tree

```
div (style={{ width: "100%" }})
├── Typography component="h1" variant="h1" sx={styles.heading}
│   ├── "Our Verified " <br/> "Reviews from "
│   ├── Typography variant="h1" sx={styles.expertText} ──→ "Students "  (inline, green, with ::before lines image)
│   └── " and Parents"
├── Typography component="p" variant="body2" sx={styles.desc}
│   └── "Trusted by parents, students, and schools"
└── Box (CTA wrapper)
    ├── Button variant="contained" sx={styles.containedBtn} ──→ "View More"
    └── Button variant="text"      sx={styles.textBtn}      ──→ "Write A Review"
```

### Dimensions & spacing

| Element | Property | Mobile (xs) | Tablet (sm/md) | Desktop (lg) |
|---|---|---|---|---|
| `h1.heading` | `marginTop` | `"3vh"` | `"3vh"` | `"3vh"` (xs cascade only) |
| `h1.heading` | `width` | 100% (default) | 100% | `"90%"` |
| `h1.heading` | `textAlign` | `"center"` | `"center"` | `"start"` |
| `span.expertText::before` | `top` | `"-2.5vh"` | `"-2.5vh"` | `"-3vh"` |
| `span.expertText::before` | `right` | `0` | `0` | `0` |
| `span.expertText::before` | `height` | `"1.9vh"` | `"1.9vh"` (sm), `"4.3vh"` (md) | `"4.3vh"` |
| `span.expertText::before` | `width` | `"2vh"` | `"2vh"` (sm), `"4.3vh"` (md) | `"4.3vh"` |
| `span.expertText::before` | `background-image` | `linesMobile.png` | `linesMobile.png` (sm), `lines.png` (md) | `lines.png` |
| `p.desc` | `marginTop` | `"3vh"` | `"3vh"` | `"1vh"` |
| `p.desc` | `paddingX` | `"2vh"` | `"2vh"` | `0` |
| `p.desc` | `textAlign` | `"center"` | `"center"` | `"start"` |
| CTA `Box` wrapper | `width` | `"100%"` | `"100%"` | `"70%"` |
| CTA `Box` wrapper | `marginTop` | `"3vh"` | `"3vh"` | `"9vh"` |
| CTA `Box` wrapper | `marginBottom` | (none) | (none) | `"19vh"` |
| CTA `Box` wrapper | `display` | `"flex"` | `"flex"` | `"block"` |
| CTA `Box` wrapper | `justifyContent` | `"center"` | `"center"` | `"center"` |
| CTA `Box` wrapper | `alignItems` | `"center"` | `"center"` | `"center"` |
| `containedBtn` | `width` | `"50%"` | `"50%"` | `"50%"` |
| `containedBtn` | `padding` | `"2vh"` | `"2vh"` | `"2vh"` |
| `containedBtn` | `borderRadius` | `"1vh"` | `"1vh"` | `"1vh"` |
| `containedBtn` | `boxShadow` | `"0.5vh 0.5vh 2.5vh 0px #38B6FFB2"` | same | same |
| `containedBtn` | `backgroundColor` | `"#38B6FF"` | same | same |
| `containedBtn` | `letterSpacing` | `"-2%"` | same | same |
| `containedBtn` | `textTransform` | `"none"` | same | same |
| `textBtn` | `width` | `"50%"` | `"50%"` | `"50%"` |
| `textBtn` | `padding` | `"2vh"` | `"2vh"` | `"2vh"` |
| `textBtn` | `color` | `"rgba(56, 182, 255, 1)"` | same | same |
| `textBtn` | `textTransform` | `"none"` | same | same |

### Typography

| Element | MUI variant | Mobile | Tablet | Desktop | Weight | Color | Font |
|---|---|---|---|---|---|---|---|
| `h1.heading` | `variant="h1"` | 1.75rem (28px) | 2.25rem (36px) | 3rem (48px) | 700 (theme) | `#000000` | League Spartan |
| `span.expertText` | `variant="h1"` (inline) | same as h1 | same | same | 700 | `#51B893` | League Spartan |
| `p.desc` | `variant="body2"` | 14px | 14px | 14px | 400 (theme) | `#000000` | League Spartan |
| `Button` containedBtn | MUI Button label | 15px | 16px | 16px | 700 | white (contrast) | League Spartan |
| `Button` textBtn | MUI Button label | 15px | 16px | 16px | 700 | `rgba(56,182,255,1)` | League Spartan |

> The MUI source has the explicit `fontSize`/`lineHeight` `sx` keys **commented out** for both heading + desc. MUI falls back to the theme's `h1`/`body2` cascade (28/36/48 and 14 respectively). Use the standard Tailwind typography triplet.

### Colors

| Hex / rgba | Tailwind token |
|---|---|
| `#000000` | `text-black` |
| `#51B893` (accent "Students") | `text-success` |
| `#38B6FF` (contained button bg) | `bg-brand-500` |
| `rgba(56, 182, 255, 1)` (text button color) | `text-brand-500` |
| `#38B6FFB2` (button shadow, ~70% alpha) | preserve via `shadow-[0.5vh_0.5vh_2.5vh_0px_#38B6FFB2]` |

### Animations / interactions

- `containedBtn:hover` — keeps the same `boxShadow`, same `padding: 2vh`, same `borderRadius`. **No** color/transform change. Equivalent: `hover:bg-brand-500` (no-op style preservation).
- `textBtn:hover` — only sets `fontWeight: 700` and `padding: 2vh`. No transform, no background. Equivalent: `hover:font-bold`.

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected (per MUI) | Severity |
|---|---|---|---|---|
| B1 | 17 | `text-h1-mobile sm:text-h1-tablet lg:w-[90%] lg:text-start lg:text-h1` — `lg:w-[90%]` is on the **typography** prefix track but missing the `text-` cascade | Reorder so width/align classes don't collide with the typography triplet: `mt-[3vh] text-center text-black font-heading text-h1-mobile sm:text-h1-tablet lg:text-h1 lg:w-[90%] lg:text-start` (works as-is; cosmetic only) | Low |
| B2 | 17 | Heading lacks `text-black` order — currently trails after `lg:text-h1`. Tailwind merge order is fine but inconsistent with project convention. | Move `text-black` before the typography triplet | Low |
| B3 | 26, 32 | Decorative image uses `md:hidden` / `md:block` to swap `linesMobile` ↔ `lines` | MUI swaps at **md (900px)**: `xs/sm` show `linesMobile`, `md/lg` show `lines`. Current is correct. | OK ✓ |
| B4 | 26 | `linesMobile` image: `h-[1.9vh] w-[2vh]` only — no `sm:` variant | MUI also has `sm: "1.9vh"`/`"2vh"` (same as xs); no change needed. | OK ✓ |
| B5 | 32 | `lines` (md+) image: only `h-[4.3vh] w-[4.3vh]` set | Matches MUI's md/lg `4.3vh`. | OK ✓ |
| B6 | 38 | Description uses `font-heading text-small` (14px) | ✓ Matches MUI `variant="body2"` = 14px = `text-small`. | OK ✓ |
| B7 | 38 | Description colour is `text-black` but **trailing** | ✓ Fine. | OK ✓ |
| B8 | 42 | CTA wrapper: `mt-[3vh] flex w-full items-center justify-center lg:mt-[9vh] lg:mb-[19vh] lg:block lg:w-[70%]` | ✓ Correct triplet. | OK ✓ |
| B9 | 46 | View More Button: `w-1/2 rounded-[1vh] px-0 py-[2vh] shadow-[0.5vh_0.5vh_2.5vh_0px_#38B6FFB2]` | MUI `padding: "2vh"` is **both x and y**. Current `px-0 py-[2vh]` zeroes the horizontal. Use `p-[2vh]`. **Also missing `bg-brand-500`** — the `variant="primary"` may inject it but verify the Button component default. Also missing `text-button-mobile sm:text-button` triplet and `font-bold`, `tracking-[-0.02em]` (letterSpacing -2%), `normal-case` (textTransform none). | High |
| B10 | 46 | View More: no explicit `text-white` | MUI Contained Button → white text by default. Confirm `variant="primary"` injects it; if not, add `!text-white`. | Medium |
| B11 | 50 | Write A Review Button: `w-1/2 px-0 py-[2vh] text-brand-500` | Same `p-[2vh]` issue (should be `p-[2vh]`, not `px-0 py-[2vh]`). Missing `font-bold tracking-[-0.02em] normal-case`. `hover:font-bold` for the MUI text-btn hover quirk. | Medium |
| B12 | 17 | `<h1>` wraps the entire title including the green span. The Span itself omits `font-bold` even though MUI `expertText` is an inline `variant="h1"` (bold by theme). | Add `font-bold` to the span (or rely on parent `text-h1` weight inheritance — Tailwind triplets include weight, but `text-success` reset can drop weight depending on config). Safer: `<span className="relative inline font-bold text-success">`. | Low |
| B13 | 32 | The `lines` image desktop variant uses `-top-[3vh]` via `md:block` but is also given `-top-[2.5vh]` only at xs by being a separate element. The MUI sets `top: { xs: "-2.5vh", lg: "-3vh" }` on the **single** ::before. Current implementation correctly uses two `<Image>` elements with different `-top-*`. | ✓ Acceptable. | OK ✓ |
| B14 | n/a | No CTA wrapper `gap` between the two buttons | MUI doesn't set a gap; buttons fit side-by-side via `width: 50%` each. Current matches. | OK ✓ |
| B15 | 42 | `lg:block` collapses the flex on desktop — buttons stack vertically. | ✓ Matches MUI `display: { lg: "block" }`. | OK ✓ |
| B16 | 17 | h1 missing `font-bold` explicit weight | The `text-h1` token already encodes weight 700; but `text-h1-mobile`/`text-h1-tablet` may not. Verify in `tailwind.config.ts`; if any of the triplet drops weight, append `font-bold`. | Low |

---

## §3 Corrected Tailwind classNames

```tsx
return (
  <div className="w-full">
    <h1 className="mt-[3vh] text-center text-black font-heading text-h1-mobile sm:text-h1-tablet lg:text-h1 lg:w-[90%] lg:text-start">
      {t("testimonials.hero.heading_line_1")} <br />
      {t("testimonials.hero.heading_line_2_lead")}
      <span className="relative inline font-bold text-success">
        {t("testimonials.hero.heading_line_2_accent")}
        <Image
          src={linesMobile}
          alt=""
          aria-hidden="true"
          className="absolute end-0 -top-[2.5vh] z-10 h-[1.9vh] w-[2vh] object-contain md:hidden"
        />
        <Image
          src={lines}
          alt=""
          aria-hidden="true"
          className="absolute end-0 -top-[3vh] z-10 hidden h-[4.3vh] w-[4.3vh] object-contain md:block"
        />
      </span>
      {tail}
    </h1>

    <p className="mt-[3vh] px-[2vh] text-center font-heading text-small text-black lg:mt-[1vh] lg:px-0 lg:text-start">
      {t("testimonials.hero.description")}
    </p>

    <div className="mt-[3vh] flex w-full items-center justify-center lg:mt-[9vh] lg:mb-[19vh] lg:block lg:w-[70%]">
      <Button
        variant="primary"
        onClick={scrollToTestimonials}
        className="w-1/2 rounded-[1vh] p-[2vh] font-heading text-button-mobile sm:text-button font-bold tracking-[-0.02em] normal-case bg-brand-500 !text-white shadow-[0.5vh_0.5vh_2.5vh_0px_#38B6FFB2] hover:bg-brand-500 hover:shadow-[0.5vh_0.5vh_2.5vh_0px_#38B6FFB2]"
      >
        {t("testimonials.hero.cta_view_more")}
      </Button>
      <Button
        variant="ghost"
        onClick={redirectToTrustpilot}
        className="w-1/2 p-[2vh] font-heading text-button-mobile sm:text-button font-bold tracking-[-0.02em] normal-case text-brand-500 hover:font-bold"
      >
        {t("testimonials.hero.cta_write_review")}
      </Button>
    </div>
  </div>
);
```

### From → To

| From | To |
|---|---|
| `px-0 py-[2vh]` on Buttons | `p-[2vh]` |
| `text-brand-500` only (ghost) | `font-heading text-button-mobile sm:text-button font-bold tracking-[-0.02em] normal-case text-brand-500 hover:font-bold` |
| Primary Button missing bg + text | `bg-brand-500 !text-white font-heading text-button-mobile sm:text-button font-bold tracking-[-0.02em] normal-case` |
| `<span className="relative inline text-success">` | `<span className="relative inline font-bold text-success">` |

---

## §4 Verification at 4 widths

- **375 px** — h1 28px center; description 14px center with 16-ish px horizontal pad (2vh ≈ 16px on a 800vh viewport, varies with device height); buttons flex side-by-side, each 50% wide, centered. Decorative lines image uses `linesMobile` (small variant).
- **768 px** — h1 36px center (tablet token); description 14px center; buttons still flex side-by-side. Still `linesMobile` because md break is at 900.
- **1280 px** — h1 48px left-aligned, width 90%; description 14px left-aligned, no horizontal padding; CTA wrapper is `block` (buttons stack one-on-top of-the-other), wrapper width 70%, marginTop 9vh, marginBottom 19vh. Decorative lines image swaps to `lines.png` (4.3vh × 4.3vh).
- **1920 px** — same as 1280; nothing else changes between lg and xl in this component.

---

## §5 RTL notes

- The MUI variant `ar-hero.tsx` wraps the outer `<div>` with `dir="rtl"`. The accent `::before` flips its anchor from `right: 0` → `left: 0` and `backgroundPosition` from `"end"` → `"start"`.
- In the Tailwind port the decorative image uses `end-0` which is logical-side aware → automatically becomes `right-0` in LTR and `left-0` in RTL. **Correct.**
- `text-center` / `lg:text-start` are logical → also RTL-aware. **Correct.**
- `px-[2vh] lg:px-0` is symmetric, no flip needed. **Correct.**
- Verify the Arabic page renders the accent under the right word; the line-break (`<br />`) sits before the lead text in LTR but the AR source restructures the order ("آراء معتمدة من … طلابنا و … أولياء الأمور"). The i18n key strategy must split heading lines so each language can place the accent independently.
