# Component — `HeroInfo`

Right-column hero image (lg=6 grid item paired with `Hero` lg=6). Falls back to `subject-level.png` if image URL is missing/undefined.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\hero-info.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\hero-info.tsx` |
| Arabic variant | `ar-hero-info.tsx` (mirror) |

## §1 MUI source — extracted properties

### Layout tree

```
<Grid item lg=6 md=12 sm=12 xs=12>
  <Box sx={styles.container}>
    <Image fill priority sizes="..." style={{ objectFit: "contain", objectPosition: "bottom" }} />
  </Box>
</Grid>
```

### Dimensions & spacing

| Element | Property | xs | sm | md | lg |
|---|---|---|---|---|---|
| container | width | 100% | | | |
| container | height | 45vh | 80vh | 70vh | 80vh |
| container | marginTop | 2.5vh | 0vh | 1.5vh | 1vh |
| container | position | relative | | | |

### Typography
n/a — no text.

### Colors
n/a — image only.

### Animations / interactions
None.

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 20 | `mt-[2.5vh] h-[45vh] w-full sm:mt-0 sm:h-[80vh] md:mt-[1.5vh] md:h-[70vh] lg:mt-0 lg:h-[80vh]` | matches all four breakpoints precisely | OK |
| B2 | 27 | `className="object-contain object-bottom lg:object-top"` | MUI uses `style={{ objectPosition: "bottom" }}` consistently across breakpoints — port adds `lg:object-top` which is not in MUI. | Med (image anchor changes at lg+ — not in MUI) |
| B3 | — | port drops the `<Grid item lg={6}>` wrapper (now lives in parent's `lg:grid-cols-2`) | correct per breakpoint inversion rule | OK |
| B4 | 22-29 | `<Image fill priority sizes=...>` | matches | OK |

## §3 Corrected Tailwind classNames

Remove the `lg:object-top` to match MUI:

```tsx
<div className="relative mt-[2.5vh] h-[45vh] w-full sm:mt-0 sm:h-[80vh] md:mt-[1.5vh] md:h-[70vh] lg:mt-0 lg:h-[80vh]">
  <Image
    alt={imageAltText || ""}
    src={src}
    fill
    priority
    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 100vw, 50vw"
    className="object-contain object-bottom"
    onError={() => setSrc(subjectLevelImage.src)}
  />
</div>
```

## §4 Verification at 4 widths

- **375 (xs)**: container `mt-[2.5vh] h-[45vh]`. Image anchored bottom.
- **768 (sm)**: container `h-[80vh]`, mt-0.
- **1280 (lg)**: `h-[80vh]`, mt-0. Image anchored bottom (NOT top).
- **1920**: same as lg.

## §5 RTL notes

`ar-hero-info.tsx` is identical structurally — image is direction-agnostic. No flips needed; ensure the parent grid order swaps so the image appears on the **left** in RTL (Hero on the right).
