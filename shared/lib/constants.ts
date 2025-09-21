// RUTA: shared/lib/constants.ts
/**
 * @file constants.ts
 * @description SSoT para las constantes globales del ecosistema de la aplicación.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */

/**
 * @const TAGS
 * @description Etiquetas de caché utilizadas para la revalidación de datos bajo demanda en Next.js.
 */
export const TAGS = {
  products: "products",
  cart: "cart",
} as const;

/**
 * @const SHOPIFY_GRAPHQL_API_ENDPOINT
 * @description El endpoint canónico para la API GraphQL de Shopify Storefront.
 */
export const SHOPIFY_GRAPHQL_API_ENDPOINT = "/api/2024-04/graphql.json";
