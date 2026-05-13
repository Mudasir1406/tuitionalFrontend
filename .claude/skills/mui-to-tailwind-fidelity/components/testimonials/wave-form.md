# Component — `Waveform` (testimonials)

Single audio-review "pill": large rounded-100 white pill with a play/pause IconButton, current/duration timecode, the WaveSurfer waveform, and a circular user avatar. Used as repeating child of `ReviewsOnWp`.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\testimonials\wave-form.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\testimonials\wave-form.tsx` |
| Arabic variant | (none — same file used in both LTR and RTL contexts via `dir` inheritance) |

---

## §1 MUI source — extracted properties

### Layout tree

```
Box (outer pill: flex row, items-center, white bg, rounded-100px, shadow)
├── IconButton onClick=handlePlayPause (square→circle, brand-green bg)
│   └── PlayArrowIcon / PauseIcon (white)
├── Typography sx={styles.time}  ──→ "0:00/3:21"
├── Box ref={containerRef} (flex 1, marginRight 10px) — WaveSurfer container
└── Box (circle: 50/70px, rounded-35, overflow-hidden)
    └── Image user (w 100%, h 100%)
```

### Dimensions & spacing

| Element | Property | xs (mobile) | sm | md | lg |
|---|---|---|---|---|---|
| Outer `Box` | `width` | `300px` | `450px` | `500px` | `580px` |
| Outer `Box` | `height` | `65px` | `65px` | `65px` | `100px` |
| Outer `Box` | `paddingX` | `10px` | `10px` | `20px` | `20px` |
| Outer `Box` | `borderRadius` | `100px` | — | — | — |
| Outer `Box` | `backgroundColor` | white | — | — | — |
| Outer `Box` | `boxShadow` | `0px -3px 8px 0px rgba(0,0,0,0.15) inset, 0px 2px 1px 0px rgba(0,0,0,0.05)` | — | — | — |
| Outer `Box` display | flex items-center | — | — | — | — |
| `IconButton` | `width / height` | `50px / 50px` | — | — | `70px / 70px` |
| `IconButton` | `padding` | `0` | — | — | — |
| `IconButton` | `backgroundColor` | `rgba(81,184,147,1)` (`#51B893`) | — | — | — |
| `IconButton` | `marginRight` | `10px` | — | — | — |
| `time` Typography | `marginRight` | `10px` | — | — | — |
| Waveform container `Box` | `flex` | `1` | — | — | — |
| Waveform container `Box` | `marginRight` | `10px` | — | — | — |
| Avatar `Box` | `width / height` | `50px / 50px` | — | — | `70px / 70px` |
| Avatar `Box` | `borderRadius` | `35px` | — | — | — |
| Avatar `Box` | `overflow` | hidden | — | — | — |
| Avatar `Box` | display | flex items-center justify-center | — | — | — |
| `<Image>` avatar | `style.width / height` | `100% / 100%` | — | — | — |
| `PauseIcon / PlayArrowIcon` (`styles.icon`) | `color` | white | — | — | — |

### Typography

| Element | MUI | Mobile | sm | md | Desktop | Weight | Color | Font |
|---|---|---|---|---|---|---|---|---|
| `time` | `Typography` (no variant) | `12px` | `14px` | `16px` | `16px` | 500 | inherit (theme ink-900) | League Spartan (theme) |
| `time` line-height | — | `20px` | `20px` | `23px` | `23px` | — | — | — |

> No icon className required; MUI icons fill their default size (`24px`) unless overridden. The MUI source sets only `color: "white"`, no size override.

### Colors

| Hex / rgba | Tailwind token |
|---|---|
| `rgba(81,184,147,1)` (`#51B893`) IconButton bg | `bg-success` |
| white | `bg-white` / `text-white` |
| `rgba(0,0,0,0.15)` shadow stop | inline shadow string |
| `rgba(0,0,0,0.05)` shadow stop | inline shadow string |

### Animations / interactions

