# Component — `CountdownTimer`

Sticky/fixed top-of-page countdown bar (days/hours/mins/secs) for IGCSE/GCSE/A-Level offer windows. Pulls config from Firestore, falls back to local 20-day target, auto-restarts on expiry.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\countdown\CountdownTimer.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\countdown\CountdownTimer.tsx` |

## §1 MUI source — extracted properties

All styles live in the `styles = {...}` object at the bottom of the MUI file (sx props), no `.module.css`.

### Layout tree

```
Box.stickyContainer        (position sticky/fixed by scrollY, top 0, inset-x 0, z 1000, w 100%, padding 0)
└── Box.countdownBox       (bg #006dac, p 16px 0, shadow `0 4px 20px rgba(0,0,0,0.15)`, flex
                            col xs / row md, justify space-around, items center, gap 8px, w 100%, text-center)
    ├── Typography.title   (variant body2, leagueSpartan, color white, weight 600, fs 0.9rem)
    └── Box.timerContainer (flex items-center gap 12px)
        ├── Box.timeUnit × 4    (flex col items-center min-w 40px)
        │   ├── Typography.number (variant h6, leagueSpartan, color white, weight 700, lh 1, fs 1.2rem)
        │   └── Typography.label  (variant caption, leagueSpartan, color rgba(255,255,255,0.9), weight 500, fs 0.7rem, lh 1)
        └── Typography.separator ":" between units (color white, weight 700, fs 1.2rem, lh 1)
