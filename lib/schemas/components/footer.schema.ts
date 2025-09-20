// RUTA: lib/schemas/components/footer.schema.ts
/**
 * @file footer.schema.ts
 * @description SSoT para el contrato de datos del contenido i18n del componente Footer.
 *              v6.0.0 (Holistic Elite Leveling & MEA): Refactorizado para un diseño
 *              corporativo completo, con múltiples columnas y soporte para tooltips
 *              en los enlaces sociales para una MEA/UX mejorada.
 * @version 6.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";
import { LucideIconNameSchema } from "@/config/lucide-icon-names";
import { logger } from "@/lib/logging";

logger.trace("[Schema] Definiendo contrato para [Footer] v6.0");

const LinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

const LinkColumnSchema = z.object({
  title: z.string().min(1),
  links: z.array(LinkSchema),
});

const SocialLinkSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  icon: LucideIconNameSchema,
});

export type Link = z.infer<typeof LinkSchema>;
export type LinkColumn = z.infer<typeof LinkColumnSchema>;
export type SocialLink = z.infer<typeof SocialLinkSchema>;

export const FooterContentSchema = z.object({
  newsletter: z.object({
    title: z.string(),
    description: z.string(),
    placeholder: z.string(),
    buttonText: z.string(),
    buttonAriaLabel: z.string(),
  }),
  linkColumns: z.array(LinkColumnSchema),
  socialLinks: z.array(SocialLinkSchema),
  copyright: z.string().min(1),
  disclaimer: z.string().min(1),
  developerLink: z
    .object({
      text: z.string().min(1),
      href: z.string().url(),
    })
    .optional(),
});

export const FooterLocaleSchema = z.object({
  footer: FooterContentSchema.optional(),
});
