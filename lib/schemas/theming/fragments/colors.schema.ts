// lib/schemas/theming/fragments/colors.schema.ts
/**
 * @file colors.schema.ts
 * @description SSoT para el contrato de datos de un fragmento de paleta de colores.
 *              Define la estructura que debe tener cualquier archivo de paleta de
 *              colores (ej. `scientific.colors.json`) en el sistema de theming.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";
import { logger } from "@/lib/logging";

logger.trace("[Schema] Definiendo el contrato para fragmentos de colores...");

/**
 * @const ColorsObjectSchema
 * @description Valida el objeto `colors` interno, asegurando que todas las
 *              claves de color semánticas requeridas por la UI estén presentes
 *              y sean una cadena de texto (que contendrá el valor HSL).
 */
const ColorsObjectSchema = z.object({
  background: z.string(),
  foreground: z.string(),
  card: z.string(),
  cardForeground: z.string(),
  popover: z.string(),
  popoverForeground: z.string(),
  primary: z.string(),
  primaryForeground: z.string(),
  secondary: z.string(),
  secondaryForeground: z.string(),
  muted: z.string(),
  mutedForeground: z.string(),
  accent: z.string(),
  accentForeground: z.string(),
  destructive: z.string(),
  destructiveForeground: z.string(),
});

/**
 * @const ColorsFragmentSchema
 * @description El schema principal para un archivo de fragmento de colores.
 *              Valida que el archivo contenga una clave raíz "colors" cuyo
 *              valor sea un objeto que cumpla con `ColorsObjectSchema`.
 */
export const ColorsFragmentSchema = z.object({
  colors: ColorsObjectSchema,
});

/**
 * @type ColorsFragment
 * @description Tipo inferido a partir del schema, representa un fragmento de
 *              paleta de colores validado.
 */
export type ColorsFragment = z.infer<typeof ColorsFragmentSchema>;
// lib/schemas/theming/fragments/colors.schema.ts
