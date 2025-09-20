// RUTA: lib/schemas/components/news-grid.schema.ts
/**
 * @file news-grid.schema.ts
 * @description SSoT para el contrato de datos de un artículo en una cuadrícula.
 *              v3.0.0 (Data-Driven & Resilient): Se añade la propiedad `subtitle`
 *              para soportar el encabezado de página data-driven.
 * @version 3.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";
import { logger } from "@/lib/logging";

logger.trace("[Schema] Definiendo contrato para [NewsGrid] v3.0");

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

export const NewsGridContentSchema = z.object({
  title: z.string(),
  // --- [INICIO DE MEJORA ACUMULATIVA] ---
  subtitle: z.string(),
  // --- [FIN DE MEJORA ACUMULATIVA] ---
  articles: z.array(ArticleCardSchema),
});

export const NewsGridLocaleSchema = z.object({
  newsGrid: NewsGridContentSchema.optional(),
});
