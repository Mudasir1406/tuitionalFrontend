---
name: tuitionalFrontend Design System
description: Stage 2 of the SDLC. Design tokens, typography scale, screen anatomies, and canonical UI patterns for the public marketing site. Loaded after Development.md identifies the deliverable; feeds UI.md templates next.
type: design-system
---

# tuitionalFrontend — Design System (SDLC Stage 2)

> **Where you are in the pipeline:** You arrived here from [Development.md §4](./Development.md) having completed intake and scoping. After you lock down tokens and patterns here, continue to [UI.md](./UI.md) for file templates and folder conventions.
> **Source of truth:** the code. If this doc and a component disagree, the component wins and this doc needs updating.
> **Scope reminder:** public read-only site. Editing UI (mutation dialogs, toasts for saves, delete confirmations) does NOT belong here — that's the CMS.

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

## 1. Brand Colors

### Primary palette

| Token | Value | Role | Where it lives |
|---|---|---|---|
| Brand blue | `#38b6ff` | Primary accent, CTAs, focus, icons | Everywhere (also `var(--color-accent)` in [src/app/globals.css](src/app/globals.css)) |
| Brand blue glow | `boxShadow: 1px 4px 24px 0px #38B6FFB2` | Contained button glow | [home/filter.tsx](src/components/home/filter.tsx), hero CTAs |
| Section wash | `#D7F0FF` | Soft hero backgrounds, filter boxes | [home/filter.tsx](src/components/home/filter.tsx) and several hero surfaces |
| Secondary orange | `#FF6B35` | Accent (rarely used directly) | occasional badge / highlight |
| Body text | `#2d2d2d` | Default body (`var(--color-text-main)`) | [globals.css](src/app/globals.css) body rule |
| Headline text | `#000000` | Hero/section heads with explicit color | [home/filter.tsx](src/components/home/filter.tsx) heading |
| Muted text | `#666`, `#64748b` | Secondary copy, captions | pricing card footnotes, testimonial meta |
| Surface | `#ffffff` | Card / modal background | pricing cards, blog cards, modals |

### Pricing slate (self-contained palette)

Used **only** inside [src/components/pricing/](src/components/pricing/) — keep it internal to that feature:

| Value | Role |
|---|---|
| `#1e293b` | Dark heading on pricing card |
| `#334155` | Secondary pricing text |
| `#64748b` | Muted pricing caption |
| `#e2e8f0` | Subtle border |
| `#f1f5f9` | Default card border |
| `#f8fafc` | Card body tint |

If you are building outside `components/pricing/` and want darker neutrals, prefer `#2d2d2d` / `#454545` / `#666` — that's the rest of the site.

### ✅ DO
- Use `var(--color-accent)` **or** `#38b6ff` — interchangeable; pick whichever reads cleaner in context.
- Copy exact hex values from this table. If you need something new, STOP and ask.
- Keep the pricing slate palette contained — do NOT leak it into non-pricing components.

### ❌ DON'T
- Don't invent colors not in this table.
- Don't reach for a darker body color just because the design mock looks a bit different — match the site.
- Don't use the pricing slate in home/, blog/, or grade-subject-level/.

**If the design needs a new shade → Escalate via [Development.md §8](./Development.md).**

---

## 2. Typography

Typography is centrally controlled in three locations — read all three before adding text styles:

- **Scale source:** [src/app/assets/css/typographyTokens.ts](src/app/assets/css/typographyTokens.ts) — the `TYPOGRAPHY_TOKENS` object.
- **MUI theme:** [src/app/assets/css/theme.ts](src/app/assets/css/theme.ts) — maps `h1`…`h6`, `body1`, `body2`, `subtitle1`, `subtitle2`, `caption`, `button` to the tokens, with responsive overrides for tablet (≤1199px) and mobile (≤599px).
- **Global CSS:** [src/app/globals.css](src/app/globals.css) — the "standardized typography" block defines `h1`–`h6`, `p`, `.stat-number`, `.stat-label`, `.btn-text`, `.category-tag`, `.label-small`, `.text-accent`, `.text-uppercase` for plain HTML.

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
| Noto Sans Arabic | `--font-noto-arabic` | AR — [globals.css](src/app/globals.css) `html[dir="rtl"] *` selector swaps this in automatically |

