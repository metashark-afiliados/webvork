// lib/schemas/components/community-section.schema.ts
/**
 * @file community-section.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente CommunitySection.
 *              - v2.0.0: Refactorizado para usar una única propiedad 'title' que
 *                acepta HTML, dando más flexibilidad al contenido.
 * @version 2.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";
import { LucideIconNameSchema } from "@/config/lucide-icon-names";

/**
 * @const CommunitySectionLocaleSchema
 * @description Valida la estructura del contenido de la sección de comunidad para un único locale.
 */
export const CommunitySectionLocaleSchema = z.object({
  communitySection: z
    .object({
      iconName: LucideIconNameSchema,
      // Se reemplazan titlePart1 y titlePart2 por una única clave 'title'.
      // Esta clave contendrá el título completo, permitiendo HTML para el estilo.
      title: z.string().min(1, "El título no puede estar vacío."),
      description: z.string(),
      buttonLabel: z.string(),
      buttonHref: z
        .string()
        .url("El enlace del botón debe ser una URL válida."),
    })
    .optional(),
});

/**
 * @const CommunitySectionI18nSchema
 * @description Valida la estructura completa del archivo `community-section.i18n.json`,
 *              asegurando que todos los locales soportados estén definidos correctamente.
 */
export const CommunitySectionI18nSchema = z.object({
  "it-IT": CommunitySectionLocaleSchema,
  "es-ES": CommunitySectionLocaleSchema,
  "en-US": CommunitySectionLocaleSchema,
  "pt-BR": CommunitySectionLocaleSchema,
});
// lib/schemas/components/community-section.schema.ts
