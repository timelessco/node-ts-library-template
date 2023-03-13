const { createConfig } = require("eslint-config-galex/dist/createConfig");
const { getDependencies } = require("eslint-config-galex/dist/getDependencies");
const {
  createTypeScriptOverride,
} = require("eslint-config-galex/dist/overrides/typescript");

const dependencies = getDependencies({
  cwd: __dirname,
});

const typescriptOverrideConfig = {
  rules: {
    /**
     * off exported functions are strongly typed
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md
     */
    "@typescript-eslint/explicit-module-boundary-types": "off",

    /**
     * enable type parameters without inference sites and type parameters that don't add type safety to declarations.
     *
     * @see https://github.com/cartant/eslint-plugin-etc/blob/main/docs/rules/no-misused-generics.md
     */
    "etc/no-misused-generics": "off",

    /**
     * adds support for TS features, e.g. types
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
     */
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
  },
  ...dependencies,
};

const typescriptOverride = createTypeScriptOverride(typescriptOverrideConfig);

module.exports = createConfig({
  overrides: [typescriptOverride],
  rules: {
    // eslint-core rules
    /**
     * prevents forgotten debug statements. either uncomment the line
     * or remove the statement
     *
     * @see https://eslint.org/docs/rules/no-console
     */
    "no-console": ["warn", { allow: ["warn", "error"] }],

    /**
     * off unsafe null comparison check
     *
     * @see https://eslint.org/docs/rules/no-eq-null
     */
    "no-eq-null": "off",

    /**
     * off unsafe comparison check
     *
     * @see https://eslint.org/docs/rules/eqeqeq
     */
    eqeqeq: "off",

    // import rules
    /**
     * off this rule for Prettier ordering
     * - groups imports
     * - alphabetically sorts them
     * - enforces new lines between groups
     *
     * @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
     */
    "import/order": "off",

    /**
     * any module should exclusively contain named exports
     * when unavoidable due to limitations, disable the warning for this line
     *
     * @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-default-export.md
     */
    "import/no-default-export": "off",
  },
});
