/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ffffff",
          100: "#f7f7f7",
          200: "#ededed",
          300: "#d2d2d2",
          400: "#b1b1b1",
          500: "#737373",
          600: "#404040",
          700: "#1a1a1a",
          800: "#0d0d0d",
          900: "#000000",
        },
        accent: {
          50: "#ffe5e5",
          100: "#fbb8b8",
          200: "#f28a8a",
          300: "#ea5c5c",
          400: "#e12e2e",
          500: "#c41f1f",
          600: "#a11a1a",
          700: "#6d1313",
          800: "#420c0c",
          900: "#1e0606",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
