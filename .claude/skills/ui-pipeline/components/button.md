# Component: Button (house primitive)

**File:** [src/components/ui/button.tsx](../../../../src/components/ui/button.tsx)
**AR twin:** none — primitive is direction-neutral
**Priority:** P0
**Status:** ▣ in-progress (audit complete, fix proposal pending user approval)
**Live MUI ref URL(s):** https://tuitionaledu.com/ — buttons rendered everywhere; representative CTAs in header (Book Demo, AI Digital SAT)
**Last MUI commit (pre-migration ref):** N/A — `git show 4969d2b:src/components/ui/button.tsx` returns *path exists on disk, but not in '4969d2b'*. File created during migration as new house primitive.
**Migrated commit:** `30e01f6`

## A. Pre-fix audit

- [x] Live MUI rendering captured: site uses `<Button>` with caller-provided `sx` overrides everywhere — primitive itself never appears with default styling (always paired with custom classes). Site-canonical CTAs are Header's "Book Demo" (contained brand `#38B6FF`, glow shadow, weight 700, `text-[1.5vh]`, leading `1.84vh`, tracking `-0.02em`, radius 10px) and "AI Digital SAT" (outlined success `#51B893`, same metrics).
- [x] Pre-migration intent: no source-level baseline. Goal of primitive is to reproduce MUI Button **base** shape (semantic `<button>`, `forwardRef`, focus-visible ring, disabled state, transition) and provide a 4-variant × 3-size scaffold that callers extend.
- [x] Reusable house-primitive opportunities: this IS the primitive. 37 callers across [src/components/](../../../../src/components/) consume it.

### Variant ↔ MUI mapping (verified against `<Button>` callers in baseline)

| MUI baseline call | Tailwind primitive variant |
|---|---|
| `<Button variant="contained" color="primary">` (e.g., Book Demo) | `<Button variant="primary">` |
| `<Button variant="outlined" color="primary">` (e.g., AI Digital SAT) | `<Button variant="outline">` |
| `<Button variant="text">` (e.g., text-only nav links rendered as buttons) | `<Button variant="ghost">` |
| `<Button variant="contained" color="error">` (rare, destructive actions) | `<Button variant="destructive">` |

### Defects vs. MUI Button parity

