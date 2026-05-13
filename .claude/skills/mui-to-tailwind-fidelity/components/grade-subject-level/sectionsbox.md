# Component — `SectionsBox` (v1)

Flat horizontal CTA bar that appears beneath the hero: "Join Live Interactive Online Classes with Our Certified Tutors!" + a Book-a-Demo PopUpButton on the right. v1 uses `PopUpButton`; v2 uses `PopUpButtonV2`.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\sectionsbox.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\sectionsbox.tsx` |
| Arabic variant | `ar-sectionsbox.tsx` |

## §1 MUI source — extracted properties

### Layout tree

```
Box boxsection
  borderRadius: 1.5vh
  background: #E7F6FF
  boxShadow: "0px 2px 1px 0px rgba(0,0,0,0.05), 0px -3px 8px 0px rgba(56,182,255,0.20)"
  backdropFilter: blur(5px)
  height: { xs: 8vh, lg: 12vh }
  display: flex; alignItems: center; flexDirection: row; justifyContent: center
  paddingX: { xs: 3vw, sm: 3vw, lg: 0 }
  gap: 2vh
  marginY: { xs: 16px, lg: 0 }
  - Typography variant=subtitle2 sx.inner (textAlign:start, paddingX lg:0)
  - PopUpButton sx={containedBtn}
      boxShadow: 1px 4px 24px 0px #38B6FFB2
      backgroundColor: #38B6FF
      color: white
      paddingY: { xs: 1vh, lg: 10px }
      textTransform: none
      borderRadius: 10px
      width: { xs: 50%, sm: 20%, md: 20%, lg: 20% }
      :hover { backgroundColor: #38B6FF; transform: scale(1.05); boxShadow: same }
```

### Dimensions & spacing

| Element | Property | xs | sm | md | lg |
|---|---|---|---|---|---|
| boxsection | height | 8vh | — | — | 12vh |
| boxsection | paddingX | 3vw | 3vw | — | 0 |
| boxsection | gap | 2vh | | | |
| boxsection | marginY | 16px | — | — | 0 |
| boxsection | borderRadius | 1.5vh | | | |
| button | paddingY | 1vh | — | — | 10px |
| button | width | 50% | 20% | 20% | 20% |

### Typography

| Element | Variant | Sizes | Weight | Font |
|---|---|---|---|---|
| Inner text | `subtitle2` | 14px all | default | League Spartan |

### Colors

| MUI | Tailwind |
|---|---|
| `#E7F6FF` (boxsection bg) | arbitrary `bg-[#E7F6FF]` |
| `#38B6FF` (button) | `bg-brand-500` |
| white (button text) | `text-white` |

Shadows: `0px 2px 1px 0px rgba(0,0,0,0.05), 0px -3px 8px 0px rgba(56,182,255,0.20)` → arbitrary `shadow-[0px_2px_1px_0px_rgba(0,0,0,0.05),0px_-3px_8px_0px_rgba(56,182,255,0.20)]`.

Button shadow `1px 4px 24px 0px #38B6FFB2` → arbitrary `shadow-[1px_4px_24px_0px_#38B6FFB2]`.

### Animations / interactions
Button hover: scale(1.05), shadow persists. (Port doesn't include this scale — see B3.)

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 5 | `my-4 flex h-[8vh] flex-row items-center justify-center gap-[2vh] rounded-[1.5vh] bg-[#E7F6FF] px-[3vw] backdrop-blur-sm shadow-[...] sm:px-[3vw] lg:my-0 lg:h-[12vh] lg:px-0` | matches all dims | OK |
| B2 | 6 | inner text: `text-h6 font-bold` | MUI is `variant="subtitle2"` → `text-stat-label uppercase` (14px, uppercase). Port substitutes h6 (16px) with `font-bold` and **no uppercase**. | **Med** — wrong typography token; missing uppercase |
| B2b | 6 | `lg:text-[3vh]` arbitrary override on lg | MUI commented out the explicit fontSize override — so MUI uses 14px at all breakpoints. Port lg:[3vh] is a custom enlargement not in MUI. | Med |
| B3 | 12 | button missing `hover:scale-105` and `transition-all` | MUI has `transition: all .5s ease-in-out`, hover scale 1.05 | Med (hover interaction missing) |
| B4 | 12 | `w-1/2 … sm:w-1/5` button width | matches `xs: 50%, sm: 20%` (1/5 ≈ 20%) | OK |
| B5 | 12 | `py-[1vh] … lg:py-[10px]` | matches | OK |
| B6 | 12 | `rounded-[10px]` | matches | OK |
| B7 | 12 | `backdrop-blur-sm` | matches `backdropFilter: blur(5px)` | OK |

## §3 Corrected Tailwind classNames

```tsx
const SectionsBox = () => (
  <div className="my-4 flex h-[8vh] flex-row items-center justify-center gap-[2vh] rounded-[1.5vh] bg-[#E7F6FF] px-[3vw] backdrop-blur-sm shadow-[0px_2px_1px_0px_rgba(0,0,0,0.05),0px_-3px_8px_0px_rgba(56,182,255,0.20)] sm:px-[3vw] lg:my-0 lg:h-[12vh] lg:px-0">
    <span className="text-start font-heading text-stat-label uppercase text-ink-900">
      Join Live Interactive Online Classes with Our Certified Tutors!
    </span>
    <PopUpButton
      text="Book a Demo"
      href="popup"
      className="w-1/2 rounded-[10px] bg-brand-500 py-[1vh] text-white shadow-[1px_4px_24px_0px_#38B6FFB2] transition-all duration-500 ease-in-out hover:scale-105 hover:bg-brand-500 sm:w-1/5 lg:py-[10px]"
    />
  </div>
);
```

## §4 Verification at 4 widths

- **375**: 8vh height, px-[3vw], my-4. Button 50% width, py-[1vh]. Text small uppercase.
- **768**: same height. Button now 20% width.
- **1280**: 12vh, px-0, my-0. Button 20% width, py-[10px].
- **1920**: same as lg.

## §5 RTL notes

`ar-sectionsbox.tsx` mirrors. Use `flex-row` (works in RTL — visual reverse happens automatically with `direction: rtl`). `text-start` correctly flips.
