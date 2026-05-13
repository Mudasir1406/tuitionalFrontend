---
name: tuitionalFrontend Components Catalogue
description: Authoritative catalogue of reusable components in src/components/. Load BEFORE authoring any new component. The workflow is non-negotiable - search this catalogue, find an exact-or-resembling match, reuse or compose; only build new when no match exists. Lists every house primitive and feature-shared component with its prop surface, sizing, font/colour tokens, and the constraints that callers must respect.
type: catalogue
---

# tuitionalFrontend - Components Catalogue

> **Stack:** Tailwind CSS + Headless UI + lucide-react. (MUI was removed in 2026 - DO NOT re-introduce it.)
> **Source of truth:** the code in [src/components/](../../src/components/). If this catalogue and a component disagree, the component wins and this catalogue needs an update in the same PR.
> **Companion docs:** [.claude/skills/ui-pipeline/Design.md](./ui-pipeline/Design.md) (tokens) and [.claude/skills/ui-pipeline/RULES.md](./ui-pipeline/RULES.md) (forbidden APIs).

---

## 0. When to Load This Skill

Load this skill **before** doing any of the following:

- Authoring a new React component (anywhere in `src/`).
- Refactoring or replacing an existing component.
- Adding a CTA, input, dropdown, dialog, drawer, card, tag, breadcrumb, or any other recurring UI surface.
- Reviewing a PR that touches `src/components/**`.

If you skip this catalogue and re-author a primitive that already exists, the diff will be rejected.

---

## 1. The Reuse Workflow (Mandatory Before Authoring)

```
┌──────────────────────────────────────────────────────────────────────┐
│ STEP 1 - SEARCH THE CATALOGUE                                        │
│   Look up the type of element you need in §3 (Primitives) or §4      │
│   (Feature-shared).                                                  │
│   - Exact match found?       → §6 "Reuse As-Is"                      │
│   - Resembling match found?  → §6 "Compose Around"                   │
│   - No match?                → continue to STEP 2                    │
└──────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────────┐
│ STEP 2 - GREP THE REPO (catch un-catalogued candidates)              │
│   Glob:   src/components/**/*.tsx                                    │
│   Grep:   "<your-noun>" or a near-synonym (case-insensitive)         │
│   If a candidate appears, read it and decide: reuse / compose / new. │
│   If a candidate is added → update this catalogue in the same PR.    │
└──────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────────┐
│ STEP 3 - BUILD NEW (only if STEPS 1 + 2 returned nothing)            │
│   - Place under src/components/ui/ if it is a generic primitive.     │
│   - Place under src/components/<feature>/ if it is feature-scoped.   │
│   - Follow §8 "Authoring New" + §9 "Rules".                          │
│   - Add a row to §3 or §4 of THIS file.                              │
└──────────────────────────────────────────────────────────────────────┘
```

**Do not skip Step 1.** A wasted authoring pass is more expensive than a 60-second catalogue lookup.

---

## 2. Token Constraints (The Only Values You May Type)

Every component in this catalogue obeys the same token surface. New components must too.

### 2.1 Colour tokens (Tailwind, from [tailwind.config.ts](../../tailwind.config.ts))

| Class | Hex | Use for |
|---|---|---|
| `bg-brand-500` / `text-brand-500` | `#38B6FF` | Primary CTA, focus rings, brand icons |
| `bg-brand-600` / `hover:bg-brand-600` | darker brand | Primary hover |
| `bg-brand-200` | `#9EDCFF` | Secondary brand surface, soft hovers |
| `bg-brand-50` | `#D7F0FF` | Hero / filter-box backgrounds |
| `text-brand-700` | brand dark | Selected option label inside Listbox |
| `text-ink-900` | `#2D2D2D` | Default body and heading colour |
| `text-ink-700` | `rgba(0,0,0,0.77)` | Form values, secondary copy |
| `text-ink-600` | `#666` | Muted captions |
| `text-ink-500` | mid-grey | Helper text, chevron |
| `text-ink-400` / `placeholder:text-ink-400` | light-grey | Placeholders |
| `bg-ink-100` | very light grey | Ghost-button hover, disabled surfaces |
| `ring-ink-200` / `border-ink-200` | hairline | Dropdown ring, divider |
| `text-success` / `bg-success` / `border-success` | `#51B893` | Outlined success CTA only |
| `text-warning` / `bg-warning` | `#FFB000` | Warning icons only |
| `text-danger` / `bg-danger` | `#B70000` | Destructive button, error ring |

