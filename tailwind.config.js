const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "375px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        body: ["Shippori Antique B1", "sans-serif"],
      },
      keyframes: {
        "scale-right": {
          "0%": {
            transform: "scaleX(0%)",
          },
          "100%": {
            transform: "scaleX(100%)",
          },
        },
        "scale-top": {
          "0%": {
            transform: "scaleY(0%)",
          },
          "100%": {
            transform: "scaleY(100%)",
          },
        },
        "pop-up": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
      },
      animation: {
        "scale-right": "scale-right 0.3s ease-out",
        "scale-right-reverse": "scale-right 0.3s ease-out reverse",
        "scale-top": "scale-top 0.1s",
        "scale-top-reverse": "scale-top 0.1s reverse",
        "pop-up": "pop-up 0.2s ease-out",
        "pop-up-reverse": "pop-up 0.2s ease-out reverse",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".two-line": {
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "2",
        },
      });
    }),
  ],
};
