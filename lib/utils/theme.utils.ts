// lib/utils/theme.utils.ts
/**
 * @file theme.utils.ts
 * @description Aparato helper para la gestión de temas.
 *              - v4.1.0: Corregida la ruta de importación de la configuración de branding.
 * @version 4.1.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/lib/utils/theme.utils.ts.md
 */
// --- CORRECCIÓN DE RUTA ---
import { GLOBAL_DESIGN_TOKENS } from "@/config/branding.config";
import type { CampaignTheme } from "@/lib/i18n/campaign.data.processor";

type ThemeObject = {
  colors?: Record<string, string>;
  rgbColors?: Record<string, string>;
  fonts?: Record<string, string>;
};

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

export function generateThemeVariablesStyle(): string | null {
  return generateCssVariablesFromThemeObject(GLOBAL_DESIGN_TOKENS);
}

export function generateCampaignThemeVariablesStyle(
  theme: CampaignTheme
): string | null {
  if (!theme) {
    return null;
  }
  return generateCssVariablesFromThemeObject(theme);
}
// lib/utils/theme.utils.ts
