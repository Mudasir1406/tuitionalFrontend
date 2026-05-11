import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customFontSizes = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "h1-tablet",
  "h2-tablet",
  "h3-tablet",
  "h4-tablet",
  "h5-tablet",
  "h1-mobile",
  "h2-mobile",
  "h3-mobile",
  "h4-mobile",
  "body",
  "body-mobile",
  "small",
  "nav",
  "button",
  "button-mobile",
  "form-label",
  "form-input",
  "stat-number",
  "stat-number-tablet",
  "stat-number-mobile",
  "stat-label",
  "category-tag",
  "caption",
];

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: customFontSizes }],
    },
  },
});

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
