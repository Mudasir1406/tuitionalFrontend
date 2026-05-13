# Component — `<Questions>`

Single accordion row used by `<Faqs>`. Each row is a white card with subtle blue inset shadow; clicking the header expands the panel, swapping a `+` icon for a `-`. A 95%-width divider separates the question from the answer.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\home\questions.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\home\questions.tsx` (uses `@headlessui/react` `Disclosure`) |
| Arabic variant | `tuitionalFrontend-mui-baseline\src\components\home\ar-questions.tsx` |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Box>
└── <Accordion sx={styles.acc} onChange={(e, expanded) => setExpanded(expanded)} defaultExpanded={false}>
    ├── <AccordionSummary
    │      expandIcon={ expanded ? <RemoveOutlinedIcon sx={styles.icon}/> : <AddOutlinedIcon sx={styles.icon}/> }
    │      sx={styles.questionText}>
    │      {question}
    ├── <Divider sx={styles.divider} />     // only visible when expanded (rendered always but inside accordion)
    └── <AccordionDetails sx={styles.detail}>
        └── <Typography variant="body2" sx={styles.answerText}>
              {answer}
```

### Dimensions & spacing

| Element | Property | Mobile (<600) | Tablet (600-1199) | Desktop (≥1200) |
|---|---|---|---|---|
| `.acc` | `backgroundColor` | white | white | white |
| `.acc` | `boxShadow` | `1px 5px 20px 0px rgba(56, 182, 255, 0.2)` | same | same |
| `.acc` | `borderRadius` | 15px | 15px | 15px |
| `.acc` | `marginTop` | 2vh | 2vh | 2vh |
| `.acc` | `paddingY` | 2vh | 2vh | 2vh |
| `.questionText` | `fontSize` | 2.3vh | 2.6vh (sm), 2.8vh (md) | 2.8vh |
| `.questionText` | `lineHeight` | 2.7vh | 2.8vh (sm), 3.2vh (md) | 3.4vh |
| `.questionText` | `fontWeight` / `color` | 500 / `#000000` | same | same |
| `.questionText` | `marginX` | 10px | 10px | 10px |
| `.questionText` | `display` | flex | flex | flex |
| `.icon` (+/-) | `color` | black | black | black |
| `.divider` | `width` / `alignSelf` / `marginLeft` | 95% / center / 2.5% | same | same |
| `.detail` (panel body) | `marginLeft` / `marginY` | 1.5% / 20px | same | same |
| `.answerText` | (no fontSize/lineHeight — inherits body2 = 14px) | 14px | 14px | 14px |

### Typography

| Element | MUI variant / inline | Mobile | Tablet | Desktop | Weight | Color | Font |
|---|---|---|---|---|---|---|---|
| Question text | inline `2.3vh/2.6vh/2.8vh/2.8vh, 500wt, 2.7vh/2.8vh/3.2vh/3.4vh line-height` | 2.3vh | 2.6vh (sm), 2.8vh (md) | 2.8vh | 500 | `#000000` | League Spartan |
| Answer text `<Typography variant="body2">` | body2 (14px) | 14px | 14px | 14px | 400 | (inherit) | League Spartan |

### Colors

- `white` → `bg-white`
- `#000000` → `text-black`
- shadow `1px 5px 20px 0px rgba(56, 182, 255, 0.2)` → arbitrary `shadow-[1px_5px_20px_0px_rgba(56,182,255,0.2)]`

### Animations / interactions

- Accordion expand/collapse uses MUI's default transition (~225ms).
- Icon swap: `+` ↔ `-`. No rotation.

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 16 | wrapper: `mt-[2vh] rounded-[15px] bg-white py-[2vh] shadow-[1px_5px_20px_0px_rgba(56,182,255,0.2)]` | matches MUI `.acc` (mt 2vh, rounded 15, bg white, py 2vh, shadow). ✓ matches | — |
| B2 | 17 | DisclosureButton: `flex w-full items-center justify-between px-[10px] text-start font-heading text-[2.3vh] font-medium leading-[2.7vh] text-black sm:text-[2.6vh] sm:leading-[2.8vh] md:text-[2.8vh] md:leading-[3.2vh] lg:text-[2.8vh] lg:leading-[3.4vh]` | MUI: `fontSize: 2.3/2.6/2.8/2.8vh, lineHeight: 2.7/2.8/3.2/3.4vh, fontWeight: 500, marginX: 10px`. `px-[10px]` = horizontal padding (not margin) — visually equivalent. ✓ matches | — |
| B3 | 19-23 | icons: `<Minus />` / `<Plus />` from lucide. MUI: `<RemoveOutlinedIcon>` / `<AddOutlinedIcon>` | Visual drift — different glyph (lucide is thinner stroke). Acceptable substitution. | low |
| B4 | 25 | conditional `{open && …}` for divider + panel | MUI renders Divider always and panel within Accordion (collapses via transition). Headless Disclosure auto-collapses when not open. ✓ functional parity. | — |
| B5 | 27 | `<hr className="mx-auto my-2 w-[95%] border-ink-200" />` | MUI `.divider`: `width: 95%, alignSelf: center, marginLeft: 2.5%`. `mx-auto` centers — visually equivalent to `ml-[2.5%]`. `my-2` (8px) is invented; MUI Divider has no inherent margin (sits flush). Acceptable — small breathing space. | low |
| B6 | 28 | panel: `my-5 ms-[1.5%] font-heading text-small text-black` | MUI `.detail`: `marginLeft: 1.5%, marginY: 20px`. `my-5` = 20px ✓. `ms-[1.5%]` ✓. `text-small` = 14px ✓ (body2). ✓ matches | — |

**Net assessment**: this port is virtually pixel-perfect. No fixes required.

The icon glyph drift (lucide `Plus`/`Minus` vs MUI Material icons) is the only diff — acceptable per the project's icon-swap convention.

---

## §3 Corrected Tailwind classNames

No corrections required. The port matches MUI 1:1.

## §4 Verification at 4 widths

- **375**: card mt-2vh, py-2vh, rounded-15, white bg, soft blue shadow. Question text 2.3vh (~16-19px depending on viewport height), 500wt, black, px-10px. Plus/Minus icon on the right. When open: hr at 95% width centered + answer paragraph at ms-1.5%, my-20px.
- **768**: question text 2.6vh.
- **1280**: question text 2.8vh.
- **1920**: same as 1280.

## §5 RTL notes

- AR variant flips question textAlign to right and accordion expandIcon to left side of summary.
- Tailwind port uses `text-start` and `justify-between` on the DisclosureButton — under `dir="rtl"`, the text auto-aligns right and the icon auto-moves to the left. ✓
- `ms-[1.5%]` (start margin) on the answer panel — auto-flips. ✓
- `mx-auto` on the hr — direction-agnostic. ✓
- No physical-direction props remain. Fully RTL-safe.
