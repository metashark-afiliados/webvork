// RUTA: lib/schemas/components/footer.schema.ts

/**
 * @file footer.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente Footer.
 *              v5.1.0 (MEA/UX Enhancement): Se añade el campo 'name' a los
 *              socialLinks para ser utilizado en los tooltips, mejorando la
 *              accesibilidad y la experiencia de usuario.
 * @version 5.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";
import { LucideIconNameSchema } from "@/config/lucide-icon-names";
import { logger } from "@/lib/logging";

logger.trace("[Schema] Definiendo contrato para [Footer] v5.1");

const LinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

const LinkColumnSchema = z.object({
  title: z.string().min(1),
  links: z.array(LinkSchema),
});

const SocialLinkSchema = z.object({
  name: z.string(), // Utilizado para el tooltip y el aria-label
  url: z.string().url(),
  icon: LucideIconNameSchema,
});

export type Link = z.infer<typeof LinkSchema>;
export type LinkColumn = z.infer<typeof LinkColumnSchema>;
export type SocialLink = z.infer<typeof SocialLinkSchema>;

export const FooterLocaleSchema = z.object({
  footer: z
    .object({
      logoName: z.string().optional(),
      newsletter: z.object({
        title: z.string(),
        description: z.string(),
        placeholder: z.string(),
        buttonText: z.string(),
        buttonAriaLabel: z.string(), // <-- MEJORA MEA/UX
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
    })
    .optional(),
});
