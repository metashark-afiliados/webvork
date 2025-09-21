// RUTA: shared/lib/commerce/cart.actions.ts
/**
 * @file cart.actions.ts
 * @description Server Actions soberanas para la gestión del carrito de compras.
 * @version 1.1.0 (Type Safety & Observability)
 * @author razstore (original), RaZ Podestá - MetaShark Tech (adaptación)
 */
"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { logger } from "@/shared/lib/logging";
import { TAGS } from "@/shared/lib/constants";
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
} from "@/shared/lib/shopify";

export async function addItem(
  prevState: unknown,
  selectedVariantId: string | undefined
): Promise<string | undefined> {
  let cartId = cookies().get("cartId")?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cartId || !cart) {
    try {
      cart = await createCart();
      cartId = cart.id;
      cookies().set("cartId", cartId);
    } catch (e) {
      logger.error("Fallo al crear el carrito.", { error: e });
      return "Error al crear el carrito.";
    }
  }

  if (!selectedVariantId) {
    return "Error: ID de variante no proporcionado.";
  }

  try {
    await addToCart(cartId, [
      { merchandiseId: selectedVariantId, quantity: 1 },
    ]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    logger.error("Fallo al añadir item al carrito.", { error: e, cartId });
    return "Error al añadir el item al carrito.";
  }
}

export async function removeItem(
  prevState: unknown,
  lineId: string
): Promise<string | undefined> {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return "Error: Carrito no encontrado.";
  }

  try {
    await removeFromCart(cartId, [lineId]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    logger.error("Fallo al eliminar item del carrito.", { error: e, cartId });
    return "Error al eliminar el item del carrito.";
  }
}

export async function updateItemQuantity(
  prevState: unknown,
  payload: {
    lineId: string;
    variantId: string;
    quantity: number;
  }
): Promise<string | undefined> {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return "Error: Carrito no encontrado.";
  }

  try {
    if (payload.quantity === 0) {
      await removeFromCart(cartId, [payload.lineId]);
    } else {
      await updateCart(cartId, [
        {
          id: payload.lineId,
          merchandiseId: payload.variantId,
          quantity: payload.quantity,
        },
      ]);
    }
    revalidateTag(TAGS.cart);
  } catch (e) {
    logger.error("Fallo al actualizar cantidad del item.", {
      error: e,
      cartId,
    });
    return "Error al actualizar la cantidad del item.";
  }
}
