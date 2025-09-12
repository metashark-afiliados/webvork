// src/lib/schemas/components/dev/dev-route-menu.schema.ts
/**
 * @file dev-route-menu.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente DevRouteMenu.
 *              Actualizado para incluir las nuevas claves de navegación del portal.
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";

export const DevRouteMenuLocaleSchema = z.object({
  devRouteMenu: z
    .object({
      devToolsGroup: z.string(),
      campaignPagesGroup: z.string(),
      portalPagesGroup: z.string(), // NUEVO
      legalPagesGroup: z.string(),
      componentCanvas: z.string(),
      campaignSimulator: z.string(),
      branding: z.string(),
      campaignPage: z.string(),
      home: z.string(), // NUEVO
      store: z.string(), // NUEVO
      news: z.string(), // NUEVO
      about: z.string(), // NUEVO
      terms: z.string(),
      privacy: z.string(),
      cookies: z.string(),
      changeLanguage: z.string(),
      currentLanguageIs: z.string(),
    })
    .optional(),
});

export const DevRouteMenuI18nSchema = z.object({
  "es-ES": DevRouteMenuLocaleSchema,
  "pt-BR": DevRouteMenuLocaleSchema,
  "en-US": DevRouteMenuLocaleSchema,
  "it-IT": DevRouteMenuLocaleSchema,
});
// src/lib/schemas/components/dev/dev-route-menu.schema.ts
