# Component — `<ArLearnTogeather>` (Arabic variant of `<LearnTogeather>`)

Arabic-language version of the banner block ("لنتعلم معاً" / "في أي مكان وكل مكان") used on `/ar/contact`. In the MUI baseline this is a separate file; in the Tailwind port the same `<LearnTogeather>` component handles both languages via the `isRTL` flag (see [learn-togeather.md](./learn-togeather.md)).

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\contact\ar-learn-togeather.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\contact\learn-togeather.tsx` (unified — no separate AR file) |
| EN counterpart | [learn-togeather.md](./learn-togeather.md) |

Filename note: the unified Tailwind file is **`learn-togeather.tsx`** (misspelling preserved). The AR-only MUI file is **`ar-learn-togeather.tsx`**. Neither should be renamed.

---

## §1 MUI source — extracted properties

### Layout tree

```
<Box .contanier dir="rtl">  (flex-wrap, bg #D7F0FF, width 100% / 60vw at lg)
├── <Box .contanierText>  (empty styles)
│   ├── <Box .hat>  (absolute, RIGHT offset (not left!), top responsive, zIndex 22)
│   │   └── <Image src={hat} width={70} />
│   ├── <Typography variant="h1" component="h1">"لنتعلم معاً"</Typography>
│   └── <Typography variant="h1" component="h1" sx={[..., { color: "rgba(56, 182, 255, 1)" }]}>
│        "في أي مكان وكل مكان"
│       </Typography>
└── <Image src={globe} height={100} />
```

**Note**: the AR MUI file uses **`variant="h1"` for both headings** (the EN file used h1 + h2). This is likely a bug in the AR MUI source — the Tailwind port correctly normalizes to h1 + h2.

### Dimensions & spacing

| Element | Property | xs (<600) | sm (≥600) | md (≥900) | lg (≥1200) |
|---|---|---|---|---|---|
| `.contanier` | `display` | `flex` | — | — | — |
| `.contanier` | `flexWrap` | `wrap` | — | — | — |
| `.contanier` | `textAlign` | `center` | — | — | — |
| `.contanier` | `justifyContent` | `center` | `center` | `center` | **`right`** (was `left` in EN) |
| `.contanier` | `background` | `#D7F0FF` | — | — | — |
| `.contanier` | `width` | `100%` | `100%` | `100%` | `60vw` |
| `.hat` | `position` | `absolute` | — | — | — |
| `.hat` | `zIndex` | `22` | — | — | — |
| `.hat` | **`right`** (not `left`) | `30%` | `30%` | **`33%`** | **`9%`** |
| `.hat` | `top` | `11%` | `11%` | **`22%`** | **`26%`** |
| Hat `<Image>` | `width` | `70px` | — | — | — |
| Globe `<Image>` | `height` | `100px` | — | — | — |

### Typography

| Element | MUI variant | Mobile | Tablet | Desktop | Weight | Color | Font |
|---|---|---|---|---|---|---|---|
| "لنتعلم معاً" | `variant="h1"` | `1.75rem` (28px) | `2.25rem` (36px) | `3rem` (48px) | 700 | inherits | `leagueSpartan.className` (MUI bug — Arabic should not use League Spartan) |
| "في أي مكان وكل مكان" | `variant="h1"` (sic — should be h2) | `1.75rem` (28px) | `2.25rem` (36px) | `3rem` (48px) | 700 | `rgba(56, 182, 255, 1)` = `#38B6FF` | `leagueSpartan.className` (same bug) |
| Both | `textAlign` | `center` | `center` | `center` | **`right`** (was `start` in EN) | | |
| Both | `position` | `relative` | — | — | — | | |

### Colors

| Value | Token mapping |
|---|---|
| `#D7F0FF` (panel bg) | `bg-brand-50` |
| `rgba(56, 182, 255, 1)` (accent heading color) | `text-brand-500` |

### Animations / interactions

None.

---

## §2 Tailwind port — bug list

The Tailwind side merges EN + AR into a single `learn-togeather.tsx`. Bugs apply to AR-specific behavior only.

| # | Line | Current Tailwind | Expected for AR | Severity |
|---|---|---|---|---|
| BAR-1 | 14 | `lg:w-[60vw] lg:justify-start` | Under `dir="rtl"`, `lg:justify-start` resolves to flex-start in the inline direction → renders on the **right** edge of the panel. Matches MUI AR `justifyContent: { lg: right }`. ✓ | — |
| BAR-2 | 16 | `start-[30%] top-[11%] md:start-[33%] md:top-[22%] lg:start-[9%] lg:top-[26%]` | Under `dir="rtl"`, `start-*` resolves to `right-*`. So `start-[30%]` → `right-[30%]`, matching MUI AR `right: { xs: "30%", md: "33%", lg: "9%" }`. ✓ | — |
| BAR-3 | 19-24 | `<h1>` for first heading | ✓ Matches MUI AR (which uses h1) | — |
| BAR-4 | 27-32 | `<h2>` for second heading | **Drift from MUI AR source**, which uses `h1` for both. The Tailwind port uses h2 (matching the EN file). Semantically correct (the second line is a sub-heading) — the AR MUI bug should not be preserved. ✓ port is more correct than MUI source | — (intentional fix) |
| BAR-5 | 29 | `text-h2-mobile sm:text-h2-tablet lg:text-h2` | Drift from MUI AR (which renders the second heading at h1 sizes). Sizes are smaller in the port: 22 / 28 / 36 vs MUI AR's 28 / 36 / 48. **This is a deliberate normalization** — port matches the EN file's intent. If the user reports "Arabic second heading is too small compared to MUI AR baseline", note this is the deliberate fix; revert to `text-h1-mobile sm:text-h1-tablet lg:text-h1` only if directed. | minor (intentional) |
| BAR-6 | 29 | `text-brand-500` on second heading | ✓ Matches MUI AR `color: "rgba(56, 182, 255, 1)"` | — |
| BAR-7 | 20, 28 | `text-center lg:text-start` | Under `dir="rtl"`, `lg:text-start` → text-right at lg. Matches MUI AR `textAlign: { xs/sm/md: center, lg: right }`. ✓ | — |
| BAR-8 | 20, 28 | `isRTL ? "font-arabic" : "font-heading"` | ✓ Port correctly uses `font-arabic` for Arabic. MUI AR's use of `leagueSpartan.className` is a known issue not preserved. | — (intentional fix) |
| BAR-9 | (missing) | No `dir="rtl"` attribute on the container | OK — `<html dir="rtl">` set globally by layout. Tailwind logical properties (`start-*`, `text-start`, `justify-start`) mirror automatically. ✓ | — |

**Total AR-specific bugs: 0.** Port intentionally diverges from two known MUI AR issues (`h1` for both headings, `leagueSpartan` for Arabic). Otherwise faithful.

---

## §3 Corrected Tailwind classNames

No corrections required. The current unified port handles AR correctly.

If the user specifically wants pixel-perfect MUI AR replication (preserving the source bugs):
- Change line 27 `<h2>` → `<h1>`
- Change line 29 typography triplet from `text-h2-*` → `text-h1-mobile sm:text-h1-tablet lg:text-h1`

Do **not** apply those without explicit direction — they restore MUI AR bugs.

---

## §4 Verification at 4 widths

Test at `/ar/contact`.

| Width | Expected behavior |
|---|---|
| **375px** | Panel full-width, content centered. Headings rendered in Noto Sans Arabic / Cairo. h1 "لنتعلم معاً" at 28px; h2 "في أي مكان وكل مكان" at 22px, color `#38B6FF`. Hat absolutely positioned at right-30% / top-11%. Globe wraps below. |
| **768px** | Same layout. h1 = 36px, h2 = 28px. Hat still at right-30% / top-11% (no sm override). |
| **1280px** | Panel `w-[60vw]`, `justify-start` → content sits at the **right** edge under RTL. Headings text-right. Hat at right-9% / top-26%. h1 = 48px, h2 = 36px. Globe sits to the right (RTL-flipped). |
| **1920px** | Same as 1280. |

---

## §5 RTL notes

- The MUI AR file uses **physical** `right: { ... }` for hat positioning. The Tailwind port uses **logical** `start-*`, which automatically resolves to `right-*` under `dir="rtl"`. Behavior matches.
- The MUI AR file uses physical `justifyContent: right` at lg. The Tailwind port uses `lg:justify-start`, which under `dir="rtl"` resolves to "start on the right". Behavior matches.
- The MUI AR file uses physical `textAlign: right` at lg. The Tailwind port uses `lg:text-start`, which under `dir="rtl"` resolves to right-aligned. Behavior matches.
- Font: AR must use `font-arabic`. The MUI AR source incorrectly applies `leagueSpartan.className` — the Tailwind port fixes this.
- Heading semantics: MUI AR uses `<h1>` twice (likely accidental). Tailwind port uses `<h1>` + `<h2>` matching the EN file. **More semantically correct.**

---

## §6 Things to leave alone

- The single bilingual component — keep merged.
- The misspelled filename `learn-togeather.tsx` — never rename.
- The `font-arabic` / `font-heading` ternary — keep.
- The `<h1>` + `<h2>` semantic structure — keep (do not regress to MUI AR's double-h1).
- The use of logical properties (`start-*`, `text-start`, `justify-start`) — keep.

---

## §7 Diff from EN

Meaningful differences when comparing AR MUI source to EN MUI source:
1. Outer `<Box>` has `dir="rtl"`.
2. Hat uses `right: { ... }` instead of `left: { ... }` — physical mirroring.
3. `justifyContent: { lg: right }` instead of `lg: left`.
4. `textAlign: { lg: right }` instead of `lg: start`.
5. Second heading wrapped in `variant="h1"` (not `h2`) and explicitly colored `rgba(56,182,255,1)`.
6. Arabic strings instead of English.

Differences 1-4 are physically mirrored equivalents — the Tailwind logical-property approach handles them automatically. Differences 5-6 are normalized away in the port (5 = bug fix; 6 = i18n).
