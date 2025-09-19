// lib/schemas/pages/store-page.schema.ts
/**
@file store-page.schema.ts
@description SSoT para el contrato de datos de la Tienda v2.0 (Stripe-Ready).
@version 2.3.0 (Type Export Fix)
@author RaZ Podestá - MetaShark Tech
*/
import { z } from "zod";
export const ProductCardSchema = z.object({
  id: z.string().min(1, "El ID de producto es obligatorio."),
  stripePriceId: z.string().startsWith("price_").optional(),
  name: z.string(),
  category: z.string(),
  price: z.number(),
  imageUrl: z.string().startsWith("/"),
  slug: z.string().min(1),
  tags: z.array(z.string()),
  inventory: z.number().int().min(0),
  rating: z.number().min(0).max(5).optional(),
  isBestseller: z.boolean().optional(),
});
// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
export type ProductCardData = z.infer<typeof ProductCardSchema>;
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---
export const StorePageLocaleSchema = z.object({
  storePage: z
    .object({
      title: z.string(),
      subtitle: z.string(),
      filters: z.object({
        searchLabel: z.string(),
        searchPlaceholder: z.string(),
        priceTitle: z.string(),
        tagsTitle: z.string(),
        stockTitle: z.string(),
        inStockLabel: z.string(),
      }),
      bestsellerLabel: z.string(),
      addToCartButton: z.string(),
      viewDetailsButton: z.string(),
      products: z.array(ProductCardSchema),
    })
    .optional(),
});
// lib/schemas/pages/store-page.schema.ts
