// components/dev/SuiteStyleComposer/useDevThemeManager.ts
/**
 * @file useDevThemeManager.ts
 * @description Hook "cerebro" para la gestión del tema del DCC.
 *              v2.2.0 (Resilient Hydration): Implementa una hidratación de estado
 *              segura desde localStorage, fusionando los datos guardados con los
 *              valores por defecto para prevenir errores de tipo con configuraciones
 *              obsoletas.
 * @version 2.2.0
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
import { usePreviewStore } from "@/app/[locale]/(dev)/dev/campaign-suite/_context/PreviewContext";
import { logger } from "@/lib/logging";
import { generateCssVariablesFromTheme } from "@/lib/theming/theme.utils";
import type { SuiteThemeConfig, LoadedFragments } from "./types";

interface UseDevThemeManagerProps {
  allThemeFragments: LoadedFragments;
}

const defaultSuiteConfig: SuiteThemeConfig = {
  colorPreset: "default-dcc",
  fontPreset: "minimalist-sans",
  radiusPreset: "rounded",
  granularColors: {},
  granularFonts: {},
  granularGeometry: {},
};

export function useDevThemeManager({
  allThemeFragments,
}: UseDevThemeManagerProps) {
  logger.info(
    "[useDevThemeManager] Inicializando hook de gestión de tema DCC (v2.2)."
  );
  const { theme: systemTheme } = useTheme();
  const { setPreviewTheme } = usePreviewStore();

  const [currentSuiteConfig, setCurrentSuiteConfig] =
    useState<SuiteThemeConfig>(() => {
      // --- [INICIO DE LÓGICA DE HIDRATACIÓN RESILIENTE] ---
      if (typeof window === "undefined") {
        return defaultSuiteConfig;
      }
      try {
        const savedConfigString = localStorage.getItem(
          "dcc-suite-theme-config"
        );
        if (savedConfigString) {
          const savedConfig = JSON.parse(savedConfigString);
          // Fusionamos lo guardado con los valores por defecto.
          // Esto asegura que todas las claves requeridas existan.
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
      // --- [FIN DE LÓGICA DE HIDRATACIÓN RESILIENTE] ---
    });

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

      const finalTheme: Partial<AssembledTheme> = deepMerge(
        deepMerge(baseFragment, colorFragment),
        deepMerge(fontFragment, radiusFragment)
      );

      if (granularColors)
        finalTheme.colors = deepMerge(finalTheme.colors || {}, granularColors);
      if (granularFonts)
        finalTheme.fonts = deepMerge(finalTheme.fonts || {}, granularFonts);
      if (granularGeometry)
        finalTheme.geometry = deepMerge(
          finalTheme.geometry || {},
          granularGeometry
        );

      if (systemTheme === "dark" && finalTheme.colors?.dark) {
        finalTheme.colors = deepMerge(
          finalTheme.colors,
          finalTheme.colors.dark
        );
      }

      const validation = AssembledThemeSchema.safeParse(finalTheme);
      if (!validation.success) {
        logger.error("Tema final ensamblado inválido", {
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

      setPreviewTheme(validation.data);
    },
    [allThemeFragments, systemTheme, setPreviewTheme]
  );

  useEffect(() => {
    applyThemeToDocument(currentSuiteConfig);
  }, [currentSuiteConfig, applyThemeToDocument]);

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
    applyThemeToDocument,
  };
}
// components/dev/SuiteStyleComposer/useDevThemeManager.ts
