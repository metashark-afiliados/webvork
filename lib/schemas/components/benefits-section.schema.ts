// lib/schemas/components/benefits-section.schema.ts
/**
 * @file benefits-section.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente BenefitsSection.
 *              - v2.0.0 (Architectural Fix): Desacopla el schema de contenido del schema
 *                de locale. Exporta `BenefitsSectionContentSchema` como la SSoT para
 *                el contenido puro, resolviendo el error de tipo TS2740 en los consumidores.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";
import { LucideIconNameSchema } from "@/config/lucide-icon-names";

/**
 * @const BenefitItemSchema
 * @description Valida un único item de beneficio.
 */
const BenefitItemSchema = z.object({
  icon: LucideIconNameSchema,
  title: z.string().min(1, "El título del beneficio no puede estar vacío."),
  description: z
    .string()
    .min(1, "La descripción del beneficio no puede estar vacía."),
});

export type BenefitItem = z.infer<typeof BenefitItemSchema>;

// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
/**
 * @const BenefitsSectionContentSchema
 * @description La SSoT para la ESTRUCTURA del contenido de la sección. Es un
 *              ZodObject puro y no opcional, destinado a ser consumido por
 *              el SectionRenderer a través de sections.config.ts.
 */
export const BenefitsSectionContentSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  subtitle: z.string(),
  benefits: z.array(BenefitItemSchema),
});

/**
 * @const BenefitsSectionLocaleSchema
 * @description Valida la clave de nivel superior para un locale específico.
 *              Envuelve el schema de contenido y lo hace opcional para permitir
 *              la fusión de diccionarios.
 */
export const BenefitsSectionLocaleSchema = z.object({
  benefitsSection: BenefitsSectionContentSchema.optional(),
});
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---

/**
 * @const BenefitsSectionI18nSchema
 * @description Valida la estructura completa del archivo .i18n.json.
 */
export const BenefitsSectionI18nSchema = z.object({
  "it-IT": BenefitsSectionLocaleSchema,
  "es-ES": BenefitsSectionLocaleSchema,
  "en-US": BenefitsSectionLocaleSchema,
  "pt-BR": BenefitsSectionLocaleSchema,
});
// lib/schemas/components/benefits-section.schema.ts
