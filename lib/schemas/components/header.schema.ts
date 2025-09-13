// lib/schemas/components/header.schema.ts
/**
 * @file header.schema.ts
 * @description Esquema de Zod que define el contrato de datos para el contenido
 *              del Header. Corregida la definición de tipo duplicada.
 * @version 6.1.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";

// --- INICIO DE CORRECCIÓN ---
// Se define el schema base primero.
const baseNavLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

// El tipo recursivo se define una sola vez, utilizando el schema base.
type NavLink = z.infer<typeof baseNavLinkSchema> & {
  subLinks?: NavLink[];
};

// El schema recursivo ahora usa el tipo explícito para validarse a sí mismo.
const NavLinkSchema: z.ZodType<NavLink> = baseNavLinkSchema.extend({
  subLinks: z.lazy(() => z.array(NavLinkSchema)).optional(),
});

// Se exporta el tipo que ya fue definido.
export type { NavLink };
// --- FIN DE CORRECCIÓN ---

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
// lib/schemas/components/header.schema.ts
