// src/lib/schemas/components/scrolling-banner.schema.ts
import { z } from "zod";

/**
 * @file scrolling-banner.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente ScrollingBanner.
 * @version 2.0.0
 */

// Define la estructura para un único locale.
export const ScrollingBannerLocaleSchema = z.object({
  scrollingBanner: z.object({
    message: z.string(),
  }),
});

// Define la estructura completa del archivo .i18n.json.
export const ScrollingBannerI18nSchema = z.object({
  "es-ES": ScrollingBannerLocaleSchema,
  "pt-BR": ScrollingBannerLocaleSchema,
  "en-US": ScrollingBannerLocaleSchema,
  "it-IT": ScrollingBannerLocaleSchema,
});
// src/lib/schemas/components/scrolling-banner.schema.ts
