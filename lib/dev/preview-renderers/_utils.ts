// lib/dev/preview-renderers/_utils.ts
/**
 * @file _utils.ts
 * @description Utilidades para los renderizadores de previsualización atómicos.
 *              v1.1.0 (Schema Alignment): Corrige el mapeo del color del borde
 *              para leer desde `theme.geometry` en lugar de `theme.colors`,
 *              resolviendo el error de tipo TS2339.
 * @version 1.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
import type { AssembledTheme } from "@/lib/schemas/theming/assembled-theme.schema";
import { logger } from "@/lib/logging";

/**
 * @function getStyleFromTheme
 * @description Traduce un objeto de tema semántico a un objeto de estilo en línea
 *              compatible con el motor de renderizado de @vercel/og (Satori).
 * @param theme El objeto de tema ensamblado.
 * @returns Un objeto con claves de estilo listas para ser usadas.
 */
export function getStyleFromTheme(theme: AssembledTheme) {
  logger.trace("[Preview Utils] Mapeando tema a estilos en línea...");

  // --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
  // Se obtiene el color del borde desde la ubicación correcta del schema.
  const borderColorValue = theme.geometry?.["--border"] || "0 0% 89.8%"; // Fallback
  // --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---

  return {
    backgroundColor: `hsl(${theme.colors.background})`,
    color: `hsl(${theme.colors.foreground})`,
    borderColor: `hsl(${borderColorValue})`, // Se usa el valor corregido
    primaryColor: `hsl(${theme.colors.primary})`,
    primaryForegroundColor: `hsl(${theme.colors.primaryForeground})`,
    mutedBackgroundColor: `hsl(${theme.colors.muted})`,
    mutedForegroundColor: `hsl(${theme.colors.mutedForeground})`,
    accentColor: `hsl(${theme.colors.accent})`,
    accentForegroundColor: `hsl(${theme.colors.accentForeground})`,
  };
}
// lib/dev/preview-renderers/_utils.ts
