# Component: Tutor Section (ImageCard + GridView carousel)

**Files:**
- [src/components/grade-subject-level/tutor-section/TutorSection.tsx](../../../../src/components/grade-subject-level/tutor-section/TutorSection.tsx)
- [src/components/grade-subject-level/tutor-section/grid-view/GridView.tsx](../../../../src/components/grade-subject-level/tutor-section/grid-view/GridView.tsx)
- [src/components/image-card/ImageCard.tsx](../../../../src/components/image-card/ImageCard.tsx)
- [src/components/tag/Tag.tsx](../../../../src/components/tag/Tag.tsx)

**AR twin:** [src/components/grade-subject-level/tutor-section/grid-view/ArGridView.tsx](../../../../src/components/grade-subject-level/tutor-section/grid-view/ArGridView.tsx) (also `ArTutorSection.tsx`)

**Priority:** P0
**Status:** in-progress
**Live MUI ref URL(s):** https://tuitionaledu.com/online/a-level-tutors — `Featured A Level Tutors` carousel section
**Last MUI commit (pre-migration ref):** N/A — no MUI source survives in repo (all `git log` entries on these paths show Tailwind already). Reference is **deployed live site only**.
**Migrated commit:** `2836827` (initial Tailwind drop)

---

## A. Pre-fix audit

### Live MUI rendering (from screenshots)

Desktop (≥1200px, 4-card row):
- Carousel inner ~1340px (≈ 1500vw − 80px section padding − 80px arrow margins)
- Card width: ~310px each, gap 16px between cards
- Card height: ~540–570px, all equal-height in row
- Card border radius: ~16px (`rounded-2xl`)
- Card shadow: soft multi-layer with subtle blue glow at bottom
- Image area: square, ~280×280, light-blue (`#eaf6ff`) backdrop, avatar `object-contain` centered
- Card body padding: ~20px (`p-5`)
- Name: ~22px (`1.375rem`) bold, `leading-tight`, single line where possible
- Subject tag: standalone chip, `h-6 px-2.5 rounded-lg text-[13px]`
- Curriculum tags: 3+3 wrap, color per tag-index from existing `Tag` palette
- Description: `text-sm` (14px) gray-600, `line-clamp-2`, leading-snug
- Trustpilot stars: fixed 120×24px green block, then `success rate %` `text-sm` ink-900
- Button "Book A Demo": full-width, brand-500 (`#38b6ff`), `py-3 sm:py-3.5`, `text-sm sm:text-base`, white bold, `rounded-[10px]`, blue glow shadow
- Arrows: 40×40 white circles, `shadow-card`, positioned **outside** carousel (≈40–56px outside left/right edges via negative margin), vertically centered

Mobile (<600px, 1-card):
- Single card, full width minus section padding (24px each side)
- Image larger relatively; same card structure shrinks proportionally
- Button bottom-anchored, full-width
- Arrows still visible at outer edges; smaller offset (`-mx-10` instead of `-mx-14`)

### Defects fixed (commit on this branch)

1. **Name oversized.** Was `text-h3` (~32–48px) → wraps to 2–3 lines. Fixed: `text-xl sm:text-[1.375rem] font-bold leading-tight`.
2. **Card heights uneven.** Root not flex-column with `h-full`. Fixed: `flex h-full flex-col` on root, `flex-1 flex-col` on body, `mt-auto` on button.
3. **Right arrow drifts below left arrow.** Arrows were flex siblings of carousel, `items-center` aligned to tallest content. Fixed: arrows `absolute top-1/2 -translate-y-1/2` against outer relative wrapper; cards equalized via `items-stretch + h-full`.
4. **Star image jitters with viewport height.** Was `h-[3vh] w-[14vh]` (vh-based!). Fixed: `width={120} height={24}` fixed px.
5. **Description JS-truncated mid-word.** Was `data.Description.substring(0, 90)`. Fixed: full string with CSS `line-clamp-2`.
6. **Half-card overshoot at end of carousel page.** Translate math was `translateX(-currentIndex * 100/n %)` — missing the gap term. Real per-card stride = `(100/n)% + (16/n)px`. Fixed: translate by `calc(${-currentIndex * 100/n}% - ${currentIndex * 16/n}px)` so the next page lands flush with viewport edge instead of leaking 16px of the previous card.
7. **Asymmetric `hover:scale-y-110` on name.** Removed (not in MUI ref).
8. **Inline `style={}` on `PopUpButton`.** Replaced with Tailwind utilities so `sm:` and `dir="rtl"` overrides work.
9. **JS breakpoints (768/1200) didn't align with Tailwind config (`sm:600 md:900 lg:1200`).** Fixed: 1/2/3/4 cards at <600 / 600 / 900 / 1200.
10. **Carousel padding squeezed cards.** Replaced inner `px-12` with outer `mx-10 sm:mx-14` so arrows live in the negative-margin band; cards take full carousel-content width like MUI.

