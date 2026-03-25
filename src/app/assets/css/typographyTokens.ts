/**
 * Typography Tokens for Tuitional Website
 * Standardized across Home, About, Contact, and Testimonials
 * Scale provided in Typography & Font Standardisation Plan (March 2026)
 */

export const TYPOGRAPHY_TOKENS = {
  desktop: {
    h1: { rem: "3rem", weight: 700, lineHeight: 1.2, letterSpacing: "-0.02em" },
    h2: { rem: "2.25rem", weight: 700, lineHeight: 1.25, letterSpacing: "-0.01em" },
    h3: { rem: "1.5rem", weight: 700, lineHeight: 1.3, letterSpacing: "0" },
    h4: { rem: "1.25rem", weight: 600, lineHeight: 1.4, letterSpacing: "0" },
    h5: { rem: "1.125rem", weight: 600, lineHeight: 1.4, letterSpacing: "0" },
    h6: { rem: "1rem", weight: 600, lineHeight: 1.5, letterSpacing: "0" },
    body: { rem: "1rem", weight: 400, lineHeight: 1.7, letterSpacing: "0" },
    small: { rem: "0.875rem", weight: 400, lineHeight: 1.5, letterSpacing: "0" },
    nav: { rem: "1rem", weight: 500, lineHeight: 1.5, letterSpacing: "0.01em" },
    button: { rem: "1rem", weight: 600, lineHeight: 1, letterSpacing: "0.02em" },
    formLabel: { rem: "0.875rem", weight: 500, lineHeight: 1.4, letterSpacing: "0" },
    formInput: { rem: "1rem", weight: 400, lineHeight: 1.5, letterSpacing: "0" },
    statNumber: { rem: "3rem", weight: 700, lineHeight: 1, letterSpacing: "0" },
    statLabel: { rem: "0.875rem", weight: 500, lineHeight: 1.4, letterSpacing: "0.05em", transform: "uppercase" },
    categoryTag: { rem: "0.875rem", weight: 600, lineHeight: 1, letterSpacing: "0.08em", transform: "uppercase" },
  },
  tablet: {
    h1: { rem: "2.25rem" },
    h2: { rem: "1.75rem" },
    h3: { rem: "1.25rem" },
    h4: { rem: "1.125rem" },
    h5: { rem: "1rem" },
    statNumber: { rem: "2.25rem" },
  },
  mobile: {
    h1: { rem: "1.75rem" },
    h2: { rem: "1.375rem" },
    h3: { rem: "1.125rem" },
    h4: { rem: "1rem" },
    body: { rem: "0.9375rem", px: "15px" },
    statNumber: { rem: "1.75rem" },
    button: { rem: "0.9375rem" },
    formInput: { rem: "1rem" }, // Never reduce input text for accessibility
  },
};
