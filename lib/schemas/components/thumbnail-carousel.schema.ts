// lib/schemas/components/thumbnail-carousel.schema.ts
/**
 * @file thumbnail-carousel.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente ThumbnailCarousel.
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";

/**
 * @const ThumbnailSchema
 * @description Valida la estructura de una única miniatura del carrusel.
 */
const ThumbnailSchema = z.object({
  src: z.string().startsWith("/"),
  alt: z.string(),
});

/**
 * @type Thumbnail
 * @description Infiere el tipo TypeScript para un objeto de miniatura.
 */
export type Thumbnail = z.infer<typeof ThumbnailSchema>;

/**
 * @const ThumbnailCarouselLocaleSchema
 * @description Valida la estructura del contenido de la sección para un único locale.
 */
export const ThumbnailCarouselLocaleSchema = z.object({
  thumbnailCarousel: z
    .object({
      thumbnails: z.array(ThumbnailSchema),
      affiliateUrl: z.string(), // Puede ser URL o ancla
      playButtonAriaLabel: z.string(),
      playButtonTitle: z.string(),
    })
    .optional(),
});

/**
 * @const ThumbnailCarouselI18nSchema
 * @description Valida la estructura completa del archivo .i18n.json.
 */
export const ThumbnailCarouselI18nSchema = z.object({
  "es-ES": ThumbnailCarouselLocaleSchema,
  "pt-BR": ThumbnailCarouselLocaleSchema,
  "en-US": ThumbnailCarouselLocaleSchema,
  "it-IT": ThumbnailCarouselLocaleSchema,
});
// lib/schemas/components/thumbnail-carousel.schema.ts
