# Component — `<Embrace>`

Two-column layout used inside long-form blog content. Left column: a stack of collapsible bullet-list cards (IGCSE CAIE Tutoring topic groups). Right column: a sequence of headed paragraphs ("Embrace the Flexibility…", "Create a Conducive Learning Environment", "Utilize Resources and Tools for Learning"). Hard-coded sample content — likely a placeholder for an authored CMS block.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\blog\embrace.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\blog\embrace.tsx` |
| Arabic variant | (none — same component used on both locales; content not translated) |

---

## §1 MUI source — extracted properties

### Layout tree

```
<>
  <Box sx={{ margin: { lg: "15vh 0" } }}>             // root: lg ≥1200 → my-15vh
    <Grid container spacing={2}>                       // gap-4 (16px) both axes
      <Grid item xs={12} sm={12} md={12} lg={3}>       // sidebar: full ≤1199, 25% ≥1200
        <Box sx={{                                     // sidebar card
          display:flex flexDirection:column,
          background: '#EDF9FFCC',
          borderRadius: '0 2vh 2vh 0',                 // rounded-e-[2vh]
          boxShadow: '0px -3px 10px 0px rgba(0,0,0,0.15) inset',
          padding: { xs:'2vh 0', sm:'4vh 0' },         // py-[2vh] sm:py-[4vh]
          width: 100%                                  // explicit at all bps
        }}>
          {['list9','list6','list4','list5','list2'].map(listKey => (
            <>
              <Box sx={{                               // collapsible row header
                display:flex, flexDirection:row,
                alignItems:center, justifyContent:center,
                gap:'.5rem', width:'100%'
              }}>
                <Typography sx={{
                  fontSize:{ xs:'2vh', sm:'2.4vh' },    // text-[2vh] sm:text-[2.4vh]
                  fontWeight:600, textAlign:'center'
                }}>
                  IGCSE CAIE Tutoring
                </Typography>
                <IconButton onClick={toggleList}>
                  {open ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                </IconButton>
              </Box>
              {open && (
                <List sx={{
                  width:'100%', textAlign:'center',
                  listStyleType:'disc', paddingLeft:0,
                  display:flex, flexDirection:column,
                  justifyContent:center, alignItems:center
                }}>
                  {getListItems(listKey).map((item,i) => (
                    <ListItem sx={{
                      listStyleType:'disc', display:'list-item',
                      fontSize:'2vh', color:'#2D2D2D', fontWeight:400,
                      width:'auto', textAlign:'center',
                      paddingLeft:'1rem'
                    }}>{item}</ListItem>
                  ))}
                </List>
              )}
            </>
          ))}
        </Box>
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={9}>       // article: full ≤1199, 75% ≥1200
        <Grid container spacing={2}>                    // nested grid, gap-4
          {RightBoxText.map((item, i) => (
            <Grid item xs={12} key={i}>                 // one section per row
              <Box>
                <Box sx={{flex column center center}}>  // heading1 + para1 + para2 group
                  <Typography sx={style.heading}>{item.heading1}</Typography>
                  <Typography sx={style.paragraph}>{item.para1}</Typography>
                  <Typography sx={style.paragraph}>{item.para2}</Typography>
                </Box>
                <Box sx={{flex column center center}}>  // heading2 + para3 + para4 group
                  …
                </Box>
                <Box sx={{flex column center center}}>  // heading3 + para5 + para6 group
                  …
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  </Box>
</>
```

### Dimensions & spacing

| Element | Property | Mobile (<600) | Tablet (600-1199) | Desktop (≥1200) |
|---|---|---|---|---|
| Root `<Box>` | `margin` | `0` (default) | `0` (default) | **`15vh 0`** |
| Outer `<Grid container spacing={2}>` | gap | 16px both axes | 16px | 16px |
| Outer `<Grid item lg={3}>` (sidebar) | width | 100% | 100% | 25% |
| Outer `<Grid item lg={9}>` (article) | width | 100% | 100% | 75% |
| Sidebar `<Box>` | `padding` | `2vh 0` | `4vh 0` | `4vh 0` |
| Sidebar `<Box>` | `borderRadius` | `0 2vh 2vh 0` | `0 2vh 2vh 0` | `0 2vh 2vh 0` |
| Sidebar `<Box>` | `background` | `#EDF9FFCC` | `#EDF9FFCC` | `#EDF9FFCC` |
| Sidebar `<Box>` | `boxShadow` | `0px -3px 10px 0px rgba(0,0,0,0.15) inset` | (same) | (same) |
| Sidebar `<Box>` | `width` | 100% | 100% | 100% |
| Row header `<Box>` | `gap` | `.5rem` (8px) | `.5rem` | `.5rem` |
| `<List>` | `padding-left` | `0` | `0` | `0` |
| `<ListItem>` | `padding-left` | `1rem` (16px) | `1rem` | `1rem` |
| `<ListItem>` | `width` | `auto` | `auto` | `auto` |
| Nested article `<Grid container spacing={2}>` | gap | 16px | 16px | 16px |

### `style.heading` (extracted from bottom of file, lines 187-193)

| Property | Mobile (<600) | Tablet (600-1199) | Desktop (≥1200) |
|---|---|---|---|
| `width` | **`34vh`** | `34vh` | `auto` |
| `fontSize` | **`3vh`** | `3vh` | **`5vh`** |
| `fontWeight` | `600` | `600` | `600` |
| `color` | `#000` | `#000` | `#000` |
| `textAlign` | `center` | `center` | `center` |
| `padding` | `4vh 0 0 0` (top only) | `4vh 0 0 0` | `4vh 0 0 0` |

### `style.paragraph` (lines 195-203)

| Property | Mobile (<600) | Tablet (600-1199, `sm`) | Desktop (≥1200) |
|---|---|---|---|
| `width` | **`45vh`** | **`65vh`** | **`135vh`** |
| `fontSize` | **`1.6vh`** | `1.6vh` (no `sm` override → inherits `xs`) | **`2.4vh`** |
| `color` | `#2D2D2D` | `#2D2D2D` | `#2D2D2D` |
| `fontWeight` | `400` | `400` | `400` |
| `padding` | `2vh 0 0 0` | `2vh 0 0 0` (no `sm` override) | `4vh 0 0 0` |
| `lineHeight` | (default) | (default) | **`4vh`** |
| `textAlign` | (default `left`) | **`justify`** | **`left`** |

Note: `style.paragraph.textAlign` is `{ lg: "left", sm: "justify" }` — mobile (xs) has no value so falls back to MUI default (`left`). Tablet (sm) explicitly justifies. Desktop (lg) reasserts left.

### Typography (sidebar)

| Element | MUI variant | Mobile | Tablet | Desktop | Weight | Color |
|---|---|---|---|---|---|---|
| Row title "IGCSE CAIE Tutoring" | `<Typography>` (no variant) | `fontSize: 2vh` | `fontSize: 2.4vh` | `fontSize: 2.4vh` (inherits `sm`) | `600` | (inherits, body color) |
| List items | `<ListItem>` (no variant) | `fontSize: 2vh` | `2vh` | `2vh` | `400` | `#2D2D2D` |

### Colors

| Hex / rgba | Where | Tailwind class (per 01-token-mapping.md §5) |
|---|---|---|
| `#EDF9FFCC` (sidebar bg) | `.sidebar Box.background` | `bg-[#EDF9FFCC]` (no token — keep arbitrary) |
| `rgba(0,0,0,0.15)` (shadow color) | `.sidebar Box.boxShadow` | (inside arbitrary shadow string) |
| `#000` (heading color) | `style.heading.color` | `text-black` |
| `#2D2D2D` (paragraph + list item color) | `style.paragraph.color`, `ListItem.color` | `text-ink-900` |

### Animations / interactions

- `IconButton onClick={toggleList}` — toggles `openLists[listKey]` boolean state.
- Open lists render the `<List>`; closed lists hide it.
- No transitions/animations applied to the expand/collapse (MUI's `Collapse` is NOT used — it's a plain conditional render). The port should match (no animation library, just conditional JSX).

---

## §2 Tailwind port — bug list

Comparing `tuitionalFrontend\src\components\blog\embrace.tsx` against §1:

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 55 | `<div className="lg:my-[15vh]">` root | ✓ Matches MUI `margin: { lg: "15vh 0" }`. (Note: `my-` produces top + bottom which matches `15vh 0`.) | — |
| B2 | 56 | `<div className="grid grid-cols-1 gap-4 lg:grid-cols-12">` outer | MUI uses `<Grid container spacing={2}>` with `xs=12 sm=12 md=12 lg=3 / lg=9`. The Tailwind grid-cols-12 split is fine for proportional widths, but **the breakpoint should be `lg:`** (1200) — currently correct. ✓ Keep `lg:grid-cols-12`. Note: `gap-4` matches `spacing={2}` = 16px. ✓ | — |
| B3 | 57 | `<div className="lg:col-span-3">` sidebar | ✓ Matches `lg={3}` (3/12 = 25%) at ≥1200. | — |
| B4 | 58 | `bg-[#EDF9FFCC]` | ✓ Matches | — |
| B5 | 58 | `rounded-e-[2vh]` | ✓ Matches `borderRadius: '0 2vh 2vh 0'` (`-e-` = end-side: right in LTR, left in RTL — semantically correct and RTL-aware) | — |
| B6 | 58 | `shadow-[0px_-3px_10px_0px_rgba(0,0,0,0.15)_inset]` | ✓ Matches | — |
| B7 | 58 | `py-[2vh] sm:py-[4vh]` | ✓ Matches `padding: { xs: '2vh 0', sm: '4vh 0' }` (only y-axis padding — `0` x-axis preserved by default) | — |
| B8 | 61 | Row header `<div className="flex w-full flex-row items-center justify-center gap-2">` | MUI: `gap: '.5rem'` = 8px → `gap-2` ✓. flex-row / items-center / justify-center ✓. | — |
| B9 | 62 | `<p className="text-center font-heading text-[2vh] font-semibold sm:text-[2.4vh]">` | MUI: `fontSize: { xs: '2vh', sm: '2.4vh' }`, `fontWeight: 600`, `textAlign: 'center'`. ✓ Matches. `font-heading` (League Spartan) is an addition vs MUI which used default body font — **minor divergence**. MUI did not specify `fontFamily`, so it inherited Inter (body) — but the port forces League Spartan. Remove `font-heading` from this `<p>` to match. | low |
| B10 | 65-72 | `<button>` wrapping ChevronUp/Down from lucide-react | MUI uses `<IconButton>` from `@mui/material` with `ExpandMoreIcon` / `ExpandLessIcon` from `@mui/icons-material`. The port substitutes `lucide-react`. **Confirmed:** lucide-react is a Tailwind-side approved icon library — keep. The visual is similar but icon strokes differ. Document divergence; not a fixable bug. | — (note) |
| B11 | 71 | `<ChevronUp size={18} />` / `<ChevronDown size={18} />` | MUI `IconButton` default size is 24px. Port shrinks to 18px. Bump to `size={24}` to match. | low |
| B12 | 75 | `<ul className="flex w-full list-disc flex-col items-center justify-center gap-1 ps-4 text-center">` | MUI: `<List>` has `paddingLeft: 0`, list items have `paddingLeft: '1rem'`. The port reverses this — wraps the `<ul>` with `ps-4` (padding-start 16px). **Two fixes:** (a) remove `ps-4` from the `<ul>` (set `ps-0`), (b) add `ps-4` to each `<li>`. Also: MUI `<List>` has no `gap` — items are stacked with default list spacing. The port's `gap-1` (4px) is a small invention. Remove `gap-1`. | med |
| B13 | 79 | `<li className="font-heading text-[2vh] font-normal text-ink-900">` | MUI: `fontSize: '2vh'`, `color: '#2D2D2D'` (= `text-ink-900`), `fontWeight: 400`, no `fontFamily` (inherits body Inter). The port forces `font-heading` (League Spartan). Same as B9 — remove `font-heading`. | low |
| B14 | 91 | `<div className="lg:col-span-9">` article column | ✓ Matches `lg={9}` (75%) at ≥1200. | — |
| B15 | 92 | `<div className="flex flex-col gap-4">` nested wrapper | MUI uses `<Grid container spacing={2}>` with `<Grid item xs={12}>` for each section row. Tailwind `flex flex-col gap-4` (16px) approximates this for a single column. ✓ Acceptable. | — |
| B16 | 93-107 | Each section rendered as ONE `<div>` with heading + paragraphs inline | MUI renders THREE inner `<Box>` groups per section (heading1+para1+para2, heading2+para3+para4, heading3+para5+para6) — each is a separate flex-column-center group. The port collapses this into a single section per outer iteration, but the source data (`sections`) has ONE heading per entry, NOT 3. **The port has restructured the data shape** — MUI has 3 sections each with 3 heading/para groups (9 paragraphs total), the port has 3 sections each with 1 heading + 2 paragraphs (6 paragraphs total). | high |
| B17 | 95 | `<h3 className="w-[34vh] pt-[4vh] text-center font-heading text-[3vh] font-semibold text-black lg:w-auto lg:text-[5vh]">` | MUI `style.heading`: `width:{ lg:auto, xs:34vh }`, `fontSize:{ lg:5vh, xs:3vh }`, `fontWeight:600`, `color:#000`, `textAlign:center`, `padding:4vh 0 0 0`. ✓ Translation matches (`text-[3vh] lg:text-[5vh]`, `w-[34vh] lg:w-auto`, `pt-[4vh]`, `text-center`, `text-black`, `font-semibold`). `font-heading` was NOT specified by MUI (default Inter applied) — the port adds League Spartan. **Mild divergence — but headings using League Spartan is consistent with the rest of the codebase. Acceptable.** | low |
| B18 | 101 | `<p className="w-[45vh] pt-[2vh] text-start font-heading text-[1.6vh] font-normal text-ink-900 sm:w-[65vh] sm:text-justify lg:w-[135vh] lg:pt-[4vh] lg:text-[2.4vh] lg:leading-[4vh]">` | MUI `style.paragraph`: `width:{lg:135vh, xs:45vh, sm:65vh}` ✓, `fontSize:{lg:2.4vh, xs:1.6vh}` ✓, `color:#2D2D2D` = `text-ink-900` ✓, `fontWeight:400` ✓, `padding:{lg:'4vh 0 0 0', xs:'2vh 0 0 0'}` → `pt-[2vh] lg:pt-[4vh]` ✓, `lineHeight:{lg:4vh}` → `lg:leading-[4vh]` ✓, `textAlign:{lg:left, sm:justify}` → port has `text-start sm:text-justify lg:text-left` … wait, port has `text-start ... sm:text-justify` but **no `lg:text-left`** override. **Bug:** Tailwind's `sm:text-justify` will cascade to `lg:` and stay justified. MUI explicitly resets to `left` at `lg`. Add `lg:text-left`. | med |
| B19 | 101 | `font-heading` on paragraph | MUI did not set `fontFamily` (body Inter). Port forces League Spartan. **For paragraphs (not headings), the project convention is `font-body` (Inter).** Change `font-heading` → `font-body`. | med |
| B20 | 101 | `text-start` (initial value, becomes `text-left` LTR / `text-right` RTL) | MUI's `xs` had no `textAlign` → CSS default `start`/`left`. `text-start` is the correct logical equivalent. ✓ | — |
| B21 | (missing) | No collapse animation | MUI has none either (plain conditional). ✓ Matches by absence. | — |
| B22 | (data) | Sections array has only 3 entries with 1 heading + 2 paragraphs each (6 paragraphs total) | MUI sections array has 3 entries each with 3 heading/para PAIRS (heading1+para1+para2 AND heading2+para3+para4 AND heading3+para5+para6 = 9 paragraphs per entry, 27 total). Wait — re-read MUI: actually the MUI `RightBoxText` has 3 ENTRIES, and each entry has fields like `heading1, para1, para2, heading2, para3, para4, heading3, para5, para6` — but inspecting closely, **each entry only populates SOME of those fields** (entry 0 has heading1+para1+para2; entry 1 has heading2+para3+para4; entry 2 has heading3+para5+para6). The inner `Box`es check `{item.heading1 && ...}` which is truthy only for the corresponding entry. So effectively each entry produces 1 heading + 2 paragraphs — **functionally identical to the port's structure**. The duplication of 3 inner Boxes per outer entry is redundant code in MUI but produces the same output. ✓ Port simplification is acceptable. **Revise B16 severity → low (cosmetic/code-quality, not a visible bug).** | low |
| B23 | (missing) | The `sections[2].paras[0]` text differs from MUI's `para5` | MUI `para5`: "…interactive whiteboards, which allow for real-time collaboration and visualization of complex concepts. These digital tools enable you and your tutor to draw diagrams, solve problems together, and illustrate ideas dynamically, making abstract concepts more concrete and easier to understand." Port: "…that can significantly augment your studies." (truncated). The third section's first paragraph is **shortened by ~75%** in the port. | high (content) |

---

## §3 Corrected Tailwind classNames

Key from→to translations:

```tsx
// Row title (was line 62)
// FROM:
<p className="text-center font-heading text-[2vh] font-semibold sm:text-[2.4vh]">
// TO:
<p className="text-center font-body text-[2vh] font-semibold sm:text-[2.4vh]">

// Chevron icon size (was line 71)
// FROM:
{openLists[listKey] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
// TO:
{openLists[listKey] ? <ChevronUp size={24} /> : <ChevronDown size={24} />}

// List wrapper + items (was line 75-83)
// FROM:
<ul className="flex w-full list-disc flex-col items-center justify-center gap-1 ps-4 text-center">
  {getListItems(listKey).map((item, i) => (
    <li className="font-heading text-[2vh] font-normal text-ink-900">{item}</li>
  ))}
</ul>
// TO:
<ul className="flex w-full list-disc flex-col items-center justify-center ps-0 text-center">
  {getListItems(listKey).map((item, i) => (
    <li className="ps-4 font-body text-[2vh] font-normal text-ink-900 [list-style:disc] [display:list-item]">
      {item}
    </li>
  ))}
</ul>

// Paragraph (was line 99-104)
// FROM:
<p className="w-[45vh] pt-[2vh] text-start font-heading text-[1.6vh] font-normal text-ink-900
              sm:w-[65vh] sm:text-justify
              lg:w-[135vh] lg:pt-[4vh] lg:text-[2.4vh] lg:leading-[4vh]">
// TO:
<p className="w-[45vh] pt-[2vh] text-start font-body text-[1.6vh] font-normal text-ink-900
              sm:w-[65vh] sm:text-justify
              lg:w-[135vh] lg:pt-[4vh] lg:text-[2.4vh] lg:leading-[4vh] lg:text-left">
```

Content fix (B23): restore the full `para5` text in `sections[2].paras[0]` to match MUI's source. Currently the port has a 30-word fragment; MUI has a 70-word paragraph.

Optional polish (B16/B22): the structure already approximates MUI's visual output despite the data-shape difference. Only fix if QA flags a paragraph-count mismatch on the live site.

---

## §4 Verification at 4 widths

| Width | What to check |
|---|---|
| **375** (iPhone SE) | Single-column layout. Sidebar card full-width with `py-[2vh]` (≈13px) padding, top-right and bottom-right rounded 2vh. Row titles 2vh (≈13px). Headings `text-[3vh]` (≈20px), width 34vh (≈225px) centered. Paragraphs `text-[1.6vh]` (≈11px), width 45vh (≈300px), `text-start` (left-aligned). |
| **768** (iPad Mini) | Single-column still (Tailwind `sm`=600 has triggered, so `sm:py-[4vh]` and `sm:text-[2.4vh]` apply). Paragraphs width 65vh, `text-justify`. |
| **1280** (Laptop S) | Two-column at `lg`=1200. Sidebar 3/12 = 25%. Article 9/12 = 75%. Headings 5vh (≈40px on a 800-tall window) auto-width. Paragraphs 135vh wide (≈1080px on 800-tall), `text-[2.4vh]` (≈19px), `leading-[4vh]` (≈32px), `text-left`. Root has `my-[15vh]` (≈120px). |
| **1920** (Desktop) | Same as 1280, scaled. `my-[15vh]` ≈ 162px on 1080-tall. |

Cross-check side-by-side with MUI baseline. Watch for: paragraph text-align flipping to justify on desktop (B18), font drift from League Spartan back to Inter (B19), the truncated third-section paragraph (B23).

---

## §5 RTL notes

- **`rounded-e-[2vh]`** in the port is already RTL-aware: in LTR it produces `border-right-radius`, in RTL `border-left-radius`. ✓ This is the correct logical-property choice.
- **`ps-4`** on `<li>` (when moved per B12) is also RTL-aware (`padding-inline-start`).
- **`text-start`** on `<p>` already flips. ✓
- **`text-left` (B18 fix)** at `lg:` is **direction-specific** — in RTL it would explicitly left-align Arabic content (visually wrong). MUI's `textAlign: 'left'` has the same problem in RTL, so this is a faithful port. If Arabic rendering of this component is required, change `lg:text-left` → `lg:text-start`. **Recommendation:** use `lg:text-start` for RTL safety unless the design explicitly requires left-anchored text in both locales.
- The sidebar card's `lg=3` left position does NOT flip in RTL via Grid props — both MUI's `Grid` and Tailwind's grid render the FIRST item in the start position. In RTL this means the sidebar appears on the **right** (visually flipped) and the article on the **left**. This is the desired behavior — MUI and Tailwind both do this automatically.
