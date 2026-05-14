# Component — `AboutUs`

The main "About Us" section on `/about` and `/ar/about`. Renders a section heading + intro paragraph, then a two-tab switcher ("Our Mission" / "Our Value") that swaps between two content panes. Each pane shows a heading + paragraph + bulleted point list on the left, and a `students.webp` image on the right.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\about\about-us.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\about\about-us.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\about\ar-about-us.tsx` |

---

## §1 MUI source — extracted properties

### Layout tree

```
Box.infoBoxContanier  (no styles — commented out)
├── Box.headingContanier  (flex-col, alignItems="flexStart", width 100%)
│   ├── Typography.mainHeading h2  variant="h2"
│   │   └── "About Us"
│   └── Typography.dec p  variant="body2"
│       └── description paragraphs (p1 + p2 separated by <br/><br/>)
└── Box  (flex-col, rowGap: "16px")
    └── Grid container.aboutContent  (marginTop: "36px", p:0)
        ├── Grid item lg/md/sm/xs=12 .btnDiv  (flex-row, columnGap+rowGap 16px, marginY 24px)
        │   ├── Button.roundedActiveButton OR .roundedButton  ("Our Mission")
        │   └── Button.roundedActiveButton OR .roundedButton  ("Our Value")
        └── Grid item lg/md/sm/xs=12 .contentDiv  (flex-row at lg, column at xs/sm; columnGap 24px)
            ├── renderValue() → Grid item lg=8 md/sm/xs=12 .valueDiv  (flex-col)
            │   ├── div
            │   │   ├── Typography.heading h2  variant="h2"  ← content.title
            │   │   └── Typography.paragraph p  variant="body2"  ← content.paragraph
            │   └── Box.box  (flex-col, rowGap:12px, border:1px solid #B9E5FF, radius:16px, padding:24px, marginTop:32px)
            │       └── points.map → Box  (flex-row, alignItems: flexStart, justifyContent: center/xs → start/lg)
            │           ├── CircleIcon  (color #38B6FF, fontSize:1rem, marginRight:8px)
            │           └── Typography.textBold p  variant="body2"  ← "{title}: " + nested span
            │               └── Typography.text span  variant="caption"  ← description
            └── Grid item lg=4 md/sm/xs=12
                └── Box.imageDiv  (flex-row, marginTop: xs:24px lg:0, height 100%, maxHeight lg:535px)
                    └── Image  (students.webp, style.image: 100% × 100%, maxHeight 553px)
```

### Dimensions & spacing (per `styles` object inside `about-us.tsx`)

| Element | Property | Mobile (<600) | Tablet (600–899) | md (900–1199) | Desktop (≥1200) |
|---|---|---|---|---|---|
| `.infoBoxContanier` | (all commented out) | — | — | — | — |
| `.mainHeading` (h2) | `display` | `flex` | `flex` | `flex` | `flex` |
| `.mainHeading` | `marginTop` | `40px` | `50px` | `70px` | `105px` |
| `.mainHeading` | `marginBottom` | `20px` | `20px` | `20px` | `20px` |
| `.mainHeading` | `position` | `relative` | `relative` | `relative` | `relative` |
| `.mainHeading` | `textAlign` | `center` | `center` | `center` | `center` |
| `.mainHeading` | `alignItems` | `center` | `center` | `center` | `center` |
| `.mainHeading` | `justifyContent` | `left` | `left` | `left` | `left` |
| `.mainHeading` | `color` | `#000000` | `#000000` | `#000000` | `#000000` |
| `.headingContanier` | `display` | `flex` | `flex` | `flex` | `flex` |
| `.headingContanier` | `flexDirection` | `column` | `column` | `column` | `column` |
| `.headingContanier` | `alignItems` | `flexStart` | `flexStart` | `flexStart` | `flexStart` |
| `.headingContanier` | `width` | `100%` | `100%` | `100%` | `100%` |
| `.headingContanier` | `background` | `transparent` | `transparent` | `transparent` | `transparent` |
| `.dec` (intro `<p>`) | `textAlign` | `justify` | `justify` | `justify` | `justify` |
| `.dec` | `color` | `rgba(0,0,0,0.77)` | same | same | same |
| Outer `<Box>` (above `.aboutContent`) | `flexDirection` | `column` | column | column | column |
| Outer `<Box>` | `rowGap` | `16px` | `16px` | `16px` | `16px` |
| `.aboutContent` (Grid container) | `marginTop` | `36px` | `36px` | `36px` | `36px` |
| `.aboutContent` | `padding` | `0` | `0` | `0` | `0` |
| `.btnDiv` (Grid item) | `display` | `flex` | `flex` | `flex` | `flex` |
| `.btnDiv` | `flexDirection` | `row` | `row` | `row` | `row` |
| `.btnDiv` | `rowGap` / `columnGap` | `16px / 16px` | same | same | same |
| `.btnDiv` | `marginY` | `24px` | `24px` | `24px` | `24px` |
| `.roundedActiveButton` | `backgroundColor` | `#38B6FF` | same | same | same |
| `.roundedActiveButton` | `boxShadow` | `0.1vh 1.5vh 3.4vh 0px #38B6FF66` | same | same | same |
| `.roundedActiveButton` | `paddingY` | `1.5vh` | `1.5vh` | `1.5vh` | `1.5vh` |
| `.roundedActiveButton` | `paddingX` | `30px` | `30px` | `80px` | `80px` |
| `.roundedActiveButton` | `borderRadius` | `1vh` | `1vh` | `1vh` | `1vh` |
| `.roundedActiveButton` | `display` | (not set; default `inline-flex` on MUI Button) | same | same | `flex` (overridden) |
| `.roundedButton` | `backgroundColor` | `white` | same | same | same |
| `.roundedButton` | `color` | `black` | same | same | same |
| `.roundedButton` | `paddingY` | `2vh` | `2vh` | `2vh` | `2vh` |
| `.roundedButton` | `paddingX` | `30px` | `30px` | `80px` | `80px` |
| `.roundedButton` | `:hover` | bg `#38B6FF`, color `white` | same | same | same |
| `.contentDiv` (Grid item) | `flexDirection` | `column` | `column` | `column` (sm; not specified) | `row` |
| `.contentDiv` | `columnGap` | `24px` | `24px` | `24px` | `24px` |
| `.contentDiv` | `justifyContent` | `left` | `left` | `left` | `left` |
| `.valueDiv` (inner Grid item lg=8) | `display` | `flex` | `flex` | `flex` | `flex` |
| `.valueDiv` | `flexDirection` | `column` | `column` | `column` | `column` |
| `.valueDiv` | `textAlign` | `flexStart` | same | same | same |
| `.valueDiv` | `justifyContent` | `spaceEvenly` | same | same | same |
| `.heading` (pane h2) | `marginBottom` | `10px` | `15px` | `18px` | `22px` |
| `.heading` | `textAlign` | `left` | `left` | `left` | `left` |
| `.paragraph` (pane body) | `color` | `#2D2D2D` | same | same | same |
| `.paragraph` | `wordBreak` | `break-word` | same | same | same |
| `.paragraph` | `maxWidth` | `1000px` | same | same | same |
| `.box` (point list container) | `display` | `flex` | flex | flex | flex |
| `.box` | `flexDirection` | `column` | column | column | column |
| `.box` | `rowGap` | `12px` | `12px` | `12px` | `12px` |
| `.box` | `border` | `1px solid #B9E5FF` | same | same | same |
| `.box` | `borderRadius` | `16px` | `16px` | `16px` | `16px` |
| `.box` | `padding` | `24px` | `24px` | `24px` | `24px` |
| `.box` | `marginTop` | `32px` | `32px` | `32px` | `32px` |
| Point row `<Box>` | `display` | `flex` | flex | flex | flex |
| Point row | `alignItems` | `flexStart` | same | same | same |
| Point row | `justifyContent` | `center` | `center` | `center` | `start` (lg) |
| Point row | `cursor` | `pointer` | same | same | same |
| `CircleIcon` | `color` | `#38B6FF` | same | same | same |
| `CircleIcon` | `fontSize` | `1rem` (16px) | same | same | same |
| `CircleIcon` | `marginRight` | `8px` | same | same | same |
| `.textBold` (point title) | `fontWeight` | `600` | same | same | same |
| `.textBold` | `color` | `#2D2D2D` | same | same | same |
| `.text` (point description span) | `color` | `#2D2D2D` | same | same | same |
| `.imageDiv` (image Grid item) | `display` | `flex` | flex | flex | flex |
| `.imageDiv` | `flexDirection` | `row` | row | row | row |
| `.imageDiv` | `justifyContent` | `left` | `left` | `left` | `left` |
| `.imageDiv` | `columnGap` | `24px` | `24px` | `24px` | `24px` |
| `.imageDiv` | `marginTop` | `24px` | (default; falls to xs=24px) | (default) | `0` |
| `.imageDiv` | `height` | `100%` | `100%` | `100%` | `100%` |
| `.imageDiv` | `maxHeight` | `auto` | `auto` | `auto` | `535px` |
| `.image` (`<Image>` style) | `width / height` | `100% / 100%` | same | same | same |
| `.image` | `maxHeight` | `553px` | same | same | same |

### Typography

| Element | MUI variant | Mobile | Tablet | Desktop | Weight | Color | Font |
|---|---|---|---|---|---|---|---|
| `.mainHeading` "About Us" | `h2` | 1.375rem (22px) | 1.75rem (28px) | 2.25rem (36px) | 700 | `#000000` | League Spartan |
| `.dec` intro paragraph | `body2` | 0.875rem (14px) | 0.875rem | 0.875rem | 400 | `rgba(0,0,0,0.77)` | League Spartan |
| `.heading` pane title | `h2` | 1.375rem | 1.75rem | 2.25rem | 700 | inherit `#000` (no override) | League Spartan |
| `.paragraph` pane body | `body2` | 0.875rem | 0.875rem | 0.875rem | 400 | `#2D2D2D` | League Spartan |
| Button labels ("Our Mission", "Our Value") | MUI `<Button>` default | 0.9375rem (15px) | 1rem (16px) | 1rem (16px) | 500 | white (active) / black (inactive) | League Spartan |
| `.textBold` point title | `body2` | 0.875rem | 0.875rem | 0.875rem | 600 | `#2D2D2D` | League Spartan |
| `.text` point description span | `caption` | 0.875rem (theme maps caption→14px) | 0.875rem | 0.875rem | 400 | `#2D2D2D` | League Spartan |

### Colors

| MUI | Tailwind |
|---|---|
| `#000000` | `text-black` |
| `#38B6FF` | `bg-brand-500` / `text-brand-500` |
| `#FFFFFF` | `bg-white` / `text-white` |
| `#2D2D2D` | `text-ink-900` |
| `rgba(0,0,0,0.77)` | `text-ink-800` |
| `#B9E5FF` (point box border) | use arbitrary: `border-[#B9E5FF]` (no token in mapping) |

### Animations / interactions

- `.roundedActiveButton:hover` and `.roundedButton:hover` swap colors (white→primary blue on inactive; no change on active). MUI Button transition default applies (~0.25s).
- Clicking either button calls `setActiveType` and re-renders the pane.

### Grid → Tailwind cols translation

- Tab row `<Grid item lg=12 md=12 sm=12 xs=12>` → spans full width at all sizes → no `grid-cols-` needed; just keep as a flex row.
- Content row `<Grid item lg=12 ...>` containing two children: `renderValue` is `<Grid item lg=8>`, image is `<Grid item lg=4>`. Translation: parent uses `grid grid-cols-1 lg:grid-cols-12`, first child `lg:col-span-8`, second child `lg:col-span-4`. **The Tailwind port already does this correctly** (line 71).

---

## §2 Tailwind port — bug list

Current port: `tuitionalFrontend\src\components\about\about-us.tsx` (lines 27–117).

| # | Line | Current Tailwind | Expected (per MUI) | Severity |
|---|---|---|---|---|
| AU1 | 29 | `<h2 className="... mb-5 mt-10 ... sm:mt-[50px] ... md:mt-[70px] ... lg:mt-[105px] ... text-black">` and the decorative line `<Image>` placed **inside** the `<h2>` | MUI's `.mainHeading` has `justifyContent: "left"` (a left-aligned flex item — the AR variant changes to right). But `.mainHeading`'s `::before` pseudo-element is **only defined in `why-choose-tuitional.tsx`, NOT in `about-us.tsx`**. The decorative lines were copied incorrectly into AboutUs. **Remove both decorative `<Image>` elements from the `<h2>`** (lines 30–41). | high |
| AU2 | 29 | `mb-5` (20px) | MUI `marginBottom: "20px"`. ✓ Keep. | — |
| AU3 | 29 | `justify-center` | MUI `justifyContent: "left"`. **Should be `justify-start`** (or omit). Visually this moves the "About Us" h2 from centered to left-aligned. | high |
| AU4 | 29 | `text-center` | MUI `.mainHeading.textAlign: "center"`. ✓ But because of `justifyContent: left`, the flex container puts the text node at the left edge — the text itself is "center" only matters if the h2 wraps to two lines (rare). ✓ Keep `text-center` (matches MUI) but acknowledge the layout conflict in MUI source. | low |
| AU5 | 45 | `<p className="mt-5 px-5 text-center font-heading text-body-mobile sm:text-body lg:px-0 text-black">` | MUI `.dec.textAlign: "justify"`, color `rgba(0,0,0,0.77)`, font `body2` (14px). **Should be `text-justify`, `text-small` (not `text-body-mobile sm:text-body`), `text-ink-800` (not `text-black`)**. Also `mt-5 px-5` and `lg:px-0` aren't in MUI — `.dec` has no margin or padding set. **Drop `mt-5 px-5 lg:px-0`**. | high |
| AU6 | 53 | `<div className="flex flex-col gap-y-4">` | MUI: `display: flex, flexDirection: column, rowGap: "16px"`. **Should be `gap-y-4` (16px). ✓ Matches.** Keep. | — |
| AU7 | 54 | `<div className="flex justify-center gap-3">` (button row) | MUI `.btnDiv`: `flexDirection: row, columnGap: 16px, marginY: 24px`. **Should be `flex flex-row gap-4 my-6`** (`justify-center` is not in MUI; .btnDiv has no `justifyContent`, defaults to flex-start). Current `gap-3` is 12px — should be `gap-4` (16px). Missing `my-6` (24px top/bottom). | high |
| AU8 | 55–67 | `<Button variant="primary/outline" ... className="rounded-full px-6">` | MUI buttons: `borderRadius: "1vh"` (NOT pill), `paddingY: 1.5vh (active) / 2vh (inactive)`, `paddingX: 30px (xs) / 80px (md+)`, `boxShadow: 0.1vh 1.5vh 3.4vh 0px #38B6FF66` on active. **Should be `rounded-[1vh] py-[1.5vh] px-[30px] md:px-20 shadow-[0.1vh_1.5vh_3.4vh_0px_#38B6FF66]` for active**, and `rounded-[1vh] py-[2vh] px-[30px] md:px-20 bg-white text-black hover:bg-brand-500 hover:text-white` for inactive. Drop `rounded-full px-6`. | high |
| AU9 | 71 | `<div className="grid grid-cols-1 gap-6 lg:grid-cols-12">` | MUI content row: `.contentDiv.flexDirection: column → row at lg`, `columnGap: 24px`. The `grid-cols-12` with `col-span-8/4` correctly mirrors MUI `lg=8 / lg=4`. ✓ Keep, but **`gap-6` is 24px** which matches `columnGap: 24px`. ✓ Keep. The MUI source also has **no row gap**, but on mobile the two stacked children visually need separation — MUI gives that via `.imageDiv.marginTop: { xs: "24px", lg: 0 }`. The Tailwind `gap-6` at mobile adds 24px gap which is consistent. ✓ Keep. | — |
| AU10 | 72 | `<div className="lg:col-span-8">` (value pane wrapper) | MUI `.valueDiv` is `display: flex, flexDirection: column, justifyContent: spaceEvenly`. **Should add `flex flex-col justify-evenly`** so internal items distribute. | medium |
| AU11 | 74 | `<h3 className="text-center font-heading text-h3-mobile sm:text-h3-tablet lg:text-start lg:text-h3 text-black">` (pane title) | MUI uses `variant="h2"` (not h3) — the pane title is the same size as the section title. **Should be `<h2>` element + `text-h2-mobile sm:text-h2-tablet lg:text-h2`**. Color is inherited (default `#000`, `text-black` is fine). `text-center lg:text-start` does not match MUI `.heading.textAlign: "left"` — **should be `text-start` at all sizes** (drop `text-center`). Also missing `marginBottom: { xs: 10, sm: 15, md: 18, lg: 22 }` → **add `mb-[10px] sm:mb-[15px] md:mb-[18px] lg:mb-[22px]`** (and drop `text-center`). | high |
| AU12 | 77 | `<p className="mt-3 text-center font-heading text-body-mobile sm:text-body lg:text-start text-black">` | MUI `.paragraph`: `color: #2D2D2D, maxWidth: 1000px, wordBreak: break-word`. Variant is `body2` = 14px. **Should be `text-small text-ink-900 max-w-[1000px] break-words text-start`** (drop responsive `text-body`, drop `text-center lg:text-start`, drop `mt-3` — MUI has no margin between heading and paragraph in `.heading`/`.paragraph`). | high |
| AU13 | 82 | `<div className="mt-5 flex flex-col gap-3">` (point box) | MUI `.box`: `flex-col, rowGap: 12px, border: 1px solid #B9E5FF, borderRadius: 16px, padding: 24px, marginTop: 32px`. **Should be `mt-8 flex flex-col gap-3 rounded-2xl border border-[#B9E5FF] p-6`** (mt-8 = 32px; gap-3 = 12px = rowGap; rounded-2xl ≈ 16px or use `rounded-[16px]`; p-6 = 24px; add border with hex). | high |
| AU14 | 84–86 | Point row `<div className="flex cursor-pointer items-start justify-center lg:justify-start">` | MUI `alignItems: "flexStart"` → `items-start`. ✓ `justifyContent: { xs: center, lg: start }` → `justify-center lg:justify-start`. ✓ Matches. Keep. | — |
| AU15 | 88–92 | `<Circle size={16} className="me-2 mt-1 shrink-0 fill-brand-500 text-brand-500" />` | MUI `<CircleIcon sx={{ color: "#38B6FF", fontSize: "1rem", marginRight: "8px" }}>`. `size=16` ≈ 1rem ✓. `me-2` = 8px ✓. **`mt-1` (4px) is not in MUI** — drop it; MUI `alignItems: flexStart` should align the icon to the top of the text without extra mt. Keep `me-2 shrink-0 fill-brand-500 text-brand-500`; drop `mt-1`. | medium |
| AU16 | 93 | `<p className="font-heading text-body-mobile font-bold sm:text-body text-black">` | MUI `.textBold` variant body2 = 14px, fontWeight 600, color `#2D2D2D`. **Should be `text-small font-semibold text-ink-900`** (not `text-body-mobile sm:text-body font-bold text-black`). | high |
| AU17 | 95 | `<span className="font-heading text-small font-normal text-black">` | MUI `.text` variant caption = 14px, color `#2D2D2D`, no explicit fontWeight (inherits 400). **Should be `text-small text-ink-900`** (drop `font-normal text-black`). | medium |
| AU18 | 104–113 | `<div className="lg:col-span-4"> ... <Image ... className="h-auto w-full max-h-[553px] object-contain" />` | MUI `.imageDiv`: `flex-row, justifyContent: left, columnGap: 24px, marginTop: xs:24px lg:0, height:100%, maxHeight lg:535px`. Inner `<Image>` style: `width:100%, height:100%, maxHeight: 553px`. **The Tailwind port omits `.imageDiv.maxHeight: 535px` at lg.** Note the inconsistency in MUI: container caps at 535px while image caps at 553px — image visually constrained by container. **Should be `<div className="flex h-full max-h-none flex-row justify-start gap-x-6 lg:max-h-[535px]">` wrapping the `<Image className="h-full w-full max-h-[553px] object-cover">`** (object-cover, not contain — MUI inline `style.image` has no object-fit, so default is `cover` for `next/image`. The `object-contain` in current port is wrong unless MUI's effective object-fit is `contain` — verify against the rendered baseline). Also: the parent flex wrapper has `items-center justify-center` in current port; MUI uses `justifyContent: "left"`. **Replace `items-center justify-center` with `justify-start`** (and drop `items-center` — not in MUI). | high |
| AU19 | (missing) | No `mt-[24px] lg:mt-0` on the image wrapper | MUI `.imageDiv.marginTop: { xs: "24px", lg: 0 }`. Note: `gap-6` on the parent grid already provides 24px between stacked children at mobile, so this duplication may be redundant. **Verify which: keep the parent `gap-6` OR add `mt-6 lg:mt-0` on the image wrapper, not both.** | medium |
| AU20 | 110 | `alt={t("about.about_us.image_alt")}` | MUI uses static `alt="students"`. Tailwind port uses i18n key. ✓ Keep (improvement). | — |
| AU21 | (missing) | No outer section margin matching the page rhythm | MUI source doesn't wrap `AboutUs` in a `marginY` — the parent page is responsible. But `.mainHeading.marginTop: 40/50/70/105px` provides initial top breathing room. ✓ Already present in Tailwind via `mt-10 sm:mt-[50px] md:mt-[70px] lg:mt-[105px]` on the h2. ✓ Keep. | — |
| AU22 | 38 | `<div className="flex flex-col gap-y-4">` (outer Box above tab section) | MUI outer `<Box sx={{ flexDirection: "column", rowGap: "16px" }}>` is the only child of `infoBoxContanier`. Its child Grid container has `marginTop: "36px"`. `rowGap: 16px` on the outer Box is irrelevant (only one child). The critical value is the Grid's `marginTop: 36px` — this creates 36px space between the description `<p>` and the tab section start. Current Tailwind uses `gap-y-4` (16px, wrong — adds gap between children, not top margin) with no `mt-9`. **Should be `mt-9 flex flex-col`** (`mt-9` = 36px = `.aboutContent marginTop`; remove `gap-y-4` since it adds incorrect 16px extra between buttons and content). | high |

---

## §3 Corrected Tailwind JSX

```tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Circle } from "lucide-react";

import { useI18n } from "@/context/language-context";
import { cn } from "@/utils/cn";
import en from "@/locales/en.json";
import ar from "@/locales/ar.json";

import studentsImg from "../../../public/assets/images/static/about-students.webp";

type ContentKey = "mission" | "value";

const AboutUs: React.FC = () => {
  const { t, isRTL } = useI18n();
  const [activeType, setActiveType] = useState<ContentKey>("mission");

  const dict = isRTL ? ar : en;
  const content = dict.about.about_us[activeType];

  return (
    <div>
      <div className="flex w-full flex-col items-start bg-transparent">
        <h2 className="relative mb-5 mt-10 flex items-center justify-start text-center font-heading text-h2-mobile sm:mt-[50px] sm:text-h2-tablet md:mt-[70px] lg:mt-[105px] lg:text-h2 text-black">
          {t("about.about_us.heading")}
        </h2>

        <p className="text-justify font-heading text-small text-ink-800">
          {t("about.about_us.description_p1")}
          <br />
          <br />
          {t("about.about_us.description_p2")}
        </p>
      </div>

      <div className="mt-9 flex flex-col">
        <div className="my-6 flex flex-row gap-4">
          <button
            type="button"
            onClick={() => setActiveType("mission")}
            className={cn(
              "rounded-[1vh] px-[30px] md:px-20 font-heading text-button-mobile sm:text-button",
              activeType === "mission"
                ? "bg-brand-500 py-[1.5vh] text-white shadow-[0.1vh_1.5vh_3.4vh_0px_#38B6FF66] hover:bg-brand-500"
                : "bg-white py-[2vh] text-black hover:bg-brand-500 hover:text-white",
            )}
          >
            {t("about.about_us.tab_mission")}
          </button>
          <button
            type="button"
            onClick={() => setActiveType("value")}
            className={cn(
              "rounded-[1vh] px-[30px] md:px-20 font-heading text-button-mobile sm:text-button",
              activeType === "value"
                ? "bg-brand-500 py-[1.5vh] text-white shadow-[0.1vh_1.5vh_3.4vh_0px_#38B6FF66] hover:bg-brand-500"
                : "bg-white py-[2vh] text-black hover:bg-brand-500 hover:text-white",
            )}
          >
            {t("about.about_us.tab_value")}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="flex flex-col justify-evenly lg:col-span-8">
            <div>
              <h2 className="mb-[10px] text-start font-heading text-h2-mobile sm:mb-[15px] sm:text-h2-tablet md:mb-[18px] lg:mb-[22px] lg:text-h2 text-black">
                {content.title}
              </h2>
              <p className="max-w-[1000px] break-words text-start font-heading text-small text-ink-900">
                {content.paragraph}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 rounded-[16px] border border-[#B9E5FF] p-6">
              {content.points.map((point, index) => (
                <div
                  key={index}
                  className="flex cursor-pointer items-start justify-center lg:justify-start"
                >
                  <Circle
                    size={16}
                    className="me-2 shrink-0 fill-brand-500 text-brand-500"
                    aria-hidden="true"
                  />
                  <p className="font-heading text-small font-semibold text-ink-900">
                    {point.title}:{" "}
                    <span className="font-heading text-small font-normal text-ink-900">
                      {point.description}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="flex h-full flex-row justify-start gap-x-6 lg:max-h-[535px]">
              <Image
                src={studentsImg.src}
                width={studentsImg.width}
                height={studentsImg.height}
                alt={t("about.about_us.image_alt")}
                className="h-full w-full max-h-[553px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
```

Note: I removed the decorative `<Image>` lines that the current port wrongly inherited from `WhyChooseTuitional`. The MUI `about-us.tsx` `.mainHeading` style has NO `::before` pseudo-element — only `WhyChooseTuitional` does.

Per-element from → to summary:

| Element | From | To |
|---|---|---|
| `.headingContanier` wrapper | `flex w-full flex-col items-center bg-transparent` | `flex w-full flex-col items-start bg-transparent` |
| `.mainHeading` h2 | `relative mb-5 mt-10 flex items-center justify-center text-center font-heading text-h2-mobile sm:mt-[50px] sm:text-h2-tablet md:mt-[70px] lg:mt-[105px] lg:text-h2 text-black` (with two `<Image>` children) | `relative mb-5 mt-10 flex items-center justify-start text-center font-heading text-h2-mobile sm:mt-[50px] sm:text-h2-tablet md:mt-[70px] lg:mt-[105px] lg:text-h2 text-black` (no decorative images) |
| `.dec` p | `mt-5 px-5 text-center font-heading text-body-mobile sm:text-body lg:px-0 text-black` | `text-justify font-heading text-small text-ink-800` |
| Outer Box (tab section wrapper) | `flex flex-col gap-y-4` | `mt-9 flex flex-col` |
| `.btnDiv` div | `flex justify-center gap-3` | `my-6 flex flex-row gap-4` |
| Active button | `rounded-full px-6` (via `variant="primary"`) | `rounded-[1vh] py-[1.5vh] px-[30px] md:px-20 bg-brand-500 text-white shadow-[0.1vh_1.5vh_3.4vh_0px_#38B6FF66] hover:bg-brand-500` |
| Inactive button | `rounded-full px-6` (via `variant="outline"`) | `rounded-[1vh] py-[2vh] px-[30px] md:px-20 bg-white text-black hover:bg-brand-500 hover:text-white` |
| Value pane wrapper | `lg:col-span-8` | `flex flex-col justify-evenly lg:col-span-8` |
| Pane title | `<h3 className="text-center font-heading text-h3-mobile sm:text-h3-tablet lg:text-start lg:text-h3 text-black">` | `<h2 className="mb-[10px] text-start font-heading text-h2-mobile sm:mb-[15px] sm:text-h2-tablet md:mb-[18px] lg:mb-[22px] lg:text-h2 text-black">` |
| Pane paragraph | `mt-3 text-center font-heading text-body-mobile sm:text-body lg:text-start text-black` | `max-w-[1000px] break-words text-start font-heading text-small text-ink-900` |
| Point box | `mt-5 flex flex-col gap-3` | `mt-8 flex flex-col gap-3 rounded-[16px] border border-[#B9E5FF] p-6` |
| Circle icon | `me-2 mt-1 shrink-0 fill-brand-500 text-brand-500` | `me-2 shrink-0 fill-brand-500 text-brand-500` |
| Point title `<p>` | `font-heading text-body-mobile font-bold sm:text-body text-black` | `font-heading text-small font-semibold text-ink-900` |
| Description `<span>` | `font-heading text-small font-normal text-black` | `font-heading text-small font-normal text-ink-900` |
| Image wrapper | `flex h-full items-center justify-center` | `flex h-full flex-row justify-start gap-x-6 lg:max-h-[535px]` |
| `<Image>` | `h-auto w-full max-h-[553px] object-contain` | `h-full w-full max-h-[553px] object-cover` |

---

## §4 Verification at 4 reference widths

- **375 (iPhone SE)**: section h2 left-aligned at 22px, mt=40px, mb=20px. Intro paragraph `text-justify` 14px, `#000C` (ink-800), no extra padding/margin around it. Then 36px gap (`mt-9`) before the tab section starts. Tab buttons row: 16px gap, my=24px, paddingY 1.5vh/2vh, paddingX 30px each. Stacked content: pane title (22px h2, left, mb=10px), pane paragraph (14px, justify-start, max-w 1000px, color #2D2D2D). Point box: 32px top margin, 1px border #B9E5FF, 24px padding, 16px radius, 12px row gap. Each point row centered (`justify-center`), Circle icon 16px brand-500, point title 14px weight-600, description 14px weight-400, both `#2D2D2D`. Image below with 24px top gap (from grid gap-6), full-width.
- **768 (iPad Mini)**: same as 375 but h2 sizes lift to tablet (28px), point row still `justify-center` (lg:justify-start only kicks at 1200), tab paddingX still 30px (lg:px-20 kicks at lg=1200; md ≥900 also activates 80px per MUI — adjust `md:px-20` for consistency with MUI's `md: "80px"`).
- **1280 (Laptop S)**: h2 sizes lift to desktop (36px). Tab paddingX now 80px. Content row is 2-column (`grid-cols-12`, value pane col-span-8 left, image col-span-4 right). Image wrapper capped at `max-h-[535px]`. Pane title mb=22px. Point rows now `justify-start`. Section mt=105px on the section h2.
- **1920 (Desktop)**: same as 1280 — no further breakpoint changes after lg in MUI source.

---

## §5 RTL notes

`ar-about-us.tsx` makes these RTL-specific tweaks (vs LTR):

- Root `<Box>` adds `dir="rtl"`. The Tailwind port should rely on the parent layout's `dir` attribute via `useI18n().isRTL`.
- `.heading` (pane title) `textAlign: "right"` (LTR: `"left"`). Use `rtl:text-right` or condition on `isRTL`.
- `.paragraph` (pane body) `textAlign: "right"` (LTR: not specified, defaults to inherit).
- `CircleIcon` uses `marginLeft: "8px"` (LTR: `marginRight: "8px"`). The Tailwind port's `me-2` (logical end margin) already handles this correctly.
- `.mainHeading.justifyContent: "right"` (LTR: `"left"`). Use `rtl:justify-end` or condition on `isRTL`. Combined: `justify-start rtl:justify-end`.
- `.btnDiv.justifyContent: "flex-end"` (LTR: not specified, defaults to flex-start). Use `rtl:justify-end`.
- `.imageDiv.justifyContent: "right"` (LTR: `"left"`). `justify-start rtl:justify-end`.
- `.contentDiv.justifyContent: "right"` (LTR: `"left"`). Same pattern.
- The image's `::before` pseudo-element uses `right` instead of `left` for positioning in RTL — but since the LTR variant of `about-us.tsx` doesn't actually use a `::before` (it's defined in `styles.image` but the `style={styles.image}` prop on `<Image>` does NOT instantiate pseudo-elements; pseudo-elements need a CSS class/sx on a Box, not an `<Image style>`), this is **dead code in both LTR and RTL MUI sources**. Do not implement in Tailwind.
- Point row `direction: "rtl"` is applied at the inner `<Box>` level — Tailwind: relies on parent `dir="rtl"`.

Recommended pattern in the Tailwind port: pull `isRTL` from `useI18n()` and apply per-element conditional classes for `text-start`/`text-end`, `justify-start`/`justify-end`. The Tailwind config's `font-arabic` is auto-applied via `html[dir="rtl"] *` per the `01-token-mapping.md §1` rule, so no manual font-family overrides are required.
