# Page — `/thank-you`

Post-registration confirmation page. Centered logo, headline ("You're All Set!"), sub-headline, optional add-on paragraph, single "View Testimonials" CTA. Min-full-height (`100vh`), pale-gray background (`#f8f9fa`). `robots: { index: false, follow: false }` (excluded from search indexes).

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\app\thank-you\page.tsx` |
| Tailwind port | `tuitionalFrontend\src\app\thank-you\page.tsx` |
| Arabic variant | (none — copy is hard-coded English) |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Box sx={styles.pageContainer}>                       // min-h-100vh, bg #f8f9fa, flex col
  <Box sx={styles.contentContainer}>                  // flex 1, centered col, max-w 800, mx auto
    <Box sx={styles.logoContainer}>                   // mb-3rem (48px)
      <Image src={logo.src} alt="Tuitional Logo"
             width={300} height={73}
             style={styles.logoImage}                  // w-auto, h-60px, object-contain
             priority />
    </Box>
    <Typography variant="h1"                          // headline: 2/2.5/3rem at xs/sm/md
                sx={styles.headline}
                className={leagueSpartan.className}>
      ✅ You're All Set! Thanks for Registering.
    </Typography>
    <Typography variant="h2"                          // sub-headline: 1.2/1.4/1.6rem
                sx={styles.subHeadline}
                className={leagueSpartan.className}>
      Our team will contact you shortly. 🎉
    </Typography>
    <Typography variant="body1"                        // add-on text: 1/1.1/1.2rem
                sx={styles.addOnText}
                className={leagueSpartan.className}>
      While you wait, check our Testimonials page for past experiences. ☺️
    </Typography>
    <Box sx={styles.buttonContainer}>                  // flex col→row at sm, gap 1rem
      <Link href="/testimonials" style={styles.linkStyle}>
        <Button variant="contained"
                sx={styles.primaryButton}
                className={leagueSpartan.className}>
          View Testimonials
        </Button>
      </Link>
    </Box>
  </Box>
</Box>
```

### Dimensions & spacing

| Element | Property | Mobile (xs <600) | Tablet (sm 600-899) | Desktop (md ≥900) |
|---|---|---|---|---|
| `pageContainer` | `min-height` | `100vh` | `100vh` | `100vh` |
| `pageContainer` | `background-color` | `#f8f9fa` | `#f8f9fa` | `#f8f9fa` |
| `pageContainer` | `display` / `flex-direction` | `flex` / `column` | (same) | (same) |
| `contentContainer` | `flex` | `1` | `1` | `1` |
| `contentContainer` | `padding` | `2rem` (32px) | `2rem` | `2rem` |
| `contentContainer` | `padding-top` | `120px` | `120px` | `120px` |
| `contentContainer` | `max-width` | `800px` | `800px` | `800px` |
| `contentContainer` | `margin` | `0 auto` | `0 auto` | `0 auto` |
| `contentContainer` | `text-align` | `center` | `center` | `center` |
| `contentContainer` | `justify-content` / `align-items` | `center` / `center` | (same) | (same) |
| `logoContainer` | `margin-bottom` | `3rem` (48px) | `3rem` | `3rem` |
| `logoImage` (inline `style`) | `width` | `auto` | `auto` | `auto` |
| `logoImage` | `height` | `60px` | `60px` | `60px` |
| `logoImage` | `object-fit` | `contain` | `contain` | `contain` |
| `headline` | `font-size` | **`2rem`** (32px) | **`2.5rem`** (40px) | **`3rem`** (48px) |
| `headline` | `font-weight` | `700` | `700` | `700` |
| `headline` | `color` | `#2c3e50` | `#2c3e50` | `#2c3e50` |
| `headline` | `margin-bottom` | `1.5rem` (24px) | `1.5rem` | `1.5rem` |
| `headline` | `line-height` | `1.2` | `1.2` | `1.2` |
| `subHeadline` | `font-size` | **`1.2rem`** (19.2px) | **`1.4rem`** (22.4px) | **`1.6rem`** (25.6px) |
| `subHeadline` | `font-weight` | `500` | `500` | `500` |
| `subHeadline` | `color` | `#34495e` | `#34495e` | `#34495e` |
| `subHeadline` | `margin-bottom` | `2rem` (32px) | `2rem` | `2rem` |
| `subHeadline` | `line-height` | `1.4` | `1.4` | `1.4` |
| `addOnText` | `font-size` | **`1rem`** (16px) | **`1.1rem`** (17.6px) | **`1.2rem`** (19.2px) |
| `addOnText` | `font-weight` | `400` | `400` | `400` |
| `addOnText` | `color` | `#7f8c8d` | `#7f8c8d` | `#7f8c8d` |
| `addOnText` | `margin-bottom` | `3rem` (48px) | `3rem` | `3rem` |
| `addOnText` | `line-height` | `1.5` | `1.5` | `1.5` |
| `buttonContainer` | `display` | `flex` | `flex` | `flex` |
| `buttonContainer` | `flex-direction` | **`column`** | **`row`** | `row` (inherits sm) |
| `buttonContainer` | `gap` | `1rem` (16px) | `1rem` | `1rem` |
| `buttonContainer` | `align-items` | `center` | `center` | `center` |
| `primaryButton` | `background-color` | `#38B6FF` | `#38B6FF` | `#38B6FF` |
| `primaryButton` | `color` | `white` | `white` | `white` |
| `primaryButton` | `font-weight` | `600` | `600` | `600` |
| `primaryButton` | `font-size` | `1rem` (16px) | `1rem` | `1rem` |
| `primaryButton` | `text-transform` | `none` | `none` | `none` |
| `primaryButton` | `border-radius` | `8px` | `8px` | `8px` |
| `primaryButton` | `padding` | `12px 32px` | `12px 32px` | `12px 32px` |
| `primaryButton` | `min-width` | `200px` | `200px` | `200px` |
| `primaryButton` | `box-shadow` | `0 4px 15px rgba(56, 182, 255, 0.3)` | (same) | (same) |
| `primaryButton:hover` | `background-color` | `#2196F3` | `#2196F3` | `#2196F3` |
| `primaryButton:hover` | `box-shadow` | `0 6px 20px rgba(56, 182, 255, 0.4)` | (same) | (same) |
| `linkStyle` | `text-decoration` | `none` | `none` | `none` |

