// RUTA: shared/lib/schemas/pages/product-detail-page.schema.ts
/**
 * @file product-detail-page.schema.ts
 * @description SSoT para el contrato de datos del contenido i18n de una
 *              página de detalle de producto.
 * @version 2.1.0 (Full i18n for Stock Status)
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";
import { ContentBlocksSchema } from "@/shared/lib/schemas/components/content-block.schema";
import { ProductSchema } from "@/shared/lib/schemas/entities/product.schema";

export const ProductDetailPageContentSchema = z.object({
  productData: ProductSchema,
  galleryImages: z.array(
    z.object({
      src: z.string().startsWith("/"),
      alt: z.string(),
    })
  ),
  description: ContentBlocksSchema,
  addToCartButton: z.string(),
  quantityLabel: z.string(),
  relatedProductsTitle: z.string(),
  // --- MEJORA DE INTERNACIONALIZACIÓN ---
  stockStatus: z.object({
    available: z.string().includes("{{count}}"), // Ej: "Disponible ({{count}} en stock)"
    unavailable: z.string(), // Ej: "Actualmente no disponible"
  }),
});

export const ProductDetailPageLocaleSchema = z.record(
  ProductDetailPageContentSchema
);
