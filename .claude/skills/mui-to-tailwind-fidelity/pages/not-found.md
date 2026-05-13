# Page — `/404`

Static 404 error page. Centered "Ops!" headline with image, three lines of explanation copy, link back to homepage, and a logo anchored at the bottom of the viewport. Full-height (`100vh`), pale-blue background (`#e8f4fc`).

| Side | Path |
|---|---|
| MUI source — TSX | `tuitionalFrontend-mui-baseline\src\app\404\page.tsx` |
| MUI source — CSS module | `tuitionalFrontend-mui-baseline\src\app\404\style.module.css` |
| Tailwind port — TSX | `tuitionalFrontend\src\app\404\page.tsx` |
| Tailwind port — CSS module | `tuitionalFrontend\src\app\404\style.module.css` |
| Arabic variant | (none — same component for both locales; copy is hard-coded English) |

**Notable**: the Tailwind port **still imports the CSS module** (`./style.module.css`). The project enforces "no CSS modules outside `components/quill`" — this file violates that rule. The fix is to port every rule into Tailwind classNames inline and delete the `.module.css`.

---

## §1 MUI source — extracted properties

### Layout tree

```
<div className={styles.container}>                    // viewport-tall, pale-blue, flex col
  <div className={styles.main}>                       // mt-auto (pushes to vertical center)
    <div className={styles.top}>                      // flex row, center, mb-20px
      <Image src={notFoundImg} alt="ops" className={styles.image} />
      <Typography variant="h1" component="h1"         // "Ops!" — font-size 16vh (10vh mobile)
                  className={styles.title}>Ops!</Typography>
    </div>
    <Typography variant="h4" component="p"            // "The Page That You're Looking For…"
                className={styles.description}>...</Typography>
    <Typography variant="h4" component="p"
                className={styles.info}>...</Typography>
    <Typography variant="h4" component="p"
                className={styles.info}>
      "Till Then.... Head Back To The"
      <Typography variant="h4" component="span" className={styles.info}>
        <a href="/" className={styles.link}> Homepage </a>     // brand-blue, 3.3vh
        To Restart Your Journey.
      </Typography>
    </Typography>
  </div>
  <div className={styles.logoDiv}>                    // mt-auto + mx-auto, anchored bottom
    <a href="/"><Image src={logo} alt="logo" className={styles.logo} /></a>
  </div>
</div>
```

### Dimensions & spacing

| Element | Property | Mobile (<575) | Tablet (576-1199) | Desktop (≥1200) |
|---|---|---|---|---|
| `.container` | `display` | `flex` | `flex` | `flex` |
| `.container` | `flex-direction` | `column` | `column` | `column` |
| `.container` | `justify-content` | `center` | `center` | `center` |
| `.container` | `text-align` | `center` | `center` | `center` |
| `.container` | `background-color` | `#e8f4fc` | `#e8f4fc` | `#e8f4fc` |
| `.container` | `height` | `100vh` | `100vh` | `100vh` |
| `.main` | `margin-top` | `auto` (pushes block down to flex center) | `auto` | `auto` |
| `.top` | `display` / `align-items` / `justify-content` | `flex` / `center` / `center` | (same) | (same) |
| `.top` | `margin-bottom` | `20px` | `20px` | `20px` |
| `.title` | `font-size` | **`10vh`** | `16vh` (default) | `16vh` |
| `.title` | `color` | `black` | `black` | `black` |
| `.description` | `font-size` | `1.5rem` (24px) | `1.5rem` | `1.5rem` |
| `.description` | `color` | `#444` | `#444` | `#444` |
| `.description` | `margin-bottom` | `10px` | `10px` | `10px` |
| `.info` | `font-size` | `1.2rem` (19.2px) | `1.2rem` | `1.2rem` |
| `.info` | `color` | `#666` | `#666` | `#666` |
| `.image` | `object-fit` | `contain` | `contain` | `contain` |
| `.image` | `width` / `height` | (default — set by `next/image` import) | (same) | (same) |
| `.link` | `color` | `#38b6ff` | `#38b6ff` | `#38b6ff` |
| `.link` | `font-size` | `3.3vh` | `3.3vh` | `3.3vh` |
| `.logoDiv` | `margin-top` | `auto` (pushes to bottom of flex container) | `auto` | `auto` |
| `.logoDiv` | `margin-left` / `margin-right` | `auto` (centers horizontally) | `auto` | `auto` |
| `.logoDiv` | `cursor` | `pointer` | `pointer` | `pointer` |

### Typography

