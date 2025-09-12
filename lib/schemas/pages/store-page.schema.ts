// src/lib/schemas/pages/store-page.schema.ts
/**
 * @file store-page.schema.ts
 * @description Schema para el contenido de la página de la tienda.
 *              Actualizado para ser opcional a nivel de clave.
 * @version 2.0.0
 */
import { z } from "zod";

const ProductFilterSchema = z.object({
  label: z.string(),
  count: z.number(),
});

const ProductCardSchema = z.object({
  name: z.string(),
  category: z.string(),
  price: z.number(),
  imageUrl: z.string().startsWith("/"),
  href: z.string(),
});

export const StorePageLocaleSchema = z.object({
  // <<-- MEJORA: La clave 'storePage' ahora es opcional.
  // Esto permite que un diccionario sea válido incluso si no define el contenido
  // para esta página específica.
  storePage: z
    .object({
      title: z.string(),
      subtitle: z.string(),
      filters: z.object({
        categoryTitle: z.string(),
        categories: z.array(ProductFilterSchema),
        priceTitle: z.string(),
        prices: z.array(ProductFilterSchema),
      }),
      products: z.array(ProductCardSchema),
    })
    .optional(),
});
// src/lib/schemas/pages/store-page.schema.ts
