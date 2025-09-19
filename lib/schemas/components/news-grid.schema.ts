// lib/schemas/components/news-grid.schema.ts
/**
 * @file news-grid.schema.ts
 * @description SSoT para el contrato de datos de un artículo en una cuadrícula.
 * @version 2.0.0 (Data-Driven & Resilient)
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";
import { logger } from "@/lib/logging";

logger.trace("[Schema] Definiendo contrato para [NewsGrid]");

/**
 * @const ArticleCardSchema
 * @description Valida la estructura de los datos necesarios para renderizar
 *              una tarjeta de artículo en una cuadrícula o carrusel.
 */
export const ArticleCardSchema = z.object({
  slug: z
    .string()
    .min(1, "El slug del artículo es obligatorio para la navegación."),
  category: z.string().min(1, "La categoría es requerida."),
  title: z.string().min(1, "El título es requerido."),
  summary: z.string().min(1, "El resumen es requerido."),
  imageUrl: z
    .string()
    .startsWith("/", "La ruta de la imagen debe ser absoluta."),
  imageAlt: z
    .string()
    .min(1, "El texto alternativo es requerido por accesibilidad."),
});

export type ArticleCardData = z.infer<typeof ArticleCardSchema>;

/**
 * @const NewsGridContentSchema
 * @description La SSoT para la ESTRUCTURA del contenido de la sección.
 */
export const NewsGridContentSchema = z.object({
  title: z.string(),
  articles: z.array(ArticleCardSchema),
});

/**
 * @const NewsGridLocaleSchema
 * @description Valida la clave de nivel superior para un locale específico.
 */
export const NewsGridLocaleSchema = z.object({
  newsGrid: NewsGridContentSchema.optional(),
});
// lib/schemas/components/news-grid.schema.ts
