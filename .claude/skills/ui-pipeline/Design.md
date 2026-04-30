---
name: tuitionalFrontend Design System
description: Stage 2 of the SDLC. Design tokens, typography scale, screen anatomies, and canonical UI patterns for the public marketing site. Loaded after Development.md identifies the deliverable; feeds UI.md templates next.
type: design-system
---

# tuitionalFrontend — Design System (SDLC Stage 2)

> **Where you are in the pipeline:** You arrived here from [Development.md §4](./Development.md) having completed intake and scoping. After you lock down tokens and patterns here, continue to [UI.md](./UI.md) for file templates and folder conventions.
> **Source of truth:** the code. If this doc and a component disagree, the component wins and this doc needs updating.
> **Stack reminder:** Tailwind CSS + Headless UI + lucide-react. Tokens live in [tailwind.config.ts](tailwind.config.ts) and [src/app/assets/css/typographyTokens.ts](src/app/assets/css/typographyTokens.ts).

---

## 0. SDLC Navigation Band

```
Development.md ───►  [Design.md — you are here]  ───► UI.md ───► QA.md
                                    ▲
                                    │  always consult
                                    ▼
                               RULES.md
```

| If you need to… | Go to |
|---|---|
| Re-confirm scope, intake, task recipe | [Development.md §1–6](./Development.md) |
| Jump to a specific file for a symptom | [Development.md §2 Context Map](./Development.md) |
| Get the file template / bilingual idiom | [UI.md §3–6](./UI.md) |
| Confirm a color / radius / unit is allowed | [RULES.md §RULE-03, §RULE-04](./RULES.md) |
| Verify before shipping | [QA.md §QA-03](./QA.md) |

---

## 1. Brand Colors (Tailwind tokens)

### Primary palette

| Tailwind class | Hex | Role |
|---|---|---|
| `bg-brand-500` / `text-brand-500` | `#38B6FF` | Primary accent — CTAs, focus, icons |
| `shadow-[1px_4px_24px_0px_#38B6FFB2]` | — | Brand button glow (legacy, preserved) |
| `bg-brand-200` | `#9EDCFF` | Hover wash, secondary surfaces |
| `bg-brand-50` | `#D7F0FF` | Soft hero backgrounds, filter boxes |
| `bg-[#FF6B35]` | `#FF6B35` | Secondary orange (rare) |
| `text-ink-900` | `#2D2D2D` | Default body text |
| `text-ink-700` | `rgba(0,0,0,0.77)` | Form values, secondary copy |
| `text-ink-600` | `#666` / `#64748b` | Muted captions |
| `bg-white` / `text-white` | `#FFFFFF` | Card / modal background |

### Semantic colors

| Tailwind class | Hex | Role |
|---|---|---|
| `text-success` / `bg-success` | `#51B893` | Success accent |
| `text-warning` / `bg-warning` | `#FFB000` | Warning |
| `text-danger` / `bg-danger` | `#B70000` | Destructive |

### Background gradients

| Tailwind class | Value | Purpose |
|---|---|---|
| `bg-hero-fade` | `linear-gradient(to bottom, #D7F0FF, rgba(255,255,255,0.7))` | Hero strip behind sticky header |
| `bg-footer-fade` | `linear-gradient(to bottom, rgba(255,255,255,0.7), #37B6FF)` | Footer outer surface (top→bottom white→brand) |

### Pricing slate (self-contained palette)

Used **only** inside [src/components/pricing/](src/components/pricing/):

| Hex | Role |
|---|---|
| `#1e293b` | Dark heading on pricing card |
| `#334155` | Secondary pricing text |
| `#64748b` | Muted pricing caption |
| `#e2e8f0` | Subtle border |
| `#f1f5f9` | Default card border |
| `#f8fafc` | Card body tint |

If you are building outside `components/pricing/` and want darker neutrals, prefer `text-ink-900` / `text-ink-700` / `text-ink-600` — the rest of the site.

### ✅ DO
- Use the named Tailwind tokens (`bg-brand-500`, `text-ink-900`).
- Add new tokens to [tailwind.config.ts](tailwind.config.ts) `theme.extend.colors` (foundation file → approval).
- Keep the pricing slate palette contained — do NOT leak it into non-pricing components.

### ❌ DON'T
- Don't reach for arbitrary hex values like `bg-[#abc123]` when a token exists.
- Don't reach for a darker body color just because the design mock looks a bit different — match the site.
- Don't use the pricing slate in home/, blog/, or grade-subject-level/.

