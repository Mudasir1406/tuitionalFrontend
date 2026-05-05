# Component: Mobile-nav drawer (`src/components/drawer.tsx`)

**File:** [src/components/drawer.tsx](../../../../src/components/drawer.tsx) (NOT the `ui/drawer.tsx` primitive)
**Priority:** P1 hotspot
**Status:** ✓ done
**Last MUI commit (pre-migration ref):** `4969d2b`

## Defects fixed

1. **Missing AI Digital SAT outlined button** — baseline `buttonContainer` had outlined `#51B893` button BEFORE Book Demo. Restored using house Button with `variant="outline"` + `border-success text-success` overrides + `font-heading text-[1.1rem] font-bold whitespace-nowrap transition-none hover:bg-transparent`.
2. **Logo size drift** — `h-auto w-32` (128px) → `h-[34px] w-[144px]` per baseline `styles.image: { width: 144, height: 34 }`.
3. **Book Demo button**:
   - Added `font-heading` (matches baseline `leagueSpartan.className`)
   - Added `tracking-[-0.02em]` (matches baseline `letterSpacing: "-2%"`)
   - Changed `rounded-md` → `rounded-[10px]` (matches baseline `borderRadius: "1vh"` ≈ 10px)
   - Inline shadow `shadow-[...]` → named `shadow-brand-glow`
4. **Header padding split** — `pt-[50px] pb-6` (24px bottom) → `py-[50px]` (matches baseline `paddingY: "50px"`).
5. **Nav links** — added `font-heading` (matches baseline `leagueSpartan.className` per nav item) + `text-start`.

## Compliance

- Tokens: brand-500, success (#51B893), brand-glow shadow, font-heading.
- Hygiene: no `style={{}}`, no `sx`, no `@mui/*`. House primitives used (`HouseDrawer`, `Button`).
- Responsive: drawer is full-width (`widthClassName="w-full"`) — mobile-first.
- RTL: HouseDrawer uses logical `insetInlineStart` + `rtl:` translate variants. Logo + nav links naturally flow per parent direction.
- A11y: close button has `aria-label="Close menu"`; HouseDrawer (Headless UI) provides focus trap + ESC.
- Lint: ✓ clean.

## Approval

- **Approved 2026-05-05** — outlined button restored, logo sized, Book Demo button polished, padding + fonts matched.
