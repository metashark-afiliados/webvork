// lib/dev/preview-renderers/index.ts
/**
 * @file index.ts
 * @description SSoT y Registro de todos los renderizadores de previsualización atómicos.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import type { PreviewRenderer } from "./_types";
import { StandardHeaderPreview } from "./StandardHeader.preview";
import { MinimalHeaderPreview } from "./MinimalHeader.preview";
import { StandardFooterPreview } from "./StandardFooter.preview";
import { BenefitsSectionPreview } from "./BenefitsSection.preview";

export const previewRenderers: Record<string, PreviewRenderer> = {
  StandardHeader: StandardHeaderPreview,
  MinimalHeader: MinimalHeaderPreview,
  StandardFooter: StandardFooterPreview,
  BenefitsSection: BenefitsSectionPreview,
};
// lib/dev/preview-renderers/index.ts
