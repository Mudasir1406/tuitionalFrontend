# Component — `<Hero>` (nested / blog detail)

The hero at the top of `/blog/[slug]`. Title + category chip + (optional) social-share row, on a `#d6f0ff → rgba(255,255,255,0.9)` gradient background with two decorative blob images positioned absolutely behind the content.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\blog\hero-nested\Hero.tsx` + `Hero.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\blog\hero-nested\Hero.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\blog\ar-hero-nested\Ar-Hero.tsx` (RTL — no significant layout diff beyond `direction: rtl`) |

---

## §1 MUI source — extracted properties

### Layout tree

```
.heroContainer (relative, h-70vh, gradient bg, overflow-hidden)
├── .leftIcons (absolute, 250×250, top:10%, left:0, bg-image: blogBg1.png)
├── .rightIcons (absolute, 250×250, bottom:0, right:0, bg-image: blogBg2.png)
└── .main (relative, z-2, w-75vw, flex-col centered, margin-top: 13%)
    ├── h1.expertText (variant="h1", brand blue, headerTag override) — the post title
    ├── .categoryDiv (green #08b463 pill, max-w 290px, mt-2vh, mx-auto, py-1, px-1)
    │   └── <Typography variant="body2"> "{category.en} | {MMMM DD, YYYY}"
    └── .centerDiv (optional, when showSocial) (flex centered, gap-16, mt-5vh)
        └── .socialDiv (flex-row, gap-8)
            └── 4× .socialIcon (47×47, cover)
```

### Dimensions & spacing

| Element | Property | Mobile | Tablet | Desktop |
|---|---|---|---|---|
| `.heroContainer` | height | `70vh` | `70vh` | `70vh` |
| `.heroContainer` | background | `linear-gradient(to bottom, #d6f0ff, rgba(255,255,255,0.9))` | same | same |
| `.leftIcons` | size | `250 × 250px` | same | same |
| `.leftIcons` | top / left | `10% / 0` | same | same |
| `.rightIcons` | bottom / right | `0 / 0` | same | same |
| `.main` | width | `75vw` | `75vw` | `75vw` |
| `.main` | margin-top | `13%` | `13%` | `13%` |
| `.categoryDiv` | bg / color | `#08b463 / white` | same | same |
| `.categoryDiv` | padding / radius / max-w | `8px / 8px / 290px` | same | same |
| `.categoryDiv` | margin-top | `2vh` | `2vh` | `2vh` |
| `.centerDiv` | margin-top | `5vh` | `5vh` | `5vh` |
| `.centerDiv` | column-gap | `16px` | `16px` | `16px` |
| `.socialDiv` | column-gap | `8px` | `8px` | `8px` |
| `.socialIcon` | size | `47 × 47px` | same | same |

### Typography

| Element | Variant | Mobile | Tablet | Desktop | Weight | Color | Font |
|---|---|---|---|---|---|---|---|
| Title h1 | `h1` (or headerTag override) | 28px | 36px | 48px | 700 | `#38b6ff` brand-500 | League Spartan |
| Category chip | `body2` | 14px | 14px | 14px | 400 | white | League Spartan |

### Colors

| Hex | Token |
|---|---|
| `#d6f0ff` (gradient top) | close to `bg-brand-50` (`#D7F0FF`) — use arbitrary `bg-[#d6f0ff]` for exact match |
| `rgba(255,255,255,0.9)` (gradient bottom) | `to-white/90` |
| `#08b463` (category chip) | not in palette — `bg-[#08b463]` |
| `#38b6ff` (title) | `text-brand-500` |

### Animations / interactions

- None. Decorative blobs are static. Social icons have `cursor: pointer` only.

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| HN1 | 45 | `bg-brand-50 px-4 pt-32 pb-12 lg:pt-40` | The MUI source has `linear-gradient(to bottom, #d6f0ff, rgba(255,255,255,0.9))` AND `height: 70vh`. Current uses solid `bg-brand-50` and `pt-32 pb-12` (128/48px) — totally different. Use `relative h-[70vh] overflow-hidden bg-gradient-to-b from-[#d6f0ff] to-white/90 flex items-center justify-center` | high |
| HN2 | (missing) | (no left/right blob decorations) | Add 2 absolute divs with `bg-[url(/assets/images/static/blogBg1.png)] bg-no-repeat bg-cover bg-center w-[250px] h-[250px] z-[1]` — one `top-[10%] left-0`, other `bottom-0 right-0` with `blogBg2.png` | high |
| HN3 | 46 | `mx-auto flex max-w-3xl flex-col items-center gap-4` | MUI `.main` is `w-[75vw]` (not max-w-3xl which is 768px) and `mt-[13%]` (% — applies to parent height) and `relative z-[2]`. Replace with `relative z-[2] flex w-[75vw] flex-col items-center mt-[13%]` | high |
| HN4 | 47 | `text-center font-heading text-h1-mobile sm:text-h1-tablet lg:text-h1 text-black` | Title color should be `text-brand-500` (`#38b6ff`) per `.expertText` rule, NOT black | high |
| HN5 | 50 | `font-heading text-body-mobile text-ink-700` for "Author | Date" | This isn't quite the MUI structure. MUI uses a green pill `.categoryDiv` showing `${category.en} | ${MMMM DD, YYYY}`. The port renders authorName instead of category. Update to render category from `data.category.data[0].name.en` and timestamp. Wrap in `bg-[#08b463] text-white rounded-[8px] px-2 py-2 max-w-[290px] mx-auto mt-[2vh] font-heading text-small` | high |
| HN6 | 53 | `<div className="flex gap-3">` social icons | MUI puts the social row inside `.centerDiv` with `mt-[5vh]` and `column-gap: 16px`, and the icons inside `.socialDiv` with `column-gap: 8px`. Use `mt-[5vh] flex items-center justify-center gap-4` for the outer, then `flex gap-2` for the icon row. | med |
| HN7 | 56-66 | `h-8 w-8` (32×32) icons | MUI `.socialIcon` is `47 × 47px`. Use `h-[47px] w-[47px]` | med |

---

## §3 Corrected Tailwind classNames

```tsx
<div className="relative h-[70vh] overflow-hidden bg-gradient-to-b from-[#d6f0ff] to-white/90 flex items-center justify-center">
  {/* decorative blobs */}
  <div
    aria-hidden
    className="absolute left-0 top-[10%] z-[1] h-[250px] w-[250px] bg-[url('/assets/images/static/blogBg1.png')] bg-cover bg-center bg-no-repeat"
  />
  <div
    aria-hidden
    className="absolute bottom-0 right-0 z-[1] h-[250px] w-[250px] bg-[url('/assets/images/static/blogBg2.png')] bg-cover bg-center bg-no-repeat"
  />

  <div className="relative z-[2] mt-[13%] flex w-[75vw] flex-col items-center">
    <HeaderTag className="text-center font-heading text-h1-mobile sm:text-h1-tablet lg:text-h1 text-brand-500">
      {data?.header}
    </HeaderTag>

    {/* category + date chip */}
    <div className="mx-auto mt-[2vh] flex max-w-[290px] flex-col rounded-[8px] bg-[#08b463] p-2 text-white">
      <p className="font-heading text-small">
        {`${data?.category?.data?.[0]?.name?.en} | ${moment(timestamp * 1000).format("MMMM DD,YYYY")}`}
      </p>
    </div>

    {showSocial && (
      <div className="mt-[5vh] flex items-center justify-center gap-4">
        <div className="flex gap-2">
          <a href={shareUrls.facebook} target="_blank" rel="noopener noreferrer">
            <Image className="h-[47px] w-[47px] cursor-pointer object-cover" src={facebook} alt="facebook" />
          </a>
          <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer">
            <Image className="h-[47px] w-[47px] cursor-pointer object-cover" src={twitter} alt="twitter" />
          </a>
          <a href={shareUrls.whatsapp} target="_blank" rel="noopener noreferrer">
            <Image className="h-[47px] w-[47px] cursor-pointer object-cover" src={whatsapp} alt="whatsapp" />
          </a>
          <a href={shareUrls.linkedin} target="_blank" rel="noopener noreferrer">
            <Image className="h-[47px] w-[47px] cursor-pointer object-cover" src={linkedin} alt="linkedin" />
          </a>
        </div>
      </div>
    )}
  </div>
</div>
```

## §4 Verification at 4 widths

- **375**: 70vh hero (~467px on 667px viewport), gradient visible top→bottom, blobs visible at corners, title 28px centered in `75vw`.
- **768**: same structure, title 36px.
- **1280**: title 48px brand-blue, social icons 47px.
- **1920**: same; blobs stay at 250×250 (no scaling) — corner accents.

## §5 RTL notes

`Ar-Hero.module.css` only adds `direction: rtl` and mirror text alignment. No layout-axis flips needed (everything centers). For Tailwind: gate any future left/right blob positioning with `rtl:left-auto rtl:right-0` style swaps if mirror is required.
