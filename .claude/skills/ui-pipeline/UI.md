---
name: tuitionalFrontend UI Pipeline
description: Stage 3 of the SDLC. File templates, folder conventions, and authoring idioms for the public marketing site. Loaded after Design.md locks the tokens; feeds QA.md for verification next.
type: ui-pipeline
---

# tuitionalFrontend — UI Pipeline (SDLC Stage 3)

> **Where you are in the pipeline:** You arrived here from [Design.md](./Design.md) with tokens and patterns chosen. This file gives you the implementation skeleton — file layout, imports order, component templates, bilingual idioms. After authoring, continue to [QA.md](./QA.md) to verify.
> **Version:** 2.0.0 (tailored from the CMS pipeline) | **Scope:** `src/` directory of `tuitionalFrontend`
> **Cross-reference:** Always keep [RULES.md](./RULES.md) loaded — this file gives the "how to build"; RULES.md gives the "what is forbidden".

---

## 0. SDLC Navigation Band

```
Development.md ───► Design.md ───►  [UI.md — you are here]  ───► QA.md
                                              ▲
                                              │  always consult
                                              ▼
                                         RULES.md
```

| If you need to… | Go to |
|---|---|
| Understand the task / find the right file for a symptom | [Development.md §2 Context Map](./Development.md) |
| Confirm a design token | [Design.md §1–4](./Design.md) |
| Confirm a rule (forbidden APIs, foundation files) | [RULES.md](./RULES.md) |
| Verify before shipping | [QA.md §QA-02, §QA-05, §QA-06](./QA.md) |

---

## 1. Repository Shape — the authoritative map

```
tuitionalFrontend/
├── next.config.mjs          ← image remote hosts, redirects, chunk splitting [foundation]
├── src/
│   ├── app/
│   │   ├── layout.tsx       ← root providers, font variables, analytics [foundation]
│   │   ├── page.tsx         ← home EN
│   │   ├── globals.css      ← RTL, base typography [foundation]
│   │   ├── style.css        ← shared styles [foundation]
│   │   ├── fonts.ts         ← leagueSpartan, inter, notoSansArabic [foundation]
│   │   ├── sitemap.ts       ← sitemap generator (reads Firestore slugs)
│   │   ├── robots.txt
│   │   ├── not-found.tsx
│   │   ├── 404/             ← explicit 404 route
│   │   ├── metrics/         ← GTM, GA4, Clarity, Pixel trackers [foundation-adjacent]
│   │   ├── api/
│   │   │   ├── location/    ← /api/location — geo-IP lookup
│   │   │   └── meta-conversion/ ← /api/meta-conversion — FB server-side events
│   │   ├── assets/css/
│   │   │   ├── theme.ts            [foundation]
│   │   │   ├── typographyTokens.ts [foundation]
│   │   │   └── typography.css
│   │   ├── online/[slug]/   ← grade-subject-level dynamic route (EN)
│   │   ├── blog/            ← /blog tree
│   │   ├── igcse/ gcse/ a-level/
│   │   ├── pricing/
│   │   ├── about/ contact/ careers/ testimonials/ thank-you/
│   │   ├── curiculume/ maincuriculume/   ← legacy misspellings, DO NOT rename
│   │   ├── privacy-policy/ terms-and-conditions/
│   │   └── ar/              ← Arabic mirror tree (about/, blog/, careers/, contact/,
│   │                           online/, pricing/, privacy-policy/, terms-and-conditions/,
│   │                           testimonials/, page.tsx)
│   ├── components/          ← feature-scoped folders + top-level primitives
│   ├── context/             ← SINGULAR here. DrawerProvider + I18nProvider only
│   │   ├── drawer-context.tsx    [foundation]
│   │   └── language-context.tsx  [foundation]
│   ├── hooks/
│   │   └── useI18n.ts            [foundation]
│   ├── locales/
│   │   ├── en.json          ← EN translations
│   │   └── ar.json          ← AR translations
│   ├── services/            ← Firestore reads
│   │   ├── contact-form/
│   │   ├── countdown/
│   │   ├── dropdown/
│   │   ├── email-service/
│   │   ├── faqs/
│   │   ├── filter-data/
│   │   ├── footer/
│   │   ├── get-started/
│   │   ├── grade-subject-level/   ← page + blog + sequence + sitemap slugs
│   │   ├── pricing/
│   │   ├── reviews-on-wp/
│   │   ├── testimonials/
│   │   ├── trusted-schools/
│   │   └── video-reviews/
│   ├── types/
│   │   ├── grade-subject-level.types.ts
│   │   ├── i18n.types.ts
│   │   └── pricing.ts
│   ├── utils/
│   │   ├── constants.ts
│   │   ├── env.ts            ← SITE_URL + PIXEL_TOKEN [foundation-adjacent]
│   │   ├── globalFunction.tsx
│   │   ├── helper.ts
│   │   ├── middleware.ts
│   │   ├── pricing-helpers.ts
│   │   ├── slugHelper.ts
│   │   └── subject-translations.ts
│   ├── axios/                ← axios base config
│   └── firebaseConfig/
│       └── config.ts         ← Firestore init [foundation]
```

