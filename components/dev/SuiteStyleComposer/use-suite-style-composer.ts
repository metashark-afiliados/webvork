// app/[locale]/(dev)/dev/_components/SuiteStyleComposer/useSuiteStyleComposer.ts
/**
 * @file useSuiteStyleComposer.ts
 * @description Hook "cerebro" para el Compositor de Estilos.
 *              v2.4.0 (Type SSoT Export): Exporta el tipo 'LoadedFragments'
 *              para ser consumido por los componentes padres, estableciendo un
 *              contrato de datos único y robusto.
 * @version 2.4.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import { useState, useEffect, useCallback } from "react";
import { deepMerge } from "@/lib/utils/merge";
import {
  AssembledThemeSchema,
  type AssembledTheme,
} from "@/lib/schemas/theming/assembled-theme.schema";
import { usePreviewStore } from "@/app/[locale]/(dev)/dev/campaign-suite/_context/PreviewContext";
import type { ThemeConfig } from "@/app/[locale]/(dev)/dev/campaign-suite/_types/draft.types";
import { logger } from "@/lib/logging";

// --- [INICIO] SSoT DE TIPO EXPORTADA ---
export type LoadedFragments = {
  base: Partial<AssembledTheme>;
  colors: Record<string, Partial<AssembledTheme>>;
  fonts: Record<string, Partial<AssembledTheme>>;
  radii: Record<string, Partial<AssembledTheme>>;
};
// --- [FIN] SSoT DE TIPO EXPORTADA ---

export interface SuiteThemeConfig extends ThemeConfig {
  granularColors?: Record<string, string>;
  granularFonts?: Record<string, string>;
  granularGeometry?: Record<string, string>;
}

interface UseSuiteStyleComposerProps {
  initialConfig: SuiteThemeConfig;
  allThemeFragments: LoadedFragments;
}

export function useSuiteStyleComposer({
  initialConfig,
  allThemeFragments,
}: UseSuiteStyleComposerProps) {
  // ... (La lógica interna del hook no requiere cambios y se mantiene intacta)
  logger.trace("[useSuiteStyleComposer] Inicializando hook de lógica (v2.4).");

  const [localSuiteConfig, setLocalSuiteConfig] =
    useState<SuiteThemeConfig>(initialConfig);
  const { setPreviewTheme } = usePreviewStore();

  useEffect(() => {
    setLocalSuiteConfig(initialConfig);
  }, [initialConfig]);

  const assemblePreviewTheme = useCallback(
    (config: SuiteThemeConfig): AssembledTheme | null => {
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

      const validation = AssembledThemeSchema.safeParse(finalTheme);
      if (validation.success) {
        return validation.data;
      }
      logger.warn(
        "[useSuiteStyleComposer] El tema de previsualización ensamblado es inválido.",
        { errors: validation.error.flatten() }
      );
      return null;
    },
    [allThemeFragments]
  );

  const handleConfigUpdate = useCallback(
    (newPartialConfig: Partial<SuiteThemeConfig>) => {
      setLocalSuiteConfig((prev) => {
        const updatedConfig = deepMerge(prev, newPartialConfig);
        const previewTheme = assemblePreviewTheme(updatedConfig);
        if (previewTheme) {
          setPreviewTheme(previewTheme);
        }
        return updatedConfig;
      });
    },
    [assemblePreviewTheme, setPreviewTheme]
  );

  const handleGranularChange = useCallback(
    (
      category: "granularColors" | "granularFonts" | "granularGeometry",
      cssVar: string,
      value: string
    ) => {
      setLocalSuiteConfig((prev) => {
        const newCategory = { ...(prev[category] || {}), [cssVar]: value };
        const updatedConfig = { ...prev, [category]: newCategory };
        return updatedConfig;
      });
    },
    []
  );

  const clearPreview = useCallback(() => {
    setPreviewTheme(null);
  }, [setPreviewTheme]);

  useEffect(() => {
    const previewTheme = assemblePreviewTheme(localSuiteConfig);
    if (previewTheme) {
      setPreviewTheme(previewTheme);
    }
  }, [localSuiteConfig, assemblePreviewTheme, setPreviewTheme]);

  return {
    localSuiteConfig,
    handleConfigUpdate,
    handleGranularChange,
    clearPreview,
    assemblePreviewTheme,
  };
}
