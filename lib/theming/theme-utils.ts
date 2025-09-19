// RUTA: lib/theming/theme-utils.ts

/**
 * @file theme-utils.ts
 * @description SSoT para utilidades de theming.
 *              v8.0.0 (Dual-Mode Theming Engine & MEA): Refactorizado a un
 *              estándar de élite. Ahora es consciente del modo dual (claro/oscuro)
 *              y genera bloques de CSS separados, centralizando la lógica de
 *              theming y simplificando los componentes consumidores (MEA/UX Arquitectónica).
 * @version 8.0.0
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
 * @description Genera una cadena de CSS con variables a partir de un objeto de tema,
 *              manejando de forma inteligente los modos claro y oscuro.
 * @param theme - El objeto de tema ensamblado.
 * @returns Una cadena de texto con reglas CSS para :root y .dark.
 */
export function generateCssVariablesFromTheme(
  theme: Partial<AssembledTheme>
): string {
  let cssString = "";
  const lightVars: string[] = [];
  const darkVars: string[] = [];

  // Procesa colores base (modo claro)
  if (theme.colors) {
    for (const [key, value] of Object.entries(theme.colors)) {
      if (typeof value === "string" && key !== "dark") {
        lightVars.push(`--${key}: ${value};`);
      }
    }
  }

  // Procesa colores del modo oscuro
  if (theme.colors?.dark) {
    for (const [key, value] of Object.entries(theme.colors.dark)) {
      if (typeof value === "string") {
        darkVars.push(`--${key}: ${value};`);
      }
    }
  }

  // Procesa fuentes (se aplican a ambos modos)
  if (theme.fonts) {
    for (const [key, value] of Object.entries(theme.fonts)) {
      lightVars.push(`--font-${key}: ${value};`);
    }
  }

  // Procesa geometría (se aplica a ambos modos)
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

  return cssString.trim();
}
