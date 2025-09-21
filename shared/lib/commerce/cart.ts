// RUTA: shared/lib/commerce/cart.ts
/**
 * @file cart.ts
 * @description Capa de datos del lado del servidor para obtener el carrito.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import "server-only";
import { cookies } from "next/headers";
import { getCart as getShopifyCart } from "@/shared/lib/shopify";
import type { ShopifyCart } from "@/shared/lib/shopify/types";

/**
 * @function getCart
 * @description Obtiene el carrito del usuario actual basándose en la cookie 'cartId'.
 *              Si la cookie no existe o el carrito es inválido, devuelve undefined.
 * @returns {Promise<ShopifyCart | undefined>}
 */
export async function getCart(): Promise<ShopifyCart | undefined> {
  const cartId = cookies().get("cartId")?.value;
  if (!cartId) {
    return undefined;
  }
  return getShopifyCart(cartId);
}
