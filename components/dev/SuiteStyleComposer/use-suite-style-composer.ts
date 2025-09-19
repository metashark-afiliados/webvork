// RUTA: components/dev/SuiteStyleComposer/use-suite-style-composer.ts
/**
 * @file use-suite-style-composer.ts
 * @description Hook "cerebro" para el Compositor de Estilos.
 *              v3.0.0 (Encapsulated Preview Engine): Refactorizado a un estándar
 *              de élite. Elimina la dependencia de `usePreviewStore` y gestiona
 *              su propio motor de previsualización inyectando y limpiando una
 *              etiqueta de estilo temporal, logrando una encapsulación completa.
 * @version 3.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { deepMerge } from "@/lib/utils/merge";
import {
  AssembledThemeSchema,
  type AssembledTheme,
} from "@/lib/schemas/theming/assembled-theme.schema";
import { generateCssVariablesFromTheme } from "@/lib/theming/theme-utils";
import { logger } from "@/lib/logging";
import type { SuiteThemeConfig, LoadedFragments } from "./types";

/**
 * @const PREVIEW_STYLE_TAG_ID
 * @description SSoT para el identificador único de la etiqueta de estilo de previsualización.
 */
const PREVIEW_STYLE_TAG_ID = "dcc-preview-theme-overrides";

/**
 * @interface UseSuiteStyleComposerProps
 * @description Contrato de props para el hook.
 */
interface UseSuiteStyleComposerProps {
  initialConfig: SuiteThemeConfig;
  allThemeFragments: LoadedFragments;
}

/**
 * @function useSuiteStyleComposer
 * @description Hook de élite que gestiona el estado local y la lógica de
 *              previsualización en tiempo real para el modal del compositor de estilos.
 */
export function useSuiteStyleComposer({
  initialConfig,
  allThemeFragments,
}: UseSuiteStyleComposerProps) {
  logger.trace(
    "[useSuiteStyleComposer] Inicializando hook v3.0 (Encapsulated)."
  );

  const [localSuiteConfig, setLocalSuiteConfig] =
    useState<SuiteThemeConfig>(initialConfig);
  const isMounted = useRef(false);

  // Efecto para gestionar el ciclo de vida del componente y asegurar la limpieza
  useEffect(() => {
    isMounted.current = true;
    // La función de limpieza se ejecuta cuando el componente se desmonta.
    return () => {
      isMounted.current = false;
      clearPreview();
    };
  }, []); // El array vacío asegura que esto solo se ejecute en montaje y desmontaje.

  /**
   * @function assembleAndApplyPreview
   * @description Ensambla un objeto de tema a partir de la configuración actual,
   *              lo valida y lo inyecta en el <head> del documento como una
   *              etiqueta <style> temporal para previsualización.
   */
  const assembleAndApplyPreview = useCallback(
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
      if (!validation.success) {
        logger.warn(
          "[useSuiteStyleComposer] El tema de previsualización ensamblado es inválido."
        );
        return;
      }

      const cssVars = generateCssVariablesFromTheme(validation.data);
      let styleTag = document.getElementById(
        PREVIEW_STYLE_TAG_ID
      ) as HTMLStyleElement;
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = PREVIEW_STYLE_TAG_ID;
        document.head.appendChild(styleTag);
      }
      styleTag.innerHTML = `:root { ${cssVars} }`;
    },
    [allThemeFragments]
  );

  /**
   * @function clearPreview
   * @description Elimina la etiqueta <style> de previsualización del DOM,
   *              revirtiendo los estilos a su estado persistido original.
   */
  const clearPreview = useCallback(() => {
    const styleTag = document.getElementById(PREVIEW_STYLE_TAG_ID);
    if (styleTag) {
      styleTag.remove();
      logger.trace(
        "[useSuiteStyleComposer] Estilos de previsualización limpiados."
      );
    }
  }, []);

  // Efecto que aplica la previsualización cada vez que la configuración local cambia.
  useEffect(() => {
    if (isMounted.current) {
      assembleAndApplyPreview(localSuiteConfig);
    }
  }, [localSuiteConfig, assembleAndApplyPreview]);

  /**
   * @function handleConfigUpdate
   * @description Actualiza el estado de la configuración local con nuevos valores parciales.
   */
  const handleConfigUpdate = (newPartialConfig: Partial<SuiteThemeConfig>) => {
    setLocalSuiteConfig((prev) => deepMerge(prev, newPartialConfig));
  };

  /**
   * @function handleGranularChange
   * @description Actualiza un valor granular específico dentro de la configuración local.
   */
  const handleGranularChange = (
    category: "granularColors" | "granularFonts" | "granularGeometry",
    cssVar: string,
    value: string
  ) => {
    setLocalSuiteConfig((prev) => {
      const newCategory = { ...(prev[category] || {}), [cssVar]: value };
      return { ...prev, [category]: newCategory };
    });
  };

  return {
    localSuiteConfig,
    handleConfigUpdate,
    handleGranularChange,
    clearPreview,
  };
}
