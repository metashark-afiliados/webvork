// lib/schemas/pages/product-detail-page.schema.ts
/**
 * @file product-detail-page.schema.ts
 * @description SSoT para el contrato de datos del contenido i18n de una
 *              página de detalle de producto.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";
import { ContentBlocksSchema } from "@/lib/schemas/components/content-block.schema";
import { ProductCardSchema } from "./store-page.schema";

/**
 * @const ProductDetailPageContentSchema
 * @description Valida la estructura completa del contenido de una página de producto.
 */
export const ProductDetailPageContentSchema = z.object({
  // Reutilizamos el schema del producto de la tienda para la información base
  productData: ProductCardSchema,

  // Contenido específico de la página de detalle
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
});

/**
 * @const ProductDetailPageLocaleSchema
 * @description Valida el objeto de un producto específico dentro de un archivo i18n.
 *              La clave será el slug del producto.
 */
export const ProductDetailPageLocaleSchema = z.record(
  ProductDetailPageContentSchema
);
// lib/schemas/pages/product-detail-page.schema.ts
