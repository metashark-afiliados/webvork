// src/lib/schemas/components/footer.schema.ts
import { z } from "zod";

/**
 * @file footer.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente Footer.
 * @version 2.0.0
 */

const LinkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

// Define la estructura para un único locale.
export const FooterLocaleSchema = z.object({
  footer: z.object({
    copyright: z.string(),
    links: z.array(LinkSchema),
    disclaimer: z.string(),
  }),
});

// Define la estructura completa del archivo .i18n.json.
export const FooterI18nSchema = z.object({
  "es-ES": FooterLocaleSchema,
  "pt-BR": FooterLocaleSchema,
  "en-US": FooterLocaleSchema,
  "it-IT": FooterLocaleSchema,
});
// src/lib/schemas/components/footer.schema.ts
