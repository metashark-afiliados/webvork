// lib/utils/theme.utils.ts
/**
 * @file theme.utils.ts
 * @description SSoT para utilidades de lógica pura relacionadas con el theming.
 *              v5.0.0 (Dual-Mode Engine): La función `generateCampaignThemeVariablesStyle`
 *              ahora es capaz de generar reglas para modo claro y oscuro.
 * @version 5.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { type AssembledTheme } from "@/lib/schemas/theming/assembled-theme.schema";
import { logger } from "@/lib/logging";

// ... (la función parseThemeNetString no cambia)
export type ParsedNet = { [key: string]: string };
export function parseThemeNetString(netString: string): ParsedNet {
  logger.trace(`[ThemeUtils] Parseando cadena NET: "${netString}"`);
  const parsed: ParsedNet = {};
  const traces = netString.split(".");
  for (const trace of traces) {
    const parts = trace.split("-");
    if (parts.length < 2) {
      logger.warn(
        `[ThemeUtils] Trazo inválido encontrado y omitido: "${trace}"`
      );
      continue;
    }
    const prefix = parts[0];
    const name = parts.slice(1).join("-");
    parsed[prefix] = name;
  }
  return parsed;
}

/**
 * @function generateCampaignThemeVariablesStyle
 * @description Genera una cadena de reglas CSS a partir de un objeto de tema,
 *              soportando ahora modo claro y oscuro.
 * @param {AssembledTheme} theme - El objeto de tema final y validado.
 * @returns {string} Una cadena de texto con las reglas CSS completas.
 */
export function generateCampaignThemeVariablesStyle(
  theme: AssembledTheme
): string {
  logger.trace(
    "[ThemeUtils v5.0] Generando estilos de campaña de doble modalidad."
  );
  let cssString = "";

  // --- [INICIO DE LÓGICA DE DOBLE MODALIDAD] ---
  const generateCssBlock = (selector: string, colors: object | undefined) => {
    if (!colors || Object.keys(colors).length === 0) return "";
    let block = `${selector} {`;
    for (const [key, value] of Object.entries(colors)) {
      if (key !== "dark") {
        // Ignoramos la clave 'dark' en sí misma
        const cssVarName = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
        block += `${cssVarName}: ${value};`;
      }
    }
    return block + "}";
  };

  // Generar bloque :root (modo claro)
  cssString += generateCssBlock(":root", theme.colors);

  // Generar bloque .dark si existe
  if (theme.colors?.dark) {
    cssString += generateCssBlock(".dark", theme.colors.dark);
  }
  // --- [FIN DE LÓGICA DE DOBLE MODALIDAD] ---

  // Lógica para fuentes y geometría (sin cambios)
  let baseStyles = ":root {";
  if (theme.fonts) {
    for (const [key, value] of Object.entries(theme.fonts)) {
      baseStyles += `--font-${key}: ${value};`;
    }
  }
  if (theme.geometry) {
    for (const [key, value] of Object.entries(theme.geometry)) {
      baseStyles += `${key}: ${value};`;
    }
  }
  baseStyles += "}";

  return cssString + baseStyles;
}
// lib/utils/theme.utils.ts
