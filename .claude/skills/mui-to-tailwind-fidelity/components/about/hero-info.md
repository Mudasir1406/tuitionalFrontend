# Component — `HeroInfo` (About page)

The bouncing "tutors" hero image that sits opposite the `Hero` headline on `/about`. A single decorative image with a continuous `bounce` animation, positioned at the right edge of its container on mobile/tablet and inline on desktop.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\about\hero-info.tsx` + `styles.module.css` (uses only `.animatedImg`) |
| Tailwind port | `tuitionalFrontend\src\components\about\hero-info.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\about\ar-hero-info.tsx` |

---

## §1 MUI source — extracted properties

### Layout tree

```
Box.contanier  (flex, justify-end)
└── Box.liveSessions  (flex-col, animation: bounce 6s)
    └── Image  (className=styles.animatedImg → object-fit: cover)
```

### Dimensions & spacing

| Element | Property | Mobile (<600) | Tablet (600–1199) | Desktop (≥1200) |
|---|---|---|---|---|
| `Box.contanier` | `display` | `flex` | `flex` | `flex` |
| `Box.contanier` | `alignItems` | `center` | `center` | `center` |
| `Box.contanier` | `justifyContent` | `end` | `end` | `end` |
| `Box.contanier` | `width` | `100%` | `100%` | `100%` |
| `Box.contanier` | `height` | `100%` | `100%` | `100%` |
| `Box.contanier` | `marginTop` | (not specified — falls through) | `15` (px, since bare number on `top/marginTop` is px) | `0` |
| `Box.contanier` | `position` | `relative` | `relative` | `relative` |
| `Box.liveSessions` | `display` | `flex` | `flex` | `flex` |
| `Box.liveSessions` | `flexDirection` | `column` | `column` | `column` |
| `Box.liveSessions` | `borderRadius` | `10px` | `10px` | `10px` |
| `Box.liveSessions` | `gap` | `2vh` | `2vh` | `2vh` |
| `Box.liveSessions` | `marginTop` | `-100px` | `-100px` | `-100px` |
| `Box.liveSessions` | `marginRight` | `80px` | `80px` | `80px` |
| `Box.liveSessions` | `animation` | `bounce 6s ease-in-out infinite` | same | same |
| `Image` | `className` | `styles.animatedImg` → `object-fit: cover` | same | same |

Note on MUI bare numerics: in MUI `sx`, `marginTop: 15` would normally be `theme.spacing(15) = 120px` — **but** MUI treats certain CSS props (top, bottom, left, right, height, width, marginTop on Box when surrounding context is non-theme) inconsistently. Reading source intent: the comment `// xs: 15` is commented out, and the actual `sm/md` value of `15` paired with `lg: 0` reads like a pixel pull-down. Treat as **120px** (`theme.spacing(15)`) for `marginTop` because no unit suffix means MUI spacing units. If the visual appears off by ~7×, swap to literal `15px`. The Tailwind port's `mt-[15px]` reads as 15px literal — this is the likely-correct interpretation for parity with the rendered baseline.

### Typography

None — image-only component.

### Colors

None used directly. The image content is opaque.

### Animations / interactions

- `animation: bounce 6s ease-in-out infinite` on `.liveSessions` wrapper.
- The `bounce` keyframe is defined in `tuitionalFrontend-mui-baseline\src\app\globals.css`. It is **not the same as Tailwind's built-in `animate-bounce`** (which is a faster, smaller-amplitude bounce). The custom keyframe must be ported into the Tailwind project's `globals.css` if it isn't already there.
- The current Tailwind port uses `animate-pulse` instead of `bounce` — this is wrong (pulse is opacity-based, bounce is transform-based).

---

## §2 Tailwind port — bug list

Current port: `tuitionalFrontend\src\components\about\hero-info.tsx` (lines 12–22).

