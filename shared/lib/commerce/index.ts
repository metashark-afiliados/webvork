// RUTA: shared/lib/commerce/index.ts
/**
 * @file index.ts
 * @description Capa de Acceso a Datos Soberana y Agregadora para E-commerce.
 *              v3.0.0 (Hybrid Engine): Integra el motor de Shopify y lo fusiona
 *              con el catálogo local de dropshipping, creando una fuente de
 *              datos de productos unificada y agnóstica al proveedor.
 * @version 3.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import "server-only";
import { logger } from "@/shared/lib/logging";
import type { Locale } from "@/shared/lib/i18n.config";
import {
  reshapeProducts,
  reshapeProduct,
  type EnrichedProduct,
} from "./shapers";
import { getShopifyProducts, getShopifyProduct } from "@/shared/lib/shopify";
import { loadJsonAsset } from "@/shared/lib/i18n/campaign.data.loader";
import {
  ProductCatalogSchema,
  type Product,
} from "@/shared/lib/schemas/entities/product.schema";
import type { z } from "zod";

type ProductCatalogI18n = Partial<
  Record<Locale, z.infer<typeof ProductCatalogSchema>>
>;

/**
 * @function getLocalProducts
 * @description Obtiene los productos de nuestro catálogo estático (dropshipping).
 * @private
 */
async function getLocalProducts(locale: Locale): Promise<Product[]> {
  try {
    const catalogData = await loadJsonAsset<ProductCatalogI18n>(
      "campaigns",
      `products/catalog.i18n.json`
    );
    const catalogForLocale = catalogData[locale];
    if (!catalogForLocale) return [];
    const validation = ProductCatalogSchema.safeParse(catalogForLocale);
    if (!validation.success) {
      logger.error(
        "[Commerce Layer] Catálogo local de productos falló la validación.",
        { error: validation.error.flatten() }
      );
      return [];
    }
    return validation.data.products.filter(
      (p) => p.producerInfo.name !== "Global Fitwell"
    );
  } catch (error) {
    logger.error("Fallo crítico al cargar el catálogo de productos locales.", {
      error,
    });
    return [];
  }
}

/**
 * @function getProducts
 * @description Orquestador que obtiene productos de todas las fuentes y los fusiona.
 */
export async function getProducts(options: {
  locale: Locale;
}): Promise<EnrichedProduct[]> {
  logger.info(
    `[Commerce Layer] Solicitando productos HÍBRIDOS para [${options.locale}]`
  );

  const [shopifyProducts, localProducts] = await Promise.all([
    getShopifyProducts().catch((e) => {
      logger.error("Fallo al obtener productos de Shopify.", { error: e });
      return [];
    }),
    getLocalProducts(options.locale),
  ]);

  const allProducts = [...shopifyProducts, ...localProducts];

  return reshapeProducts(allProducts);
}

/**
 * @function getProduct
 * @description Obtiene un único producto por su slug desde la fuente apropiada.
 */
export async function getProduct(options: {
  locale: Locale;
  slug: string;
}): Promise<EnrichedProduct | null> {
  logger.info(
    `[Commerce Layer] Solicitando producto HÍBRIDO: "${options.slug}"`
  );

  // Intenta obtener de Shopify primero
  const shopifyProduct = await getShopifyProduct(options.slug).catch(
    () => null
  );
  if (shopifyProduct) {
    return reshapeProduct(shopifyProduct);
  }

  // Si no, busca en el catálogo local
  const localProducts = await getLocalProducts(options.locale);
  const localProduct = localProducts.find((p) => p.slug === options.slug);

  if (localProduct) {
    return reshapeProduct(localProduct);
  }

  return null;
}
