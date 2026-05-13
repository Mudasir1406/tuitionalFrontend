# Component — `<FrequentlyQuestions>` (curiculume FAQ)

**Note**: the task brief lists this as `faqs.tsx`; in the MUI baseline the file is `frequently-questions.tsx`.

Curriculum-page FAQ section: centered "Frequently Asked Questions" heading + paragraph, then one expanded question with answer (blue background) followed by 6 collapsed question rows (light blue background).

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\curiculume\frequently-questions.tsx` |
| Tailwind port | **MISSING** — no `tuitionalFrontend\src\components\curiculume\frequently-questions.tsx` or `faqs.tsx`. |
| Arabic variant | (none in baseline) |

---

## §1 MUI source — extracted properties

### Layout tree

```
<div>
└── <Box marginY=lg:13vh marginX=lg:4vh>
    ├── <Box>                              ← header block
    │   ├── <Typography frequently>Frequently Asked Questions</Typography>
    │   └── <Typography frequentlyDesc>{desc}</Typography>
    └── <Box marginX=auto maxWidth=140vh paddingX=lg:2vh>     ← list wrapper
        ├── <Grid container spacing={1}>
        │   └── <Box (expanded card #9EDCFF)>
        │       <Grid item xs=12>
        │         <Box flex space-between>
        │           <Typography boxhed>{expanded question}</Typography>
        │           <Typography><Image upicon h=6vh /></Typography>
        │         </Box>
        │         <Typography boxdesc>{expanded answer}</Typography>
        │       </Grid>
        │     </Box>
        └── <Grid container spacing={1}>      ← collapsed rows
            {Questions.map((item) => (
              <Grid item xs=12>
                <Box (collapsed card #F3FBFF)>
                  <Box flex space-between>
                    <Typography TextBox>{item.Text}</Typography>
                    <Typography><Image downicon maxH=8vh /></Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
```

### Dimensions & spacing

| Element | Property | xs | sm | md | lg |
|---|---|---|---|---|---|
| outer Box | `marginY` | (none) | (none) | (none) | 13vh |
| outer Box | `marginX` | (none) | (none) | (none) | 4vh |
| frequentlyDesc | `width` | (full) | (full) | (full) | 55% |
| frequentlyDesc | `margin` | 0 auto | 0 auto | 0 auto | 0 auto |
| frequentlyDesc | `textAlign` | center | center | center | center |
| frequentlyDesc | `lineHeight` | 5vh | 5vh | 5vh | 5vh |
| list wrapper | `marginX` / `maxWidth` | auto / 140vh | (same) | (same) | (same) |
| list wrapper | `paddingX` | (none) | (none) | (none) | 2vh |
| expanded card | `borderRadius` | 2vh | 2vh | 2vh | 2vh |
| expanded card | `background` | `#9EDCFF` | (same) | (same) | (same) |
| expanded card | `backdropFilter` | blur(5px) | (same) | (same) | (same) |
| expanded card | `padding` | 3vh | 3vh | 3vh | 3vh |
| expanded card | `marginTop` | 3vh | 3vh | 3vh | 3vh |
| expanded card | `border` | 0.784px #EBEBEB | (same) | (same) | (same) |
| collapsed card | `borderRadius` | 2vh | 2vh | 2vh | 2vh |
| collapsed card | `background` | `#F3FBFF` | (same) | (same) | (same) |
| collapsed card | `backdropFilter` | blur(77px) | (same) | (same) | (same) |
| collapsed card | `padding` | 3vh | 3vh | 3vh | 3vh |
| collapsed card | `marginTop` | 3vh | 3vh | 3vh | 3vh |
| collapsed card | `border` | 0.784px #EBEBEB | (same) | (same) | (same) |
| flex header inside card | display/justifyContent/alignItems | flex / space-between / center | (same) | (same) | (same) |
| boxdesc | `marginTop` | 2vh | 2vh | 2vh | 2vh |
| upicon inline | `height` | 6vh | 6vh | 6vh | 6vh |
| downicon inline | `maxHeight` | 8vh | 8vh | 8vh | 8vh |

### Typography

| Element | xs | sm | md | lg | Weight | Align |
|---|---|---|---|---|---|---|
| frequently | (default) | (default) | (default) | 6vh | 600 | center |
| frequentlyDesc | (default) | (default) | (default) | 2.2vh | 400 | center |
| boxhed | (default) | (default) | (default) | 2.5vh | (default) | (default) |
| boxdesc | (default) | (default) | (default) | 1.9vh | (default) | (default) |
| boxdesc `width` | (default) | (default) | (default) | 135vh | — | — |
| TextBox (collapsed) | 2.2vh | 2.2vh | 2.2vh | 2.2vh | (default) | (default) |

### Colors

| Hex | Where | Token |
|---|---|---|
| `#9EDCFF` | expanded card bg | `bg-[#9EDCFF]` |
| `#F3FBFF` | collapsed card bg | arbitrary `bg-[#F3FBFF]` |
| `#EBEBEB` | card border | arbitrary `border-[#EBEBEB]` |

### Animations / interactions

- None (the icons are static images, not real accordion toggles).

---

## §2 Tailwind port — bug list

**Port file does not exist.** Risk list:

| # | Risk | Expected | Severity |
|---|---|---|---|
| Fq1 | Mapping `frequently` 6vh-only at lg to triplet | Preserve `lg:text-[6vh] font-semibold text-center` | high |
| Fq2 | frequentlyDesc width-lg-55%, lineHeight 5vh, margin 0 auto | `lg:w-[55%] mx-auto text-center leading-[5vh] lg:text-[2.2vh]` | medium |
| Fq3 | boxhed lg:2.5vh | `lg:text-[2.5vh]` | medium |
| Fq4 | boxdesc `width: lg:135vh` (extreme) | `lg:w-[135vh] mt-[2vh] lg:text-[1.9vh]` | high |
| Fq5 | TextBox `fontSize: "2.2vh"` (no breakpoint object) | `text-[2.2vh]` at all sizes | medium |
| Fq6 | `border: "0.784px #EBEBEB"` — `0.784px` is not a CSS pixel value Tailwind has tokens for | arbitrary `border-[0.784px] border-[#EBEBEB]` (or round to 1px) | low |
| Fq7 | Grid `xs=12` (always 1 col) | Skip Grid; render `<div>` | low |
| Fq8 | list wrapper `mx-auto max-w-[140vh] lg:px-[2vh]` | direct translation | medium |
| Fq9 | outer Box `marginY: lg:13vh, marginX: lg:4vh` | `lg:my-[13vh] lg:mx-[4vh]` | medium |
| Fq10 | `backdropFilter: blur(77px)` on collapsed card (extreme) | `backdrop-blur-[77px]` (arbitrary) | low |
| Fq11 | `align-items: center` on the flex header inside card | `flex justify-between items-center` | low |

---

## §3 Corrected Tailwind classNames

```tsx
<div>
  <div className="lg:my-[13vh] lg:mx-[4vh]">
    <div>
      <p className="text-center font-semibold lg:text-[6vh]">Frequently Asked Questions</p>
      <p className="mx-auto text-center font-normal leading-[5vh] lg:w-[55%] lg:text-[2.2vh]">
        Lorem ipsum dolor sit amet consectetur. Amet morbi sit suspendisse dui ut donec vel id. Viverra urna cras nulla elementum. Risus orci dolor euismod in fringilla adipiscing eu condimentum.
      </p>
    </div>

    <div className="mx-auto max-w-[140vh] lg:px-[2vh]">
      <div>
        <div className="mt-[3vh] rounded-[2vh] border-[0.784px] border-[#EBEBEB] bg-[#9EDCFF] p-[3vh] backdrop-blur-[5px]">
          <div className="flex items-center justify-between">
            <p className="lg:text-[2.5vh]">Lorem ipsum dolor sit amet consectetur. Lorem leo felis.</p>
            <span><Image src={upicon} alt="" style={{ height: "6vh" }} /></span>
          </div>
          <p className="mt-[2vh] lg:w-[135vh] lg:text-[1.9vh]">
            Lorem ipsum dolor sit amet consectetur. Nunc malesuada massa enim nec sapien vel sagittis dignissim libero. Felis phasellus cursus dolor suspendisse. Quam enim urna dictumst aenean morbi nisi. Molestie tincidunt id neque mauris. Egestas nisi tellus eget id aenean dignissim turpis risus. Nisi felis.
          </p>
        </div>
      </div>

      <div>
        {Questions.map((item, index) => (
          <div
            key={index}
            className="mt-[3vh] rounded-[2vh] border-[0.784px] border-[#EBEBEB] bg-[#F3FBFF] p-[3vh] backdrop-blur-[77px]"
          >
            <div className="flex items-center justify-between">
              <p className="text-[2.2vh]">{item.Text}</p>
              <span><Image src={item.icon} alt="" style={{ maxHeight: "8vh" }} /></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
```

---

## §4 Verification at 4 widths

- **375px**: no outer margins; cards are full width minus their `p-3vh` padding. Header at default size (~1rem center). All cards have 3vh marginTop between (~20px). TextBox at 2.2vh (~15px).
- **768px**: same; max-w 140vh (~1023px) clamps after viewport widens but viewport is 768px wide.
- **1280px**: header 6vh (~58px); desc 55% width centered (~528px); cards in max-w-140vh (~1008px) container; outer mx 4vh + my 13vh; boxdesc width 135vh (~972px overflow check).
- **1920px**: same as 1280; the max-w 140vh container limits to ~1008px (assuming 720px tall viewport).

---

## §5 RTL notes

No AR variant. Under RTL, `flex justify-between` between text and icon would put icon on the left (mirror) — keeps reading order correct for AR. `mx-auto` is RTL-safe.
