# Component — `HorizontalTutorCarousel`

A horizontally scrollable list of tutor cards (max 9). Each card: avatar/photo + flag overlay + name + star rating + 3 stat rows (hours / experience / batches). Used by `TutorSectionV2` when `data.view === "Horizontal Carousel"`.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\tutor-section\horizontal-carousel\HorizontalTutorCarousel.tsx` + `.module.css` |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\tutor-section\horizontal-carousel\HorizontalTutorCarousel.tsx` |

## §1 MUI source — extracted properties

### Layout tree

```
Box .container (w 100% max-w 1400px mx auto, padding 2rem 1rem)
  Box .header (flex center)
    Typography h4 .title       "Recommended Tutors" (fontSize 2.5rem !important, fw 700, color #333, text-center)
  Box .carouselContainer (overflow-x auto, py 1rem, scrollbar hidden)
    Box .carouselTrack (flex, gap 1.5rem, padding 0.5rem, min-w max-content)
      × ≤9 Box .tutorCard
        Box .cardContent (relative, mb 1rem, flex col items-center)
          Avatar src=profileImageUrl variant=rounded .avatar
          Box .countryFlag (absolute bottom-8 left-8, w 32 h 32 round)  FlagIcon size=24
        Box .nameRatingRow (flex justify-between w-full mb 0.75rem)
          Typography h6 .tutorName
          Box .ratingContainer (flex items-center gap 0.25rem)
            Star .ratingIcon  +  Typography body2 .ratingText
        Box .statItem × 3   (icon .icon + Typography body2 .statText)
          AccessTime  / School  / Groups
```

### Dimensions & spacing

| Element | Property | Mobile (<480) | (480-600) | (601-900) | (901-1200) | (≥1200) |
|---|---|---|---|---|---|---|
| `.container` | padding | 1rem 0.5rem | 2rem 1rem | 2rem 1rem | 2rem 1rem | 2rem 1rem |
| `.tutorCard` | min-w / max-w | 200px | 220px | 240px | 200px | 220px |
| `.tutorCard` | padding | 0.875rem | 1rem | 1.25rem | 1rem | 1rem |
| `.carouselTrack` | gap | 1rem | 1rem | 1rem | 1rem | 1.5rem |
| `.title` fontSize | | 1.75rem ≤600 | 1.75rem | 2rem | 2rem | 2.5rem |
| `.avatar` height | | 145px ≤480 / 90px 480-600 / 100px 600-900 | 90px | 100px | 145px | 145px |
| `.avatar` | width | 100% | | | | |
| `.avatar` | border | 2px solid #f0f0f0 | | | | |
| `.avatar` | border-radius | 8px | | | | |
| `.avatar` | margin-bottom | 1rem | | | | |
| `.avatar` | shadow | `0 2px 8px rgba(0,0,0,0.08)` | | | | |
| `.tutorName` fontSize | | 1rem ≤480 / 1.1rem 480-600 / 1.2rem 600-900 | | | | 1.1rem |
| `.tutorCard` border | | `1px solid #f0f0f0` | | | | |
| `.tutorCard` shadow | | `0 2px 12px rgba(0,0,0,0.08)` | | | | |
| `.tutorCard` hover | | shadow `0 6px 25px rgba(0,0,0,0.12)`, translateY(-3px) | | | | |
| `.tutorCard` bg | | white | | | | |
| `.tutorCard` border-radius | | 12px | | | | |
| `.countryFlag` | bottom / left | 8 / 8 | | | | |
| `.countryFlag` | w × h | 32 × 32 | | | | |
| `.countryFlag` | border-radius | 50% | | | | |
| `.countryFlag` | shadow | `0 2px 8px rgba(0,0,0,0.15)` | | | | |
| `.icon` | color / fontSize / min-width | `#38b6ff` / 1rem / 18px | | | | |
| `.ratingIcon` | color / fontSize | `#ffc107` / 1rem | | | | |
| `.statText` | color / fontSize / fw / lh | `#555` / 0.8rem (0.85rem ≤600) / 500 / 1.3 | | | | |
| `.ratingText` | color / fontSize / fw | `#666` / 0.85rem / 600 | | | | |
| `.statItem` | gap / mb | 0.5rem / 0.5rem | | | | |

