# Component — `<Pricing>` (curiculume)

Curriculum-page pricing block: 3 plans (`Free` / `$15/month` / `$25/month`) in a 3-up grid (1 col mobile, 2 cols sm, 3 cols md+). Each card has title + duration, description, feature list with tick icons, and a "Learn More" CTA.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\curiculume\pricing.tsx` |
| Tailwind port | **MISSING** — no `tuitionalFrontend\src\components\curiculume\pricing.tsx`. |
| Arabic variant | (none in baseline) |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Box container>                                ← padding, blue bg
├── <Typography heading>Pricing</Typography>
└── <Grid container spacing={3}>               ← 24px gap
    {plans.map((plan, index) => (
      <Grid item xs=12 sm=6 md=4>
        <Box card>
          ├── <Box display=flex>
          │   ├── <Typography cardTitle>{plan.title}</Typography>
          │   └── <Typography cardduration>${plan.duration}</Typography>
          ├── <Typography cardDescription>{plan.description}</Typography>
          ├── <Box features>
          │   {plan.features.map((feature) => (
          │     <Box featureItem>
          │       <Image tic icon />
          │       <Typography featureText>{feature}</Typography>
          │     </Box>
          │   ))}
          └── <Box marginTop=auto width=100%>
              <Button containedBtn>{buttonText}</Button>
            </Box>
        </Box>
      </Grid>
    ))}
```

### Dimensions & spacing

| Element | Property | xs | sm | md | lg |
|---|---|---|---|---|---|
| container | `padding` | 4vh | 6vh | (sm) | 8vh |
| container | `backgroundColor` | `#9EDCFF` | (same) | (same) | (same) |
| Grid container | `spacing` | 3 (24px) | 3 | 3 | 3 |
| Grid item | column span | 12 (1 col) | 6 (2 cols) | 4 (3 cols) | 4 |
| card | `backgroundColor` | `#fff` | (same) | (same) | (same) |
| card | `borderRadius` | 8px | 8px | 8px | 8px |
| card | `boxShadow` | `0px 4px 12px rgba(0, 0, 0, 0.1)` | (same) | (same) | (same) |
| card | `padding` | 2vh | 3vh | (sm) | 4vh |
| card | `textAlign` | left | left | left | left |
| card | `display/flexDirection` | flex col | (same) | (same) | (same) |
| card | `minHeight` | 70vh | 70vh | 70vh | 70vh |
| heading | `marginBottom` | 4vh | 4vh | 4vh | 4vh |
| heading | `textAlign` | center | center | center | center |
| cardTitle | `marginBottom` | 1vh | 1vh | 1vh | 1vh |
| cardDescription | `margin` | `2vh 0` | (same) | (same) | (same) |
| features | `marginBottom` | 2vh | 2vh | 2vh | 2vh |
| featureItem | `display/alignItems` | flex / center | (same) | (same) | (same) |
| featureItem | `paddingY` | 1vh | 1vh | 1vh | 1vh |
| icon | `marginRight` | 1vh | 1vh | 1vh | 1vh |
| icon | `height` | 1.5vh | 1.5vh | 1.5vh | 1.5vh |
| button outer wrap | `marginTop` / `width` | auto / 100% | (same) | (same) | (same) |
| containedBtn | `paddingY` | 1.5vh | 1.5vh | 1.5vh | 1.5vh |
| containedBtn | `paddingX` | 3vh | 3vh | 3vh | 3vh |
| containedBtn | `margin` | `0 0 6vh 0` | (same) | (same) | (same) |
| containedBtn | `borderRadius` | 10px | 10px | 10px | 10px |
| containedBtn | `width` | 40% | 40% | 40% | 40% |
| containedBtn | `textAlign` | left | left | left | left |

### Typography

| Element | xs | sm | md | lg | Weight | Color | Align |
|---|---|---|---|---|---|---|---|
| heading "Pricing" | 4vh | 4vh | 4vh | 6vh | 600 | (default) | center |
| cardTitle | 2.5vh | 3vh | (sm) | 7vh | 700 | (default) | left |
| cardTitle `lineHeight` | 2.5vh | 3vh | (sm) | 7vh | — | — | — |
| cardduration | 2vh | 2.5vh | (sm) | 3vh | 500 | `#A2A2A2` | (default) |
| cardDescription | 1.8vh | 2vh | (sm) | 2vh | 500 | (default) | left |
| featureText | 1.6vh | 1.8vh | (sm) | 2vh | 400 | (default) | left |
| containedBtn label | 2vh | 2vh | 2vh | 2vh | 700 | white | (button default center) |

### Colors

| Hex | Where | Token |
|---|---|---|
| `#9EDCFF` | container bg | arbitrary `bg-[#9EDCFF]` |
| `#fff` | card bg | `bg-white` |
| `#A2A2A2` | cardduration text | arbitrary `text-[#A2A2A2]` |
| `#38B6FF` | containedBtn bg | `bg-brand-500` |
| `0px 4px 12px rgba(0, 0, 0, 0.1)` | card shadow | arbitrary `shadow-[0px_4px_12px_rgba(0,0,0,0.1)]` |
| `1px 4px 24px 0px #38B6FFB2` | button shadow | arbitrary `shadow-[1px_4px_24px_0px_#38B6FFB2]` |

