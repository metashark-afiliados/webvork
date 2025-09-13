// lib/schemas/components/features-section.schema.ts
/**
 * @file features-section.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente FeaturesSection.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";
import { LucideIconNameSchema } from "@/config/lucide-icon-names";

const FeatureItemSchema = z.object({
  icon: LucideIconNameSchema,
  title: z.string().min(1),
  description: z.string().min(1),
});

export const FeaturesSectionLocaleSchema = z.object({
  featuresSection: z
    .object({
      eyebrow: z.string(),
      title: z.string(),
      subtitle: z.string(),
      features: z.array(FeatureItemSchema),
    })
    .optional(),
});

export const FeaturesSectionI18nSchema = z.object({
  "it-IT": FeaturesSectionLocaleSchema,
  "es-ES": FeaturesSectionLocaleSchema,
  "en-US": FeaturesSectionLocaleSchema,
  "pt-BR": FeaturesSectionLocaleSchema,
});
// lib/schemas/components/features-section.schema.ts