```

### Dimensions & spacing (from the `styles` object)

| Element | Property | Default (xs) | ≥md (900px) |
|---|---|---|---|
| .stickyContainer | top / left / right | 0 | same |
| .stickyContainer | zIndex | 1000 | same |
| .stickyContainer | width | 100% | same |
| .stickyContainer | padding | 0 | same |
| .countdownBox | borderRadius | 0 | same |
| .countdownBox | padding | `16px 0` | same |
| .countdownBox | boxShadow | `0 4px 20px rgba(0,0,0,0.15)` | same |
| .countdownBox | flexDirection | column | row |
| .countdownBox | justifyContent | space-around | same |
| .countdownBox | alignItems | center | same |
| .countdownBox | gap | 8px | same |
| .countdownBox | width | 100% | same |
| .countdownBox | textAlign | center | same |
| .timerContainer | gap | 12px | same |
| .timeUnit | minWidth | 40px | same |

### Typography

| Element | MUI variant | Sizes (literal) | Weight | Color | Font |
|---|---|---|---|---|---|
| title | body2 | 0.9rem (14.4px on 16px root) — literal `fontSize: "0.9rem"` overrides variant default | 600 | white | League Spartan |
| number | h6 | 1.2rem (19.2px) — literal `fontSize: "1.2rem"` overrides h6 default (16px) | 700 | white | League Spartan |
| label | caption | 0.7rem (11.2px) — literal `fontSize: "0.7rem"` overrides caption default (14px) | 500 | `rgba(255,255,255,0.9)` | League Spartan |
| separator | (no variant) | 1.2rem | 700 | white | (inherits — not leagueSpartan) |

All four values are **literal `rem` overrides** — they are NOT the variant defaults. Translate as `text-[0.9rem]`, `text-[1.2rem]`, `text-[0.7rem]` rather than the typography tokens.

### Colors

| Element | Color |
|---|---|
| .countdownBox bg | #006dac (the comment shows a gradient was tried then commented) |
| title / number / separator | white |
| label | `rgba(255,255,255,0.9)` |
| shadow | `rgba(0,0,0,0.15)` |

### Animations / interactions

- Position toggles `sticky` → `fixed` once `window.scrollY > 70` (component-level useEffect).
- No CSS transitions on the bar itself.
- Renders nothing when `countdownData.isActive === false` or while initial load.
- Auto-restart at expiry pushes `targetDate` forward by 20 days via `restartCountdown(pageType, 20)` — purely server-side state, no UI delta.

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| 1 | 150 | `${isFixed ? "fixed" : "sticky"} inset-x-0 top-0 z-[1000] w-full` | matches MUI `.stickyContainer` (position toggled, top/inset/z/w) | ✓ |
| 2 | 150 | (missing) `padding: 0` | MUI has `padding: 0` explicitly — Tailwind default `padding: 0` is correct, but the parent inherits no padding either, so no fix needed | ✓ |
| 3 | 152 | `flex w-full flex-col items-center justify-around gap-1` (gap 4px) | MUI `gap: 8px` → `gap-2`. Port uses `gap-1` (4px). | **HIGH** |
| 4 | 152 | `md:flex-row md:items-center md:gap-2 md:py-[2px]` | MUI direction xs→column, md→row matches. But MUI has **no md-specific gap override** — gap stays 8px. The port's `md:gap-2` and **`md:py-[2px]` are invented**. | MED — port adds 2px vertical pad at md not in source |
| 5 | 152 | `bg-[#006dac]` | matches | ✓ |
| 6 | 152 | `text-center shadow-[0_4px_20px_rgba(0,0,0,0.15)]` | matches MUI textAlign + boxShadow | ✓ |
| 7 | 152 | (missing) `padding: "16px 0"` on the countdownBox | MUI has `padding: "16px 0"` → port should add `py-4` to the inner div. Port only has `md:py-[2px]` (invented). | **HIGH — vertical padding missing on mobile** |
| 8 | 154 | `text-[0.9rem] font-semibold` | matches MUI title `fontSize: "0.9rem"; fontWeight: 600` | ✓ |
| 9 | 154 | `text-white text-center` | matches | ✓ |
| 10 | 158 | `flex items-start gap-3 py-3` | MUI `.timerContainer { display: flex; alignItems: center; gap: 12px }`. Port: `items-start` vs MUI `items-center` — **divergent**. `gap-3` (12px) matches. `py-3` (12px vertical padding) **invented** — MUI has no vertical padding on timerContainer. | **HIGH** (#10a items align) + MED (#10b extra py) |
| 11 | 161 | `flex min-w-[40px] flex-col items-center` | matches MUI `.timeUnit` | ✓ |
| 12 | 163 | `text-[1.2rem] font-bold leading-none text-white` | matches MUI number | ✓ |
| 13 | 168 | `mt-[2px]` | MUI has no margin between number and label (column flex, no `gap` on `.timeUnit`). Port adds 2px. | LOW |
| 14 | 168 | `text-[0.7rem] font-medium leading-none text-white/90` | matches MUI label fs/weight/lh + `rgba(255,255,255,0.9)` ≈ `text-white/90` | ✓ |
| 15 | 174 | `text-[1.2rem] font-bold leading-none text-white` separator `<p>` | matches MUI separator | ✓ |
| 16 | 137 | `if (!countdownData || !countdownData.isActive) return null;` | matches MUI — port drops the `isLoading` check (MUI had unused `isLoading` state). Functionally equivalent. | ✓ |
| 17 | (overall) | port uses `<React.Fragment key>` to interleave separators | MUI renders separators inline between Box.timeUnit children with no Fragment — same visual outcome | ✓ |

### Summary

**3 distinct bugs**: #3 gap (4px vs 8px), #7 missing 16px vertical padding on countdownBox, #10 items-start vs items-center on timer + extra py-3. Plus #4 invented `md:py-[2px]` and `md:gap-2` overrides, #13 invented mt-[2px] between number and label.

## §3 Corrected Tailwind classNames

```tsx
<div className={cn(isFixed ? "fixed" : "sticky", "inset-x-0 top-0 z-[1000] w-full p-0")}>
  {/* countdownBox: py-4 (16px), gap-2 (8px), col→row md, center, text-center, shadow */}
  <div className="flex w-full flex-col items-center justify-around gap-2 bg-[#006dac] py-4 text-center shadow-[0_4px_20px_rgba(0,0,0,0.15)] md:flex-row">
    {/* title */}
    <p className={cn(leagueSpartan.className,
      "text-center font-heading text-[0.9rem] font-semibold text-white"
    )}>
      {countdownData.title}
    </p>

    {/* timerContainer: items-center (was items-start), gap-3, NO vertical padding */}
    <div className="flex items-center gap-3">
      {units.map((u, i) => (
        <React.Fragment key={u.label}>
          <div className="flex min-w-[40px] flex-col items-center">
            <p className={cn(leagueSpartan.className,
              "font-heading text-[1.2rem] font-bold leading-none text-white"
            )}>{formatNumber(u.value)}</p>
            {/* label: drop mt-[2px], no margin in MUI */}
            <p className={cn(leagueSpartan.className,
              "font-heading text-[0.7rem] font-medium leading-none text-white/90"
            )}>{u.label}</p>
          </div>
          {i < units.length - 1 && (
            <p className="text-[1.2rem] font-bold leading-none text-white">:</p>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
</div>
```

## §4 Verification at 4 widths

- 375 (xs band): bar stacks column, title above timer, py-4 = 16px vertical inside box, gap-2 = 8px between title and timer. Numbers 1.2rem ≈ 19px.
- 768 (still <md = 900px): same column layout.
- 1280 (≥md): row layout, title left of timer (RTL: title right of timer), space-around horizontal distribution.
- 1920: same as 1280.

## §5 RTL notes

- `flex-row` with `justify-around` is direction-agnostic — under `dir="rtl"`, the title sits on the right of the bar and the timer block on the left automatically.
- Inside `.timeUnit`, the column stack (number / label) is vertical — direction-irrelevant.
- The separators (`:`) are language-neutral; they look the same in EN and AR.
- The DAYS/HRS/MINS/SECS labels are hard-coded English uppercase. For AR support, the labels should be branched via `useI18n()` — but the MUI source also hard-codes English, so the port matches. Flag this if/when AR localization is required.
- `text-center` on the bar plus `items-center` on the timer keeps everything visually centered in both directions.
