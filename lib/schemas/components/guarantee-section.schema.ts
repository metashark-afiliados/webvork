// lib/schemas/components/guarantee-section.schema.ts
/**
 * @file guarantee-section.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente GuaranteeSection.
 *              Ahora exporta el tipo `Seal` para una seguridad de tipos robusta.
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";

// Contrato para un único sello de garantía/calidad
const SealSchema = z.object({
  imageUrl: z.string().startsWith("/"),
  imageAlt: z.string(),
});

/**
 * @type Seal
 * @description El tipo inferido para un único objeto de sello de garantía.
 *              Esta es la SSoT para el tipado de sellos.
 */
export type Seal = z.infer<typeof SealSchema>;

export const GuaranteeSectionLocaleSchema = z.object({
  guaranteeSection: z
    .object({
      title: z.string(),
      seals: z.array(SealSchema),
    })
    .optional(),
});

export const GuaranteeSectionI18nSchema = z.object({
  "es-ES": GuaranteeSectionLocaleSchema,
  "it-IT": GuaranteeSectionLocaleSchema,
  "en-US": GuaranteeSectionLocaleSchema,
  "pt-BR": GuaranteeSectionLocaleSchema,
});
// lib/schemas/components/guarantee-section.schema.ts
