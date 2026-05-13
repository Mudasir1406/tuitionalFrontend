# Page — `/contact`

Static contact page. Header with a tinted background strip, `<LearnTogeather>` headline block, `<GetInTouch>` (form + image — see `examples/01-contact-getintouch.md`), then a small `<Info>` block. No image-based hero.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\app\contact\page.tsx` |
| Tailwind port | `tuitionalFrontend\src\app\contact\page.tsx` |
| Arabic variant | `/ar/contact` — uses ar-* components; same section sequence. |

## §1 Section sequence (MUI source)

```tsx
<Header
  background={{
    height: { xs: "100px", sm: "100px", md: "200px", lg: "200px" },
    background: "#D7F0FF",
  }}
/>

<Box sx={styles.background}>                              {/* #D7F0FF */}
  <Container sx={styles.contanier}>
    <LearnTogeather />
  </Container>
</Box>

<GetInTouch />

<Container
  sx={{ maxWidth: { lg: "1450px", margin: "auto" }, marginTop: "5vh", marginBottom: "3vh" }}
>
  <Info />
</Container>

<Footer />
```

## §2 Page-level layout rhythm

| Block | MUI value | Tailwind translation |
|---|---|---|
| `<Header background={{ height, background }}>` | `height: { xs: 100, sm: 100, md: 200, lg: 200 }px`, `#D7F0FF` | `heroClassName="h-[80px] sm:h-[90px] md:h-[100px] lg:h-[110px] bg-[#D7F0FF]"` in port (smaller, off by ~90px on md+ — see §5) |
| `styles.background` | `#D7F0FF` | `bg-[#D7F0FF]` |
| `styles.contanier` | `maxWidth: { lg: 1450 }`, `paddingTop: { xs: 120, sm: 150, md: 200, lg: 210 }px` | `mx-auto px-4 pt-[100px] sm:px-6 sm:pt-[110px] md:pt-[120px] lg:max-w-[1450px] lg:px-12 lg:pt-[130px]` (port values are smaller — see §5) |
| Info block wrapper | `maxWidth: { lg: 1450 }`, `marginTop: 5vh`, `marginBottom: 3vh` | `mx-auto mb-[3vh] mt-[5vh] px-4 sm:px-6 lg:max-w-[1450px] lg:px-12` |

## §3 Container / max-width rules

- `<LearnTogeather>` is wrapped in a `Container` capped at `1450px` from `lg` up. Below that, MUI Container's default 16px gutters apply (port replaces with explicit `px-4` / `sm:px-6` / `lg:px-12`).
- `<GetInTouch>` is **NOT** wrapped — it manages its own internal grid (see `examples/01-contact-getintouch.md`).
- `<Info>` shares the same 1450px Container cap.

## §4 Section components used

- `<Header background={...}>` — supports a colored strip behind it on contact page only
- `<LearnTogeather>` — `tuitionalFrontend-mui-baseline\src\components\contact\learn-togeather.tsx`
- `<GetInTouch>` — `tuitionalFrontend-mui-baseline\src\components\contact\get-in-touch\GetInTouch.tsx` (see `examples/01-contact-getintouch.md`)
- `<Info>` — `tuitionalFrontend-mui-baseline\src\components\contact\info.tsx`

## §5 Tailwind port status

**Discrepancies** in the port (`tuitionalFrontend\src\app\contact\page.tsx`):

1. **Line 22**: `<Header heroClassName="h-[80px] sm:h-[90px] md:h-[100px] lg:h-[110px] ...">` — MUI baseline declares `height: { xs: 100, sm: 100, md: 200, lg: 200 }px`. The Tailwind port maps:
   - xs 80 vs MUI 100 (off by 20px)
   - md 100 vs MUI 200 (off by 100px — **half the intended height**)
   - lg 110 vs MUI 200 (off by 90px)
   Fix: `h-[100px] md:h-[200px]`.
2. **Line 24**: `pt-[100px] sm:pt-[110px] md:pt-[120px] lg:pt-[130px]` — MUI baseline: `paddingTop: { xs: 120, sm: 150, md: 200, lg: 210 }`. Off by 20-100px at every breakpoint. Fix: `pt-[120px] sm:pt-[150px] md:pt-[200px] lg:pt-[210px]`.
3. Container/max-width values (1450px, `5vh`/`3vh` margins on Info wrapper) match.

## §6 Verification at 4 widths
- 375 | 768 | 1280 | 1920

The colored header strip should be `100px` tall up to 768, then jump to `200px` at md (900px+). On the port it currently stays at `100px` until lg and even then only grows to `110px` — visibly thin. Fix above.

## §7 SEO / metadata

```ts
export const metadata: Metadata = {
  title: "Contact Tuitional Support for your enquiries",
  description: "Contact Tuitional to gain academic support ...",
  alternates: { canonical: `${SITE_URL}/contact` },
};
```

Preserved in Tailwind port. No JSON-LD.
