# Component — `StudentsSay` (maincuriculume)

Hero-style two-column testimonial section: left = headline + CTA + decorative quote icon; right = a layered blue/aqua/white card with a single review, rating chip, line divider, and reviewer profile. **Not ported** in Tailwind. (Largely lg-only layout — minimal mobile design in source.)

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\maincuriculume\students-say.tsx` |
| Tailwind port | (not ported — `/maincuriculume` route is absent) |

## §1 MUI source — extracted properties

### Layout tree

```
Box  (height lg 100vh, margin "10vh 0 0 7vh")
└── Grid container spacing={2}
    ├── Grid item xs=12 sm=5 md=5 lg=5
    │   └── Box  (flex col justify-center, position relative, height 80vh)
    │       ├── Box  (padding "5vh 6.5vh 6.5vh")
    │       │   ├── Typography.saytext  ("What are Students Says!")
    │       │   ├── Typography.saydesc  (description)
    │       │   └── Button.containedBtn  ("Write a review")
    │       └── Box  (absolute, top 80) <Image iconsay />
    └── Grid item xs=12 sm=7 md=7 lg=7
        └── Box.blueBox  (BeE7FF, w 92vh, h 77vh, shadow)
            └── Box.aquabox  (margin-left 4vh, w 88vh, h 80vh, #E8F6FF, shadow)
                └── Box.boxWhite  (padding 7vh, #FFF, w 70vh, h 70vh, shadow, ml 6vh)
                    ├── Typography.starChip  (bg #E9B93D, radius 10vh, w 7vh, p 1vh, white)
                    │   └── Image saystar + span "0.5"
                    ├── Typography.saystardesc  (review body)
                    ├── Box.lineimge  (margin lg "15vh 0 0 0") <Image line w=63vh />
                    └── Box.imgtext  (flex, margin "5vh 0 0 0")
                        ├── Image circle  (9vh × 9vh)
                        └── Box (pt 0.5vh)
                            ├── Typography.ayadi  ("Fatima Ayadi")
                            └── Typography.uae    ("Sharjah, UAE")
```

### Dimensions & spacing

| Element | Property | sm/md | lg |
|---|---|---|---|
| Outer Box | height | (none) | 100vh |
| Outer Box | margin | — | `10vh 0 0 7vh` |
| Left Box | height | 80vh | 80vh |
| Left inner padding | padding | `5vh 6.5vh 6.5vh` | same |
| Left icon | position | absolute, top 80px | same |
| blueBox | width / height | — | 92vh / 77vh |
| aquabox | width / height | — | 88vh / 80vh; ml 4vh |
| boxWhite | width / height | — | 70vh / 70vh; padding 7vh; ml 6vh |
| Button | padding | `2vh 4vh` | same |
| Button | marginY | 2vh | 2vh |
| Button | width xs/sm/md | 100% | **40%** at lg |

### Typography

| Element | lg fontSize | lineHeight | weight | width @ lg |
|---|---|---|---|---|
| saytext | 5.5vh | — | 600 | 45vh |
| saydesc | 2.2vh | — | 400 | 38vh |
| saystardesc | 3vh | 5vh | 400 | 70vh |
| Star chip span | 2vh | — | inherit | inside 7vh-wide chip |
| ayadi | 3vh | — | 500 | — |
| uae | 2.2vh | — | 400 | — |
| Button label | 2vh | — | 700 | — |

### Colors

| Element | Color / shadow |
|---|---|
| blueBox bg | `#BEE7FF` (shadow `-8px 0px 8px rgba(0,0,0,0.08)`) |
| aquabox bg | `#E8F6FF` (shadow `-8px 0px 8px rgba(0,0,0,0.08)`) |
| boxWhite bg | `#FFF` (shadow `0px -3px 8px 0px rgba(56,182,255,0.20)`, filter `drop-shadow(0px 2px 1px rgba(0,0,0,0.05))`, backdrop-blur 5px) |
| Star chip bg | `#E9B93D`, color `#FFF`, radius 10vh |
| Button | bg `#38B6FF`, shadow `1px 4px 24px 0px #38B6FFB2`, radius 10px, text white |

### Animations / interactions

- Button hover preserves the same shadow / bg / width.

## §2 Tailwind port — bug list

No Tailwind port exists.

## §3 Corrected Tailwind classNames

```tsx
<div className="lg:h-screen lg:mt-[10vh] lg:ms-[7vh]">
  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">

    {/* Left */}
    <div className="sm:col-span-5 relative flex flex-col justify-center h-[80vh]">
      <div className="px-[6.5vh] pt-[5vh] pb-[6.5vh]">
        <p className="font-semibold lg:text-[5.5vh] lg:w-[45vh]">What are<br/>Students Says!</p>
        <p className="font-normal lg:text-[2.2vh] lg:w-[38vh]">
          Listen to the incredible experiences shared by our students!...
        </p>
        <button
          type="button"
          className="my-[2vh] px-[4vh] py-[2vh] text-[2vh] font-bold normal-case
                     rounded-[10px] bg-brand-500 text-white
                     w-full lg:w-[40%]
                     shadow-[1px_4px_24px_0px_#38B6FFB2]
                     hover:bg-brand-500"
        >
          Write a review
        </button>
      </div>
      <div className="absolute top-[80px]"><Image src={iconsay} alt="" /></div>
    </div>

    {/* Right — layered card stack */}
    <div className="sm:col-span-7">
      <div className="bg-[#BEE7FF] shadow-[-8px_0px_8px_rgba(0,0,0,0.08)]
                       lg:w-[92vh] lg:h-[77vh]">
        <div className="bg-[#E8F6FF] shadow-[-8px_0px_8px_rgba(0,0,0,0.08)]
                         ms-[4vh] lg:w-[88vh] lg:h-[80vh]">
          <div className="bg-white backdrop-blur-[5px] ms-[6vh] p-[7vh]
                           shadow-[0px_-3px_8px_0px_rgba(56,182,255,0.20)]
                           [filter:drop-shadow(0px_2px_1px_rgba(0,0,0,0.05))]
                           lg:w-[70vh] lg:h-[70vh]">
            <span className="inline-flex items-center bg-[#E9B93D] rounded-[10vh] w-[7vh] p-[1vh] text-white text-[2vh]">
              <Image src={saystar} alt="" style={{ height: "2vh" }} />
              <span>0.5</span>
            </span>
            <p className="font-normal lg:text-[3vh] lg:leading-[5vh] lg:w-[70vh]">
              {/* review body */}
            </p>
            <div className="lg:mt-[15vh]">
              <Image src={line} alt="line" style={{ width: "63vh" }} />
            </div>
            <div className="mt-[5vh] flex">
              <Image src={image} alt="circle" style={{ width: "9vh", height: "9vh" }} />
              <div className="pt-[0.5vh]">
                <p className="text-[3vh] font-medium">Fatima Ayadi</p>
                <p className="text-[2.2vh] font-normal">Sharjah, UAE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

Breakpoint trap: MUI source uses `sm={5}/sm={7}` → 2-col split begins at sm (600px). Use `sm:col-span-5/7`, not `lg:`.

## §4 Verification at 4 widths
- 375: single column stack — left textBox 80vh tall, right card stack scrolled below. Layered cards likely overflow; needs mobile design discretion.
- 768: 5/7 split. Layered `vh` widths (92vh/88vh/70vh ≈ 700px/670px/540px) likely overflow narrow tablet — verify.
- 1280: layered cards fit comfortably; 100vh outer container.
- 1920: same with generous left margin.

## §5 RTL notes
- `margin: "10vh 0 0 7vh"` → `ms-[7vh]` (start-margin) on lg.
- `margin: "0 0 0 4vh"` and `"0 0 0 6vh"` for layered cards → `ms-[4vh]` / `ms-[6vh]`.
- Layered card stack visually grows to the right (decreasing inset). In RTL it should grow to the left — `ms-*` handles this automatically with `dir="rtl"` on parent.
- Star chip + arrow flow (`<Image saystar />` + "0.5" span) is left-to-right English — ensure flex direction reverses for AR.
- "What are Students Says!" (sic) — preserve copy or fix grammar at translation time.
