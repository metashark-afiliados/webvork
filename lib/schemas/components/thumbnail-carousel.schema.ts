// src/lib/schemas/components/thumbnail-carousel.schema.ts
import { z } from "zod";

/**
 * @file thumbnail-carousel.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente ThumbnailCarousel.
 * @version 2.0.0
 */

const ThumbnailSchema = z.object({
  src: z.string().startsWith("/"),
  alt: z.string(),
});

// Define la estructura para un único locale.
export const ThumbnailCarouselLocaleSchema = z.object({
  thumbnailCarousel: z
    .object({
      thumbnails: z.array(ThumbnailSchema),
      affiliateUrl: z.string().url(),
      playButtonAriaLabel: z.string(),
      playButtonTitle: z.string(),
    })
    .optional(),
});

// Define la estructura completa del archivo .i18n.json.
export const ThumbnailCarouselI18nSchema = z.object({
  "es-ES": ThumbnailCarouselLocaleSchema,
  "pt-BR": ThumbnailCarouselLocaleSchema,
  "en-US": ThumbnailCarouselLocaleSchema,
  "it-IT": ThumbnailCarouselLocaleSchema,
});
// src/lib/schemas/components/thumbnail-carousel.schema.ts