### Typography

| Element | MUI variant | Mobile | Tablet (sm) | Desktop (md) | Weight | Color | Font family |
|---|---|---|---|---|---|---|---|
| Headline `<h1>` | `variant="h1"` (overridden by `sx.fontSize`) | `2rem` | `2.5rem` | `3rem` | `700` | `#2c3e50` | `leagueSpartan.className` |
| Sub-headline `<h2>` | `variant="h2"` (overridden) | `1.2rem` | `1.4rem` | `1.6rem` | `500` | `#34495e` | `leagueSpartan.className` |
| Add-on `<p>` | `variant="body1"` (overridden) | `1rem` | `1.1rem` | `1.2rem` | `400` | `#7f8c8d` | `leagueSpartan.className` |
| Button "View Testimonials" | `<Button variant="contained">` | `1rem` | `1rem` | `1rem` | `600` | `white` (on `#38B6FF`) | `leagueSpartan.className` |

**Important divergence from project convention:** the MUI source does NOT use the standard typography triplet (`text-h1-mobile sm:text-h1-tablet lg:text-h1`). It defines bespoke `fontSize` objects with `xs/sm/md` keys directly in `sx`. The Tailwind port preserves this — using arbitrary `text-[2rem] sm:text-[2.5rem] md:text-[3rem]`. **This is a deliberate one-off page style** — do not regularize to typography tokens unless the design owner approves a redesign.

### Colors

| Hex | Where | Tailwind class (per 01-token-mapping.md §5) |
|---|---|---|
| `#f8f9fa` (page bg) | `pageContainer.backgroundColor` | `bg-[#f8f9fa]` (no token; closest is none) |
| `#2c3e50` (headline) | `headline.color` | `text-[#2c3e50]` (no token; `text-ink-900` `#2d2d2d` is similar but not identical) |
| `#34495e` (sub-headline) | `subHeadline.color` | `text-[#34495e]` |
| `#7f8c8d` (add-on) | `addOnText.color` | `text-[#7f8c8d]` |
| `#38B6FF` (button bg) | `primaryButton.backgroundColor` | `bg-brand-500` |
| `#2196F3` (button hover bg) | `primaryButton[&:hover].backgroundColor` | `hover:bg-[#2196F3]` (no token — keep arbitrary) |
| `white` (button text) | `primaryButton.color` | `text-white` |

### Animations / interactions

- Button has a `hover` state changing background `#38B6FF → #2196F3` and shadow `0 4px 15px rgba(56,182,255,0.3) → 0 6px 20px rgba(56,182,255,0.4)`. MUI handles this via `sx={{ "&:hover": {...} }}`.
- No transitions explicitly defined — MUI Button has a default ~250ms `background-color` / `box-shadow` transition.

---

## §2 Tailwind port — bug list

