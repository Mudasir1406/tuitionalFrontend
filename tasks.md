# MUI → Tailwind Visual Repair — Tasks

**Source of truth:** [.claude/plans/hey-so-previously-i-dreamy-cake.md](C:/Users/pc/.claude/plans/hey-so-previously-i-dreamy-cake.md)
**MUI baseline commit:** `4969d2b` (2026-03-25)
**Migration commit:** `30e01f6` (2026-03-25)

## Workflow (revised 2026-04-30 per user direction)

> Original "compare current Tailwind vs MUI baseline → patch deltas" approach was producing drift-on-drift. New approach:
>
> **Per component:** read the MUI baseline source verbatim (`git show 4969d2b:<path>`) → write a fresh Tailwind file that is a **1:1 line-by-line port**. Each `<Box sx={styles.X}>` is replaced by a `<div className="...">` that translates each `sx` property directly to Tailwind classes; each `<Typography variant="...">` is replaced by a semantic tag (`<p>`/`<h2>`) carrying the MUI Typography variant defaults (e.g., `subtitle1` → `text-base font-normal leading-[1.75]`, `h2` → `text-[3.75rem] font-light leading-[1.2] tracking-[-0.00833em]`). Each block carries a comment naming the original style it replaces, so the audit is one-glance verifiable.
>
> Header was already approved before the workflow change and stays as-is. Tier-1 components from Footer onward use the new approach.

---

## Tier 1 — Sitewide & High-Visibility

- [x] **Header** — [src/components/header.tsx](src/components/header.tsx) ☑ Approved 2026-04-30
- [x] **UI Button primitive** — [src/components/ui/button.tsx](src/components/ui/button.tsx) ☑ No-op (new file, no MUI baseline)
- [x] **PopUpButton** — [src/components/pop-up-button.tsx](src/components/pop-up-button.tsx), [src/components/pop-up-buttonV2.tsx](src/components/pop-up-buttonV2.tsx) ☑ No-op (visually neutral wrappers; visual regressions live in callers)
- [ ] **Footer** — [src/components/footer.tsx](src/components/footer.tsx), [src/components/footerV2.tsx](src/components/footerV2.tsx), [src/components/footer-wrapper.tsx](src/components/footer-wrapper.tsx), [src/components/server-footer.tsx](src/components/server-footer.tsx), [src/components/ar-server-footer.tsx](src/components/ar-server-footer.tsx) — _reverted 2026-04-30; restart pending user direction_
- [ ] **Hero — grade-subject-level** — [src/components/grade-subject-level/hero.tsx](src/components/grade-subject-level/hero.tsx), [heroV2.tsx](src/components/grade-subject-level/heroV2.tsx), [ar-hero.tsx](src/components/grade-subject-level/ar-hero.tsx)
- [ ] **Lead form dialog** — [src/components/home/form-dialouge.tsx](src/components/home/form-dialouge.tsx) + [src/components/grade-subject-level/form/](src/components/grade-subject-level/form/)
- [ ] **Pricing cards** — [src/components/pricing/PackageCard.tsx](src/components/pricing/PackageCard.tsx), [ArPackageCard.tsx](src/components/pricing/ArPackageCard.tsx), [CustomPackageCard.tsx](src/components/pricing/CustomPackageCard.tsx)
- [ ] **FAQ accordion** — [src/components/home/faqs.tsx](src/components/home/faqs.tsx), [src/components/grade-subject-level/faqs.tsx](src/components/grade-subject-level/faqs.tsx), [src/components/blog/accordion/](src/components/blog/accordion/), [src/components/blog/ar-accordion/](src/components/blog/ar-accordion/)
- [ ] **Hero — about** — [src/components/about/hero/hero.tsx](src/components/about/hero/hero.tsx)
- [ ] **Image card / Teacher card** — [src/components/image-card/ImageCard.tsx](src/components/image-card/ImageCard.tsx), [src/components/teacher-card/TeacherCard.tsx](src/components/teacher-card/TeacherCard.tsx)

