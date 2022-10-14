/** @type {import('tailwindcss').Config} */

const { fontFamily, screens } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    screens: { xxs: "270px", xs: "350px", ...screens },
    extend: {
      fontFamily: {
        sans: ["Barlow", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
