/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",   // ✅ VERY IMPORTANT
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#0F285F",
        secondary: "#D4EAF7",
        accent: "#00BFA5",

        background: "#F3F7FA",
        surface: "#FFFFFF",

        text: "#333333",
        muted: "#666666",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};