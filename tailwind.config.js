/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./ui/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
