# Component — `<Hero>` (curiculume)

Curriculum-page hero with a left-aligned headline ("Everything you need to know about IGCSE Maths"), supporting paragraph, primary CTA button, and two trust-rating images (stars / Truststar) inline next to the button.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\curiculume\hero.tsx` |
| Tailwind port | **MISSING** — no `tuitionalFrontend\src\components\curiculume\hero.tsx`. This curriculum-page hero has not been ported yet. |
| Arabic variant | (none in baseline) |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Box height="80vh">                              ← root, locked to 80vh
├── <Box TextBox>                                ← width 100%/74% (lg), flex col centered
│   ├── <Typography h2 heading>                  ← "Everything you need to know about IGCSE Maths"
│   └── <Typography desc>                        ← lorem paragraph
└── <Box BtnBox>                                 ← flex col (xs) / row (sm+), gap 1rem
    ├── <Box><Button containedBtn>Get in touch</Button></Box>
    ├── <Box><Image stars.svg h-6vh/></Box>
    └── <Box><Image Truststar.svg h-6vh/></Box>
```

### Dimensions & spacing

| Element | Property | xs (<600) | sm (600+) | md (900+) | lg (1200+) |
|---|---|---|---|---|---|
| root | `height` | 80vh | 80vh | 80vh | 80vh |
| `TextBox` | `width` | 100% | 100% | (ms: 100%) | 74% |
| `TextBox` | `textAlign` | center | center | center | start |
| `TextBox` | `display/flexDirection/align/justify` | flex col, items-center, justify-center | (same) | (same) | (same) |
| `BtnBox` | `flexDirection` | column | row | row | row |
| `BtnBox` | `justifyContent` | center | flex-start | flex-start | flex-start |
| `BtnBox` | `alignItems` | center | center | center | center |
| `BtnBox` | `width` | 100% | 100% | 100% | 100% |
| `BtnBox` | `gap` | 1rem | 1rem | 1rem | 1rem |
| heading | `marginTop` | 3vh | 3vh | 3vh | 10vh |
| desc | `marginTop` | 2vh | 2vh | 2vh | 2vh |
| containedBtn | `paddingY` | 2vh | 2vh | 2vh | 2vh |
| containedBtn | `paddingX` | 4vh | 4vh | 4vh | 4vh |
| containedBtn | `marginY` | 2vh | 2vh | 2vh | 2vh |
| containedBtn | `width` | 100% | 100% | 100% | 100% |
| containedBtn | `borderRadius` | 10px | 10px | 10px | 10px |
| stars / Truststar `<img>` (inline style) | `height` | 6vh | 6vh | 6vh | 6vh |

### Typography

| Element | Variant / fontSize | xs | sm | md | lg | Weight | Color | lineHeight | textAlign | Font |
|---|---|---|---|---|---|---|---|---|---|---|
| heading (h2) | inline fontSize | 5.7vh | 6.5vh | 5.3vh | 7.1vh | 800 | #000000 | xs 5.5vh / sm 6.5vh / md 5.5vh / lg 9vh | xs/sm center, lg start | League Spartan |
| desc | inline fontSize | 2.5vh | 2vh | 2.5vh | 2.6vh | 400 | (default) | xs 2.5vh / sm 2.4vh / md 2.8vh / lg 4vh | justify (xs and lg both) | League Spartan |
| containedBtn label | fontSize | 2vh | 2vh | 2vh | 2vh | 700 | (button default white) | (default) | center | League Spartan (button label) |

Note: this hero uses **explicit `vh` font-sizes**, not MUI typography tokens. Do **not** map to the `text-h2-mobile sm:text-h2-tablet lg:text-h2` triplet — preserve the `vh` literals.

### Colors

| Hex | Where | Token |
|---|---|---|
| `#000000` | heading color | `text-black` |
| `#38B6FF` | containedBtn background | `bg-brand-500` |
| `#38B6FFB2` (`1px 4px 24px 0px`) | containedBtn boxShadow | arbitrary `shadow-[1px_4px_24px_0px_#38B6FFB2]` |

### Animations / interactions

- containedBtn `:hover` keeps the same background `#38B6FF` and same boxShadow — explicit "no hover change".
- `textTransform: "none"` on button → `normal-case`.

---

## §2 Tailwind port — bug list

**Port file does not exist.** When porting, the following are the principal risks based on patterns elsewhere in the curiculume folder:

