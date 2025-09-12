// src/lib/schemas/components/testimonial-grid.schema.ts
import { z } from "zod";

const TestimonialSchema = z.object({
  quote: z.string(),
  author: z.string(),
  location: z.string(),
  imageSrc: z.string().startsWith("/"),
});

export const TestimonialGridLocaleSchema = z.object({
  testimonialGrid: z
    .object({
      title: z.string(),
      testimonials: z.array(TestimonialSchema),
    })
    .optional(),
});

export const TestimonialGridI18nSchema = z.object({
  "es-ES": TestimonialGridLocaleSchema,
  "pt-BR": TestimonialGridLocaleSchema,
  "en-US": TestimonialGridLocaleSchema,
  "it-IT": TestimonialGridLocaleSchema,
});
// src/lib/schemas/components/testimonial-grid.schema.ts
