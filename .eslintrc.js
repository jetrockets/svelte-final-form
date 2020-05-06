module.exports = {
  env: {
    es6: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
  },
  plugins: ["svelte3"],
  extends: ["eslint:recommended"],
  overrides: [
    {
      files: "**/*.svelte",
      processor: "svelte3/svelte3",
    },
  ],
  globals: {
    module: true,
    process: true,
    LuxLockSettings: true,
  },
  rules: {
    "prettier/prettier": 0,
    "svelte3/lint-template": 0,
    "no-shadow": ["error"],
  },
  settings: {},
};
