# Component — `NeedExpertGuidence` (maincuriculume)

Single-row "Need Expert Guidance?" CTA banner: icon left + headline/desc center + button right. **Not ported** in Tailwind. (Filename misspelling "guidence" — preserve.)

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\maincuriculume\need-expert-guidence.tsx` |
| Tailwind port | (not ported — `/maincuriculume` route is absent) |

## §1 MUI source — extracted properties

### Layout tree

```
Box  (style={{}} not sx — radius 1vh, bg #E7F6FF, shadow, blur, h 18vh, mb 5vh)
└── Grid container
    └── Grid item xs=12 sm=12 md=12 lg=12   (full width all sizes)
        └── Box.needBox  (flex row, justify-center items-center, gap 2rem)
            ├── Typography  <Image need w/h 13vh />
            ├── Box  (pt 2vh)
            │   ├── Typography.needheding  (headline)
            │   └── Typography.desc        (description, max 105vh)
            └── Box
                └── Button.containedBtn  ("Get in touch")
```

### Dimensions & spacing

| Element | Property | Value |
|---|---|---|
| Outer Box | borderRadius | 1vh |
| Outer Box | bg | `#E7F6FF` |
| Outer Box | height | 18vh |
| Outer Box | margin | `0 0 5vh 0` |
| Outer Box | backdrop-filter | blur(5px) |
| needBox | display/justify/align | flex / center / center, gap 2rem |
| Icon Image | w / h | 13vh / 13vh |
| Heading Box | padding | `2vh 0 0 0` |
| Button | padding | `2vh 4vh` |
| Button | marginY | 2vh |
| Button | width | 100% (all breakpoints) |

### Typography

| Element | fontSize | weight | width lg |
|---|---|---|---|
| needheding | 3.6vh | 500 | — |
| desc | 2.4vh | inherit | 105vh |
| Button label | 2vh | 700 | — |

### Colors

| Element | Color / shadow |
|---|---|
| Outer | bg `#E7F6FF`, shadow `0px 2px 1px 0px rgba(0,0,0,0.05), 0px -3px 8px 0px rgba(56,182,255,0.20)` |
| Button | bg `#38B6FF`, white text, shadow `1px 4px 24px 0px #38B6FFB2`, radius 10px |

### Animations / interactions

- Button hover preserves bg + shadow + width.

## §2 Tailwind port — bug list

No Tailwind port exists.

## §3 Corrected Tailwind classNames

```tsx
<div
  className="mb-[5vh] h-[18vh] rounded-[1vh] bg-[#E7F6FF] backdrop-blur-[5px]
             shadow-[0px_2px_1px_0px_rgba(0,0,0,0.05),0px_-3px_8px_0px_rgba(56,182,255,0.20)]"
>
  <div className="grid grid-cols-1">
    <div className="flex items-center justify-center gap-8">
      <Image src={need} alt="icon" style={{ width: "13vh", height: "13vh" }} />
      <div className="pt-[2vh]">
        <p className="font-medium text-[3.6vh]">
          Need Expert Guidance? Book Your Free Academic Consultation!
        </p>
        <p className="text-[2.4vh] lg:max-w-[105vh]">
          Connect with our education specialists today and discover how we can help you achieve your academic goals. Spaces are filling up fast!
        </p>
      </div>
      <div>
        <button
          type="button"
          className="my-[2vh] w-full rounded-[10px] bg-brand-500 px-[4vh] py-[2vh]
                     text-[2vh] font-bold normal-case text-white
                     shadow-[1px_4px_24px_0px_#38B6FFB2]
                     hover:bg-brand-500"
        >
          Get in touch
        </button>
      </div>
    </div>
  </div>
</div>
```

Note: the source uses `style={{}}` (inline `style` prop) on the outer Box instead of `sx`. **Plain `style` does NOT get RTL-flipped by `stylis-plugin-rtl`** — port to Tailwind classNames so the AR variant inherits flip behavior automatically.

`gap: "2rem"` (32px) → `gap-8`.

## §2.1 Behavior note

Height 18vh + horizontal flex with 13vh icon means the icon + text + button must fit horizontally. On narrow viewports (xs/sm) this layout will compress severely or overflow — MUI source has no responsive override for flexDirection, so the row stays. Likely needs `flex-col sm:flex-row` adjustment when porting.

## §4 Verification at 4 widths
- 375: severe overflow expected (icon 13vh ≈ 100px + 105vh-wide desc + button). Layout falls apart without mobile breakpoint additions.
- 768: cramped but visible.
- 1280: works as designed.
- 1920: same.

## §5 RTL notes
- `margin: "0 0 5vh 0"` symmetric — safe.
- `padding: "2vh 0 0 0"` symmetric — safe.
- Icon-left / text-center / button-right ordering — in RTL the icon should move to the visual right. Use a `dir="rtl"` parent + `flex-row` (no need for `flex-row-reverse` since the actual order in source already matches LTR reading; the parent's `dir` flips it).
- Headline + desc are English — needs AR translation when porting.
