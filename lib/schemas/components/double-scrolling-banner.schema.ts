// src/lib/schemas/components/double-scrolling-banner.schema.ts
/**
 * @file double-scrolling-banner.schema.ts
 * @description Esquema de Zod para el contenido del DoubleScrollingBanner.
 * @version 1.0.0
 */
import { z } from "zod";

const TestimonialItemSchema = z.object({
  imageSrc: z.string().startsWith("/"),
  altText: z.string(),
  name: z.string(),
  rating: z.number().min(1).max(5),
});

const LogoItemSchema = z.object({
  imageSrc: z.string().startsWith("/"),
  altText: z.string(),
});

export const DoubleScrollingBannerLocaleSchema = z.object({
  doubleScrollingBanner: z
    .object({
      testimonials: z.array(TestimonialItemSchema),
      logos: z.array(LogoItemSchema),
    })
    .optional(),
});

export const DoubleScrollingBannerI18nSchema = z.object({
  "es-ES": DoubleScrollingBannerLocaleSchema,
  "it-IT": DoubleScrollingBannerLocaleSchema,
});
// src/lib/schemas/components/double-scrolling-banner.schema.ts
