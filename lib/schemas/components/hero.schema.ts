// lib/schemas/components/hero.schema.ts
/**
 * @file hero.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente Hero.
 *              - v3.0.0 (Architectural Fix): Desacopla el schema de contenido del schema
 *                de locale.
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";
import { logger } from "@/lib/logging";

logger.trace("[Schema] Definiendo contrato para [Hero]");

/**
 * @const HeroContentSchema
 * @description La SSoT para la ESTRUCTURA del contenido de la sección.
 */
export const HeroContentSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
});

/**
 * @const HeroLocaleSchema
 * @description Valida la clave de nivel superior para un locale específico.
 */
export const HeroLocaleSchema = z.object({
  hero: HeroContentSchema.optional(),
});

export const HeroI18nSchema = z.object({
  "es-ES": HeroLocaleSchema,
  "pt-BR": HeroLocaleSchema,
  "en-US": HeroLocaleSchema,
  "it-IT": HeroLocaleSchema,
});
// lib/schemas/components/hero.schema.ts
