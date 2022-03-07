module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
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
      },
      animation: {
        "scale-right": "scale-right 0.3s ease-out",
        "scale-right-reverse": "scale-right 0.3s ease-out reverse",
      },
    },
  },
  plugins: [],
};