**Forbidden:** arbitrary `bg-[#abc123]`, `text-[#999]`, `border-[#…]` when a token exists. Pricing-slate hex values are allowed **only** inside [src/components/pricing/](../../src/components/pricing/).

### 2.2 Typography tokens

| Class | Size / Weight / LH | Use for |
|---|---|---|
| `text-h1` ‧ `text-h1-tablet` ‧ `text-h1-mobile` | 3rem / 700 / 1.2 (desktop) | Page H1 |
| `text-h2` ‧ `-tablet` ‧ `-mobile` | 2.25rem / 700 / 1.25 | Section H2 |
| `text-h3` ‧ `-tablet` ‧ `-mobile` | 1.5rem / 700 / 1.3 | Block H3 |
| `text-h4` ‧ `-tablet` ‧ `-mobile` | 1.25rem / 600 / 1.4 | Card H4, dialog title |
| `text-h5` ‧ `-tablet` | 1.125rem / 600 / 1.4 | Sub-headings |
| `text-h6` | 1rem / 600 / 1.5 | Smallest heading |
| `text-body` ‧ `text-body-mobile` | 1rem / 400 / 1.7 | Default paragraph |
| `text-small` | 0.875rem / 400 / 1.5 | Helper / caption-ish |
| `text-caption` | 0.75rem / 500 / 1.3 | Image captions, footnotes |
| `text-nav` | 1rem / 500 / 1.5 / 0.01em | Navigation links |
| `text-button` ‧ `text-button-mobile` | 1rem / 600 / 1 / 0.02em | Button label |
| `text-form-label` | 0.875rem / 500 / 1.4 | Label above an input |
| `text-form-input` | 1rem / 400 / 1.5 | Input / textarea / select value |

**Font families:**
- `font-heading` → League Spartan (EN headings + most CTAs)
- `font-body` → Inter (EN paragraphs, form values, ghost buttons)
- `font-arabic` → Noto Sans Arabic (auto-applied to all text under `html[dir="rtl"]` via [globals.css](../../src/app/globals.css))

**Forbidden:** raw `text-[Npx]`, `text-[Nvh]`, `text-[Nrem]` when a token fits. `em` font-size anywhere. `vw` for font-size anywhere.

### 2.3 Shadows

| Class | Use for |
|---|---|
| `shadow-card` | Default card/input base (`0 1px 4px rgba(0,0,0,0.08)`) |
| `shadow-brand-glow` | Primary CTA glow (`0.1vh 1.5vh 3.4vh #38B6FF66`) |
| `shadow-header` | Sticky AppBar inset shadow |
| `shadow-cta-white` | White CTA glow on blue (footer Enroll Now) |
| `shadow-xl` | Dialog/Drawer panel lift |
| `shadow-[1px_15px_34px_0px_rgba(56,182,255,0.4)]` | TeacherCard primary CTA glow (verbatim legacy) |
| `shadow-[1px_4px_24px_0px_#38B6FFB2]` | PopUpButton compact brand glow (verbatim legacy) |

**Forbidden:** improvised arbitrary shadows. Only use a token or a verbatim entry already in Design.md §3.

### 2.4 Radii

| Class | Px | Where |
|---|---|---|
| `rounded` / `rounded-md` | 4-6 | Tag pills, chips, primitive Button/Input/Select |
| `rounded-lg` | 8 | Breadcrumb shell, simple cards, Dialog panel |
| `rounded-[10px]` | 10 | Legacy hero CTAs, PopUp brand buttons (preserved) |
| `rounded-xl` | 12 | TeacherCard outer shell |
| `rounded-2xl` | 16 | ImageCard, content cards |
| `rounded-[20px]` | 20 | Pricing package cards |
| `rounded-full` | circle | Avatar, icon chip, close button |

**Forbidden:** `rounded-[6px]`, `rounded-[14px]`, `rounded-[18px]` — pick the nearest established value.

### 2.5 Sizing rhythm (heights for interactive surfaces)

