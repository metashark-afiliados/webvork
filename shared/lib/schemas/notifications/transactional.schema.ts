// shared/lib/schemas/notifications/transactional.schema.ts
/**
 * @file transactional.schema.ts
 * @description SSoT para los contratos de datos de emails transaccionales.
 *              v2.0.0 (Order Items Integration): Se enriquece el payload de
 *              confirmación de pedido para incluir los ítems del pedido.
 * @version 2.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";
import { OrderItemSchema } from "@/shared/lib/schemas/entities/order.schema"; // <-- Reutilización de SSoT

export const OrderConfirmationPayloadSchema = z.object({
  to: z.string().email("El destinatario debe ser un email válido."),
  orderId: z.string().min(1, "Se requiere un ID de pedido."),
  totalAmount: z.string().min(1, "Se requiere un monto total."),
  // --- [INICIO DE MEJORA ARQUITECTÓNICA] ---
  items: z
    .array(OrderItemSchema)
    .min(1, "Se requiere al menos un ítem en el pedido."),
  // --- [FIN DE MEJORA ARQUITECTÓNICA] ---
});

export type OrderConfirmationPayload = z.infer<
  typeof OrderConfirmationPayloadSchema
>;
// shared/lib/schemas/notifications/transactional.schema.ts
