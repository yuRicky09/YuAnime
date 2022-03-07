module.exports = {
  env: {
    node: true,
    "vue/setup-compiler-macros": true,
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
  rules: {
    "vue/no-unused-vars": "error",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
  overrides: [
    {
      files: ["src/views/**/*.vue"],
      rules: {
        "vue/multi-word-component-names": 0,
      },
    },
  ],
};
