// lib/schemas/components/news-grid.schema.ts
/**
 * @file news-grid.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente NewsGrid.
 *              - v3.0.0 (Architectural Fix): Desacopla el schema de contenido del schema
 *                de locale.
 * @version 3.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";
import { logger } from "@/lib/logging";

logger.trace("[Schema] Definiendo contrato para [NewsGrid]");

/**
 * @const ArticleSchema
 * @description Valida la estructura de un único artículo para la cuadrícula de noticias.
 */
const ArticleSchema = z.object({
  category: z.string().min(1, "La categoría es requerida."),
  title: z.string().min(1, "El título es requerido."),
  summary: z.string().min(1, "El resumen es requerido."),
  imageUrl: z
    .string()
    .startsWith("/", "La ruta de la imagen debe ser absoluta desde /public."),
  slug: z.string().min(1, "El slug del artículo es obligatorio."),
});

export type Article = z.infer<typeof ArticleSchema>;

/**
 * @const NewsGridContentSchema
 * @description La SSoT para la ESTRUCTURA del contenido de la sección.
 */
export const NewsGridContentSchema = z.object({
  title: z.string(),
  articles: z.array(ArticleSchema),
});

/**
 * @const NewsGridLocaleSchema
 * @description Valida la clave de nivel superior para un locale específico.
 */
export const NewsGridLocaleSchema = z.object({
  newsGrid: NewsGridContentSchema.optional(),
});

export const NewsGridI18nSchema = z.object({
  "es-ES": NewsGridLocaleSchema,
  "en-US": NewsGridLocaleSchema,
  "pt-BR": NewsGridLocaleSchema,
  "it-IT": NewsGridLocaleSchema,
});
// lib/schemas/components/news-grid.schema.ts