Font registration: [src/app/fonts.ts](src/app/fonts.ts) — foundation file, do not edit without approval.

### ✅ DO
- Prefer `<Typography variant="h2">` — theme already handles responsive sizing.
- When hand-sizing, pull values from `TYPOGRAPHY_TOKENS.desktop.h2.rem`.
- Reference font variables, not literal names: `fontFamily: "var(--font-league-spartan), system-ui, sans-serif"`.
- Add `leagueSpartan.className` from [fonts.ts](src/app/fonts.ts) if you need it on a non-Typography element.

### ❌ DON'T
- Don't invent a new px/rem/vw font size.
- Don't use `em` for font-size — anywhere.
- Don't use `vw` for font-size (legacy [home/filter.tsx](src/components/home/filter.tsx) has it — don't propagate).
- Don't set `fontFamily: "League Spartan"` as a literal string in `sx` — use the variable or the `className`.
- Don't register a new font outside [src/app/fonts.ts](src/app/fonts.ts) — escalate first.

**If the design implies a new font family → Escalate via [Development.md §8](./Development.md) before coding.**

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

### ✅ DO
- Pick the nearest row from this table for the purpose you need.
- Use the brand glow only on primary CTAs — not on every button.

### ❌ DON'T
- Don't improvise a shadow value.
- Don't stack multiple shadows unless the table shows a stacked example (Schools box).

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

### ✅ DO
- Pick the closest established value.
- When unsure, open a neighbouring component and match its radius.

### ❌ DON'T
- Don't add `6px` / `14px` / `18px` out of the blue — the site's rhythm is tighter than that.

---

## 5. Spacing

This repo doesn't enforce a strict spacing scale — look at neighbouring components and match.

Common observed values:
- `8px`, `16px`, `24px`, `32px`, `40px` for internal component padding.
- Section vertical rhythm: `4vh`–`8vh` on home/hero surfaces (legacy pattern) OR `64px`–`96px` on newer blocks.
- MUI Grid `spacing={2}` or `spacing={3}` for internal form grids.

### ✅ DO
- Match the vertical rhythm of the section above and below.
- Prefer `rem` / `px` on newly authored blocks.

### ❌ DON'T
- Don't clone the legacy `vh`-heavy pattern into new components — it breaks on short viewports.

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

Typography overrides in theme use `≤1199px` (tablet) and `≤599px` (mobile) — i.e. `lg-1` and `sm-1` respectively. The CSS-variables block in [globals.css](src/app/globals.css) uses the same breakpoints. Stay consistent.

### ✅ DO
- Use MUI's `{ xs, sm, md, lg, xl }` object syntax inside `sx`.
- Use `@media (max-width: 1199px)` / `@media (max-width: 599px)` in CSS modules.

### ❌ DON'T
- Don't use `theme.breakpoints.up()` / `theme.breakpoints.down()` inside `sx`.
- Don't invent new breakpoints (no 1024px, no 768px unless strictly necessary).

---

## 7. Site Anatomy — navigate by route

When you have a layout bug or need to understand what ships on a given URL, use this table to jump straight to the files.

### Global chrome (every page)

| Surface | Files |
|---|---|
| Sticky `<AppBar>` | [header.tsx](src/components/header.tsx), [header-v2.tsx](src/components/header-v2.tsx), [header-v3.tsx](src/components/header-v3.tsx), [ar-header.tsx](src/components/ar-header.tsx) — three variants exist; confirm which the target route uses |
| Mobile drawer | [drawer.tsx](src/components/drawer.tsx) (dynamic-imported in [layout.tsx](src/app/layout.tsx)) |
| Footer | [footer.tsx](src/components/footer.tsx) / [footerV2.tsx](src/components/footerV2.tsx) / [server-footer.tsx](src/components/server-footer.tsx) / [footer-wrapper.tsx](src/components/footer-wrapper.tsx); Arabic: [ar-footer.tsx](src/components/ar-footer.tsx) / [ar-server-footer.tsx](src/components/ar-server-footer.tsx) |
| Toaster | mounted once in [layout.tsx](src/app/layout.tsx) — use `toast.success()` / `toast.error()` from `react-hot-toast` **only** for form submissions |

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
- `popular-searches.tsx`
- `contact-us.tsx` / `ar-contact-us.tsx`
- `form-dialouge.tsx` / `ar-form-dialouge.tsx` / `form-dialouge-v1.tsx` **(preserve misspelling)**

