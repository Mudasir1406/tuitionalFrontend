# Component — `HeroInfo` (careers)

Two floating stat badges that overlap the hero illustration on the careers page. Left badge: "800+ Vacancy Available / Apply Now". Right badge: tutors avatars + "50k Active Employee". Both `marginTop:-100px` to overlap the hero image, with `animation: bounce ... infinite`.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\careers\hero-info.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\careers\hero-info.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\careers\ar-hero-info.tsx` |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Box styles.contanier>                          // flex space-between, w:100%, h responsive
├── <Box styles.registerStudentBox>             // LEFT badge — bounce 5s, p:2vw, mt:-100px
│   ├── <Typography (800+, h1-ish stat)>
│   ├── <Typography ("Vacancy Available")>
│   └── <Typography ("Apply Now", #38B6FF)>
└── <Box styles.liveSessions>                   // RIGHT col — bounce 6s, mt:-100px
    └── <Box styles.usersBox>                   // border + shadow inner card
        ├── <Image tutors avatars>
        ├── <Typography ("50k")>
        └── <Typography ("Active Employee")>
```

### Dimensions & spacing

| Element | Property | Mobile (<600) | Tablet (600-1199) | Desktop (≥1200) |
|---|---|---|---|---|
| `.contanier` | `display` | `"flex"` | same | same |
| `.contanier` | `alignItems` | `"end"` (flex-end) | same | same |
| `.contanier` | `justifyContent` | `"space-between"` | same | same |
| `.contanier` | `width` | `"100%"` | same | same |
| `.contanier` | `height` | `"100px"` | `"200px"` (sm), `"100%"` (md) | `"100%"` |
| `.contanier` | `marginTop` | `0` | `0` | `0` |
| `.contanier` | `position` | `"relative"` | same | same |
| `.registerStudentBox` | `boxShadow` | `"0px 0px 30px 0px rgba(56, 182, 255, 0.2)"` | same | same |
| `.registerStudentBox` | `padding` | `"2vw"` | `"2vw"` | `"2vw"` |
| `.registerStudentBox` | `flexDirection` | `"column"` | same | same |
| `.registerStudentBox` | `borderRadius` | `"10px"` | same | same |
| `.registerStudentBox` | `backgroundColor` | `"white"` | same | same |
| `.registerStudentBox` | `animation` | `"bounce 5s ease-in-out infinite"` | same | same |
| `.registerStudentBox` | `border` | `"1px solid rgba(255, 255, 255, 0.18)"` | same | same |
| `.registerStudentBox` | `marginTop` | `"-100px"` | same | same |
| `.liveSessions` | `width` | `"72px"` | `"170px"` (sm), `"190px"` (md) | `"235px"` |
| `.liveSessions` | `flexDirection` | `"column"` | same | same |
| `.liveSessions` | `borderRadius` | `"10px"` | same | same |
| `.liveSessions` | `gap` | `"10px"` | same | same |
| `.liveSessions` | `marginTop` | `"-100px"` | same | same |
| `.liveSessions` | `animation` | `"bounce 6s ease-in-out infinite"` | same | same |
| `.usersBox` | `background` | `"rgba(255, 255, 255, 1)"` | same | same |
| `.usersBox` | `border` | `"1px solid rgba(255, 255, 255, 0.18)"` | same | same |
| `.usersBox` | `borderRadius` | `"10px"` | same | same |
| `.usersBox` | `padding` | `"10px"` | same | same |
| `.usersBox` | `boxShadow` | `"0px 0px 30px 0px #38B6FF33"` | same | same |

### Typography

| Element | MUI variant | Mobile (`xs`) | sm (600+) | md (900+) | Desktop (`lg` 1200+) | Weight | Color |
|---|---|---|---|---|---|---|---|
| "800+" stat | inline `Typography` w/ overrides | `1vh` / `lh 1vh` | `2.1vh` / `lh 2.1vh` | `2.3vh` / `lh 2.3vh` | `2.5vh` / `lh 3vh` | 700 | black |
| "Vacancy Available" | inline overrides | `0.6vh` | `0.8vh` | `1vh` | `1.5vh` | 400 (inherit from `.text`) | black |
| "Apply Now" link | inline overrides | `0.8vh` | `1vh` | `1.2vh` | `1.5vh` | 700 | `#38B6FF` |
| "50k" | inline overrides | `0.8vh` | `1vh` | `1.2vh` | `1.5vh` | 600 | black |
| "Active Employee" | inline overrides | `0.8vh` | `1vh` | `1.2vh` | `1.5vh` | 600 | black |
| `.text` base (lineHeight only) | base | `10px` | `20px` | `23px` | `25px` | 400 | black |
| `.text` base (fontSize) | base | `14px` | `14px` | `16px` | `18px` | 400 | black |