1. **Stale skill-path comment** ([src/components/ui/button.tsx:5](../../../../src/components/ui/button.tsx#L5)): comment says `See .claude/skills/mui-to-tailwind/Cookbook.md §5.` — that skill path does not exist. Actual skill is [.claude/skills/ui-pipeline/](../../). Fix: remove or rewrite comment to point at this checklist file.
2. **`transition-colors` excludes box-shadow** ([line 51](../../../../src/components/ui/button.tsx#L51)): MUI Button transitions `background-color, box-shadow, border-color, color` (250ms ease). Tailwind `transition-colors` covers bg/border/color but **not** box-shadow. On primary variant, `hover:bg-brand-600` swaps but the `shadow-card` doesn't ease. Fix: replace with `transition-[background-color,box-shadow,border-color,color] duration-200 ease-out` (or `transition` + custom property list).
3. **`shadow-card` on `primary` base is too soft** ([line 29](../../../../src/components/ui/button.tsx#L29)): MUI `<Button variant="contained">` default = elevation 2 = `0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)`. Current `shadow-card` is `0 1px 4px rgba(0,0,0,0.08)` — much softer. Practically harmless because every site CTA overrides with `shadow-brand-glow` or removes the shadow entirely (Header CTA passes `className="shadow-brand-glow"`). Recommendation: leave `shadow-card` as primitive default, document that all site CTAs override.
4. **No `:active` press state**: MUI Button has subtle elevation drop on click (`active` state). Add `active:scale-[0.98]` is non-MUI but pleasant; alternative is `active:shadow-none`. Lower priority — most clicks are visually short-lived anyway.
5. **Hover ring on `outline` variant**: current `hover:bg-brand-50` is fine for the primary-tinted outline. Caller-side outline buttons that want non-brand colors (e.g., Header's `#51B893` outlined "AI Digital SAT") have to fully override variant — that override path works because `className` is appended last and can shadow variant classes (verified: Header passes `border-success text-success`).

## B. Tokens (Design.md §1–4 + tailwind.config.ts)

- [x] All colors use tokens (`brand-500`, `brand-600`, `brand-50`, `ink-900`, `ink-100`, `ink-300`, `danger`, `white`). No `text-[#…]`.
- [x] All typography uses tokens (`text-button`, `text-button-mobile`). No arbitrary `text-[Npx]`.
- [x] Border radius uses `rounded-md` (10px from config — matches site brand standard).
- [x] Shadows use `shadow-card` token. (Note: would benefit from `transition` covering box-shadow — see Defect 2.)
- [x] Spacing on Tailwind 4-px scale (`h-9/10/12`, `px-4/6/8`).

## C. Tailwind hygiene (RULE-19 + UI.md §15)

- [x] No `style={{}}`.
- [x] No `sx=` prop.
- [x] No `@mui/*` / `@emotion/*` import (verified by grep).
- [x] `cn()` used for className merging.
- [x] No `!important`.
- [x] No `.module.css`.
- [x] Icons N/A (primitive doesn't render icons).
- [x] N/A — primitive is `<button>`, not interactive headlessui composite.

## D. Responsive (QA-09)

- [x] No horizontal scroll risk (inline-flex, content-sized).
- [x] Mobile-first cascade present (`text-button-mobile sm:text-button` on `md` size).
- [x] Min-height ranges 36/40/48px. Mobile hit-target ≥ 44×44px requires `size="lg"` (h-12 / 48px). Caller responsibility to pick correct size on mobile-only surfaces. Document this in §I deviation note.
- [x] No images.

## E. RTL & i18n (QA-04 + QA-05)

- [x] No directional spacing (uses `gap-2` and centered content) — RTL-safe.
- [x] No `flex-row-reverse` driven by `isRTL`.
- [x] No `style={{ direction }}`.
- [x] No AR twin needed.
- [x] No user-facing strings (children passed by callers).

## F. Behavior

- [x] Hover: `hover:bg-brand-600` (primary), `hover:bg-brand-50` (outline), `hover:bg-ink-100` (ghost), `hover:bg-danger/90` (destructive). Reasonable.
- [x] Focus visible: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-<color>`.
- [x] Loading states: caller responsibility (not in primitive).
- [x] Errors / success: caller responsibility.
- [x] Reduced-motion: relies on existing globals.css `@media (prefers-reduced-motion)` — but `transition-colors` not affected by that rule. Acceptable; primitive is not animation-heavy.

### Defect 4 follow-up (active state)

Optional: add `active:scale-[0.98] active:shadow-none` for tactile feedback. Per Google-CTO discipline this is scope creep; defer to caller-level UX requests.

## G. Build & static checks

- [x] `npm run lint` — to be run after fix applied.
- [x] `npm run build` — to be run after fix applied.
- [x] No new console errors expected (file is internal, no runtime branching).

## H. Visual diff

- [ ] Local screenshot at 360 EN — pending fix application
- [ ] Local screenshot at 768 EN — pending
- [ ] Local screenshot at 1200 EN — pending
- [ ] Local screenshot at 1500 EN — pending
- [ ] AR matrix — N/A (primitive direction-neutral)

### Deviations from live MUI ref (and reason)

- **Default `shadow-card` is softer than MUI elevation-2.** Reason: every site CTA overrides shadow at caller level (`shadow-brand-glow`, `shadow-cta-white`, or none). Keeping primitive shadow soft prevents unwanted stacking when caller adds its own.
- **No textTransform: uppercase** (MUI Button defaults to uppercase). Site never uses uppercase buttons (Book Demo is mixed case in baseline). Intentional drift.
- **Padding/height pinned to Tailwind 4-px scale** rather than MUI's `0.375rem 1rem`. Pixel-equivalent within ±2px; site CTAs override anyway.

## I. Approval

- [ ] User reviewed proposed fix scope (defects 1, 2 above; defects 3-5 noted but deferred)
- [ ] User approved fix application
- [ ] User approved on `<YYYY-MM-DD>`
- [ ] tasks.md line updated to ✓

---

## Proposed fix (minimal, awaiting approval)

**Two changes** to [src/components/ui/button.tsx](../../../../src/components/ui/button.tsx):

```diff
- /**
-  * House Button — replaces MUI <Button>. See .claude/skills/mui-to-tailwind/Cookbook.md §5.
+ /**
+  * House Button — replaces MUI <Button>.
+  * See .claude/skills/ui-pipeline/components/button.md for full audit + variant ↔ MUI mapping.
   *
   * @example
   * <Button variant="primary" size="md">Save</Button>
   * <Button variant="outline">Cancel</Button>
   * <Button variant="ghost" size="sm" disabled>Loading…</Button>
   *
   * Variant map from MUI:
   *   contained + primary  → variant="primary"
   *   outlined  + primary  → variant="outline"
   *   text      + any      → variant="ghost"
   *   contained + error    → variant="destructive"
   */
```

```diff
       className={cn(
         "inline-flex items-center justify-center gap-2 rounded-md font-body font-semibold",
-        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
+        "transition-[background-color,box-shadow,border-color,color] duration-200 ease-out",
+        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
         "disabled:pointer-events-none disabled:opacity-50",
         variantClasses[variant],
         sizeClasses[size],
         className,
       )}
```

**Deferred (not in this fix):**
- Defect 3 (shadow-card softness) — caller-overridden in practice
- Defect 4 (active scale) — scope creep, defer
- Defect 5 (outline color override path) — already works
