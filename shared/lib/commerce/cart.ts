// RUTA: shared/lib/commerce/cart.ts
/**
 * @file cart.ts
 * @description Capa de datos del lado del servidor para obtener el carrito.
 *              Esta es la SSoT que la aplicación debe consumir. Encapsula
 *              la lógica de obtención del cartId desde las cookies.
 * @version 2.0.0 (Architectural Restoration)
 * @author RaZ Podestá - MetaShark Tech
 */
import "server-only";
import { cookies } from "next/headers";
import { getShopifyCart } from "@/shared/lib/shopify";
import type { Cart } from "@/shared/lib/shopify/types";

/**
 * @function getCart
 * @description Obtiene el carrito del usuario actual basándose en la cookie 'cartId'.
 *              Si la cookie no existe o el carrito es inválido, devuelve undefined.
 * @returns {Promise<Cart | undefined>}
 */
export async function getCart(): Promise<Cart | undefined> {
  const cartId = cookies().get("cartId")?.value;
  if (!cartId) {
    return undefined;
  }
  // Llama a la función de bajo nivel de la capa de Shopify
  return getShopifyCart(cartId);
}
// RUTA: shared/lib/commerce/cart.ts
