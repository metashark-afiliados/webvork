// lib/schemas/components/footer.schema.ts
/**
 * @file footer.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente Footer.
 *              - v5.0.0 (Type Safety Upgrade): Exporta los tipos inferidos
 *                `LinkColumn`, `Link`, y `SocialLink` para ser consumidos
 *                directamente por el componente, garantizando la seguridad de tipos.
 * @version 5.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";
import { LucideIconNameSchema } from "@/config/lucide-icon-names";
import { logger } from "@/lib/logging";

logger.trace("[Schema] Definiendo contrato para [Footer] v5.0");

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

// --- [INICIO] REFACTORIZACIÓN ARQUITECTÓNICA ---
export type Link = z.infer<typeof LinkSchema>;
export type LinkColumn = z.infer<typeof LinkColumnSchema>;
export type SocialLink = z.infer<typeof SocialLinkSchema>;
// --- [FIN] REFACTORIZACIÓN ARQUITECTÓNICA ---

export const FooterLocaleSchema = z.object({
  footer: z
    .object({
      logoName: z.string().optional(),
      newsletter: z.object({
        title: z.string(),
        description: z.string(),
        placeholder: z.string(),
        buttonText: z.string(),
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
// lib/schemas/components/footer.schema.ts
