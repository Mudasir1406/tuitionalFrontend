# Component — `TrustpilotReview`

Two-column hero panel: left side shows the "We're the highest-rated tutoring service" headline; right side is a single review card with prev/next arrows. Independent from `TrustpilotCarousel` (different component, different file).

| Side | Path |
|---|---|
| MUI source | `tuitionalFrontend-mui-baseline\src\components\trustpilot-review\TrustpilotReview.tsx` + `TrustpilotReview.module.css` |
| Tailwind port | **NOT YET PORTED** — no file at `tuitionalFrontend\src\components\trustpilot-review\` exists |

## §1 MUI source — extracted properties

Source styling is entirely in `TrustpilotReview.module.css`. The TSX only assembles the JSX tree.

### Layout tree

```
Box.container             (w 100%, bg #f8f9fa, padding 60px 20px)
└── Box.wrapper           (max-w 1200, mx auto, flex, gap 60px, items-center)
    ├── Box.leftSection   (flex 1, flex col, gap 24px)
    │   ├── Box.logoSection.trustpilotLogo (flex items-center gap 12px, mb 8px)
    │   │   ├── 5 stars (rendered via renderStars(5))
    │   │   └── Typography .trustpilotText "Trustpilot"
    │   ├── Typography variant=h4 .headline  ("We're the {highlighted} tutoring service")
    │   ├── Typography variant=body1 .description  "Trusted by thousands..."
    │   └── (highlight span inside headline: bg #E8F5E8, padding 4px 8px, radius 6px)
    └── Box.rightSection (flex 1, flex justify-center)
        └── Box.reviewCard (white bg, radius 12px, p 32px, shadow `0 4px 20px rgba(0,0,0,0.1)`,
                            border 1px #e5e7eb, w 100%, max-w 400px)
            ├── Box.reviewHeader (flex col gap 12px, mb 24px)
            │   ├── Box.reviewRating (flex items-center gap 12px)
            │   │   ├── Typography variant=h5 .excellentText "Excellent"
            │   │   └── Box.reviewStars (flex gap 2px) — 5 stars
            │   ├── Typography variant=body2 .reviewCount "1,814 reviews"
            │   └── Box.trustpilotSmallLogo (mt 8px) → Typography .trustpilotSmallText "Trustpilot"
            └── Box.reviewContent (relative)
                ├── Box.reviewText (mb 20px)
                │   ├── Typography variant=body2 .reviewTextContent "{review.text}" (italic)
                │   └── Typography variant=caption .reviewerInfo "{reviewer}, {timePosted}"
                └── Box.navigationArrows (flex justify-end gap 8px, mt 16px)
                    ├── IconButton.arrowButton ArrowBackIos
                    └── IconButton.arrowButton ArrowForwardIos
```

### Dimensions & spacing — from `TrustpilotReview.module.css`

| Element | Property | Default | ≤768 | ≤480 |
|---|---|---|---|---|
| .container | padding | `60px 20px` | `40px 16px` | same |
| .wrapper | max-width / margin | 1200 / 0 auto | same | same |
| .wrapper | gap | 60px | 40px | same |
| .wrapper | flexDirection | row | column | same |
| .wrapper | text-align | (default) | center | same |
| .leftSection | gap | 24px | same | same |
| .leftSection | alignItems | (default) | center | same |
| .logoSection | margin-bottom | 8px | same | same |
| .trustpilotLogo | gap | 12px | same | same |
| .description | max-width | (none) | 400px | same |
| .reviewCard | radius / padding | 12 / 32px | 24px | 20px |
| .reviewCard | max-width | 400px | 100% | same |
| .reviewCard | border | 1px #e5e7eb | same | same |
| .reviewHeader | gap / mb | 12 / 24px | same | same |
| .reviewRating | gap | 12px | same | same |
| .reviewStars | gap | 2px | same | same |
| .reviewText | mb | 20px | same | same |
| .navigationArrows | gap / mt | 8 / 16px | same | same |
| .arrowButton | size / radius | 36×36 / 50% | same | same |
| .arrowButton | border | 1px #e5e7eb | same | same |
| .highlighted | padding | 4px 8px | same | same |
| .highlighted | radius | 6px | same | same |
| .trustpilotSmallLogo | margin-top | 8px | same | same |

### Typography

| Element | MUI variant | Default | ≤768 | ≤480 | Weight | Color | Font |
|---|---|---|---|---|---|---|---|
| .headline | h4 | 42px | 32px | 28px | 700, lh 1.2 | #1a1a1a | League Spartan |
| .description | body1 | 16px | (text-align center, max-w 400) | same | normal, lh 1.5 | #666 | League Spartan |
| .trustpilotText | — | 18px | same | 16px | 600 | #00B67A | League Spartan |
| .excellentText | h5 | 24px | 20px | same | 700 | #1a1a1a | League Spartan |
| .reviewCount | body2 | 14px | same | same | normal | #666 | League Spartan |
| .trustpilotSmallText | — | 14px | same | same | 600 | #00B67A | League Spartan |
| .reviewTextContent | body2 | 16px | 14px | same | italic, lh 1.5 | #1a1a1a | League Spartan |
| .reviewerInfo | caption | 12px | same | same | normal | #888 | League Spartan |
| .star | — | 20px | same | same | normal | green/grey | (inherits) |

### Colors

| Element | Color |
|---|---|
| .container bg | #f8f9fa |
| .headline | #1a1a1a |
| .highlighted bg / text | #E8F5E8 / #00B67A |
| .description / .reviewCount | #666 |
| .reviewCard bg / border | white / #e5e7eb |
| .arrowButton bg / border | #f3f4f6 / #e5e7eb |
| .arrowButton:hover bg / border / icon | #00B67A / #00B67A / white |
| .starFilled / .trustpilotText / .verifiedText | #00B67A |
| .starEmpty | #e5e7eb |
| .reviewerInfo | #888 |
| .reviewTextContent | #1a1a1a |

### Animations / interactions

- `.arrowButton` `transition: all 0.2s ease`. On hover: bg → #00B67A, border → #00B67A, `.arrowIcon` color → white.
- `.arrowIcon` `transition: color 0.2s ease`.
- No keyframes; no scale/translate on hover.
- Click prev/next cycles `currentReviewIndex` through the 3 hard-coded reviews (no transition between them — content swaps instantly).

## §2 Tailwind port — bug list

| # | Status |
|---|---|
| — | **Port file does not exist yet.** `tuitionalFrontend\src\components\trustpilot-review\` directory was not found at audit time. |

If this component is required, port it from MUI source using the values in §1. Decide whether to:
- (Recommended) Copy `TrustpilotReview.module.css` verbatim under the same CSS-modules grandfathering rule used for `Input.module.css`, `DropDown.css`, and `TrustpilotCarousel.module.css`.
- (Strict Tailwind) Inline every rule above into arbitrary Tailwind classes. There are no token-level shortcuts for the `!important` rem overrides — they must be expressed as `text-[42px]`, `text-[1.1rem]`, etc.

## §3 Corrected Tailwind classNames (target shape if porting fresh)

```tsx
"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // or hand-rolled SVG matching ArrowBackIos/ArrowForwardIos
import { leagueSpartan } from "@/app/fonts";

const TrustpilotReview: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const reviews = [/* ...3 reviews... */];
  const r = reviews[idx];

  const renderStars = (n: number) => Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={cn(
      "text-[20px] transition-colors duration-200",
      i < n ? "text-[#00B67A]" : "text-[#e5e7eb]"
    )}>★</span>
  ));

  return (
    <div className="w-full bg-[#f8f9fa] px-5 py-[60px] max-md:px-4 max-md:py-10">
      <div className="mx-auto flex max-w-[1200px] items-center gap-[60px] max-md:flex-col max-md:gap-10 max-md:text-center">
        {/* Left */}
        <div className="flex flex-1 flex-col gap-6 max-md:items-center">
          <div className="mb-2">
            <div className="flex items-center gap-3">
              {renderStars(5)}
              <p className={cn(leagueSpartan.className,
                "font-heading text-[18px] font-semibold text-[#00B67A] max-[480px]:text-[16px]"
              )}>Trustpilot</p>
            </div>
          </div>
          <h4 className={cn(leagueSpartan.className,
            "font-heading text-[42px] font-bold leading-[1.2] text-[#1a1a1a]",
            "max-md:text-[32px] max-md:text-center",
            "max-[480px]:text-[28px]"
          )}>
            We&apos;re the{" "}
            <span className="rounded-md bg-[#E8F5E8] px-2 py-1 font-bold text-[#00B67A]">highest-rated</span>{" "}
            tutoring service
          </h4>
          <p className={cn(leagueSpartan.className,
            "font-heading text-[16px] leading-[1.5] text-[#666]",
            "max-md:text-center max-md:max-w-[400px]"
          )}>Trusted by thousands of students and parents worldwide for exceptional tutoring results.</p>
        </div>

        {/* Right */}
        <div className="flex flex-1 justify-center">
          <div className="w-full max-w-[400px] rounded-[12px] border border-[#e5e7eb] bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.1)] max-md:max-w-full max-md:p-6 max-[480px]:p-5">
            {/* Header */}
            <div className="mb-6 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <h5 className={cn(leagueSpartan.className,
                  "font-heading text-[24px] font-bold text-[#1a1a1a] max-md:text-[20px]"
                )}>Excellent</h5>
                <div className="flex gap-[2px]">{renderStars(5)}</div>
              </div>
              <p className={cn(leagueSpartan.className,
                "font-heading text-small text-[#666]"
              )}>1,814 reviews</p>
              <div className="mt-2">
                <p className={cn(leagueSpartan.className,
                  "font-heading text-small font-semibold text-[#00B67A]"
                )}>Trustpilot</p>
              </div>
            </div>

            {/* Content */}
            <div className="relative">
              <div className="mb-5">
                <p className={cn(leagueSpartan.className,
                  "font-heading text-[16px] italic leading-[1.5] text-[#1a1a1a] mb-3 max-md:text-[14px]"
                )}>&ldquo;{r.text}&rdquo;</p>
                <p className={cn(leagueSpartan.className,
                  "font-heading text-[12px] text-[#888]"
                )}>{r.reviewer}, {r.timePosted}</p>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button type="button" onClick={prev}
                  className="group flex h-9 w-9 items-center justify-center rounded-full border border-[#e5e7eb] bg-[#f3f4f6] transition-all duration-200 hover:border-[#00B67A] hover:bg-[#00B67A]">
                  <ChevronLeft className="h-[14px] w-[14px] text-[#666] transition-colors duration-200 group-hover:text-white" />
                </button>
                <button type="button" onClick={next}
                  className="group flex h-9 w-9 items-center justify-center rounded-full border border-[#e5e7eb] bg-[#f3f4f6] transition-all duration-200 hover:border-[#00B67A] hover:bg-[#00B67A]">
                  <ChevronRight className="h-[14px] w-[14px] text-[#666] transition-colors duration-200 group-hover:text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
