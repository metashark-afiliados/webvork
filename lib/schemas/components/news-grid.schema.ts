// src/lib/schemas/components/news-grid.schema.ts
import { z } from "zod";

/**
 * @file news-grid.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente NewsGrid.
 * @version 1.0.0
 */

const ArticleSchema = z.object({
  category: z.string(),
  title: z.string(),
  summary: z.string(),
  imageUrl: z.string().startsWith("/"),
  href: z.string(),
});

export const NewsGridLocaleSchema = z.object({
  newsGrid: z
    .object({
      title: z.string(),
      articles: z.array(ArticleSchema),
    })
    .optional(),
});

export const NewsGridI18nSchema = z.object({
  "es-ES": NewsGridLocaleSchema,
  "en-US": NewsGridLocaleSchema,
  "pt-BR": NewsGridLocaleSchema,
  "it-IT": NewsGridLocaleSchema,
});
// src/lib/schemas/components/news-grid.schema.ts