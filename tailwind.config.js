/** @type {import('tailwindcss').Config} */
const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, './pages/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, './components/**/*.{js,ts,jsx,tsx}'),
  ],
  theme: {
    extend: {
      colors:{
        accentGrey:"#ECECEC"
      },
      fontSize: {
        tiny: '0.5rem',
        xxs: '0.625rem'
      },
    },
  },
  plugins: [],
};