## Tier 2 — Page-Specific Heroes & Sections

- [ ] About — hero-info, why-choose-tuitional
- [ ] Testimonials — hero, hero-info, reviews-on-wp, reviews-on-sp, video-based-reviews
- [ ] Careers — hero, hero-info, apply-now, team-values, top-talent
- [ ] Blog — hero, hero-nested, blog-card, search-bar, related-blogs, post-cta, author-profile, tags-social, conducive-enviroment, embrace, options-image-home
- [ ] Curriculum — offer, popular-igcse-subjects (+v2), educational-counseling, why-choose
- [ ] Contact — get-in-touch, info, learn-togeather
- [ ] Tutor section — TutorSection (+V2, Ar), GridView (+Ar), ListView, HorizontalTutorCarousel, FlagIcon, TutoringProgramSection
- [ ] Grade-subject-level extras — get-started, benifts-section, students-says, demo-pointers, blog-cta, phone-cta, sectionsbox, school-logos-section, link-list-view, found-page

## Tier 3 — Utilities & Specialized

- [ ] DropDown / TranslatableDropDown
- [ ] Tag, Ar-Tag (and tags/, ar-tags/ duplicates)
- [ ] Bread-crumb
- [ ] Countdown timer
- [ ] Trustpilot carousel
- [ ] Drawer / mobile nav
- [ ] LanguageSwitcher / route-language-switcher
- [ ] Header-v3 (minimal landing variant)
- [ ] Custom-input / textArea / Input variants
- [ ] All `Ar-*` and `ar-*` twins — sweep at the end to verify mirrors

---

## Foundation file edits log (audit trail)

> Every edit to `tailwind.config.ts`, `globals.css`, or any other foundation file is recorded here with: file, what was added/changed, why (which component required it), and the MUI source value being preserved.

### 2026-04-30 — Header
- **File:** [tailwind.config.ts](tailwind.config.ts)
- **Section:** `theme.extend.boxShadow`
- **Added:** `header: "0px -0.3vh 0.8vh 0px #00000026 inset, 0px 0.2vh 0.1vh 0px #0000000D"`
- **Why:** [src/components/header.tsx](src/components/header.tsx) sticky AppBar lost its inset shadow during MUI→Tailwind migration; was using generic `shadow-card`. Restores the exact MUI baseline value from `git show 4969d2b:src/components/header.tsx` styles.container.boxShadow.

### 2026-04-30 — Footer
- **File:** [tailwind.config.ts](tailwind.config.ts)
- **Sections:** `theme.extend.boxShadow` + `theme.extend.backgroundImage`
- **Added:**
  - `boxShadow["footer-card"]`: `5px -5px 8px 0 rgba(0,0,0,0.15) inset, -6px 2px 8px 0 rgba(0,0,0,0.15) inset, 0 4px 4px 0 rgba(0,0,0,0.25)`
  - `boxShadow["cta-white"]`: `1px 15px 34px 0px rgba(0,0,0,0.2)`
  - `backgroundImage["footer-fade"]`: `linear-gradient(to bottom, rgba(255,255,255,0.7), #37B6FF)`
- **Why:** [src/components/footer.tsx](src/components/footer.tsx) and [footerV2.tsx](src/components/footerV2.tsx) were using inline arbitrary shadow/gradient classes for the triple-inset card shadow, the white CTA glow, and the white→brand gradient. Promoting to named tokens keeps the values in one place and lets future components reuse them. Values restored verbatim from MUI baseline `styles.contanier.boxShadow`, `styles.contactButton.boxShadow`, and `styles.background.background`.

---

## Per-component detail

> Filled in as each component is worked on. Format per component:
>
> ### <Component>
> **MUI baseline:** key sx values from `git show 4969d2b:<path>`
> **Discrepancy table:**
> | Property | MUI baseline | Current Tailwind | Fix |
> |---|---|---|---|
> **Implementation:** what changed in the Tailwind file
> **Foundation edits:** any tailwind.config.ts / globals.css additions
> **Skill file updates:** entries added to Design.md / UI.md / RULES.md
> **QA result:** pass/fail per QA-02..QA-14 section
> **Status:** ☐ Pending / ◧ In review / ☑ Approved

