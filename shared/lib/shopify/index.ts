// RUTA: shared/lib/shopify/index.ts
/**
 * @file index.ts
 * @description Capa de Acceso a Datos (DAL) para la API de Shopify.
 * @version 2.2.0 (Holistic Integrity Restoration)
 * @author razstore (original), RaZ Podestá - MetaShark Tech (adaptación)
 */
import "server-only";
import { logger } from "@/shared/lib/logging";
import { getProductQuery, getProductsQuery } from "./queries/product";
import type {
  ShopifyProduct,
  ShopifyProductOperation,
  ShopifyProductsOperation,
} from "./types";
import type { Product } from "@/shared/lib/schemas/entities/product.schema";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const endpoint = `${domain}/api/2024-04/graphql.json`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;

async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T }> {
  if (!domain || !key || !endpoint) {
    throw new Error("Variables de entorno de Shopify no configuradas.");
  }
  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": key,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    });

    const body = await result.json();
    if (body.errors) {
      throw body.errors[0];
    }
    return { status: result.status, body };
  } catch (e) {
    logger.error("Error en shopifyFetch", { error: e });
    throw e;
  }
}

const removeEdgesAndNodes = <T>(array: { edges: { node: T }[] }): T[] => {
  return array.edges.map((edge) => edge.node);
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
      total: 100,
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

export async function getShopifyProducts(): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: getProductsQuery,
  });
  const reshaped = reshapeShopifyProducts(
    removeEdgesAndNodes(res.body.data.products)
  );
  return reshaped.filter(
    (product) => product.producerInfo.name === "Global Fitwell"
  );
}

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
