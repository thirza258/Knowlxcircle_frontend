// ESLint 10 reads flat config only - `.eslintrc.cjs` support was removed in v10,
// so the old rc file is deleted rather than kept alongside this one.
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
// eslint-plugin-react-refresh v0.5 no longer has a default export: it exports the
// namespace `reactRefresh`, whose `.plugin` property is the actual plugin object.
import { reactRefresh } from "eslint-plugin-react-refresh";

export default tseslint.config([
  // A config object with only `ignores` is the flat-config replacement for .eslintignore.
  // (node_modules is ignored by ESLint out of the box; listed here to be explicit.)
  { ignores: ["dist/**", "node_modules/**"] },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: globals.browser,
    },
    plugins: {
      // eslint-plugin-react-hooks v7 default-exports the plugin object itself.
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh.plugin,
    },
    rules: {
      // Deliberately NOT `reactHooks.configs.flat.recommended`: in v7 that preset also
      // turns on the React Compiler rule set (purity, immutability, refs,
      // set-state-in-effect, static-components, ...) at error level. These two rules
      // reproduce what `plugin:react-hooks/recommended` gave us on v4.
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
]);
