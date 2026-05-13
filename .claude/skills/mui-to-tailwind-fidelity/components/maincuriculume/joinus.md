# Component — `JoinUs` (maincuriculume)

Full-bleed "Join Us Today" CTA section: centered headline + description + button, with 4 student photo cutouts pinned to each corner. **Not ported** in Tailwind.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\maincuriculume\joinus.tsx` |
| Tailwind port | (not ported — `/maincuriculume` route is absent) |

## §1 MUI source — extracted properties

### Layout tree

```
Box  (bg #9EDCFF, position relative)
├── Grid container spacing={1}
│   └── Grid item xs=12 sm=12 md=12 lg=12   (full width all sizes)
│       └── Box  (text-center, flex col centered, h 80vh)
│           ├── Typography.joinhed  (headline)
│           ├── Typography.joindesc (description)
│           └── Button.containedBtn ("Enroll Now")
├── Box  (absolute, top 30, left 50)  <Image girl1, h 30vh />
├── Box  (absolute, top 30, right 50) <Image girl2, h 30vh />
├── Box  (absolute, bottom 30, left 100)  <Image boy1, h 30vh />
└── Box  (absolute, bottom 30, right 100) <Image boy2, h 30vh />
```

### Dimensions & spacing

| Element | Property | Value |
|---|---|---|
| Outer Box | bg | `#9EDCFF` |
| Outer Box | position | relative |
| Inner Box | height | 80vh |
| Inner Box | flex | col, items-center, justify-center, text-center |
| Corner images | height | 30vh (width auto) |
| Corner image positions | top/bottom 30px, left 50/100px or right 50/100px |
| Button padding | paddingY 2vh, paddingX 4vh |
| Button marginY | 2vh |
| Button width xs/sm/md | 30% |
| Button width lg | **100%** |

### Typography

| Element | lg fontSize | weight | width lg | paddingY |
|---|---|---|---|---|
| joinhed | 6vh | 600 | 80vh | — |
| joindesc | 2.4vh | **600** (intentional or bug?) | 125vh | 2vh |
| Button label | 2vh | 700 | — | — |

### Colors

| Element | Color / shadow |
|---|---|
| Section bg | `#9EDCFF` |
| Button bg | `#38B6FF`, text white, shadow `1px 4px 24px 0px #38B6FFB2`, radius 10px |

### Animations / interactions

- Button hover preserves bg + shadow (no transform).

## §2 Tailwind port — bug list

No Tailwind port exists.

## §3 Corrected Tailwind classNames

```tsx
<div className="relative bg-[#9EDCFF]">
  <div className="grid grid-cols-1">
    <div className="flex h-[80vh] flex-col items-center justify-center text-center">
      <p className="font-semibold lg:text-[6vh] lg:max-w-[80vh]">
        Join Us Today and Be Part of the Growth!
      </p>
      <p className="font-semibold lg:text-[2.4vh] lg:max-w-[125vh] lg:py-[2vh]">
        Our community events offer unparalleled opportunities to expand...
      </p>
      <button
        type="button"
        className="my-[2vh] w-[30%] lg:w-full rounded-[10px] px-[4vh] py-[2vh]
                   bg-brand-500 text-white text-[2vh] font-bold normal-case
                   shadow-[1px_4px_24px_0px_#38B6FFB2]
                   hover:bg-brand-500"
      >
        Enroll Now
      </button>
    </div>
  </div>
  <Image src={girl1} alt="" className="absolute top-[30px] left-[50px]"  style={{ height: "30vh", width: "auto" }} />
  <Image src={girl2} alt="" className="absolute top-[30px] right-[50px]" style={{ height: "30vh", width: "auto" }} />
  <Image src={boy1}  alt="" className="absolute bottom-[30px] left-[100px]"  style={{ height: "30vh", width: "auto" }} />
  <Image src={boy2}  alt="" className="absolute bottom-[30px] right-[100px]" style={{ height: "30vh", width: "auto" }} />
</div>
```

Note: Button at lg goes to `width: 100%` while xs/sm/md is `30%` — counter-intuitive (typically buttons shrink on desktop). Possible MUI source bug; preserve unless re-designing.

## §4 Verification at 4 widths
- 375: 4 corner photos at 30vh ≈ 240px will dominate / overlap the center text. Likely needs mobile layout reconsideration (source ignores xs).
- 768: same overlap risk.
- 1280: corner photos pinned at top:30 / bottom:30, plenty of room for centered CTA.
- 1920: works as designed.

## §5 RTL notes
- Pixel-based `left: 50` / `right: 50` / `left: 100` / `right: 100` — direction-dependent. In RTL the "left girl1" and "right girl2" should swap so the heavier offset (100px) sits on the start side. Switch to `start-[50px]` / `end-[50px]` etc. via logical properties if porting to AR.
- Text is centered → direction-neutral.
