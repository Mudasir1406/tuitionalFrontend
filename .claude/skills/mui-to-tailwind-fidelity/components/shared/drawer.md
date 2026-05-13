# Component — `ResponsiveDrawer`

Mobile slide-in drawer triggered by the header hamburger. Hosts the same nav links + CTAs as desktop nav, plus the `RouteLanguageSwitcher`, plus a `FormDialog` trigger. Full-viewport overlay (`width: 100%, height: 100%`).

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\drawer.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\drawer.tsx` |
| Arabic variant | None (same component; RTL anchor flips automatically via `dir`) |

---

## §1 MUI source — extracted properties

### Layout tree

```
<Drawer anchor="left" open onClose>
  Paper { width: 100%, height: 100% }
    └─ Box.header { display: flex flex-col, items-start, px: 7.1%, py: 50px, bg: linear-gradient(to bottom, #D3EFFE → white) }
         └─ Row.flex.justify-between.items-center
              ├─ logo (144 × 34, cursor: pointer)
              └─ IconButton → CloseIcon (25 × 25, #545454)
    └─ Box.body { display: flex flex-col, items-start, px: 7.1% }
         ├─ <a>×5 nav links (Typography styles.typography)
         └─ Box.buttonContainer { flex flex-col, gap: 15px, mt: 30px, w-100% }
              ├─ Button.outlined  "AI Digital SAT"  (styles.outlinedBtn)
              ├─ Button.contained "Book Demo"       (styles.containedBtn)
              └─ Box (mt: 10px, w-100%) → <RouteLanguageSwitcher fullWidth />
```

### Dimensions & spacing (drawer.tsx:36-194)

| Element | Property | Value | Tailwind |
|---|---|---|---|
| `Drawer .MuiDrawer-paper` | `width` / `height` | `100%` / `100%` | `w-full h-full` |
| Header box | `paddingX` | `7.1%` | `px-[7.1%]` |
| Header box | `paddingY` | `50px` | `py-[50px]` |
| Header box | `background` | `linear-gradient(to bottom, #D3EFFE, rgba(255,255,255,1))` | `bg-gradient-to-b from-[#D3EFFE] to-white` |
| Body box | `paddingX` | `7.1%` | `px-[7.1%]` |
| Close icon | `width`/`height` | `25px` / `25px` | `w-[25px] h-[25px]` |
| Logo `<Image>` | `width`/`height` | `144` / `34` (px from inline `style`) | inline `width={144} height={34}` |
| `Box.buttonContainer` | `flexDirection` | `column` | `flex flex-col` |
| `Box.buttonContainer` | `gap` | `15px` | `gap-[15px]` |
| `Box.buttonContainer` | `marginTop` | `30px` | `mt-[30px]` |
| `Box.buttonContainer` | `width` | `100%` | `w-full` |
| Lang switch wrapper | `marginTop` | `10px` | `mt-[10px]` |
| Typography link | `marginY` | `10px` | `my-[10px]` |

### Typography

| Element | Token | Mobile / Tablet / Desktop | Weight | LH | Color | Font |
|---|---|---|---|---|---|---|
| Nav link `<Typography styles.typography>` | inline | `1.5rem` (all) | `500` | `2` | `black` | `leagueSpartan` |
| Contained btn label | inline | `1.1rem` (all) | `700` | `default` | `white` | `leagueSpartan` |
| Outlined btn label | inline | `1.1rem` (all) | `700` | `default` | `#51B893` | `leagueSpartan` |

Note: the drawer is hamburger-mode only, so MUI uses a single non-responsive `fontSize` (not the `text-h*` triplet).

### Colors

| Token | Value |
|---|---|
| Close-icon | `#545454` |
| Header gradient | `#D3EFFE → rgba(255,255,255,1)` |
| Outlined btn | `color/borderColor: #51B893` (success green) |
| Contained btn | `bg #38B6FF`, shadow `0.1vh 1.5vh 3.4vh 0px #38B6FF66` |

### Animations / interactions
- MUI `Drawer` slides in from left (`anchor="left"`); no custom animation.
- All buttons retain colors on `:hover` (no delta).

---

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| D1 | drawer.tsx:32-37 | Uses custom `HouseDrawer` from `@/components/ui/drawer` with `side="start"` | Acceptable — `start` = `left` in LTR and auto-flips in RTL. Verify the ui/drawer Paper width is `w-full`. | low |
| D2 | drawer.tsx:24 | `{ href: "/blog", label: t("nav.blogs") }` | MUI has `/communityandevents` with `t("nav.community")`. Either was an intentional product change or a drift. | medium |
| D3 | drawer.tsx:39-48 | Close button has commented-out `<X>` icon — currently renders an empty button | Render the `lucide-react` `X` (size 25, `text-[#545454]`) to match MUI `CloseIcon` | high |
| D4 | drawer.tsx:39 | `px-6 py-6 sm:px-8 sm:py-8` | MUI uses `px-[7.1%] py-[50px]` (percent + px); the responsive jump (sm break) is invented | medium |
| D5 | drawer.tsx:50 | `<div className="mx-6 border-b border-black/10 sm:mx-8" />` | MUI has NO divider between header gradient and nav | medium |
| D6 | drawer.tsx:52 | `nav` has `px-6 pt-6 sm:px-8` | MUI uses only `paddingX: 7.1%` (no top padding — `marginY: 10px` on each link supplies vertical rhythm) | medium |
| D7 | drawer.tsx:58 | `border-b border-black/5 py-4 font-medium text-[1.25rem]` | MUI has NO link border; `fontSize: 1.5rem` not `1.25rem`; `marginY: 10px` (≈ `my-[10px]`) instead of `py-4`. | high |
| D8 | drawer.tsx:67 | Outlined btn: `h-[52px] text-[1rem]` | MUI: `paddingY: 1.2vh` (height auto), `fontSize: 1.1rem` | medium |
| D9 | drawer.tsx:77 | Contained btn: `h-[52px] text-[1rem]` | MUI: `paddingY: 1.5vh`, `fontSize: 1.1rem`, `borderRadius: 1vh` (`rounded-[1vh]` not `rounded-[10px]`). `letterSpacing: -2%` missing (`tracking-[-0.02em]` already present — ok). | medium |
| D10 | drawer.tsx:64 | Button container: `mt-8 gap-4 pb-8` | MUI: `gap: 15px` (`gap-[15px]`), `marginTop: 30px` (`mt-[30px]`); no `pb-8` | medium |
| D11 | drawer.tsx:81 | Lang switch wrapper: `mt-2` | MUI: `marginTop: 10px` (`mt-[10px]`) | low |
| D12 | drawer.tsx (whole) | Background gradient missing — `bg-gradient-to-b from-[#D3EFFE] to-white` is on the whole Drawer | MUI applies it ONLY on the header (`px:7.1% py:50px`), the body has no background | medium |

---

## §3 Corrected Tailwind classNames

```tsx
<HouseDrawer side="start" widthClassName="w-full" open={open} onClose={toggleDrawer}>
  {/* header */}
  <div className="flex flex-col items-start px-[7.1%] py-[50px] bg-gradient-to-b from-[#D3EFFE] to-white">
    <div className="flex w-full items-center justify-between">
      <Image src={logo.src} alt="Logo" width={144} height={34} className="cursor-pointer" />
      <button onClick={toggleDrawer} aria-label="Close menu" className="p-2">
        <X size={25} className="text-[#545454]" />
      </button>
    </div>
  </div>

  {/* body */}
  <nav className="flex flex-col items-start px-[7.1%]">
    {navItems.map((item) => (
      <a key={item.href} href={item.href} onClick={toggleDrawer}
         className="w-full no-underline">
        <span className={`${leagueSpartan.className} block cursor-pointer text-start text-[1.5rem] font-medium leading-[2] text-black my-[10px]`}>
          {item.label}
        </span>
      </a>
    ))}

    <div className="flex flex-col gap-[15px] mt-[30px] w-full">
      <Button variant="outline"
        className={`${leagueSpartan.className} py-[1.2vh] text-[1.1rem] font-bold text-center whitespace-nowrap text-[#51B893] border-[#51B893]`}>
        {t("buttons.ai_digital_sat")}
      </Button>
      <Button variant="primary"
        className={`${leagueSpartan.className} py-[1.5vh] text-[1.1rem] font-bold text-center tracking-[-0.02em] rounded-[1vh] shadow-brand-glow`}>
        {t("buttons.book_demo")}
      </Button>
      <div className="mt-[10px] w-full">
        <RouteLanguageSwitcher fullWidth />
      </div>
    </div>
  </nav>
</HouseDrawer>
```

---

## §4 Verification at 4 widths

- **375 px**: drawer slides in from left, full-viewport. 5 nav links stacked, line-height 2 (≈ 48 px per line incl. `my-10`). Two CTAs full-width.
- **768 px**: same layout, content remains anchored to `px-[7.1%]` (≈ 54 px gutter).
- **1280 px**: drawer is never opened at desktop (header hamburger is `lg:hidden`), but if force-opened: covers viewport, nav typography still 1.5rem (no responsive bump in MUI).
- **1920 px**: same.

## §5 RTL notes

- `side="start"` makes the drawer slide from the right at RTL (matches MUI's behavior when `<html dir="rtl">`).
- Body container has `items-start`, which mirrors automatically (text aligns to right in RTL because LTR `start` == right). Nav link `text-start` follows.
- The contained-button glow is symmetric, no flip needed.
- `RouteLanguageSwitcher` already handles Arabic font internally.
