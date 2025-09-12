// src/lib/schemas/components/guarantee-section.schema.ts
/**
 * @file guarantee-section.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente GuaranteeSection.
 * @version 2.0.0
 */
import { z } from "zod";

// Contrato para un único sello de garantía/calidad
const SealSchema = z.object({
  imageUrl: z.string().startsWith("/").endsWith(".jpg"),
  imageAlt: z.string(),
});

export const GuaranteeSectionLocaleSchema = z.object({
  guaranteeSection: z
    .object({
      title: z.string(),
      seals: z.array(SealSchema), // Ahora es un array de sellos
    })
    .optional(),
});

export const GuaranteeSectionI18nSchema = z.object({
  "es-ES": GuaranteeSectionLocaleSchema,
  "it-IT": GuaranteeSectionLocaleSchema,
});
// src/lib/schemas/components/guarantee-section.schema.ts
