# Component — `<JoinUs>` (curiculume)

"Join Us Today and Be Part of the Growth!" CTA block: centered 80vh container with a blue background, headline + paragraph + CTA button. Four decorative student images are absolutely positioned in the four corners.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\curiculume\join-us.tsx` |
| Tailwind port | **MISSING** — no `tuitionalFrontend\src\components\curiculume\join-us.tsx`. |
| Arabic variant | (none in baseline) |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Box bg=#9EDCFF position=relative>
├── <Grid container spacing={1}>
│   └── <Grid item xs=12 sm=12 md=12 lg=12>
│       <Box flex col centered height=80vh>
│         <Typography joinhed>Join Us Today and Be Part of the Growth!</Typography>
│         <Typography joindesc>Our community events offer...</Typography>
│         <Box>
│           <Button containedBtn>Enroll Now</Button>
│         </Box>
│       </Box>
└── (4 absolutely positioned images)
    ├── <Box position=absolute top=30 left=50><Image girl1 h=30vh /></Box>
    ├── <Box position=absolute top=30 right=50><Image girl2 h=30vh /></Box>
    ├── <Box position=absolute bottom=30 left=100><Image boy1 h=30vh /></Box>
    └── <Box position=absolute bottom=30 right=100><Image boy2 h=30vh /></Box>
```

### Dimensions & spacing

| Element | Property | xs | sm | md | lg |
|---|---|---|---|---|---|
| root | `background` / `position` | `#9EDCFF` / relative | (same) | (same) | (same) |
| content Box | `height` | 80vh | 80vh | 80vh | 80vh |
| content Box | flex col centered | yes | yes | yes | yes |
| Grid container | `spacing` | 1 (8px) | 1 | 1 | 1 |
| Grid item | column span | 12 (always 1 col) | 12 | 12 | 12 |
| joinhed `width` | (default) | (default) | (default) | 80vh | — |
| joindesc `width` | (default) | (default) | (default) | 125vh | — |
| joindesc `paddingY` | (none) | (none) | (none) | 2vh | — |
| containedBtn | `paddingY` | 2vh | 2vh | 2vh | 2vh |
| containedBtn | `marginY` | 2vh | 2vh | 2vh | 2vh |
| containedBtn | `paddingX` | 4vh | 4vh | 4vh | 4vh |
| containedBtn | `borderRadius` | 10px | 10px | 10px | 10px |
| containedBtn | `width` | 30% | 30% | 30% | 100% |
| absolute images | `top` / `bottom` (px) | 30 (top) / 30 (bottom) | (same) | (same) | (same) |
| absolute images | `left` / `right` (px) | 50 (top pair) / 100 (bottom pair) | (same) | (same) | (same) |
| absolute images inline | `height` | 30vh | 30vh | 30vh | 30vh |

### Typography

| Element | xs | sm | md | lg | Weight |
|---|---|---|---|---|---|
| joinhed | (default) | (default) | (default) | 6vh | 600 |
| joindesc | (default) | (default) | (default) | 2.4vh | 600 |
| containedBtn label | 2vh | 2vh | 2vh | 2vh | 700 |

### Colors

| Hex | Where | Token |
|---|---|---|
| `#9EDCFF` | root bg | `bg-[#9EDCFF]` |
| `#38B6FF` | button bg | `bg-brand-500` |
| `1px 4px 24px 0px #38B6FFB2` | button shadow | arbitrary `shadow-[1px_4px_24px_0px_#38B6FFB2]` |

### Animations / interactions

- containedBtn `:hover` keeps the same bg + shadow (no change).

---

## §2 Tailwind port — bug list

**Port file does not exist.** Risk list:

