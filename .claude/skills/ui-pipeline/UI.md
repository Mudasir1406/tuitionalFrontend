---
name: tuitionalFrontend UI Pipeline
description: Stage 3 of the SDLC. File templates, folder conventions, and authoring idioms for the public marketing site. Loaded after Design.md locks the tokens; feeds QA.md for verification next.
type: ui-pipeline
---

# tuitionalFrontend — UI Pipeline (SDLC Stage 3)

> **Where you are in the pipeline:** You arrived here from [Design.md](./Design.md) with tokens and patterns chosen. This file gives you the implementation skeleton — file layout, imports order, component templates, bilingual idioms. After authoring, continue to [QA.md](./QA.md) to verify.
> **Stack:** Next.js 14 + React 18 + **Tailwind CSS** + **Headless UI** + **lucide-react**. (MUI was removed in 2026.)
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
├── tailwind.config.ts       ← colors, fonts, breakpoints, type scale, animations [foundation]
├── postcss.config.js        ← Tailwind + Autoprefixer [foundation]
├── src/
│   ├── app/
│   │   ├── layout.tsx       ← root providers, font variables, analytics [foundation]
│   │   ├── page.tsx         ← home EN
│   │   ├── globals.css      ← @tailwind directives, RTL, base typography, keyframes [foundation]
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
│   │   │   ├── typographyTokens.ts [foundation — mirrored in tailwind.config.ts]
│   │   │   └── typography.css
│   │   ├── online/[slug]/   ← grade-subject-level dynamic route (EN)
│   │   ├── blog/            ← /blog tree
│   │   ├── igcse/ gcse/ a-level/   ← marketing landings (HeaderV3)
│   │   ├── pricing/
│   │   ├── about/ contact/ careers/ testimonials/ thank-you/
│   │   ├── privacy-policy/ terms-and-conditions/
│   │   └── ar/              ← Arabic mirror tree (about/, blog/, careers/, contact/,
│   │                           online/, pricing/, privacy-policy/, terms-and-conditions/,
│   │                           testimonials/, page.tsx)
│   ├── components/
│   │   ├── ui/              ← house primitives (Button, Input, Container, Dialog, Drawer, Select)
│   │   ├── header.tsx       ← unified EN/AR header (consumes useI18n)
│   │   ├── header-v3.tsx    ← minimal logo-only header for marketing landings
│   │   ├── drawer.tsx       ← mobile drawer (uses house Drawer + lucide X)
│   │   ├── footer.tsx       ← unified EN/AR footer
│   │   └── …                ← feature-scoped folders + top-level primitives
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
│   │   ├── grade-subject-level/
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
│   │   ├── cn.ts            ← class-name merge helper [foundation]
│   │   ├── constants.ts
│   │   ├── env.ts           ← SITE_URL + PIXEL_TOKEN [foundation-adjacent]
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
| Styling | **Tailwind CSS** | MUI `sx` + occasional CSS modules |
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
| A section component for an existing feature | `src/components/<feature>/<name>.tsx` (+ `ar-<name>.tsx` twin only when layouts truly diverge) |
| A new feature folder | `src/components/<feature>/` |
| A reusable styled primitive (button, input, dialog) | **First check [src/components/ui/](src/components/ui/)** — only add a new top-level primitive if nothing fits |
| A Firestore read | `src/services/<domain>/` |
| A TypeScript type | `src/types/<domain>.types.ts` |
| A translation string | BOTH `src/locales/en.json` AND `src/locales/ar.json` |
| A redirect rule | `next.config.mjs` redirects() (foundation → approval) |
| A utility helper | `src/utils/<name>.ts` |
| A new design token (color, spacing, radius) | `tailwind.config.ts` `theme.extend` (foundation → approval) |

### ✅ DO
- Use the house primitives in `src/components/ui/` whenever they fit before adding new ones.
- Add a new type when extending data shape — don't duplicate existing interfaces.

