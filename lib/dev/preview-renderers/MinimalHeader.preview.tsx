// lib/dev/preview-renderers/MinimalHeader.preview.tsx
/**
 * @file MinimalHeader.preview.tsx
 * @description Renderizador de previsualización atómico, internacionalizado y tematizado.
 *              v2.1.0: Alineado con el contrato de tipos `PreviewRenderer` corregido.
 * @version 2.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
import * as React from "react";
import type { PreviewRenderResult, PreviewRenderer } from "./_types";
import { logger } from "@/lib/logging";
import type { Locale } from "@/lib/i18n.config";

export const MinimalHeaderPreview: PreviewRenderer = async (
  locale: Locale
): Promise<PreviewRenderResult | null> => {
  logger.trace(`[MinimalHeader.preview] Renderizando para locale: ${locale}`);
  return {
    jsx: (
      <div tw="flex w-full h-full items-center justify-start p-4 bg-background text-foreground border border-border rounded-lg">
        <span tw="font-bold text-lg text-primary">GlobalFitwell</span>
      </div>
    ),
    width: 1200,
    height: 84,
  };
};
// lib/dev/preview-renderers/MinimalHeader.preview.tsx
