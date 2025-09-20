// app/[locale]/(dev)/bavi/_actions/getBaviI18nContent.action.ts
/**
 * @file getBaviI18nContent.action.ts
 * @description Server Action soberana para obtener todo el contenido i18n
 *              necesario para el ecosistema BAVI en el cliente.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use server";

import { getDictionary } from "@/lib/i18n";
import { type Locale } from "@/lib/i18n.config";
import { logger } from "@/lib/logging";
import type { ActionResult } from "@/lib/types/actions.types";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

/**
 * @type BaviI18nContent
 * @description Contrato de datos para el payload de contenido que se enviará al cliente.
 *              Agrupa todo el contenido necesario para el `AssetUploader` y el `AssetSelectorModal`.
 */
export type BaviI18nContent = {
  baviUploader: NonNullable<Dictionary["baviUploader"]>;
  assetExplorer: NonNullable<Dictionary["assetExplorer"]>;
  // El PromptCreator es necesario por las etiquetas SESA.
  sesaOptions: NonNullable<Dictionary["promptCreator"]>["sesaOptions"];
};

/**
 * @function getBaviI18nContentAction
 * @description Obtiene el diccionario para un locale específico y extrae de forma segura
 *              todas las claves de contenido necesarias para los componentes del cliente de BAVI.
 * @param {Locale} locale - El locale para el cual obtener el contenido.
 * @returns {Promise<ActionResult<BaviI18nContent>>} Un objeto con el contenido i18n
 *          ensamblado, o un error si faltan datos críticos.
 */
export async function getBaviI18nContentAction(
  locale: Locale
): Promise<ActionResult<BaviI18nContent>> {
  logger.info(
    `[getBaviI18nContentAction] Solicitando contenido i18n para BAVI [locale: ${locale}]`
  );

  const { dictionary, error } = await getDictionary(locale);

  if (error) {
    logger.error(
      "[getBaviI18nContentAction] Fallo al cargar el diccionario base.",
      { error }
    );
    return {
      success: false,
      error: "No se pudo cargar el diccionario base.",
    };
  }

  // Se extraen y validan las claves de contenido necesarias.
  const { baviUploader, assetExplorer, promptCreator } = dictionary;

  if (!baviUploader || !assetExplorer || !promptCreator?.sesaOptions) {
    const missingKeys = [
      !baviUploader && "baviUploader",
      !assetExplorer && "assetExplorer",
      !promptCreator?.sesaOptions && "promptCreator.sesaOptions",
    ]
      .filter(Boolean)
      .join(", ");

    logger.error(
      `[getBaviI18nContentAction] Faltan claves de contenido i18n críticas: ${missingKeys}`
    );
    return {
      success: false,
      error: `El contenido i18n para la BAVI está incompleto. Faltan: ${missingKeys}.`,
    };
  }

  const contentPayload: BaviI18nContent = {
    baviUploader,
    assetExplorer,
    sesaOptions: promptCreator.sesaOptions,
  };

  logger.success(
    "[getBaviI18nContentAction] Contenido i18n para BAVI ensamblado con éxito."
  );

  return { success: true, data: contentPayload };
}
// app/[locale]/(dev)/bavi/_actions/getBaviI18nContent.action.ts
