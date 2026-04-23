# tuitionalFrontend — Context

> Quick-orientation document for agents and new contributors. The **code is the source of truth** — if this file and a file in `src/` disagree, update this file.

---

## 1. What This Project Is

Public-facing marketing / lead-generation site for **Tuitional** (online tutoring for the Gulf region, British curricula — IGCSE, GCSE, A-Level, O-Level). Next.js 14 App Router, server-rendered with per-slug dynamic pages, reading content authored in the sibling **TuitionalCMS** repo.

- Live site: `https://tuitionaledu.com`
- Companion admin: `../TuitionalCMS` (writes the Firestore documents this app reads)
- Audience: students/parents in UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman; bilingual (EN + AR with full RTL)

---

## 2. Stack

| Concern | Choice |
|---|---|
| Framework | Next.js **14.2.35** (App Router) + React 18 + TypeScript 5 (`strict: true`) |
| UI library | `@mui/material` + `@mui/icons-material` |
| Style engine | `@emotion/react` + `@emotion/styled` |
| Authoring style | **Mixed**: MUI `sx` props AND per-component `*.module.css` files. Both are accepted here (unlike TuitionalCMS, which bans CSS modules). |
| Fonts | `League Spartan` (EN), `Inter`, `Noto Sans Arabic` — all via `next/font/google` in [src/app/fonts.ts](src/app/fonts.ts) |
| Backend | Firebase Web SDK 10 — Firestore (content reads only, no writes) |
| i18n | Home-grown: [src/context/language-context.tsx](src/context/language-context.tsx) + JSON dictionaries in [src/locales/](src/locales/) |
| HTTP | `axios` |
| Analytics | GA4 + GTM + Facebook Pixel (inline in [src/app/layout.tsx](src/app/layout.tsx)) + Microsoft Clarity |
| Carousels | `swiper` |
| Dates | `moment` |
| Toasts | `react-hot-toast` |
| Package manager | **npm** (lockfile: `package-lock.json`) — note: CMS uses yarn, this repo uses npm |

### Scripts
| Script | Effect |
|---|---|
| `npm run dev` | Dev server (port 3000 by default) |
| `npm run build` | Production build |
| `npm run build:analyze` | Build with bundle analyzer (`ANALYZE=true`) |
| `npm start` | Production server |
| `npm run lint` | `next lint` |

No test suite exists.

---

## 3. Repository Layout