**If the design needs a new shade → Escalate via [Development.md §8](./Development.md).**

---

## 2. Typography (Tailwind text-* tokens)

Typography is centrally controlled in two locations — both must agree:

- **Scale source:** [src/app/assets/css/typographyTokens.ts](src/app/assets/css/typographyTokens.ts) — the `TYPOGRAPHY_TOKENS` object (kept for reference / scripts).
- **Tailwind config:** [tailwind.config.ts](tailwind.config.ts) — reproduces every entry as a named `text-*` size with line-height and letter-spacing.

### Desktop tokens (Tailwind classes)

| Token | rem | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| `text-h1` | 3 | 700 | 1.2 | -0.02em |
| `text-h2` | 2.25 | 700 | 1.25 | -0.01em |
| `text-h3` | 1.5 | 700 | 1.3 | 0 |
| `text-h4` | 1.25 | 600 | 1.4 | 0 |
| `text-h5` | 1.125 | 600 | 1.4 | 0 |
| `text-h6` | 1 | 600 | 1.5 | 0 |
| `text-body` | 1 | 400 | 1.7 | 0 |
| `text-small` | 0.875 | 400 | 1.5 | 0 |
| `text-nav` | 1 | 500 | 1.5 | 0.01em |
| `text-button` | 1 | 600 | 1 | 0.02em |
| `text-stat-number` | 3 | 700 | 1 | 0 |
| `text-stat-label` | 0.875 | 500 | 1.4 | 0.05em (UPPERCASE) |
| `text-category-tag` | 0.875 | 600 | 1 | 0.08em (UPPERCASE) |
| `text-form-label` | 0.875 | 500 | 1.4 | 0 |
| `text-form-input` | 1 | 400 | 1.5 | 0 |
| `text-caption` | 0.75 | 500 | 1.3 | 0 |

### Tablet tokens (use with `sm:` or `md:` prefix)

`text-h1-tablet` (2.25rem) · `text-h2-tablet` (1.75rem) · `text-h3-tablet` (1.25rem) · `text-h4-tablet` (1.125rem) · `text-h5-tablet` (1rem) · `text-stat-number-tablet` (2.25rem)

### Mobile tokens (default — mobile-first)

`text-h1-mobile` (1.75rem) · `text-h2-mobile` (1.375rem) · `text-h3-mobile` (1.125rem) · `text-h4-mobile` (1rem) · `text-body-mobile` (0.9375rem) · `text-stat-number-mobile` (1.75rem) · **inputs never drop below 16px** on mobile (iOS zoom prevention — enforced in [globals.css](src/app/globals.css))

### Recommended responsive cascade

```tsx
<h1 className="font-heading text-h1-mobile sm:text-h1-tablet lg:text-h1 text-ink-900">
  …
</h1>
```

### Fonts (Tailwind classes)

| Tailwind class | CSS variable | Scope |
|---|---|---|
| `font-heading` | `var(--font-league-spartan)` | EN headings |
| `font-body` | `var(--font-inter)` | EN body |
| `font-arabic` | `var(--font-noto-arabic)` | AR (also auto-applied via `html[dir="rtl"] *` in [globals.css](src/app/globals.css)) |

Font registration: [src/app/fonts.ts](src/app/fonts.ts) — foundation file, do not edit without approval.

### ✅ DO
- Pair every heading with a font-family: `<h2 className="font-heading text-h2-mobile sm:text-h2-tablet lg:text-h2">`.
- Use the named `text-*` token whenever it fits.
- Layer mobile → tablet → desktop tokens with breakpoint prefixes.

### ❌ DON'T
- Don't invent a new px/rem/vw font size when a token exists.
- Don't use `em` for font-size — anywhere.
- Don't use `vw` for font-size.
- Don't hardcode `fontFamily: "League Spartan"` — use `font-heading`.
- Don't register a new font outside [src/app/fonts.ts](src/app/fonts.ts) — escalate first.

**If the design implies a new font family → Escalate via [Development.md §8](./Development.md) before coding.**

---

## 3. Shadows

Tailwind config exposes named shadows in `theme.extend.boxShadow`. Common ones:

