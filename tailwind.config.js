/** @type {import('tailwindcss').Config} */
const { join } = require("path");

module.exports = {
  content: [
    join(__dirname, "./pages/**/*.{js,ts,jsx,tsx}"),
    join(__dirname, "./components/**/*.{js,ts,jsx,tsx}"),
  ],
  theme: {
    extend: {
      colors: {
        accentGrey: "#ECECEC",
      },
      backgroundImage: {
        "split-black-white":
          "linear-gradient(to right, black 50% , #e5e7eb 50%);",
      },
      fontSize: {
        tiny: "0.5rem",
        xxs: "0.625rem",
      },
      fontFamily: {
        sans:  ["Inter", "ui-sans-serif", "system-ui"],
        inter: ["Inter", "ui-sans-serif", "system-ui"]
      },
    },
  },
  plugins: [],
};