```
tuitionalFrontend/
├── next.config.mjs              ← image remote patterns + extensive legacy redirects + webpack chunk-splitting
├── next-sitemap.config.js
├── performance-test.js
├── global.d.ts                  ← audio module declarations (mp3/wav via file-loader)
├── public/                      ← static assets (images, icons, audio)
└── src/
    ├── app/                     ← App Router
    │   ├── layout.tsx           ← root providers, font variables, Pixel init, GTM noscript
    │   ├── page.tsx             ← home
    │   ├── globals.css
    │   ├── style.css
    │   ├── fonts.ts             ← League Spartan / Inter / Noto Sans Arabic
    │   ├── sitemap.ts           ← pulls slugs from Firestore
    │   ├── robots.txt
    │   ├── not-found.tsx
    │   ├── metrics/             ← GA4, GTM, Clarity, Facebook Pixel tracker components
    │   ├── api/
    │   │   ├── location/route.ts
    │   │   └── meta-conversion/route.ts   ← server-side Facebook Conversions API proxy
    │   ├── assets/              ← shared CSS + theme (`assets/css/theme.ts`)
    │   ├── online/              ← /online + /online/[slug] dynamic tutoring pages
    │   ├── blog/                ← /blog, /blog/[slug], /blog/category/[slug], /blog/tag/[slug]
    │   ├── igcse/               ← dedicated IGCSE landing page
    │   ├── gcse/, a-level/      ← curriculum landing pages
    │   ├── pricing/
    │   ├── about/, contact/, careers/, testimonials/, thank-you/
    │   ├── curiculume/, maincuriculume/   ← note: misspelled legacy routes, keep as-is
    │   ├── privacy-policy/, terms-and-conditions/
    │   ├── 404/
    │   └── ar/                  ← Arabic mirrors of the above
    │       ├── page.tsx
    │       ├── online/          ← /ar/online, /ar/online/[slug]
    │       ├── blog/            ← full Arabic blog tree
    │       ├── pricing/, about/, contact/, testimonials/, careers/
    │       └── privacy-policy/, terms-and-conditions/
    ├── components/
    │   ├── header.tsx, header-v2.tsx, header-v3.tsx
    │   ├── footer.tsx, footerV2.tsx, footer-wrapper.tsx, server-footer.tsx
    │   ├── ar-header.tsx, ar-footer.tsx, ar-server-footer.tsx
    │   ├── drawer.tsx           ← mobile nav (dynamic-imported in layout)
    │   ├── html-wrapper.tsx     ← sets <html lang/dir> from useI18n
    │   ├── language-switcher.tsx, route-language-switcher.tsx
    │   ├── grade-subject-level/ ← V1 + V2 tutoring page renderers (EN + AR variants)
    │   ├── home/                ← filter, form dialog, FAQs, trusted, tutor modal (EN + AR variants)
    │   ├── blog/                ← hero, search, cards, sequences, CTAs, tags (EN + AR variants)
    │   ├── pricing/             ← PackageCard, CustomPricingCard, modals, country selector (EN + AR)
    │   ├── countdown/           ← CountdownTimer (reads `countdown/igcse-offer`)
    │   ├── curiculume/, maincuriculume/, about/, careers/, contact/, testimonials/
    │   ├── tutor-section/, school-logos-section/, teacher-card/, trustpilot-*/
    │   ├── seo/UniversalSchema  ← JSON-LD injected in <head>
    │   ├── page-view-tracker.tsx, performance-monitor.tsx
    │   └── index.ts             ← barrel export
    ├── context/                 ← DrawerProvider + I18nProvider (singular folder name — legacy)
    │   ├── drawer-context.tsx
    │   └── language-context.tsx
    ├── hooks/
    │   └── useI18n.ts
    ├── locales/
    │   ├── en.json
    │   └── ar.json
    ├── services/                ← all Firestore reads live here
    │   ├── grade-subject-level/ ← pages, blogs, component sequence, sitemap slugs
    │   ├── filter-data/         ← curriculum / grade / subject dropdowns
    │   ├── pricing/, contact-form/, email-service/, faqs/, footer/
    │   ├── get-started/, dropdown/, testimonials/, video-reviews/
    │   ├── reviews-on-wp/, trusted-schools/, countdown/
    ├── types/
    │   ├── grade-subject-level.types.ts   ← PageData, AllBlogsData, Component_Sequence_Type
    │   ├── i18n.types.ts
    │   └── pricing.ts
    ├── utils/
    │   ├── env.ts               ← SITE_URL, email constants, Pixel ID/TOKEN (hardcoded)
    │   ├── helper.ts, globalFunction.tsx, constants.ts
    │   ├── slugHelper.ts, subject-translations.ts, pricing-helpers.ts
    │   └── middleware.ts
    ├── axios/                   ← axios base config
    └── firebaseConfig/
        └── config.ts            ← Firestore init (public Web SDK keys — safe to commit)
```

### Legacy quirks to preserve
- `curiculume/` and `maincuriculume/` folders — misspelled intentionally; imports and live URLs depend on this. **Do not "fix" the spelling.**
- `context/` is singular here (vs `contexts/` plural in TuitionalCMS). Keep as-is.
- Arabic components use both PascalCase (`ArHero.tsx`) and kebab-case (`ar-header.tsx`) depending on vintage — follow the local file's convention.
- `react-beautiful-dnd` is not in this repo (it was a TuitionalCMS concern); no DnD here.

---

## 4. i18n / RTL Architecture