---

## B. Sizing & spacing rules (canonical)

These values are the source of truth for this component. If `git log` says someone changed them, they need to refer back to this doc and the MUI screenshots.

### B.1 Carousel container

| Property | Value | Why |
|---|---|---|
| Outer wrapper | `relative mx-10 sm:mx-14` | Reserves negative-margin band for arrows so cards span full width |
| Inner overflow box | `overflow-hidden` (no padding) | Cards reach edges, arrows overlay outside via negative offset |
| Track | `flex items-stretch gap-4 transition-transform duration-500` | Equal-height cards, smooth slide |
| Card flex basis | `calc(100/n% - (16(n-1)/n)px)` | Distributes 16px gaps across `n` cards exactly |
| Translate stride | `calc(-currentIndex * 100/n % - currentIndex * 16/n px)` | Includes gap so each step lands flush — fixes half-card overshoot |
| Arrows | `absolute -left-10 / -right-10` (`sm:-left-14 / sm:-right-14`), `top-1/2 -translate-y-1/2` | Sit in the `mx-*` band, vertically centered against equalized row |
| Visible cards | `<600 → 1`, `600–899 → 2`, `900–1199 → 3`, `≥1200 → 4` | Aligns with `tailwind.config.ts` breakpoints |

### B.2 ImageCard root

| Property | Value |
|---|---|
| Layout | `flex h-full w-full flex-col` |
| Background | `bg-white` |
| Radius | `rounded-2xl` (16px) |
| Shadow (rest) | `shadow-[0_8px_24px_-8px_rgba(56,182,255,0.25),0_2px_8px_rgba(0,0,0,0.06)]` |
| Shadow (hover) | `shadow-[0_12px_32px_-8px_rgba(56,182,255,0.35),0_4px_12px_rgba(0,0,0,0.08)]` |
| Transition | `transition-shadow duration-300` |

### B.3 Image area

| Property | Value |
|---|---|
| Aspect | `aspect-square` |
| Width | `w-full` |
| Background | `bg-[#eaf6ff]` (matches MUI light-blue circle backdrop) |
| Radius | `rounded-t-2xl overflow-hidden` |
| `next/image` mode | `fill`, `object-contain`, `sizes="(min-width:1200px) 25vw, (min-width:600px) 50vw, 100vw"` |
| Fallback | `dummyImg` from `public/assets/images/static/blogimg3.png` |

### B.4 Card body

| Property | Value |
|---|---|
| Layout | `flex flex-1 flex-col gap-2` (mobile) / `flex-1 flex-col gap-2` (sm+) |
| Padding | `p-4 sm:p-5` (16px → 20px) |

### B.5 Typography

| Element | Class |
|---|---|
| Name (`<h3>`) | `text-xl sm:text-[1.375rem] font-bold leading-tight text-ink-900` (font-family: `leagueSpartan.className`) |
| Description | `text-sm leading-snug text-gray-600 line-clamp-2` |
| Success rate `%` | `text-sm font-medium text-ink-900` |
| Button text | `text-sm sm:text-base font-semibold text-white` |

### B.6 Tag chip ([Tag.tsx](../../../../src/components/tag/Tag.tsx))