| Tailwind class | Value | Purpose |
|---|---|---|
| `shadow-card` | `0px 1px 4px 0px rgba(0, 0, 0, 0.08)` | Default card / input base |
| `shadow-brand-glow` | `0.1vh 1.5vh 3.4vh 0px rgba(56, 182, 255, 0.4)` | Primary CTA glow (Book Demo, hero CTAs) |
| `shadow-header` | `0px -0.3vh 0.8vh 0px #00000026 inset, 0px 0.2vh 0.1vh 0px #0000000D` | Sticky AppBar inset shadow ([header.tsx](src/components/header.tsx)) |
| `shadow-footer-card` | `5px -5px 8px 0 rgba(0,0,0,0.15) inset, -6px 2px 8px 0 rgba(0,0,0,0.15) inset, 0 4px 4px 0 rgba(0,0,0,0.25)` | Footer translucent card triple inset ([footer.tsx](src/components/footer.tsx)) |
| `shadow-cta-white` | `1px 15px 34px 0px rgba(0,0,0,0.2)` | White CTA glow on blue (footer Enroll Now) |
| `shadow-[1px_4px_24px_0px_#38B6FFB2]` | brand glow (compact) | PopUpButton legacy glow |
| `shadow-[0_8px_30px_rgba(56,182,255,0.25)]` | brand glow (medium) | Modern hero CTA |
| `shadow-[0_12px_40px_rgba(56,182,255,0.3)]` | brand glow (large) | Pricing popular card |
| `shadow-[0px_-3px_8px_0px_#00000026_inset,0px_2px_1px_0px_#0000000d]` | schools box inset | Schools card |

### ✅ DO
- Use `shadow-card` / `shadow-card-hover` whenever you can.
- Pull arbitrary `shadow-[...]` values verbatim from this table for legacy patterns.

### ❌ DON'T
- Don't improvise a shadow value.
- Don't stack multiple shadows unless the table shows a stacked example.

---

## 4. Radii

| Tailwind class | Value | Where |
|---|---|---|
| `rounded` / `rounded-md` | 4–6 px | Small chips, tag pills |
| `rounded-lg` | 8 px | Buttons, simple cards |
| `rounded-[10px]` | 10 px | Legacy hero buttons / contained CTAs (preserved) |
| `rounded-xl` | 12 px | Modern cards, modals |
| `rounded-2xl` | 16 px | Content cards |
| `rounded-[20px]` | 20 px | Pricing package cards |
| `rounded-full` | circle | Icon chips, avatars |

### ✅ DO
- Pick the closest established value.
- When unsure, open a neighbouring component and match its radius.

### ❌ DON'T
- Don't add `rounded-[6px]` / `rounded-[14px]` / `rounded-[18px]` out of the blue — the site's rhythm is tighter.

---

## 5. Spacing

This repo doesn't enforce a strict spacing scale — match neighbouring components.

Common observed values (Tailwind):
- `p-2`, `p-4`, `p-6`, `p-8`, `p-10` for component padding (8 / 16 / 24 / 32 / 40 px).
- Section vertical rhythm: `py-[5vh] md:py-[10vh]` on legacy hero surfaces, OR `py-16 md:py-24` on newer blocks.
- Internal grid gaps: `gap-3`, `gap-4`, `gap-6`.

### ✅ DO
- Match the vertical rhythm of the section above and below.
- Prefer Tailwind's spacing scale (rem-based) on newly authored blocks.

### ❌ DON'T
- Don't clone the legacy `vh`-heavy pattern into new components — it breaks on short viewports.

---

## 6. Breakpoints

Custom screens defined in [tailwind.config.ts](tailwind.config.ts):

| Prefix | Min-width |
|---|---|
| (none / mobile-first) | 0 |
| `sm:` | 600px |
| `md:` | 900px |
| `lg:` | 1200px |
| `xl:` | 1500px |
| `2xl:` | 2000px |

Typography mobile/tablet variants align with these (`text-h1-mobile` is the default; `sm:text-h1-tablet` and `lg:text-h1` layer up).

