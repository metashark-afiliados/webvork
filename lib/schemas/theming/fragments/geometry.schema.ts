// lib/schemas/theming/fragments/geometry.schema.ts
/**
 * @file geometry.schema.ts
 * @description SSoT para el contrato de datos de un fragmento de geometría.
 *              Define la estructura para archivos de radios, bordes, etc.
 *              (ej. `soft.radii.json`) en el sistema de theming.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";
import { logger } from "@/lib/logging";

logger.trace("[Schema] Definiendo el contrato para fragmentos de geometría...");

/**
 * @const GeometryObjectSchema
 * @description Valida el objeto `geometry` interno. Cada clave corresponde a una
 *              variable CSS de geometría y es opcional, permitiendo que los
 *              fragmentos definan solo las propiedades que necesitan modificar.
 */
const GeometryObjectSchema = z.object({
  "--radius": z.string().optional(),
  "--border": z.string().optional(),
  "--input": z.string().optional(),
  "--ring": z.string().optional(),
});

/**
 * @const GeometryFragmentSchema
 * @description El schema principal para un archivo de fragmento de geometría.
 *              Valida que el archivo contenga una clave raíz "geometry" cuyo
 *              valor sea un objeto que cumpla con `GeometryObjectSchema`.
 */
export const GeometryFragmentSchema = z.object({
  geometry: GeometryObjectSchema,
});

/**
 * @type GeometryFragment
 * @description Tipo inferido a partir del schema, representa un fragmento de
 *              geometría validado.
 */
export type GeometryFragment = z.infer<typeof GeometryFragmentSchema>;
// lib/schemas/theming/fragments/geometry.schema.ts
