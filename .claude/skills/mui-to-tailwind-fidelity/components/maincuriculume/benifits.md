# Component — `Benifit` (maincuriculume)

"Benefits" headline + description, then 3 benefit cards (image + title + description). **Not ported** in Tailwind. (Spelling preserved: source file is `benifits.tsx`.)

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\maincuriculume\benifits.tsx` |
| Tailwind port | (not ported — `/maincuriculume` route is absent) |

## §1 MUI source — extracted properties

### Layout tree

```
Box  (margin lg: "5vh 7vh")
├── Box  (margin lg: 3vh)
│   └── Grid container spacing={2}
│       ├── Grid item xs=12 sm=6 md=6 lg=6
│       │   └── Typography.benifit  ("Benefits")
│       └── Grid item xs=12 sm=6 md=6 lg=6
│           └── Typography.beniftdesc  (description)
└── Grid container  (no spacing)
    └── Grid item xs=12 sm=4 md=4 lg=4   × 3
        └── Box.card
            ├── Image  (height 40vh, width 97%)
            ├── Typography.titletxt
            └── Typography.desc
```

### Dimensions & spacing

| Element | Property | xs/sm/md | lg |
|---|---|---|---|
| outer Box | margin | 0 | `5vh 7vh` |
| inner Box (header) | margin | 0 | 3vh |
| Header Grid items | columns | `sm={6}` (2-col @ sm) | 6 |
| Card Grid items | columns | `sm={4}` (3-col @ sm) | 4 |
| Card Grid container | spacing | 0 (no `spacing` prop) | 0 |
| card | borderRadius | 2vh | 2vh |
| card | bg | `#FFF` | `#FFF` |
| card image | height | 40vh | 40vh |
| card image | width | 97% | 97% |
| titletxt | padding | 0 | `2vh 0` |
| desc | padding | `0 3vh 3vh` | `0 3vh 3vh` |

### Typography

| Element | lg fontSize | weight | textAlign | width |
|---|---|---|---|---|
| benifit | 6vh | 600 | inherit (start) | — |
| beniftdesc | 2vh | 400 | inherit | 100vh |
| titletxt | 4vh | 600 | center | — |
| desc | 2vh | inherit | center @ lg | 55vh |

### Colors

- Card bg: `#FFF`
- Card shadow: `0px 2px 1px 0px rgba(0, 0, 0, 0.05), 0px -3px 8px 0px rgba(0, 0, 0, 0.20)` + `backdrop-filter: blur(5px)`

### Animations / interactions

None.

## §2 Tailwind port — bug list

No Tailwind port exists.

## §3 Corrected Tailwind classNames

```tsx
<div className="lg:my-[5vh] lg:mx-[7vh]">

  {/* Header row */}
  <div className="lg:m-[3vh]">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <p className="font-semibold lg:text-[6vh]">Benefits</p>
      <p className="font-normal lg:text-[2vh] lg:max-w-[100vh]">
        By joining our community, you gain access to a wealth of resources...
      </p>
    </div>
  </div>

  {/* Cards row */}
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
    {Benifit.map((b, i) => (
      <div key={i}
           className="rounded-[2vh] bg-white backdrop-blur-[5px]
                       shadow-[0px_2px_1px_0px_rgba(0,0,0,0.05),0px_-3px_8px_0px_rgba(0,0,0,0.20)]">
        <Image src={b.benifit} alt="" style={{ height: "40vh", width: "97%" }} />
        <p className="text-center font-semibold lg:text-[4vh] lg:py-[2vh]">{b.title}</p>
        <p className="px-[3vh] pb-[3vh] text-[2vh] lg:text-center lg:max-w-[55vh] lg:mx-auto">
          {b.description}
        </p>
      </div>
    ))}
  </div>
</div>
```

Breakpoint trap: MUI source uses `sm={6}` for header (2 cols at sm+) and `sm={4}` for cards (3 cols at sm+). Use `sm:grid-cols-2` / `sm:grid-cols-3` — **not** `lg:`.

Note: trailing `;` in the MUI shadow string (`...rgba(0, 0, 0, 0.20);`) is invalid CSS in an `sx` value but MUI tolerates it. Strip the semicolon when porting.

## §4 Verification at 4 widths
- 375: single column for both header and cards.
- 768: header splits 50/50, cards 3 across at sm. Image at 40vh × 97% width may overflow card on narrow tablet — verify.
- 1280: full 3-col card grid, image 40vh.
- 1920: same with lg margins (5vh / 7vh).

## §5 RTL notes
- `padding: "0 3vh 3vh"` on `desc` is shorthand `top right bottom left` → safe (x is symmetric).
- `textAlign: { lg: "center" }` — direction-neutral.
- Header headline + description swap order in RTL automatically since `flex` order with `grid-cols-2` follows source order; if intentional reversal is needed for AR, swap JSX or set `direction-rtl` on parent.