### ✅ DO
- Default styles target mobile.
- Layer larger breakpoints with prefixes (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`).
- Test at 360px, 768px, 1200px, 1500px, 2000px — both EN and AR.

### ❌ DON'T
- Don't author desktop-first (`block lg:hidden md:block ...`) — flip the cascade.
- Don't invent new breakpoints. If a design genuinely needs 1024px or 768px, surface the conflict and escalate.

---

## 7. Site Anatomy — navigate by route

When you have a layout bug or need to understand what ships on a given URL, use this table to jump straight to the files.

### Global chrome (every page)

| Surface | Files |
|---|---|
| Sticky header | [header.tsx](src/components/header.tsx) (unified EN/AR) — used by `/`, `/about`, `/contact`, `/careers`, `/testimonials`, `/blog/**`, `/online/**`, `/pricing`, `/ar/*` |
| Minimal logo header | [header-v3.tsx](src/components/header-v3.tsx) — used by `/a-level`, `/gcse`, `/igcse`, `/thank-you` |
| Mobile drawer | [drawer.tsx](src/components/drawer.tsx) (uses house Drawer + lucide X) |
| Footer (LTR) | [footer.tsx](src/components/footer.tsx) + server wrapper [server-footer.tsx](src/components/server-footer.tsx); marketing-landing variant: [footerV2.tsx](src/components/footerV2.tsx) |
| Footer (AR) | [ar-server-footer.tsx](src/components/ar-server-footer.tsx) wraps `<Footer>` in `<div dir="rtl">` |
| Toaster | mounted once in [layout.tsx](src/app/layout.tsx) — use `toast.success()` / `toast.error()` from `react-hot-toast` only for form submissions |

### Home (`/` and `/ar`)

Files in [src/components/home/](src/components/home/):
- `filter.tsx` (hero + lead form) / `ar-filter.tsx`
- `info.tsx` / `ar-info.tsx`
- `get-started.tsx` / `ar-get-started.tsx`
- `trusted.tsx` / `ar-trusted.tsx`
- `our-client.tsx` / `ar-our-client.tsx`
- `tutor-modal.tsx`
- `faqs.tsx` / `ar-faqs.tsx`
- `questions.tsx` / `ar-questions.tsx`
- `contact-us.tsx` / `ar-contact-us.tsx`
- `form-dialouge.tsx` / `form-dialouge-v1.tsx` **(preserve misspelling)**

### Grade-Subject-Level (`/online/[slug]` and `/ar/online/[slug]`)

Two renderer variants branched at [src/app/online/[slug]/page.tsx](src/app/online/[slug]/page.tsx):

| Branch | File |
|---|---|
| `variant === "new"` | [grade-subject-level-v2.tsx](src/components/grade-subject-level/grade-subject-level-v2.tsx) |
| else (legacy) | [grade-subject-level.tsx](src/components/grade-subject-level/grade-subject-level.tsx) |

Section dispatch maps: [sectionsbox.tsx](src/components/grade-subject-level/sectionsbox.tsx) / [sectionsboxV2.tsx](src/components/grade-subject-level/sectionsboxV2.tsx). Section components include `hero/`, `tutor-section/`, `school-logos-section/`, `benifts-of-studying-section/`, `benifts-section/`, `link-list-view/`, `tutoring-program-section/`, `form/`, plus `faqs.tsx`, `blog-cta.tsx`, `phone-cta.tsx`, `main-content.tsx`, `students-says.tsx`, `students-says-v2.tsx`.

**Both V1 and V2 still ship in the wild. Do not remove either.**

### Blog (`/blog/**` and `/ar/blog/**`)

Routes: `/blog`, `/blog/[slug]`, `/blog/category/[slug]`, `/blog/tag/[slug]`.

Components in [src/components/blog/](src/components/blog/): `hero/`, `all-blogs/`, `blog-card/`, `search-bar/`, `accordion/`, `author-profile/`, `relatedBlogs/`, `postCTA/`, `tags-social/`, `blogSequences/`, `left-section/`, `hero-nested/`. Most folders have an `ar-*` twin.

### Pricing (`/pricing` and `/ar/pricing`)

Components in [src/components/pricing/](src/components/pricing/) — PascalCase file names (deliberate local convention):

- Legacy package cards: `PackageCard.tsx` / `ArPackageCard.tsx`.
- Modern custom pricing: `CustomPricingCard.tsx`, `CustomPackageCard.tsx`, `CustomPricingModal.tsx`, `SimplePackageModal.tsx`.
- Filtering: `PricingFilter.tsx`, `CountrySelector.tsx` / `ArCountrySelector.tsx`.
- Sections: `PricingSection.tsx` / `ArPricingSection.tsx`, `PricingPageClient.tsx` / `ArPricingPageClient.tsx`.

### Marketing landings

- `/igcse` → [src/app/igcse/](src/app/igcse/)
- `/gcse` → [src/app/gcse/](src/app/gcse/)
- `/a-level` → [src/app/a-level/](src/app/a-level/)
- `/thank-you` → [src/app/thank-you/](src/app/thank-you/)

These all use `HeaderV3` (logo only) and `FooterV2`. Hero composition is uniform across them — see [grade-subject-level/heroV2.tsx](src/components/grade-subject-level/heroV2.tsx) and [grade-subject-level/form/formV2.tsx](src/components/grade-subject-level/form/formV2.tsx).

### Static pages

[/about/](src/app/about/), [/contact/](src/app/contact/), [/careers/](src/app/careers/), [/testimonials/](src/app/testimonials/), [/privacy-policy/](src/app/privacy-policy/), [/terms-and-conditions/](src/app/terms-and-conditions/) — plus Arabic mirrors at [src/app/ar/](src/app/ar/).

### ✅ DO
- Use this table as the primary navigation map when a bug reproduces on a specific URL.
- Check whether a V1 vs V2 renderer is in play **before** editing grade-subject-level components.

### ❌ DON'T
- Don't rename any file/folder in this section — imports and live URLs depend on the exact spelling.
- Don't remove V1 code paths — they still serve traffic.

---

## 8. Canonical UI Patterns (copy-ready)

### 8.0 Sticky AppBar (header) anatomy

The site header sits inside a fixed-height hero strip (`bg-hero-fade`, 10/10/20/30 vh by breakpoint). Two decorative `bg-brand-500` circles are absolutely positioned behind a sticky AppBar that uses `shadow-header`. The desktop CTA cluster is `outline + success` (AI Digital SAT) → `primary + shadow-brand-glow` (Book Demo) → `<RouteLanguageSwitcher />`. Mobile collapses to logo + hamburger. Reference: [header.tsx](src/components/header.tsx).

```tsx
<div className="relative h-[10vh] w-full sm:h-[10vh] md:h-[20vh] lg:h-[30vh] bg-hero-fade">
  <span aria-hidden className="pointer-events-none absolute top-[1.7vh] start-[1.2vw] z-0 h-[3vh] w-[3vh] rounded-full bg-brand-500 sm:start-[2.5vw] sm:h-[4.5vh] sm:w-[4.5vh] md:start-[5vw] md:h-[5vh] md:w-[5vh] lg:start-[4.5vw] lg:h-[7.5vh] lg:w-[7.5vh]" />
  <span aria-hidden className="pointer-events-none absolute top-[3.2vh] end-[3.5vw] z-0 h-[6vh] w-[6vh] rounded-full bg-brand-500 sm:h-[7vh] sm:w-[7vh] md:h-[8vh] md:w-[8vh] lg:h-[10.9vh] lg:w-[10.9vh]" />
  <header className="sticky top-0 z-[1000] mx-[5vw] mt-[2vh] flex w-[90%] items-center justify-between rounded-md bg-white/70 px-4 py-[1vh] shadow-header lg:justify-evenly">
    {/* logo · nav · cluster (outline-success → primary glow → langswitcher) · hamburger */}
  </header>