- **Two top-level language roots**: English pages live at `/…`, Arabic pages at `/ar/…`. Route detection in [src/context/language-context.tsx](src/context/language-context.tsx) sets `locale` to `'ar'` when `window.location.pathname.startsWith('/ar')`, else `'en'`.
- **Translation function**: `const { t, locale, isRTL, setLocale } = useI18n()`. Call as `t("some.nested.key")` against [src/locales/en.json](src/locales/en.json) / [src/locales/ar.json](src/locales/ar.json). Missing keys fall back to EN, then to the key string itself. **Unlike TuitionalCMS, `t` IS a function here — do not refactor to an object pattern.**
- **RTL mirroring**: [src/components/html-wrapper.tsx](src/components/html-wrapper.tsx) sets `<html dir>` and `lang`. There is no `stylis-plugin-rtl` — direction is mirrored by explicit styles and by using Arabic-specific component variants (`ArHeader`, `ArHero`, `ArForm`, etc.).
- **Component duplication pattern**: most visual surfaces have a paired Arabic version (`components/blog/hero/Hero.tsx` ↔ `components/blog/ar-hero/ArHero.tsx`). The `/ar/**` page files import the `Ar*` variants. When editing a surface, check whether the Arabic twin needs the same change.

---

## 5. Data Model (Firestore)

