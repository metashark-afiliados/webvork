// shared/lib/dev/live-previews.config.ts
/**
 * @file live-previews.config.ts
 * @description SSoT y registro de componentes para el renderizado en vivo en el EDVI.
 *              Mapea un string de identificación a un componente React real.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import type { ComponentType } from "react";
// Importamos los componentes reales que se van a previsualizar
import { StandardHeaderPreview } from "@/shared/lib/dev/preview-renderers/StandardHeader.preview";
import { MinimalHeaderPreview } from "@/shared/lib/dev/preview-renderers/MinimalHeader.preview";
import { StandardFooterPreview } from "@/shared/lib/dev/preview-renderers/StandardFooter.preview";

// Por ahora, usamos los componentes de previsualización de OG Image como placeholders.
// En una implementación futura, estos apuntarían a los componentes de campaña reales.
export const livePreviewComponentMap: Record<string, ComponentType<any>> = {
  StandardHeader: StandardHeaderPreview,
  MinimalHeader: MinimalHeaderPreview,
  StandardFooter: StandardFooterPreview,
};
// shared/lib/dev/live-previews.config.ts
