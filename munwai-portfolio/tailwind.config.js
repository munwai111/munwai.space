/* eslint-disable */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./index.html",
  ],
  presets: [require("@relume_io/relume-tailwind")],
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
      fontWeight: {
        DEFAULT: "100",
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
