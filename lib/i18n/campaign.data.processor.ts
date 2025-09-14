// src/lib/i18n/campaign.data.processor.ts
/**
 * @file campaign.data.processor.ts
 * @description Aparato Atómico: Procesador de Datos de Campaña. Su única
 *              responsabilidad es fusionar y validar los datos de la campaña.
 *              - v2.0.0: Se adapta para consumir la SSoT `sectionsConfig` directamente,
 *                resolviendo el error de importación y la cascada de fallos de tipo.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import "server-only";
import { z } from "zod";
import { i18nSchema, type Dictionary } from "@/lib/schemas/i18n.schema";
import { type Locale } from "@/lib/i18n.config";
// --- INICIO DE CORRECCIÓN ---
// Se importa la SSoT `sectionsConfig` y el tipo `SectionName`.
import { sectionsConfig, type SectionName } from "@/lib/config/sections.config";
// --- FIN DE CORRECCIÓN ---
import { logger } from "@/lib/logging";

// Se derivan los nombres directamente de la SSoT.
const sectionNamesList = Object.keys(sectionsConfig) as [
  SectionName,
  ...SectionName[],
];

// El schema y tipo del tema viven aquí, ya que es su dominio de procesamiento.
export const CampaignThemeSchema = z.object({
  colors: z.record(z.string(), z.string()).optional(),
  fonts: z.record(z.string(), z.string()).optional(),
  layout: z.object({
    sections: z.array(
      z.object({
        // Se utiliza la lista de nombres derivada para construir el enum.
        name: z.enum(sectionNamesList),
      })
    ),
  }),
});
export type CampaignTheme = z.infer<typeof CampaignThemeSchema>;

/**
 * @function processCampaignData
 * @description Toma todos los datos cargados, los fusiona y los valida contra sus schemas SSoT.
 * @param globalDictionary El diccionario base del portal.
 * @param campaignContent El contenido específico de la campaña.
 * @param campaignTheme El tema específico de la campaña.
 * @param locale El locale actual.
 * @returns {{ dictionary: Dictionary, theme: CampaignTheme }} Los datos procesados y validados.
 * @throws {Error} Si la validación del diccionario o del tema falla.
 */
export function processCampaignData(
  globalDictionary: Dictionary,
  campaignContent: any,
  campaignTheme: any,
  locale: Locale
): { dictionary: Dictionary; theme: CampaignTheme } {
  logger.trace(
    `[Procesador] Procesando y validando datos para locale: ${locale}`
  );

  const campaignLocaleContent = campaignContent[locale] || {};
  const fullMergedDictionary = {
    ...globalDictionary,
    ...campaignLocaleContent,
  };

  const dictValidation = i18nSchema.safeParse(fullMergedDictionary);
  if (!dictValidation.success) {
    logger.error(
      `[Procesador] Error de validación del diccionario fusionado para el locale "${locale}":`,
      {
        errors: dictValidation.error.flatten().fieldErrors,
      }
    );
    throw new Error("El contenido de la campaña es inválido tras la fusión.");
  }

  const themeValidation = CampaignThemeSchema.safeParse(campaignTheme);
  if (!themeValidation.success) {
    logger.error(`[Procesador] Error de validación del tema de la campaña:`, {
      errors: themeValidation.error.flatten().fieldErrors,
    });
    throw new Error("El tema de la campaña es inválido.");
  }

  logger.trace(`[Procesador] Datos validados exitosamente.`);
  return {
    dictionary: dictValidation.data,
    theme: themeValidation.data,
  };
}
// src/lib/i18n/campaign.data.processor.ts
