// app/[locale]/(dev)/dev/campaign-suite/_hooks/use-preview-theme.ts
/**
 * @file use-preview-theme.ts
 * @description Hook atómico para ensamblar el tema de la vista previa.
 * @version 3.0.0 (FSD Architecture Alignment)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import { useState, useEffect, useMemo } from "react";
import { useCampaignDraft } from "./use-campaign-draft";
import { usePreviewStore } from "../_context/PreviewContext";
import { deepMerge } from "@/shared/lib/utils/merge";
import { logger } from "@/shared/lib/logging";
import type { AssembledTheme } from "@/shared/lib/schemas/theming/assembled-theme.schema";
import { AssembledThemeSchema } from "@/shared/lib/schemas/theming/assembled-theme.schema";
import type { CampaignDraftState } from "../_types/draft.types";

interface UsePreviewThemeReturn {
  theme: AssembledTheme | null;
  isLoading: boolean;
  error: string | null;
}

export function usePreviewTheme(): UsePreviewThemeReturn {
  const draftThemeConfig = useCampaignDraft(
    (state: CampaignDraftState) => state.draft.themeConfig
  );
  const previewThemeFromStore = usePreviewStore((state) => state.previewTheme);

  const [theme, setTheme] = useState<AssembledTheme | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const effectiveTheme = useMemo(() => {
    if (previewThemeFromStore) return previewThemeFromStore;
    return null;
  }, [previewThemeFromStore]);

  useEffect(() => {
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
// app/[locale]/(dev)/dev/campaign-suite/_hooks/use-preview-theme.ts