| # | Risk | Expected (per MUI) | Severity |
|---|---|---|---|
| H1 | Mapping `fontSize: { xs: "5.7vh", sm: "6.5vh", md: "5.3vh", lg: "7.1vh" }` to the `text-h1/text-h2` triplet | Must preserve literal vh: `text-[5.7vh] sm:text-[6.5vh] md:text-[5.3vh] lg:text-[7.1vh]` | high |
| H2 | Losing `lineHeight` per breakpoint | `leading-[5.5vh] sm:leading-[6.5vh] md:leading-[5.5vh] lg:leading-[9vh]` | high |
| H3 | Losing `marginTop` jump at `lg` (3vh → 10vh) | `mt-[3vh] lg:mt-[10vh]` | high |
| H4 | Forgetting `textAlign` switch at `lg` (center → start) | `text-center lg:text-start` | medium |
| H5 | Forgetting `width: { lg: "74%" }` on text box | `w-full lg:w-[74%]` | medium |
| H6 | Button `width: 100%` at every breakpoint (note the value is literally 100% across xs/sm/md/lg) | `w-full` (not `w-auto sm:w-auto`) | high — visual mismatch |
| H7 | Replacing the boxShadow with `shadow-brand-glow` | Must use arbitrary `shadow-[1px_4px_24px_0px_#38B6FFB2]` — token differs (token is `0.1vh 1.5vh 3.4vh 0px rgba(56,182,255,0.4)`) | high |
| H8 | Skipping `font-weight: 800` on heading (MUI uses 800, Tailwind heading tokens default to 700) | Add `font-extrabold` (800) override | medium |
| H9 | Using `text-justify` only at lg | MUI sets justify at xs and lg both — apply `text-justify` to the desc unconditionally | low |
| H10 | The button container `<Box>` wraps the `<Button>` but has no styles — when porting don't apply width restrictions to the wrapper | wrap with plain `<div>` | low |

---

## §3 Corrected Tailwind classNames

```tsx
<div className="h-[80vh]">
  {/* TextBox */}
  <div className="flex w-full flex-col items-center justify-center text-center lg:w-[74%] lg:text-start">
    <h2
      className={`${leagueSpartan.className} font-heading text-[5.7vh] font-extrabold leading-[5.5vh] text-black sm:text-[6.5vh] sm:leading-[6.5vh] md:text-[5.3vh] md:leading-[5.5vh] mt-[3vh] lg:mt-[10vh] lg:text-[7.1vh] lg:leading-[9vh]`}
    >
      Everything you need to know about IGCSE Maths
    </h2>
    <p
      className={`${leagueSpartan.className} mt-[2vh] text-justify font-heading text-[2.5vh] font-normal leading-[2.5vh] sm:text-[2vh] sm:leading-[2.4vh] md:text-[2.5vh] md:leading-[2.8vh] lg:text-[2.6vh] lg:leading-[4vh]`}
    >
      Lorem ipsum dolor sit amet consectetur. Nam amet vitae accumsan sodales tempus pellentesque tellus. Ac aliquam placerat arcu sed urna tortor purus. Est nibh leo.
    </p>
  </div>

  {/* BtnBox */}
  <div className="flex w-full flex-col items-center justify-center gap-[1rem] sm:flex-row sm:justify-start">
    <div className="w-full">
      <button
        type="button"
        className={`${leagueSpartan.className} my-[2vh] w-full rounded-[10px] bg-brand-500 px-[4vh] py-[2vh] font-heading text-[2vh] font-bold normal-case text-white shadow-[1px_4px_24px_0px_#38B6FFB2] hover:bg-brand-500`}
      >
        Get in touch
      </button>
    </div>
    <div>
      <Image src={stars} alt="stars" style={{ height: "6vh" }} />
    </div>
    <div>
      <Image src={star} alt="stars" style={{ height: "6vh" }} />
    </div>
  </div>
</div>
```

---

## §4 Verification at 4 widths

- **375px**: heading 5.7vh tall (~38px on 667h iPhone), centered. desc justified. Button + 2 stars stacked column, button full-width.
- **768px**: heading 6.5vh, centered; desc 2vh, justified. Button + stars in a row, button still full-width (because MUI keeps 100%).
- **1280px**: heading 7.1vh, left-aligned, top-margin 10vh. desc text-justified. TextBox width 74% (~947px); button row left-aligned.
- **1920px**: same as 1280; heading still 7.1vh; TextBox is 74% of root width (~1421px).

---

## §5 RTL notes

No AR variant exists in the curiculume baseline. If/when one is added: flip `lg:text-start` → `lg:text-end`, `sm:justify-start` → `sm:justify-end`, and consider `dir="rtl"` on the root.
