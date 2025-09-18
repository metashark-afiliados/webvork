// lib/dev/preview-renderer.tsx
/**
 * @file preview-renderer.tsx
 * @description Orquestador que ahora consume el cargador de activos del Edge
 *              para ser 100% compatible con el runtime y resolver el error de build.
 * @version 8.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import * as React from "react";
import { previewRenderers } from "./preview-renderers";
import type { PreviewRenderResult } from "./preview-renderers/_types";
import { defaultLocale } from "@/lib/i18n.config";
import { loadEdgeJsonAsset } from "@/lib/i18n/i18n.edge";
import { deepMerge } from "@/lib/utils/merge";
import type { AssembledTheme } from "@/lib/schemas/theming/assembled-theme.schema";
import type { ColorsFragment } from "@/lib/schemas/theming/fragments/colors.schema";
import type { FontsFragment } from "@/lib/schemas/theming/fragments/fonts.schema";
import type { GeometryFragment } from "@/lib/schemas/theming/fragments/geometry.schema";

const getPreviewTheme = async (): Promise<AssembledTheme> => {
  const [base, colors, fonts, radii] = await Promise.all([
    loadEdgeJsonAsset<Partial<AssembledTheme>>(
      "theme-fragments",
      "base",
      "global.theme.json"
    ),
    loadEdgeJsonAsset<ColorsFragment>(
      "theme-fragments",
      "colors",
      "scientific.colors.json"
    ),
    loadEdgeJsonAsset<FontsFragment>(
      "theme-fragments",
      "fonts",
      "default-sans.fonts.json"
    ),
    loadEdgeJsonAsset<GeometryFragment>(
      "theme-fragments",
      "radii",
      "default.radii.json"
    ),
  ]);
  return deepMerge(deepMerge(deepMerge(base, colors), fonts), radii);
};

export async function renderPreviewComponent(
  componentName: string
): Promise<PreviewRenderResult | null> {
  const renderer = previewRenderers[componentName];
  const theme = await getPreviewTheme();

  if (renderer) {
    return renderer(defaultLocale, theme);
  }

  // Fallback si el renderizador no está registrado
  return {
    jsx: (
      
      <div tw="flex w-full h-full items-center justify-center bg-red-900/80 text-white border border-red-500/50 rounded-lg">
        <span>Vista previa no definida para: {componentName}</span>
      </div>
    ),
    width: 400,
    height: 200,
  };
}
// lib/dev/preview-renderer.tsx