| Element | MUI variant | Mobile | Tablet | Desktop | Weight | Color | Font family |
|---|---|---|---|---|---|---|---|
| "Ops!" `<h1>` | `variant="h1"` | `10vh` (CSS override beats variant) | `16vh` | `16vh` | (MUI h1 default = 700) | `#000` | `leagueSpartan.className` |
| "The Page…" `<p>` | `variant="h4"` | `1.5rem` (CSS override) | `1.5rem` | `1.5rem` | (MUI h4 default = 600) | `#444` | `leagueSpartan.className` |
| "We're Looking…" `<p>` | `variant="h4"` | `1.2rem` (CSS override) | `1.2rem` | `1.2rem` | 600 | `#666` | `leagueSpartan.className` |
| "Till Then…" `<p>` | `variant="h4"` | `1.2rem` | `1.2rem` | `1.2rem` | 600 | `#666` | `leagueSpartan.className` |
| "Homepage" `<a>` | n/a (anchor) | `3.3vh` | `3.3vh` | `3.3vh` | inherits | `#38b6ff` | `leagueSpartan.className` |

Note: the MUI `variant="h1"` / `variant="h4"` settings are **completely overridden by the `.module.css` `font-size` rules**, so the variant-imposed responsive scaling does not apply. Mobile h1 is 10vh (≈67px on 667-tall), desktop h1 is 16vh (≈115px on 720-tall).

### Colors

| Hex | Where | Tailwind class (per 01-token-mapping.md §5) |
|---|---|---|
| `#e8f4fc` (page bg) | `.container.background-color` | `bg-[#e8f4fc]` (no token — keep arbitrary; closest is `bg-brand-50` `#D7F0FF` which is too dark) |
| `#000` / `black` (title) | `.title.color` | `text-black` |
| `#444` (description) | `.description.color` | `text-[#444]` (no token; `text-ink-900` `#2d2d2d` is too dark) |
| `#666` (info) | `.info.color` | `text-[#666]` (no token) |
| `#38b6ff` (link) | `.link.color` | `text-brand-500` |

### Animations / interactions

None. The logo `<a>` and "Homepage" `<a>` are simple navigation; no hover/focus styles defined. The `cursor: pointer` on `.logoDiv` is redundant (anchor already shows pointer).

---

## §2 Tailwind port — bug list

