module.exports = {
  env: {
    es2021: true,
    node: true,
  },

  extends: ["xo", "prettier"],
  overrides: [
    {
      extends: ["xo-typescript", "prettier"],
      files: ["*.ts", "*.tsx"],
      rules: {
        "no-implicit-coercion": "off",
        "@typescript-eslint/consistent-type-assertions": "off",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
};