- Click play/pause → WaveSurfer `playPause()`. No CSS transitions.

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected (per MUI) | Severity |
|---|---|---|---|---|
| B1 | 77 | Outer pill: `flex h-[65px] w-[300px] items-center rounded-[100px] bg-white px-[10px] shadow-[0px_-3px_8px_0px_rgba(0,0,0,0.15)_inset,0px_2px_1px_0px_rgba(0,0,0,0.05)] sm:w-[450px] md:w-[500px] lg:h-[100px] lg:w-[580px] lg:px-5` | MUI `paddingX: { xs: "10px", md: "20px", sm: "10px", lg: "20px" }`. Current: `px-[10px] lg:px-5`. **`md:px-5` is missing.** MUI hits `paddingX: "20px"` starting at `md`. Add `md:px-5` (or `md:px-[20px]`). | Medium |
| B2 | 77 | Heights: `h-[65px] lg:h-[100px]` | MUI `height: { xs: 65, lg: 100 }`. ✓ Matches. (No sm/md override → stays 65 until lg.) | OK ✓ |
| B3 | 77 | Widths: `w-[300px] sm:w-[450px] md:w-[500px] lg:w-[580px]` | ✓ Matches MUI cascade. | OK ✓ |
| B4 | 83 | IconButton: `me-[10px] flex h-[50px] w-[50px] items-center justify-center rounded-full bg-success p-0 lg:h-[70px] lg:w-[70px]` | MUI: `width: { xs: 50, lg: 70 }`, `height: { xs: 50, lg: 70 }`, `padding: 0`, `backgroundColor: rgba(81,184,147,1)`, `marginRight: "10px"`. Current: ✓ except `marginRight` ↔ `me-[10px]`. **MUI uses physical `marginRight`** but logical `me-*` is the safer port choice (auto-flips in RTL). ✓ | OK ✓ |
| B5 | 83 | `rounded-full` on play button | MUI doesn't set `borderRadius` on the `IconButton`; MUI's default `IconButton` style applies `borderRadius: 50%`. Current `rounded-full` is the correct Tailwind translation. | OK ✓ |
| B6 | 87 | `<Play className="text-white" />` and `<Pause className="text-white" />` | MUI sets only `sx={styles.icon}` = `color: "white"`. Default MUI icon size = 24px. Lucide `<Play>` default = 24px. ✓ | OK ✓ |
| B7 | 91 | Time `<span>`: `me-[10px] text-[12px] font-medium leading-[20px] sm:text-[14px] sm:leading-[20px] md:text-[16px] md:leading-[23px] lg:text-[16px] lg:leading-[23px]` | ✓ Matches MUI cascade `fontSize: 12/14/16/16` and `lineHeight: 20/20/23/23`, `fontWeight: 500`. | OK ✓ |
| B8 | 91 | Time `<span>` missing explicit `font-heading` | MUI inherits from the parent (which has `leagueSpartan.className` set at the Typography component); the Tailwind port omits this. Add `font-heading` (League Spartan) for parity. | Low |
| B9 | 94 | Waveform container: `me-[10px] flex-1` | MUI uses physical `marginRight: "10px"`. `me-[10px]` is logical → flips in RTL. Acceptable port-improvement. | OK ✓ |
| B10 | 95 | Avatar wrapper: `flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-full lg:h-[70px] lg:w-[70px]` | MUI `borderRadius: "35px"` = exactly half of 70px (perfect circle for the lg size); at xs (50px) the radius 35px is **larger than half** (25px would be a circle) → it's "rounded-full" in practice. `rounded-full` is the correct Tailwind translation. | OK ✓ |
| B11 | 99-102 | Avatar `<Image>`: `h-full w-full` | ✓ Matches MUI `style={{ width: "100%", height: "100%" }}`. | OK ✓ |
| B12 | 79 | `<button type="button">` (native) instead of MUI `IconButton` | The Tailwind port substitutes a native button. Behaviorally identical. No MUI ripple effect. ✓ acceptable. | OK ✓ |
| B13 | 77 | The outer `<Box>` border-radius is `100px`; Tailwind uses `rounded-[100px]` | ✓ Exact match. | OK ✓ |
| B14 | n/a | The MUI source declared `borderRadius: "100px"` (treated as a "pill" radius); Tailwind `rounded-full` would also be visually equivalent. Current `rounded-[100px]` is faithful. | OK ✓ |
| B15 | n/a | The outer pill at xs is 300px wide × 65px high; effective vertical content = 65px - 0 padding = 65px. IconButton + waveform + avatar all need to fit. At xs the IconButton is 50px tall — fits inside 65px. ✓ | OK ✓ |