</div>
```

Header CTA cluster typography preserved from MUI baseline:
- AI Digital SAT (outlined): `border-success text-success py-[1.2vh] px-[1.5vw] text-[1.5vh] font-bold leading-[1.84vh] transition-none`
- Book Demo (primary): `rounded-[10px] py-[1.5vh] text-[1.5vh] font-bold leading-[1.84vh] tracking-[-0.02em] shadow-brand-glow`
- Nav links: `font-heading text-[2.1vh] font-normal leading-[1.84vh]`

### 8.1 Primary CTA button (brand blue)

Use the house `<Button>` from `@/components/ui/button`:

```tsx
import { Button } from "@/components/ui/button";

<Button variant="primary" size="md">
  {t("buttons.book_a_demo")}
</Button>
```

For lead-capture popups, the existing `PopUpButton` shape preserves the legacy glow:

```tsx
<PopUpButton
  text={t("buttons.book_demo")}
  href="popup"
  className="rounded-[10px] py-[1.5vh] text-white"
  style={{
    boxShadow: "1px 4px 24px 0px #38B6FFB2",
    backgroundColor: "#38B6FF",
  }}
/>
```

### 8.2 Section wash card (soft blue)

```tsx
<div className="rounded-2xl bg-brand-50 px-4 py-[4vh] md:px-6 md:py-[5vh]">
  …