The port file `tuitionalFrontend\src\app\404\page.tsx` **still uses CSS modules** — a hard rule violation per the project skill rules. The `.module.css` file is byte-identical to the MUI source. The structural JSX is correctly translated (Typography → semantic `<h1>` / `<p>` / `<span>`), but no Tailwind classes have been added.

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 4 | `import styles from "./style.module.css";` | **Delete this import** and the `style.module.css` file. Per [SKILL.md hard rule 8](../SKILL.md), CSS modules are forbidden outside `components/quill/`. Port every rule from `.module.css` into Tailwind classNames. | **high** |
| B2 | 12 | `<div className={styles.container}>` | `<div className="flex h-screen flex-col justify-center bg-[#e8f4fc] text-center">` — matches `.container { display:flex; flex-direction:column; justify-content:center; text-align:center; background-color:#e8f4fc; height:100vh }`. Use `h-screen` (= 100vh) and `bg-[#e8f4fc]`. | high |
| B3 | 13 | `<div className={styles.main}>` | `<div className="mt-auto">` — matches `.main { margin-top: auto }`. | high |
| B4 | 14 | `<div className={styles.top}>` | `<div className="mb-5 flex items-center justify-center">` — `.top { display:flex; align-items:center; justify-content:center; margin-bottom:20px }`. (`mb-5` = 20px.) | high |
| B5 | 15 | `<Image className={styles.image} />` | `<Image className="object-contain" />` — `.image { object-fit: contain }`. | high |
| B6 | 16 | `<h1 className={`${styles.title} ${leagueSpartan.className}`}>Ops!</h1>` | `<h1 className={`${leagueSpartan.className} text-[10vh] font-bold text-black sm:text-[16vh]`}>Ops!</h1>` — `.title { font-size: 16vh }` default, `font-size: 10vh` at `max-width: 575px`. (Tailwind `sm`=600 is closest to MUI's 575 boundary — 25px drift acceptable.) Weight from MUI variant h1 default = 700 (`font-bold`). | high |
| B7 | 18 | `<p className={`${styles.description} ${leagueSpartan.className}`}>` | `<p className={`${leagueSpartan.className} mb-[10px] text-[1.5rem] font-semibold text-[#444]`}>` — `.description { font-size:1.5rem; color:#444; margin-bottom:10px }`. Weight from h4 default = 600. | high |
| B8 | 21, 24 | `<p className={`${styles.info} ${leagueSpartan.className}`}>` (used twice) | `<p className={`${leagueSpartan.className} text-[1.2rem] font-semibold text-[#666]`}>` — `.info { font-size:1.2rem; color:#666 }`. | high |
| B9 | 26 | `<span className={`${styles.info} ${leagueSpartan.className}`}>` | `<span className={`${leagueSpartan.className} text-[1.2rem] font-semibold text-[#666]`}>` — same `.info` rules. | high |
| B10 | 27 | `<a href="/" className={`${styles.link} ${leagueSpartan.className}`}>` | `<a href="/" className={`${leagueSpartan.className} text-[3.3vh] text-brand-500`}>` — `.link { color:#38b6ff; font-size:3.3vh }`. `#38b6ff` maps to `brand-500` per [01-token-mapping.md §5](../01-token-mapping.md). | high |
| B11 | 35 | `<div className={styles.logoDiv}>` | `<div className="mx-auto mt-auto cursor-pointer">` — `.logoDiv { margin-top:auto; margin-left:auto; margin-right:auto; cursor:pointer }`. | high |
| B12 | 37 | `<Image src={logo} alt="logo" className={styles.logo} />` | `.logo` class is referenced in JSX but **never defined** in `style.module.css` (no `.logo {}` rule). Remove `className={styles.logo}`. The image renders at its `next/image` import default dimensions. | low |
| B13 | (semantic) | The middle `<p>` "Till Then.... Head Back To The" wraps a nested `<span>` containing the `<a>` and another text run — this is a **paragraph-inside-span-inside-paragraph**-like structure in MUI (originally `Typography` `component="p"` and a child `Typography` `component="span"`). The port preserved it. ✓ Acceptable, though semantically odd. | — |
| B14 | (missing) | No `lang` attribute on the page (it's English-only) | If `/ar/404` becomes routed, this hardcoded English will leak. Not a port bug — pre-existing in MUI too. | low |

---

## §3 Corrected Tailwind classNames

Rewrite of the full JSX with `.module.css` removed:

```tsx
"use client";

import React from "react";
import Image from "next/image";
import { leagueSpartan } from "../fonts";
import notFoundImg from "../../../public/assets/images/static/Group 1577707754.png";
import logo from "../../../public/assets/images/static/logo.png";

export default function Custom404() {
  return (
    <div className="flex h-screen flex-col justify-center bg-[#e8f4fc] text-center">
      <div className="mt-auto">
        <div className="mb-5 flex items-center justify-center">
          <Image src={notFoundImg} alt="ops" className="object-contain" />
          <h1
            className={`${leagueSpartan.className} text-[10vh] font-bold text-black sm:text-[16vh]`}
          >
            Ops!
          </h1>
        </div>
        <p
          className={`${leagueSpartan.className} mb-[10px] text-[1.5rem] font-semibold text-[#444]`}
        >
          {`The Page That You're Looking For Has Disappeared!`}
        </p>
        <p
          className={`${leagueSpartan.className} text-[1.2rem] font-semibold text-[#666]`}
        >
          {`We're Looking For It Too!`}
        </p>
        <p
          className={`${leagueSpartan.className} text-[1.2rem] font-semibold text-[#666]`}
        >
          {`Till Then.... Head Back To The`}
          <span
            className={`${leagueSpartan.className} text-[1.2rem] font-semibold text-[#666]`}
          >
            <a
              href="/"
              className={`${leagueSpartan.className} text-[3.3vh] text-brand-500`}
            >
              {" "}
              Homepage{" "}
            </a>{" "}
            To Restart Your Journey.
          </span>
        </p>
      </div>
      <div className="mx-auto mt-auto cursor-pointer">
        <a href="/">
          <Image src={logo} alt="logo" />
        </a>
      </div>
    </div>
  );
}
```

After applying: **delete `tuitionalFrontend/src/app/404/style.module.css`** (it should no longer be imported anywhere).

---

## §4 Verification at 4 widths

| Width | What to check |
|---|---|
| **375** (iPhone SE, 667 tall) | Title "Ops!" at `10vh` ≈ 67px. Description/info paragraphs at 24px/19px respectively. Full viewport height. Logo anchored at the very bottom, centered. The Tailwind `sm` (600) hasn't fired yet — title stays 10vh. |
| **768** (iPad Mini, 1024 tall) | Title `sm:text-[16vh]` has fired (Tailwind `sm`=600). Title ≈ 164px. Still single-column. Lots of vertical breathing space because `justify-center` + `mt-auto/mt-auto` distribute the content. |
| **1280** (Laptop S, 800 tall) | Title `text-[16vh]` ≈ 128px. Description/info unchanged (rem-based, fixed at 24/19px). Link in description at 3.3vh ≈ 26px. |
| **1920** (Desktop, 1080 tall) | Title `text-[16vh]` ≈ 173px. Link 3.3vh ≈ 36px. Generous spacing. |

Cross-check vs MUI baseline. Watch for: any padding/margin around the page (MUI has none — full bleed), font weight (League Spartan should be 700 on h1, 600 on the paragraphs).

---

## §5 RTL notes

- This page is **hard-coded English**. There is no `/ar/404` route in the codebase (Next.js 404 is a single shared route). RTL is not a concern unless the codebase is updated to localize the 404 page.
- All flex-direction, margins, and text-alignment used are direction-neutral (`flex-col`, `justify-center`, `text-center`, `mx-auto`, `mt-auto`, `mb-5`) — these flip cleanly if Arabic content is added later.
- The "Homepage" link uses `text-[3.3vh]` and inherits `text-center` from the container, so it requires no RTL-specific work.
- If RTL routing is added: change the hard-coded copy to come from `t.notFound.title` etc., and switch `text-[#444]` / `text-[#666]` to `text-ink-700` / `text-ink-500` tokens (both directions render identically).
