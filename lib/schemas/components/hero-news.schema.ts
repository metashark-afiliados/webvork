// src/lib/schemas/components/hero-news.schema.ts
import { z } from "zod";

/**
 * @file hero-news.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente HeroNews.
 * @version 1.0.0
 */
export const HeroNewsLocaleSchema = z.object({
  heroNews: z
    .object({
      mainTitle: z.string(),
      featuredArticle: z.object({
        tag: z.string(),
        title: z.string(),
        author: z.string(),
        readTime: z.number(),
      }),
    })
    .optional(),
});

export const HeroNewsI18nSchema = z.object({
  "es-ES": HeroNewsLocaleSchema,
  "en-US": HeroNewsLocaleSchema,
  "pt-BR": HeroNewsLocaleSchema,
  "it-IT": HeroNewsLocaleSchema,
});
// src/lib/schemas/components/hero-news.schema.ts
