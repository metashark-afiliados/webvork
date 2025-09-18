// app/[locale]/(dev)/dev/campaign-suite/_hooks/usePreviewTheme.ts
/**
 * @file usePreviewTheme.ts
 * @description Hook atómico para ensamblar el tema de la vista previa, ahora con
 *              soporte para previsualizaciones temporales en hover.
 * @version 2.0.0 (Live Preview on Hover)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import { useState, useEffect, useMemo } from "react";
import { useCampaignDraft } from "./useCampaignDraft";
import { usePreviewStore } from "../_context/PreviewContext";
import { deepMerge } from "@/lib/utils/merge";
import { logger } from "@/lib/logging";
import type { AssembledTheme } from "@/lib/schemas/theming/assembled-theme.schema";
import { AssembledThemeSchema } from "@/lib/schemas/theming/assembled-theme.schema";

interface UsePreviewThemeReturn {
  theme: AssembledTheme | null;
  isLoading: boolean;
  error: string | null;
}

export function usePreviewTheme(): UsePreviewThemeReturn {
  const draftThemeConfig = useCampaignDraft((state) => state.draft.themeConfig);
  const previewThemeFromStore = usePreviewStore((state) => state.previewTheme);

  const [theme, setTheme] = useState<AssembledTheme | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // El tema a renderizar es el de la previsualización si existe, si no, el del borrador.
  const effectiveTheme = useMemo(() => {
    if (previewThemeFromStore) return previewThemeFromStore;
    return null; // Si no hay previsualización, dejaremos que el useEffect ensamble desde el borrador
  }, [previewThemeFromStore]);

  useEffect(() => {
    // Si ya tenemos un tema de previsualización efectivo, lo usamos directamente.
    if (effectiveTheme) {
      setTheme(effectiveTheme);
      setIsLoading(false);
      setError(null);
      return;
    }

    const assembleThemeFromDraft = async () => {
      const { colorPreset, fontPreset, radiusPreset } = draftThemeConfig;

      if (!colorPreset || !fontPreset || !radiusPreset) {
        setTheme(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const fetchFragment = (path: string) =>
          fetch(path).then((res) => res.json());

        const [base, colors, fonts, radii] = await Promise.all([
          fetchFragment("/theme-fragments/base/global.theme.json"),
          fetchFragment(`/theme-fragments/colors/${colorPreset}.colors.json`),
          fetchFragment(`/theme-fragments/fonts/${fontPreset}.fonts.json`),
          fetchFragment(`/theme-fragments/radii/${radiusPreset}.radii.json`),
        ]);

        const finalThemeObject = deepMerge(
          deepMerge(deepMerge(base, colors), fonts),
          radii
        );
        const validation = AssembledThemeSchema.safeParse(finalThemeObject);

        if (!validation.success)
          throw new Error(
            "El tema ensamblado desde el borrador falló la validación."
          );

        setTheme(validation.data);
      } catch (e) {
        const errorMessage =
          e instanceof Error ? e.message : "Error desconocido.";
        logger.error(
          "[usePreviewTheme] Fallo al ensamblar el tema desde el borrador.",
          { error: errorMessage }
        );
        setError(errorMessage);
        setTheme(null);
      } finally {
        setIsLoading(false);
      }
    };

    assembleThemeFromDraft();
  }, [draftThemeConfig, effectiveTheme]);

  return { theme, isLoading, error };
}
