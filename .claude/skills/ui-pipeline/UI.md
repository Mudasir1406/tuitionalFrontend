---
name: tuitionalFrontend UI Pipeline
description: Canonical file templates, folder conventions, and authoring rules for the public marketing site. Load before creating any new component or page.
type: ui-pipeline
---

# tuitionalFrontend — UI Pipeline

> **Version:** 2.0.0 (tailored from the CMS pipeline) | **Scope:** `src/` directory of `tuitionalFrontend`
> **Audience:** Any engineer/LLM performing UI work in `tuitionalFrontend`. Non-compliance is an error condition.
> **Cross-reference:** Always read [RULES.md](./RULES.md) alongside this document — RULES.md contains the hard gates; this doc contains the templates and idioms.

---

## 1. Repository Shape

```
tuitionalFrontend/
├── next.config.mjs          ← image remote hosts, redirects, chunk splitting
├── src/
│   ├── app/
│   │   ├── layout.tsx       ← root providers, font variables, analytics
│   │   ├── page.tsx         ← home EN
│   │   ├── globals.css      ← RTL, base typography
│   │   ├── style.css        ← shared styles
│   │   ├── fonts.ts         ← leagueSpartan, inter, notoSansArabic
│   │   ├── sitemap.ts
│   │   ├── robots.txt
│   │   ├── not-found.tsx
│   │   ├── metrics/         ← GTM, GA4, Clarity, Pixel trackers
│   │   ├── api/             ← /api/location, /api/meta-conversion
│   │   ├── assets/css/      ← theme.ts, typographyTokens.ts, typography.css
│   │   ├── online/          ← /online + /online/[slug] + ar twin
│   │   ├── blog/            ← /blog tree + ar twin
│   │   ├── igcse/ gcse/ a-level/
│   │   ├── pricing/
│   │   ├── about/ contact/ careers/ testimonials/ thank-you/
│   │   ├── curiculume/ maincuriculume/  (legacy misspellings — do not rename)
│   │   ├── privacy-policy/ terms-and-conditions/
│   │   └── ar/              ← Arabic mirror tree
│   ├── components/          ← feature-scoped folders + top-level primitives
│   ├── context/             ← SINGULAR here. DrawerProvider + I18nProvider only
│   ├── hooks/               ← useI18n
│   ├── locales/             ← en.json, ar.json
│   ├── services/            ← Firestore reads (grade-subject-level, blogs, pricing, …)
│   ├── types/               ← grade-subject-level.types.ts, i18n.types.ts, pricing.ts
│   ├── utils/               ← env, helper, globalFunction, constants, slugHelper, …
│   ├── axios/               ← axios base config
│   └── firebaseConfig/      ← Firestore init
```

### Differences from the CMS (don't conflate)

| Concern | This repo | CMS |
|---|---|---|
| Context folder | `src/context/` (singular) | `src/contexts/` (plural) + singular legacy |
| Styling | `sx` **OR** CSS modules | `sx` ONLY (CSS modules banned) |
| `t` | Function: `t("key.path")` | Plain object: `t.key` |
| Form helper | none — inline with `useI18n()` | `useFormTranslations()` mandatory |
| DnD | absent | `@hello-pangea/dnd` |
| Rich text | absent | Quill |
| Package manager | `npm` | `yarn` |
| Direction | CMS writes Firestore | This repo READS only |

---

## 2. Server vs Client Component Rules

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

- No `"use client"` directive
- Directly `await` service calls
- Use `redirect("/404")` for not-found (NOT `notFound()` — match existing convention)
- Pass data down as props
- Generate metadata via `generateMetadata` if needed (see existing blog pages)

### Client Component (`components/**/*.tsx`, any file with hooks/state)