### Differences from the CMS (don't conflate)

| Concern | This repo | CMS |
|---|---|---|
| Context folder | `src/context/` (singular) | `src/contexts/` (plural) + singular legacy |
| Styling | `sx` **OR** CSS modules | `sx` ONLY (CSS modules banned) |
| `t` | **Function**: `t("key.path")` | Plain object: `t.key` |
| Form helper | none — inline with `useI18n()` | `useFormTranslations()` mandatory |
| DnD | absent | `@hello-pangea/dnd` |
| Rich text | absent | Quill |
| Package manager | `npm` | `yarn` |
| Direction | READS Firestore | WRITES Firestore |

---

## 2. Where to put a new file — quick reference

| What you're building | Put it in |
|---|---|
| A new top-level page | `src/app/<route>/page.tsx` (+ `src/app/ar/<route>/page.tsx` mirror) |
| A new dynamic page | `src/app/<route>/[slug]/page.tsx` (+ AR mirror) |
| A section component for an existing feature | `src/components/<feature>/<name>.tsx` + `ar-<name>.tsx` twin |
| A new feature folder | `src/components/<feature>/` — add EN and AR files in parallel |
| A reusable primitive (button, chip, input) | `src/components/<name>.tsx` at the top level |
| A Firestore read | `src/services/<domain>/` |
| A TypeScript type | `src/types/<domain>.types.ts` |
| A translation string | BOTH `src/locales/en.json` AND `src/locales/ar.json` |
| A redirect rule | `next.config.mjs` redirects() (foundation → approval) |
| A utility helper | `src/utils/<name>.ts` |

### ✅ DO
- Mirror file location between EN and AR (the twin lives next to the EN file or in a sibling folder).
- Add a new type when extending data shape — don't duplicate existing interfaces.

### ❌ DON'T
- Don't create a `src/contexts/` (plural) folder — contexts live in `src/context/` here.
- Don't create a shared `src/styles/` directory — CSS modules live next to their `.tsx`.
- Don't author a new page without its AR mirror (unless documented as EN-only).

---

## 3. Server vs Client Component Rules

### Server Component (default, `app/**/page.tsx`)

```tsx
// src/app/blog/[slug]/page.tsx
import { getBlogData } from "@/services/grade-subject-level/grade-subject-level";
import { redirect } from "next/navigation";
import BlogView from "@/components/blog/blog-view"; // or Arabic twin

const Page = async ({ params }: { params: { slug: string } }) => {
  const data = await getBlogData(params.slug, "en");
  if (!data) return redirect("/404");
  return <BlogView data={data} />;
};

export default Page;
```

#### ✅ DO
- Keep `page.tsx` files server-rendered.
- `await` service calls directly.
- Pass data down as props.
- Use `redirect("/404")` for not-found — matches existing convention.
- Export `generateMetadata` for SEO when the page has a dynamic title/description.

#### ❌ DON'T
- Don't add `"use client"` to `page.tsx`.
- Don't use `notFound()` — stick with `redirect("/404")`.
- Don't call Firebase SDK directly in a page.tsx — route through `src/services/`.

### Client Component (`components/**/*.tsx`, any file with hooks/state)