### Critical fixes

1. **B1** — Add `md:px-5` to the outer pill. MUI bumps `paddingX` to 20px starting at `md`, not `lg`. Without it the md (900–1199) tablet view has 10px padding while MUI had 20px.

---

## §3 Corrected Tailwind classNames

```tsx
return (
  <div
    className="flex h-[65px] w-[300px] items-center rounded-[100px] bg-white px-[10px] shadow-[0px_-3px_8px_0px_rgba(0,0,0,0.15)_inset,0px_2px_1px_0px_rgba(0,0,0,0.05)] sm:w-[450px] md:w-[500px] md:px-5 lg:h-[100px] lg:w-[580px] lg:px-5"
  >
    <button
      type="button"
      onClick={handlePlayPause}
      aria-label={isPlaying ? "Pause" : "Play"}
      className="me-[10px] flex h-[50px] w-[50px] items-center justify-center rounded-full bg-success p-0 lg:h-[70px] lg:w-[70px]"
    >
      {isPlaying ? (
        <Pause className="text-white" />
      ) : (
        <Play className="text-white" />
      )}
    </button>

    <span className="me-[10px] font-heading text-[12px] font-medium leading-[20px] sm:text-[14px] sm:leading-[20px] md:text-[16px] md:leading-[23px] lg:text-[16px] lg:leading-[23px]">
      {formattedCurrentTime}/{formattedDuration}
    </span>

    <div ref={containerRef} className="me-[10px] flex-1" />

    <div className="flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-full lg:h-[70px] lg:w-[70px]">
      <Image
        src={image || user.src}
        width={user.width}
        height={user.height}
        alt="User"
        className="h-full w-full"
      />
    </div>
  </div>
);
```

### From → To

| From | To |
|---|---|
| `px-[10px] ... lg:px-5` | `px-[10px] ... md:px-5 lg:px-5` |
| `<span className="me-[10px] text-[12px] ...">` | `<span className="me-[10px] font-heading text-[12px] ...">` |

---

## §4 Verification at 4 widths

- **375 px** — Pill 300 × 65 px, 10px horizontal padding, rounded-100. IconButton 50×50 success-green circle with white play icon. Time `12px / lh 20`. Waveform fills remaining space. Avatar 50×50 circle on the right.
- **768 px** — Pill 500 × 65 px (md threshold = 900), still 10px padding (Tailwind config `sm:` = 600, `md:` = 900). Time `14px / lh 20`. IconButton 50×50, avatar 50×50.
- **1280 px** — Pill 580 × 100 px, 20px horizontal padding. IconButton 70×70, time `16px / lh 23`, avatar 70×70.
- **1920 px** — Same as 1280; the pill keeps `lg:w-[580px]` (no xl override).

> Note: at **900–999 px** (md band), MUI bumps `paddingX` to 20px while the current port keeps 10px → fix via the B1 patch (`md:px-5`).

---

## §5 RTL notes

- MUI Waveform uses **physical** `marginRight` for the IconButton, time, and waveform container. The Tailwind port already uses logical `me-[10px]` everywhere → auto-flips in RTL.
- The outer flex order (icon → time → waveform → avatar) **does flip** in RTL: avatar moves to the left, icon to the right. This is the desired visual outcome.
- WaveSurfer.js draws the waveform left-to-right based on container DOM direction; if the parent has `dir="rtl"`, the bars still render LTR (audio time is monotonically increasing left-to-right by convention). No additional handling needed.
- `text-white` on the icon is direction-agnostic. ✓
