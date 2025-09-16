// @ts-check

/**
 * @file eslint.config.mjs
 * @description SSoT para la configuración de ESLint v9+ (Flat Config).
 *              Este archivo reemplaza los obsoletos .eslintrc.json y .eslintignore.
 * @version 1.1.0
 * @author RaZ Podestá - MetaShark Tech
 */

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import prettierConfig from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
const config = [
  // 1. Configuración de ignorados (reemplaza a .eslintignore)
  {
    ignores: [
      ".next/",
      "node_modules/",
      "public/",
      "out/",
      ".docs-espejo/",
      ".vscode/",
      "pnpm-lock.yaml",
    ],
  },

  // 2. Configuración base para archivos JavaScript y TypeScript
  ...tseslint.config(
    // Reglas recomendadas por ESLint y TypeScript-ESLint
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
      // Aplicar a todos los archivos JS, JSX, TS, TSX
      files: ["**/*.{js,jsx,ts,tsx}"],
      // Configuración del parser de TypeScript
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
          project: true, // Usa el tsconfig.json para reglas que requieren información de tipos
        },
      },
      // Reglas específicas (puedes añadir o sobreescribir aquí)
      rules: {
        // Ejemplo: Desactivar una regla si es necesario
        // '@typescript-eslint/no-unused-vars': 'warn',
      },
    }
  ),

  // 3. Configuración específica para Next.js
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },

  // 4. Configuración de Prettier (DEBE SER LA ÚLTIMA)
  // Desactiva las reglas de estilo de ESLint que entran en conflicto con Prettier.
  prettierConfig,
];

export default config;