All reads go through [src/services/**](src/services/) — components should not call the Firebase SDK directly. Writes happen in the CMS, not here.

| Collection | Doc ID | What it holds |
|---|---|---|
| `grade-subject-level-en` / `grade-subject-level-ar` | URL slug | `PageData` for `/online/[slug]` and `/ar/online/[slug]`. Section-keyed object with `sequenceNumber` per section. |
| `blogs-v1-en` / `blogs-v1-ar` | URL slug | Blog post `PageData` (hero, content, author, FAQs, tags, related, CTA). |
| `component-sequence-en` / `-ar` | collection name | Ordered `{ sections: { name, placment }[] }` for fixed-sequence rendering. Note misspelling `placment` — preserved from CMS. |
| `page-categories-en` / `-ar` | auto | Category templates referenced by listing pages. |
| `custom-pricing`, `tutoring-packages{-lang}` | auto | Pricing / package data consumed by `/pricing` and `/ar/pricing`. |
| `dropdown-items{-lang}/educational-options` | fixed | Catalogue of grades/levels/subjects/countries/currencies for filter forms. |
| `countdown/igcse-offer` | fixed | Global countdown displayed on `/igcse` via [CountdownTimer](src/components/countdown/). |

### Two renderer variants
[src/app/online/[slug]/page.tsx](src/app/online/[slug]/page.tsx) branches on `data.variant`:
- `variant === "new"` → `GradeSubjectLevelV2` (object-entries iteration, sorted by `sequenceNumber`)
- else → `GradeSubjectLevel` (uses a separate `component-sequence-*` doc and sorts by `placment`)

Both variants still exist in the wild; don't remove either.

---

## 6. Routing Map (Summary)

| Route | File |
|---|---|
| `/` | [src/app/page.tsx](src/app/page.tsx) |
| `/online`, `/online/[slug]` | [src/app/online/](src/app/online/) |
| `/blog`, `/blog/[slug]`, `/blog/category/[slug]`, `/blog/tag/[slug]` | [src/app/blog/](src/app/blog/) |
| `/igcse`, `/gcse`, `/a-level` | curriculum landing pages |
| `/pricing` | [src/app/pricing/](src/app/pricing/) |
| `/about`, `/contact`, `/careers`, `/testimonials`, `/thank-you` | static pages |
| `/privacy-policy`, `/terms-and-conditions` | legal pages |
| `/curiculume`, `/maincuriculume` | legacy curriculum pages (misspelled — keep) |
| `/ar/**` | Arabic mirrors of all of the above |
| `/api/location` | server geo-IP helper |
| `/api/meta-conversion` | server-side Facebook Conversions API endpoint |
| `/sitemap.xml` | generated in [src/app/sitemap.ts](src/app/sitemap.ts) |
| `/robots.txt` | [src/app/robots.txt](src/app/robots.txt) |

[next.config.mjs](next.config.mjs) carries a large block of **permanent legacy redirects** (from the old WordPress site). Add new redirects there; do not `redirect()` in route files unless the mapping is dynamic.

---

## 7. Performance Posture

- `experimental.optimizePackageImports`: MUI + Emotion tree-shaking.
- Custom webpack `splitChunks`: separate `mui` and `vendor` chunks.
- `next/image` everywhere — image `remotePatterns` allow `firebasestorage.googleapis.com`, `img.icons8.com`, `cdn-icons-png.flaticon.com`, `www.facebook.com/tr*`. **Don't add new hostnames without updating [next.config.mjs](next.config.mjs).**
- Dynamic imports for non-critical components (mobile drawer, heavy below-the-fold surfaces).
- `productionBrowserSourceMaps: false`, `compress: true`, `swcMinify: true`.
- Fonts: all three families use `display: "swap"` + `adjustFontFallback`. `notoSansArabic` has `preload: false` because it's only needed on `/ar/**`.
- Facebook Pixel is init'd inline (`strategy="afterInteractive"`) and additionally tracked on route changes via [src/app/metrics/pixel-tracker.tsx](src/app/metrics/pixel-tracker.tsx).

Refer to [PERFORMANCE_OPTIMIZATION_PLAN.md](PERFORMANCE_OPTIMIZATION_PLAN.md) for the longer roadmap.

---

## 8. Environment, Secrets, and Known Debt

- [src/utils/env.ts](src/utils/env.ts) hardcodes `SITE_URL`, email aliases, **Facebook Pixel ID and PIXEL_TOKEN**. The PIXEL_TOKEN is a long-lived access token for the Conversions API — treat as a secret-in-source debt item and do not propagate the pattern.
- Firebase config in [src/firebaseConfig/config.ts](src/firebaseConfig/config.ts) uses the public Web SDK keys (these are fine to commit).
- Inline analytics IDs in [src/app/layout.tsx](src/app/layout.tsx): GTM container `GTM-NG7HWSZT`, Pixel `1950457082424995`, Facebook domain verification meta. Don't rotate casually.
- No `.env` loading pattern is wired in — adding one requires updating affected modules.

---

## 9. Relationship to the CMS

- **TuitionalCMS** (`../TuitionalCMS`) is the **write** side — admins edit pages, blogs, pricing, dropdowns, and component sequences there. Documents land in the Firestore collections listed in §5.
- **This app** is the **read** side — it renders those documents for the public.
- Schema changes that affect rendering (new section names, new field shapes, renames) must be coordinated across both repos. When in doubt, consult `../TuitionalCMS/architecture.md` for field-level specifics.
- The `-en` / `-ar` collection-suffix convention is shared between the two repos; don't diverge it.

---

## 10. Quick-Reference Files

- [src/app/layout.tsx](src/app/layout.tsx) — root providers, font variables, analytics scripts
- [src/context/language-context.tsx](src/context/language-context.tsx) — i18n + `useI18n()`
- [src/context/drawer-context.tsx](src/context/drawer-context.tsx) — mobile nav state
- [src/services/grade-subject-level/grade-subject-level.ts](src/services/grade-subject-level/grade-subject-level.ts) — primary content reader
- [src/types/grade-subject-level.types.ts](src/types/grade-subject-level.types.ts) — page/blog/sequence types
- [src/app/fonts.ts](src/app/fonts.ts) — font registration (the only place to add fonts)
- [src/utils/env.ts](src/utils/env.ts) — site-wide constants
- [next.config.mjs](next.config.mjs) — redirects + image hosts + bundle splitting
- [src/app/sitemap.ts](src/app/sitemap.ts) — dynamic sitemap generation

---

**End.** Update this file in the same PR whenever the routing tree, Firestore collection set, provider stack, or redirect list changes meaningfully.
