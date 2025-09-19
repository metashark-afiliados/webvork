// RUTA: lib/schemas/components/cart.schema.ts

/**
 * @file cart.schema.ts
 * @description SSoT para el contrato de datos del contenido i18n del ecosistema del Carrito de Compras.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";

export const CartContentSchema = z.object({
  triggerAriaLabel: z.string().min(1),
  sheetTitle: z.string().min(1),
  emptyStateText: z.string().min(1),
  emptyStateButton: z.string().min(1),
  subtotalLabel: z.string().min(1),
  checkoutButton: z.string().min(1),
  continueShoppingButton: z.string().min(1),
});

export const CartLocaleSchema = z.object({
  cart: CartContentSchema.optional(),
});
