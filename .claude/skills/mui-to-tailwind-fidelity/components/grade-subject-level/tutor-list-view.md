# Component — `ListView` (tutor section)

Two-column layout: left = vertical list of `<TeacherCard>` instances (paginated by "Show More"); right = "Vetted Tutor" highlight card + 6-cell feature grid (icon + label). Used when `data.view === "Row View"`.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\tutor-section\list-view\ListView.tsx` + `.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\tutor-section\list-view\ListView.tsx` |

## §1 MUI source — extracted properties

### Layout tree

```
div .main (flex wrap gap 16px padding 16px; mobile p 0; <1024 flex-direction column)
  div .mainList (flex 2; overflow-y auto)
    × ≤10 (or all if showFull) TeacherCard
    if !showFull && data.length > 10:
      Button contained .containedButton  "Show More"
  div .info (flex 1; <1024 align-items center, padding 12px; <576 padding 0)
    div .largeCard (border 1px solid #9f9c9c, radius 16px, padding 16px)
      div .iconDiv (72×72 round, bg #e8f7ff, mb 16px)
        Image TutorIcon 50×50
      Typography subtitle1 p          "Vetted Tutor"
      Typography body2 p .mt1         description
    div .smallCards (grid 2 cols, gap 16px, mt 24px)
      × 6 div .smallCard (white bg, radius 16px, p 16px, inset shadows, hover translateY(-5px))
        div .iconDivSmall (48×48 round, bg #e8f7ff, mb 16px)
          MUI icon (AccountCircle/Mic/BarChart/ScheduleOutlined/Insights/SupervisorAccount; 35×30 #009BF5)
        Typography caption p          label
```

### Dimensions & spacing

| Element | Property | Value (default) | <1024 | <576 |
|---|---|---|---|---|
| `.main` | padding | 16px | 16px | 0 |
| `.main` | gap | 16px | (col stack) | (col stack) |
| `.main` | flex-direction | row | column | column |
| `.mainList` | flex | 2 | (full width col) | (full width col) |
| `.info` | flex | 1 | (full width col, items-center, p 12px) | (p 0) |
| `.largeCard` | border / radius / padding | 1px solid #9f9c9c / 16px / 16px | | |
| `.iconDiv` | w × h / radius / bg / mb | 72×72 / 50px / #e8f7ff / 16px | | |
| `.iconDivSmall` | w × h / radius / bg / mb | 48×48 / 50px / #e8f7ff / 16px | | |
| `.smallCards` | grid-cols / gap / mt | 2 / 16px / 24px | | |
| `.smallCard` | radius / bg / padding / shadow | 16px / white / 16px / `inset 0px 6px 8px rgba(0,0,0,0.05), inset -4px -4px 10px rgba(0,0,0,0.15)` | | |
| `.smallCard` hover | shadow / transform | `inset 0px 6px 10px rgba(0,0,0,0.15), 0px 4px 10px rgba(0,0,0,0.1)` / translateY(-5px) | | |
| `.smallCard` transition | | `box-shadow 0.3s ease, transform 0.3s ease` | | |
| `.containedButton` | bg / color / radius / padding | #38b6ff / white / 10px / 2vh | | |
| `.containedButton` | shadow | `1px 15px 34px 0px rgba(56,182,255,0.2)` | | |
| `.containedButton` | hover bg / hover shadow | #38b6ff / `1px 4px 24px 0px #38b6ffb2` | | |
| `.containedButton` | line-height / transition / text-transform | 18.4px / `all 0.5s ease-in-out` / none | | |
| `.mt1` | margin-top | 1.5vh | | |

### Typography

| Text | MUI variant | Sizes | Weight | Font |
|---|---|---|---|---|
| "Vetted Tutor" title | `subtitle1` | stat-number triplet | 700 | League Spartan |
| Large card desc | `body2` | 0.875rem | 400 | League Spartan |
| Small card label | `caption` | 0.875rem | 400 | League Spartan |
| Show More button | default | 0.9375rem/1rem | 500 | League Spartan |

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 57 | outer `grid grid-cols-1 gap-6 lg:grid-cols-12` | MUI `.main { flex wrap; gap 16px; padding 16px; column at <1024 }`. Port uses 12-col grid (Bootstrap-style); MUI uses flex 2:1 (= 8:4 of 12). | OK semantically (lg:col-span-8 + lg:col-span-4 = 12) but verify gap and padding |
| B2 | 57 | `gap-6` (=24px) | MUI gap 16px (`gap-4`) | **Med** |
| B3 | 57 | (no outer `p-4`) | MUI `.main { padding: 16px }`, mobile `0` | **Med** — missing padding |
| B4 | 58 | `lg:col-span-8` ✓, list `flex flex-col gap-4` | matches flex 2 with vertical stacking | OK |
| B5 | 63 | Show More button `variant="primary"` | MUI uses contained brand-blue with specific shadow + bg/hover. House Button's `variant="primary"` should map but verify shadow and text-transform. | **Verify** |
| B6 | 70 | large card `rounded-md bg-white p-6 text-center shadow-card` (no border!) | MUI `.largeCard { border: 1px solid #9f9c9c; border-radius: 16px; padding: 16px }`. Port uses `rounded-md` (=10px not 16px), `bg-white` (MUI is transparent — border only), `p-6` (=24px not 16px), and adds `shadow-card` (not in MUI). **No border.** | **High** — wrong styling entirely |
| B7 | 71 | iconDiv `h-16 w-16 rounded-full bg-brand-50` | MUI `.iconDiv { 72×72; bg #e8f7ff }`. Port uses 16 (=64px) — 8px small. `brand-50` vs `#e8f7ff` close enough. | **Med** |
| B8 | 72 | Image `width={50} height={50}` ✓ | matches | OK |
| B9 | 74 | title `mt-4 font-heading text-h5 text-ink-900` | MUI subtitle1 → stat-number triplet (1.75/2.25/3rem). Port `text-h5` (1.125rem desktop). | **High** — title much smaller than MUI |
| B10 | 75 | desc `mt-2 font-heading text-small text-ink-700` | matches body2 → `text-small` ✓. Margin: MUI `.mt1 { margin-top: 1.5vh }`. Port `mt-2` (=8px). | **Med** — should be `mt-[1.5vh]` |
| B11 | 77 | smallCards `grid grid-cols-2 gap-3` | MUI `.smallCards { gap: 16px; mt: 24px }`. Port `gap-3` (=12px), no `mt-6`. | **Med** |
| B12 | 79 | smallCard `rounded-md bg-white p-3 shadow-card` | MUI `.smallCard { radius 16px; bg white; padding 16px; inset shadows }`. Port `rounded-md` (10px) vs MUI 16px (`rounded-lg`); `p-3` (12px) vs 16px (`p-4`); `shadow-card` vs MUI specific inset shadow combo. | **High** |
| B13 | 79 | (no hover effects) | MUI hover: translateY(-5px) + shadow change | **Med** |
| B14 | 80 | iconDivSmall `h-10 w-10` (=40px) | MUI 48×48 | **Med** — 8px small |
| B15 | 83 | label `font-heading text-small text-ink-900` | matches caption → `text-small` ✓ | OK |
| B16 | 5, 48-53 | lucide icons `User/Mic/BarChart3/Clock/LineChart/Users` | MUI: `AccountCircle/Mic/BarChart/ScheduleOutlined/Insights/SupervisorAccount`. Different icon set. Lucide is NEW DEPENDENCY. | **Critical** |
| B17 | n/a | port doesn't define translations for showMore button label — uses `t.showMore` ✓ | matches | OK |

## §3 Corrected Tailwind classNames

```tsx
<div className="flex flex-wrap gap-4 p-4 max-[1024px]:flex-col max-[576px]:p-0">
  <div className="flex-[2] overflow-y-auto flex flex-col gap-4">
    {data?.slice(0, showFull ? data.length : 10).map((teacher) => (
      <TeacherCard key={teacher.id} teacher={teacher} locale={locale} />
    ))}
    {!showFull && data?.length > 10 && (
      <button type="button" onClick={() => setShowFull(true)}
        className="mx-auto self-center rounded-[10px] bg-brand-500 p-[2vh] font-heading leading-[18.4px] normal-case text-white shadow-[1px_15px_34px_0px_rgba(56,182,255,0.2)] transition-all duration-500 ease-in-out hover:bg-brand-500 hover:shadow-[1px_4px_24px_0px_#38b6ffb2]">
        {t.showMore}
      </button>
    )}
  </div>

  <div className="flex flex-1 flex-col gap-4 max-[1024px]:items-center max-[1024px]:p-3 max-[576px]:p-0">
    <div className="rounded-2xl border border-[#9f9c9c] p-4">
      <div className="flex h-[72px] w-[72px] mb-4 mx-auto items-center justify-center rounded-full bg-[#e8f7ff]">
        <Image src={TutorIcon} alt="Tutor Icon" width={50} height={50} />
      </div>
      <p className="font-heading text-stat-number-mobile font-bold text-ink-900 sm:text-stat-number-tablet lg:text-stat-number">{t.vettedTutor}</p>
      <p className="mt-[1.5vh] font-body text-small text-ink-700">{t.vettedTutorDescription}</p>
    </div>

    <div className="mt-6 grid grid-cols-2 gap-4">
      {smallCards.map((card, idx) => (
        <div key={idx} className="flex flex-col items-center rounded-2xl bg-white p-4 text-center shadow-[inset_0px_6px_8px_rgba(0,0,0,0.05),inset_-4px_-4px_10px_rgba(0,0,0,0.15)] transition-[box-shadow,transform] duration-300 hover:-translate-y-[5px] hover:shadow-[inset_0px_6px_10px_rgba(0,0,0,0.15),0px_4px_10px_rgba(0,0,0,0.1)]">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f7ff]">
            {card.icon /* swap lucide for MUI icon or inline SVG */}
          </div>
          <p className="font-heading text-small text-ink-900">{card.label}</p>
        </div>
      ))}
    </div>
  </div>
</div>
```

## §4 Verification at 4 widths

- **375**: column stack; `.main` padding 0; small cards 2-col grid; large card border visible.
- **768**: still column (MUI breakpoint at 1024); `.info` items centered with p-3.
- **1280**: row layout 2:1 (`flex-[2]` : `flex-1`); main p-4.
- **1920**: same as 1280.

## §5 RTL notes

- Outer `flex flex-wrap` is direction-agnostic — flex items reverse with `dir="rtl"` automatically.
- "Show More" button `mx-auto self-center` — direction-agnostic.
- Large card content: center-aligned per MUI source — no flip concerns.
- Small card content: centered → direction-agnostic.
- Translations object already includes `ar` strings.
