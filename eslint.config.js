import js from "@eslint/js";
import globals from "globals";
import htmlPlugin from "eslint-plugin-html";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,html}"],
    plugins: {
      js,
      html: htmlPlugin,
    },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      ...js.configs.recommended.rules,
      semi: ["error", "always"],
      "no-undef": "off",
      "no-unused-vars": "off",
    },
  },
]);
