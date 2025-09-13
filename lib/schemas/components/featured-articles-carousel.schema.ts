// lib/schemas/components/featured-articles-carousel.schema.ts
/**
 * @file featured-articles-carousel.schema.ts
 * @description Esquema de Zod para el contenido i18n del nuevo componente
 *              FeaturedArticlesCarousel. Define el contrato de datos para la sección
 *              y para cada artículo destacado.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";

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
  readTime: z
    .number()
    .positive("El tiempo de lectura debe ser un número positivo."),
});

/**
 * @type FeaturedArticle
 * @description Infiere el tipo TypeScript para un objeto de artículo destacado.
 */
export type FeaturedArticle = z.infer<typeof FeaturedArticleSchema>;

/**
 * @const FeaturedArticlesCarouselLocaleSchema
 * @description Valida la estructura del contenido de la sección para un único locale.
 */
export const FeaturedArticlesCarouselLocaleSchema = z.object({
  featuredArticlesCarousel: z
    .object({
      eyebrow: z.string(),
      title: z.string(),
      articles: z
        .array(FeaturedArticleSchema)
        .min(
          3,
          "Se requieren al menos 3 artículos para un carrusel funcional."
        ),
    })
    .optional(),
});

/**
 * @const FeaturedArticlesCarouselI18nSchema
 * @description Valida la estructura completa del archivo .i18n.json.
 */
export const FeaturedArticlesCarouselI18nSchema = z.object({
  "it-IT": FeaturedArticlesCarouselLocaleSchema,
  "es-ES": FeaturedArticlesCarouselLocaleSchema,
  "en-US": FeaturedArticlesCarouselLocaleSchema,
  "pt-BR": FeaturedArticlesCarouselLocaleSchema,
});
// lib/schemas/components/featured-articles-carousel.schema.ts