### ❌ DON'T
- Don't create a `src/contexts/` (plural) folder — contexts live in `src/context/` here.
- Don't create a shared `src/styles/` directory — there is no shared CSS folder.
- Don't author a new page without its AR mirror (unless documented as EN-only).

---

## 3. Server vs Client Component Rules

### Server Component (default, `app/**/page.tsx`)

```tsx
// src/app/blog/[slug]/page.tsx
import { getBlogData } from "@/services/grade-subject-level/grade-subject-level";
import { redirect } from "next/navigation";
import BlogView from "@/components/blog/blog-view";

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
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/useI18n";
import { cn } from "@/utils/cn";

interface FooSectionProps {
  data: SomeType;
}

const FooSection: React.FC<FooSectionProps> = ({ data }) => {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <section className="px-4 py-8 md:px-8 md:py-12 lg:px-12 lg:py-16">
      <h2 className="text-start font-heading text-h2-mobile sm:text-h2-tablet lg:text-h2 text-ink-900">
        {t("foo.heading")}
      </h2>
      <Button variant="primary" onClick={() => setOpen(true)} className="mt-6">
        {t("buttons.book_demo")} <ArrowRight className="ms-2 h-4 w-4" />
      </Button>
    </section>
  );
};

export default FooSection;
```

#### ✅ DO
- Start the file with `"use client";` on line 1.
- Receive data as props from a server component parent.
- Use `useI18n()` for any user-facing string.
- Use `cn()` for conditional class merging.

#### ❌ DON'T
- Don't call Firebase SDK (`getDoc`, `setDoc`, `collection`, `query`) anywhere in a client component.
- Don't fetch on render — if you need client-time data, use `/api/location` for geo-IP via the established pattern.
- Don't call services from a client component unless it's a clearly client-only scenario (geo-IP, form submit).
- Don't reach for `@mui/*` / `@emotion/*` — they are uninstalled.

---

## 4. File Template — Tailwind Section

The default and only authoring pattern. Tailwind utility classes via `cn()` for any conditional logic.

```tsx
"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/useI18n";
import { cn } from "@/utils/cn";
import type { HeroData } from "@/types/grade-subject-level.types";

interface HeroProps {
  data: HeroData;
  variant?: "primary" | "secondary";
}

const Hero: React.FC<HeroProps> = ({ data, variant = "primary" }) => {
  const { t, isRTL } = useI18n();

  return (
    <section
      className={cn(
        "flex flex-col items-center px-4 py-12 text-center md:px-8 md:py-24",
        variant === "primary" ? "bg-brand-50" : "bg-white",
      )}
    >
      <h1 className="mb-6 max-w-[800px] font-heading text-h1-mobile sm:text-h1-tablet lg:text-h1 text-ink-900">
        {data.title}
      </h1>
      <p className="mb-10 max-w-[720px] font-heading text-body text-ink-700">
        {data.description}
      </p>
      <Button asChild variant="primary" className="rounded-[10px] shadow-[1px_4px_24px_0px_#38B6FFB2]">
        <Link href={isRTL ? "/ar/online" : "/online"}>
          {t("buttons.book_a_demo")}
          <ArrowRight className="ms-2 h-4 w-4" />
        </Link>
      </Button>
    </section>
  );
};

export default Hero;
```

