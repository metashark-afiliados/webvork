// lib/schemas/pages/store-page.schema.ts
/**
 * @file store-page.schema.ts
 * @description SSoT para el contrato de datos de la Tienda v2.0 (Stripe-Ready).
 * @version 2.1.0 (ProductFilterSchema Export)
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";
import { logger } from "@/lib/logging";

logger.trace("[Schema] Definiendo contrato para [StorePage] v2.1.");

/**
 * @const ProductFilterSchema
 * @description Valida la estructura de un item en los filtros de categoría.
 *              Aunque no se usa directamente en la UI v2.2, se mantiene para futuras mejoras
 *              y ahora se exporta para resolver la advertencia 'no-unused-vars'.
 */
export const ProductFilterSchema = z.object({
  // <-- Exportado explícitamente
  label: z.string(),
  count: z.number(),
});

export const ProductCardSchema = z.object({
  id: z.string().min(1, "El ID de producto es obligatorio."),
  stripePriceId: z.string().startsWith("price_").optional(), // Opcional mientras no se implemente
  name: z.string(),
  category: z.string(),
  price: z.number(),
  imageUrl: z.string().startsWith("/"),
  slug: z.string().min(1),
  tags: z.array(z.string()),
  inventory: z.number().int().min(0),
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
        tagsTitle: z.string(),
        stockTitle: z.string(),
      }),
      products: z.array(ProductCardSchema),
    })
    .optional(),
});
