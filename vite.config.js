import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";

const path = require("path");

export default defineConfig({
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",

        assetFileNames: ({ name }) => {
          if (/\.(jpe?g|png|svg|gif)$/.test(name ?? "")) {
            return "assets/images/[name]-[hash][extname]";
          }

          if (/\.(css$)/.test(name ?? "")) {
            return "assets/css/[name]-[hash][extname]";
          }

          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