| # | Risk | Expected | Severity |
|---|---|---|---|
| J1 | Mapping `joinhed: lg:6vh` to heading triplet | Preserve: `lg:text-[6vh] font-semibold` (no xs/sm value — falls to default ~1rem) | high |
| J2 | Mapping `joindesc: lg:2.4vh` likewise | `lg:text-[2.4vh] font-semibold lg:py-[2vh]` | medium |
| J3 | The Grid wrapper is `xs=12 sm=12 md=12 lg=12` = always full width — wholly redundant | Skip Grid; render content directly | low |
| J4 | Absolute image positions in **pixels** | `top-[30px] left-[50px] right-[50px] bottom-[30px] left-[100px] right-[100px]` (preserve px literals) | high |
| J5 | Image heights inline `30vh` | inline style retained `style={{ height: "30vh", width: "auto" }}` | medium |
| J6 | containedBtn width cascade 30% (xs/sm/md) → 100% (lg) | `w-[30%] lg:w-full` | high |
| J7 | The 4 absolute images will overlap and visually clip on narrow viewports — `top: 30, left: 50` puts them way too close on a 375px-wide screen | Document the bug; consider `hidden lg:block` for absolute images on small screens (NOT in MUI source — caution: would be a port-time design decision) | medium |
| J8 | `joinhed width: lg:80vh` and `joindesc width: lg:125vh` are width-in-vh (unusual) | `lg:w-[80vh]` and `lg:w-[125vh]` | high |
| J9 | Forgetting `height: 80vh` on content Box | `h-[80vh]` | medium |

---

## §3 Corrected Tailwind classNames

```tsx
<div className="relative bg-[#9EDCFF]">
  <div className="flex h-[80vh] flex-col items-center justify-center text-center">
    <p className="font-semibold lg:w-[80vh] lg:text-[6vh]">
      Join Us Today and Be Part of the Growth!
    </p>
    <p className="font-semibold lg:w-[125vh] lg:py-[2vh] lg:text-[2.4vh]">
      Our community events offer unparalleled opportunities to expand your horizons, connect with fellow learners, and engage with experts from various fields.
    </p>
    <div>
      <button
        type="button"
        className="my-[2vh] w-[30%] rounded-[10px] bg-brand-500 px-[4vh] py-[2vh] text-[2vh] font-bold normal-case text-white shadow-[1px_4px_24px_0px_#38B6FFB2] hover:bg-brand-500 lg:w-full"
      >
        Enroll Now
      </button>
    </div>
  </div>

  <div className="absolute top-[30px] left-[50px]">
    <Image src={girl1} alt="" style={{ height: "30vh", width: "auto" }} />
  </div>
  <div className="absolute top-[30px] right-[50px]">
    <Image src={girl2} alt="" style={{ height: "30vh", width: "auto" }} />
  </div>
  <div className="absolute bottom-[30px] left-[100px]">
    <Image src={boy1} alt="" style={{ height: "30vh", width: "auto" }} />
  </div>
  <div className="absolute bottom-[30px] right-[100px]">
    <Image src={boy2} alt="" style={{ height: "30vh", width: "auto" }} />
  </div>
</div>
```

---

## §4 Verification at 4 widths

- **375px**: blue rectangle 80vh tall. 4 absolute corner images at 30vh each — they will overlap the centered content because text takes the center. Button at 30% width (~112px). Headline + desc use default font (no lg breakpoint hit).
- **768px**: same; absolute images still close to corners but content area is wider so less overlap. Default font still.
- **1280px**: headline 6vh (~58px), width 80vh (~600px); desc 2.4vh, width 125vh (~937px). Button at 100% (full content width). 4 corner images at 30vh (~288px tall).
- **1920px**: same as 1280; absolute pixel offsets are tiny relative to viewport (30/50/100 px in a 1920×1200 viewport).

---

## §5 RTL notes

No AR variant. `left` / `right` on absolute images would need to flip in RTL (LTR has girl1 top-left → AR should have girl1 top-right). Use logical `start`/`end` arbitrary classes: `start-[50px]` / `end-[50px]`. The two "top" images become a single mirrored pair under RTL, no special handling needed beyond logical offsets.
