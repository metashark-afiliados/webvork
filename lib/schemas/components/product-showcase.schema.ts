// src/lib/schemas/components/product-showcase.schema.ts
import { z } from "zod";

/**
 * @file product-showcase.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente ProductShowcase.
 * @version 1.0.0
 */
const ProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  imageUrl: z.string().startsWith("/"),
});

export const ProductShowcaseLocaleSchema = z.object({
  productShowcase: z
    .object({
      title: z.string(),
      products: z.array(ProductSchema),
    })
    .optional(),
});

export const ProductShowcaseI18nSchema = z.object({
  "es-ES": ProductShowcaseLocaleSchema,
  "en-US": ProductShowcaseLocaleSchema,
  "pt-BR": ProductShowcaseLocaleSchema,
  "it-IT": ProductShowcaseLocaleSchema,
});
// src/lib/schemas/components/product-showcase.schema.ts