---

### Header — [src/components/header.tsx](src/components/header.tsx)

**MUI baseline (`git show 4969d2b:src/components/header.tsx`):**
- Wrapper bg: `linear-gradient(to bottom, #D7F0FF, rgba(255,255,255,0.7))` at 10/10/20/30 vh.
- Two decorative `bg-#38B6FF` circles absolute-positioned behind the AppBar (left: 3/4.5/5/7.5 vh; right: 6/7/8/10.9 vh).
- AppBar: `bg-rgba(255,255,255,0.7)`, `borderRadius: 10px`, `boxShadow: 0px -0.3vh 0.8vh 0px #00000026 inset, 0px 0.2vh 0.1vh 0px #0000000D`.
- Nav items: `fontSize 2.1vh, weight 400, lineHeight 1.84vh, color black`.
- CTA cluster (in order): outlined `#51B893` AI Digital SAT button → contained `#38B6FF` Book Demo button (with `boxShadow: 0.1vh 1.5vh 3.4vh 0px #38B6FF66`) → RouteLanguageSwitcher.
- WhatsApp floater: `position: fixed; bottom: 0; right: 0` (always anchored right, even in RTL), `rotateAnimation 2s ease-in-out infinite`.

**Discrepancy table:**

| Property | MUI baseline | Pre-fix Tailwind | Fix applied |
|---|---|---|---|
| Wrapper gradient | `linear-gradient(to bottom, #D7F0FF, rgba(255,255,255,0.7))` | `bg-gradient-to-b from-[#D7F0FF] to-white/70` | `bg-hero-fade` (named token, identical value) |
| Decorative left circle | `bg-#38B6FF` 3/4.5/5/7.5 vh, `top:1.7vh start:1.2/2.5/5/4.5 vw` | **missing** | restored as `<span aria-hidden>` with absolute positioning + responsive sizing |
| Decorative right circle | `bg-#38B6FF` 6/7/8/10.9 vh, `top:3.2vh end:3.5vw` | **missing** | restored as `<span aria-hidden>` |
| AppBar shadow | `0px -0.3vh 0.8vh 0px #00000026 inset, 0px 0.2vh 0.1vh 0px #0000000D` | `shadow-card` (`0 1px 4px rgba(0,0,0,0.08)`) | new `shadow-header` token in tailwind.config.ts |
| AI Digital SAT button | outlined `#51B893`, `1.2vh × 1.5vw` padding, `1.5vh / 1.84vh` font, `transition: none` | **removed** | restored: `<Button variant="outline" className="border-success text-success px-[1.5vw] py-[1.2vh] text-[1.5vh] font-bold leading-[1.84vh] transition-none ..."` |
| Book Demo button typography | `1.5vh / 1.84vh / -2% letter-spacing / 700` | `text-[1.1rem] font-bold` | `text-[1.5vh] font-bold leading-[1.84vh] tracking-[-0.02em]` |
| Book Demo glow | `0.1vh 1.5vh 3.4vh 0px #38B6FF66` | inline `shadow-[...]` | `shadow-brand-glow` (named token, equivalent) |
| Book Demo radius | `10px` | `rounded-md` (10px) | `rounded-[10px]` (explicit, identical) |
| Nav line-height | `1.84vh` | unset | added `leading-[1.84vh]` |
| WhatsApp position | `right: 0` (locked LTR) | `end-0` (flips in RTL) | `right-0` (locked) |
| Mobile logo dimensions | `width: 203, height: 49` | `w-[60px] h-auto` (compressed to ~60×14) | `h-[49px] w-[203px]` (matches MUI exactly) — **post-review fix** |
| Header bar height | MUI total = Toolbar (56/64px) + AppBar paddingY (2vh) ≈ 72/80px | content+padding ≈ 64.5px (DevTools) | `min-h-[72px] sm:min-h-20` (80px sm+) — **post-review fix v2** (initial v1 `min-h-14 sm:min-h-16` was wrong because in MUI the min-height is on the Toolbar *inside* the padded AppBar, not on the AppBar itself) |
| Header bar horizontal gutter | MUI `<Toolbar>` default `padding-x: 16px (xs) / 24px (sm+)` | `px-4` always (16px) | `px-4 sm:px-6` — **post-review fix** |

