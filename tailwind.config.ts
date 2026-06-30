import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fbf7ed",
          100: "#f5ecd0",
          200: "#ecd89e",
          300: "#e0bd66",
          400: "#d6a83f",
          500: "#c4912c",
          600: "#a87423",
          700: "#86591f",
          800: "#6f481f",
          900: "#5e3d1e",
        },
        charcoal: {
          900: "#0a0a0a",
          800: "#141414",
          700: "#1f1f1f",
          600: "#2b2b2b",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
