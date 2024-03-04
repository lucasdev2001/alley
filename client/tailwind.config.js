/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },

  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["lofi"],
        },
      }
    ],
  },
  plugins: [require("daisyui")],
};
