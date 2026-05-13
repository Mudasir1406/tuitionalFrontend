# Component — `HeaderV2` (MUI only — orphan in both repos)

A trimmed-down English-only header used by `main` branch deployments. Removes the nav links section and the outlined "AI Digital SAT" button — keeps only the **contained "Book Demo"** CTA. Locale support is faked with an inline `translations` object (no `useI18n`).

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\header-v2.tsx` |
| Tailwind port | **Does not exist.** No `header-v2.tsx` in `tuitionalFrontend/src/components/`. |
| Usage | **No usage in either repo.** `grep` for `HeaderV2` / `header-v2` returns 0 hits in app routes. Likely orphan/legacy. |

---

## §1 MUI source — extracted properties

Structurally a copy of `header.tsx` with the nav row and outlined-CTA commented out. The full `styles = {}` object is **identical** to `header.tsx` with two diffs:

| Property | header.tsx | header-v2.tsx |
|---|---|---|
| `containedBtn.fontSize` | `1.5vh` | `2.5vh` (larger) |
| `containedBtn` hover | re-applies `fontSize: 1.5vh` | comments out `fontSize` in hover (so retains the 2.5vh from base) |
| `rightCircle.animation` | commented out | `rightCircleAnimation 6s ease-in-out infinite alternate` |
| Nav links | rendered, hidden `lg:flex` | commented out — never rendered |
| Outlined "AI Digital SAT" btn | rendered, hidden `lg:flex` | commented out |
| Hamburger | rendered, `lg:none` | commented out |
| `t(key)` | from `useI18n` | inline hashmap lookup |
| `isRTL` | from `useI18n` | hardcoded `const isRTL = false` |

All other dimensions / shadows / circles / sticky container behavior — see `components/shared/header.md`.

### Container (`styles.container` — identical to header.tsx)

| Property | Value | Tailwind |
|---|---|---|
| `width` | `90%` | `w-[90%]` |
| `borderRadius` | `10px` | `rounded-md` |
| `boxShadow` | `0px -0.3vh 0.8vh 0px #00000026 inset, 0px 0.2vh 0.1vh 0px #0000000D` | `shadow-header` |
| `backgroundColor` | `rgba(255,255,255,0.7)` | `bg-white/70` |
| `justifyContent` | `{ md: space-between, lg: space-evenly }` | `md:justify-between lg:justify-evenly` |
| `marginTop` | `2vh` | `mt-[2vh]` |
| `paddingY` | `1vh` | `py-[1vh]` |
| `zIndex` | `1000` | `z-[1000]` |
| `marginLeft` | `5vw` | `ms-[5vw]` |

### Contained Button (the only visible CTA)

| Property | Value | Tailwind |
|---|---|---|
| `boxShadow` | `0.1vh 1.5vh 3.4vh 0px #38B6FF66` | `shadow-brand-glow` |
| `backgroundColor` | `#38B6FF` | `bg-brand-500` |
| `paddingY` | `1.5vh` | `py-[1.5vh]` |
| **`fontSize`** | **`2.5vh`** (vs 1.5vh in header.tsx) | `text-[2.5vh]` |
| `fontWeight` | `700` | `font-bold` |
| `lineHeight` | `1.84vh` | `leading-[1.84vh]` |
| `letterSpacing` | `-2%` | `tracking-[-0.02em]` |
| `borderRadius` | `1vh` | `rounded-[1vh]` |
| `display` | `{ xs/sm/md: none, lg: flex }` | `hidden lg:flex` |

### Right decorative circle — different from header.tsx

| Property | Value | Tailwind |
|---|---|---|
| `animation` | `rightCircleAnimation 6s ease-in-out infinite alternate` | `animate-[rightCircleAnimation_6s_ease-in-out_infinite_alternate]` |

(In `header.tsx` this is commented out.)

---

## §2 Tailwind port — bug list

**No port exists.** Bug count = N/A. If `HeaderV2` is going to be revived, the port should fork `header.tsx` and:

1. Drop the `<nav>` block.
2. Drop the outlined "AI Digital SAT" Button.
3. Drop the `<button>` hamburger.
4. Drop `<RouteLanguageSwitcher />`.
5. Keep ONLY the contained "Book Demo" Button — bump its `text-[1.5vh]` → `text-[2.5vh]`.
6. Right-circle: add `animate-[rightCircleAnimation_6s_ease-in-out_infinite_alternate]`.
7. Hardcode English copy (no `useI18n`).

---

## §3 Corrected Tailwind classNames (template)

```tsx
<header className="sticky top-0 z-[1000] mx-[5vw] mt-[2vh] flex w-[90%] items-center justify-between rounded-md bg-white/70 py-[1vh] shadow-header md:justify-between lg:justify-evenly">
  {/* decorative circles, logo (same as header.tsx) */}

  {/* CTA section — only the contained button */}
  <div className="ms-[1.5vw] hidden items-center gap-[0.8vw] lg:flex">
    <Button
      variant="primary"
      onClick={() => setOpen(true)}
      className="rounded-[1vh] py-[1.5vh] text-[2.5vh] font-bold leading-[1.84vh] tracking-[-0.02em] shadow-brand-glow"
    >
      Book Demo
    </Button>
  </div>
</header>
```

## §4 Verification at 4 widths

- **375 / 768 / 1024 px**: header strip visible (sticky); contained button hidden (`lg:flex`); NO hamburger (removed); essentially empty header.
- **1280 / 1920 px**: contained "Book Demo" button visible on right.

## §5 RTL notes

`HeaderV2` hardcodes `isRTL = false`, so all RTL conditional styles are no-ops. If a future port needs to be RTL-aware, replace the inline `t()` and `isRTL` with `useI18n()` and add the same `rtl:*` classes used in `header.md`.
