// lib/schemas/components/faq-accordion.schema.ts
/**
 * @file faq-accordion.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente FaqAccordion.
 *              Actúa como el contrato de datos inmutable para la sección de FAQ.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";

// Define el contrato para una única pregunta y respuesta.
const FaqItemSchema = z.object({
  question: z.string().min(1, "La pregunta no puede estar vacía."),
  answer: z.string().min(1, "La respuesta no puede estar vacía."),
});

// Define la estructura que el componente FaqAccordion espera recibir para un locale específico.
export const FaqAccordionLocaleSchema = z.object({
  faqAccordion: z
    .object({
      title: z.string(),
      faqs: z.array(FaqItemSchema),
    })
    .optional(), // Opcional, para que el diccionario global sea válido si una página no usa esta sección.
});
// lib/schemas/components/faq-accordion.schema.ts