</div>
```

### 8.3 Pricing card

See [components/pricing/CustomPackageCard.tsx](src/components/pricing/CustomPackageCard.tsx). Compose with Tailwind classes:

```tsx
<div className="rounded-[20px] border-2 border-[#f1f5f9] bg-white p-8 shadow-card transition hover:-translate-y-2 hover:shadow-card-hover">
  …
</div>
```

For the popular variant, swap base colors to `bg-brand-500 text-white border-brand-500`.

### 8.4 Blog card

See [components/blog/blog-card/](src/components/blog/blog-card/) — rounded card, image + category tag + title + excerpt + meta row.

### 8.5 Autocomplete / Select

Use the house `<Select>` from `@/components/ui/select` (built on Headless UI Listbox). For multi-select / translatable dropdowns, [components/DropDown/TranslatableDropDown.tsx](src/components/DropDown/TranslatableDropDown.tsx) is still the reference shape.

### 8.6 Popup CTA button (lead-capture trigger)

[components/pop-up-button.tsx](src/components/pop-up-button.tsx) and [pop-up-buttonV2.tsx](src/components/pop-up-buttonV2.tsx) open the lead form dialog. Pass `className` + `style` for visual overrides (the components are plain `<button>` / `<a>` underneath).

### 8.7 Accordion (FAQs)

Use Headless UI `Disclosure`:

```tsx
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Minus, Plus } from "lucide-react";

<Disclosure>
  {({ open }) => (
    <div className="rounded-xl bg-brand-50 shadow-[0px_-5px_15px_0px_rgba(56,182,255,0.2)_inset]">
      <DisclosureButton className="flex w-full items-center justify-between px-4 py-3">
        <span className="text-start font-heading text-h6 font-semibold">
          {question}
        </span>
        {open ? <Minus /> : <Plus />}
      </DisclosureButton>
      <DisclosurePanel className="px-4 pb-3 font-heading text-small">
        {answer}
      </DisclosurePanel>
    </div>
  )}
</Disclosure>
```

Reference: [home/faqs.tsx](src/components/home/faqs.tsx), [grade-subject-level/demo-pointers.tsx](src/components/grade-subject-level/demo-pointers.tsx).

### 8.8 Carousel

`swiper` library with Tailwind-styled containers — see [trustpilot-carousel/](src/components/trustpilot-carousel/) or [home/our-client.tsx](src/components/home/our-client.tsx).

### 8.9 Page heading with colored inline span

```tsx
<h1
  className="font-heading text-h1-mobile sm:text-h1-tablet lg:text-h1 text-ink-900"
  dangerouslySetInnerHTML={{
    __html: `Online Tutoring <span class="text-brand-500">Platform</span>`,
  }}
/>
```

### 8.10 Image

```tsx
import Image from "next/image";

<Image
  src="/assets/images/static/foo.webp"
  alt="Descriptive"
  width={1200}
  height={600}
  priority
/>
```

### ✅ DO
- Copy one of these shapes verbatim and adjust values.
- Add `alt` and explicit `width`/`height` (or `fill`) on every `next/image`.
- Use `priority` only on above-the-fold hero images.

### ❌ DON'T
- Don't hand-craft a button/card/accordion when one of these patterns fits.
- Don't load images from a remote host not already allowlisted in [next.config.mjs](next.config.mjs).
- Don't use `<img>` tags for content images.

---

## 9. RTL & Bilingual Patterns

### Pattern A — Logical properties (preferred — works for most cases)

```tsx
const { t } = useI18n();

<div className="flex items-center text-start ms-4">
  <span>{t("nav.home")}</span>
</div>
```

Logical properties (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`, `text-end`) flip automatically under `html[dir="rtl"]`. **No `isRTL` ternary needed.**

### Pattern B — Twin file (diverging layouts)

When the Arabic layout differs substantially, create a dedicated twin:

```
components/grade-subject-level/grade-subject-level.tsx     ← English
components/grade-subject-level/ar-grade-subject-level.tsx  ← Arabic twin, mirrored layout
```

The Arabic route tree ([src/app/ar/](src/app/ar/)) imports the `ar-*` components when needed.

### What globals.css does for you

- `html[dir="rtl"]` flips direction and text-align globally.
- `html[dir="rtl"] *` swaps in Noto Sans Arabic as the default font family.
- Tailwind's logical-property utilities (`ms-*`, `me-*`, etc.) flip automatically because Tailwind reads `dir`.

### What globals.css does NOT do

