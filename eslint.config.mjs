// eslint.config.mjs
/**
 * @file eslint.config.mjs
 * @description SSoT para la configuración de ESLint v9+ (Flat Config).
 * @version 2.1.0 (Elite & Synced with Hooks & A11y)
 * @author RaZ Podestá - MetaShark Tech
 */
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import prettierConfig from "eslint-config-prettier";
import reactHooksPlugin from "eslint-plugin-react-hooks"; // <-- AÑADIR
import jsxA11yPlugin from "eslint-plugin-jsx-a11y"; // <-- AÑADIR

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = tseslint.config(
  {
    ignores: [
      // ...sin cambios...
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  { // <-- NUEVO BLOQUE PARA jsx-a11y
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "jsx-a11y": jsxA11yPlugin,
    },
    rules: jsxA11yPlugin.configs.recommended.rules,
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
      "react-hooks": reactHooksPlugin, // <-- AÑADIR PLUGIN
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...reactHooksPlugin.configs.recommended.rules, // <-- AÑADIR REGLAS
    },
  },
  prettierConfig
);

export default config;
