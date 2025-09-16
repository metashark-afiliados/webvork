// lib/schemas/theming/fragments/fonts.schema.ts
/**
 * @file fonts.schema.ts
 * @description SSoT para el contrato de datos de un fragmento de tipografía.
 *              Define la estructura que debe tener cualquier archivo de fuentes
 *              (ej. `poppins-inter.fonts.json`) en el sistema de theming.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";
import { logger } from "@/lib/logging";

logger.trace(
  "[Schema] Definiendo el contrato para fragmentos de tipografía..."
);

/**
 * @const FontsObjectSchema
 * @description Valida el objeto `fonts` interno. Las claves `sans` y `serif`
 *              son opcionales, permitiendo que un fragmento defina solo una
 *              de ellas, ambas, o ninguna si solo hereda.
 */
const FontsObjectSchema = z.object({
  sans: z.string().optional(),
  serif: z.string().optional(),
});

/**
 * @const FontsFragmentSchema
 * @description El schema principal para un archivo de fragmento de fuentes.
 *              Valida que el archivo contenga una clave raíz "fonts" cuyo
 *              valor sea un objeto que cumpla con `FontsObjectSchema`.
 */
export const FontsFragmentSchema = z.object({
  fonts: FontsObjectSchema,
});

/**
 * @type FontsFragment
 * @description Tipo inferido a partir del schema, representa un fragmento de
 *              tipografía validado.
 */
export type FontsFragment = z.infer<typeof FontsFragmentSchema>;
// lib/schemas/theming/fragments/fonts.schema.ts
