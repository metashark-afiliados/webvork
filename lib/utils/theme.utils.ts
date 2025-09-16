// lib/utils/theme.utils.ts
/**
 * @file theme.utils.ts
 * @description SSoT para utilidades de lógica pura relacionadas con el theming.
 *              - v4.0.0 (Coherence Fix): Se elimina la función 'generateGlobalThemeVariablesStyle'.
 *                La lógica de theming global reside estáticamente en globals.css. Este
 *                módulo se enfoca exclusivamente en la lógica de temas de campaña dinámicos.
 * @version 4.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { type AssembledTheme } from "@/lib/schemas/theming/assembled-theme.schema";
import { logger } from "@/lib/logging";

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

  logger.trace("[ThemeUtils] Cadena NET parseada exitosamente.", {
    result: parsed,
  });
  return parsed;
}

/**
 * @function generateCampaignThemeVariablesStyle
 * @description Genera una cadena de reglas CSS a partir de un objeto de tema de campaña ensamblado.
 * @param {AssembledTheme} theme - El objeto de tema final y validado de la campaña.
 * @returns {string} Una cadena de texto que contiene las reglas CSS para inyectar.
 */
export function generateCampaignThemeVariablesStyle(
  theme: AssembledTheme
): string {
  logger.trace(
    "[ThemeUtils] Generando cadena de estilos CSS para el tema de campaña."
  );
  let cssString = ":root {";
  if (theme.colors) {
    for (const [key, value] of Object.entries(theme.colors)) {
      const cssVarName = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
      cssString += `${cssVarName}: ${value};`;
    }
  }
  if (theme.fonts) {
    for (const [key, value] of Object.entries(theme.fonts)) {
      cssString += `--font-${key}: ${value};`;
    }
  }
  if (theme.geometry) {
    for (const [key, value] of Object.entries(theme.geometry)) {
      cssString += `${key}: ${value};`;
    }
  }
  cssString += "}";
  logger.trace("[ThemeUtils] Cadena de estilos de campaña generada.", {
    css: cssString,
  });
  return cssString;
}
// lib/utils/theme.utils.ts
