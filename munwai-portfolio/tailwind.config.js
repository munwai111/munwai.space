/* eslint-disable */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Sora",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant, e }) {
      addVariant("custom-variant", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.custom-variant .${e(
            `custom-variant${separator}${className}`
          )}`;
        });
      });
    }),
  ],
};
