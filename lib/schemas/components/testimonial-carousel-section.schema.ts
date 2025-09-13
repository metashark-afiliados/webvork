// lib/schemas/components/testimonial-carousel-section.schema.ts
/**
 * @file testimonial-carousel-section.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente TestimonialCarouselSection.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";

const ReviewItemSchema = z.object({
  image: z.string().startsWith("/"),
  name: z.string(),
  userName: z.string(),
  comment: z.string(),
  rating: z.number().min(1).max(5),
});

export type ReviewItem = z.infer<typeof ReviewItemSchema>;

export const TestimonialCarouselSectionLocaleSchema = z.object({
  testimonialCarouselSection: z
    .object({
      eyebrow: z.string(),
      title: z.string(),
      reviews: z.array(ReviewItemSchema),
    })
    .optional(),
});
// lib/schemas/components/testimonial-carousel-section.schema.ts
