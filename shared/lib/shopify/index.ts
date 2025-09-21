// RUTA: shared/lib/shopify/index.ts
/**
 * @file index.ts
 * @description Capa de Acceso a Datos (DAL) de élite para la API de Shopify.
 *              Esta es la SSoT para toda la comunicación de bajo nivel con la
 *              API GraphQL de Shopify. Transforma los datos crudos de la API
 *              a nuestros contratos de datos soberanos.
 * @version 5.0.0 (Elite Leveling: Full TSDoc, Observability & Contracts)
 * @author razstore (original), RaZ Podestá - MetaShark Tech (adaptación y nivelación)
 */
import "server-only";
import { logger } from "@/shared/lib/logging";
import { SHOPIFY_GRAPHQL_API_ENDPOINT, TAGS } from "@/shared/lib/constants";
import { getProductQuery, getProductsQuery } from "./queries/product";
import { getCartQuery } from "./queries/cart";
import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation,
} from "./mutations/cart";
import type {
  ShopifyProduct,
  ShopifyProductOperation,
  ShopifyProductsOperation,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyCreateCartOperation,
  ShopifyAddToCartOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyUpdateCartOperation,
  Cart,
} from "./types";
import type { Product } from "@/shared/lib/schemas/entities/product.schema";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;

/**
 * @function shopifyFetch
 * @description Motor de comunicación centralizado con la API GraphQL de Shopify.
 * @private
 * @param {object} params - Parámetros de la petición.
 * @param {string} params.query - La query o mutación de GraphQL.
 * @param {object} [params.variables] - Las variables para la query.
 * @returns {Promise<{ status: number; body: T }>} El cuerpo de la respuesta de la API.
 * @throws Si las variables de entorno no están configuradas o si la API devuelve errores.
 */
async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T }> {
  const traceId = logger.startTrace("shopifyFetch");
  if (!domain || !key || !endpoint) {
    logger.error(
      "[Shopify DAL] Variables de entorno de Shopify no configuradas.",
      { traceId }
    );
    throw new Error("Variables de entorno de Shopify no configuradas.");
  }
  try {
    logger.traceEvent(traceId, "Ejecutando fetch a la API de Shopify...", {
      endpoint,
    });
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": key,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store", // Deshabilitar caché para datos de carrito y productos dinámicos
      next: { tags: [TAGS.products, TAGS.cart] },
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }
    logger.traceEvent(traceId, "Fetch a Shopify exitoso.");
    return { status: result.status, body };
  } catch (e) {
    logger.error("[Shopify DAL] Error en shopifyFetch.", { error: e, traceId });
    throw e;
  } finally {
    logger.endTrace(traceId);
  }
}

const removeEdgesAndNodes = <T>(array: { edges: { node: T }[] }): T[] => {
  return array.edges.map((edge) => edge.node);
};

// --- SHAPERS (Adaptadores de Datos) ---

const reshapeCart = (cart: ShopifyCart): Cart => {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: "0.0",
      currencyCode: cart.cost.totalAmount.currencyCode,
    };
  }
  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines),
  };
};

const reshapeShopifyProduct = (product: ShopifyProduct): Product => {
  const { variants, ...rest } = product;
  return {
    id: rest.id,
    name: rest.title,
    slug: rest.handle,
    price: parseFloat(rest.priceRange.minVariantPrice.amount),
    currency: rest.priceRange.minVariantPrice.currencyCode,
    imageUrl: rest.featuredImage?.url,
    isBestseller: rest.tags.includes("bestseller"),
    inventory: {
      total: 100, // Mock, Shopify no expone esto directamente en Storefront API
      available: rest.availableForSale ? 100 : 0,
      reserved: 0,
    },
    logistics: { deliveryTime: "3-5 business days" },
    producerInfo: {
      name: "Global Fitwell",
      checkoutUrl: "",
    },
    categorization: {
      primary: product.tags[0] || "General",
      secondary: product.tags.slice(1),
    },
    targetProfile: {},
    rating: undefined,
    options: rest.options,
    variants: removeEdgesAndNodes(variants),
  };
};

const reshapeShopifyProducts = (products: ShopifyProduct[]): Product[] => {
  return products.map(reshapeShopifyProduct);
};

// --- FUNCIONES DE ACCESO A DATOS (PRODUCTOS) ---

/**
 * @function getShopifyProducts
 * @description Obtiene todos los productos de la tienda de Shopify.
 * @returns {Promise<Product[]>} Una lista de productos transformados a nuestro contrato soberano.
 */
export async function getShopifyProducts(): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: getProductsQuery,
  });
  const reshaped = reshapeShopifyProducts(
    removeEdgesAndNodes(res.body.data.products)
  );
  // Filtramos para devolver solo los productos de nuestra marca.
  return reshaped.filter(
    (product) => product.producerInfo.name === "Global Fitwell"
  );
}

/**
 * @function getShopifyProduct
 * @description Obtiene un único producto de Shopify por su `handle` (slug).
 * @param {string} handle - El slug del producto.
 * @returns {Promise<Product | undefined>} El producto transformado o undefined si no se encuentra.
 */
export async function getShopifyProduct(
  handle: string
): Promise<Product | undefined> {
  const res = await shopifyFetch<ShopifyProductOperation>({
    query: getProductQuery,
    variables: { handle },
  });
  return res.body.data.product
    ? reshapeShopifyProduct(res.body.data.product)
    : undefined;
}

// --- FUNCIONES DE ACCESO A DATOS (CARRITO) ---

/**
 * @function createCart
 * @description Crea un nuevo carrito vacío en Shopify.
 * @returns {Promise<Cart>} El nuevo carrito, transformado a nuestro contrato soberano.
 */
export async function createCart(): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation,
  });
  return reshapeCart(res.body.data.cartCreate.cart);
}

/**
 * @function addToCart
 * @description Añade uno o más ítems a un carrito existente.
 * @param {string} cartId - El ID del carrito.
 * @param {Array} lines - Los ítems a añadir.
 * @returns {Promise<Cart>} El carrito actualizado.
 */
export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyAddToCartOperation>({
    query: addToCartMutation,
    variables: { cartId, lines },
  });
  return reshapeCart(res.body.data.cartLinesAdd.cart);
}

/**
 * @function removeFromCart
 * @description Elimina uno o más ítems de un carrito.
 * @param {string} cartId - El ID del carrito.
 * @param {string[]} lineIds - Los IDs de las líneas del carrito a eliminar.
 * @returns {Promise<Cart>} El carrito actualizado.
 */
export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: { cartId, lineIds },
  });
  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

/**
 * @function updateCart
 * @description Actualiza la cantidad de uno o más ítems en un carrito.
 * @param {string} cartId - El ID del carrito.
 * @param {Array} lines - Los ítems a actualizar con su nueva cantidad.
 * @returns {Promise<Cart>} El carrito actualizado.
 */
export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyUpdateCartOperation>({
    query: editCartItemsMutation,
    variables: { cartId, lines },
  });
  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

/**
 * @function getShopifyCart
 * @description Obtiene un carrito de Shopify por su ID. Es una función de bajo nivel.
 * @param {string} cartId - El ID del carrito a obtener.
 * @returns {Promise<Cart | undefined>} El carrito transformado o undefined si no se encuentra.
 */
export async function getShopifyCart(
  cartId: string
): Promise<Cart | undefined> {
  const res = await shopifyFetch<ShopifyCartOperation>({
    query: getCartQuery,
    variables: { cartId },
  });
  if (!res.body.data.cart) {
    return undefined;
  }
  return reshapeCart(res.body.data.cart);
}
// RUTA: shared/lib/shopify/index.ts
