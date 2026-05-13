# Page — `/pricing`

Tutoring packages page. Server fetches `getDropdownOptions("en")` and parses URL filter params (grade/subject/curriculum/country with a USA fallback), then defers all rendering to the lazy-loaded `<PricingPageClient>`.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\app\pricing\page.tsx` |
| Tailwind port | `tuitionalFrontend\src\app\pricing\page.tsx` |
| Arabic variant | `/ar/pricing` — uses ar-* components; same section sequence. |

## §1 Section sequence (MUI source)

```tsx
<Header />
<main className={styles.main}>
  <PricingPageClient
    initialFilters={initialFilters}
    dropdownOptions={dropdownOptions}
  />
</main>
<Footer />
```

The page is a thin server shell. `<PricingPageClient>` handles the entire page body (filters, package cards, FAQs, CTA) — see `examples/05-package-card.md` for the per-card spec.

## §2 Page-level layout rhythm

All rhythm lives in `pricing.module.css` (`.main`) and inside `<PricingPageClient>`. The page-level file declares no inline `Box sx` margins.

| CSS-Modules selector | Purpose | Tailwind equivalent (informational) |
|---|---|---|
| `.main` | Outer wrapper around the client component | n/a (module CSS reused) |

The loading fallback uses inline styles: `min-height: 50vh; display: flex; align-items: center; justify-content: center`.

## §3 Container / max-width rules

- The `<main>` element receives `pricing.module.css .main` (typically full-width with horizontal gutters).
- The client component owns its own max-width on inner blocks (filter row, card grid).
- Sticky-header compensation lives inside `.main` (paddingTop ladder).

## §4 Section components used

- `<Header>` — `tuitionalFrontend-mui-baseline\src\components\header.tsx` (lazy at root)
- `<PricingPageClient>` — `tuitionalFrontend-mui-baseline\src\components\pricing\PricingPageClient.tsx` (lazy with SSR enabled, has its own loading skeleton)
- `<Footer>` (footer-wrapper) — lazy without SSR

Internal rendering inside `<PricingPageClient>`:
- Filter row (grade, subject, curriculum, country dropdowns)
- Package card grid (see `examples/05-package-card.md`)
- FAQ accordion
- Bottom CTA

## §5 Tailwind port status

The port (`tuitionalFrontend\src\app\pricing\page.tsx`) should mirror the MUI shell exactly: `<Header />` + `<main className={styles.main}>` + lazy client + `<Footer />`. Audit:

- Same `pricing.module.css` import? — yes (both repos use module CSS for the shell).
- Same lazy boundaries? — verify `<PricingPageClient>` and `<Footer>` are still `dynamic()`-wrapped.
- No extra `<Box sx>` → `<div className>` translations to introduce at page level. Layout work belongs inside `<PricingPageClient>`.

## §6 Verification at 4 widths
- 375 | 768 | 1280 | 1920

The page-level shell has nothing to verify visually beyond sticky-header clearance. All visual checks (filter row wrap, card grid columns, FAQ accordion typography) live in `<PricingPageClient>`.

## §7 SEO / metadata

```ts
export const metadata: Metadata = {
  title: "Tutoring Packages & Pricing | Tuitional",
  description: "Choose from our flexible tutoring packages ...",
  keywords: "tutoring packages, online tutoring prices, ...",
  openGraph: {
    title: "Tutoring Packages & Pricing | Tuitional",
    description: "Find the perfect tutoring package ...",
    type: "website",
  },
};
```

Preserve all metadata fields verbatim in the port. No JSON-LD on this page (despite the marketing nature — could be added later).
