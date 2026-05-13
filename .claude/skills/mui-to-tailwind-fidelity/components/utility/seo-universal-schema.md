# Component — `UniversalSchema`

Server-rendered `application/ld+json` blob (or set of blobs) injected via `next/script`. Pure JSON-LD payload — **no rendered UI**, no DOM-visible elements, no styling.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\seo\UniversalSchema.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\seo\UniversalSchema.tsx` |

## §1 No UI surface

`UniversalSchema` renders only `<Script id="..." type="application/ld+json">…</Script>` elements. The browser does not paint anything from these scripts — they emit JSON-LD metadata consumed by search engines (Google, Bing) and social previews.

There is no:

- HTML layout / DOM tree to inspect
- Typography / fonts / colors
- Margins / padding / spacing
- Breakpoint behavior
- Animations or transitions
- Hover / focus states
- RTL considerations (no rendered text)

## §2 Tailwind port — content delta (not a UI bug)

The MUI source emits **~26 separate `<Script>` tags** (Organization, BreadcrumbList, EducationalOrganization, LocalBusiness, WebSite, ItemList, multiple Course schemas, FAQPage, Offer, Brand, OpeningHoursSpecification, ContactPoint × 2, PostalAddress, ImageObject, Event, founders Person × 2, Service, HowTo, WebPage, extended Organization, extended LocalBusiness).

The Tailwind port consolidates everything into **one `<Script id="universal-schema">`** with a single `@graph` array. The graph contains: Organization, WebSite, WebPage, EducationalOrganization, LocalBusiness, ProfilePage, Service × 6, HowTo, BreadcrumbList, Article, Review × 3, ItemList, SiteNavigationElement.

### Differences

| Aspect | MUI | Tailwind port |
|---|---|---|
| Script count | ~26 separate `<Script>` tags | 1 `<Script>` with `@graph` |
| Founders | 2 (Ahmed Shaheer, Mirza Sinan Baig) | 5 (adds Abdul Wahid Sheikh, Sheikh Zeeshan Ahmed, Juliana Nogueria) |
| `foundingDate` | 2022 | 2020 |
| `aggregateRating.ratingValue` | 4.8 (1089 reviews) | 4.7 (108 reviews) |
| `priceRange` | "$$$" | "$$$" |
| Opening hours | Mo-Fr 09:00-21:00 | Mo-Su 09:00-18:00 (with `validFrom` / `validThrough`) |
| Countries served | AE, SA, KW, OM, QA, BH | AE, SA, QA, OM, BH, GB, ES (drops KW; adds UK, Spain) |
| Languages | en, ar | en, ar |
| Course schemas | IGCSE, GCSE, A-Level, Grades 6-8 (4 separate Course tags) | Subsumed into Service tags under @graph |
| Offer / Brand / Event / opening-hours / contact-point / etc. | Each its own `<Script>` | Folded into @graph or omitted |

None of these are UI bugs — they're **content / SEO strategy decisions** owned by the marketing / engineering team. The "fidelity" framing in this skill does not apply to schema content; the goal of this spec is to flag the divergence so any future restore-fidelity request goes through SEO review rather than blind copy-paste.

## §3 Recommended action

None from the MUI→Tailwind fidelity perspective. If the SEO team wants the port to match the MUI baseline 1:1, they should:

1. Decide which version (26-script vs 1-graph) is the canonical source of truth — likely the @graph (more modern, easier for crawlers, recommended by Google).
2. Reconcile content deltas above (founders list, ratingValue, foundingDate, areaServed, hours).
3. Update **once** in the Tailwind port; do not touch MUI baseline (read-only).

If the goal is **byte-for-byte fidelity**, copy the MUI source verbatim. But the port already represents a deliberate consolidation that is arguably better for SEO.

## §4 Verification

Not applicable — no visual surface. Verify via:

- `view-source:` on any page that renders `<UniversalSchema />` and confirm the JSON-LD validates at https://validator.schema.org/.
- Google Rich Results Test: https://search.google.com/test/rich-results.
- Confirm there are no duplicate `@id` values within the graph (a common bug).
- Confirm `inLanguage` reflects the active locale (the port sets `inLanguage: "en"` on WebPage and `["en","ar"]` on WebSite — verify this matches actual coverage).

## §5 RTL notes

Not applicable — JSON-LD is text content for crawlers; it has no rendered direction. The `inLanguage: "ar"` declaration is correctly listed; that's the only locale signal needed at the schema layer.
