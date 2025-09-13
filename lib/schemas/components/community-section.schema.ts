// lib/schemas/components/community-section.schema.ts
/**
 * @file community-section.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente CommunitySection.
 *              Define el contrato de datos para la sección de comunidad.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";
import { LucideIconNameSchema } from "@/config/lucide-icon-names";

// Define la estructura que el componente espera recibir para un locale.
export const CommunitySectionLocaleSchema = z.object({
  communitySection: z
    .object({
      iconName: LucideIconNameSchema,
      titlePart1: z.string(),
      titlePart2: z.string(),
      description: z.string(),
      buttonLabel: z.string(),
      buttonHref: z.string().url(),
    })
    .optional(),
});

// Define la estructura completa del archivo .i18n.json para validación.
export const CommunitySectionI18nSchema = z.object({
  "it-IT": CommunitySectionLocaleSchema,
  "es-ES": CommunitySectionLocaleSchema,
  "en-US": CommunitySectionLocaleSchema,
  "pt-BR": CommunitySectionLocaleSchema,
});
// lib/schemas/components/community-section.schema.ts
