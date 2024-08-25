/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "#111827", // gray-900
          light: "#ffffff", // white
          accent: "#60a5fa", // blue-400
          accentHover: "#3b82f6", // blue-500
        },
        secondary: {
          dark: "#1e3a8a", // blue-900
          accent: "#8b5cf6", // purple-500
          accentHover: "#7c3aed", // purple-600
        },
        tertiary: {
          light: "#bfdbfe", // blue-200
          muted: "#d1d5db", // gray-300
        },
      },
    },
  },
  plugins: [],
};
