// lib/schemas/components/testimonial-grid.schema.ts
/**
 * @file testimonial-grid.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente TestimonialGrid.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";

/**
 * @const TestimonialSchema
 * @description Valida la estructura de un único testimonio.
 */
const TestimonialSchema = z.object({
  quote: z.string(),
  author: z.string(),
  location: z.string(),
  imageSrc: z.string().startsWith("/"),
});

/**
 * @type Testimonial
 * @description Infiere el tipo TypeScript para un objeto de testimonio.
 */
export type Testimonial = z.infer<typeof TestimonialSchema>;

/**
 * @const TestimonialGridLocaleSchema
 * @description Valida la estructura del contenido de la sección para un único locale.
 */
export const TestimonialGridLocaleSchema = z.object({
  testimonialGrid: z
    .object({
      title: z.string(),
      testimonials: z.array(TestimonialSchema),
    })
    .optional(),
});

/**
 * @const TestimonialGridI18nSchema
 * @description Valida la estructura completa del archivo .i18n.json.
 */
export const TestimonialGridI18nSchema = z.object({
  "es-ES": TestimonialGridLocaleSchema,
  "pt-BR": TestimonialGridLocaleSchema,
  "en-US": TestimonialGridLocaleSchema,
  "it-IT": TestimonialGridLocaleSchema,
});
// lib/schemas/components/testimonial-grid.schema.ts