**Implementation:** see diff in [src/components/header.tsx](src/components/header.tsx).

**Foundation edits:**
- [tailwind.config.ts](tailwind.config.ts) → `theme.extend.boxShadow.header` added (logged above).

**Skill file updates:**
- [.claude/skills/ui-pipeline/Design.md](.claude/skills/ui-pipeline/Design.md) §3 — added `shadow-header` row to the shadows table; corrected `shadow-card` value to match `tailwind.config.ts` (`0px 1px 4px 0px rgba(0,0,0,0.08)`); merged `shadow-brand-glow` into the named-token rows.
- [.claude/skills/ui-pipeline/Design.md](.claude/skills/ui-pipeline/Design.md) §8.0 (new) — added a Sticky AppBar anatomy snippet with the canonical decorative-circle + CTA-cluster shape.

**QA result:** _populated below after lint + smoke._

**Status:** ☑ Approved 2026-04-30 (user confirmed height matches via DevTools side-by-side at `:3001` vs `:3002`)

---

### UI Button primitive + PopUpButton — no-op pass

**Files:** [src/components/ui/button.tsx](src/components/ui/button.tsx), [src/components/pop-up-button.tsx](src/components/pop-up-button.tsx), [src/components/pop-up-buttonV2.tsx](src/components/pop-up-buttonV2.tsx)

**Verdict:** No code changes required.

**Reasoning:**
1. `ui/button.tsx` did not exist in the MUI baseline (`fatal: path 'src/components/ui/button.tsx' exists on disk, but not in '4969d2b'`) — it was added during migration as a Tailwind replacement for MUI `<Button>`. Variant map (`primary`/`outline`/`ghost`/`destructive`) cleanly mirrors MUI `contained`/`outlined`/`text`/`contained+error`. Sizes (`sm`/`md`/`lg`) use the typography tokens. No baseline to drift from.
2. `pop-up-button.tsx` was always a thin behavioral wrapper. MUI baseline: `<Button sx={callerProvides}>`. Current Tailwind: `<button className={callerProvides}>`. Both render with caller-provided styling. Functionally and visually equivalent given the same caller styling.
3. Same conclusion for `pop-up-buttonV2.tsx`.
4. The MUI baseline `pop-up-button.tsx` had `usePathname() → isArabic ? <ArFormDialog> : <FormDialog>`. That conditional was dropped in the migration. Verified non-regression: `ar-form-dialouge.tsx` was deleted; `form-dialouge.tsx` now handles AR internally via `useI18n()` (line 125 references `locale`).
5. The visual regressions tied to button glows / shadows / radii in typical callers live in the **caller components** (footer, get-started, image-card, pricing-card, etc.) — those get repaired in subsequent passes.

**Status:** ☑ Approved 2026-04-30 (no-op)

---

### Footer — [src/components/footer.tsx](src/components/footer.tsx) + [footerV2.tsx](src/components/footerV2.tsx)

