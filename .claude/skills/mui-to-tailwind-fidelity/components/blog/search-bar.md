# Component — `<SearchBar>`

Centered search pill with input + brand-blue Search button. Used on `/blog?search=...`, `/blog/category/[slug]`, `/blog/tag/[slug]`. Shows a "Search: {query}" heading underneath when `type === "all"`.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\blog\search-bar\SearchBar.tsx` + `SearchBar.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\blog\search-bar\SearchBar.tsx` |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\blog\ar-search-bar\Ar-SearchBar.tsx` (RTL: button moves to left side, text-align flips) |

---

## §1 MUI source — extracted properties

### Layout tree

```
.SearchBar (flex col, items-center, w-60vw, mx-auto)
├── .mobileContanier (pill: w-95%, h-8.5vh, mt-8vh initial, white bg, inset shadows, radius 2vh)
│   ├── TextField (w-60%, no border)
│   └── Button "Search" (w-40%, h-8.5vh, brand blue, right-rounded 14px)
└── .searchResult (mt-3vh, conditional: type === "all" && searchQuery)
    └── <Typography variant="h4"> "Search: {searchQuery}"
```

### Dimensions & spacing

| Element | Property | <576px | 576-767px | ≥768px |
|---|---|---|---|---|
| `.SearchBar` | width | `100%` | `100%` | `60vw` |
| `.mobileContanier` | width | `95%` | `95%` | `95%` |
| `.mobileContanier` | margin-top | `8vh` (initial) | `8vh` | `8vh` |
| `.mobileContanier` | max-width | `100%` | (default — none) | (none) |
| `.mobileContanier` | height | `5.5vh` | `8.5vh` (default) | `8.5vh` |
| `.mobileContanier` | radius | `2vh` | `2vh` | `2vh` |
| `.mobileContanier` | bg | white | white | white |
| `.mobileContanier` | shadow | `0px -5px 5px 0px rgba(0,0,0,0.2) inset, 0px 4px 5px 0px rgba(0,0,0,0.25) inset` | same | same |
| `.textField` | width | `60%` | `60%` | `60%` |
| `.button` | width | `40%` | `40%` | `40%` |
| `.button` | height | `5.5vh` | `8.5vh` | `8.5vh` |
| `.button` | bg | `#38b6ff` | same | same |
| `.button` | right-radius | `14px / 14px` | same | same |
| `.button` | inset shadow | `0px -5px 15px 0px rgba(0,0,0,0.2) inset` | same | same |
| `.searchResult` | margin-top | `3vh` | `3vh` | `3vh` |

### Typography

| Element | Variant | Mobile | Tablet | Desktop | Weight | Font |
|---|---|---|---|---|---|---|
| Input | (no variant) | 16px (form-input) | 16px | 16px | 400 | League Spartan |
| Button | (default) | 15px | 16px | 16px | 600 | League Spartan |
| "Search: {query}" | `h4` | 16px | 18px | 20px | 600 | League Spartan |

### Animations / interactions

- Button `transition: all 0.5s ease-in-out`, hover `scale(1.02)` + `1px 4px 14px 0px #38b6ff89` shadow

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| SB1 | 29 | `<div>` outer (no `.SearchBar` styles) | MUI `.SearchBar` is `w-60vw mx-auto` at ≥768, `w-full` below. Wrap with `<div className="mx-auto w-full md:w-[60vw] flex flex-col items-center">` | high |
| SB2 | 30 | `flex items-center justify-center w-full h-[5.5vh] lg:h-[8.5vh]` | MUI `.mobileContanier` is `width: 95%` not `100%`, plus `margin-top: 8vh` initial. Use `w-[95%] mt-[8vh] h-[5.5vh] sm:h-[8.5vh]` (NOTE: 8.5vh kicks in at MUI ≥576, not ≥lg; current uses `lg:h-[8.5vh]` which is 1200+, way too late) | high |
| SB3 | 31 | `rounded-[2vh] shadow-[...inset,...inset]` | OK matches | none |
| SB4 | 34 | input `w-[60%] h-full` | OK matches | none |
| SB5 | 42 | input `text-form-input text-ink-900` | OK (16px = iOS-zoom safe) | none |
| SB6 | 44 | Button `w-[40%] h-full rounded-l-none rounded-r-[14px]` | OK | none |
| SB7 | 47 | Button shadow `0px_-5px_15px_0px_rgba(0,0,0,0.2)_inset` + hover scale + glow shadow | OK matches | none |
| SB8 | 52 | `{type === "all" && searchQuery && <div className="mt-4">` | MUI uses `mt-3vh` (~3% of viewport height — larger than `mt-4` = 16px on most viewports). Use `mt-[3vh]` | low |
| SB9 | 54-56 | `<h4 className="font-heading text-h4">` with `<span>` inside | Use heading triplet: `text-h4-mobile sm:text-h4-tablet lg:text-h4` to scale per breakpoint. Currently `text-h4` jumps directly to 20px on mobile. | med |

---

## §3 Corrected Tailwind classNames

```tsx
<div className="mx-auto flex w-full flex-col items-center md:w-[60vw]">
  <div
    className="mt-[8vh] flex h-[5.5vh] w-[95%] items-center justify-center rounded-[2vh] bg-white sm:h-[8.5vh]
      shadow-[0px_-5px_5px_0px_rgba(0,0,0,0.2)_inset,0px_4px_5px_0px_rgba(0,0,0,0.25)_inset]"
  >
    <input
      type="text"
      placeholder={placeholder}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
      className="h-full w-[60%] border-0 bg-transparent px-4 font-heading text-form-input text-ink-900 outline-none placeholder:text-ink-400"
    />
    <Button
      onClick={handleSearch}
      variant="primary"
      className="h-full w-[40%] rounded-l-none rounded-r-[14px] shadow-[0px_-5px_15px_0px_rgba(0,0,0,0.2)_inset] transition-all duration-500 hover:scale-[1.02] hover:shadow-[1px_4px_14px_0px_rgba(56,182,255,0.54)]"
    >
      {searchLabel}
    </Button>
  </div>
  {type === "all" && searchQuery && (
    <div className="mt-[3vh]">
      <h4 className="font-heading text-h4-mobile sm:text-h4-tablet lg:text-h4">
        <span className="font-heading text-h4-mobile sm:text-h4-tablet lg:text-h4">
          {isArabicRoute ? "بحث:" : "Search:"}
        </span>{" "}
        {searchQuery}
      </h4>
    </div>
  )}
</div>
```

## §4 Verification at 4 widths

- **375**: search bar full-width (parent `w-full`), pill 95% of that, height 5.5vh.
- **768**: bar 60vw centered, pill 95% of bar, height 8.5vh.
- **1280**: same as 768 with more whitespace.
- **1920**: same.

## §5 RTL notes

`Ar-SearchBar.module.css` swaps:
- `.mobileContanier` → `flex-direction: row-reverse` (button on left)
- `.button` → `border-top-right-radius/bottom-right-radius: 0`, `border-top-left-radius/bottom-left-radius: 14px`

When isArabic, swap button classes to `rounded-r-none rounded-l-[14px]` and outer container `flex-row-reverse`. Use Tailwind logical `rounded-s-none rounded-e-[14px]` if available — these auto-mirror.
