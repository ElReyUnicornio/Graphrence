const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}",
    flowbite.content()
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ["raleway", "sans-serif"],
      },
      maxWidth: {
        "10/12": "83.333333%",
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

