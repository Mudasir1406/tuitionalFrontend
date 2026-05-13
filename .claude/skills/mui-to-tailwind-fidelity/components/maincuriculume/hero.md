# Component — `Hero` (maincuriculume)

Headline + CTA + trust stars for the standalone `/maincuriculume` curriculum page. **Not ported** in Tailwind — the `/maincuriculume` route does not exist on the Tailwind side. Spec is the source of truth if/when the route is restored.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\maincuriculume\hero.tsx` |
| Tailwind port | (not ported — `/maincuriculume` route is absent) |

## §1 MUI source — extracted properties

### Layout tree

```
Box  (padding lg: "0 0 0 11vh", height: 65vh)
├── Box.TextBox  (width 100% mobile / 95% lg, flex col items-start)
│   ├── Typography.heading  ("Explore Our Comprehensive {brand}Curriculum{/brand}")
│   └── Typography.desc     ("Warm greeting...")
└── Box.BtnBox  (flex col → row at sm, items-center, gap: 1rem)
    ├── Button.containedBtn ("Get in touch")
    ├── Image stars         (height: 6vh)
    └── Image Truststar     (height: 6vh)
```

### Dimensions & spacing

| Element | Property | xs | sm | md | lg |
|---|---|---|---|---|---|
| Outer Box | padding | 0 | 0 | 0 | `0 0 0 11vh` |
| Outer Box | height | 65vh | 65vh | 65vh | 65vh |
| TextBox | width | 100% | 100% | 100% | 95% |
| TextBox | textAlign | center | center | center | start |
| BtnBox | flexDirection | column | row | row | row |
| BtnBox | justifyContent | center | flex-start | flex-start | flex-start |
| BtnBox | gap | 1rem | 1rem | 1rem | 1rem |
| heading | marginTop | 3vh | 3vh | 3vh | 10vh |
| desc | marginTop | 2vh | 2vh | 2vh | 2vh |
| Button | paddingY/X | 2vh / 4vh | 2vh / 4vh | 2vh / 4vh | 2vh / 4vh |
| Button | marginY | 2vh | 2vh | 2vh | 2vh |
| Button | width | 100% | 100% | 100% | 100% |
| Star images | height | 6vh | 6vh | 6vh | 6vh |

### Typography

| Element | variant | xs | sm | md | lg | weight | color | font |
|---|---|---|---|---|---|---|---|---|
| heading | (none, `sx`) | 5.7vh / lh 5.5vh | 6.5vh / lh 6.5vh | 5.3vh / lh 5.5vh | 7.1vh / lh 9vh | 800 | `#000000` | League Spartan |
| desc | (none, `sx`) | 2.5vh / lh 2.5vh | 2vh / lh 2.4vh | 2.5vh / lh 2.8vh | 2.6vh / lh 6vh | 400 | inherit | League Spartan |
| Button | MUI Button | 2vh | 2vh | 2vh | 2vh | 700 | `#FFF` | League Spartan |

Brand-highlighted word `Curriculum`: `color: #38B6FF` inline span.

### Colors

- Button bg: `#38B6FF`
- Button shadow: `1px 4px 24px 0px #38B6FFB2`
- Heading color: `#000000`

### Animations / interactions

- Button hover preserves the same shadow + bg (no scale/color change).
- `textTransform: "none"` on the button.

## §2 Tailwind port — bug list

No Tailwind port exists. Listed below: the exact translation required if the route is ported.

## §3 Corrected Tailwind classNames

```tsx
{/* Outer */}
<div className="h-[65vh] lg:ps-[11vh]">
  {/* TextBox */}
  <div className="flex w-full flex-col items-start text-center lg:w-[95%] lg:text-start">
    <h1
      className={`${leagueSpartan.className} text-black font-extrabold
                  text-[5.7vh] leading-[5.5vh] mt-[3vh]
                  sm:text-[6.5vh] sm:leading-[6.5vh] sm:mt-[3vh]
                  md:text-[5.3vh] md:leading-[5.5vh] md:mt-[3vh]
                  lg:text-[7.1vh] lg:leading-[9vh] lg:mt-[10vh]`}
    >
      Explore Our Comprehensive <span className="text-brand-500">Curriculum</span>
    </h1>
    <p
      className={`${leagueSpartan.className} mt-[2vh] font-normal text-center lg:text-start
                  text-[2.5vh] leading-[2.5vh]
                  sm:text-[2vh] sm:leading-[2.4vh]
                  md:text-[2.5vh] md:leading-[2.8vh]
                  lg:text-[2.6vh] lg:leading-[6vh]`}
    >
      Warm greeting introducing tuitional and its commitment to quality education.
    </p>
  </div>
  {/* BtnBox */}
  <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start">
    <button
      type="button"
      className="my-[2vh] w-full rounded-[10px] bg-brand-500 px-[4vh] py-[2vh]
                 text-[2vh] font-bold normal-case text-white
                 shadow-[1px_4px_24px_0px_#38B6FFB2]
                 hover:bg-brand-500 hover:shadow-[1px_4px_24px_0px_#38B6FFB2]"
    >
      Get in touch
    </button>
    <Image src={stars} alt="stars" style={{ height: "6vh", width: "auto" }} />
    <Image src={star}  alt="stars" style={{ height: "6vh", width: "auto" }} />
  </div>
</div>
```

## §4 Verification at 4 widths
- 375: heading 5.7vh ≈ stacks vertical, button full width, center-aligned.
- 768: heading 6.5vh, button + stars in single row.
- 1280: heading 5.3vh (md band), button full width, left-aligned.
- 1920: heading 7.1vh with 9vh line-height, container `ps-[11vh]`.

## §5 RTL notes
- `padding-left: 11vh` on lg → use `ps-[11vh]` (logical) so RTL flips to right.
- `textAlign: "start"` on lg already direction-neutral.
- BtnBox `justifyContent: flex-start` → `justify-start` flips automatically with `dir="rtl"` parent.
