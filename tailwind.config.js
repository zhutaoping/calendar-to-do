/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        hideScroll: {
          "0%, 100%": { overflow: "hidden" },
        },
      },
      animation: {
        hideScroll: "hideScroll 1.2s backwards",
      },
      colors: {
        primary: "var(--primary)",
        bgContainer: "var(--bg-container)",
        textOnCalendar: "var(--text-onCalendar)",
        bgSecondary: "var(--bg-secondary)",
        bgTertiary: "var(--bg-tertiary)",
        borderDays: "var(--border-days)",
        otherDays: "var(--other-days)",
        bgCredits: "var(--bg-credits)",
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")({ prefix: "ui" })],
};