### Animations / interactions

- containedBtn `:hover` keeps the same bg + same shadow (no change).

---

## §2 Tailwind port — bug list

**Port file does not exist.** Risk list for when porting:

| # | Risk | Expected | Severity |
|---|---|---|---|
| Pr1 | Replacing `vh`-based font-sizes with the heading triplet | Preserve `vh`: heading `text-[4vh] lg:text-[6vh]`, cardTitle `text-[2.5vh] sm:text-[3vh] lg:text-[7vh]`, etc. | high |
| Pr2 | Translating Grid `xs=12 sm=6 md=4` to wrong breakpoint | Correct: `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3` (because the smallest non-12 breakpoint is `sm=6`) | high |
| Pr3 | Translating `spacing={3}` to `gap-6` (24px) | `gap-6` ✓ | high |
| Pr4 | Using `text-h1` triplet for "Pricing" heading | MUI cardTitle uses **literal 6vh at lg** (≈58px on 960h viewport), much bigger than h1 (3rem/48px). Preserve `vh`. | high |
| Pr5 | minHeight: 70vh on card not preserved | `min-h-[70vh]` | medium |
| Pr6 | Forgetting `marginTop: auto` on button wrap | `mt-auto` | medium |
| Pr7 | Forgetting `width: 40%` and `text-align: left` on button | `w-[40%]` ml-0 — note this leaves the button visually orphaned (intentional in MUI) | medium |
| Pr8 | `cardTitle lineHeight` matching `fontSize` at every breakpoint | `leading-[2.5vh] sm:leading-[3vh] lg:leading-[7vh]` | medium |
| Pr9 | Forgetting `display: flex` on title-row | `flex` on title row Box | medium |
| Pr10 | Forgetting `paddingY: 1vh` on each featureItem | `py-[1vh]` | low |
| Pr11 | tic icon size `1.5vh` height, `1vh` right margin | inline-style: `style={{ marginRight: "1vh", height: "1.5vh" }}` (MUI uses style not sx) — keep inline | low |
| Pr12 | Button `margin: "0 0 6vh 0"` (bottom margin only) | `mb-[6vh]` | low |

---

## §3 Corrected Tailwind classNames

```tsx
<div className="bg-[#9EDCFF] p-[4vh] sm:p-[6vh] lg:p-[8vh]">
  <h2 className="mb-[4vh] text-center font-heading text-[4vh] font-semibold lg:text-[6vh]">
    Pricing
  </h2>

  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
    {plans.map((plan, index) => (
      <div
        key={index}
        className="flex min-h-[70vh] flex-col rounded-[8px] bg-white p-[2vh] text-left shadow-[0px_4px_12px_rgba(0,0,0,0.1)] sm:p-[3vh] lg:p-[4vh]"
      >
        <div className="flex">
          <p className="mb-[1vh] font-bold text-[2.5vh] leading-[2.5vh] sm:text-[3vh] sm:leading-[3vh] lg:text-[7vh] lg:leading-[7vh]">
            {plan.title}
          </p>
          <p className="font-medium text-[2vh] text-[#A2A2A2] sm:text-[2.5vh] lg:text-[3vh]">
            ${plan.duration}
          </p>
        </div>
        <p className="my-[2vh] font-medium text-[1.8vh] sm:text-[2vh] lg:text-[2vh]">
          {plan.description}
        </p>
        <div className="mb-[2vh]">
          {plan.features.map((feature, featureIndex) => (
            <div key={featureIndex} className="flex items-center py-[1vh]">
              <Image src={tic} alt="Check icon" style={{ marginRight: "1vh", height: "1.5vh" }} />
              <p className="font-normal text-[1.6vh] sm:text-[1.8vh] lg:text-[2vh]">{feature}</p>
            </div>
          ))}
        </div>
        <div className="mt-auto w-full">
          <button
            type="button"
            className="mb-[6vh] w-[40%] rounded-[10px] bg-brand-500 px-[3vh] py-[1.5vh] text-left text-[2vh] font-bold normal-case text-white shadow-[1px_4px_24px_0px_#38B6FFB2] hover:bg-brand-500"
          >
            {plan.buttonText}
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
```

---

## §4 Verification at 4 widths

- **375px**: 1 column; container p-4vh; card minHeight 70vh, p-2vh; cardTitle 2.5vh (~17px); features at 1.6vh; button 40% width left-aligned. heading at 4vh (~27px).
- **768px**: 2 columns (sm:grid-cols-2 active); container p-6vh; card p-3vh; cardTitle 3vh; features at 1.8vh.
- **1280px**: 3 columns (md:grid-cols-3); card p-4vh; cardTitle 7vh (huge — intentional); features at 2vh. heading 6vh (~58px on 960h viewport).
- **1920px**: 3 columns (md ≥900); card p-4vh; heading stays 6vh; minHeight 70vh means card is ~672px tall.

---

## §5 RTL notes

No AR variant. If/when added: `text-left` → `text-end` on cardDescription/cardTitle, button `text-left` flips to `text-end`. Image marginRight 1vh would flip to marginLeft via `me-[1vh]` for RTL-aware spacing.
