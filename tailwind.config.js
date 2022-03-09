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
      },
      animation: {
        "scale-right": "scale-right 0.3s ease-out",
        "scale-right-reverse": "scale-right 0.3s ease-out reverse",
        "scale-top": "scale-top 0.1s",
        "scale-top-reverse": "scale-top 0.1s reverse",
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