```tsx
"use client";

import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useI18n } from "@/hooks/useI18n";

interface FooSectionProps {
  data: SomeType;
}

const FooSection: React.FC<FooSectionProps> = ({ data }) => {
  const { t, isRTL, isArabic } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <Box sx={styles.root}>
      <Typography variant="h2" sx={{ textAlign: isArabic ? "right" : "left" }}>
        {t("foo.heading")}
      </Typography>
    </Box>
  );
};

export default FooSection;

const styles = {
  root: {
    padding: { xs: "2rem 1rem", md: "4rem 2rem" },
  },
};
```

#### ✅ DO
- Start the file with `"use client";` on line 1.
- Receive data as props from a server component parent.
- Use `useI18n()` for any user-facing string.

#### ❌ DON'T
- Don't call Firebase SDK (`getDoc`, `setDoc`, `collection`, `query`) anywhere in a client component.
- Don't fetch on render — if you need client-time data, use `/api/location` for geo-IP via the established pattern.
- Don't call services from a client component unless it's a clearly client-only scenario (geo-IP, form submit).

---

## 4. File Template — Pattern A (`sx` + styles object)

Use this for most components. Preferred when styles are simple and you want to stay within MUI's system.

```tsx
"use client";

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { ArrowForwardRounded } from "@mui/icons-material";
import Link from "next/link";
import { useI18n } from "@/hooks/useI18n";
import type { HeroData } from "@/types/grade-subject-level.types";

interface HeroProps {
  data: HeroData;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  const { t, isRTL, isArabic } = useI18n();

  return (
    <Box sx={styles.hero}>
      <Typography component="h1" variant="h1" sx={styles.heading}>
        {data.title}
      </Typography>
      <Typography variant="body1" sx={styles.desc}>
        {data.description}
      </Typography>
      <Button
        component={Link}
        href={isArabic ? "/ar/online" : "/online"}
        sx={styles.cta}
        endIcon={<ArrowForwardRounded />}
      >
        {t("buttons.book_a_demo")}
      </Button>
    </Box>
  );
};

export default Hero;

const styles = {
  hero: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: { xs: "3rem 1rem", md: "6rem 2rem" },
    textAlign: "center" as const,
    backgroundColor: "#D7F0FF",
  },
  heading: {
    color: "#000",
    marginBottom: "1.5rem",
    maxWidth: "800px",
  },
  desc: {
    color: "#2d2d2d",
    marginBottom: "2.5rem",
    maxWidth: "720px",
  },
  cta: {
    backgroundColor: "#38B6FF",
    color: "#ffffff",
    borderRadius: "10px",
    padding: "1rem 1.5rem",
    fontWeight: 700,
    textTransform: "none",
    boxShadow: "1px 4px 24px 0px #38B6FFB2",
    ":hover": {
      backgroundColor: "#38B6FF",
      boxShadow: "1px 4px 24px 0px #38B6FFB2",
    },
  },
};
```

### ✅ DO
- Keep `const styles = {...}` at the bottom of the file.
- Cast literal `textAlign` with `as const` to keep TypeScript happy.
- Pull token values from [Design.md §1–4](./Design.md) verbatim.

### ❌ DON'T
- Don't interleave styles with JSX.
- Don't mix `styled()` into this pattern.
- Don't reference `theme.*` inside these objects.

---

## 5. File Template — Pattern B (CSS Module)

Use this when you need complex descendant selectors, pseudo-elements, or shared keyframes. Follow the shape in [components/pricing/](src/components/pricing/).

### `PackageCard.tsx`

```tsx
"use client";

import React, { memo } from "react";
import { Typography } from "@mui/material";
import { leagueSpartan } from "@/app/fonts";
import styles from "./PackageCard.module.css";

interface PackageCardProps {
  title: string;
  price: number;
  isPopular?: boolean;
}

const PackageCard: React.FC<PackageCardProps> = memo(({ title, price, isPopular = false }) => {
  return (
    <div className={`${styles.card} ${isPopular ? styles.popular : ""}`}>
      <Typography className={`${styles.title} ${leagueSpartan.className}`}>{title}</Typography>
      <div className={styles.price}>
        <span className={styles.currency}>$</span>
        <span className={styles.amount}>{price}</span>
      </div>
    </div>
  );
});

PackageCard.displayName = "PackageCard";
export default PackageCard;
```

### `PackageCard.module.css`

