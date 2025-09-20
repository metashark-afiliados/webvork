// lib/schemas/components/featured-articles-carousel.schema.ts
/**
 * @file featured-articles-carousel.schema.ts
 * @description Esquema de Zod para el contenido i18n del FeaturedArticlesCarousel.
 *              - v2.0.0 (Architectural Fix): Desacopla el schema de contenido del schema
 *                de locale para resolver errores de tipo en los consumidores.
 * @version 2.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";
import { logger } from "@/shared/lib/logging";

logger.trace("[Schema] Definiendo contrato para [FeaturedArticlesCarousel]");

/**
 * @const FeaturedArticleSchema
 * @description Valida la estructura de un único artículo destacado en el carrusel.
 */
const FeaturedArticleSchema = z.object({
  slug: z.string().min(1, "El slug del artículo es requerido para el enlace."),
  title: z.string().min(1, "El título del artículo es requerido."),
  category: z.string().min(1, "La categoría del artículo es requerida."),
  imageUrl: z
    .string()
    .startsWith("/", "La ruta de la imagen debe ser absoluta desde /public."),
  imageAlt: z
    .string()
    .min(1, "El texto alternativo de la imagen es requerido."),
  author: z.string(),
  readTime: z
    .number()
    .positive("El tiempo de lectura debe ser un número positivo."),
});

export type FeaturedArticle = z.infer<typeof FeaturedArticleSchema>;

/**
 * @const FeaturedArticlesCarouselContentSchema
 * @description La SSoT para la ESTRUCTURA del contenido de la sección.
 */
export const FeaturedArticlesCarouselContentSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  articles: z
    .array(FeaturedArticleSchema)
    .min(3, "Se requieren al menos 3 artículos para un carrusel funcional."),
});

/**
 * @const FeaturedArticlesCarouselLocaleSchema
 * @description Valida la clave de nivel superior para un locale específico.
 */
export const FeaturedArticlesCarouselLocaleSchema = z.object({
  featuredArticlesCarousel: FeaturedArticlesCarouselContentSchema.optional(),
});

export const FeaturedArticlesCarouselI18nSchema = z.object({
  "it-IT": FeaturedArticlesCarouselLocaleSchema,
  "es-ES": FeaturedArticlesCarouselLocaleSchema,
  "en-US": FeaturedArticlesCarouselLocaleSchema,
  "pt-BR": FeaturedArticlesCarouselLocaleSchema,
});
// lib/schemas/components/featured-articles-carousel.schema.ts
