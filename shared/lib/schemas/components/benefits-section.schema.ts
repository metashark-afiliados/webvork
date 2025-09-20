// RUTA: shared/lib/schemas/components/benefits-section.schema.ts
/**
 * @file benefits-section.schema.ts
 * @description SSoT para el contrato de datos y UI del componente BenefitsSection.
 * @version 4.0.0 (Type Export & Elite Leveling)
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";
import { LucideIconNameSchema } from "@/shared/config/lucide-icon-names";

const BenefitItemSchema = z.object({
  icon: LucideIconNameSchema.describe(
    "ui:label:Icono del Beneficio|ui:placeholder:Selecciona un icono"
  ),
  title: z
    .string()
    .min(1)
    .describe("ui:label:Título del Beneficio|ui:placeholder:Confort Articular"),
  description: z
    .string()
    .min(1)
    .describe(
      "ui:label:Descripción|ui:control:textarea|ui:placeholder:Soporte natural para..."
    ),
});

export type BenefitItem = z.infer<typeof BenefitItemSchema>;

export const BenefitsSectionContentSchema = z.object({
  eyebrow: z.string().describe("ui:label:Texto Introductorio (Eyebrow)"),
  title: z.string().describe("ui:label:Título Principal de la Sección"),
  subtitle: z.string().describe("ui:label:Subtítulo de la Sección"),
  benefits: z
    .array(BenefitItemSchema)
    .describe("ui:label:Lista de Beneficios|ui:control:array"),
});

export const BenefitsSectionLocaleSchema = z.object({
  benefitsSection: BenefitsSectionContentSchema.optional(),
});