```css
.card {
  background: #ffffff;
  border: 2px solid #f1f5f9;
  border-radius: 20px;
  padding: 40px 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.popular {
  background: #38b6ff;
  color: #ffffff;
  border-color: #38b6ff;
}

.title { font-size: 2rem; font-weight: 700; color: #1e293b; margin: 0; }
.popular .title { color: #ffffff; }

.price { display: flex; align-items: baseline; gap: 4px; }
.currency { font-size: 1.25rem; }
.amount { font-size: 3rem; font-weight: 700; }

@media (max-width: 599px) {
  .card { padding: 24px 20px; }
  .amount { font-size: 2.25rem; }
}
```

### ✅ DO
- Keep the `.module.css` next to the `.tsx` in the same folder.
- Use `@media (max-width: 1199px)` / `(max-width: 599px)` to stay aligned with the theme breakpoints.
- Use `memo` for list-item cards (pricing, blog cards).

### ❌ DON'T
- Don't create a shared `/styles/` directory.
- Don't mix `sx` and CSS module authoring for the **same** property — pick one per property.
- Don't import a global stylesheet into a component.

---

## 6. Arabic Twin Pattern

When the Arabic layout diverges significantly from EN, create a twin:

```
components/home/filter.tsx          ← EN
components/home/ar-filter.tsx       ← AR twin (mirrored layout, Arabic strings)

components/blog/hero/Hero.tsx       ← EN
components/blog/ar-hero/ArHero.tsx  ← AR twin (PascalCase mirrors file convention)
```

### Which convention to use?

| EN file casing | AR twin convention |
|---|---|
| `kebab-case.tsx` | `ar-<name>.tsx` (lowercase `ar-` prefix) |
| `PascalCase.tsx` inside scoped folder (e.g. `blog/hero/Hero.tsx`) | Same folder renamed with `ar-` prefix containing `Ar<Name>.tsx` — e.g. `blog/ar-hero/ArHero.tsx` |

Match the local convention of the feature folder you're in. Don't standardize across folders — the existing split is deliberate.

### Arabic route tree

[src/app/ar/](src/app/ar/) routes import the twin explicitly:

```tsx
// src/app/ar/page.tsx
import ArHome from "@/views/ar-home"; // or the appropriate twin
```

### ✅ DO
- Add the `/ar/<route>/page.tsx` alongside the new `/<route>/page.tsx`.
- Keep EN and AR twins structurally aligned to simplify future edits.

### ❌ DON'T
- Don't author only EN and assume RTL conditionals will cover AR — when layout diverges significantly, use a twin.
- Don't rename existing twins to "fix" inconsistent casing.

---

## 7. i18n Authoring Rules

### Using the hook

```tsx
import { useI18n } from "@/hooks/useI18n";

const { t, locale, isRTL, isArabic, isEnglish, setLocale, toggleLanguage } = useI18n();
```

Alternative (lighter surface): `import { useI18n } from "@/context/language-context"` → `{ t, locale, isRTL, setLocale }` only. **Prefer `@/hooks/useI18n` — it's a superset.**

### Looking up a key

```tsx
<Typography>{t("nav.home")}</Typography>
<Button>{t("buttons.book_a_demo")}</Button>
<p>{t("footer.copyright")}</p>
```

### Adding a new key

Both files, same structure:

```json
// src/locales/en.json
{
  "myFeature": {
    "title": "Featured Tutors",
    "description": "Meet our top-rated educators"
  }
}

// src/locales/ar.json
{
  "myFeature": {
    "title": "المعلمون المميزون",
    "description": "تعرف على كبار المعلمين لدينا"
  }
}
```

### Inline alternative (one-off strings)

```tsx
<Typography>{isArabic ? "مرحبا" : "Welcome"}</Typography>
```

Prefer JSON keys for anything reusable or that the marketing team might want to update.

### ✅ DO
- Call `t` as a **function**: `t("key.path")`.
- Add keys to BOTH `en.json` and `ar.json` in the same commit.
- Use dot-path nesting that mirrors the JSON.

### ❌ DON'T
- Don't call `t` as an object (`t.key`) — it throws. That's the CMS pattern, not this repo's.
- Don't import `@/locales/en.json` directly inside a component — always go through `t()`.
- Don't ship an English string that will render on `/ar/**`.

