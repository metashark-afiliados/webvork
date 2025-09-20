// RUTA: lib/theming/theme-utils.ts
/**
 * @file theme-utils.ts
 * @description SSoT para utilidades puras y atómicas de theming.
 * @version 8.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { type AssembledTheme } from "@/shared/lib/schemas/theming/assembled-theme.schema";
import { logger } from "@/shared/lib/logging";

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

export function generateCssVariablesFromTheme(
  theme: Partial<AssembledTheme>
): string {
  let cssString = "";
  const lightVars: string[] = [];
  const darkVars: string[] = [];

  if (theme.colors) {
    for (const [key, value] of Object.entries(theme.colors)) {
      if (typeof value === "string" && key !== "dark") {
        lightVars.push(`--${key}: ${value};`);
      }
    }
  }

  if (theme.colors?.dark) {
    for (const [key, value] of Object.entries(theme.colors.dark)) {
      if (typeof value === "string") {
        darkVars.push(`--${key}: ${value};`);
      }
    }
  }

  if (theme.fonts) {
    for (const [key, value] of Object.entries(theme.fonts)) {
      const cssVarName = key.startsWith("--") ? key : `--font-${key}`;
      lightVars.push(`${cssVarName}: ${value};`);
    }
  }

  if (theme.geometry) {
    for (const [key, value] of Object.entries(theme.geometry)) {
      lightVars.push(`${key}: ${value};`);
    }
  }

  if (lightVars.length > 0) {
    cssString += `:root { ${lightVars.join(" ")} }`;
  }

  if (darkVars.length > 0) {
    cssString += ` .dark { ${darkVars.join(" ")} }`;
  }

  logger.trace(
    `[ThemeUtils] Generada cadena de variables CSS de ${cssString.length} caracteres.`
  );
  return cssString.trim();
}
