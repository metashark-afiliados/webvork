// lib/schemas/components/benefits-section.schema.ts
/**
 * @file benefits-section.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente BenefitsSection.
 *              Define el contrato de datos que la sección de beneficios debe recibir.
 *              - v1.2.0: Resuelve el error TS2306 al asegurar que el archivo es un módulo ES.
 * @version 1.2.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";
import { LucideIconNameSchema } from "@/config/lucide-icon-names";

/**
 * @const BenefitItemSchema
 * @description Valida un único item de beneficio, asegurando que tenga un icono, título y descripción.
 */
const BenefitItemSchema = z.object({
  icon: LucideIconNameSchema,
  title: z.string().min(1, "El título del beneficio no puede estar vacío."),
  description: z
    .string()
    .min(1, "La descripción del beneficio no puede estar vacía."),
});

/**
 * @type BenefitItem
 * @description Infiere el tipo TypeScript para un único beneficio desde el schema de Zod.
 */
export type BenefitItem = z.infer<typeof BenefitItemSchema>;

/**
 * @const BenefitsSectionLocaleSchema
 * @description Valida la estructura del contenido de la sección de beneficios para un único locale.
 *              La clave principal `benefitsSection` es opcional para permitir la fusión parcial de diccionarios.
 */
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

/**
 * @const BenefitsSectionI18nSchema
 * @description Valida la estructura completa del archivo de internacionalización `benefits-section.i18n.json`,
 *              asegurando que todos los locales soportados estén definidos correctamente.
 */
export const BenefitsSectionI18nSchema = z.object({
  "it-IT": BenefitsSectionLocaleSchema,
  "es-ES": BenefitsSectionLocaleSchema,
  "en-US": BenefitsSectionLocaleSchema,
  "pt-BR": BenefitsSectionLocaleSchema,
});
// lib/schemas/components/benefits-section.schema.ts
