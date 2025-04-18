/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#235784",
        secondary: "#ddeaf6",
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
    require("flyonui"),
    require("flyonui/plugin"),
  ],
  darkMode: "class",
};