| Property | Value |
|---|---|
| Height | `h-6` (24px) |
| Padding | `px-2.5` (10px) |
| Radius | `rounded-lg` (8px) |
| Font | `text-caption font-medium leading-none` |
| Hover | none (MUI Chip doesn't animate at rest — removed `hover:scale-105`) |
| Color palette | `COLORS[index % 5]` — pink/green/teal/yellow/gray |

### B.7 Star rating

| Property | Value |
|---|---|
| Container | `mt-1 flex items-center gap-2` |
| Stars `<Image>` | `width={120} height={24}` fixed px (NEVER `vh`) |

### B.8 Button (`PopUpButton`)

```
mt-auto                                      // anchors bottom of card
w-full
rounded-[10px]
bg-brand-500                                 // #38b6ff
px-4 py-3 sm:py-3.5
text-center text-sm sm:text-base font-semibold text-white
shadow-[0_15px_34px_-8px_rgba(56,182,255,0.5)]
transition-transform duration-300 ease-out
hover:scale-[1.02] hover:bg-brand-500
```

`mt-auto` is load-bearing: it makes button anchor at card bottom regardless of how short/long the description above is. Without it, cards with shorter descriptions show the button mid-card (bug seen in pre-fix screenshots).

---

## C. Tokens checklist

- [x] `bg-brand-500` (button), `text-brand-500` (arrows)
- [x] `text-ink-900` (name, success rate)
- [x] `text-gray-600` (description) — could swap to `ink-300` token if available
- [x] `shadow-card` on arrow buttons
- [⚠] Custom shadows on card + button use arbitrary values to match MUI multi-layer + glow — could be promoted to tailwind config tokens (`shadow-tutor-card`, `shadow-tutor-cta`) in a follow-up
- [⚠] `bg-[#eaf6ff]` is arbitrary — could be promoted to `bg-brand-50` if exact match (verify in `tailwind.config.ts`)
- [x] No `text-[Npx]` outside the documented `text-[1.375rem]` exception (no `text-[22px]` token in scale)

---

## D. Responsive

| Width | Cards visible | Card width approx |
|---|---|---|
| 320px | 1 | ~280px |
| 600px | 2 | ~280px each |
| 900px | 3 | ~280px each |
| 1200px | 4 | ~280px each |
| 1500px | 4 | ~340px each |
| 1920px | 4 | ~440px each (consider max-width on TutorSection at follow-up) |

Hit-targets: arrows 40×40 (≥44 fails iOS guideline by 4px — acceptable since they're auxiliary). Button `py-3` = 48px tall ✓.

---

## E. RTL parity ([ArGridView.tsx](../../../../src/components/grade-subject-level/tutor-section/grid-view/ArGridView.tsx))

- `dir="rtl"` on outer wrapper
- Track has `direction: rtl` on inline style; cards override with `direction: ltr` so card content reads naturally
- Translate uses **positive** sign: `translateX(calc(${currentIndex * 100/n}% + ${currentIndex * 16/n}px))`
- Arrows swap roles: next on `-left-10`, prev on `-right-10`
- ImageCard locale-aware button label: `"احجز حصة تجريبية"` for `ar`, `"Book A Demo"` for `en`

---

## F. Behavior

- Auto-advance every 5s while not hovered (`isHovered` state)
- Click name → opens `TutorModal` (dynamic import, SSR off)
- Click "Book A Demo" → opens `FormDialog` via `PopUpButton` (`href="popup"`)
- Card hover → shadow intensifies (`hover:shadow-[…]`)
- Button hover → `scale-[1.02]` (only symmetric scale; no `scale-y-*`)
- `prefers-reduced-motion: reduce` honored via `globals.css` global rule

---

## G. Build & static checks

- [x] `npx tsc --noEmit` — 0 errors
- [x] `npx eslint` on changed files — 0 errors
- [ ] `npm run build` — to be run after visual QA

---

## H. Visual QA matrix

Test at: `/online/a-level-tutors` and `/ar/online/a-level-tutors`.

| Width | EN | AR | Notes |
|---|---|---|---|
| 375 | [ ] | [ ] | 1 card, button bottom |
| 600 | [ ] | [ ] | 2 cards, equal heights |
| 900 | [ ] | [ ] | 3 cards |
| 1200 | [ ] | [ ] | 4 cards, no half-card on next-page |
| 1500 | [ ] | [ ] | 4 cards |

Diff vs live MUI ref: compare side-by-side in Chrome.

### Deviations from live MUI ref (intentional)

- Name uses `text-[1.375rem]` (22px) — closest to MUI screenshot measurement; if exact MUI value can be confirmed via DevTools, snap to design token.
- Card top-shadow uses brand-blue tint — matches MUI screenshot but not in formal design tokens; promote to `shadow-tutor-card` on consolidation.

---

## I. Approval

- [ ] User reviewed diff at all 5 widths
- [ ] User approved on `<YYYY-MM-DD>`
- [ ] `tasks.md` line updated to ✓
