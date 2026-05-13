# Component — `SchoolLogosSection`

A "trusted by" infinite-scroll banner of school logos. Logos are duplicated so the horizontal `translateX(-50%)` keyframe creates a seamless loop. Background is a left-to-right white → blue gradient.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\school-logos-section\SchoolLogosSection.tsx` + `SchoolLogosSection.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\school-logos-section\SchoolLogosSection.tsx` |

## §1 MUI source — extracted properties

### Layout tree

```
div .main                                          (gradient bg, flex, overflow-hidden, padding 1vh)
  div .logosDiv                                    (flex row, items-center, justify-start, gap 48px, animation slide 50s linear infinite)
    div .logoWrapper                               (flex, gap 48px)
      × N Image (logo, 100×100, objectFit contain)  + duplicated set
```

NOTE: MUI source has `logoWrapper` wrapping ONE batch of logos and the SECOND batch is rendered OUTSIDE `logoWrapper` (siblings of `logoWrapper` inside `logosDiv`). Actually re-reading — looking at lines 14-37 closer, `.logoWrapper` wraps BOTH batches (the duplicate `.map` is also inside `.logoWrapper`). All logos are direct children of `.logoWrapper`.

### Dimensions & spacing

| Element | Property | Value |
|---|---|---|
| `.main` | bg | `linear-gradient(to right, white, #58b9f6)` |
| `.main` | display / overflow | flex / hidden |
| `.main` | padding | 1vh |
| `.logosDiv` | display | flex |
| `.logosDiv` | flex-direction | row |
| `.logosDiv` | align-items / justify-content | center / flex-start |
| `.logosDiv` | gap | 48px |
| `.logosDiv` | animation | slide 50s linear infinite |
| `.logoWrapper` | display / gap | flex / 48px |
| Logo Image | width × height | 100 × 100 |

### Animation

```css
@keyframes slide {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

Duration: **50s linear infinite**.

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 12 | `bg-gradient-to-r from-white to-[#58b9f6] p-[1vh]` ✓ | matches MUI `.main` gradient + padding | OK |
| B2 | 13 | `animate-[slide_50s_linear_infinite] flex-row gap-12 whitespace-nowrap` | matches animation duration and direction ✓. `gap-12` (=48px) ✓. `whitespace-nowrap` is extra but harmless. | OK |
| B3 | 13 | (port collapses `.logoWrapper` into `.logosDiv`) | MUI source has both batches inside `.logoWrapper`, but visual result is identical when `.logosDiv` and `.logoWrapper` both have `gap: 48px`. Effectively the same. | OK |
| B4 | 13 | (no `items-center justify-start` explicit) | MUI: `align-items: center, justify-content: flex-start`. Port has only `items-center` via parent flex defaults — `items-center` is missing. | **Med** — logos may not vertically center if heights vary |
| B5 | 13 | (no `flex` listed; using `flex flex-row`?) | Should be `flex flex-row items-center justify-start`. Port has `flex-row` (no explicit `flex`) but parent `.flex` from line 12 wraps. Inner div is line 13 — need both `flex flex-row items-center`. | **Med** |
| B6 | 21, 31 | logo `w-auto object-contain` (no fixed dim classes) | MUI `Image width={100} height={100} objectFit="contain"` — Next.js Image renders intrinsic; both sides use `<Image>` with same props ✓. Adding `w-auto` is fine. | OK |
| B7 | n/a | verify `@keyframes slide` is defined in Tailwind's `globals.css` or `tailwind.config.ts` | MUI defines `@keyframes slide` in the `.module.css`. Tailwind's `animate-[slide_…]` relies on a keyframe named `slide` existing globally. **Check tailwind.config.ts or globals.css.** | **Critical** — if keyframe is missing, animation does nothing |

## §3 Corrected Tailwind classNames

```tsx
<div className="flex overflow-hidden bg-gradient-to-r from-white to-[#58b9f6] p-[1vh]">
  <div className="flex animate-[slide_50s_linear_infinite] flex-row items-center justify-start gap-12">
    {trustedSchools?.images.map((logo, i) => (
      <Image key={i} src={logo} alt="logo" width={100} height={100} className="w-auto object-contain" />
    ))}
    {trustedSchools?.images.map((logo, i) => (
      <Image key={`duplicate-${i}`} src={logo} alt="logo" width={100} height={100} className="w-auto object-contain" />
    ))}
  </div>
</div>
```

Plus, verify `tailwind.config.ts` has:
```ts
keyframes: {
  slide: {
    "0%":   { transform: "translateX(0)" },
    "100%": { transform: "translateX(-50%)" },
  },
}
animation: {
  slide: "slide 50s linear infinite",
}
```
If absent, add it (sanctioned foundation edit per `04-foundation-fixes.md`).

## §4 Verification at 4 widths

- **375 (xs)**: gradient bg, logos at 100px height scrolling left at 50s loop.
- **768 (sm)**: same — single-row scroller.
- **1280 (lg)**: same — wider viewport shows more logos.
- **1920**: same — even more visible.

## §5 RTL notes

- Background gradient direction is `to right` — in RTL it does NOT auto-flip (Tailwind `bg-gradient-to-r` is logical-LTR). To flip in Arabic, use `bg-gradient-to-l` conditionally or wrap with logical CSS.
- Animation `translateX(-50%)` moves logos to the left. In RTL it should move to the right to feel natural; either flip the keyframe (`translateX(50%)`) under `[dir="rtl"]` or accept the LTR-direction scroll (most clients use the same scroll direction regardless of `dir`).
- Logos themselves are direction-agnostic.
