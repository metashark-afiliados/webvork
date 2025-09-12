// src/lib/schemas/components/card-nav.schema.ts
/**
 * @file card-nav.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente CardNav.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";

const CardNavLinkSchema = z.object({
  label: z.string(),
  href: z.string().url(),
  ariaLabel: z.string(),
});

const CardNavItemSchema = z.object({
  label: z.string(),
  // NOTA: Se eliminan bgColor y textColor, el estilo será semántico.
  links: z.array(CardNavLinkSchema),
});

export const CardNavLocaleSchema = z.object({
  cardNav: z
    .object({
      logo: z.object({
        src: z.string().startsWith("/"),
        alt: z.string(),
      }),
      navItems: z.array(CardNavItemSchema),
      ctaButton: z.object({
        label: z.string(),
        href: z.string().url(),
      }),
      menuAccessibility: z.object({
        openLabel: z.string(),
        closeLabel: z.string(),
      }),
    })
    .optional(),
});

export const CardNavI18nSchema = z.object({
  "es-ES": CardNavLocaleSchema,
  "pt-BR": CardNavLocaleSchema,
  "en-US": CardNavLocaleSchema,
  "it-IT": CardNavLocaleSchema,
});
// src/lib/schemas/components/card-nav.schema.ts
