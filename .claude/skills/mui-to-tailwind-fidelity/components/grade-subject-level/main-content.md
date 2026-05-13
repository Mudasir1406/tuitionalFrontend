# Component — `MainContent`

Page-level paragraph block with optional 2-column subject button list. Title (default h3), description paragraph, then a `<Grid container spacing={2}>` of "subject" links rendered as white pill buttons.

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\grade-subject-level\main-content.tsx` |
| Tailwind port | `tuitionalFrontend\src\components\grade-subject-level\main-content.tsx` |

## §1 MUI source — extracted properties

### Layout tree

```
Box .contanier (paddingX 5vw)
  Typography variant=headerTag .title  (w xs/sm/md:100% lg:50vw; text-align xs:center md:left; mb xs:2vh md:3vh)
  Typography variant=body2 .description (color #2D2D2D, w 100%, text-align xs:center md:left lg:left, mb xs:2vh md:4vh)
  if data.subjects.length > 0:
    Box .box (margin 0)
      Grid container spacing=2 .grid (lg margin 0vh auto)
        × N Grid item xs=6 sm=6 md=6 lg=6
          Button .button (bg #FFFFFF, color #2D2D2D, w 100%, radius 5vh, p 16px, shadow `0px -1px 10px 0px rgba(0,0,0,0.15) inset`, hover bg #38B6FF59 scale 1.02)
            subject.name
```

### Dimensions & spacing

| Element | Property | xs | md | lg |
|---|---|---|---|---|
| outer | paddingX | 5vw | 5vw | 5vw |
| title | width | 100% | 100% | 50vw |
| title | text-align | center | left | left |
| title | margin-bottom | 2vh | 3vh | 3vh |
| desc | color | `#2D2D2D` | | |
| desc | width | 100% | 100% | 100% |
| desc | text-align | center | left | left |
| desc | margin-bottom | 2vh | 4vh | 4vh |
| Grid spacing=2 | gap | 16px | 16px | 16px |
| Grid item | xs/sm/md/lg | 6 (always 2-col) | 6 | 6 |
| Button | bg / color | white / #2D2D2D | | |
| Button | width | 100% | 100% | 100% |
| Button | borderRadius | 5vh | | |
| Button | padding | 16px | | |
| Button | shadow | `0px -1px 10px 0px rgba(0,0,0,0.15) inset` | | |
| Button | transition | `all .2s ease-in-out` | | |
| Button | hover | bg `#38B6FF59`, scale 1.02 | | |

### Typography

| Text | MUI variant | Mobile | Tablet | Desktop | Weight | Font |
|---|---|---|---|---|---|---|
| Heading | `data.headerTag` (default h3) | 1.125rem | 1.25rem | 1.5rem | 700 | League Spartan |
| Description | `body2` | 0.875rem | 0.875rem | 0.875rem | 400 | League Spartan |
| Button | inline (commented out fontSize → MUI Button default) | 0.9375rem | 1rem | 1rem | 500 | League Spartan |

### Colors

| MUI value | Tailwind |
|---|---|
| `#FFFFFF` button bg | `bg-white` |
| `#2D2D2D` text | `text-ink-900` |
| `#38B6FF59` hover bg | arbitrary `hover:bg-[#38B6FF59]` or `hover:bg-brand-500/35` |

## §2 Tailwind port — bug list

| # | Line | Current | Expected | Severity |
|---|---|---|---|---|
| B1 | 12 | `px-[5vw]` ✓ | matches | OK |
| B2 | 14 | title `text-h3-mobile sm:text-h3-tablet lg:text-h3` (default h3) ✓ but variant-driven sizing missing for h2/h4 cases | (same minor concern as other components) | **Med** |
| B3 | 14 | `mb-[2vh] md:mb-[3vh]` ✓ | matches | OK |
| B4 | 14 | `w-full lg:w-[50vw]` ✓ | matches | OK |
| B5 | 14 | `text-center md:text-start` ✓ | matches | OK |
| B6 | 18 | desc `text-body-mobile sm:text-body text-ink-900` | MUI body2 → `text-small` (0.875rem). Port uses body (1rem desktop). | **Med** |
| B7 | 18 | `mb-[2vh] md:mb-[4vh]` ✓ | matches | OK |
| B8 | 18 | `text-center md:text-start lg:text-start` ✓ | matches | OK |
| B9 | 23 | `grid grid-cols-2 gap-4` ✓ | matches Grid xs=6 spacing=2 | OK |
| B10 | 28 | button `rounded-[5vh] bg-white p-4 text-center font-heading text-small font-medium text-ink-900 shadow-[0px_-1px_10px_0px_rgba(0,0,0,0.15)_inset] transition-transform duration-200 hover:scale-[1.02] hover:bg-brand-200/35 lg:text-[2vh]` | matches MUI button styles ✓; hover `bg-brand-200/35` is close to `#38B6FF59` (which is brand-500 at 35% alpha). **Verify** that `brand-200/35` ≈ `#38B6FF59`. If not, use `hover:bg-[#38B6FF59]`. | **Verify** |
| B11 | 28 | `lg:text-[2vh]` | MUI commented `fontSize: lg 2vh` — port follows the *commented* style. MUI's active rule has no fontSize override, so button uses default. Port adds 2vh desktop fontSize. | **Low** — port follows intent of commented MUI value |
| B12 | 28 | (no MUI Button `.MuiButton-root` text-transform: uppercase default — but className overrides with leagueSpartan, MUI default `textTransform` for Button is uppercase) | MUI Button default is `text-transform: uppercase`. Port uses an `<a>` so no uppercase. **Check if MUI source intentionally avoided uppercase** — `style.button` has no `textTransform: "none"` override, so subjects would be UPPERCASE. Port renders mixed case. | **Med** — text-case may differ. Verify on live site. |

## §3 Corrected Tailwind classNames

```tsx
<div className="px-[5vw]">
  <HeaderTag
    className="mb-[2vh] w-full text-center font-heading text-h3-mobile text-ink-900 sm:text-h3-tablet md:mb-[3vh] md:text-start lg:w-[50vw] lg:text-h3"
    dangerouslySetInnerHTML={{ __html: data?.header ?? "" }}
  />
  <div
    className="mb-[2vh] w-full text-center font-body text-small text-ink-900 md:mb-[4vh] md:text-start lg:text-start"
    dangerouslySetInnerHTML={{ __html: data?.paragraph ?? "" }}
  />

  {data?.subjects?.length > 0 && (
    <div className="grid grid-cols-2 gap-4">
      {data.subjects.map((subject, index) => (
        <a
          key={index}
          href={subject.link || "#"}
          className="block w-full rounded-[5vh] bg-white p-4 text-center font-heading text-button-mobile font-medium uppercase text-ink-900 shadow-[0px_-1px_10px_0px_rgba(0,0,0,0.15)_inset] transition-all duration-200 hover:scale-[1.02] hover:bg-[#38B6FF59] sm:text-button"
        >
          {subject.name}
        </a>
      ))}
    </div>
  )}
</div>
```

NOTE: If MUI side does NOT actually render uppercase (verify against the live MUI site or remove the `uppercase` class — MUI Button default IS uppercase but the surrounding sx doesn't override, so default applies).

## §4 Verification at 4 widths

- **375**: title h3-mobile center; desc 14px center; 2-col subject grid; buttons w-100% with rounded-5vh.
- **768**: title h3-tablet left (md breakpoint = 900px in MUI), but Tailwind `md:` = 900px. So at 768 title is still center on Tailwind side AND on MUI side ✓.
- **1280**: title h3 left w-50vw; desc 14px left; 2-col subject grid.
- **1920**: same as lg.

## §5 RTL notes

- `text-center md:text-start` and `lg:text-start` use logical `text-start` ✓ flips correctly.
- Grid is 2 equal columns — direction-agnostic.
- Button content is centered → direction-agnostic.