**If missing AR translations cause English leaks → Navigate to [src/locales/ar.json](src/locales/ar.json) and add the key.**

---

## 8. Styling Idioms

### MUI breakpoints inside `sx`

```tsx
<Box sx={{
  padding: { xs: "1rem", md: "2rem", lg: "3rem" },
  fontSize: { xs: "1rem", md: "1.125rem" },
}} />
```

### MUI breakpoints inside CSS modules

```css
.root { padding: 3rem; }
@media (max-width: 1199px) { .root { padding: 2rem; } }
@media (max-width: 599px)  { .root { padding: 1rem; } }
```

### Mixing `sx` and a CSS module on the same element

Allowed, but don't author the same property in both:

```tsx
<Typography
  className={styles.title}      // structural: font-family, letter-spacing
  sx={{ color: isArabic ? "#000" : "#1e293b" }}  // runtime value
/>
```

### Avoiding theme helpers inside `sx`

```tsx
// ❌ sx={{ color: theme.palette.primary.main }}
// ✅ sx={{ color: "#38b6ff" }}
// ✅ sx={{ color: "var(--color-accent)" }}
```

### ✅ DO
- Collapse identical breakpoint values: `{ xs: "20px", sm: "20px", md: "20px" }` → `"20px"`.
- Pair `vh`-driven input heights with a `minHeight` clamp (e.g. `minHeight: 48px`).

### ❌ DON'T
- Don't use `theme.breakpoints.up()` / `theme.breakpoints.down()` inside `sx`.
- Don't use `em` anywhere. Don't use `vw` for `font-size`.

---

## 9. Data & Service Rules

### Services live in `src/services/`

```
services/
├── contact-form/
├── countdown/
├── dropdown/
├── email-service/
├── faqs/
├── filter-data/             ← curriculum/grade/subject dropdowns
├── footer/
├── get-started/
├── grade-subject-level/     ← page + blog + sequence + sitemap slugs
├── pricing/
├── reviews-on-wp/
├── testimonials/
├── trusted-schools/
└── video-reviews/
```

### Calling from a Server Component

```tsx
const data = await getPageData(slug, "ar");
if (!data) return redirect("/404");
```

### Calling from a Client Component

You generally should NOT. Data arrives from the server component as props.

