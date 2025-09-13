// lib/schemas/components/news-grid.schema.ts
/**
 * @file news-grid.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente NewsGrid.
 *              - v2.0.0: Desacopla las rutas del contenido reemplazando `href` por `slug`,
 *                alineando el contrato de datos con la estrategia de rutas centralizada.
 *                Exporta el tipo atómico `Article` para reutilización segura.
 * @version 2.0.0
 * @author Gemini AI - Asistente de IA de Google
 */
import { z } from "zod";

/**
 * @const ArticleSchema
 * @description Valida la estructura de un único artículo para la cuadrícula de noticias.
 *              Exige un `slug` para la construcción dinámica de rutas.
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

/**
 * @type Article
 * @description Infiere y exporta el tipo TypeScript para un objeto de artículo.
 */
export type Article = z.infer<typeof ArticleSchema>;

/**
 * @const NewsGridLocaleSchema
 * @description Valida la estructura del contenido de la sección para un único locale.
 */
export const NewsGridLocaleSchema = z.object({
  newsGrid: z
    .object({
      title: z.string(),
      articles: z.array(ArticleSchema),
    })
    .optional(),
});

/**
 * @const NewsGridI18nSchema
 * @description Valida la estructura completa del archivo `news-grid.i18n.json`.
 */
export const NewsGridI18nSchema = z.object({
  "es-ES": NewsGridLocaleSchema,
  "en-US": NewsGridLocaleSchema,
  "pt-BR": NewsGridLocaleSchema,
  "it-IT": NewsGridLocaleSchema,
});
// lib/schemas/components/news-grid.schema.ts