### Animations
Card hover: 300ms ease — shadow grows, translateY(-3px).

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 39 | `px-6 py-12 lg:py-16` | MUI `.container { padding: 2rem 1rem }` (= py-8 px-4) at ≥480, `1rem 0.5rem` (= p-4 px-2) at ≤480. Port uses py-12 (=48px) which is double. | **High** — vertical padding doubled |
| B2 | 41 | title `text-h4 text-ink-900` | MUI `.title { fontSize: 2.5rem!important; font-weight: 700 }`. h4 in this theme is ~1.25rem (desktop). Port renders ~12% the intended size. | **High** — title is much smaller than MUI (1.25rem vs 2.5rem) |
| B3 | 45 | track `gap-4 pb-4` | MUI `.carouselTrack { gap: 1.5rem }` (= gap-6) at ≥1200, 1rem (= gap-4) below. Port uses gap-4 everywhere. | **Med** — desktop gap 8px too small |
| B4 | 51 | card `w-72 shrink-0 ... p-5 shadow-card` | MUI `.tutorCard { min-w/max-w: 220 / 200 / 240 / 200 / 220 by breakpoint; padding: 1rem / 1.25rem / 0.875rem by bp; border: 1px solid #f0f0f0; box-shadow: 0 2px 12px rgba(0,0,0,0.08) }`. Port `w-72` = 288px (way wider than MUI's 200-240 range); `p-5` = 20px (MUI is 14-20px); `shadow-card` may or may not match. | **High** — cards 50% wider than MUI |
| B5 | 51 | (no border 1px solid #f0f0f0) | MUI has border | **Low** |
| B6 | 51 | (no hover effects) | MUI hover: shadow + translateY(-3px) | **Med** |
| B7 | 54 | avatar wrapper `h-32 w-full rounded-md bg-brand-50 overflow-hidden` | MUI `.avatar { height: 145px / 90px / 100px / 145px (by bp); width 100%; border-radius: 8px; border 2px solid #f0f0f0; box-shadow }`. Port `h-32` = 128px (fixed). | **Med** |
| B8 | 70 | flag overlay `absolute bottom-2 start-2 ... h-7 w-7 rounded-full bg-white shadow-sm` | MUI `.countryFlag { bottom 8 left 8; w/h 32; bg transparent; shadow stronger }`. Port `bottom-2 start-2` ✓ (logical), w/h 7 (=28px) close to 32, but `bg-white` overrides MUI's `transparent` and `shadow-sm` is much weaker. | **Med** |
| B9 | 78 | name `text-h6 text-ink-900` (no font-weight) | MUI `.tutorName { font-size: 1.1rem!important; font-weight: 700!important; line-height: 1.2!important; text-align: left }`. Port uses h6 token (1rem) without 700. | **Med** — name slightly small, missing bold |
| B10 | 81-84 | rating chip `bg-warning/10 px-2 py-1 rounded-md` + Star fill warning | MUI `.ratingContainer { flex items-center gap 0.25rem }` — NO background chip. MUI star is plain icon + text. | **High** — port adds a yellow chip that doesn't exist in MUI |
| B11 | 82 | Star size 14 vs MUI 1rem (16px) | Close enough | OK |
| B12 | 82 | rating text `text-small font-semibold text-warning` | MUI `.ratingText { color #666, font-weight 600, font-size 0.85rem (=text-small ✓) }`. Port `text-warning` (yellow) vs MUI dark gray. | **Med** — rating number should be #666 not yellow |
| B13 | 87, 91, 95 | stat rows `font-heading text-small text-ink-700` | MUI `.statText { color: #555, font-size: 0.8rem!important, font-weight: 500!important }`. Port `text-small` (14px) larger than 0.8rem (12.8px). | **Med** |
| B14 | 88, 92, 96 | icons `Clock / GraduationCap / Users` from `lucide-react` size 14 + `text-brand-500` | MUI uses MUI Material icons `AccessTime / School / Groups`. Lucide is NEW DEPENDENCY. Size 14 vs MUI 1rem (16px). | **Critical** |
| B15 | 32 | (no scroll-snap or hide-scrollbar in port) | MUI hides scrollbar with `scrollbar-width: none` + `::-webkit-scrollbar { display: none }`. Port shows native scrollbar. | **Med** — UX/visual divergence |

## §3 Corrected Tailwind classNames

```tsx
<div className="mx-auto w-full max-w-[1400px] p-4 sm:p-8">
  <div className="flex items-center justify-center">
    <h4 className="font-heading text-[1.75rem] font-bold text-[#333] sm:text-[2rem] lg:text-[2.5rem]">
      {title}
    </h4>
  </div>

  <div className="mt-4 overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    <div className="flex min-w-max gap-4 p-2 lg:gap-6">
      {tutors.slice(0, 9).map((tutor, index) => {
        const stats = generateTutorStats(index);
        return (
          <div key={index}
            className="flex w-[220px] shrink-0 cursor-pointer flex-col items-center rounded-[12px] border border-[#f0f0f0] bg-white p-4 text-center shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_6px_25px_rgba(0,0,0,0.12)] max-[480px]:w-[200px] max-[480px]:p-[0.875rem] min-[601px]:max-[900px]:w-[240px] min-[601px]:max-[900px]:p-5">
            <div className="relative mb-4 flex w-full flex-col items-center">
              <div className="h-[145px] w-full overflow-hidden rounded-lg border-2 border-[#f0f0f0] shadow-[0_2px_8px_rgba(0,0,0,0.08)] max-[600px]:h-[90px] min-[601px]:max-[900px]:h-[100px]">
                {tutor.profileImageUrl ? (
                  <Image src={tutor.profileImageUrl} alt={`${tutor["First Name"]} ${tutor["Last Name"] ?? ""}`} width={220} height={145} className="h-full w-full object-cover" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center font-heading text-h2 text-brand-500">
                    {getInitials(tutor["First Name"], tutor["Last Name"])}
                  </span>
                )}
              </div>
              <div className="absolute bottom-2 start-2 z-10 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.15)]" title={stats.countryName}>
                <FlagIcon countryCode={stats.countryCode} size={24} />
              </div>
            </div>

            <div className="mb-3 flex w-full items-center justify-between">
              <p className="text-start font-heading text-[1.1rem] font-bold leading-[1.2] text-[#333]">
                {`${tutor["First Name"]} ${tutor["Last Name"] ?? ""}`}
              </p>
              <div className="flex items-center gap-1">
                {/* Replace lucide Star with MUI Star or inline SVG */}
                <span className="text-[1rem] text-[#ffc107]">★</span>
                <span className="font-body text-[0.85rem] font-semibold text-[#666]">{stats.rating}</span>
              </div>
            </div>

            {/* Stat rows — replace lucide icons with MUI or inline SVG */}
            <div className="mb-2 flex w-full items-center justify-start gap-2">
              <span className="min-w-[18px] text-[1rem] text-brand-500">⏰</span>
              <span className="font-body text-[0.8rem] font-medium leading-[1.3] text-[#555]">Hours taught: {stats.hours.toLocaleString()}+</span>
            </div>
            {/* same for School / Groups */}
          </div>
        );
      })}
    </div>
  </div>
</div>
```

## §4 Verification at 4 widths

- **375**: title 1.75rem, card w-[200px] p-[0.875rem], avatar 145px (≤480 branch — Tailwind `max-[480px]:`). Actually MUI's avatar at <480 is 145px, at 480-600 is 90px, at 600-900 is 100px, at ≥900 is 145px — unusual non-monotonic mapping.
- **768 (600-900)**: title 2rem; card w-[240px] p-5; avatar h-100px; gap-4.
- **1280**: title 2.5rem; card w-[220px] p-4; avatar h-145px; gap-6.
- **1920**: same as lg.

## §5 RTL notes

- Flag overlay uses `start-2` (logical) ✓ — flips to right edge in RTL.
- Card content uses `flex-col items-center` — direction-agnostic for layout.
- Tutor name `text-start` flips correctly ✓ (current port uses no text-align, defaulting to inherit).
- Horizontal scroll direction: MUI `overflow-x: auto` works regardless of `dir`. In RTL the natural starting point is the right edge — browsers handle this automatically when parent has `dir="rtl"`.
