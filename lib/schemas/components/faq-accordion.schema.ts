// lib/schemas/components/faq-accordion.schema.ts
/**
 * @file faq-accordion.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente FaqAccordion.
 *              Define el contrato de datos para el título de la sección y la lista
 *              de preguntas y respuestas.
 *              - v3.0.0: Se exporta el tipo `FaqItem` para su uso en componentes,
 *                mejorando la seguridad de tipos y el principio DRY.
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";

/**
 * @const FaqItemSchema
 * @description Valida la estructura de un único ítem de FAQ, asegurando que
 *              la pregunta y la respuesta sean cadenas de texto no vacías.
 */
const FaqItemSchema = z.object({
  question: z.string().min(1, "La pregunta no puede estar vacía."),
  answer: z.string().min(1, "La respuesta no puede estar vacía."),
});

/**
 * @type FaqItem
 * @description El tipo inferido para un único objeto de FAQ.
 *              Esta es la SSoT para la estructura de datos de un item de FAQ.
 */
export type FaqItem = z.infer<typeof FaqItemSchema>;

/**
 * @const FaqAccordionLocaleSchema
 * @description Valida la estructura del contenido de la sección de FAQ para un único locale.
 *              La clave `faqAccordion` es opcional para permitir la fusión de diccionarios.
 */
export const FaqAccordionLocaleSchema = z.object({
  faqAccordion: z
    .object({
      title: z.string(),
      faqs: z.array(FaqItemSchema),
    })
    .optional(),
});

/**
 * @const FaqAccordionI18nSchema
 * @description Valida la estructura completa del archivo `faq-accordion.i18n.json`,
 *              asegurando la presencia de todos los locales soportados.
 */
export const FaqAccordionI18nSchema = z.object({
  "it-IT": FaqAccordionLocaleSchema,
  "es-ES": FaqAccordionLocaleSchema,
  "en-US": FaqAccordionLocaleSchema,
  "pt-BR": FaqAccordionLocaleSchema,
});
// lib/schemas/components/faq-accordion.schema.ts