The port is structurally identical and uses inline Tailwind classes (no CSS modules). Most values are correct; remaining bugs are minor:

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 17 | `<div className="flex min-h-screen flex-col bg-[#f8f9fa]">` | ✓ Matches `pageContainer { min-height:100vh, background-color:#f8f9fa, display:flex, flex-direction:column }`. | — |
| B2 | 18 | `<div className="mx-auto flex max-w-[800px] flex-1 flex-col items-center justify-center px-4 pt-[120px] text-center sm:px-8">` | MUI uses `padding: '2rem'` (32px all sides) THEN `paddingTop: '120px'` overrides top. The port uses `px-4 pt-[120px]` mobile and `sm:px-8` from `sm`. **Bug:** `px-4` (16px) and `sm:px-8` (32px) — MUI is `2rem = 32px` at ALL breakpoints. There is no `xs:1rem`. The port has shrunk mobile padding to half. Should be `px-8 pt-[120px] pb-8` to match the full `padding: '2rem' + paddingTop: '120px'`. (MUI's vertical bottom padding `2rem` is also missing from the port.) | high |
| B3 | 18 | (missing) `pb-8` (32px bottom) | MUI's `padding: '2rem'` gives `padding-bottom: 32px`. Port has no `pb-*`. Add `pb-8`. | med |
| B4 | 19 | `<div className="mb-12">` logo container | MUI: `marginBottom: '3rem'` = 48px = `mb-12`. ✓ Matches. | — |
| B5 | 20-27 | `<Image className="h-[60px] w-auto object-contain" />` | ✓ Matches `logoImage { width:auto, height:60px, objectFit:contain }`. | — |
| B6 | 30-32 | `<h1 className={`${leagueSpartan.className} mb-6 text-[2rem] font-bold leading-tight text-[#2c3e50] sm:text-[2.5rem] md:text-[3rem]`}>` | MUI: `font-size: {xs:2rem, sm:2.5rem, md:3rem}` ✓. `font-weight:700` → `font-bold` ✓. `color:#2c3e50` ✓. `margin-bottom:1.5rem` (24px) → `mb-6` ✓. `line-height:1.2` → `leading-tight` is **`1.25`** in Tailwind defaults, not `1.2`. Negligible drift (one px on a 48px line) but technically `leading-[1.2]` is exact. | low |
| B7 | 36-38 | `<h2 className={`${leagueSpartan.className} mb-8 text-[1.2rem] font-medium leading-snug text-[#34495e] sm:text-[1.4rem] md:text-[1.6rem]`}>` | MUI: `fontSize {xs:1.2rem, sm:1.4rem, md:1.6rem}` ✓. `font-weight:500` → `font-medium` ✓. `color:#34495e` ✓. `margin-bottom:2rem` (32px) → `mb-8` ✓. `line-height:1.4` → `leading-snug` is **`1.375`** in Tailwind, not `1.4`. Use `leading-[1.4]` for exact. | low |
| B8 | 42-44 | `<p className={`${leagueSpartan.className} mb-12 text-[1rem] leading-relaxed text-[#7f8c8d] sm:text-[1.1rem] md:text-[1.2rem]`}>` | MUI: `fontSize {xs:1rem, sm:1.1rem, md:1.2rem}` ✓. `font-weight:400` → port has no `font-*` class, defaults to body 400 ✓. `color:#7f8c8d` ✓. `margin-bottom:3rem` (48px) → `mb-12` ✓. `line-height:1.5` → `leading-relaxed` is **`1.625`** in Tailwind, not `1.5`. Use `leading-[1.5]` for exact. | low |
| B9 | 48 | `<div className="flex flex-col items-center gap-4 sm:flex-row">` button container | MUI: `flex-direction: {xs:column, sm:row}` ✓. `gap:'1rem'` (16px) → `gap-4` ✓. `align-items:center` ✓. | — |
| B10 | 49 | `<Link href="/testimonials" className="no-underline">` | MUI: `style={styles.linkStyle}` = `{ text-decoration: 'none' }` → `no-underline` ✓. | — |
| B11 | 50-54 | `<button className={`... min-w-[200px] rounded-lg bg-brand-500 px-8 py-3 text-base font-semibold normal-case text-white shadow-[0_4px_15px_rgba(56,182,255,0.3)] transition hover:bg-[#2196F3] hover:shadow-[0_6px_20px_rgba(56,182,255,0.4)]`}>` | MUI `primaryButton`: `min-width:200px` → `min-w-[200px]` ✓. `border-radius:8px` → `rounded-lg` is **`0.5rem` = 8px** ✓. `background-color:#38B6FF` → `bg-brand-500` ✓. `padding:'12px 32px'` → `px-8 py-3` (`px-8` = 32px ✓, `py-3` = 12px ✓). `font-size:1rem` → `text-base` ✓. `font-weight:600` → `font-semibold` ✓. `text-transform:none` → `normal-case` ✓. `color:white` → `text-white` ✓. `box-shadow` ✓. Hover bg ✓. Hover shadow ✓. **`transition`** added by port (MUI inherits default Button transition). ✓ Equivalent. | — |
| B12 | (missing) | Native `<button>` instead of an MUI `<Button>` | Port uses a plain `<button>` (not the project's house Button component). Acceptable — `<Button>` would require importing from a UI library; the project port writes native HTML buttons with Tailwind classes. ✓ | — |

Summary: the port is in **good shape**. The main fix is B2/B3 (page padding) — mobile content edges hug the screen too closely (16px vs 32px on each side). The leading-* drift fixes (B6/B7/B8) are pixel-perfect but visually negligible.

---

## §3 Corrected Tailwind classNames

Apply edits B2, B3, B6, B7, B8 (the rest already match). Key from→to:

```tsx
// Content container (was line 18)
// FROM:
<div className="mx-auto flex max-w-[800px] flex-1 flex-col items-center justify-center px-4 pt-[120px] text-center sm:px-8">
// TO:
<div className="mx-auto flex max-w-[800px] flex-1 flex-col items-center justify-center px-8 pb-8 pt-[120px] text-center">

// Headline (was line 30-31)
// FROM:
className={`${leagueSpartan.className} mb-6 text-[2rem] font-bold leading-tight text-[#2c3e50] sm:text-[2.5rem] md:text-[3rem]`}
// TO:
className={`${leagueSpartan.className} mb-6 text-[2rem] font-bold leading-[1.2] text-[#2c3e50] sm:text-[2.5rem] md:text-[3rem]`}

// Sub-headline (was line 36-37)
// FROM:
className={`${leagueSpartan.className} mb-8 text-[1.2rem] font-medium leading-snug text-[#34495e] sm:text-[1.4rem] md:text-[1.6rem]`}
// TO:
className={`${leagueSpartan.className} mb-8 text-[1.2rem] font-medium leading-[1.4] text-[#34495e] sm:text-[1.4rem] md:text-[1.6rem]`}

// Add-on paragraph (was line 42-43)
// FROM:
className={`${leagueSpartan.className} mb-12 text-[1rem] leading-relaxed text-[#7f8c8d] sm:text-[1.1rem] md:text-[1.2rem]`}
// TO:
className={`${leagueSpartan.className} mb-12 text-[1rem] leading-[1.5] text-[#7f8c8d] sm:text-[1.1rem] md:text-[1.2rem]`}
```

---

## §4 Verification at 4 widths

| Width | What to check |
|---|---|
| **375** (iPhone SE) | Headline `text-[2rem]` (32px). Sub-headline 19.2px. Body 16px. Button stacked above any siblings (`flex-col`). Content padded 32px each side (after B2 fix — currently 16px). Logo 60px tall, top has 120px header offset. |
| **768** (iPad Mini) | Headline jumps to `sm:text-[2.5rem]` (40px). Sub-headline 22.4px. Body 17.6px. Button row now (`sm:flex-row`). |
| **1280** (Laptop S) | Headline `md:text-[3rem]` (48px). Sub-headline 25.6px. Body 19.2px. Layout unchanged from 768. |
| **1920** (Desktop) | Same as 1280 — content capped at `max-w-[800px]`, centered. Page bg `#f8f9fa` shows lots of negative space on both sides. |

Verify the button hover transitions: hover should darken bg from `#38B6FF` to `#2196F3` and deepen the shadow.

---

## §5 RTL notes

- Page copy is **hard-coded English**. No `/ar/thank-you` route exists in the codebase. RTL is not in scope unless localization is added later.
- All layout uses direction-neutral utilities: `flex-col`, `items-center`, `justify-center`, `text-center`, `mx-auto`, `px-*`, `mb-*`, `gap-*`. No `pl-*` / `pr-*` / `ml-*` / `mr-*` — would flip cleanly.
- The emoji prefixes (`✅`, `🎉`, `☺️`) render identically in both LTR and RTL. The "Thanks for Registering" line has the checkmark **before** the text — in RTL, the emoji would appear on the **right** of the line automatically due to bidi handling. No special treatment needed.
- The button uses `text-white` and `bg-brand-500` — both direction-neutral.
- If RTL localization is added: change `text-[#2c3e50]` etc. to neutral tokens (or keep arbitrary), and translate strings via `t.thankYou.headline`. No structural changes required.
