// lib/schemas/pages/store-page.schema.ts
/**
 * @file store-page.schema.ts
 * @description Schema para el contenido de la página de la tienda.
 *              - v3.0.0: Desacopla las rutas del contenido reemplazando `href` por `slug`,
 *                alineando el contrato de datos con la estrategia de rutas centralizada.
 * @version 3.0.0
 * @author RaZ Podestá - MetaShark Tech
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
  // --- [INICIO DE CORRECCIÓN] ---
  slug: z.string().min(1, "El slug del producto es obligatorio."),
  // --- [FIN DE CORRECCIÓN] ---
});

export const StorePageLocaleSchema = z.object({
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
// lib/schemas/pages/store-page.schema.ts
