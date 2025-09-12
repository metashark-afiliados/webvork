// src/lib/schemas/components/benefits-section.schema.ts
import { z } from "zod";

/**
 * @file benefits-section.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente BenefitsSection.
 * @version 2.0.0
 */

// Define la estructura para un único locale.
export const BenefitsSectionLocaleSchema = z.object({
  benefitsSection: z
    .object({
      title: z.string(),
      subtitle: z.string(),
      benefits: z.array(z.string().min(1)),
    })
    .optional(),
});

// Define la estructura completa del archivo .i18n.json.
export const BenefitsSectionI18nSchema = z.object({
  "es-ES": BenefitsSectionLocaleSchema,
  "pt-BR": BenefitsSectionLocaleSchema,
  "en-US": BenefitsSectionLocaleSchema,
  "it-IT": BenefitsSectionLocaleSchema,
});
// src/lib/schemas/components/benefits-section.schema.ts
