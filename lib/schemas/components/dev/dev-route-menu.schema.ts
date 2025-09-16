// lib/schemas/components/dev/dev-route-menu.schema.ts
/**
 * @file dev-route-menu.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente DevRouteMenu.
 *              - v5.0.0 (Holistic Contract Fix): Se expande el schema para incluir
 *                TODAS las claves de texto requeridas por el generador de rutas y
 *                los componentes de UI, resolviendo la cascada de errores de tipo TS2339.
 * @version 5.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";
import { logger } from "@/lib/logging";

logger.trace("[Schema] Definiendo contrato completo para [DevRouteMenu] v5.0");

export const DevRouteMenuLocaleSchema = z.object({
  devRouteMenu: z
    .object({
      // --- [INICIO] REFACTORIZACIÓN DEL CONTRATO ---
      devMenuLabel: z.string(),
      devToolsGroup: z.string(),
      campaignPagesGroup: z.string(),
      portalPagesGroup: z.string(),
      legalPagesGroup: z.string(),
      campaignDesignSuite: z.string(),
      testPage: z.string(),
      branding: z.string(),
      campaignSimulator: z.string(),
      componentCanvas: z.string(),
      campaignPage: z.string(),
      home: z.string(),
      store: z.string(),
      news: z.string(),
      about: z.string(),
      terms: z.string(),
      privacy: z.string(),
      cookies: z.string(),
      changeLanguage: z.string(),
      currentLanguageIs: z.string(),
      // --- [FIN] REFACTORIZACIÓN DEL CONTRATO ---
    })
    .optional(),
});

export const DevRouteMenuI18nSchema = z.object({
  "es-ES": DevRouteMenuLocaleSchema,
  "pt-BR": DevRouteMenuLocaleSchema,
  "en-US": DevRouteMenuLocaleSchema,
  "it-IT": DevRouteMenuLocaleSchema,
});
// lib/schemas/components/dev/dev-route-menu.schema.ts
