import type { Metadata } from "next";

export const IS_DEV_ENV = process.env.NEXT_PUBLIC_APP_ENV === "development";

export const SITE_URL = IS_DEV_ENV
  ? "https://web-staging.tuitionaledu.com/"
  : "https://tuitionaledu.com";

export const NOINDEX_ROBOTS: Metadata["robots"] = {
  index: false,
  follow: false,
  nocache: true,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
  },
};

// In development mode force noindex/nofollow on every page; otherwise pass through.
export const resolveRobots = (
  prodRobots: Metadata["robots"],
): Metadata["robots"] => (IS_DEV_ENV ? NOINDEX_ROBOTS : prodRobots);
export const SITE_URL_TRUSTPILOT =
  "https://www.trustpilot.com/evaluate/tuitionaledu.com";
export const HELLOTUITIONALEDU = "hello@tuitionaledu.com";
export const CAREERSTUITIONALEDU = "careers@tuitionaledu.com";
export const HRTUITIONALEDU = "hr@tuitionaledu.com";
export const PIXEL_ID = "1950457082424995";
export const PIXEL_TOKEN =
  "EAALq11J7hlkBPKDoyPgtBJIwZAsXoAAd0QeGgwFGOMHyOFkrItzWZAxeBl4ZAPemTIOvfNf5st5561eogsR7qtr1pAWZBCQErGPCZCAqwqkvUXk766pGZCuIRrj61BX90wRjfgWpZBiYt08C4N0NTuhmsh5kUr9qNFfLUU9ZCk75H94DtWSdTTk253kqcBBA9AsiCgZDZD";