**MUI baseline (`git show 4969d2b:src/components/footer.tsx`):**
- Outer surface: `linear-gradient(to bottom, rgba(255,255,255,0.7), #37B6FF)`, `paddingY: { xs: 40, md: 100 }`.
- Right circle: `position: absolute, top: 70, right: 60, w/h: 135, borderRadius: 70, bg: #37B6FF, zIndex: -1` (physical right, no RTL flip).
- Left circle: `position: absolute, bottom: 0, left: -230, border: 100px solid #37B6FF, w/h: 330(xs)/430(sm+), bg: transparent, zIndex: -1` (physical left, no RTL flip).
- Translucent card: `bg-rgba(255,255,255,0.7), borderRadius: 10, shadow: 5px -5px 8px inset / -6px 2px 8px inset / 0px 4px 4px outer`.
- Contact band: `bg-rgba(56,182,255,1), borderRadius: 5, marginTop: -70, paddingY responsive 10/20/25/30, width 80%/85%`.
- Admission text: `<Typography variant="subtitle1">` (1rem, weight 400, lh 1.75) — small.
- Phone text: `<Typography variant="h2">` (3.75rem default in MUI theme).
- Enroll Now CTA: `boxShadow: 1px 15px 34px 0px rgba(0,0,0,0.2), backgroundColor: white, borderRadius: 10, color: #009BF5`.
- Description: `body2` (0.875rem). Section headings: `subtitle2` weight 700 (0.875rem). About-us links: `body2`. Rights: `subtitle2`.
- Social icons: imported from `public/assets/images/svg/{Facebook,Instagram,LinkedIN}_black.svg` at 48×48.

**Discrepancy table:**

| Property | MUI baseline | Pre-fix Tailwind | Fix applied |
|---|---|---|---|
| Right circle position | `right: 60, top: 70` (physical) | `end-[60px] top-[70px]` (logical → flips in RTL) | `right-[60px]` (physical) |
| Left circle position | `left: -230, bottom: 0` (physical) | `-start-[230px] bottom-0` (logical → flips in RTL) | `-left-[230px]` (physical) |
| Outer gradient | named MUI sx | inline `bg-gradient-to-b from-white/70 to-[#37B6FF]` | named token `bg-footer-fade` |
| Translucent card shadow | named MUI sx | inline arbitrary `shadow-[5px_-5px_...]` | named token `shadow-footer-card` |
| Enroll Now glow | named MUI sx | inline `style.boxShadow` | named token `shadow-cta-white` |
| Social icons source | local SVG (`Facebook_black.svg` etc.) | **remote `img.icons8.com` URLs** | restored local SVG imports |
| Social icons size | 48×48 | `h-10 w-10` (40px) | `h-12 w-12` (48px) |
| Admission text size | `subtitle1` (1rem, weight 400) | `text-h2-mobile sm:text-h2-tablet md:text-h2` (22→36px) | `text-body md:text-h6` (1rem) |
| Phone text size | `h2` MUI default (3.75rem) | `text-h2-mobile sm:text-h2-tablet md:text-h2` (22→36px) | `text-[2.25rem] md:text-[3rem] lg:text-[3.75rem]` |
| Enroll Now button text | implicit MUI weight 500 | `<button>` no weight | `font-bold leading-[23px] tracking-[-0.02em]` |
| Description size | `body2` (0.875rem) | `text-body` (1rem) | `text-small` |
| Section headings | `subtitle2` weight 700 (0.875rem) | `text-h6` (1rem) | `text-small font-bold uppercase` |
| About-us links | `body2` (0.875rem) | `text-body` (1rem) | `text-small` |
| Rights/copyright | `subtitle2` (0.875rem) | `text-body` (1rem) | `text-small` |

(footerV2.tsx received the same set of fixes — same patterns: circles, gradient, card shadow, CTA glow, typography sizes, contact-info heading.)

**Implementation:** see diffs in [src/components/footer.tsx](src/components/footer.tsx) and [src/components/footerV2.tsx](src/components/footerV2.tsx).

**Foundation edits:** logged above (3 new tokens in [tailwind.config.ts](tailwind.config.ts)).

**Skill file updates:**
- [.claude/skills/ui-pipeline/Design.md](.claude/skills/ui-pipeline/Design.md) §3 — added `shadow-footer-card` and `shadow-cta-white` rows.
- [.claude/skills/ui-pipeline/Design.md](.claude/skills/ui-pipeline/Design.md) — new "Background gradients" subsection capturing `bg-hero-fade` and `bg-footer-fade` as named gradient tokens.

