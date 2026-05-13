# Page — `/careers`

Recruiting page. Hero + four marketing sections (Team Values, Top Talent, Apply Now form). Hero layout via CSS Modules; rest delegated to `<Container>` with `lg:max-w-[1650px]`.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\app\careers\page.tsx` |
| Tailwind port | `tuitionalFrontend\src\app\careers\page.tsx` |
| Arabic variant | `/ar/careers` — uses ar-* components; same section sequence. |

## §1 Section sequence (MUI source)

```tsx
<Header />
<div className={styles.container}>
  <div className={styles["grid-container"]}>
    <div className={styles.hero}><Hero /></div>
    <div className={styles["hero-picture"]}><HeroInfo /></div>
  </div>
</div>

<Box sx={style.contanier}>                                     {/* gradient bg */}
  <Container sx={{ maxWidth: { lg: "1650px" } }}>
    <TeamValues />
  </Container>
</Box>

<Container sx={{ maxWidth: { lg: "1650px" } }}>
  <TopTalent />
</Container>

<div id="careersForm">
  <ApplyNow />
</div>

<Footer />
```

## §2 Page-level layout rhythm

| Pair / wrapper | MUI value | Tailwind translation |
|---|---|---|
| `style.contanier` (around TeamValues) | `background: linear-gradient(to bottom, #D7F0FF, rgba(255,255,255,0.7))` | `bg-gradient-to-b from-[#D7F0FF] to-white/70` |
| `<Container maxWidth={{ lg: 1650 }}>` (×2) | `lg:max-w-[1650px]` + auto-margin | `mx-auto lg:max-w-[1650px]` |
| Between sections | **none on page** — each section component owns its own vertical padding | — |
| `#careersForm` anchor | empty div, no styling | `<div id="careersForm">` (kept verbatim) |

Inter-section vertical gaps are NOT specified at page level. Each component (`<TeamValues>`, `<TopTalent>`, `<ApplyNow>`) must own its own `marginY` internally. If page review reveals tight gaps, do not patch on `page.tsx` — fix on the offending section component.

## §3 Container / max-width rules

- Hero: from `careers.module.css .container` (paddingTop ladder for sticky header).
- `<TeamValues>` and `<TopTalent>`: `lg:max-w-[1650px]` centered. Below `lg` they fill viewport width with the section component's own side padding.
- `<ApplyNow>`: no max-width wrapper on page — applies its own.

## §4 Section components used

- `<Hero>` — `tuitionalFrontend-mui-baseline\src\components\careers\hero.tsx`
- `<HeroInfo>` — `tuitionalFrontend-mui-baseline\src\components\careers\hero-info.tsx`
- `<TeamValues>` — `tuitionalFrontend-mui-baseline\src\components\careers\team-values.tsx`
- `<TopTalent>` — `tuitionalFrontend-mui-baseline\src\components\careers\top-talent.tsx`
- `<ApplyNow>` — `tuitionalFrontend-mui-baseline\src\components\careers\apply-now.tsx`
- `<Footer>` — `tuitionalFrontend-mui-baseline\src\components\footer-wrapper.tsx`

## §5 Tailwind port status

The port (`tuitionalFrontend\src\app\careers\page.tsx`) is a faithful translation:

- Line 36: `bg-gradient-to-b from-[#D7F0FF] to-white/70` — matches `style.contanier`.
- Line 37: `mx-auto lg:max-w-[1650px]` — matches `<Container maxWidth={{ lg: 1650 }}>`.
- Line 41: `mx-auto lg:max-w-[1650px]` — second container, also matched.
- Line 44: `<div id="careersForm">` preserved — important for anchor links.

No discrepancies at page level.

## §6 Verification at 4 widths
- 375 | 768 | 1280 | 1920

Gradient should fade out beneath `<TeamValues>` only. At 1280+ the two Containers cap at 1650px and self-center; below `lg` they're full-width.

## §7 SEO / metadata

```ts
export const metadata: Metadata = {
  title: "We Are Always on the Lookout for Talented People",
  description: "Want to be part of our dynamic team? ...",
  alternates: { canonical: `${SITE_URL}/careers` },
};
```

Preserved verbatim in Tailwind port. No JSON-LD.