> **Note**: each `<Typography>` is `sx={[styles.text, { fontSize: ..., lineHeight: ... }]}`. The inline `fontSize` override (`vh` values) **wins** over `.text`'s `14/14/16/18px`. So the effective sizes are the `vh` triplets above. The `.text.lineHeight` (10/20/23/25px) applies **only** where the inline override does not specify a `lineHeight` — i.e. the 50k / Active Employee / Vacancy Available / Apply Now lines (which don't override `lineHeight`) use `.text`'s px lineHeights, while the "800+" stat overrides lineHeight too (`vh` values).

All `<Typography>` get `className={leagueSpartan.className}`. Font = League Spartan via `font-heading`.

### Colors

| Hex | Tailwind token |
|---|---|
| `#000` (text) | `text-black` |
| `#38B6FF` ("Apply Now") | `text-brand-500` |
| `rgba(255,255,255,1)` / `white` | `bg-white` |
| `rgba(255,255,255,0.18)` (border) | inline `border-white/[0.18]` |
| `rgba(56,182,255,0.2)` (registerStudentBox shadow color) | inline in `shadow-[0px_0px_30px_0px_rgba(56,182,255,0.2)]` |
| `#38B6FF33` (usersBox shadow alpha) | inline in `shadow-[0px_0px_30px_0px_#38B6FF33]` |

### Animations / interactions

- `.registerStudentBox` — `animation: "bounce 5s ease-in-out infinite"` (CSS keyframe defined globally; see [04-foundation-fixes.md](../../04-foundation-fixes.md) and SKILL §9). Use `animate-[bounce_5s_ease-in-out_infinite]` once `bounce` keyframe is registered.
- `.liveSessions` — `animation: "bounce 6s ease-in-out infinite"` — `animate-[bounce_6s_ease-in-out_infinite]`.
- Note: Tailwind's built-in `animate-bounce` is a different keyframe (vertical translate, fast); do NOT substitute. Use arbitrary syntax with the **project's `bounce`** keyframe.

---

## §2 Tailwind port — bug list

Reference: `tuitionalFrontend\src\components\careers\hero-info.tsx`.

| # | Line | Current | Expected (per MUI) | Severity |
|---|---|---|---|---|
| B1 | 12 | container `flex h-[100px] w-full items-end justify-between sm:h-[200px] md:h-full lg:h-full` | ✓ matches | — |
| B2 | 13 | registerStudentBox uses `rounded-md` (10px in this repo) | ✓ matches MUI `borderRadius:"10px"` | — |
| B3 | 13 | `p-[2vw]`, `bg-white`, `border border-white/[0.18]`, `shadow-[0px_0px_30px_0px_rgba(56,182,255,0.2)]`, `-mt-[100px]` | ✓ all match | — |
| B4 | 13 | **No animation class** — MUI uses `animation: "bounce 5s ease-in-out infinite"` | Add `animate-[bounce_5s_ease-in-out_infinite]` (requires registered `bounce` keyframe). | **high** |
| B5 | 14 | "800+" `<p>` font sizes: `text-[1vh] ... sm:text-[2.1vh] md:text-[2.3vh] lg:text-[2.5vh]` and `leading-[1vh] sm:leading-[2.1vh] md:leading-[2.3vh] lg:leading-[3vh]` | ✓ matches `vh` triplet from MUI inline override | — |
| B6 | 14 | font weight `font-bold` (700) | ✓ matches MUI `fontWeight:"700"` | — |
| B7 | 14 | `text-black` | ✓ matches | — |
| B8 | 14 | `font-heading` | ✓ matches `leagueSpartan.className` | — |
| B9 | 17 | "Vacancy Available" `<p>` — sizes `text-[0.6vh] sm:text-[0.8vh] md:text-[1vh] lg:text-[1.5vh]` | ✓ matches | — |
| B10 | 17 | "Vacancy Available" — `leading-[10px] sm:leading-5 md:leading-[23px] lg:leading-[25px]` | ✓ matches `.text` base lineHeights (10/20/23/25px). `sm:leading-5` = 20px. | — |
| B11 | 17 | "Vacancy Available" `font-normal` (400) | ✓ matches `.text` base `fontWeight:400` | — |
| B12 | 20 | "Apply Now" `font-bold text-brand-500` + same vh font sizes & px lineHeights | ✓ matches `fontWeight:"700"`, `color:"#38B6FF"` | — |
| B13 | 25 | liveSessions wrapper `-mt-[100px] flex w-[72px] flex-col items-center justify-center gap-[10px] rounded-md sm:w-[170px] md:w-[190px] lg:w-[235px]` | ✓ matches | — |
| B14 | 25 | **No animation** on liveSessions — MUI: `animation: "bounce 6s ease-in-out infinite"` | Add `animate-[bounce_6s_ease-in-out_infinite]`. | **high** |
| B15 | 26 | usersBox `rounded-md border border-white/[0.18] bg-white p-[10px] shadow-[0px_0px_30px_0px_#38B6FF33]` | ✓ matches | — |
| B16 | 33 | tutors `<Image>` set as `h-auto w-full` | ✓ matches MUI `style={{width:"100%", height:"auto"}}` | — |
| B17 | 34, 37 | "50k" and "Active Employee" `font-semibold` (600), vh fontSizes, px lineHeights | ✓ matches `fontWeight:"600"` + base `.text` lineHeights | — |

