// shared/lib/commerce/actions/checkout.action.ts
/**
 * @file checkout.action.ts
 * @description Server Action para orquestar el proceso de checkout.
 *              v2.0.0 (Metadata Injection): Ahora inyecta metadatos críticos
 *              (cartId) en el PaymentIntent de Stripe para la persistencia
 *              de pedidos en el webhook.
 * @version 2.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use server";

import { logger } from "@/shared/lib/logging";
import type { ActionResult } from "@/shared/lib/types/actions.types";
import { getCart } from "@/shared/lib/commerce/cart";
import { createPaymentIntent } from "@/shared/lib/stripe";

interface CheckoutSessionPayload {
  clientSecret: string | null;
}

/**
 * @function createCheckoutSessionAction
 * @description Obtiene el carrito del usuario, calcula el total y crea una
 *              intención de pago en Stripe, incluyendo el ID del carrito
 *              en los metadatos.
 * @returns {Promise<ActionResult<CheckoutSessionPayload>>}
 */
export async function createCheckoutSessionAction(): Promise<
  ActionResult<CheckoutSessionPayload>
> {
  const traceId = logger.startTrace("createCheckoutSessionAction_v2");
  logger.info("[Checkout Action] Iniciando sesión de checkout v2.0...", {
    traceId,
  });

  const cart = await getCart();

  if (!cart || cart.lines.length === 0) {
    logger.warn("[Checkout Action] Intento de checkout con carrito vacío.", {
      traceId,
    });
    return { success: false, error: "Tu carrito está vacío." };
  }

  // SSoT del precio: Se calcula en el backend a partir del total del carrito.
  const amountInCents = Math.round(
    parseFloat(cart.cost.totalAmount.amount) * 100
  );
  const currency = cart.cost.totalAmount.currencyCode;

  try {
    // --- MEJORA ARQUITECTÓNICA ---
    // Inyectamos el cartId en la metadata. Esto es crucial para que el webhook
    // sepa qué carrito corresponde a este pago.
    const metadata = { cartId: cart.id };
    logger.traceEvent(
      traceId,
      "Inyectando metadatos en PaymentIntent.",
      metadata
    );

    const paymentIntent = await createPaymentIntent(
      amountInCents,
      currency,
      metadata
    );

    logger.success("[Checkout Action] PaymentIntent creado con metadatos.", {
      paymentIntentId: paymentIntent.id,
      traceId,
    });
    return {
      success: true,
      data: { clientSecret: paymentIntent.client_secret },
    };
  } catch (error) {
    logger.error("[Checkout Action] Fallo al crear PaymentIntent.", {
      error,
      traceId,
    });
    return { success: false, error: "No se pudo iniciar el proceso de pago." };
  } finally {
    logger.endTrace(traceId);
  }
}
// shared/lib/commerce/actions/checkout.action.ts
