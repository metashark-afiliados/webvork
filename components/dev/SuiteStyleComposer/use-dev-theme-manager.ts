// RUTA: components/dev/SuiteStyleComposer/use-dev-theme-manager.ts
/**
 * @file use-dev-theme-manager.ts
 * @description Hook "cerebro" y soberano para la gestión del tema del DCC.
 *              v3.0.0 (Architectural Decoupling & Elite Leveling): Refactorizado a
 *              un estándar de élite. Se elimina la dependencia del store
 *              `usePreviewStore`. Este hook ahora es soberano y únicamente
 *              responsable de leer/escribir la configuración del tema del DCC
 *              en localStorage y aplicarla al DOM mediante variables CSS.
 * @version 3.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import { useState, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import { deepMerge } from "@/lib/utils/merge";
import {
  AssembledThemeSchema,
  type AssembledTheme,
} from "@/lib/schemas/theming/assembled-theme.schema";
import { logger } from "@/lib/logging";
import { generateCssVariablesFromTheme } from "@/lib/theming/theme-utils";
import type { SuiteThemeConfig, LoadedFragments } from "./types";

/**
 * @interface UseDevThemeManagerProps
 * @description Contrato de props para el hook.
 */
interface UseDevThemeManagerProps {
  allThemeFragments: LoadedFragments;
}

/**
 * @const defaultSuiteConfig
 * @description La SSoT para el estado inicial y de fallback de la configuración del tema del DCC.
 */
const defaultSuiteConfig: SuiteThemeConfig = {
  colorPreset: "default-dcc",
  fontPreset: "minimalist-sans",
  radiusPreset: "rounded",
  granularColors: {},
  granularFonts: {},
  granularGeometry: {},
};

/**
 * @function useDevThemeManager
 * @description Hook de élite que gestiona el ciclo de vida completo del tema del DCC.
 */
export function useDevThemeManager({
  allThemeFragments,
}: UseDevThemeManagerProps) {
  logger.info(
    "[useDevThemeManager] Inicializando hook de gestión de tema DCC (v3.0 - Decoupled)."
  );
  const { theme: systemTheme } = useTheme();

  const [currentSuiteConfig, setCurrentSuiteConfig] =
    useState<SuiteThemeConfig>(() => {
      // Hidratación segura del estado desde localStorage, solo en el cliente.
      if (typeof window === "undefined") {
        return defaultSuiteConfig;
      }
      try {
        const savedConfigString = localStorage.getItem(
          "dcc-suite-theme-config"
        );
        if (savedConfigString) {
          const savedConfig = JSON.parse(savedConfigString);
          // La fusión profunda garantiza que el estado sea resiliente a
          // configuraciones antiguas o incompletas en localStorage.
          return deepMerge(defaultSuiteConfig, savedConfig);
        }
      } catch (e) {
        logger.error(
          "Fallo al parsear la configuración de tema guardada. Usando valores por defecto.",
          { error: e }
        );
        localStorage.removeItem("dcc-suite-theme-config");
      }
      return defaultSuiteConfig;
    });

  /**
   * @function applyThemeToDocument
   * @description Función pura que ensambla el tema final y lo inyecta en el DOM.
   */
  const applyThemeToDocument = useCallback(
    (config: SuiteThemeConfig) => {
      const {
        colorPreset,
        fontPreset,
        radiusPreset,
        granularColors,
        granularFonts,
        granularGeometry,
      } = config;

      const baseFragment = allThemeFragments.base || {};
      const colorFragment = colorPreset
        ? (allThemeFragments.colors[colorPreset] ?? {})
        : {};
      const fontFragment = fontPreset
        ? (allThemeFragments.fonts[fontPreset] ?? {})
        : {};
      const radiusFragment = radiusPreset
        ? (allThemeFragments.radii[radiusPreset] ?? {})
        : {};

      let finalTheme: Partial<AssembledTheme> = deepMerge(
        deepMerge(baseFragment, colorFragment),
        deepMerge(fontFragment, radiusFragment)
      );

      // Aplica anulaciones granulares si existen
      if (granularColors)
        finalTheme.colors = deepMerge(finalTheme.colors || {}, granularColors);
      if (granularFonts)
        finalTheme.fonts = deepMerge(finalTheme.fonts || {}, granularFonts);
      if (granularGeometry)
        finalTheme.geometry = deepMerge(
          finalTheme.geometry || {},
          granularGeometry
        );

      // Aplica la paleta oscura si el tema del sistema es 'dark'
      if (systemTheme === "dark" && finalTheme.colors?.dark) {
        finalTheme.colors = deepMerge(
          finalTheme.colors,
          finalTheme.colors.dark
        );
      }

      const validation = AssembledThemeSchema.safeParse(finalTheme);
      if (!validation.success) {
        logger.error("El tema final del DCC ensamblado es inválido", {
          error: validation.error,
        });
        return;
      }

      const cssVars = generateCssVariablesFromTheme(validation.data);

      let styleTag = document.getElementById(
        "dcc-theme-overrides"
      ) as HTMLStyleElement;
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = "dcc-theme-overrides";
        document.head.appendChild(styleTag);
      }
      styleTag.innerHTML = `:root { ${cssVars} }`;
    },
    [allThemeFragments, systemTheme]
  );

  // Efecto para aplicar el tema al DOM cuando la configuración cambia.
  useEffect(() => {
    applyThemeToDocument(currentSuiteConfig);
  }, [currentSuiteConfig, applyThemeToDocument]);

  // Efecto para persistir la configuración en localStorage cuando cambia.
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "dcc-suite-theme-config",
        JSON.stringify(currentSuiteConfig)
      );
    }
  }, [currentSuiteConfig]);

  return {
    currentSuiteConfig,
    setCurrentSuiteConfig,
  };
}
