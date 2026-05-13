# Component — `Hero` (About page)

The headline + tagline block that opens the `/about` and `/ar/about` pages. Renders one `<h1>` with an inline accent `<span>` and a paragraph beneath it.

| Side | Path |
|---|---|
| MUI source (nested) | `tuitionalFrontend-mui-baseline\src\components\about\hero\hero.tsx` + `hero\hero.module.css` |
| MUI source (flat duplicate) | `tuitionalFrontend-mui-baseline\src\components\about\hero.tsx` + `styles.module.css` (legacy variant — same DOM, sources from sibling CSS file) |
| Tailwind port | `tuitionalFrontend\src\components\about\hero\hero.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\about\ar-about-hero.tsx` (different file shape — uses `<Box sx>` instead of CSS module; see §5) |

Note: the MUI baseline has **two Hero implementations** — `about/hero.tsx` (flat, uses `styles.module.css`) and `about/hero/hero.tsx` (nested, uses `hero/hero.module.css`). The Tailwind port mirrors the nested folder version, so the nested one is the authoritative source for the LTR English flow.

---

## §1 MUI source — extracted properties

### Layout tree

```
div.heroContainer  (no styles in module — relies on parent layout)
├── Typography.heading.leagueSpartan  (variant="h1", component="h1")
│   └── "Elevating "
│       Typography.expertText.leagueSpartan  (variant="h1", component="span")
│       │   └── "Personalized Online Tutoring"
│       └── " Across the Gulf"
└── Typography.desc.leagueSpartan  (variant="body2")
    └── "Providing high-quality innovative..."
```

### Dimensions & spacing (from `hero/hero.module.css`)

| Element | Property | Mobile (≤576px) | Tablet (768–1199px) | Desktop (≥1200px) |
|---|---|---|---|---|
| `.heroContainer` | (no rules) | — | — | — |
| `.heading` | `margin-top` | `2vh` | `3vh` (base) | `3vh` |
| `.heading` | `margin-bottom` | `3vh` (base) | `3vh` | `3vh` |
| `.heading` | `padding-right` | `2vw` | `2vw` | `2vw` (overridden? No — `2vw` persists) |
| `.heading` | `text-align` | `center` | `center` | `start` |
| `.heading` | `color` | `#000000` | `#000000` | `#000000` |
| `.expertText` | `color` | `#38b6ff` | `#38b6ff` | `#38b6ff` |
| `.expertText` | `display` | `inline` | `inline` | `inline` |
| `.expertText` | `position` | `relative` | `relative` | `relative` |
| `.expertText::before` (decorative line) | `content` | `""` | `""` | `""` |
| `.expertText::before` | `position` | `absolute` | `absolute` | `absolute` |
| `.expertText::before` | `z-index` | `10` | `10` | `10` |
| `.expertText::before` | `background-image` | `linesMobile.png` (mobile) — but defined under `@media (max-width: 576px)` AND `@media (min-width: 768px)` so 577–767 is unstyled | `linesMobile.png` (`min-width: 768px`) | `lines.png` (`min-width: 1200px`) |
| `.expertText::before` | `top` | `-2.5vh` | `-2.5vh` | `-3vh` |
| `.expertText::before` | `height` | `1.9vh` | `1.9vh` | `4.3vh` |
| `.expertText::before` | `width` | `2vh` | `2vh` | `4.3vh` |
| `.expertText::before` | `right` (mobile uses `left`) | `left: -180px` | `right: 0` | `right: 0` |
| `.desc` | `text-align` | `center` (base) | `center` | `start` |
| `.desc` | `padding-left/right` | `2vh` | `2vh` | `0` (both sides) |
| `.desc` | `margin-top` | `3vh` | `3vh` | `1vh` |
| `.desc` | `width` | (not set) | (not set) | `90%` |
| `.desc` | `color` | `#000000` | `#000000` | `#000000` |

### Typography

| Element | MUI variant | Mobile (<600) | Tablet (600–1199) | Desktop (≥1200) | Weight | Color | Font |
|---|---|---|---|---|---|---|---|
| `.heading` (`<h1>`) | `variant="h1"` | 1.75rem (28px) | 2.25rem (36px) | 3rem (48px) | 700 | `#000000` | League Spartan via `leagueSpartan.className` |
| `.expertText` (`<span>`) | `variant="h1"` | inherits h1 sizes (1.75 / 2.25 / 3rem) | inherits | inherits | 700 | `#38b6ff` | League Spartan |
| `.desc` (`<p>` rendered by `<Typography variant="body2">`) | `variant="body2"` | 0.875rem (14px) | 0.875rem | 0.875rem | 400 | `#000000` | League Spartan |

### Colors

| MUI | Tailwind token |
|---|---|
| `#000000` | `text-black` |
| `#38b6ff` | `text-brand-500` |

### Animations / interactions

None. Static text block. Decorative `::before` pseudo-element on the accent span uses a static background image.

---

## §2 Tailwind port — bug list

Current port file: `tuitionalFrontend\src\components\about\hero\hero.tsx` (lines 9–22).

