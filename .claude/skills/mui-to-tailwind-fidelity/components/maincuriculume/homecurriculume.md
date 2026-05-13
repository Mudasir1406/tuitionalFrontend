# Component — `HomeCurriculume` (maincuriculume)

A "Home > Curriculum" breadcrumb pill on the standalone `/maincuriculume` page. **Not ported** in Tailwind. (The generic `bread-crumb/` component has the same intent but a different visual treatment.)

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\maincuriculume\homecurriculume.tsx` |
| Tailwind port | (not ported — `/maincuriculume` route is absent) |

## §1 MUI source — extracted properties

### Layout tree

```
Box  (centered pill: padding 8px 16px, margin "0 7vh 7vh", h 6vh, radius 1.5vh)
└── Typography  ("Home > Curriculum") — span "Curriculum" colored #38B6FF
```

### Dimensions & spacing

| Property | Value |
|---|---|
| textAlign | center |
| padding | 8px 16px |
| margin | `0 7vh 7vh` (top 0, x 7vh, bottom 7vh) |
| width | auto |
| height | 6vh |
| borderRadius | 1.5vh |
| background | `#E7F6FF` |
| boxShadow | `0px 2px 1px 0px rgba(0, 0, 0, 0.05), 0px -3px 8px 0px rgba(56, 182, 255, 0.20)` |
| backdropFilter | blur(5px) |

### Typography

| Element | Property | lg | weight | color |
|---|---|---|---|---|
| Typography | fontSize | 3vh | 700 | inherit black |
| span (Curriculum) | color | — | inherit | `#38B6FF` |

### Colors

- Background: `#E7F6FF` (same as `brand-50` tint — but exact hex differs from #D7F0FF; preserve literal).
- Brand accent: `#38B6FF`.
- Shadow: combined inset + drop, dominated by `rgba(56,182,255,0.20)`.

### Animations / interactions

None.

## §2 Tailwind port — bug list

No Tailwind port exists.

## §3 Corrected Tailwind classNames

```tsx
<div
  className="mx-[7vh] mb-[7vh] mt-0 h-[6vh] w-auto rounded-[1.5vh]
             bg-[#E7F6FF] px-4 py-2 text-center backdrop-blur-[5px]
             shadow-[0px_2px_1px_0px_rgba(0,0,0,0.05),0px_-3px_8px_0px_rgba(56,182,255,0.20)]"
>
  <p className="font-heading text-[3vh] font-bold">
    Home &gt; <span className="text-brand-500">Curriculum</span>
  </p>
</div>
```

## §4 Verification at 4 widths
- 375 / 768 / 1280 / 1920: same dimensions (no responsive overrides in MUI source). 6vh height scales with viewport — verify visual pill remains usable on tall mobile screens (~50px).

## §5 RTL notes
- "Home > Curriculum" reading order should reverse for RTL — MUI source hardcodes `&gt;` between English words; if porting to AR, source/order should be swapped at the JSX level.
- `margin: 0 7vh 7vh` is symmetric horizontally — no RTL flip needed.
