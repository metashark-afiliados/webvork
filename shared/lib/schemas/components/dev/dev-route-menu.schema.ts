// shared/lib/schemas/components/dev/dev-route-menu.schema.ts
/**
 * @file dev-route-menu.schema.ts
 * @description SSoT para el contrato i18n del DevRouteMenu.
 *              v7.0.0 (Anti-fragile & Dynamic): Refactorizado para soportar un
 *              número dinámico de claves de ruta, alineándose con el generador
 *              de menú auto-sanable.
 * @version 7.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";
import { logger } from "@/shared/lib/logging";

logger.trace("[Schema] Definiendo contrato para [DevRouteMenu] v7.0");

export const DevRouteMenuContentSchema = z
  .object({
    devMenuLabel: z.string(),
    devToolsGroup: z.string(),
    campaignPagesGroup: z.string(),
    portalPagesGroup: z.string(),
    legalPagesGroup: z.string(),
  })
  // .passthrough() permite que el objeto contenga claves adicionales (nuestras
  // claves de ruta dinámicas) sin fallar la validación.
  .passthrough();

export const DevRouteMenuLocaleSchema = z.object({
  devRouteMenu: DevRouteMenuContentSchema.optional(),
});
// shared/lib/schemas/components/dev/dev-route-menu.schema.ts