| # | Line | Current Tailwind | Expected (per MUI) | Severity |
|---|---|---|---|---|
| HI1 | 12 | `mt-[15px] sm:mt-[15px] md:mt-[15px] lg:mt-0` on outer container | Per MUI, mobile (xs) has no `marginTop` set at all (it's commented out), so the value falls to default `0`. Only `sm/md` set `15` (likely `15px` literal — Tailwind read is correct). **Should be `sm:mt-[15px] md:mt-[15px] lg:mt-0`** (drop the base `mt-[15px]`). | medium |
| HI2 | 13 | `animate-pulse` on inner div | MUI uses `animation: bounce 6s ease-in-out infinite`. **Should be `animate-[bounce_6s_ease-in-out_infinite]`** (referring to a custom `@keyframes bounce` in `globals.css`, NOT Tailwind's built-in `animate-bounce` which has a different keyframe). Verify the custom `bounce` keyframe is present in `tuitionalFrontend/src/app/globals.css`; port it from the MUI baseline if missing. | high |
| HI3 | 13 | `me-20` (RTL-aware, ≈80px) | MUI uses fixed `marginRight: "80px"` regardless of RTL. In RTL the AR variant uses `marginLeft: "80px"` instead — so `me-20` is actually the **correct** RTL-aware translation. ✓ Keep. | — |
| HI4 | 13 | `-mt-[100px]` | ✓ Matches `marginTop: "-100px"`. Keep. | — |
| HI5 | 13 | `gap-[2vh]` | ✓ Matches. Keep. | — |
| HI6 | 13 | `rounded-md` (≡10px in this Tailwind config — check `01-token-mapping.md §7`) | MUI: `borderRadius: "10px"`. **`rounded-md` resolves to 10px per the token map.** ✓ Keep (verify in `tailwind.config.ts` — if `rounded-md` is the wrong value there, swap to `rounded-[10px]`). | low |
| HI7 | 19 | `className="object-contain"` on `<Image>` | MUI `.animatedImg` uses `object-fit: cover`. **Should be `object-cover`**. | medium |
| HI8 | 12 | `flex h-full w-full items-center justify-end` | ✓ Matches MUI `Box.contanier`. Keep. | — |
| HI9 | 12 | `relative` | ✓ Matches `position: "relative"`. Keep. | — |
| HI10 | (missing) | No explicit width/height on `<Image>` outside the file's `tutors.width/height` from the static import | ✓ MUI passes `tutors.width / tutors.height` the same way. Keep. | — |

---

## §3 Corrected Tailwind JSX

```tsx
"use client";

import React from "react";
import Image from "next/image";
import { useI18n } from "@/context/language-context";
import tutors from "../../../public/assets/images/static/about-hero-2.png";

const HeroInfo: React.FC = () => {
  const { isRTL } = useI18n();

  return (
    <div className="relative flex h-full w-full items-center justify-end sm:mt-[15px] md:mt-[15px] lg:mt-0">
      <div className="-mt-[100px] me-20 flex animate-[bounce_6s_ease-in-out_infinite] flex-col gap-[2vh] rounded-[10px]">
        <Image
          src={tutors.src}
          alt={isRTL ? "معلم" : "teacher"}
          width={tutors.width}
          height={tutors.height}
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default HeroInfo;
```

Per-element from → to:

| Element | From | To |
|---|---|---|
| Outer `<div>` | `relative mt-[15px] flex h-full w-full items-center justify-end sm:mt-[15px] md:mt-[15px] lg:mt-0` | `relative flex h-full w-full items-center justify-end sm:mt-[15px] md:mt-[15px] lg:mt-0` |
| Inner `<div>` | `-mt-[100px] me-20 flex animate-pulse flex-col gap-[2vh] rounded-md` | `-mt-[100px] me-20 flex animate-[bounce_6s_ease-in-out_infinite] flex-col gap-[2vh] rounded-[10px]` |
| `<Image>` className | `object-contain` | `object-cover` |

### Required globals.css block (if not already present)

```css
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-20px); }
}
```

(Confirm the exact MUI keyframe by reading `tuitionalFrontend-mui-baseline\src\app\globals.css` `@keyframes bounce { ... }`. Mirror it byte-for-byte rather than guessing.)

---

## §4 Verification at 4 reference widths

- **375 (iPhone SE)**: Image right-aligned, mt=0 (no `15px` here), inner div pulled up `-100px` and right-margined `80px` (RTL: left). Image bounces continuously.
- **768 (iPad Mini)**: Same as 375 except outer container has `mt-[15px]` (≈15px push-down).
- **1280 (Laptop S)**: `lg:mt-0` removes the 15px. Inner div still `-100px` top, `80px` right margin. Image bounces.
- **1920 (Desktop)**: Same as 1280 — no breakpoint after lg.

---

## §5 RTL notes

`ar-hero-info.tsx` mirrors only two properties:
- `Box.contanier.justifyContent`: `"start"` (LTR is `"end"`)
- `Box.liveSessions.marginLeft: "80px"` (LTR uses `marginRight: "80px"`)

The Tailwind port already handles this correctly via `me-20` (logical end-margin — flips RTL automatically). The `justify-end` will visually pull the image to the right (LTR) and to the left in RTL automatically only if `dir="rtl"` is set on a parent and a `rtl:justify-start` override is added. **Check the parent page for `dir="rtl"` cascade**; if `justify-end` is not auto-flipping, add explicit `rtl:justify-start` to the outer `<div>`:

```tsx
className="relative flex h-full w-full items-center justify-end rtl:justify-start ..."
```

The Tailwind port's use of `isRTL` for the `alt` text is correct.