**QA result:**
- ☑ QA-02 styling — only Tailwind utilities, no `sx`/`@mui`.
- ☑ QA-03 tokens — uses `bg-footer-fade`, `shadow-footer-card`, `shadow-cta-white`, `bg-brand-500`, `text-small`/`text-body`/`text-h6`.
- ☑ QA-04 i18n — all text via `t()` function form.
- ☑ QA-05 RTL — circles intentionally physical (matches MUI behavior); other spacing uses logical properties (`ms-`, `me-`, `ps-`, `pe-`).
- ☑ QA-13 lint — `yarn lint` clean.
- ◧ QA-14 manual smoke — pending user side-by-side at `:3001` vs `:3002`.

**Note for review:** the typography downsizes (admission, description, headings, links, rights) were applied to match MUI baseline source variants exactly. Some of these may look "smaller than expected" if you'd grown used to the post-migration sizes — speak up and I can adjust.

**Status:** Superseded by 1:1 port (see below).

---

### Footer (1:1 port from MUI baseline) — [src/components/footer.tsx](src/components/footer.tsx) + [src/components/footerV2.tsx](src/components/footerV2.tsx)

After the user requested switching to a clean 1:1 migration approach, both files were rewritten from scratch using `git show 4969d2b:src/components/footer.tsx` (499 lines) and `git show 4969d2b:src/components/footerV2.tsx` (500 lines) as the line-by-line source.

**Translation reference for MUI primitives → Tailwind:**

| MUI element | Tailwind equivalent |
|---|---|
| `<Box sx={styles.X}>` | `<div className="...">` carrying every `sx` property as a Tailwind class |
| `<Typography variant="subtitle1">` | `<p className="text-base font-normal leading-[1.75]">` (1rem / 400 / lh 1.75) |
| `<Typography variant="subtitle2">` | `<p className="text-sm font-medium leading-[1.57] tracking-[0.00714em]">` (0.875rem / 500) |
| `<Typography variant="body1">` | `<p className="text-base font-normal leading-normal">` (1rem / 400) |
| `<Typography variant="body2">` | `<p className="text-sm font-normal leading-[1.43]">` (0.875rem / 400) |
| `<Typography variant="h2">` | `<p className="text-[3.75rem] font-light leading-[1.2] tracking-[-0.00833em]">` (60px / 300) |
| `<Grid container spacing={2}>` | `<div className="flex flex-wrap items-center gap-4">` (16px gap = MUI spacing 2 × 8px) |
| `<Grid item lg={1} sm={12}>` | `<div className="w-full lg:w-[8.333%]">` (sm propagates upward; lg overrides) |
| `<Grid item lg={6}>` | `<div className="w-full lg:w-1/2">` (auto below lg → full width default; 6/12 at lg+) |
| `<Divider sx={{ color: "black", width: "78%" }}>` | `<hr className="w-[78%] border-t border-black">` |
| sx `{ xs: A, md: B }` responsive object | Tailwind `A md:B` cascade |

**MUI Typography variant defaults preserved verbatim** (no fallback to project's `text-h*` redesigned tokens — those caused the original drift).

**Inline-comment audit:** every block carries a comment like `{/* styles.contactContanier: flex items-center bg-#38B6FF, padding xs:10/sm:20/md:25/lg:30, rounded-5, -mt-70, width xs:80/md:85 */}` so the port is one-glance verifiable against the baseline.

**Foundation edits:** none new (the 3 tokens added earlier — `shadow-footer-card`, `shadow-cta-white`, `bg-footer-fade` — are still used).

**Skill file updates:** none new (the rows added earlier in [Design.md §3](.claude/skills/ui-pipeline/Design.md) and "Background gradients" subsection cover everything).

**Lint:** ✓ `yarn lint` clean.

**Status:** ◧ In review (awaiting user side-by-side approval at `:3001` vs `:3002`)
