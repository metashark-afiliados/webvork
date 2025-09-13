// lib/schemas/components/guarantee-section.schema.ts
/**
 * @file guarantee-section.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente GuaranteeSection.
 *              Define el contrato de datos para el título de la sección y la lista
 *              de sellos de garantía.
 *              - v3.0.0: Exporta el tipo `Seal` para una seguridad de tipos robusta entre
 *                la capa de datos y la de presentación.
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";

/**
 * @const SealSchema
 * @description Valida la estructura de un único sello de garantía. Requiere una
 *              ruta de imagen que comience con `/` (absoluta desde /public) y
 *              un texto alternativo descriptivo para SEO y accesibilidad.
 */
const SealSchema = z.object({
  imageUrl: z.string().startsWith("/"),
  imageAlt: z.string(),
});

/**
 * @type Seal
 * @description El tipo inferido para un único objeto de sello de garantía.
 *              Esta es la SSoT para el tipado de los datos de un sello.
 */
export type Seal = z.infer<typeof SealSchema>;

/**
 * @const GuaranteeSectionLocaleSchema
 * @description Valida la estructura del contenido de la sección de garantía para un único locale.
 */
export const GuaranteeSectionLocaleSchema = z.object({
  guaranteeSection: z
    .object({
      title: z.string(),
      seals: z.array(SealSchema),
    })
    .optional(),
});

/**
 * @const GuaranteeSectionI18nSchema
 * @description Valida la estructura completa del archivo `guarantee-section.i18n.json`.
 */
export const GuaranteeSectionI18nSchema = z.object({
  "es-ES": GuaranteeSectionLocaleSchema,
  "it-IT": GuaranteeSectionLocaleSchema,
  "en-US": GuaranteeSectionLocaleSchema,
  "pt-BR": GuaranteeSectionLocaleSchema,
});
// lib/schemas/components/guarantee-section.schema.ts
