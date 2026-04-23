---
name: tuitionalFrontend Design System
description: Design tokens, typography scale, screen anatomies, and canonical UI patterns used across the public marketing site. Consult before any visual work.
type: design-system
---

# tuitionalFrontend — Design System

> **Source of truth:** the code. If this doc and a component disagree, the component wins and this doc needs updating.
> **Scope:** this is the public read-only site. Editing UI (dialogs for mutation, toasts for saves, delete confirmations) does NOT belong here — that's the CMS.

---

## 1. Brand Colors

### Primary palette

| Token | Value | Role | Where |
|---|---|---|---|
| Brand blue | `#38b6ff` | Primary accent, CTAs, focus, icons | Everywhere (also `var(--color-accent)` in globals.css) |
| Brand blue glow | `boxShadow: 1px 4px 24px 0px #38B6FFB2` | Contained button glow | home/filter, hero CTAs |
| Section wash | `#D7F0FF` | Soft hero backgrounds, filter boxes | home/filter.tsx and several hero surfaces |
| Secondary orange | `#FF6B35` | Accent (rarely used directly) | occasional badge / highlight |
| Body text | `#2d2d2d` | Default body color (`var(--color-text-main)`) | globals.css body rule |
| Headline text | `#000000` | Hero/section heads with explicit color | home/filter.tsx heading |
| Muted text | `#666`, `#64748b` | Secondary copy, captions | pricing card footnotes, testimonial meta |
| Surface | `#ffffff` | Card / modal background | pricing cards, blog cards, modals |

### Pricing slate (self-contained palette)

The pricing components use a consistent slate scale in their CSS modules — keep it internal to that feature:

| Value | Role |
|---|---|
| `#1e293b` | Dark heading on pricing card |
| `#334155` | Secondary pricing text |
| `#64748b` | Muted pricing caption |
| `#e2e8f0` | Subtle border |
| `#f1f5f9` | Default card border |
| `#f8fafc` | Card body tint |

If you are building outside `components/pricing/` and want darker neutrals, prefer `#2d2d2d` / `#454545` / `#666` — that's what the rest of the site uses.

### Rules

- `var(--color-accent)` and `#38b6ff` are interchangeable — pick whichever reads cleaner in context.
- **Do NOT** invent colors beyond what's in this doc. If a design requires a new shade, STOP and ask.

---

## 2. Typography

Typography is centrally controlled in three places. Read all three if you're about to add any text style:

- **Scale source:** [src/app/assets/css/typographyTokens.ts](src/app/assets/css/typographyTokens.ts) — the `TYPOGRAPHY_TOKENS` object
- **MUI theme:** [src/app/assets/css/theme.ts](src/app/assets/css/theme.ts) — maps `h1`…`h6`, `body1`, `body2`, `subtitle1`, `subtitle2`, `caption`, `button` to the tokens, with responsive overrides for tablet (≤1199px) and mobile (≤599px)
- **Global CSS:** [src/app/globals.css](src/app/globals.css) — the "standardized typography" block defines `h1`–`h6`, `p`, `.stat-number`, `.stat-label`, `.btn-text`, `.category-tag`, `.label-small`, `.text-accent`, `.text-uppercase` for plain HTML

### Desktop scale (from TYPOGRAPHY_TOKENS)

| Variant | rem | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| h1 | 3rem | 700 | 1.2 | -0.02em |
| h2 | 2.25rem | 700 | 1.25 | -0.01em |
| h3 | 1.5rem | 700 | 1.3 | 0 |
| h4 | 1.25rem | 600 | 1.4 | 0 |
| h5 | 1.125rem | 600 | 1.4 | 0 |
| h6 | 1rem | 600 | 1.5 | 0 |
| body | 1rem | 400 | 1.7 | 0 |
| small | 0.875rem | 400 | 1.5 | 0 |
| nav | 1rem | 500 | 1.5 | 0.01em |
| button | 1rem | 600 | 1 | 0.02em |
| statNumber | 3rem | 700 | 1 | 0 |
| statLabel | 0.875rem | 500 | 1.4 | 0.05em UPPERCASE |
| categoryTag | 0.875rem | 600 | 1 | 0.08em UPPERCASE |
| formLabel | 0.875rem | 500 | 1.4 | 0 |
| formInput | 1rem | 400 | 1.5 | 0 |

### Tablet overrides (≤1199px)

h1 → 2.25rem · h2 → 1.75rem · h3 → 1.25rem · h4 → 1.125rem · h5 → 1rem · statNumber → 2.25rem

### Mobile overrides (≤599px)

