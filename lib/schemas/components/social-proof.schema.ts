// src/lib/schemas/components/social-proof.schema.ts
import { z } from "zod";

/**
 * @file social-proof.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente SocialProofLogos.
 * @version 2.0.0
 */

const LogoSchema = z.object({
  src: z.string().startsWith("/"),
  alt: z.string(),
});

// Define la estructura para un único locale.
export const SocialProofLocaleSchema = z.object({
  socialProof: z
    .object({ title: z.string(), logos: z.array(LogoSchema) })
    .optional(),
});

// Define la estructura completa del archivo .i18n.json.
export const SocialProofI18nSchema = z.object({
  "es-ES": SocialProofLocaleSchema,
  "pt-BR": SocialProofLocaleSchema,
  "en-US": SocialProofLocaleSchema,
  "it-IT": SocialProofLocaleSchema,
});
// src/lib/schemas/components/social-proof.schema.ts
