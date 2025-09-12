// src/lib/schemas/components/hero.schema.ts
import { z } from "zod";

/**
 * @file hero.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente Hero.
 * @version 2.0.0
 */

// Define la estructura para un único locale.
export const HeroLocaleSchema = z.object({
  hero: z.object({ title: z.string(), subtitle: z.string() }).optional(),
});

// Define la estructura completa del archivo .i18n.json.
export const HeroI18nSchema = z.object({
  "es-ES": HeroLocaleSchema,
  "pt-BR": HeroLocaleSchema,
  "en-US": HeroLocaleSchema,
  "it-IT": HeroLocaleSchema,
});
// src/lib/schemas/components/hero.schema.ts
