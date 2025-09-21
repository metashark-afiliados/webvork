// shared/lib/commerce/index.ts
/**
 * @file index.ts (Barrel File)
 * @description Capa de Acceso a Datos Soberana y Agregadora para E-commerce.
 *              v3.1.0 (Elite Refactor): Introduce `getProductBySlug` optimizado,
 *              mejora la observabilidad con tracing y fortalece los contratos.
 * @version 3.1.0
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
  const traceId = logger.startTrace("getLocalProducts");
  try {
    const catalogData = await loadJsonAsset<ProductCatalogI18n>(
      "products/catalog.i18n.json" // Ruta corregida para ser relativa a /content
    );
    const catalogForLocale = catalogData[locale];
    if (!catalogForLocale) return [];

    const validation = ProductCatalogSchema.safeParse(catalogForLocale);
    if (!validation.success) {
      logger.error(
        "[Commerce Layer] Catálogo local de productos falló la validación.",
        { error: validation.error.flatten(), traceId }
      );
      return [];
    }
    // Filtramos para devolver solo los productos que NO son de nuestra marca principal.
    const localProducts = validation.data.products.filter(
      (p) => p.producerInfo.name !== "Global Fitwell"
    );
    logger.traceEvent(
      traceId,
      `Se encontraron ${localProducts.length} productos locales.`
    );
    return localProducts;
  } catch (error) {
    logger.error("Fallo crítico al cargar el catálogo de productos locales.", {
      error,
      traceId,
    });
    return [];
  } finally {
    logger.endTrace(traceId);
  }
}

/**
 * @function getProducts
 * @description Orquestador que obtiene productos de todas las fuentes y los fusiona.
 */
export async function getProducts(options: {
  locale: Locale;
}): Promise<EnrichedProduct[]> {
  const traceId = logger.startTrace("getProducts (Hybrid)");
  logger.info(
    `[Commerce Layer] Solicitando productos HÍBRIDOS para [${options.locale}]`
  );

  try {
    const [shopifyProducts, localProducts] = await Promise.all([
      getShopifyProducts().catch((e) => {
        logger.error("Fallo al obtener productos de Shopify.", {
          error: e,
          traceId,
        });
        return [];
      }),
      getLocalProducts(options.locale),
    ]);

    logger.traceEvent(
      traceId,
      `Shopify: ${shopifyProducts.length}, Local: ${localProducts.length}`
    );

    const allProducts = [...shopifyProducts, ...localProducts];

    return reshapeProducts(allProducts);
  } catch (error) {
    logger.error("Error inesperado en getProducts.", { error, traceId });
    return [];
  } finally {
    logger.endTrace(traceId);
  }
}

/**
 * @function getProductBySlug
 * @description Obtiene un único producto por su slug desde la fuente apropiada.
 *              Esta es la SSoT para obtener detalles de un producto.
 */
export async function getProductBySlug(options: {
  locale: Locale;
  slug: string;
}): Promise<EnrichedProduct | null> {
  const traceId = logger.startTrace(`getProductBySlug:${options.slug}`);
  logger.info(
    `[Commerce Layer] Solicitando producto HÍBRIDO por slug: "${options.slug}"`
  );

  try {
    // 1. Intenta obtener de Shopify primero.
    const shopifyProduct = await getShopifyProduct(options.slug).catch(
      () => null
    );
    if (shopifyProduct) {
      logger.traceEvent(traceId, "Producto encontrado en Shopify.");
      return reshapeProduct(shopifyProduct);
    }
    logger.traceEvent(
      traceId,
      "Producto no encontrado en Shopify. Buscando en catálogo local..."
    );

    // 2. Si no, busca en el catálogo local de forma optimizada.
    const localProducts = await getLocalProducts(options.locale);
    const localProduct = localProducts.find((p) => p.slug === options.slug);

    if (localProduct) {
      logger.traceEvent(traceId, "Producto encontrado en catálogo local.");
      return reshapeProduct(localProduct);
    }

    logger.warn(
      `[Commerce Layer] Producto con slug "${options.slug}" no fue encontrado en ninguna fuente de datos.`,
      { traceId }
    );
    return null;
  } catch (error) {
    logger.error("Error inesperado en getProductBySlug.", { error, traceId });
    return null;
  } finally {
    logger.endTrace(traceId);
  }
}
// shared/lib/commerce/index.ts
