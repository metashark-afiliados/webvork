// src/lib/schemas/components/header.schema.ts
/**
 * @file header.schema.ts
 * @description Esquema de Zod que define el contrato de datos para el contenido
 *              del nuevo Header profesional. Corregido con tipado explícito para
 *              soportar correctamente la recursividad.
 * @version 5.1.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";

// --- Tipado Explícito para Recursividad ---
type NavLink = {
  label: string;
  href: string;
  subLinks?: NavLink[];
};

// <<-- CORRECCIÓN: Se añade el tipo explícito z.ZodType<NavLink>
const NavLinkSchema: z.ZodType<NavLink> = z.lazy(() =>
  z.object({
    label: z.string(),
    href: z.string(),
    subLinks: z.array(NavLinkSchema).optional(),
  })
);

export const HeaderLocaleSchema = z.object({
  header: z.object({
    logoUrl: z.string().startsWith("/"),
    logoAlt: z.string(),
    navLinks: z.array(NavLinkSchema),
    ctaButton: z.object({
      label: z.string(),
      href: z.string(),
    }),
  }),
});

export const HeaderI18nSchema = z.object({
  "es-ES": HeaderLocaleSchema,
  "pt-BR": HeaderLocaleSchema,
  "en-US": HeaderLocaleSchema,
  "it-IT": HeaderLocaleSchema,
});
// src/lib/schemas/components/header.schema.ts
