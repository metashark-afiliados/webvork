// src/lib/utils/theme.utils.ts
/**
 * @file theme.utils.ts
 * @description Aparato helper para la gestión de temas.
 *              Refactorizado para utilizar un tipo de contrato explícito (`ThemeObject`),
 *              mejorando la seguridad de tipos y la mantenibilidad.
 * @version 4.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/lib/utils/theme.utils.ts.md
 */
import { GLOBAL_DESIGN_TOKENS } from "@config/branding.config";
import type { CampaignTheme } from "@/lib/i18n/campaign.data.processor";

/**
 * @type ThemeObject
 * @description Define el contrato explícito para cualquier objeto de tema que pueda
 *              ser procesado por este módulo. Es la SSoT para la estructura de temas.
 */
type ThemeObject = {
  colors?: Record<string, string>;
  rgbColors?: Record<string, string>;
  fonts?: Record<string, string>;
};

/**
 * @function generateCssVariablesFromThemeObject
 * @description Función genérica interna que convierte un objeto de tema en una
 *              cadena de texto CSS de variables para :root.
 * @private
 * @param {ThemeObject} themeObject - El objeto que contiene los tokens de diseño.
 * @returns {string | null} La cadena de texto CSS o null si el objeto está vacío.
 */
function generateCssVariablesFromThemeObject(
  themeObject: ThemeObject
): string | null {
  const cssVariables: string[] = [];

  if (themeObject.colors) {
    for (const [key, value] of Object.entries(themeObject.colors)) {
      cssVariables.push(`--${key}: ${value};`);
    }
  }

  if (themeObject.rgbColors) {
    for (const [key, value] of Object.entries(themeObject.rgbColors)) {
      cssVariables.push(`--${key}-rgb: ${value};`);
    }
  }

  if (themeObject.fonts) {
    for (const [key, value] of Object.entries(themeObject.fonts)) {
      cssVariables.push(`--font-${key}: ${value};`);
    }
  }

  if (cssVariables.length === 0) {
    return null;
  }

  return `:root { ${cssVariables.join(" ")} }`;
}

/**
 * @function generateThemeVariablesStyle
 * @description Genera la cadena de texto CSS para el tema global del portal.
 * @returns {string | null} Una cadena de texto formateada o null.
 */
export function generateThemeVariablesStyle(): string | null {
  return generateCssVariablesFromThemeObject(GLOBAL_DESIGN_TOKENS);
}

/**
 * @function generateCampaignThemeVariablesStyle
 * @description Genera la cadena de texto CSS para un tema de campaña específico.
 * @param {CampaignTheme} theme - El objeto de tema de la campaña.
 * @returns {string | null} Una cadena de texto CSS o null.
 */
export function generateCampaignThemeVariablesStyle(
  theme: CampaignTheme
): string | null {
  // Guarda de seguridad para temas nulos o undefined
  if (!theme) {
    return null;
  }
  return generateCssVariablesFromThemeObject(theme);
}
// src/lib/utils/theme.utils.ts