### Grade-Subject-Level (`/online/[slug]` and `/ar/online/[slug]`)

Two renderer variants branched at [src/app/online/[slug]/page.tsx](src/app/online/[slug]/page.tsx):

| Branch | File |
|---|---|
| `variant === "new"` | [grade-subject-level-v2.tsx](src/components/grade-subject-level/grade-subject-level-v2.tsx) |
| else (legacy) | [grade-subject-level.tsx](src/components/grade-subject-level/grade-subject-level.tsx) |

Section dispatch maps: [sectionsbox.tsx](src/components/grade-subject-level/sectionsbox.tsx) / [sectionsboxV2.tsx](src/components/grade-subject-level/sectionsboxV2.tsx). Section components include hero/, tutor-section/, school-logos-section/, benifts-of-studying-section/, benifts-section/, link-list-view/, tutoring-program-section/, form/, plus `faqs.tsx`, `blog-cta.tsx`, `phone-cta.tsx`, `main-content.tsx`, `students-says.tsx`, `students-says-v2.tsx`.

**Both V1 and V2 still ship in the wild. Do not remove either.**

### Blog (`/blog/**` and `/ar/blog/**`)

Routes: `/blog`, `/blog/[slug]`, `/blog/category/[slug]`, `/blog/tag/[slug]`.

Components in [src/components/blog/](src/components/blog/): `hero/`, `all-blogs/`, `blog-card/`, `search-bar/`, `accordion/`, `author-profile/`, `relatedBlogs/`, `postCTA/`, `tags-social/`, `blogSequences/`, `left-section/`, `hero-nested/`. Every folder has an `ar-*` twin.

### Pricing (`/pricing` and `/ar/pricing`)

Components in [src/components/pricing/](src/components/pricing/) — **CSS modules heavy, PascalCase file names**.

- Legacy package cards: `PackageCard.tsx` / `ArPackageCard.tsx` + module CSS.
- Modern custom pricing: `CustomPricingCard.tsx`, `CustomPackageCard.tsx`, `CustomPricingModal.tsx`, `SimplePackageModal.tsx`.
- Filtering: `PricingFilter.tsx`, `CountrySelector.tsx` / `ArCountrySelector.tsx`.
- Sections: `PricingSection.tsx` / `ArPricingSection.tsx`, `PricingPageClient.tsx` / `ArPricingPageClient.tsx`.

### Curriculum landings

- `/igcse` → [src/app/igcse/](src/app/igcse/)
- `/gcse` → [src/app/gcse/](src/app/gcse/)
- `/a-level` → [src/app/a-level/](src/app/a-level/)
- Legacy `/curiculume` → [src/app/curiculume/](src/app/curiculume/) **(misspelled — preserve)**
- Legacy `/maincuriculume` → [src/app/maincuriculume/](src/app/maincuriculume/) **(misspelled — preserve)**

### Static pages

- [/about/](src/app/about/), [/contact/](src/app/contact/), [/careers/](src/app/careers/), [/testimonials/](src/app/testimonials/), [/thank-you/](src/app/thank-you/), [/privacy-policy/](src/app/privacy-policy/), [/terms-and-conditions/](src/app/terms-and-conditions/) — plus Arabic mirrors where they exist.
- Arabic mirror tree root: [src/app/ar/](src/app/ar/)

### ✅ DO
- Use this table as the primary navigation map when a bug reproduces on a specific URL.
- Check whether a V1 vs V2 renderer is in play **before** editing grade-subject-level components.

### ❌ DON'T
- Don't rename any file/folder in this section — imports and live URLs depend on the exact spelling.
- Don't remove V1 code paths — they still serve traffic.

---

## 8. Canonical UI Patterns (copy-ready)

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

See [components/pricing/PackageCard.module.css](src/components/pricing/PackageCard.module.css):
- `.card`: white bg, `2px solid #f1f5f9` border, `20px` radius, `40px 32px` padding, `0 4px 20px rgba(0,0,0,0.08)` shadow, hover lifts 8px.
- `.popular`: brand-blue filled variant with glow shadow.

### 8.4 Blog card

