// src/lib/schemas/components/faq-accordion.schema.ts
/**
 * @file faq-accordion.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente FaqAccordion.
 * @version 1.0.0
 */
import { z } from "zod";

const FaqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const FaqAccordionLocaleSchema = z.object({
  faqAccordion: z
    .object({
      title: z.string(),
      faqs: z.array(FaqSchema),
    })
    .optional(),
});

export const FaqAccordionI18nSchema = z.object({
  "es-ES": FaqAccordionLocaleSchema,
  "pt-BR": FaqAccordionLocaleSchema,
  "en-US": FaqAccordionLocaleSchema,
  "it-IT": FaqAccordionLocaleSchema,
});
// src/lib/schemas/components/faq-accordion.schema.ts
