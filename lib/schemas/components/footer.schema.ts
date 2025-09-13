// lib/schemas/components/footer.schema.ts
/**
 * @file footer.schema.ts
 * @description Esquema de Zod para el contenido i18n del componente Footer.
 *              - v3.0.0: Evolucionado para soportar una estructura de múltiples
 *                columnas de enlaces, alineando el contrato de datos con la UI real.
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";

const LinkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const LinkColumnSchema = z.object({
  title: z.string(),
  links: z.array(LinkSchema),
});

// Define la estructura para un único locale.
export const FooterLocaleSchema = z.object({
  footer: z
    .object({
      logoName: z.string(),
      linkColumns: z.array(LinkColumnSchema),
      copyright: z.string(),
      developerLink: z.object({
        text: z.string(),
        href: z.string().url(),
      }),
    })
    .optional(),
});
// lib/schemas/components/footer.schema.ts
