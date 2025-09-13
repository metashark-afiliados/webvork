// lib/schemas/components/order-section.schema.ts
/**
 * @file order-section.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente OrderSection.
 *              Define el contrato de datos para toda la información textual y de precios
 *              necesaria para renderizar la sección de conversión.
 *              - v2.0.0: Nomenclatura normalizada para alinearse con la SSoT
 *                definida en `sections.config.ts`, cambiando la clave principal
 *                de `orderForm` a `orderSection`.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";

/**
 * @const OrderSectionLocaleSchema
 * @description Valida la estructura del contenido de la sección de pedido para un único locale.
 *              La clave principal `orderSection` es opcional para permitir la fusión parcial de diccionarios.
 */
export const OrderSectionLocaleSchema = z.object({
  /**
   * @property {object} orderSection - Contenedor principal para el contenido de la sección.
   *                                  Normalizado de `orderForm` para consistencia.
   */
  orderSection: z
    .object({
      originalPrice: z
        .number()
        .positive("El precio original debe ser un número positivo."),
      discountedPrice: z
        .number()
        .positive("El precio con descuento debe ser un número positivo."),
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

/**
 * @const OrderSectionI18nSchema
 * @description Valida la estructura completa del archivo de internacionalización `order-section.i18n.json`,
 *              asegurando que todos los locales soportados estén definidos correctamente.
 */
export const OrderSectionI18nSchema = z.object({
  "es-ES": OrderSectionLocaleSchema,
  "pt-BR": OrderSectionLocaleSchema,
  "en-US": OrderSectionLocaleSchema,
  "it-IT": OrderSectionLocaleSchema,
});
// lib/schemas/components/order-section.schema.ts
