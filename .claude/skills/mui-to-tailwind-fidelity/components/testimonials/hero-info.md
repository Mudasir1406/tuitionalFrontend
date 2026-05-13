# Component — `HeroInfo` (testimonials)

The floating glassmorphic "review snippet + clients count + tutors photo" cluster that sits to the right of the testimonials hero on desktop. Three glass cards animate with a bounce keyframe.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\testimonials\hero-info.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\testimonials\hero-info.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\testimonials\ar-hero-info.tsx` |

---

## §1 MUI source — extracted properties

### Layout tree

```
Box .contanier (flex row, justify-between, w-100%, relative)
├── Box .registerStudentBox (glass card, animation bounce 5s)
│   ├── Typography .text  ──→ "Tuitional is a great place..."
│   └── Box (marginY 2px→10px responsive)
│       └── 5× StarPurple500OutlinedIcon (2vh × 2vh, color #FFCD6C)
└── Box .liveSessions (flex col, gap 2vh, animation bounce 6s)
    ├── Box .totalReview (glass pill)
    │   ├── Typography .totalReviewText  ──→ "15k" (blue square, white text)
    │   └── Typography .clientText       ──→ "Clients Reviews"
    └── Box .usersBox (glass card with tutors image)
        └── Image tutors (style width: 150px)
```

### Dimensions & spacing

| Element | Property | Mobile (xs) | sm | md | Desktop (lg) |
|---|---|---|---|---|---|
| `.contanier` | `width` | 100% | 100% | 100% | 100% |
| `.contanier` | `height` | (default) | (default) | (default) | `"70%"` |
| `.contanier` | `marginTop` | `15` (=120px MUI spacing units) | `15` | `0` | `"auto"` |
| `.contanier` | `position` | relative | — | — | — |
| `.registerStudentBox` | `width` | `"150px"` | `"170px"` | `"190px"` | `"280px"` |
| `.registerStudentBox` | `padding` | `"1.2vh"` | `"2.5vh"` | `"2.9vh"` | `"3.3vh"` |
| `.registerStudentBox` | `borderRadius` | `"10px"` | — | — | — |
| `.registerStudentBox` | `background` | `rgba(255,255,255,0.6)` | — | — | — |
| `.registerStudentBox` | `backdropFilter` | `blur(7.5px)` | — | — | — |
| `.registerStudentBox` | `border` | `1px solid rgba(255,255,255,0.18)` | — | — | — |
| `.registerStudentBox` | `boxShadow` | `0px 0px 30px 0px rgba(56,182,255,0.2)` | — | — | — |
| `.registerStudentBox` | `marginTop` | `"-100px"` | — | — | — |
| `.registerStudentBox` | `animation` | `bounce 5s ease-in-out infinite` | — | — | — |
| stars wrapper | `marginY` | `"2px"` | `"5px"` | `"5px"` | `"10px"` |
| `StarPurple500OutlinedIcon` | `height/width` | `"2vh"/"2vh"` | — | — | — |
| `StarPurple500OutlinedIcon` | `color` | `rgba(255,205,108,1)` (`#FFCD6C`) | — | — | — |
| `.liveSessions` | `flexDirection` | column | — | — | — |
| `.liveSessions` | `gap` | `"2vh"` | — | — | — |
| `.liveSessions` | `marginTop` | `"-100px"` | — | — | — |
| `.liveSessions` | `borderRadius` | `"10px"` (no children rounded here) | — | — | — |
| `.liveSessions` | `animation` | `bounce 6s ease-in-out infinite` | — | — | — |
| `.totalReview` | `width` | `"163px"` | `"210px"` | `"220px"` | `"235px"` |
| `.totalReview` | `height` | `"49px"` | `"55px"` | `"62px"` | `"73px"` |
| `.totalReview` | `gap` | `"10px"` | — | — | — |
| `.totalReview` | `marginTop` | `"-100px"` | — | — | — |
| `.totalReview` | `background` | `rgba(255,255,255,0.6)` + blur(7.5px) | — | — | — |
| `.totalReview` | `border` | `1px solid rgba(255,255,255,0.18)` | — | — | — |
| `.totalReview` | `borderRadius` | `"10px"` | — | — | — |
| `.totalReview` | `animation` | `bounce 6s ease-in-out infinite` | — | — | — |
| `.totalReviewText` (blue square) | `width` | `"4.5vh"` | `"4.7vh"` | `"4.7vh"` | `"9vh"` |
| `.totalReviewText` | `height` | `"4.5vh"` | `"5.2vh"` | `"5.2vh"` | `"5.5vh"` |
| `.totalReviewText` | `borderRadius` | `"5px"` | `"7.5px"` | `"10px"` | `"15px"` |
| `.totalReviewText` | `backgroundColor` | `rgba(56,182,255,1)` | — | — | — |
| `.totalReviewText` | `marginRight` | `"0.2vw"` | — | — | — |
| `.usersBox` | `padding` | `"2vh"` | — | — | — |
| `.usersBox` | `borderRadius` | `"10px"` | — | — | — |
| `.usersBox` | `background` | `rgba(255,255,255,0.6)` + blur(7.5px) | — | — | — |
| `.usersBox` | `border` | `1px solid rgba(255,255,255,0.18)` | — | — | — |
| `.usersBox` | `boxShadow` | `0px 0px 30px 0px #38B6FF33` | — | — | — |
| tutors `<Image>` | `style.width` | `"150px"` | — | — | — |

> **Trap**: MUI `marginTop: { xs: 15 }` (bare number) is `15 × 8 = 120px`, not 15px. Current Tailwind port wrote `mt-[15px]` — that is **wrong**.

### Typography

| Element | MUI variant | Mobile | sm | md | Desktop | Weight | Color | Font |
|---|---|---|---|---|---|---|---|---|
| `.text` (review quote) | default `Typography` | `1.3vh` | `1.3vh` | `1.4vh` | `1.6vh` | 400 | black | League Spartan |
| `.text` line-height | — | `1.4vh` | `1.4vh` | `1.5vh` | `2vh` | — | — | — |
| `.totalReviewText` ("15k") | default | `1.5vh` | `1.5vh` | `1.7vh` | `2.5vh` | 600 | white | League Spartan |
| `.totalReviewText` line-height | — | `1.4vh` | `1.4vh` | `1.7vh` | `2vh` | — | — | — |
| `.clientText` ("Clients Reviews") | default | `1.3vh` | `1.6vh` | `1.6vh` | `1.6vh` | 600 | black | League Spartan |
| `.clientText` line-height | — | `1.3vh` | `1.6vh` | `1.6vh` | `1.6vh` | — | — | — |

### Colors

| Hex / rgba | Tailwind token |
|---|---|
| `black` | `text-black` |
| `white` (15k label text & registerStudentBox bg) | `text-white` / `bg-white` |
| `rgba(56,182,255,1)` (`#38B6FF` square bg) | `bg-brand-500` |
| `rgba(255,205,108,1)` (`#FFCD6C` star) | fill/text via `text-[#FFCD6C]` and `fill-[#FFCD6C]` |
| `rgba(255,255,255,0.6)` glass bg | `bg-white/60` |
| `rgba(255,255,255,0.18)` glass border | `border-white/[0.18]` |
| `rgba(56,182,255,0.2)` registerStudentBox shadow | preserve via arbitrary `shadow-[0px_0px_30px_0px_rgba(56,182,255,0.2)]` |
| `#38B6FF33` usersBox shadow (20% alpha) | preserve via `shadow-[0px_0px_30px_0px_#38B6FF33]` |

### Animations / interactions

- `registerStudentBox`: `animation: "bounce 5s ease-in-out infinite"` — uses the custom keyframe `@keyframes bounce` defined in MUI `globals.css`. **Not** Tailwind's default `animate-bounce` (which is a different curve).
- `liveSessions`: `animation: "bounce 6s ease-in-out infinite"`
- `totalReview`: `animation: "bounce 6s ease-in-out infinite"`
- The Tailwind side must either replicate the `@keyframes bounce` block in its own `globals.css` and reference it via `animate-[bounce_5s_ease-in-out_infinite]`, or extend `tailwind.config.ts` with the keyframe. Current port has **no animation** on any of the three glass cards — that's a visible regression.

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected (per MUI) | Severity |
|---|---|---|---|---|
| B1 | 13 | `mt-[15px]` on `.contanier` | `mt-[120px]` (MUI `marginTop: 15` is `15 × 8 = 120px`, not 15px). Same for `sm:mt-[15px]` → `sm:mt-[120px]` and `md:mt-0` is right. **`lg:mt-auto` matches.** | High |
| B2 | 13 | `flex h-full w-full items-center justify-between` then `lg:h-[70%]` | MUI `.contanier` has `width: "100%"` always; only `height` is responsive `{ lg: "70%" }`. The Tailwind port uses `h-full` at base — MUI has no default height. Remove `h-full` so the base height is content-driven. | Medium |
| B3 | 14 | `rounded-md` (= 8px in Tailwind preset) on `.registerStudentBox` | MUI `borderRadius: "10px"` → `rounded-[10px]` (or `rounded-md` if Tailwind config maps `md` to 10px; current config does map `rounded-md` to 10px per [01-token-mapping.md §7], so OK). | OK ✓ if config matches |
| B4 | 14 | `.registerStudentBox`: missing `animation` | Add `animate-[bounce_5s_ease-in-out_infinite]` (requires `@keyframes bounce` to be present in `globals.css`). | High |
| B5 | 15 | `.text` quote: `font-heading text-[1.3vh] font-normal leading-[1.4vh] text-black md:text-[1.4vh] md:leading-[1.5vh] lg:text-[1.6vh] lg:leading-[2vh]` | Missing the `sm:` step — MUI keeps `xs` value at `sm` (both `1.3vh`/`1.4vh`), so no `sm:` override needed. Current is **correct**. | OK ✓ |
| B6 | 18 | Stars wrapper: `my-[2px] sm:my-[5px] lg:my-[10px]` | MUI has `md: "5px"` too (same as sm), so the current `sm:my-[5px]` cascades through md → OK. | OK ✓ |
| B7 | 21 | Stars use `lucide-react`'s `<Star>` `fill-[#FFCD6C] text-[#FFCD6C] h-[2vh] w-[2vh]` | MUI uses `StarPurple500OutlinedIcon` (an outlined star). Lucide `<Star>` filled is **visually different**. Confirm whether a "purple500 outlined" equivalent exists or accept the design substitution. Severity depends on design tolerance — likely OK if filled-yellow matches the intended look. | Low |
| B8 | 28 | `.liveSessions`: `flex flex-col gap-[2vh] -mt-[100px] rounded-md` | Missing animation `animate-[bounce_6s_ease-in-out_infinite]`. Also `rounded-md` is redundant — MUI sets it but children are individually rounded; harmless. | High (anim) |
| B9 | 29 | `.totalReview`: only `h-[49px] w-[163px] ... gap-[10px] rounded-md border border-white/[0.18] bg-white/60 -mt-[100px] backdrop-blur-[7.5px] sm:h-[55px] sm:w-[210px] md:h-[62px] md:w-[220px] lg:h-[73px] lg:w-[235px]` | Missing `animate-[bounce_6s_ease-in-out_infinite]`. | High |
| B10 | 30 | `.totalReviewText`: `me-[0.2vw] flex h-[4.5vh] w-[4.5vh] items-center justify-center rounded-[5px] bg-brand-500 text-center text-[1.5vh] font-semibold leading-[1.4vh] text-white sm:h-[5.2vh] sm:w-[4.7vh] sm:rounded-[7.5px] md:h-[5.2vh] md:w-[4.7vh] md:rounded-[10px] md:text-[1.7vh] md:leading-[1.7vh] lg:h-[5.5vh] lg:w-[9vh] lg:rounded-[15px] lg:text-[2.5vh] lg:leading-[2vh]` | MUI `width` cascade: `4.5vh / 4.7vh / 4.7vh / 9vh` and `height`: `4.5vh / 5.2vh / 5.2vh / 5.5vh`. Currently the Tailwind sets `h-[4.5vh] w-[4.5vh]` at base but no `sm:w-*` (skipping → `sm:w-[4.7vh]` is present). Looks correct after re-read. Font-size: `1.5vh / 1.5vh / 1.7vh / 2.5vh`; current has base 1.5vh, then md:1.7vh, lg:2.5vh — missing `sm:` (but sm = 1.5vh = base). OK. | OK ✓ |
| B11 | 30 | `.totalReviewText` uses `font-semibold` (600) | ✓ Matches MUI `fontWeight: 600`. | OK ✓ |
| B12 | 33 | `.clientText`: `text-[1.3vh] sm:text-[1.6vh] leading-[1.3vh] sm:leading-[1.6vh]` | ✓ Matches MUI cascade. | OK ✓ |
| B13 | 38 | `.usersBox`: `relative flex flex-col rounded-md border border-white/[0.18] bg-white/60 p-[2vh] shadow-[0px_0px_30px_0px_#38B6FF33] backdrop-blur-[7.5px]` | ✓ Matches. No `animation` on `.usersBox` in MUI → no animation needed here. | OK ✓ |
| B14 | 44 | Tutors `<Image>` uses `className="w-[150px]"` only | ✓ Matches MUI inline `style.width: "150px"`. | OK ✓ |
| B15 | 13 | `.contanier`: missing `flexDirection: row` (Tailwind defaults to row → OK) | OK | OK ✓ |
| B16 | n/a | Decorative font on `.text` is `font-heading` (League Spartan); ✓ matches `leagueSpartan.className`. | OK ✓ |  |

### Critical fixes

1. **B1** — `mt-[15px]` → `mt-[120px]` is the single largest visual bug. The whole cluster sits 105px higher than designed.
2. **B4/B8/B9** — missing `bounce` animations on three cards. Reading from MUI source the cluster should be visibly floating.

---

## §3 Corrected Tailwind classNames

```tsx
return (
  <div className="relative mt-[120px] flex w-full items-center justify-between sm:mt-[120px] md:mt-0 lg:mt-auto lg:h-[70%]">
    {/* Register/Quote glass card */}
    <div className="relative -mt-[100px] flex w-[150px] flex-col rounded-[10px] border border-white/[0.18] bg-white/60 p-[1.2vh] shadow-[0px_0px_30px_0px_rgba(56,182,255,0.2)] backdrop-blur-[7.5px] animate-[bounce_5s_ease-in-out_infinite] sm:w-[170px] sm:p-[2.5vh] md:w-[190px] md:p-[2.9vh] lg:w-[280px] lg:p-[3.3vh]">
      <p className="font-heading text-[1.3vh] font-normal leading-[1.4vh] text-black md:text-[1.4vh] md:leading-[1.5vh] lg:text-[1.6vh] lg:leading-[2vh]">
        {t("testimonials.hero_info.review_quote")}
      </p>
      <div className="my-[2px] flex sm:my-[5px] lg:my-[10px]">
        {[0, 0, 0, 0, 0].map((_, index) => (
          <Star
            key={index}
            className="h-[2vh] w-[2vh] fill-[#FFCD6C] text-[#FFCD6C]"
          />
        ))}
      </div>
    </div>

    {/* Live sessions column */}
    <div className="flex flex-col gap-[2vh] -mt-[100px] rounded-[10px] animate-[bounce_6s_ease-in-out_infinite]">
      <div className="flex h-[49px] w-[163px] items-center justify-center gap-[10px] rounded-[10px] border border-white/[0.18] bg-white/60 -mt-[100px] backdrop-blur-[7.5px] animate-[bounce_6s_ease-in-out_infinite] sm:h-[55px] sm:w-[210px] md:h-[62px] md:w-[220px] lg:h-[73px] lg:w-[235px]">
        <span className="me-[0.2vw] flex h-[4.5vh] w-[4.5vh] items-center justify-center rounded-[5px] bg-brand-500 text-center font-heading text-[1.5vh] font-semibold leading-[1.4vh] text-white sm:h-[5.2vh] sm:w-[4.7vh] sm:rounded-[7.5px] md:h-[5.2vh] md:w-[4.7vh] md:rounded-[10px] md:text-[1.7vh] md:leading-[1.7vh] lg:h-[5.5vh] lg:w-[9vh] lg:rounded-[15px] lg:text-[2.5vh] lg:leading-[2vh]">
          {t("testimonials.hero_info.client_count")}
        </span>
        <span className="font-heading text-[1.3vh] font-semibold leading-[1.3vh] text-black sm:text-[1.6vh] sm:leading-[1.6vh]">
          {t("testimonials.hero_info.client_label")}
        </span>
      </div>

      <div className="relative flex flex-col rounded-[10px] border border-white/[0.18] bg-white/60 p-[2vh] shadow-[0px_0px_30px_0px_#38B6FF33] backdrop-blur-[7.5px]">
        <Image
          src={tutors.src}
          width={tutors.width}
          height={tutors.height}
          alt={t("testimonials.hero_info.tutors_alt")}
          className="w-[150px]"
        />
      </div>
    </div>
  </div>
);
```

### From → To

| From | To |
|---|---|
| `mt-[15px]` (root) | `mt-[120px]` |
| missing `animate-*` on register-card | `animate-[bounce_5s_ease-in-out_infinite]` |
| missing `animate-*` on `.liveSessions` | `animate-[bounce_6s_ease-in-out_infinite]` |
| missing `animate-*` on `.totalReview` pill | `animate-[bounce_6s_ease-in-out_infinite]` |
| `h-full` on root | (remove — MUI has no base height) |
| `rounded-md` on register-card (if config map ≠ 10px) | `rounded-[10px]` |

Also confirm `@keyframes bounce` exists in `tuitionalFrontend/src/app/globals.css` (copy from MUI baseline `globals.css` if missing).

---

## §4 Verification at 4 widths

- **375 px** — Register card 150px × content + 1.2vh padding, top-offset `-100px`. Total cluster `marginTop = 120px`. Stars 2vh size, gap 2px. Live-sessions column to the right; "15k" pill 163×49 with the 4.5vh blue square. Visible bounce animation.
- **768 px** — Register card 170px wide, padding 2.5vh. Stars wrapper 5px. Pill 210×55, blue square 4.7×5.2vh, radius 7.5px. Still `mt-[120px]` on root.
- **1280 px** — Register card 280px, padding 3.3vh. Pill 235×73, blue square 9×5.5vh, radius 15px. Root `mt-auto` (cluster aligned to flex parent rules), height `70%`.
- **1920 px** — Same as 1280; cluster scales by the parent's flex layout.

---

## §5 RTL notes

- MUI `.totalReviewText` has `marginRight: "0.2vw"` in LTR; the `ar-` variant changes this to `marginLeft: "0.2vw"`. Tailwind logical class `me-[0.2vw]` resolves to `margin-inline-end` and **auto-flips** with `dir="rtl"`. Current port uses `me-[0.2vw]` → ✓ correct.
- The `dir` attribute is not set in the Tailwind port; assume the page-level `<html dir>` controls it. Otherwise add `dir={isRTL ? "rtl" : "ltr"}` to the root `<div>`.
- `flex justify-between` in RTL naturally reverses the visual order of the register card and live-sessions column — verify this matches the AR design (the MUI `ar-hero-info.tsx` keeps the same JSX order and relies on dir to flip).