```tsx
"use client";

import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useI18n } from "@/hooks/useI18n";
// (or: import { useI18n } from "@/context/language-context")

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

**Rules:**
- Client components never call Firebase directly — data comes via props
- Client components may call `/api/*` routes or `/api/location` if they need client-time state
- Start the file with `"use client";` on line 1

---

## 3. File Template — Pattern A (sx + styles object)

Use this for most components. Preferred when you have simple styles and want to stay within MUI's system.

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

---

## 4. File Template — Pattern B (CSS Module)

Use this when you need complex descendant selectors, pseudo-elements, or shared keyframes. Follow the shape used in [components/pricing/](src/components/pricing/).

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

.title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.popular .title { color: #ffffff; }

.price { display: flex; align-items: baseline; gap: 4px; }
.currency { font-size: 1.25rem; }
.amount { font-size: 3rem; font-weight: 700; }

@media (max-width: 599px) {
  .card { padding: 24px 20px; }
  .amount { font-size: 2.25rem; }
}
```

---

## 5. Arabic Twin Pattern

When the Arabic layout diverges significantly from EN, create a twin:

```
components/home/filter.tsx          ← EN
components/home/ar-filter.tsx       ← AR twin (mirrored layout, Arabic strings)

components/blog/hero/Hero.tsx       ← EN
components/blog/ar-hero/ArHero.tsx  ← AR twin (PascalCase mirrors file convention)
```

### Which convention to use?

- If the EN file is `kebab-case.tsx`: Arabic twin is `ar-<name>.tsx` (lowercase `ar-` prefix)
- If the EN file is `PascalCase.tsx` inside a scoped folder: Arabic twin is the same folder renamed with `ar-` prefix containing `Ar<Name>.tsx`

Match the local convention of the feature folder you're in. Don't standardize across; the existing split is deliberate.

### Arabic route tree

`/ar/**` routes import the twin explicitly:

```tsx
// src/app/ar/page.tsx
import ArHome from "@/views/ar-home"; // or the appropriate twin
```

When adding a new page, add `src/app/<route>/page.tsx` AND `src/app/ar/<route>/page.tsx`. Missing Arabic mirrors surface as 404s.

---

## 6. i18n Authoring Rules

### Using the hook

```tsx
import { useI18n } from "@/hooks/useI18n";

const { t, locale, isRTL, isArabic, isEnglish, setLocale, toggleLanguage } = useI18n();
```

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

Missing AR keys fall back to EN, then to the raw key string. Shipping without the AR translation results in visible English strings on `/ar/**` — treat it as a defect.

### Inline alternative (small/one-off strings)

For single strings that don't justify a JSON key:

```tsx
<Typography>{isArabic ? "مرحبا" : "Welcome"}</Typography>
```

Prefer JSON keys for anything that will be reused or that the marketing team might want to translate independently.

---

## 7. Styling Idioms

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

Don't write `theme.palette.primary.main` or `theme.spacing(2)` inside `sx`. Use literal values or CSS variables:

```tsx
// ❌ sx={{ color: theme.palette.primary.main }}
// ✅ sx={{ color: "#38b6ff" }}
// ✅ sx={{ color: "var(--color-accent)" }}
```

---

## 8. Data & Service Rules

### Services live in `src/services/`

```
services/
├── grade-subject-level/   ← page + blog + sequence + sitemap slugs
├── filter-data/           ← curriculum/grade/subject dropdowns
├── pricing/
├── contact-form/
├── email-service/
├── faqs/
├── footer/
├── get-started/
├── dropdown/
├── testimonials/
├── video-reviews/
├── reviews-on-wp/
├── trusted-schools/
└── countdown/
```

### Calling from a Server Component

```tsx
const data = await getPageData(slug, "ar");
if (!data) return redirect("/404");
```

### Calling from a Client Component

You generally should NOT. Data arrives from the server component as props.

**Exceptions** that legitimately run client-side:
- Geo-IP lookup via `/api/location` (used by forms for Country/IP tracking — see `slugHelper.ts`'s `useGeoLocation`)
- Contact-form submission POSTs
- Meta Conversions API forwarding via `/api/meta-conversion`

### Collection naming

- `grade-subject-level-en` / `grade-subject-level-ar`
- `blogs-v1-en` / `blogs-v1-ar`
- `component-sequence-en` / `component-sequence-ar` (section ordering — note the `placment` misspelling in docs)
- `page-categories-en` / `page-categories-ar`
- `custom-pricing` (country-agnostic doc set)
- `tutoring-packages-en` / `tutoring-packages-ar`
- `dropdown-items-en` / `dropdown-items-ar`
- `countdown/igcse-offer` (fixed doc)

**The CMS writes these. This repo reads them.** Never introduce `setDoc`/`addDoc`/`updateDoc`/`deleteDoc` here.

---

## 9. Routing Templates

### Adding a new top-level static page

1. `src/app/<route>/page.tsx` — Server Component, default export
2. `src/app/ar/<route>/page.tsx` — Arabic mirror (import `Ar*` twin)
3. `src/components/<route>/` — section components (with `ar-*.tsx` twins)
4. Keys added to both `src/locales/en.json` and `ar.json`
5. If the page should appear in search results: check [sitemap.ts](src/app/sitemap.ts) already picks it up or needs updating
6. `generateMetadata` exported for `<title>` + `<meta description>`

### Adding a new dynamic page

Same as above, but:
- `src/app/<route>/[slug]/page.tsx` with `async function` reading `params.slug`
- Service function with locale parameter
- Check [sitemap.ts](src/app/sitemap.ts) iterates the corresponding slug list

### Adding a new redirect

Append to `redirects()` array in [next.config.mjs](next.config.mjs). That's a foundation file → requires approval.

---

## 10. Component Existence Check (BEFORE AUTHORING)

Before creating a new component, search for an existing one in this order:

1. `src/components/<matching-scope>/` — feature folders first (blog/, home/, pricing/, grade-subject-level/)
2. `src/components/` (top level) — primitives:
   - [DropDown/](src/components/DropDown/) — select/autocomplete
   - [custom-input/](src/components/custom-input/), [input/](src/components/input/), [textArea/](src/components/textArea/) — inputs
   - [pop-up-button.tsx](src/components/pop-up-button.tsx) / [pop-up-buttonV2.tsx](src/components/pop-up-buttonV2.tsx) — lead-capture CTA
   - [image-card/](src/components/image-card/)
   - [tag/](src/components/tag/), [tags/](src/components/tags/), [ar-tags/](src/components/ar-tags/) — tag chips
   - [teacher-card/](src/components/teacher-card/) — tutor card
   - [bread-crumb/](src/components/bread-crumb/)
   - [line-break-text.tsx](src/components/line-break-text.tsx)
   - [language-switcher.tsx](src/components/language-switcher.tsx), [route-language-switcher.tsx](src/components/route-language-switcher.tsx)
3. Header variants: [header.tsx](src/components/header.tsx), [header-v2.tsx](src/components/header-v2.tsx), [header-v3.tsx](src/components/header-v3.tsx), [ar-header.tsx](src/components/ar-header.tsx)
4. Footer variants: [footer.tsx](src/components/footer.tsx), [footerV2.tsx](src/components/footerV2.tsx), [server-footer.tsx](src/components/server-footer.tsx), [footer-wrapper.tsx](src/components/footer-wrapper.tsx), [ar-footer.tsx](src/components/ar-footer.tsx), [ar-server-footer.tsx](src/components/ar-server-footer.tsx)

**If a match exists — USE IT. Do NOT refactor it on the side. Do NOT create a parallel implementation.**

---

## 11. Legacy Quirks (Tolerate, Don't "Fix")

Imports and live URLs depend on these names. **Never rename in passing.**

- `curiculume/` and `maincuriculume/` route folders + URLs
- `form-dialouge.tsx`, `ar-form-dialouge.tsx` (misspelling carried over from CMS)
- `students-says.tsx` / `students-says-v2.tsx` (grammar)
- `placment` field name in Firestore `component-sequence-*` docs
- PascalCase twin files (`Hero.tsx`, `ArHero.tsx`) in `blog/`, `pricing/`, `teacher-card/` etc. — mirror this pattern when you're IN those folders; don't replicate it outside

New files MUST be correctly spelled and kebab-case (e.g. `my-section.tsx`). Twin pairs must use a consistent casing (both kebab or both Pascal — don't mix).

---

## 12. Analytics Integration (every page)

Do not disable or re-parent these in layout.tsx:

- Facebook Pixel inline init (`1950457082424995`)
- GTM container `GTM-NG7HWSZT`
- `<UniversalSchema />` JSON-LD
- [FbPixelPageView](src/app/metrics/pixel-tracker.tsx) — route-change Pixel PageView tracking
- [Metrics](src/app/metrics/) — GA4 + GTM + Clarity bundle

If a specific page needs additional Pixel events (e.g. `Lead` when a form submits), fire them from a `useEffect` or event handler. Pair with the server-side mirror at [/api/meta-conversion](src/app/api/meta-conversion/route.ts) when the event is high-value.

---

## 13. Image Rules

- Use `next/image` everywhere — never `<img>` for content images
- Always provide `width`, `height`, and descriptive `alt`
- Above-the-fold hero images: add `priority`
- Remote `src`: host must be allowlisted in [next.config.mjs](next.config.mjs) `remotePatterns`
- Currently allowlisted: `firebasestorage.googleapis.com`, `img.icons8.com`, `cdn-icons-png.flaticon.com`, `www.facebook.com/tr*`
- Adding a new host = foundation-file change = requires approval

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

Do NOT dynamic-import everything — hero/visible-on-paint components must be statically imported for correct LCP.

---

## 15. Authoring Checklist

Before committing any new component:

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

**End.** This pipeline is descriptive — it encodes what already works. Match the neighbouring file's shape when in doubt.
