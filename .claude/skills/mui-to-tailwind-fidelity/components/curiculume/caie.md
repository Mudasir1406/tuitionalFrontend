# Component — `<CAIE>` (curiculume)

Two-column comparison panel ("Requirements of CAIE" / "Course Format of CAIE"): each side shows a heading, a tinted box with one labeled row + a long description, then two outlined rows (heading + plus icon).

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\curiculume\caie.tsx` |
| Tailwind port | **MISSING** — no `tuitionalFrontend\src\components\curiculume\caie.tsx`. |
| Arabic variant | (none in baseline) |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Box marginX/Y>                                ← outer wrapper
└── <Grid container spacing={1}>               ← 8px gap
    {Caie.map((i) => (
      <Grid item xs=12 sm=6 md=6 lg=6>
        <Typography hed1>{heading1}</Typography>     ← "Requirements of CAIE"
        <Box (D3EFFF, blur, shadow)>
          <Box headingicon>                          ← flex space-between, paddingX 2vh
            <Typography boxheding>{heading2}</Typography>  ← "Age"
            <Box icon><Image icon1 h-5vh /></Box>           ← minus icon
          </Box>
          <Typography description>{desc}</Typography>
        </Box>
        <Box heading (border)>                       ← outline row, marginY 2vh
          <Typography boxheding>{heading3}</Typography>
          <Box icon><Image icon2 h-5vh /></Box>
        </Box>
        <Box heading (border)>
          <Typography boxheding>{heading4}</Typography>
          <Box icon><Image icon2 h-5vh /></Box>
        </Box>
      </Grid>
    ))}
```

### Dimensions & spacing

| Element | Property | xs | sm | md | lg |
|---|---|---|---|---|---|
| outer Box | `marginX` | (none) | 2vh | 2vh | 7vh |
| outer Box | `marginY` | (none) | 5vh | 5vh | 13vh |
| Grid container | `spacing` | 1 (8px) | 1 | 1 | 1 |
| Grid item | breakpoint cols | 12 (1 col) | 6 (2 cols) | 6 | 6 |
| hed1 | `lineHeight` | 10vh | 10vh | 10vh | 10vh |
| hed1 | `fontWeight` | 600 | 600 | 600 | 600 |
| tinted Box (D3EFFF) | `background` | #D3EFFF | (same) | (same) | (same) |
| tinted Box | `borderRadius` | 2vh | 2vh | 2vh | 2vh |
| tinted Box | `boxShadow` | `0px -5px 15px 0px rgba(56, 182, 255, 0.20)` (matches `shadow-benefit-box`) | (same) | (same) | (same) |
| tinted Box | `backdropFilter` | blur(5px) | (same) | (same) | (same) |
| headingicon | `display/justifyContent` | flex / space-between | (same) | (same) | (same) |
| headingicon | `paddingX` | 2vh | 2vh | 2vh | 2vh |
| heading (outline row) | `borderRadius` | 1vh | 1vh | 1vh | 1vh |
| heading (outline row) | `border` | 1px solid #DADADA | (same) | (same) | (same) |
| heading (outline row) | `marginY` | (none) | 2vh | (none) | 2vh |
| heading (outline row) | `paddingX` | 2vh | 2vh | 2vh | 2vh |
| icon wrap | `padding` | 1vh | 1vh | 1vh | 1.7vh 0 0 0 |
| description | `width` | 80vh (fixed vh — unusual) | 80vh | 80vh | 80vh |
| description | `padding` | (none) | 2vh | (none) | 0 2vh 2vh 2vh |
| icon image inline | `height` | 5vh | 5vh | 5vh | 5vh |

### Typography

| Element | xs | sm | md | lg | Weight | TextAlign | Font |
|---|---|---|---|---|---|---|---|
| hed1 | 4vh | 3vh | (sm) | 4vh | 600 | xs center, sm/md/lg start | (default — no className) |
| boxheding | 3vh | 1.5vh | 2vh | 2.4vh | 600 | (default) | (default) |
| boxheding `lineHeight` | (none) | (none) | (none) | 8vh | — | — | — |
| description | 1.8vh | 1.4vh | 2vh | 2vh | 400 | justify | (default) |

### Colors

| Hex | Where | Token |
|---|---|---|
| `#D3EFFF` | tinted box bg | arbitrary `bg-[#D3EFFF]` (close to `bg-brand-50` `#D7F0FF` but not identical — preserve exact hex) |
| `#DADADA` | outline row border | arbitrary `border-[#DADADA]` |
| `rgba(56, 182, 255, 0.20)` | tinted box shadow | `shadow-benefit-box` |

### Animations / interactions

- None (static).

---

## §2 Tailwind port — bug list

**Port file does not exist.** When porting, watch for:

