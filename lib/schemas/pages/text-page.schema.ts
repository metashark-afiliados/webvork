// src/lib/schemas/pages/text-page.schema.ts
import { z } from "zod";

/**
 * @file text-page.schema.ts
 * @description Schema genérico y reutilizable para páginas de contenido estático.
 * @version 1.0.0
 */

// Define un bloque de contenido, que puede ser un párrafo o un subtítulo.
const ContentBlockSchema = z.object({
  type: z.enum(["h2", "p"]),
  text: z.string(),
});

// Define la estructura para el contenido de una página de texto en un solo locale.
export const TextPageLocaleSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  content: z.array(ContentBlockSchema),
});

// Este schema se usará para definir las claves 'aboutPage', 'privacyPage', etc.
// en el ensamblador principal.
// src/lib/schemas/pages/text-page.schema.ts
