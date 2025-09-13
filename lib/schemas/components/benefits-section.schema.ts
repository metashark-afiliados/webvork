// lib/schemas/components/benefits-section.schema.ts
/**
 * @file benefits-section.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente BenefitsSection.
 *              Corrige definitivamente el error TS2306 al asegurar que el archivo es un módulo.
 * @version 1.2.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";
import { LucideIconNameSchema } from "@/config/lucide-icon-names";

const BenefitItemSchema = z.object({
  icon: LucideIconNameSchema,
  title: z.string().min(1, "El título del beneficio no puede estar vacío."),
  description: z
    .string()
    .min(1, "La descripción del beneficio no puede estar vacía."),
});

export type BenefitItem = z.infer<typeof BenefitItemSchema>;

export const BenefitsSectionLocaleSchema = z.object({
  benefitsSection: z
    .object({
      eyebrow: z.string(),
      title: z.string(),
      subtitle: z.string(),
      benefits: z.array(BenefitItemSchema),
    })
    .optional(),
});

// --- INICIO DE CORRECCIÓN ---
// Se añade 'export' para que TypeScript trate este archivo como un módulo.
export const BenefitsSectionI18nSchema = z.object({
  // --- FIN DE CORRECCIÓN ---
  "it-IT": BenefitsSectionLocaleSchema,
  "es-ES": BenefitsSectionLocaleSchema,
  "en-US": BenefitsSectionLocaleSchema,
  "pt-BR": BenefitsSectionLocaleSchema,
});
// lib/schemas/components/benefits-section.schema.ts