| # | Risk | Expected | Severity |
|---|---|---|---|
| C1 | Mapping `hed1` to MUI typography triplet | Preserve `vh`: `text-[4vh] sm:text-[3vh] lg:text-[4vh]` with `leading-[10vh] font-semibold` | high |
| C2 | Mapping `boxheding` to triplet | `text-[3vh] sm:text-[1.5vh] md:text-[2vh] lg:text-[2.4vh] font-semibold lg:leading-[8vh]` | high |
| C3 | Mapping `description` to triplet | `text-[1.8vh] sm:text-[1.4vh] md:text-[2vh] lg:text-[2vh] text-justify w-[80vh]` | high |
| C4 | Grid item `xs=12 sm=6 lg=6` → `grid grid-cols-1 sm:grid-cols-2` (because `sm` is the first non-12 breakpoint here) | `grid grid-cols-1 sm:grid-cols-2 gap-2` (spacing=1 → gap-2) | **high** |
| C5 | Outline row `marginY` only at `sm` and `lg` (not at xs/md) | `sm:my-[2vh] md:my-0 lg:my-[2vh]` (or `my-[2vh]` plain) — preserve gap. Acceptable to use `my-[2vh]` flat. | low |
| C6 | Icon padding switch | `p-[1vh] lg:p-[1.7vh_0_0_0]` | low |
| C7 | hed1 text-align mobile=center, others=start | `text-center sm:text-start` | medium |
| C8 | Description width is the unusual `80vh` (height-relative width) | Preserve exactly: `w-[80vh]` not `w-[80%]` | high — visual diff |
| C9 | Description padding switch between breakpoints | `sm:p-[2vh] lg:p-[0_2vh_2vh_2vh]` | low |
| C10 | Outer marginX is `sm: "2vh", lg: "7vh"` (no xs) | `sm:mx-[2vh] lg:mx-[7vh]` (no xs base → reverts to 0) | medium |
| C11 | Outer marginY is `sm: "5vh", lg: "13vh"` (no xs) | `sm:my-[5vh] lg:my-[13vh]` | medium |

---

## §3 Corrected Tailwind classNames

```tsx
<div className="sm:mx-[2vh] sm:my-[5vh] lg:mx-[7vh] lg:my-[13vh]">
  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
    {Caie.map((i, index) => (
      <div key={index}>
        <p className="text-center font-semibold leading-[10vh] text-[4vh] sm:text-start sm:text-[3vh] lg:text-[4vh]">
          {i.heading1}
        </p>

        <div className="rounded-[2vh] bg-[#D3EFFF] shadow-benefit-box backdrop-blur-[5px]">
          <div className="flex justify-between px-[2vh]">
            <p className="font-semibold text-[3vh] sm:text-[1.5vh] md:text-[2vh] lg:text-[2.4vh] lg:leading-[8vh]">
              {i.heading2}
            </p>
            <div className="p-[1vh] lg:p-[1.7vh_0_0_0]">
              <Image src={icon1} alt="icon" style={{ height: "5vh" }} />
            </div>
          </div>
          <p className="w-[80vh] text-justify font-normal text-[1.8vh] sm:text-[1.4vh] sm:p-[2vh] md:text-[2vh] lg:text-[2vh] lg:p-[0_2vh_2vh_2vh]">
            {i.desc}
          </p>
        </div>

        <div className="flex justify-between rounded-[1vh] border border-[#DADADA] px-[2vh] sm:my-[2vh] lg:my-[2vh]">
          <p className="font-semibold text-[3vh] sm:text-[1.5vh] md:text-[2vh] lg:text-[2.4vh] lg:leading-[8vh]">
            {i.heading3}
          </p>
          <div className="p-[1vh] lg:p-[1.7vh_0_0_0]">
            <Image src={icon2} alt="icon" style={{ height: "5vh" }} />
          </div>
        </div>
        <div className="flex justify-between rounded-[1vh] border border-[#DADADA] px-[2vh] sm:my-[2vh] lg:my-[2vh]">
          <p className="font-semibold text-[3vh] sm:text-[1.5vh] md:text-[2vh] lg:text-[2.4vh] lg:leading-[8vh]">
            {i.heading4}
          </p>
          <div className="p-[1vh] lg:p-[1.7vh_0_0_0]">
            <Image src={icon2} alt="icon" style={{ height: "5vh" }} />
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
```

---

## §4 Verification at 4 widths

- **375px**: 1 column; heading 4vh (~27px), centered; tinted card with minus icon; description 1.8vh. Note `w-[80vh]` on description — at xs viewport height ~667 → 533px width, which will overflow the container. **Bug in MUI** but preserved.
- **768px**: 2 columns (sm:grid-cols-2 kicks in); heading 3vh, start-aligned; boxheding 1.5vh; description 1.4vh.
- **1280px**: 2 columns; heading 4vh, boxheding 2.4vh with lineHeight 8vh; description 2vh with padding `0 2vh 2vh 2vh`.
- **1920px**: same as 1280; outer marginX 7vh (~67px on 960px viewport height); marginY 13vh.

---

## §5 RTL notes

No AR variant in baseline. If/when added: `text-end sm:text-start` flips, `border` stays, but the description's `w-[80vh]` would still overflow narrow screens — investigate before AR port.