**Net effective bugs**: B4 + B14 (missing custom `bounce` animations). These are the only fidelity issues.

---

## §3 Corrected Tailwind classNames

```tsx
<div className="relative flex h-[100px] w-full items-end justify-between sm:h-[200px] md:h-full lg:h-full">
  <div
    className={cn(
      "relative -mt-[100px] flex flex-col rounded-md border border-white/[0.18] bg-white p-[2vw]",
      "shadow-[0px_0px_30px_0px_rgba(56,182,255,0.2)]",
      "animate-[bounce_5s_ease-in-out_infinite]",
    )}
  >
    <p className="font-heading text-[1vh] font-bold leading-[1vh] text-black sm:text-[2.1vh] sm:leading-[2.1vh] md:text-[2.3vh] md:leading-[2.3vh] lg:text-[2.5vh] lg:leading-[3vh]">
      {t("careers.hero_info.vacancy_count")}
    </p>
    <p className="font-heading text-[0.6vh] font-normal leading-[10px] text-black sm:text-[0.8vh] sm:leading-5 md:text-[1vh] md:leading-[23px] lg:text-[1.5vh] lg:leading-[25px]">
      {t("careers.hero_info.vacancy_label")}
    </p>
    <p className="font-heading text-[0.8vh] font-bold leading-[10px] text-brand-500 sm:text-[1vh] sm:leading-5 md:text-[1.2vh] md:leading-[23px] lg:text-[1.5vh] lg:leading-[25px]">
      {t("careers.hero_info.apply_cta")}
    </p>
  </div>

  <div
    className={cn(
      "-mt-[100px] flex w-[72px] flex-col items-center justify-center gap-[10px] rounded-md",
      "sm:w-[170px] md:w-[190px] lg:w-[235px]",
      "animate-[bounce_6s_ease-in-out_infinite]",
    )}
  >
    <div className="relative flex flex-col items-center justify-center rounded-md border border-white/[0.18] bg-white p-[10px] shadow-[0px_0px_30px_0px_#38B6FF33]">
      <Image
        src={tutors.src}
        width={tutors.width}
        height={tutors.height}
        alt={t("careers.hero_info.tutor_alt")}
        className="h-auto w-full"
      />
      <p className="font-heading text-[0.8vh] font-semibold leading-[10px] text-black sm:text-[1vh] sm:leading-5 md:text-[1.2vh] md:leading-[23px] lg:text-[1.5vh] lg:leading-[25px]">
        {t("careers.hero_info.employee_count")}
      </p>
      <p className="font-heading text-[0.8vh] font-semibold leading-[10px] text-black sm:text-[1vh] sm:leading-5 md:text-[1.2vh] md:leading-[23px] lg:text-[1.5vh] lg:leading-[25px]">
        {t("careers.hero_info.employee_label")}
      </p>
    </div>
  </div>
</div>
```

### From → to (changed values)

| line | from | to |
|---|---|---|
| 13 | (no animation) | add `animate-[bounce_5s_ease-in-out_infinite]` |
| 25 | (no animation) | add `animate-[bounce_6s_ease-in-out_infinite]` |

> **Prerequisite**: confirm a `bounce` keyframe (slow, swaying — the MUI site's signature) exists in `tuitionalFrontend\tailwind.config.ts` or `globals.css`. If absent, port the `@keyframes bounce {...}` block from `tuitionalFrontend-mui-baseline\src\app\globals.css` first.

---

## §4 Verification at 4 widths

- **375px** — container height 100px. Stat font sizes: "800+" 1vh ≈ 6.7px (tiny — by design at this width). Vacancy label 0.6vh, Apply Now 0.8vh. Right badge 72px wide. Both badges bounce.
- **768px** — container height 200px (`sm:h-[200px]`). "800+" 2.1vh, Vacancy 0.8vh, Apply 1vh. Right badge 170px wide.
- **1280px** — container `h-full` (md:h-full + lg:h-full). "800+" 2.5vh, Vacancy 1.5vh, Apply 1.5vh. Right badge 235px wide.
- **1920px** — same as 1280; no `xl:` rules.

Note: `vh` font sizes mean text scales with viewport height, not width — verify on both portrait and landscape laptops.

---

## §5 RTL notes

Arabic variant: `ar-hero-info.tsx` adds `dir="rtl"` to the container `<Box>`. **The styles are identical** — `justify-between` keeps the left badge on the "start" side and right badge on the "end" side, which naturally flips under RTL. No `margin-left`/`margin-right` to mirror (only `marginTop:-100px`, which is direction-agnostic).

Tailwind port: keep classes as-is; the parent's `dir="rtl"` (applied at page level via `useI18n()`/`<html dir>`) flips order automatically through `justify-between`. No `flex-row-reverse` or `ms-*` needed.
