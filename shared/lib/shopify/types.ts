// RUTA: shared/lib/shopify/types.ts
/**
 * @file types.ts
 * @description SSoT para los contratos de tipos que modelan la API de Shopify.
 * @version 1.0.0
 * @author razstore (original), RaZ Podestá - MetaShark Tech (adaptación)
 */
import "server-only";
import type {
  ProductOption,
  ProductVariant,
} from "@/shared/lib/schemas/entities/product.schema";

type Connection<T> = {
  edges: Array<{ node: T }>;
};

type Money = {
  amount: string;
  currencyCode: string;
};

type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

type SEO = {
  title: string;
  description: string;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: Connection<ProductVariant>;
  featuredImage: Image;
  images: Connection<Image>;
  seo: SEO;
  tags: string[];
  updatedAt: string;
};

export type ShopifyProductOperation = {
  data: { product: ShopifyProduct };
  variables: { handle: string };
};

export type ShopifyProductsOperation = {
  data: {
    products: Connection<ShopifyProduct>;
  };
};
