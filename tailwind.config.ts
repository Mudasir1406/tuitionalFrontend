import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import animate from "tailwindcss-animate";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    screens: {
      sm: "600px",
      md: "900px",
      lg: "1200px",
      xl: "1500px",
      "2xl": "2000px",
    },
    extend: {
      colors: {
        brand: {
          50: "#D7F0FF",
          100: "#BFE4FB",
          200: "#9EDCFF",
          300: "#7DD2FF",
          400: "#56C4FF",
          500: "#38B6FF",
          600: "#2A9CDF",
          700: "#1F7FBA",
          800: "#176595",
          900: "#0F4970",
        },
        ink: {
          50: "#FAFAFA",
          100: "#F2F2F2",
          200: "#E5E5E5",
          300: "#CCCCCC",
          400: "#999999",
          500: "#666666",
          600: "#4D4D4D",
          700: "#3A3A3A",
          800: "rgba(0, 0, 0, 0.77)",
          900: "#2D2D2D",
        },
        success: "#51B893",
        warning: "#FFB000",
        danger: "#B70000",
      },
      fontFamily: {
        heading: ["var(--font-league-spartan)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "Segoe UI", "Roboto", "sans-serif"],
        arabic: ["var(--font-noto-arabic)", "Tahoma", "Arial Unicode MS", "sans-serif"],
      },
      fontSize: {
        h1: ["3rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        h2: ["2.25rem", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "700" }],
        h3: ["1.5rem", { lineHeight: "1.3", letterSpacing: "0", fontWeight: "700" }],
        h4: ["1.25rem", { lineHeight: "1.4", letterSpacing: "0", fontWeight: "600" }],
        h5: ["1.125rem", { lineHeight: "1.4", letterSpacing: "0", fontWeight: "600" }],
        h6: ["1rem", { lineHeight: "1.5", letterSpacing: "0", fontWeight: "600" }],
        "h1-tablet": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "h2-tablet": ["1.75rem", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "700" }],
        "h3-tablet": ["1.25rem", { lineHeight: "1.3", letterSpacing: "0", fontWeight: "700" }],
        "h4-tablet": ["1.125rem", { lineHeight: "1.4", letterSpacing: "0", fontWeight: "600" }],
        "h5-tablet": ["1rem", { lineHeight: "1.4", letterSpacing: "0", fontWeight: "600" }],
        "h1-mobile": ["1.75rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "h2-mobile": ["1.375rem", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "700" }],
        "h3-mobile": ["1.125rem", { lineHeight: "1.3", letterSpacing: "0", fontWeight: "700" }],
        "h4-mobile": ["1rem", { lineHeight: "1.4", letterSpacing: "0", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.7", letterSpacing: "0", fontWeight: "400" }],
        "body-mobile": ["0.9375rem", { lineHeight: "1.7", letterSpacing: "0", fontWeight: "400" }],
        small: ["0.875rem", { lineHeight: "1.5", letterSpacing: "0", fontWeight: "400" }],
        nav: ["1rem", { lineHeight: "1.5", letterSpacing: "0.01em", fontWeight: "500" }],
        button: ["1rem", { lineHeight: "1", letterSpacing: "0.02em", fontWeight: "600" }],
        "button-mobile": ["0.9375rem", { lineHeight: "1", letterSpacing: "0.02em", fontWeight: "600" }],
        "form-label": ["0.875rem", { lineHeight: "1.4", letterSpacing: "0", fontWeight: "500" }],
        "form-input": ["1rem", { lineHeight: "1.5", letterSpacing: "0", fontWeight: "400" }],
        "stat-number": ["3rem", { lineHeight: "1", letterSpacing: "0", fontWeight: "700" }],
        "stat-number-tablet": ["2.25rem", { lineHeight: "1", letterSpacing: "0", fontWeight: "700" }],
        "stat-number-mobile": ["1.75rem", { lineHeight: "1", letterSpacing: "0", fontWeight: "700" }],
        "stat-label": ["0.875rem", { lineHeight: "1.4", letterSpacing: "0.05em", fontWeight: "500" }],
        "category-tag": ["0.875rem", { lineHeight: "1", letterSpacing: "0.08em", fontWeight: "600" }],
      },
      borderRadius: {
        none: "0",
        sm: "4px",
        DEFAULT: "8px",
        md: "10px",
        lg: "16px",
        xl: "24px",
        full: "9999px",
      },
      boxShadow: {
        card: "0px 1px 4px 0px rgba(0, 0, 0, 0.08)",
        "brand-glow": "0.1vh 1.5vh 3.4vh 0px rgba(56, 182, 255, 0.4)",
        header:
          "0px -0.3vh 0.8vh 0px #00000026 inset, 0px 0.2vh 0.1vh 0px #0000000D",
        "footer-card":
          "5px -5px 8px 0px rgba(0,0,0,0.15) inset, -6px 2px 8px 0px rgba(0,0,0,0.15) inset, 0px 4px 4px 0px rgba(0,0,0,0.25)",
        "cta-white": "1px 15px 34px 0px rgba(0,0,0,0.2)",
      },
      backgroundImage: {
        "hero-fade": "linear-gradient(to bottom, #D7F0FF, rgba(255, 255, 255, 0.7))",
        "footer-fade": "linear-gradient(to bottom, rgba(255,255,255,0.7), #37B6FF)",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "left-circle": {
          "0%": { transform: "translateX(0) translateY(0)" },
          "50%": { transform: "translateX(-12px) translateY(-8px)" },
          "100%": { transform: "translateX(0) translateY(0)" },
        },
        "right-circle": {
          "0%": { transform: "translateX(0) translateY(0)" },
          "50%": { transform: "translateX(12px) translateY(-8px)" },
          "100%": { transform: "translateX(0) translateY(0)" },
        },
      },
      animation: {
        pulse: "pulse 2s ease-in-out infinite",
        "left-circle": "left-circle 3s ease-in-out infinite",
        "right-circle": "right-circle 3s ease-in-out infinite",
      },
    },
  },
  plugins: [forms, animate],
};

export default config;
