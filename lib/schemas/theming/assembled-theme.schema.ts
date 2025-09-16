// lib/schemas/theming/assembled-theme.schema.ts
/**
 * @file assembled-theme.schema.ts
 * @description SSoT para el contrato de datos de un objeto de tema final y ensamblado.
 *              Valida la estructura de un tema después de que todos los fragmentos
 *              (base, colores, fuentes, geometría, etc.) han sido fusionados.
 * @version 2.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { z } from "zod";
import { logger } from "@/lib/logging";
import { ColorsFragmentSchema } from "./fragments/colors.schema";
import { FontsFragmentSchema } from "./fragments/fonts.schema";
import { GeometryFragmentSchema } from "./fragments/geometry.schema";

logger.trace(
  "[Schema] Definiendo el contrato para el tema ensamblado final..."
);

/**
 * @const LayoutSchema
 * @description Valida la estructura del layout de la página, definiendo las
 *              secciones y su orden. Es una propiedad opcional en el tema final.
 */
const LayoutSchema = z
  .object({
    sections: z.array(z.object({ name: z.string() })),
  })
  .optional();

/**
 * @const AssembledThemeSchema
 * @description El schema principal que valida el objeto de tema final.
 *              Se construye fusionando las formas (`.shape`) de los schemas de
 *              fragmentos atómicos. Cada fragmento es opcional, ya que un tema
 *              final puede no anular todas las partes del tema base global.
 */
export const AssembledThemeSchema = z.object({
  ...ColorsFragmentSchema.shape,
  ...FontsFragmentSchema.shape,
  ...GeometryFragmentSchema.shape,
  layout: LayoutSchema,
  // --- Platzhalter für zukünftige atomare Fragmente ---
  // Diese können hinzugefügt werden, sobald ihre Schemas definiert sind.
  shadows: z.record(z.string()).optional(),
  animations: z.record(z.string()).optional(),
  backgrounds: z.record(z.string()).optional(),
  breakpoints: z.record(z.string()).optional(),
  spacing: z.record(z.string()).optional(),
});

/**
 * @type AssembledTheme
 * @description Tipo inferido a partir del schema, representa un objeto de tema
 *              completo y validado, listo para ser consumido por el
 *              `CampaignThemeProvider`.
 */
export type AssembledTheme = z.infer<typeof AssembledThemeSchema>;
// lib/schemas/theming/assembled-theme.schema.ts
