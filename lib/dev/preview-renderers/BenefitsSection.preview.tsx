// lib/dev/preview-renderers/BenefitsSection.preview.tsx
/**
 * @file BenefitsSection.preview.tsx
 * @description Renderizador de previsualización atómico, internacionalizado y tematizado.
 *              v2.1.0: Alineado con el contrato de tipos `PreviewRenderer` corregido.
 * @version 2.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
import * as React from "react";
import type { PreviewRenderResult, PreviewRenderer } from "./_types";
import { getEdgeDictionary } from "@/lib/i18n/i18n.edge";
import { logger } from "@/lib/logging";

export const BenefitsSectionPreview: PreviewRenderer = async (
  locale
): Promise<PreviewRenderResult | null> => {
  logger.trace(
    `[BenefitsSection.preview] Renderizando para locale: ${locale}`
  );
  const { dictionary } = await getEdgeDictionary(locale);
  const content = dictionary.benefitsSection;

  if (!content) return null;

  return {
    jsx: (
      <div tw="flex w-full h-full items-center p-8 bg-background text-foreground border border-border rounded-lg">
        <div tw="flex flex-col w-1/2 pr-8">
          <span tw="text-sm text-primary font-bold tracking-wider">
            {content.eyebrow}
          </span>
          <span tw="text-4xl font-bold mt-2">{content.title}</span>
          <span tw="text-lg text-muted-foreground mt-4">
            {content.subtitle}
          </span>
        </div>
        <div tw="grid grid-cols-2 gap-4 w-1/2">
          {content.benefits.map((benefit) => (
            <div
              key={benefit.title}
              tw="flex flex-col p-4 bg-muted/50 rounded-md border border-border"
            >
              <div tw="w-8 h-8 rounded-full bg-primary mb-3" />
              <span tw="font-semibold text-sm">{benefit.title}</span>
              <span tw="text-xs text-muted-foreground mt-1">
                {benefit.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    width: 1200,
    height: 675,
  };
};
// lib/dev/preview-renderers/BenefitsSection.preview.tsx