**Exceptions** that legitimately run client-side:
- Geo-IP lookup via `/api/location` (used by forms for Country/IP tracking — see `slugHelper.ts`'s `useGeoLocation`).
- Contact-form submission POSTs.
- Meta Conversions API forwarding via `/api/meta-conversion`.

### Collection naming

| Collection | Notes |
|---|---|
| `grade-subject-level-en` / `grade-subject-level-ar` | Marketing pages |
| `blogs-v1-en` / `blogs-v1-ar` | Blog posts |
| `component-sequence-en` / `component-sequence-ar` | Section ordering (note the `placment` misspelling in docs — preserve) |
| `page-categories-en` / `page-categories-ar` | Page templates |
| `custom-pricing` | Country-agnostic doc set |
| `tutoring-packages-en` / `tutoring-packages-ar` | Legacy package model |
| `dropdown-items-en` / `dropdown-items-ar` | Catalogue |
| `countdown/igcse-offer` | Fixed doc |

### ✅ DO
- Return `null` / `[]` / `undefined` on service failure.
- Resolve the collection name based on `locale` (e.g. `locale === "ar" ? "x-ar" : "x-en"`).
- Keep the `placment` misspelling intact in `component-sequence-*` reads.

### ❌ DON'T
- Don't throw from a service.
- Don't introduce `setDoc` / `addDoc` / `updateDoc` / `deleteDoc` — this repo is **READ-ONLY**.
- Don't "clean up" field names — the CMS writes them; renaming breaks everything.

---

## 10. Component Existence Check (BEFORE AUTHORING)

Before creating a new component, search in this order:

### 10.1 Feature folders

| Feature | Folder |
|---|---|
| Blog | [src/components/blog/](src/components/blog/) (+ `ar-*` twins) |
| Home | [src/components/home/](src/components/home/) (+ `ar-*` twins) |
| Pricing | [src/components/pricing/](src/components/pricing/) |
| Grade-Subject-Level | [src/components/grade-subject-level/](src/components/grade-subject-level/) |
| About | [src/components/about/](src/components/about/) |
| Careers | [src/components/careers/](src/components/careers/) |
| Contact | [src/components/contact/](src/components/contact/) |
| Countdown | [src/components/countdown/](src/components/countdown/) |
| Curriculum | [src/components/curiculume/](src/components/curiculume/), [src/components/maincuriculume/](src/components/maincuriculume/) **(preserve misspelling)** |
| Footer links | [src/components/footerLinks/](src/components/footerLinks/) |
| SEO | [src/components/seo/](src/components/seo/) |
| Testimonials | [src/components/testimonials/](src/components/testimonials/) |
| Trustpilot | [src/components/trustpilot-carousel/](src/components/trustpilot-carousel/), [src/components/trustpilot-review/](src/components/trustpilot-review/) |

### 10.2 Top-level primitives

| Concern | File |
|---|---|
| Select / autocomplete | [src/components/DropDown/](src/components/DropDown/) |
| Inputs | [src/components/custom-input/](src/components/custom-input/), [src/components/input/](src/components/input/), [src/components/textArea/](src/components/textArea/) |
| Lead-capture CTA | [src/components/pop-up-button.tsx](src/components/pop-up-button.tsx), [src/components/pop-up-buttonV2.tsx](src/components/pop-up-buttonV2.tsx) |
| Image card | [src/components/image-card/](src/components/image-card/) |
| Tag chips | [src/components/tag/](src/components/tag/), [src/components/tags/](src/components/tags/), [src/components/ar-tags/](src/components/ar-tags/) |
| Tutor card | [src/components/teacher-card/](src/components/teacher-card/) |
| Breadcrumb | [src/components/bread-crumb/](src/components/bread-crumb/) |
| Line break | [src/components/line-break-text.tsx](src/components/line-break-text.tsx) |
| Language switcher | [src/components/language-switcher.tsx](src/components/language-switcher.tsx), [src/components/route-language-switcher.tsx](src/components/route-language-switcher.tsx) |
| Tracking | [src/components/page-view-tracker.tsx](src/components/page-view-tracker.tsx), [src/components/performance-monitor.tsx](src/components/performance-monitor.tsx) |
| HTML wrapper | [src/components/html-wrapper.tsx](src/components/html-wrapper.tsx) **(foundation)** |

### 10.3 Headers & Footers (variants)

- Header: [header.tsx](src/components/header.tsx), [header-v2.tsx](src/components/header-v2.tsx), [header-v3.tsx](src/components/header-v3.tsx), [ar-header.tsx](src/components/ar-header.tsx).
- Footer: [footer.tsx](src/components/footer.tsx), [footerV2.tsx](src/components/footerV2.tsx), [server-footer.tsx](src/components/server-footer.tsx), [footer-wrapper.tsx](src/components/footer-wrapper.tsx), [ar-footer.tsx](src/components/ar-footer.tsx), [ar-server-footer.tsx](src/components/ar-server-footer.tsx).

### ✅ DO
- If a match exists → USE IT AS-IS.
- If you think an existing file must be changed: report the modification need and wait for approval ([RULES §RULE-05](./RULES.md) Zero Modification Rule).

### ❌ DON'T
- Don't create a parallel implementation of something that already exists.
- Don't refactor a neighbouring file on the side of a feature task.

---

## 11. Legacy Quirks (Tolerate, Don't "Fix")

Imports and live URLs depend on these names. **Never rename in passing.**

| Name | Reason |
|---|---|
| `curiculume/` route + folder | Live URLs indexed |
| `maincuriculume/` route + folder | Live URLs indexed |
| `form-dialouge.tsx`, `ar-form-dialouge.tsx`, `form-dialouge-v1.tsx` | Misspelling carried over from CMS |
| `students-says.tsx`, `students-says-v2.tsx` | Grammar (intentional) |
| `placment` field name in Firestore `component-sequence-*` docs | CMS schema |
| PascalCase twins (`Hero.tsx`, `ArHero.tsx`) inside `blog/`, `pricing/`, `teacher-card/` | Deliberate local convention |

### ✅ DO
- Preserve the exact spelling when reading / writing to these files.
- When adding sibling files, match the folder's existing casing (kebab OR Pascal, not both).

### ❌ DON'T
- Don't rename these in a refactor / cleanup PR.
- Don't replicate the PascalCase convention in new folders where kebab-case is the norm.

---

## 12. Analytics Integration (every page)

Do not disable or re-parent these in [layout.tsx](src/app/layout.tsx):

- Facebook Pixel inline init (`1950457082424995`)
- GTM container `GTM-NG7HWSZT`
- `<UniversalSchema />` JSON-LD
- [FbPixelPageView](src/app/metrics/pixel-tracker.tsx) — route-change Pixel PageView tracking
- [Metrics](src/app/metrics/) — GA4 + GTM + Clarity bundle

If a specific page needs additional Pixel events (e.g. `Lead` when a form submits), fire them from a `useEffect` or event handler. Pair with the server-side mirror at [/api/meta-conversion](src/app/api/meta-conversion/route.ts) when the event is high-value.

### ✅ DO
- Consume the global trackers as-is.
- Mirror conversion-worthy events through the server API.

### ❌ DON'T
- Don't mount a second `<Toaster />` or `<FbPixelPageView />`.
- Don't log `PIXEL_TOKEN` client-side.

---

## 13. Image Rules

- Use `next/image` everywhere — never `<img>` for content images.
- Always provide `width`, `height`, and descriptive `alt`.
- Above-the-fold hero images: add `priority`.
- Remote `src`: host must be allowlisted in [next.config.mjs](next.config.mjs) `remotePatterns`.
- Currently allowlisted: `firebasestorage.googleapis.com`, `img.icons8.com`, `cdn-icons-png.flaticon.com`, `www.facebook.com/tr*`.

### ✅ DO
- Set `priority` only on the first above-the-fold hero image of the page.
- Provide a descriptive `alt` — not "image" or "logo".

### ❌ DON'T
- Don't add a new remote host without escalating (foundation file change).
- Don't use `<img>` for content.

---

## 14. Dynamic Imports (for heavy below-the-fold UI)

```tsx
import dynamic from "next/dynamic";

const DropDown = dynamic(() => import("../DropDown/DropDown"));
const PopUpButton = dynamic(() => import("../pop-up-button"));
const Drawer = dynamic(() => import("@/components/drawer"), { ssr: true });
```

Follow the pattern for:
- Mobile drawer / nav
- Modals and dialogs triggered by user action
- Heavy interactive widgets not needed at initial paint

### ✅ DO
- Dynamic-import modal / drawer / dropdown triggered on demand.
- Keep `ssr: true` when the component renders on the server in the fallback state.

### ❌ DON'T
- Don't dynamic-import a hero / above-the-fold block — will hurt LCP.
- Don't dynamic-import a server component inside a server component.

---

## 15. Authoring Checklist — before declaring "implementation done"

```
☐ Server or Client Component chosen correctly
☐ "use client"; on line 1 if using hooks/state
☐ Pattern A (sx + styles) or Pattern B (CSS module) chosen consistently within the file
☐ Interface defined for props, not inline
☐ Default export
☐ useI18n() used for any user-facing string
☐ All strings have entries in both en.json and ar.json (or inline ternary)
☐ RTL / isArabic applied on direction-sensitive styles OR Ar* twin created
☐ No theme.palette.* / theme.spacing() inside sx
☐ No em units, no vw for font-size
☐ New /route has /ar/route twin (or explicit reason it's EN-only)
☐ No Firebase SDK call inside component file
☐ No write operation against Firestore
☐ next/image used with alt + explicit dimensions
☐ If dynamic-imported, parent page still passes hydration smoothly
☐ No second ThemeProvider / I18nProvider / DrawerProvider / Toaster mounted
☐ npm run lint passes
☐ npm run build passes
```

---

## 16. Next stop in the pipeline

- **Need to confirm your choices don't break a rule?** → [RULES.md §RULE-01 through §RULE-19](./RULES.md)
- **Ready to run the full QA gate?** → [QA.md](./QA.md)
- **Found a symptom and need the right file?** → [Development.md §2 Context Map](./Development.md)
- **Need token / anatomy reference?** → [Design.md](./Design.md)

---

**End.** This pipeline is descriptive — it encodes what already works. Match the neighbouring file's shape when in doubt.