See [components/blog/blog-card/](src/components/blog/blog-card/) — rounded card, image + category tag + title + excerpt + meta row.

### 8.5 Autocomplete / DropDown

Use [components/DropDown/DropDown.tsx](src/components/DropDown/DropDown.tsx) — don't build a new one. It's already bilingual-aware.

### 8.6 Popup CTA button (lead-capture trigger)

[components/pop-up-button.tsx](src/components/pop-up-button.tsx) and [pop-up-buttonV2.tsx](src/components/pop-up-buttonV2.tsx) open the lead form dialog.

### 8.7 Accordion (FAQs)

`<Accordion>` + `<AccordionSummary expandIcon={<ExpandMoreRounded />}>` + `<AccordionDetails>`. The theme does not override Accordion — match the pattern in [home/faqs.tsx](src/components/home/faqs.tsx) or [blog/accordion/](src/components/blog/accordion/).

### 8.8 Carousel

Use `swiper` with `@mui/material` wrapping — see [trustpilot-carousel/](src/components/trustpilot-carousel/) or [home/our-client.tsx](src/components/home/our-client.tsx).

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

### ✅ DO
- Copy one of these shapes verbatim and adjust values.
- Add `alt` and explicit `width`/`height` on every `next/image`.
- Use `priority` only on above-the-fold hero images.

### ❌ DON'T
- Don't hand-craft a button/card/accordion when one of these patterns fits.
- Don't load images from a remote host not already allowlisted in [next.config.mjs](next.config.mjs).
- Don't use `<img>` tags for content images.

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

The Arabic route tree ([src/app/ar/](src/app/ar/)) imports the `Ar*` components. **When editing a shared concept, always check whether an Arabic twin exists and keep both in sync.**

### What globals.css does for you

- `html[dir="rtl"]` flips direction and text-align globally.
- `html[dir="rtl"] *` swaps in Noto Sans Arabic as the default font family.
- `.MuiToolbar-root` and `.MuiContainer-root` get RTL-aware adjustments.

### What globals.css does NOT do

- It does NOT flip `margin-left` / `padding-left` / `flex-direction` / `transform` the way `stylis-plugin-rtl` would. You must do those manually per-component, or diverge via a twin file.

### ✅ DO
- Manually flip every direction-sensitive style with `isRTL` / `isArabic`.
- Create an `ar-*.tsx` / `Ar*.tsx` twin when conditionals get messy.
- Keep EN and AR twins structurally aligned so diffs stay readable.

### ❌ DON'T
- Don't try to install `stylis-plugin-rtl` here — this repo doesn't use it.
- Don't ship English on `/ar/**` routes.
- Don't write `fontFamily: "Noto Sans Arabic"` manually — the global CSS selector handles it.

---

## 10. Performance Visual Notes

- `next/image` with explicit `width`/`height` prevents layout shift.
- Above-the-fold hero images: use `priority`.
- Dynamic imports used for heavy below-the-fold components: [drawer.tsx](src/components/drawer.tsx), [DropDown/](src/components/DropDown/), [pop-up-button.tsx](src/components/pop-up-button.tsx).
- Font `display: swap` + `adjustFontFallback: true` already configured in [fonts.ts](src/app/fonts.ts). Do not change.

### ✅ DO
- Dynamic-import components that are not needed for first paint.
- Match the existing import strategy of the feature folder.

### ❌ DON'T
- Don't dynamic-import a hero — it will hurt LCP.
- Don't change font loader options without approval.

---

## 11. Icons

- Source: `@mui/icons-material` **ONLY**.
- Prefer `*Rounded` variants (`MenuRounded`, `CloseRounded`, `ExpandMoreRounded`, `SearchRounded`).
- Common sizes: `20px`, `24px`, `28px`. Use `sx={{ fontSize: 24 }}` or the `fontSize` prop (`"small" | "medium" | "large"`).
- `country-flag-icons` is available for country flags (used in pricing country selector) — don't reach for an alternative.

### ✅ DO
- Pick `MenuRounded` over `Menu` when both exist.
- Use `fontSize: 24` for standard UI icons, `20` for inline text icons.

### ❌ DON'T
- Don't install a new icon pack (`lucide-react`, `react-icons`, `phosphor-icons`) — forbidden ([RULES §RULE-01](./RULES.md)).
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
