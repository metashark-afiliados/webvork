// lib/i18n/campaign.data.processor.ts
/**
 * @file campaign.data.processor.ts
 * @description Aparato Atómico: Procesador de Datos de Campaña.
 *              v3.1.0 - Corregido error de importación. Ahora consume el tipo
 *              `AssembledTheme` desde su SSoT en `lib/schemas`.
 * @version 3.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
import "server-only";
import { type Dictionary } from "@/lib/schemas/i18n.schema";
import {
  AssembledThemeSchema,
  type AssembledTheme, // <-- IMPORTACIÓN CORREGIDA
} from "@/lib/schemas/theming/assembled-theme.schema";
import { logger } from "@/lib/logging";

/**
 * @function processCampaignData
 * @description Fusiona diccionarios y valida los datos finales de la campaña.
 * @param globalDictionary El diccionario base del portal.
 * @param campaignLocaleContent El contenido específico de la campaña para el locale actual.
 * @param finalAssembledTheme El objeto de tema final, ya fusionado.
 * @returns {{ dictionary: Dictionary, theme: AssembledTheme }} Los datos procesados.
 * @throws {Error} Si la validación del tema falla.
 */
export function processCampaignData(
  globalDictionary: Dictionary,
  campaignLocaleContent: any,
  finalAssembledTheme: any
): { dictionary: Dictionary; theme: AssembledTheme } {
  logger.trace(`[Procesador] Procesando y validando datos de campaña...`);

  const fullMergedDictionary = {
    ...globalDictionary,
    ...campaignLocaleContent,
  };

  const themeValidation = AssembledThemeSchema.safeParse(finalAssembledTheme);
  if (!themeValidation.success) {
    logger.error(`[Procesador] Error de validación del tema ensamblado:`, {
      errors: themeValidation.error.flatten().fieldErrors,
    });
    throw new Error("El tema final de la campaña es inválido.");
  }

  logger.trace(`[Procesador] Datos validados exitosamente.`);
  return {
    dictionary: fullMergedDictionary as Dictionary,
    theme: themeValidation.data,
  };
}
// lib/i18n/campaign.data.processor.ts