base html font-size drops to `15px` · h1 → 1.75rem · h2 → 1.375rem · h3 → 1.125rem · h4 → 1rem · body → 0.9375rem · button → 0.9375rem · statNumber → 1.75rem · **inputs never drop below 16px** (iOS zoom prevention — enforced by theme.ts `MuiInputBase` override)

### Fonts

| Family | Variable | Scope |
|---|---|---|
| League Spartan | `--font-league-spartan` | EN headings (wired into theme for h1–h6) |
| Inter | `--font-inter` | EN body (theme default) |
| Noto Sans Arabic | `--font-noto-arabic` | AR — globals.css `html[dir="rtl"] *` selector swaps this in automatically |

You will rarely need to set `fontFamily` manually — the theme + HTML root className handle it. Exceptions:
- Direct CSS module with no Typography component → `font-family: var(--font-league-spartan), system-ui, sans-serif;`
- Need `leagueSpartan.className` on a specific non-Typography element → `className={leagueSpartan.className}` (imported from [src/app/fonts.ts](src/app/fonts.ts))

### Typography rules

- ✅ Prefer `<Typography variant="h2">` over hand-sized text
- ✅ When hand-sizing, use `TYPOGRAPHY_TOKENS.desktop.h2.rem` etc.
- ❌ Never invent a new px/rem/vw font size
- ❌ Never use `em` for font-size
- ❌ Never use `vw` for font-size (legacy `home/filter.tsx` has this — don't propagate)

---

## 3. Shadows

| Purpose | Value |
|---|---|
| Card base shadow | `0 4px 20px rgba(0, 0, 0, 0.08)` |
| Card hover | `0 8px 30px rgba(0, 0, 0, 0.12)` |
| Brand button glow (small) | `1px 4px 24px 0px #38B6FFB2` |
| Brand button glow (medium) | `0 8px 30px rgba(56, 182, 255, 0.25)` |
| Popular card (brand-filled) | `0 12px 40px rgba(56, 182, 255, 0.3)` |
| Input subtle | `0px 1px 4px 0px rgba(0, 0, 0, 0.08)` |
| Schools box inset (brand) | `0px -3px 8px 0px #00000026 inset, 0px 2px 1px 0px #0000000d` |

If you need a shadow, pick the nearest purpose from this list. Don't improvise.

---

## 4. Radii

| Value | Where |
|---|---|
| `8px` | MUI Button default (theme-level) |
| `10px` | Legacy inputs / contained buttons / section boxes (home filter, grade-subject-level) |
| `12px` | Modals, CTA cards |
| `16px` | Modern content cards |
| `20px` | Pricing package cards, popular pricing card |
| `50%` | Circular elements (icon chips, avatars) |

Pick the closest established value. Don't add `6px` / `14px` / `18px` out of the blue — the site's rhythm is tighter than that.

---

## 5. Spacing

This repo doesn't enforce a strict spacing scale — look at neighbouring components and match.

Common observed values:
- `8px`, `16px`, `24px`, `32px`, `40px` for internal component padding
- Section vertical rhythm: `4vh`–`8vh` on home/hero surfaces (legacy pattern) OR `64px`–`96px` on newer blocks
- MUI Grid `spacing={2}` or `spacing={3}` for internal form grids
- Legacy home/ components use `vh` units heavily — don't clone that pattern into new code; prefer rem / px

---

## 6. Breakpoints

MUI defaults (aligned across `sx` + CSS modules):

| Key | min-width |
|---|---|
| `xs` | 0 |
| `sm` | 600px |
| `md` | 900px |
| `lg` | 1200px |
| `xl` | 1536px |

Typography overrides in theme use `≤1199px` (tablet) and `≤599px` (mobile) — that's `lg-1` and `sm-1` respectively. The CSS-variables block in [globals.css](src/app/globals.css) also uses these breakpoints. Stay consistent.

---

## 7. Site Anatomy (by route)

### Global chrome (every page)
- Sticky `<AppBar>` via one of three header variants ([header.tsx](src/components/header.tsx), [header-v2.tsx](src/components/header-v2.tsx), [header-v3.tsx](src/components/header-v3.tsx)) or Arabic twin [ar-header.tsx](src/components/ar-header.tsx). Check which the target route uses.
- Mobile drawer: [drawer.tsx](src/components/drawer.tsx) (dynamic-imported in [layout.tsx](src/app/layout.tsx))
- Footer: [footer.tsx](src/components/footer.tsx) / [footerV2.tsx](src/components/footerV2.tsx) / [server-footer.tsx](src/components/server-footer.tsx) / [footer-wrapper.tsx](src/components/footer-wrapper.tsx). Arabic: [ar-footer.tsx](src/components/ar-footer.tsx) / [ar-server-footer.tsx](src/components/ar-server-footer.tsx).
- Toaster: mounted once in [layout.tsx](src/app/layout.tsx) — use `toast.success()` / `toast.error()` from `react-hot-toast` only for form-submission feedback (not for content mutations — there are none in this repo).

### Home (`/` and `/ar`)
Sections in [src/components/home/](src/components/home/): `filter.tsx` (hero with lead form), `info.tsx`, `get-started.tsx`, `trusted.tsx`, `our-client.tsx`, `tutor-modal.tsx`, `faqs.tsx`, `questions.tsx`, `popular-searches.tsx`, `contact-us.tsx`. Each has an Arabic twin (`ar-*.tsx`).

### Grade-Subject-Level (`/online/[slug]` and `/ar/online/[slug]`)
Two renderer variants branched at [src/app/online/[slug]/page.tsx](src/app/online/[slug]/page.tsx):
- `variant === "new"` → [grade-subject-level-v2.tsx](src/components/grade-subject-level/grade-subject-level-v2.tsx)
- else → [grade-subject-level.tsx](src/components/grade-subject-level/grade-subject-level.tsx)

Each uses section components from `components/grade-subject-level/` (hero, tutor-section, school-logos-section, benefits, FAQs, CTA, etc.) — check `sectionsbox.tsx` / `sectionsboxV2.tsx` for the dispatch map.

### Blog (`/blog/**` and `/ar/blog/**`)
Trees: `/blog`, `/blog/[slug]`, `/blog/category/[slug]`, `/blog/tag/[slug]`. Components in [src/components/blog/](src/components/blog/): `hero/`, `all-blogs/`, `blog-card/`, `search-bar/`, `accordion/`, `author-profile/`, `relatedBlogs/`, `postCTA/`, `tags-social/`, `blogSequences/`. Every folder has an `ar-*` twin.

### Pricing (`/pricing` and `/ar/pricing`)
Components in [src/components/pricing/](src/components/pricing/) — **uses CSS modules heavily**. Legacy package cards + modern custom pricing both render here.

### Curriculum landing pages
`/igcse`, `/gcse`, `/a-level` — static pages with curriculum-specific sections.
Legacy routes `/curiculume` and `/maincuriculume` (misspelled — preserve).

### Static pages
`/about`, `/contact`, `/careers`, `/testimonials`, `/thank-you`, `/privacy-policy`, `/terms-and-conditions` — plus Arabic mirrors where they exist.

---

## 8. Canonical UI Patterns

### 8.1 Primary CTA button (brand blue)

```tsx
const styles = {
  ctaButton: {
    backgroundColor: "#38B6FF",
    color: "#ffffff",
    fontSize: "1rem",
    fontWeight: 700,
    padding: "1rem 1.5rem",
    borderRadius: "10px",
    textTransform: "none",
    boxShadow: "1px 4px 24px 0px #38B6FFB2",
    ":hover": {
      backgroundColor: "#38B6FF",
      boxShadow: "1px 4px 24px 0px #38B6FFB2",
    },
  },
};
```

Reference: [home/filter.tsx `containedBtn`](src/components/home/filter.tsx)

### 8.2 Section wash card (soft blue)

```tsx
const styles = {
  washCard: {
    backgroundColor: "#D7F0FF",
    paddingY: { xs: "4vh", md: "5vh" },
    paddingX: { xs: "2vh", md: "3vh" },
    borderRadius: { xs: "2vh", md: "1vh" },
  },
};
```

Reference: [home/filter.tsx `filterBox`](src/components/home/filter.tsx)

### 8.3 Pricing card (CSS-module pattern)

See [components/pricing/PackageCard.module.css](src/components/pricing/PackageCard.module.css) for the canonical shape:
- `.card`: white bg, `2px solid #f1f5f9` border, `20px` radius, `40px 32px` padding, `0 4px 20px rgba(0,0,0,0.08)` shadow, hover lifts 8px
- `.popular`: brand-blue filled variant with glow shadow

### 8.4 Blog card

See [components/blog/blog-card/](src/components/blog/blog-card/) — rounded card, image + category tag + title + excerpt + meta row.

### 8.5 Autocomplete / DropDown

Use [components/DropDown/DropDown.tsx](src/components/DropDown/DropDown.tsx) — don't build a new one. It's already bilingual-aware.

### 8.6 Popup CTA button (lead-capture trigger)

[components/pop-up-button.tsx](src/components/pop-up-button.tsx) and [pop-up-buttonV2.tsx](src/components/pop-up-buttonV2.tsx) open the lead form dialog.

### 8.7 Accordion (FAQs)

`<Accordion>` + `<AccordionSummary expandIcon={<ExpandMoreRounded />}>` + `<AccordionDetails>`. The theme does not override Accordion — match the pattern in [components/home/faqs.tsx](src/components/home/faqs.tsx) or [components/blog/accordion/](src/components/blog/accordion/).

### 8.8 Carousel

Use `swiper` with `@mui/material` wrapping — see [components/trustpilot-carousel/](src/components/trustpilot-carousel/) or [components/home/our-client.tsx](src/components/home/our-client.tsx).

### 8.9 Page heading with colored inline span

```tsx
<Typography variant="h1" component="h1">
  Online Tutoring{" "}
  <Typography component="span" variant="h1" sx={{ color: "var(--color-accent)" }}>
    Platform
  </Typography>
  <br />
  Customized for 1:1 Online Tutoring Sessions
</Typography>
```

Reference: [home/filter.tsx](src/components/home/filter.tsx)

### 8.10 Image

```tsx
import Image from "next/image";
<Image src="/assets/images/static/foo.webp" alt="Descriptive" width={1200} height={600} priority />
```
- `alt` is MANDATORY (SEO).
- Use `priority` only on above-the-fold hero images.
- Remote `src` must be on an allowlisted host in [next.config.mjs](next.config.mjs).

---

## 9. RTL & Bilingual Patterns

### Pattern A — Inline mirroring (simple components)

```tsx
const { t, isRTL, isArabic } = useI18n();

<Box
  sx={{
    display: "flex",
    flexDirection: isRTL ? "row-reverse" : "row",
    textAlign: isArabic ? "right" : "left",
  }}
>
  <Typography>{t("nav.home")}</Typography>
</Box>
```

### Pattern B — Twin file (diverging layouts)

When the Arabic layout differs substantially, create a dedicated twin:

```
components/blog/hero/Hero.tsx          ← English
components/blog/ar-hero/ArHero.tsx     ← Arabic twin, mirrored layout
```

The Arabic route tree (`src/app/ar/**`) imports the `Ar*` components. **When editing a shared concept, always check whether an Arabic twin exists and keep both in sync.**

### What globals.css does for you

- `html[dir="rtl"]` flips direction and text-align globally
- `html[dir="rtl"] *` swaps in Noto Sans Arabic as the default font family
- `.MuiToolbar-root` and `.MuiContainer-root` get RTL-aware adjustments

### What globals.css does NOT do

- It does NOT flip `margin-left` / `padding-left` / `flex-direction` / `transform` the way stylis-plugin-rtl would. You must do those manually per-component, or diverge via a twin file.

---

## 10. Performance Visual Notes

- `next/image` with explicit `width`/`height` prevents layout shift.
- Above-the-fold hero images: use `priority`.
- Dynamic imports are used for heavy below-the-fold components ([drawer.tsx](src/components/drawer.tsx), DropDown, pop-up-button). Follow the pattern — don't eagerly import heavy interactive pieces into the home page.
- Font `display: swap` + `adjustFontFallback: true` already configured in [fonts.ts](src/app/fonts.ts). Don't change.

---

## 11. Icons

- Source: `@mui/icons-material` ONLY.
- Prefer `*Rounded` variants (`MenuRounded`, `CloseRounded`, `ExpandMoreRounded`, `SearchRounded`).
- Common sizes: `20px`, `24px`, `28px`. Use `sx={{ fontSize: 24 }}` or the `fontSize` prop (`"small" | "medium" | "large"`).
- `country-flag-icons` is available for country flags (used in pricing country selector) — don't reach for an alternative.

---

## 12. Analytics Surface

Not visual per se, but every new page should be compatible with:
- GA4 pageview (auto via GTM)
- FB Pixel PageView (fires from [src/app/metrics/pixel-tracker.tsx](src/app/metrics/pixel-tracker.tsx) on every route change)
- `<UniversalSchema />` JSON-LD (already injected site-wide)
- Microsoft Clarity (auto via GTM)

If a new page needs extra FB Pixel events (Lead, CompleteRegistration, etc.), fire them on the appropriate user action and route the server-side mirror through [api/meta-conversion](src/app/api/meta-conversion/route.ts). Do not expose `PIXEL_TOKEN` on the client.

---

**End.** When in doubt, open an existing component in the same feature area and match its shape. Consistency with the codebase beats design purity.
