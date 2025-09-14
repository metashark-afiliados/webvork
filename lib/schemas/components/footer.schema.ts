// lib/schemas/components/footer.schema.ts
/**
 * @file footer.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente Footer.
 *              - v4.0.0 (Portal-Grade Upgrade): Evolucionado para soportar una
 *                sección de newsletter y una lista de redes sociales con iconos.
 * @version 4.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";
import { LucideIconNameSchema } from "@/config/lucide-icon-names";

const LinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

const LinkColumnSchema = z.object({
  title: z.string().min(1),
  links: z.array(LinkSchema),
});

// <-- [NUEVO] Schema para redes sociales -->
const SocialLinkSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  icon: LucideIconNameSchema,
});

// Define la estructura para un único locale.
export const FooterLocaleSchema = z.object({
  footer: z
    .object({
      logoName: z.string().optional(),
      // <-- [NUEVO] Contenido para la sección de newsletter -->
      newsletter: z.object({
        title: z.string(),
        description: z.string(),
        placeholder: z.string(),
        buttonText: z.string(),
      }),
      linkColumns: z.array(LinkColumnSchema),
      // <-- [NUEVO] Lista de redes sociales -->
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
