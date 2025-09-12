// src/lib/schemas/components/order-form.schema.ts
/**
 * @file order-form.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente OrderForm.
 * @version 1.0.0
 */
import { z } from "zod";

export const OrderFormLocaleSchema = z.object({
  orderForm: z
    .object({
      originalPrice: z.number(),
      discountedPrice: z.number(),
      originalPriceLabel: z.string(),
      discountedPriceLabel: z.string(),
      nameInputLabel: z.string(),
      nameInputPlaceholder: z.string(),
      phoneInputLabel: z.string(),
      phoneInputPlaceholder: z.string(),
      submitButtonText: z.string(),
      submitButtonLoadingText: z.string(),
    })
    .optional(),
});

export const OrderFormI18nSchema = z.object({
  "es-ES": OrderFormLocaleSchema,
  "pt-BR": OrderFormLocaleSchema,
  "en-US": OrderFormLocaleSchema,
  "it-IT": OrderFormLocaleSchema,
});
// src/lib/schemas/components/order-form.schema.ts