```

## §4 Verification at 4 widths

- 375 (≤480 band): two-row stack (left above right), container padding `40px 16px`, headline 28px, reviewCard p-5.
- 768 (≤768 band, top of mobile): stack still column (max-md), gap 40px, headline 32px, reviewCard full width with p-6, body 14px.
- 1280 (≥md): row layout, gap 60px between left and right, headline 42px, reviewCard 400px wide on the right.
- 1920: same as 1280 (no further scale).

## §5 RTL notes

- `.wrapper { gap: 60px }` and `.leftSection { gap: 24px }` — non-directional. The two columns flip side under `dir="rtl"` automatically.
- `.navigationArrows { justify-content: flex-end }` — sticks the buttons to the right in LTR, left in RTL. ArrowBackIos / ArrowForwardIos icons do NOT auto-mirror; in RTL the visual meaning inverts (back-arrow points the wrong way). If localizing to AR, the icon order should be reversed and/or the icons themselves swapped. MUI source does not address this; port should branch via `useI18n().isRTL`.
- `.highlighted { padding: 4px 8px }` — symmetric, safe.
- All `text-align` is unset; native bidi handles the content. Add `text-start` (rather than `text-left`) anywhere a directional alignment is required.
- The italic styling on `.reviewTextContent` renders correctly in both English and Arabic.