| Element | Class | Px |
|---|---|---|
| Button `sm` | `h-9 px-4` | 36 |
| Button `md` | `h-10 px-6` | 40 |
| Button `lg` | `h-12 px-8` | 48 (mobile hit target) |
| Input / Select | `h-11 px-4` | 44 |
| Drawer width default | `w-80` | 320 |
| Container max-widths | `max-w-screen-sm/md/lg/xl/2xl` | 600 / 900 / 1200 / 1500 / 2000 |
| Dialog max-widths | `max-w-sm/md/2xl/4xl` (size sm/md/lg/xl) | 384 / 448 / 672 / 896 |

**Mobile rule:** form inputs must never render below 16px font-size (iOS auto-zoom). The `text-form-input` token already complies; do not override below it.

---

## 3. House Primitives (src/components/ui/) — REUSE FIRST

These are the canonical primitives. **Any new generic UI element must check this section first.** If the primitive needs a missing feature, propose extending the primitive — do not fork it.

### 3.1 `Button`

- **File:** [src/components/ui/button.tsx](../../src/components/ui/button.tsx)
- **Audit:** [.claude/skills/ui-pipeline/components/button.md](./ui-pipeline/components/button.md)
- **Import:** `import { Button } from "@/components/ui/button";`
- **Variants:** `primary` | `outline` | `ghost` | `destructive`
- **Sizes:** `sm` (h-9 px-4) | `md` (h-10 px-6, **default**) | `lg` (h-12 px-8)
- **Locked classes:** `rounded-md`, `font-body font-semibold`, `transition-colors`, focus-visible ring, `disabled:opacity-50`.
- **Caller may override:** colour via `className` (Header's outlined success "AI Digital SAT" overrides with `border-success text-success`); shadow via `className="shadow-brand-glow"`.
- **MUI mapping:** `contained primary` → `primary`; `outlined primary` → `outline`; `text` → `ghost`; `contained error` → `destructive`.

```tsx
<Button variant="primary" size="md">Save</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost" size="sm" disabled>Loading…</Button>
```

### 3.2 `Container`

- **File:** [src/components/ui/container.tsx](../../src/components/ui/container.tsx)
- **Import:** `import { Container } from "@/components/ui/container";`
- **Sizes:** `sm` (600) | `md` (900) | `lg` (1200, **default**) | `xl` (1500) | `2xl` (2000)
- **Default gutters:** `px-4 sm:px-6 lg:px-8` — opt out with `disableGutters`.
- **Polymorphic:** `as="section" | "main" | "article" | "header" | "footer" | "nav"` (default `div`).

```tsx
<Container size="lg">{children}</Container>
<Container as="section" size="xl">{children}</Container>
```

### 3.3 `Dialog`

- **File:** [src/components/ui/dialog.tsx](../../src/components/ui/dialog.tsx)
- **Import:** `import { Dialog } from "@/components/ui/dialog";`
- **Built on:** Headless UI 2.x (focus trap, Escape, outside click, scroll lock, ARIA — all for free).
- **Sizes:** `sm` (max-w-sm) | `md` (max-w-md, **default**) | `lg` (max-w-2xl) | `xl` (max-w-4xl)
- **Panel:** `rounded-lg bg-white shadow-xl`. Title bar shows when `title` is passed OR `hideCloseButton` is false.
- **Body padding:** `p-4 sm:p-6` (built-in — do not re-pad at caller).
- **Close button:** auto-rendered with `<X size={18} />` from lucide; suppress with `hideCloseButton` when you render your own header.

```tsx
<Dialog open={open} onClose={close} title={t("pricing.title")} size="md">{body}</Dialog>
```

### 3.4 `Drawer`

- **File:** [src/components/ui/drawer.tsx](../../src/components/ui/drawer.tsx)
- **Import:** `import { Drawer } from "@/components/ui/drawer";`
- **Built on:** Headless UI 2.x.
- **Sides:** `start` (logical inline-start — LTR=left, RTL=right; **default**) | `end`
- **Width:** `widthClassName` (Tailwind class). Default `w-80` (320px). Use `w-96` for richer menus.
- **RTL:** the slide-in axis flips automatically via the `rtl:` variant on the translate utility.

```tsx
<Drawer open={isOpen} onClose={close}>{menu}</Drawer>
<Drawer open={isOpen} onClose={close} side="end" widthClassName="w-96">{cart}</Drawer>
```

### 3.5 `Input` / `Textarea`

- **File:** [src/components/ui/input.tsx](../../src/components/ui/input.tsx)
- **Import:** `import { Input, Textarea } from "@/components/ui/input";`
- **Height:** `h-11` (44px) for `Input`. `Textarea` is content-height with `rows` (default 4) and `resize-y`.
- **Tokens:** `bg-white px-4 font-body text-form-input text-ink-900 shadow-card rounded-md`, label `text-form-label text-ink-700`, helper/error `text-small`.
- **Mobile:** font-size is `text-form-input` (16px) — never lower it.
- **Error state:** pass `error="…"` → adds `ring-2 ring-danger` and renders message under the input.
- **Helper state:** pass `helper="…"` → renders muted message under the input.
- **Accessibility:** `<label htmlFor=…>` wraps the field; `aria-invalid` + `aria-describedby` are wired automatically.

```tsx
<Input label="Email" type="email" name="email" value={v} onChange={e => setV(e.target.value)} />
<Input name="phone" error={errors.phone} />
<Textarea label="Message" name="message" rows={5} />
```

### 3.6 `Select`

- **File:** [src/components/ui/select.tsx](../../src/components/ui/select.tsx)
- **Import:** `import { Select } from "@/components/ui/select";`
- **Built on:** Headless UI Listbox (keyboard nav, type-ahead, ARIA — all for free).
- **Height:** `h-11` (44px) — matches `Input`.
- **Tokens:** `bg-white pe-10 ps-4 text-start font-heading text-form-input shadow-card rounded-md`. Chevron `lucide ChevronDown`. Selected check `lucide Check`.
- **Generics:** `Select<string>` or `Select<number>`. `value: T | null`. Options: `{ value: T; label: ReactNode; disabled?: boolean }[]`.
- **Width:** defaults to `w-full` on the button; override with `buttonClassName`.
- **Wrap in your own `<label>` if you need a form-label** — the primitive does not render one (unlike `Input`).

```tsx
<Select
  value={country}
  onChange={setCountry}
  options={countries.map(c => ({ value: c.code, label: c.name }))}
  placeholder={t("form.selectCountry")}
/>
```

---

## 4. Feature-Shared Components (Top-Level + Cross-Feature)

These live outside `ui/` and are shared across views. Reuse them where their semantics match — do not re-author CTAs, breadcrumbs, cards, tags, or carousels in feature files.

### 4.1 `PopUpButton`

- **File:** [src/components/pop-up-button.tsx](../../src/components/pop-up-button.tsx)
- **Purpose:** CTA that either navigates (`href="/path"`) or opens the EN home `FormDialog` (`href="popup"`).
- **Renders:** `<button>` (popup mode) or `<a>` (link mode). Base classes `inline-flex cursor-pointer items-center justify-center text-center normal-case no-underline outline-none` + `leagueSpartan.className` + caller `className`.
- **Caller controls all colour/shadow/size** via `className` / `style`. Default visual is *none*.

```tsx
<PopUpButton text="Book A Demo" href="popup"
  className="w-full rounded-[10px] bg-brand-500 px-4 py-2.5 font-heading text-sm font-semibold text-white shadow-brand-glow"
/>
```

### 4.2 `PopUpButtonV2`

- **File:** [src/components/pop-up-buttonV2.tsx](../../src/components/pop-up-buttonV2.tsx)
- **Purpose:** Same shape as `PopUpButton` but opens `FormV2Dialog` (grade-subject-level lead form) instead of the home form.
- **Use:** on `/online/[slug]` (GSL) pages where the V2 lead form is required.

### 4.3 `Breadcrumb`

- **File:** [src/components/bread-crumb/bread-crumb.tsx](../../src/components/bread-crumb/bread-crumb.tsx)
- **Renders:** `<nav>` with `bg-[#eaf6ff] rounded-lg p-2.5 gap-x-6`, Home anchor + auto-derived segments from `usePathname`.
- **Active segment colour:** `text-[#007bff]` (verbatim legacy — preserve).
- **Drop-in:** zero props.

### 4.4 `ImageCard`

- **File:** [src/components/image-card/ImageCard.tsx](../../src/components/image-card/ImageCard.tsx)
- **Purpose:** Tutor profile card with portrait image, name, subject + curriculum tags, description, rating, "Book A Demo" CTA.
- **Outer:** `rounded-2xl bg-white shadow-[0_8px_24px_-8px_rgba(56,182,255,0.25),0_2px_8px_rgba(0,0,0,0.06)]`.
- **Hover lift:** swaps to a deeper brand shadow (verbatim).
- **Locale:** `locale="en"|"ar"` — flips CTA copy (`"Book A Demo"` / `"احجز حصة تجريبية"`).

### 4.5 `TeacherCard`

- **File:** [src/components/teacher-card/TeacherCard.tsx](../../src/components/teacher-card/TeacherCard.tsx)
- **Purpose:** Horizontal teacher-row card (avatar + name + hours + description + 2 CTAs).
- **Outer:** `rounded-xl bg-white p-3 sm:p-4 shadow-[rgba(99,99,99,0.2)_0px_2px_8px_0px]`.
- **CTAs:** `Book A Demo` (PopUpButton, brand-500, `rounded-[10px]`, `shadow-brand-glow`) and `View Profile` (outlined `border-2 border-[green]`).
- **Locale:** `locale="en"|"ar"`.

### 4.6 `Tag` (multi-coloured, indexed)

- **File:** [src/components/tag/Tag.tsx](../../src/components/tag/Tag.tsx)
- **Purpose:** Pill used inside cards (subject / curriculum chips). Auto-picks one of 5 colour pairs based on `index % 5`.
- **Shape:** `h-6 my-1 inline-flex items-center rounded-md px-2 text-[11px] font-medium leading-none`.
- **Clickability:** `isClickable + link` → wraps in `<a>`; else inert `<span>`.

### 4.7 `Tag` (brand green, anchor)

- **File:** [src/components/tags/Tag.tsx](../../src/components/tags/Tag.tsx)
- **Purpose:** Single-colour blog tag pill (always anchor).
- **Shape:** `inline-block rounded bg-[#08b463] px-2 py-1 text-caption text-white`.

> **Note:** these two `Tag` components share a name but are distinct. Pick by location: card tags (multi-colour) vs. blog tags (green anchor). Do not unify them without explicit instruction.

### 4.8 `Ar-Tag`

- **File:** [src/components/ar-tags/Ar-Tag.tsx](../../src/components/ar-tags/Ar-Tag.tsx)
- **Purpose:** Arabic mirror of the blog `Tag` — use on AR routes.

### 4.9 `CustomInput`

- **File:** [src/components/custom-input/custom-input.tsx](../../src/components/custom-input/custom-input.tsx)
- **Purpose:** Bare `<input>` (no label, no shadow, no padding) for compose-into-form patterns where a parent owns the framing chrome.
- **Tokens:** `leagueSpartan.className h-full w-full border-0 bg-transparent p-0 outline-none placeholder:text-ink-400`.
- **When to use:** *only* when the wrapping element already supplies background, height, padding, and shadow. Otherwise prefer `<Input>` from §3.5.

### 4.10 Trustpilot, Countdown, Footer, Header

- **Header:** [src/components/header.tsx](../../src/components/header.tsx) — unified EN/AR sticky AppBar, consumes `useI18n`.
- **Header V3:** [src/components/header-v3.tsx](../../src/components/header-v3.tsx) — minimal logo-only header for marketing landings (`/igcse`, `/gcse`, `/a-level`).
- **Drawer (mobile menu):** [src/components/drawer.tsx](../../src/components/drawer.tsx) — composes the house `Drawer` + lucide `X`.
- **Footer:** [src/components/footer.tsx](../../src/components/footer.tsx) — unified EN/AR. The `shadow-footer-card` triple-inset shadow is locked in for the floating card.
- **Trustpilot carousel:** [src/components/trustpilot-carousel/](../../src/components/trustpilot-carousel/) — embed only; do not roll a second carousel.
- **CountdownTimer:** [src/components/countdown/CountdownTimer.tsx](../../src/components/countdown/CountdownTimer.tsx) — reuse, do not reimplement timer math.

### 4.11 Language switching & utilities

- **LanguageSwitcher:** [src/components/language-switcher.tsx](../../src/components/language-switcher.tsx) — toggle. Do not build a second toggle.
- **RouteLanguageSwitcher:** [src/components/route-language-switcher.tsx](../../src/components/route-language-switcher.tsx) — translates the current pathname.
- **renderWithLineBreaks:** [src/components/line-break-text.tsx](../../src/components/line-break-text.tsx) — helper that splits a string on `<br>` and emits `<br />` between fragments. Use this whenever a CMS string may contain `<br>`.

---

## 5. Feature-Scoped Components (Look Inside Before Authoring)

When the work is feature-specific (home, GSL, blog, pricing, careers, etc.), open the feature folder first — it almost always already contains the section block you are about to build.

| Feature | Folder | What's inside |
|---|---|---|
| Home | [src/components/home/](../../src/components/home/) | Hero, our-clients, tutor-modal, form-dialouge, sections used on `/` |
| About | [src/components/about/](../../src/components/about/) | About hero, why-choose-tuitional, hero-info |
| Blog | [src/components/blog/](../../src/components/blog/) | Blog list/grid, author, related, post layout pieces |
| Careers | [src/components/careers/](../../src/components/careers/) | Job list, application form |
| Contact | [src/components/contact/](../../src/components/contact/) | Contact form + map |
| Curriculum landings | [src/components/curiculume/](../../src/components/curiculume/) | IGCSE / GCSE / A-Level shared blocks |
| Grade × Subject × Level | [src/components/grade-subject-level/](../../src/components/grade-subject-level/) | Hero, tutor-section, faqs, post-cta, FormV2Dialog, related blocks |
| Pricing | [src/components/pricing/](../../src/components/pricing/) | Pricing cards, plan grid, popular highlight — pricing slate colours stay here |
| Testimonials | [src/components/testimonials/](../../src/components/testimonials/) | Reviews carousel, video reviews |
| SEO / Schema | [src/components/seo/](../../src/components/seo/) | `UniversalSchema` and JSON-LD wrappers |
| Footer links | [src/components/footerLinks/](../../src/components/footerLinks/) | Column rendering for footer |

**Rule:** if the work is "add a new section to the `/online/[slug]` page", open `src/components/grade-subject-level/` first. Do not put a GSL-only block at the components root.

---

## 6. Deprecated / Do-Not-Reuse

These components exist but are superseded. **Do not extend them; do not import them in new code.** When you touch a file that imports one, leave it alone (Zero-Modification of unrelated code), but author new code against the house primitive.

| Deprecated | Replace with | Reason |
|---|---|---|
| [src/components/DropDown/DropDown.tsx](../../src/components/DropDown/DropDown.tsx) | `Select` from [`src/components/ui/select.tsx`](../../src/components/ui/select.tsx) | Custom HTML + `DropDown.css`; no keyboard a11y, no Listbox semantics |
| [src/components/input/Input.tsx](../../src/components/input/Input.tsx) | `Input` from [`src/components/ui/input.tsx`](../../src/components/ui/input.tsx) | Half-broken (renders `label` into `value`); uses `Input.module.css` |
| [src/components/textArea/TextArea.tsx](../../src/components/textArea/TextArea.tsx) | `Textarea` from [`src/components/ui/input.tsx`](../../src/components/ui/input.tsx) | Same defect as above; uses `TextArea.module.css` |
| `TranslatableDropDown` ([src/components/DropDown/TranslatableDropDown.tsx](../../src/components/DropDown/TranslatableDropDown.tsx)) | Compose house `Select` with locale-aware option labels | Wraps the deprecated legacy DropDown |

**Forbidden:** authoring a new `.module.css` file for any new component. The legacy `.module.css` files exist for the deprecated trio above and are not a precedent.

---

## 7. Reuse Patterns — Decision Cheat-Sheet

| You need… | Reach for | Notes |
|---|---|---|
| A button (any colour, any size) | `Button` §3.1 | Pick `primary` / `outline` / `ghost` / `destructive`. Override colour via `className` only when site precedent exists (e.g., success outline). |
| A CTA that opens a lead form | `PopUpButton` §4.1 (home) or `PopUpButtonV2` §4.2 (GSL) | Pass full Tailwind chrome via `className`. |
| A wrapper that centres content with max-width | `Container` §3.2 | Polymorphic — use `as="section" / "main"`. |
| A text input with label/error/helper | `Input` §3.5 | Mobile-safe (16px). Has built-in `<label>`. |
| A bare unstyled input inside a custom shell | `CustomInput` §4.9 | Only when the shell already provides height/bg/shadow. |
| A multi-line text input | `Textarea` §3.5 | `resize-y` by default. |
| A dropdown / single-select | `Select` §3.6 | For Autocomplete-style filtering, extend the primitive (escalate first). |
| A modal | `Dialog` §3.3 | Pass `title` for built-in header; `hideCloseButton` to render your own. |
| A slide-in panel (sidebar/mobile menu) | `Drawer` §3.4 | `side="start"` flips automatically in RTL. |
| A blog tag pill (anchor) | `Tag` from [`tags/`](../../src/components/tags/) §4.7 or `Ar-Tag` §4.8 (AR) | Single colour. |
| A subject/curriculum chip on a card | `Tag` from [`tag/`](../../src/components/tag/) §4.6 | Auto-picks colour from `index`. |
| A tutor card (square portrait) | `ImageCard` §4.4 | Pass `locale`. |
| A teacher row (horizontal) | `TeacherCard` §4.5 | Pass `locale`. |
| A breadcrumb | `Breadcrumb` §4.3 | Zero props — derives from URL. |
| A countdown timer | `CountdownTimer` §4.10 | |
| Rich text with `<br>` from CMS | `renderWithLineBreaks` §4.11 | |
| A language toggle | `LanguageSwitcher` §4.11 | Do not build a second one. |

---

## 8. Authoring a New Component (Only When §7 Returns Nothing)

Follow the file template and folder rules from [.claude/skills/ui-pipeline/UI.md §3](./ui-pipeline/UI.md). Quick essentials:

1. **Placement:**
   - Generic primitive (could be used anywhere) → `src/components/ui/<name>.tsx`. Also create `.claude/skills/ui-pipeline/components/<name>.md` (copy the template from the README in that folder).
   - Feature-scoped (only one route family will use it) → `src/components/<feature>/<name>.tsx`.

2. **File header pattern:**
   ```tsx
   "use client";              // only if hooks / event handlers / Headless UI
   import { forwardRef, type ButtonHTMLAttributes } from "react";
   import { cn } from "@/utils/cn";
   ```

3. **Props:** named `interface IProps` (or `<Name>Props`). Default export OR named export consistent with the folder.

4. **Render:** root element merges `className` via `cn(...)` so callers can extend. Use `forwardRef` if it is an interactive primitive (button / input / select / dialog / drawer).

5. **Locked classes only:** assemble from the §2 token tables. No raw hex. No arbitrary px/rem font sizes when a token fits. No `style={{}}` except for runtime-computed values (e.g., insetInlineStart in `Drawer`).

6. **Bilingual:** if the component renders user-facing text, accept `locale="en"|"ar"` (precedent: `ImageCard`, `TeacherCard`) OR consume `useI18n` from [src/hooks/useI18n.ts](../../src/hooks/useI18n.ts). Logical CSS properties (`ps-`, `pe-`, `start-`, `end-`, `me-`, `ms-`) flip automatically.

7. **A11y:** include `aria-label` for icon-only buttons. Use Headless UI for any composite widget (listbox, combobox, menu, dialog, drawer, disclosure, tabs).

8. **Catalogue update:** in the same PR, add a row to §3 (primitive) or §4 (feature-shared) of THIS file. Skipping this step is a defect.

---

## 9. Rules (Non-Negotiable)

> Treat these as execution constraints. Non-compliance is a defect.

### R1 — Catalogue-First Existence Check
Before authoring, run §1's two-step search. If a match exists, reuse. The cost of a 60-second lookup is always lower than the cost of an unnecessary primitive.

### R2 — No Duplicate Primitive
There is **one** `Button`, `Input`, `Textarea`, `Select`, `Dialog`, `Drawer`, `Container` in this repo. Do not author a parallel one. Extend the existing primitive (and update its audit file under [.claude/skills/ui-pipeline/components/](./ui-pipeline/components/)) instead.

### R3 — Token-Only Styling
Use the tokens in §2 verbatim. No arbitrary hex (`bg-[#abc123]`), no arbitrary text sizes (`text-[14px]`), no improvised shadows. Pricing-slate hex values live **only** inside `src/components/pricing/`.

### R4 — Font Family Pairing
Headings → `font-heading`. Body / form / ghost-button text → `font-body`. Arabic auto-applies via `html[dir="rtl"]` — do not set `font-arabic` manually unless overriding a specific override.

### R5 — Mobile Input Floor
Form inputs (`Input`, `Textarea`, `Select`, `CustomInput`) must never render below 16px on mobile. The `text-form-input` token already complies; do not override below it.

### R6 — Bilingual Precedent
Components that render user-facing text accept `locale="en"|"ar"` (see `ImageCard`, `TeacherCard`) OR consume `useI18n`. **Never** hardcode an English-only string in a component that ships on AR routes.

### R7 — No MUI / Emotion
MUI was removed in 2026. Do **not** import `@mui/*`, `@emotion/*`, `styled-components`, or `styled()` anywhere. If you find one in an existing file, treat it as a defect and report rather than propagate.

### R8 — forwardRef on Interactive Primitives
Any new primitive in `src/components/ui/` that renders a single interactive element (button / input / textarea / a-tag wrapper) must use `forwardRef` and set `displayName`. Precedent: `Button`, `Input`, `Textarea`, `CustomInput`, `Container`.

### R9 — `cn()` for ClassName Merging
Accept a `className` prop on every component and merge with [`cn`](../../src/utils/cn.ts) so callers can extend. Caller `className` must come **last** in `cn()` so it can shadow variant defaults (precedent: `Button`, `Container`, `Dialog`).

### R10 — No New `.module.css`
The three legacy `.module.css` files in the deprecated trio (§6) are precedent for what NOT to add. Style with Tailwind utility classes only. If you genuinely need a one-off animation or pseudo selector, use a Tailwind plugin / `@layer` in [globals.css](../../src/app/globals.css) (foundation file → escalate).

### R11 — Headless UI for Composites
For listbox, combobox, menu, dialog, drawer, disclosure, tabs, popover — use Headless UI 2.x. Do not hand-roll keyboard / ARIA. Precedent: `Dialog`, `Drawer`, `Select`.

### R12 — Catalogue Maintenance
Adding a new primitive or feature-shared component requires adding a row to §3 or §4 of this file in the same PR. Renaming a component requires updating both its row here and its audit file under [.claude/skills/ui-pipeline/components/](./ui-pipeline/components/).

### R13 — Do Not Touch Foundation
Never modify the following without explicit approval: [tailwind.config.ts](../../tailwind.config.ts), [postcss.config.js](../../postcss.config.js), [next.config.mjs](../../next.config.mjs), [src/app/layout.tsx](../../src/app/layout.tsx), [src/app/globals.css](../../src/app/globals.css), [src/app/fonts.ts](../../src/app/fonts.ts), [src/app/assets/css/typographyTokens.ts](../../src/app/assets/css/typographyTokens.ts), [src/hooks/useI18n.ts](../../src/hooks/useI18n.ts), [src/context/drawer-context.tsx](../../src/context/drawer-context.tsx), [src/context/language-context.tsx](../../src/context/language-context.tsx).

### R14 — Legacy Verbatim Shadow / Radius
When matching legacy CTAs (e.g., `rounded-[10px]`, `shadow-[1px_15px_34px_0px_rgba(56,182,255,0.4)]`, `shadow-[1px_4px_24px_0px_#38B6FFB2]`), use the verbatim arbitrary value already in Design.md §3. Do not "improve" or "normalize" them.

### R15 — Locale Awareness
Components on `/ar/**` routes receive `dir="rtl"` from the layout. Logical properties (`ps-`, `pe-`, `start-`, `end-`, `me-`, `ms-`, `text-start`, `text-end`) flip automatically. **Forbidden:** physical `pl-`, `pr-`, `ml-`, `mr-`, `text-left`, `text-right` for directional spacing. Exception: `Drawer` uses physical `translate-x` + `rtl:` variant because Tailwind 3.x translate utilities are physical-only.

---

## 10. Search Recipe (Use This Verbatim Before Authoring)

When the noun isn't in the §7 cheat-sheet, run the following before authoring:

```
1. Glob:   src/components/ui/*.tsx
2. Glob:   src/components/**/<noun>*.tsx
3. Glob:   src/components/**/<synonym>*.tsx       (e.g., card/tile, modal/dialog, chip/tag, popover/menu)
4. Grep:   "<NounAsExportedSymbol>"  in  src/components/  (capitalised, case-sensitive)
5. Grep:   "<noun-as-jsx>"           in  src/         (case-insensitive — finds usages too)
```

If any of these returns a candidate that is not in §3 or §4 of this catalogue → read the candidate, decide reuse/compose/new, and **add a row to this catalogue in the same PR.**

---

**End.** This catalogue is the gate. Keep it tight, keep it accurate, update it the moment a new primitive lands.