- It does NOT manually flip `flex-direction`, `transform`, `translate`. If you need those direction-aware, write `rtl:flex-row-reverse` / `rtl:-translate-x-2` etc. — but use sparingly; logical properties cover most cases.

### ✅ DO
- Use logical properties for spacing/positioning (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`, `text-end`).
- Create an `ar-*.tsx` twin when LTR and AR layouts genuinely diverge.
- Keep EN and AR twins structurally aligned so diffs stay readable.

### ❌ DON'T
- Don't try to install `stylis-plugin-rtl` here — this repo doesn't use it.
- Don't ship English on `/ar/**` routes.
- Don't write `fontFamily: "Noto Sans Arabic"` manually — the global CSS selector handles it.
- Don't write `isRTL ? "ml-4" : "mr-4"` — use `ms-4`.
- Don't write `isRTL ? "flex-row-reverse" : "flex-row"` for simple cases — logical properties handle the natural reading order.

---

## 10. Performance Visual Notes

- `next/image` with explicit `width`/`height` (or `fill`) prevents layout shift.
- Above-the-fold hero images: use `priority`.
- Dynamic imports used for heavy below-the-fold components: [drawer.tsx](src/components/drawer.tsx), [DropDown/](src/components/DropDown/), [pop-up-button.tsx](src/components/pop-up-button.tsx), modals.
- Font `display: swap` + `adjustFontFallback: true` already configured in [fonts.ts](src/app/fonts.ts). Do not change.

### ✅ DO
- Dynamic-import components that are not needed for first paint.
- Match the existing import strategy of the feature folder.

### ❌ DON'T
- Don't dynamic-import a hero — it will hurt LCP.
- Don't change font loader options without approval.

---

## 11. Icons

- Source: **`lucide-react` ONLY**.
- All ~23 icons used across the codebase have direct lucide equivalents (Menu, X, ChevronDown, ArrowRight, ArrowLeft, Plus, Minus, Check, BadgeCheck, Search, etc.).
- Common sizes: `h-4 w-4` (16px), `h-5 w-5` (20px), `h-6 w-6` (24px). Prefer Tailwind sizing classes over `size={n}` props for consistency.
- `country-flag-icons` is available for country flags (used in pricing country selector).

```tsx
import { Menu, X, ArrowRight } from "lucide-react";

<Menu className="h-6 w-6 text-brand-500" />
```

### ✅ DO
- Pick the most semantic lucide icon name.
- Use Tailwind sizing classes (`h-5 w-5`) and color classes (`text-brand-500`).

### ❌ DON'T
- Don't install a new icon pack (`react-icons`, `phosphor-icons`, Heroicons) — forbidden ([RULES §RULE-01](./RULES.md)).
- Don't reach for `@mui/icons-material` — uninstalled.
- Don't use emoji as UI icons.

---

## 12. Analytics Surface

Not visual per se, but every new page must be compatible with:

- GA4 pageview (auto via GTM)
- FB Pixel PageView — fires from [src/app/metrics/pixel-tracker.tsx](src/app/metrics/pixel-tracker.tsx) on every route change
- `<UniversalSchema />` JSON-LD — injected site-wide via [src/components/seo/](src/components/seo/)
- Microsoft Clarity (auto via GTM)

If a new page needs extra FB Pixel events (`Lead`, `CompleteRegistration`, etc.), fire them on the appropriate user action and route the server-side mirror through [/api/meta-conversion](src/app/api/meta-conversion/route.ts). Do not expose `PIXEL_TOKEN` on the client.

### ✅ DO
- Let the global trackers do their job — no per-page re-mounting.
- Mirror high-value conversion events through the server-side API.

### ❌ DON'T
- Don't add a second `<Toaster />` / tracker instance.
- Don't log the `PIXEL_TOKEN` or any user identifier to the console.

---

## 13. Next stop in the pipeline

You now have the tokens, anatomy, and patterns. Continue with:

- **Need the file template / bilingual idiom / folder conventions?** → [UI.md §3–6](./UI.md)
- **Need to confirm a specific rule (colors, fonts, styling)?** → [RULES.md §RULE-02 through §RULE-07](./RULES.md)
- **Ready to verify?** → [QA.md](./QA.md)
- **Unsure what file to touch for a given symptom?** → back to [Development.md §2 Context Map](./Development.md)

---

**End.** When in doubt, open an existing component in the same feature area and match its shape. Consistency with the codebase beats design purity.
