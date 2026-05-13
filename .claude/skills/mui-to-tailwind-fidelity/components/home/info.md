# Example 03 — Hero Stat Block (`<Info>`)

The home hero's overlaid stat block ("50000+ Registered Students", "100+ Live Sessions", "500+ Tutor Screened") — a good example of **stat typography + responsive `vh` sizing + animation**.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\home\info.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\home\info.tsx` |

(For the *headline* hero typography pattern, see [01-token-mapping.md §1](../01-token-mapping.md) — h1 + body triplet. This example focuses on the more complex overlaid-stat-card pattern that uses MUI `variant="subtitle1"` / `variant="subtitle2"` for the stat number and label.)

---

## §1 MUI source — extracted properties

### Layout

- **Outer `<Box sx={styles.container}>`**: flex row, items-end, justify-between, width 100%
  - height: `{ xs: "15rem", sm: "24rem", md: "70vh", lg: "80vh" }`
  - marginTop: `{ xs: "2.5vh", sm: "2vh", md: "1.5vh", lg: "1vh" }`
  - position: relative
- **Left card `<Box sx={styles.registerStudentBox}>`**:
  - `boxShadow: "0px 0px 30px 0px #38B6FF33"`
  - width: `{ xs: "35vw", sm: "23vw", md: "25vw", lg: "16vw" }`
  - height: `{ xs: "12vh", sm: "15vh", md: "18vh", lg: "20vh" }`
  - borderRadius: `"1vh"`, bg white, flex col centered
  - **animation: `"bounce 5s ease-in-out infinite"`**
  - marginLeft: `"2%"`, marginBottom: `{ xs: "5vh", sm: "10vh", md: "15vh", lg: "20vh" }`
- **Right column `<Box sx={styles.liveSessions}>`**:
  - width: `{ xs: "30vw", sm: "25vw", md: "20vw", lg: "15vw" }`
  - flex col, items-center, justify-center, `gap: "1vh"`, `marginTop: "1vh"`
  - **animation: `"bounce 6s ease-in-out infinite"`** (note: 6s vs 5s, intentionally desynced)
  - marginRight: `"2%"`, marginBottom: `{ xs: "5vh", sm: "10vh", md: "15vh", lg: "20vh" }`
- **Single white card `<Box sx={styles.singleBox}>` (×2)**:
  - `background: white`, `borderRadius: "1vh"`, `padding: "2vh"`
  - `boxShadow: "0px 0px 30px 0px #38B6FF33"`
  - flex col centered
- **Floating icon badges**:
  - `.absoluteBoxOrange`: `position: absolute, right: 0, top: "-5vh", zIndex: 99, background: "#F86A6A", borderRadius: "50%", boxShadow: 3 (MUI elevation 3), width/height: "5vh"` (min 30px)
  - `.schoolbox`: `position: absolute, zIndex: 10, width/height: "7vh", backgroundColor: "#51B893", borderRadius: "50%", top: "-5vh"` (min 30px)

### Typography

| Text | MUI variant | Final size at each band |
|---|---|---|
| `"50000+"` / `"500+"` (stat number) | `variant="subtitle1"` | mobile 1.75rem / tablet 2.25rem / desktop 3rem |
| `"Registered Students"` / `"100+ Live Sessions"` / `"Tutor Screened"` (stat label) | `variant="subtitle2"` | 0.875rem (14px) uppercase, letterSpacing 0.05em |
| Both: `color: black, textAlign: center` | | |

---

## §2 Tailwind port status

The port at `tuitionalFrontend\src\components\home\info.tsx` is **mostly correct**, with three regressions:

| Aspect | Current Tailwind | Expected | Verdict |
|---|---|---|---|
| Container height | `h-60 sm:h-96 md:h-[70vh] lg:h-[80vh]` (15rem / 24rem / 70vh / 80vh) | matches MUI exactly | ✓ |
| Container marginTop | `mt-[2.5vh] sm:mt-[2vh] md:mt-[1.5vh] lg:mt-[1vh]` | matches MUI exactly | ✓ |
| `registerStudentBox` size | `h-[12vh] w-[35vw] sm:h-[15vh] sm:w-[23vw] md:h-[18vh] md:w-[25vw] lg:h-[20vh] lg:w-[16vw]` | matches MUI exactly | ✓ |
| `registerStudentBox` margin | `ms-[2%] mb-[5vh] sm:mb-[10vh] md:mb-[15vh] lg:mb-[20vh]` | matches MUI exactly | ✓ |
| Border-radius `1vh` | `rounded-[1vh]` | matches MUI | ✓ |
| Shadow `0px 0px 30px 0px #38B6FF33` | `shadow-[0px_0px_30px_0px_#38B6FF33]` | matches | ✓ |
| **Animation `bounce 5s/6s`** | **(removed entirely)** | should be `animate-[bounce_5s_ease-in-out_infinite]` / `animate-[bounce_6s_ease-in-out_infinite]` | **REGRESSION B1** |
| Stat number typography | `text-stat-number-mobile sm:text-stat-number-tablet lg:text-stat-number` | matches `variant="subtitle1"` mapping | ✓ |
| Stat label typography | `text-stat-label uppercase` (no font-heading needed on label) | matches `variant="subtitle2"` | ✓ |
| Icon | `<GraduationCap className="text-white" aria-hidden="true" />` from `lucide-react` | MUI used `<SchoolOutlinedIcon>` from `@mui/icons-material` | **DRIFT (icon swap)** — same family but different exact glyph |
| Icon | `<Video />` from `lucide-react` | MUI used `<VideocamOutlinedIcon>` | **DRIFT (icon swap)** |
| `.schoolbox` shadow | (none in MUI) | (none in Tailwind) | ✓ |
| `.absoluteBoxOrange` shadow | `shadow-md` (MUI `boxShadow: 3`) | `shadow-md` is roughly equivalent to MUI elevation 3 | ✓ |
| Color `#F86A6A` (orange/red) | `bg-[#F86A6A]` | matches | ✓ |
| Color `#51B893` (success green) | `bg-success` | matches the token | ✓ |

### Required fixes

#### B1. Restore the bounce animations

The two cards float visibly in MUI. The Tailwind port has the keyframe `@keyframes bounce` defined in `globals.css` (lines 257-267) but the components don't reference it.

```diff
- <div className="relative ms-[2%] mb-[5vh] flex h-[12vh] w-[35vw] flex-col items-center justify-center rounded-[1vh] bg-white shadow-[0px_0px_30px_0px_#38B6FF33] sm:mb-[10vh] sm:h-[15vh] sm:w-[23vw] md:mb-[15vh] md:h-[18vh] md:w-[25vw] lg:mb-[20vh] lg:h-[20vh] lg:w-[16vw]">
+ <div className="relative ms-[2%] mb-[5vh] flex h-[12vh] w-[35vw] flex-col items-center justify-center rounded-[1vh] bg-white shadow-[0px_0px_30px_0px_#38B6FF33] sm:mb-[10vh] sm:h-[15vh] sm:w-[23vw] md:mb-[15vh] md:h-[18vh] md:w-[25vw] lg:mb-[20vh] lg:h-[20vh] lg:w-[16vw] animate-[bounce_5s_ease-in-out_infinite]">
```

```diff
- <div className="me-[2%] mb-[5vh] mt-[1vh] flex w-[30vw] flex-col items-center justify-center gap-[1vh] rounded-[1vh] sm:mb-[10vh] sm:w-[25vw] md:mb-[15vh] md:w-[20vw] lg:mb-[20vh] lg:w-[15vw]">
+ <div className="me-[2%] mb-[5vh] mt-[1vh] flex w-[30vw] flex-col items-center justify-center gap-[1vh] rounded-[1vh] sm:mb-[10vh] sm:w-[25vw] md:mb-[15vh] md:w-[20vw] lg:mb-[20vh] lg:w-[15vw] animate-[bounce_6s_ease-in-out_infinite]">
```

The asymmetric 5s/6s timing matters — it creates a natural-feeling, non-synced motion. Don't normalize both to 5s.

---

## §3 Reusable lessons for other hero-style components

When porting any hero/info section that uses MUI's overlaid card pattern:

1. **`vh`-based heights** — preserve exactly: `h-[12vh] sm:h-[15vh] md:h-[18vh] lg:h-[20vh]`. Don't convert to `h-32 sm:h-40 …` (px values).
2. **`vw`-based widths** — same. Cards that scale with viewport width are intentional.
3. **Stat number** = `variant="subtitle1"` → `text-stat-number-mobile sm:text-stat-number-tablet lg:text-stat-number font-heading`.
4. **Stat label** = `variant="subtitle2"` → `text-stat-label uppercase font-body`.
5. **Animations** — if MUI source has `animation: "..."`, port to `animate-[<name>_<duration>_<easing>_infinite]`. Keyframes are already in `globals.css`.
6. **Icon swap** — when MUI used `@mui/icons-material` (e.g. `<SchoolOutlinedIcon>`), the Tailwind side typically uses `lucide-react` (e.g. `<GraduationCap>`). This is a known one-time swap; don't fight it. Confirm the lucide icon visually matches the MUI Material icon before declaring the swap done — some Material icons have no perfect lucide match.

---

## §4 Verification

After applying B1:
- **375px**: stat cards float gently up and down. h-[12vh] ≈ 80px. shadow visible.
- **1280px**: stat cards float at h-[20vh] ≈ 160px each. Cards offset right/left from container edges by 2%. Animations desynced.
- Side-by-side with MUI baseline at all 4 reference widths, the cards should move together.
