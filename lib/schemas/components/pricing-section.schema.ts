// lib/schemas/components/pricing-section.schema.ts
/**
 * @file pricing-section.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente PricingSection.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";

const PricingPlanSchema = z.object({
  title: z.string(),
  isPopular: z.boolean(),
  price: z.number(),
  priceSuffix: z.string(),
  description: z.string(),
  buttonText: z.string(),
  benefitList: z.array(z.string()),
});

export type PricingPlan = z.infer<typeof PricingPlanSchema>;

export const PricingSectionLocaleSchema = z.object({
  pricingSection: z
    .object({
      eyebrow: z.string(),
      title: z.string(),
      subtitle: z.string(),
      currency: z.string().length(3),
      plans: z.array(PricingPlanSchema),
    })
    .optional(),
});

export const PricingSectionI18nSchema = z.object({
  "it-IT": PricingSectionLocaleSchema,
  "es-ES": PricingSectionLocaleSchema,
  "en-US": PricingSectionLocaleSchema,
  "pt-BR": PricingSectionLocaleSchema,
});
// lib/schemas/components/pricing-section.schema.ts