### ✅ DO
- Pull tokens from [Design.md §1–4](./Design.md) as Tailwind utility classes (`bg-brand-50`, `text-ink-700`, `text-h1-mobile`, etc.).
- Use mobile-first responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`).
- Use logical properties (`ms-*`, `me-*`, `ps-*`, `pe-*`, `text-start`, `text-end`) for direction-sensitive layout.
- Use `cn()` for any class combination that depends on state/props.
- Use lucide-react icons.
- Use the house `Button`, `Input`, `Container`, `Dialog`, `Drawer`, `Select` from [src/components/ui/](src/components/ui/) when they fit.

### ❌ DON'T
- Don't reach for `<Box>`, `<Typography>`, `<Grid>`, `sx={...}` — they're not installed.
- Don't write `flex-row-reverse` driven by `isRTL` — let logical properties auto-flip.
- Don't use `theme.*` references — there is no MUI theme.
- Don't introduce new arbitrary values (`bg-[#abc123]`) when a token exists (`bg-brand-500`).

---

## 5. Existing CSS Modules (Grandfathered)

A small set of pre-migration `*.module.css` files survive where they ship third-party CSS or layout grids that didn't map cleanly to Tailwind:

- [src/components/quill/TextEditor.module.css](src/components/quill/TextEditor.module.css) — third-party Quill styles
- [src/components/trustpilot-carousel/TrustpilotCarousel.module.css](src/components/trustpilot-carousel/TrustpilotCarousel.module.css) — carousel layout
- Route-level layout shells under `src/app/**/page.module.css`, `src/app/about/about.module.css`, `src/app/careers/careers.module.css`, `src/app/testimonials/testimonials.module.css`

**Do not author new `.module.css` files.** When you need styles complex enough to feel like a CSS module, first check whether Tailwind's arbitrary values (`[grid-template-columns:_1fr_auto]`) or `theme.extend` solve it. If not, escalate.

---

## 6. Arabic Twin Pattern

Most of the codebase serves both EN and AR via:

- `useI18n()` for string translation (function form, `t("key")`).
- Tailwind logical properties (`ms-*`, `me-*`, `start-*`, `end-*`, `text-start`, `text-end`) that flip automatically under `html[dir="rtl"]`.
- `<div dir="rtl">` wrappers on AR-only pages where the global flip doesn't reach.

**Twins are still allowed when the LTR and AR layouts genuinely diverge** (different image composition, mirrored hero blocks, different CTA order). Naming convention:

```
components/grade-subject-level/grade-subject-level.tsx     ← EN
components/grade-subject-level/ar-grade-subject-level.tsx  ← AR twin

components/grade-subject-level/form/form.tsx               ← EN
components/grade-subject-level/form/ar-form.tsx            ← AR twin
```

### ✅ DO
- Default to ONE component using `useI18n()` + logical properties.
- Author a twin only when LTR and AR designs structurally differ.
- Add the `/ar/<route>/page.tsx` alongside every new `/<route>/page.tsx`.

### ❌ DON'T
- Don't ship hardcoded English strings on a page that renders under `/ar/**`.
- Don't proliferate twins for trivial direction swaps — the global RTL flip handles those.

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
<p>{t("nav.home")}</p>
<Button>{t("buttons.book_a_demo")}</Button>
<span>{t("footer.copyright")}</span>
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
<p>{isArabic ? "مرحبا" : "Welcome"}</p>
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

### Mobile-first responsive cascade

```tsx
<div className="px-4 py-8 sm:px-6 md:px-8 md:py-12 lg:px-12 lg:py-16">
  …
</div>
```

Default styles target mobile; layer larger breakpoints with prefixes. Custom screens (defined in `tailwind.config.ts`):

| Prefix | Min-width |
|---|---|
| (none) | 0 |
| `sm:` | 600 |
| `md:` | 900 |
| `lg:` | 1200 |
| `xl:` | 1500 |
| `2xl:` | 2000 |

### Conditional classes via `cn()`

```tsx
import { cn } from "@/utils/cn";

<button
  className={cn(
    "inline-flex items-center rounded-[10px] px-4 py-2 font-bold normal-case transition",
    variant === "primary"
      ? "bg-brand-500 text-white hover:bg-brand-600"
      : "border border-brand-500 text-brand-500 hover:bg-brand-50",
    disabled && "cursor-not-allowed opacity-60",
    className,
  )}
/>
```

### Logical properties for direction-sensitive styling

```tsx
className="ms-4 me-2 ps-3 pe-3 text-start text-end start-0 end-0"
//          margin-start, margin-end, padding-start, padding-end,
//          text-align: start/end, inset-inline-start/end
```

These flip automatically under `html[dir="rtl"]`.

### Arbitrary values (only for legacy carry-overs)

```tsx
// Boxshadows that don't have a token yet:
<div className="shadow-[1px_4px_24px_0px_#38B6FFB2]" />

// Colors not yet in tailwind.config.ts:
<div className="bg-[#9EDCFF]" />
```

Add recurring arbitrary values to `tailwind.config.ts` `theme.extend` (foundation file → approval).

### Animations — keyframes live in tailwind.config.ts + globals.css

```tsx
<div className="animate-[rotateAnimation_2s_ease-in-out_infinite]" />
```

Keyframes (`pulse`, `bounce`, `swing`, `rotateAnimation`, `leftCircleAnimation`, `rightCircleAnimation`, `slide`) are defined in [globals.css](src/app/globals.css) and exposed as Tailwind animation utilities via `tailwind.config.ts`.

### ✅ DO
- Default to mobile, layer up with breakpoint prefixes.
- Pair `vh`-driven input heights with a `min-h-*` clamp (e.g. `h-[5.5vh] min-h-[44px]`).
- Use logical properties for spacing/positioning that should flip under RTL.
- Use `cn()` for any conditional class.

### ❌ DON'T
- Don't write `lg:hidden md:block sm:block` — that's desktop-first; flip to `block lg:hidden`.
- Don't use `theme.breakpoints.up()` / `theme.breakpoints.down()` — there is no MUI theme.
- Don't use raw `@media` queries inside arbitrary class strings.
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

### 10.1 House primitives — ALWAYS first

| Concern | File |
|---|---|
| Button | [src/components/ui/button.tsx](src/components/ui/button.tsx) |
| Input | [src/components/ui/input.tsx](src/components/ui/input.tsx) |
| Container (max-width wrapper) | [src/components/ui/container.tsx](src/components/ui/container.tsx) |
| Dialog (modal) | [src/components/ui/dialog.tsx](src/components/ui/dialog.tsx) |
| Drawer (side sheet) | [src/components/ui/drawer.tsx](src/components/ui/drawer.tsx) |
| Select (Listbox) | [src/components/ui/select.tsx](src/components/ui/select.tsx) |

### 10.2 Feature folders

| Feature | Folder |
|---|---|
| Blog | [src/components/blog/](src/components/blog/) (+ `ar-*` twins) |
| Home | [src/components/home/](src/components/home/) (+ `ar-*` twins where present) |
| Pricing | [src/components/pricing/](src/components/pricing/) |
| Grade-Subject-Level | [src/components/grade-subject-level/](src/components/grade-subject-level/) |
| About | [src/components/about/](src/components/about/) |
| Careers | [src/components/careers/](src/components/careers/) |
| Contact | [src/components/contact/](src/components/contact/) |
| Countdown | [src/components/countdown/](src/components/countdown/) |
| Curriculum (legacy survivors used by grade-subject-level) | [src/components/curiculume/](src/components/curiculume/) — `educational-counseling`, `ar-educational-counseling`, `offer`, `ar-offer`, `popular-igcse-subjects`, `popular-igcse-subjects-v2`, `why-choose` |
| Footer links | [src/components/footerLinks/](src/components/footerLinks/) |
| SEO | [src/components/seo/](src/components/seo/) |
| Testimonials | [src/components/testimonials/](src/components/testimonials/) |
| Trustpilot | [src/components/trustpilot-carousel/](src/components/trustpilot-carousel/) |

### 10.3 Top-level primitives

| Concern | File |
|---|---|
| Select / autocomplete (legacy, still in use) | [src/components/DropDown/](src/components/DropDown/) |
| Inputs (custom phone-input, etc.) | [src/components/custom-input/](src/components/custom-input/), [src/components/input/](src/components/input/), [src/components/textArea/](src/components/textArea/) |
| Lead-capture CTA | [src/components/pop-up-button.tsx](src/components/pop-up-button.tsx), [src/components/pop-up-buttonV2.tsx](src/components/pop-up-buttonV2.tsx) |
| Image card | [src/components/image-card/](src/components/image-card/) |
| Tag chips | [src/components/tag/](src/components/tag/), [src/components/tags/](src/components/tags/), [src/components/ar-tags/](src/components/ar-tags/) |
| Tutor card | [src/components/teacher-card/](src/components/teacher-card/) |
| Breadcrumb | [src/components/bread-crumb/](src/components/bread-crumb/) |
| Line break | [src/components/line-break-text.tsx](src/components/line-break-text.tsx) |
| Language switcher | [src/components/language-switcher.tsx](src/components/language-switcher.tsx), [src/components/route-language-switcher.tsx](src/components/route-language-switcher.tsx) |
| Tracking | [src/components/page-view-tracker.tsx](src/components/page-view-tracker.tsx), [src/components/performance-monitor.tsx](src/components/performance-monitor.tsx) |
| HTML wrapper | [src/components/html-wrapper.tsx](src/components/html-wrapper.tsx) **(foundation)** |

### 10.4 Headers & Footers (variants)

- Header: [header.tsx](src/components/header.tsx) (unified EN/AR via `useI18n`), [header-v3.tsx](src/components/header-v3.tsx) (logo-only for `/a-level`, `/gcse`, `/igcse`, `/thank-you`).
- Drawer: [drawer.tsx](src/components/drawer.tsx) (mobile nav, uses house `Drawer`).
- Footer: [footer.tsx](src/components/footer.tsx) (unified), [server-footer.tsx](src/components/server-footer.tsx) (LTR server wrapper), [ar-server-footer.tsx](src/components/ar-server-footer.tsx) (AR server wrapper that renders `<Footer>` inside `dir="rtl"`), [footer-wrapper.tsx](src/components/footer-wrapper.tsx), [footerV2.tsx](src/components/footerV2.tsx) (used by marketing landings).

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
| `form-dialouge.tsx`, `form-dialouge-v1.tsx` | Misspelling carried over from CMS |
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
- Always provide `width`, `height` (or `fill`), and descriptive `alt`.
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

const PopUpButton = dynamic(() => import("../pop-up-button"));
const Drawer = dynamic(() => import("@/components/drawer"), { ssr: true });
const FormDialog = dynamic(() => import("./home/form-dialouge"), { ssr: false });
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
☐ Tailwind utility classes used for styling — no sx, no @mui/* import, no @emotion/* import
☐ cn() used for conditional class merging — no string concatenation
☐ Interface defined for props, not inline
☐ Default export
☐ House primitives used where they fit (Button, Input, Container, Dialog, Drawer, Select)
☐ useI18n() used for any user-facing string
☐ All strings have entries in both en.json and ar.json (or inline ternary)
☐ Logical properties (ms-*, me-*, ps-*, pe-*, start-*, end-*, text-start, text-end) used for direction-sensitive layout
☐ No `flex-row-reverse` driven by isRTL — let logical properties auto-flip
☐ Mobile-first responsive cascade (default → sm: → md: → lg: → xl: → 2xl:)
☐ Every form `<input>` has min-h-[44px] (or equivalent) on mobile
☐ Icons come from lucide-react — no other icon pack
☐ Interactive primitives use @headlessui/react (or the house wrappers)
☐ New /route has /ar/route twin (or explicit reason it's EN-only)
☐ No Firebase SDK call inside component file
☐ No write operation against Firestore
☐ next/image used with alt + explicit dimensions
☐ If dynamic-imported, parent page still passes hydration smoothly
☐ No second I18nProvider / DrawerProvider / Toaster mounted
☐ No reintroduction of ThemeProvider or @mui/* — they are uninstalled
☐ Visual identity preserved at 360 / 768 / 1200 / 1500 in both EN and AR
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
