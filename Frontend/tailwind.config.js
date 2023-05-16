/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    colors: { ...colors },
    extend: {
      colors: {},
    },
  },
  plugins: [require("flowbite/plugin")],
};
