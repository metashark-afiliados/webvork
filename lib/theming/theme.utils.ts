// lib/utils/theme.utils.ts
/**
 * @file theme.utils.ts
 * @description SSoT para utilidades de theming.
 * @version 7.0.0 (Function Restoration)
 * @author RaZ Podestá - MetaShark Tech
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
    if (parts.length < 2) continue;
    const prefix = parts[0];
    const name = parts.slice(1).join("-");
    parsed[prefix] = name;
  }
  return parsed;
}

/**
 * @function generateCssVariablesFromTheme
 * @description Genera una cadena de CSS con variables a partir de un objeto de tema.
 * @param theme - El objeto de tema ensamblado.
 * @returns Una cadena de texto con reglas CSS para :root.
 */
export function generateCssVariablesFromTheme(
  theme: Partial<AssembledTheme>
): string {
  let cssString = ":root {";
  if (theme.colors) {
    for (const [key, value] of Object.entries(theme.colors)) {
      if (typeof value === "string") {
        cssString += `--${key}: ${value};`;
      }
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
  return cssString;
}