| # | Line | Current Tailwind | Expected (per MUI) | Severity |
|---|---|---|---|---|
| H1 | 10 | `max-h-[700px]` on the root container | Not present in MUI `.heroContainer` (no max-h rule). This came from `ar-about-hero.tsx`'s `<Box sx={styles.hero}>` which is the AR variant — the LTR module CSS has no max-height. **Remove `max-h-[700px]`** OR confirm it's intentional from a parent rule. | low |
| H2 | 11 | `mt-[2vh] ... sm:mt-[3vh] ... md:mt-[4vh]` on the `<h1>` | MUI: only **two** breakpoints — mobile (`max-width: 576px`) sets `margin-top: 2vh`; default is `3vh`. There is **no `4vh` at md**. That `md:mt-[4vh]` value was lifted from `ar-about-hero.tsx`. **Should be `mt-[2vh] sm:mt-[3vh]`** (drop `md:mt-[4vh]`). | medium |
| H3 | 11 | no `mb-[3vh]` on `<h1>` | MUI `.heading` has `margin-bottom: 3vh` at all sizes. **Add `mb-[3vh]`**. | medium |
| H4 | 11 | no `pr-[2vw]` on `<h1>` | MUI `.heading` has `padding-right: 2vw` at all sizes. **Add `pr-[2vw] lg:pr-0`**. | medium |
| H5 | 11 | `lg:w-[90%]` on the `<h1>` | MUI `.heading` has no `width: 90%`; `width: 90%` lives on `.desc` at ≥1200px. **Remove `lg:w-[90%]` from `<h1>` and add `lg:w-[90%]` to `<p>` instead.** | medium |
| H6 | 11 | `font-bold` on `<h1>` | The `text-h1-*` triplet already encodes weight 700 via Tailwind config tuples. **Remove redundant `font-bold`** (cosmetic, no bug, but extra weight). | low |
| H7 | 11 | `text-center ... lg:text-start` | ✓ Matches MUI (`text-align: center` base, `start` at 1200+). Keep. | — |
| H8 | 11 | `text-black` at end of className | ✓ Matches `color: #000000`. Keep. | — |
| H9 | 13 | `<span className="inline font-bold text-brand-500">` (no `relative`) | MUI `.expertText` has `position: relative` so the absolute pseudo-element anchors to it. Add `relative`. **Should be `inline relative font-bold text-brand-500`**. | medium |
| H10 | 13 | no `::before` decorative line on the accent span | MUI has a `.expertText::before` background image (`lines.png` at lg, `linesMobile.png` at mobile/tablet) sized `1.9vh × 2vh` (mobile) → `4.3vh × 4.3vh` (lg), positioned `top: -2.5vh / -3vh`, anchored `right: 0` (lg) or `left: -180px` (mobile). **Add an `<Image>` sibling inside the `<span>` with absolute positioning that mimics the pseudo-element.** See §3 below. | high |
| H11 | 18 | `mt-[3vh] ... sm:mt-[4vh] ... md:mt-[5vh] ... lg:mt-[1vh]` (implicit by `lg:mt-[1vh]` — but port doesn't have it) | MUI `.desc` `margin-top: 3vh` base, then `1vh` at lg. **Should be `mt-[3vh] lg:mt-[1vh]`**, NOT `sm:mt-[4vh] md:mt-[5vh]`. Those values came from `ar-about-hero.tsx`. | high |
| H12 | 18 | `px-[2vh] ... lg:px-0` | ✓ Matches `padding-left/right: 2vh` then `0` at lg. Keep. | — |
| H13 | 18 | `text-center ... lg:text-start` | ✓ Matches. Keep. | — |
| H14 | 18 | `font-normal` | The `text-body*` token already encodes 400. Remove redundant `font-normal`. | low |
| H15 | 18 | `text-body-mobile sm:text-body` | MUI variant is `body2` → token is `text-small` (14px flat, no responsive change). **Should be `text-small`** (not `text-body-mobile sm:text-body`). The body2 mapping is in `01-token-mapping.md §1`. | high |
| H16 | 18 | no `lg:w-[90%]` on `<p>` | Per H5: width 90% belongs on `<p>`. **Add `lg:w-[90%]`**. | medium |

---

## §3 Corrected Tailwind JSX

```tsx
"use client";

import React from "react";
import Image from "next/image";
import { useI18n } from "@/context/language-context";
import lines from "../../../../public/assets/images/static/lines.png";
import linesMobile from "../../../../public/assets/images/static/linesMobile.png";

const Hero: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="flex h-full w-full flex-col justify-center">
      <h1 className="mt-[2vh] mb-[3vh] pr-[2vw] text-center font-heading text-h1-mobile sm:mt-[3vh] sm:text-h1-tablet lg:pr-0 lg:text-start lg:text-h1 text-black">
        {t("about.hero.heading_lead")}
        <span className="relative inline text-brand-500">
          {t("about.hero.heading_accent")}
          {/* Mobile pseudo-element replacement */}
          <Image
            src={linesMobile}
            alt=""
            aria-hidden="true"
            className="absolute -left-[180px] -top-[2.5vh] z-10 h-[1.9vh] w-[2vh] object-contain sm:left-auto sm:right-0 lg:hidden"
          />
          {/* Desktop pseudo-element replacement */}
          <Image
            src={lines}
            alt=""
            aria-hidden="true"
            className="absolute -top-[3vh] right-0 z-10 hidden h-[4.3vh] w-[4.3vh] object-contain lg:block"
          />
        </span>
        {t("about.hero.heading_tail")}
      </h1>
      <p className="mt-[3vh] px-[2vh] text-center font-heading text-small lg:mt-[1vh] lg:w-[90%] lg:px-0 lg:text-start text-black">
        {t("about.hero.description")}
      </p>
    </div>
  );
};

export default Hero;
```

Key per-element from→to:

| Element | From | To |
|---|---|---|
| Root `<div>` | `flex h-full max-h-[700px] w-full flex-col justify-center` | `flex h-full w-full flex-col justify-center` |
| `<h1>` | `mt-[2vh] px-[2vw] text-center font-heading text-h1-mobile font-bold sm:mt-[3vh] sm:text-h1-tablet md:mt-[4vh] lg:w-[90%] lg:px-0 lg:text-start lg:text-h1 text-black` | `mt-[2vh] mb-[3vh] pr-[2vw] text-center font-heading text-h1-mobile sm:mt-[3vh] sm:text-h1-tablet lg:pr-0 lg:text-start lg:text-h1 text-black` |
| Accent `<span>` | `inline font-bold text-brand-500` | `relative inline text-brand-500` (add decorative `<Image>` children) |
| `<p>` | `mt-[3vh] px-[2vh] text-center font-heading text-body-mobile font-normal sm:mt-[4vh] sm:text-body md:mt-[5vh] lg:px-0 lg:text-start text-black` | `mt-[3vh] px-[2vh] text-center font-heading text-small lg:mt-[1vh] lg:w-[90%] lg:px-0 lg:text-start text-black` |

---

## §4 Verification at 4 reference widths

- **375 (iPhone SE)**: h1 centered, 28px (`text-h1-mobile`), small decorative line absolute `-left-[180px] -top-[2.5vh]` behind the accent span (off-canvas left — that's per MUI). Heading mt=2vh, mb=3vh. Description centered, 14px, mt=3vh, px=2vh.
- **768 (iPad Mini)**: h1 centered (still), 36px (`text-h1-tablet`). Decorative line now at `right: 0, top: -2.5vh`, sized 1.9vh × 2vh. Heading mt=3vh, mb=3vh. Description centered, 14px, mt=3vh, px=2vh.
- **1280 (Laptop S)**: h1 left-aligned (`text-start`), 48px (`text-h1`). Decorative line at `right: 0, top: -3vh`, sized 4.3vh × 4.3vh, using `lines.png`. Heading mt=3vh, mb=3vh, pr=0. Description left-aligned, 14px, mt=1vh, w=90%, px=0.
- **1920 (Desktop)**: same as 1280 — no further breakpoint changes after lg.

---

## §5 RTL notes

The Arabic variant (`ar-about-hero.tsx`) is **structurally different** from `hero/hero.tsx` — it inlines `sx` styles instead of using a CSS module. Notable RTL specifics:

- `<Box sx={styles.hero}>` wrapper has `direction: "rtl"` and `maxHeight: "700px"` (the source of the `max-h-[700px]` that snuck into the LTR Tailwind port — see bug H1).
- `.heading.textAlign`: `center` (mobile/sm/md) → `start` at `lg` — same as LTR, but in RTL `start` resolves to right.
- `.heading.marginTop`: `2vh / 3vh / 4vh` (xs/sm/md) — note this **does** include the `4vh` at `md` that the LTR variant lacks. So if the Tailwind port is reused by both languages, the `md:mt-[4vh]` would be correct **only** in RTL. Recommend: keep the LTR Tailwind clean per H2 above, and let the AR override happen via the `dir="rtl"` cascade if needed (or split into a second component).
- `.heading.fontSize`: AR variant uses explicit pixel sizes `32 / 36 / 40 / 3.5rem (=56px)` instead of MUI's h1 token (28/36/48). So AR is slightly **larger** at mobile (32 vs 28) and **much larger** at lg (56 vs 48). If pixel-perfect AR parity is required, use Arabic-specific overrides: `arabic:text-[32px] arabic:sm:text-[36px] arabic:md:text-[40px] arabic:lg:text-[3.5rem]` or similar.
- `.desc.fontSize`: AR uses `16 / 18 / 20 / 1.8rem` and `lineHeight: 24 / 26 / 28 / 2.2rem` — bigger than LTR's `body2` (14px). Again: AR-specific overrides if required.
- Pseudo-element `::before` is mirrored: in AR it should anchor to the **left** side of the accent span (since visual flow reverses).
- `useI18n().isRTL` is already pulled in the parent page. The decorative `<Image>` positioning should switch `right-0` ↔ `left-0` based on `isRTL`.
