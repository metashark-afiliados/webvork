// app/[locale]/(dev)/dev/layout-configurator/_actions/getLayoutForVariant.action.ts
/**
 * @file getLayoutForVariant.action.ts
 * @description Server Action atómica para obtener la configuración de layout
 *              de una variante de campaña específica.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use server";

import { promises as fs } from "fs";
import path from "path";
import { resolveCampaignAssets } from "@/lib/i18n/campaign.map.resolver";
import { logger } from "@/lib/logging";

type SectionLayout = { name: string };

/**
 * @action getLayoutForVariant
 * @description Lee el archivo de tema de una variante de campaña y devuelve
 *              de forma segura su array de `layout.sections`.
 * @param {string} campaignId - El ID de la campaña a consultar.
 * @param {string} variantId - El ID de la variante a consultar.
 * @returns {Promise<SectionLayout[]>} Una promesa que resuelve a la lista de secciones.
 * @throws {Error} Si el archivo de tema no puede ser leído, parseado, o no tiene la estructura esperada.
 */
export async function getLayoutForVariant(
  campaignId: string,
  variantId: string
): Promise<SectionLayout[]> {
  logger.info(
    `[Action] Ejecutando getLayoutForVariant para ${campaignId}/${variantId}`
  );
  try {
    const assetMap = await resolveCampaignAssets(campaignId, variantId);
    const themePath = path.join(
      process.cwd(),
      "src",
      "content",
      "campaigns",
      campaignId,
      assetMap.theme.replace("./", "") // Normaliza la ruta relativa
    );

    const themeContent = await fs.readFile(themePath, "utf-8");
    const themeJson = JSON.parse(themeContent);

    // Valida que la estructura esperada exista antes de devolverla
    if (
      themeJson?.layout?.sections &&
      Array.isArray(themeJson.layout.sections)
    ) {
      logger.success(
        `[Action] Layout para ${campaignId}/${variantId} encontrado y devuelto.`
      );
      return themeJson.layout.sections;
    } else {
      throw new Error(
        'La propiedad "layout.sections" no fue encontrada en el archivo de tema.'
      );
    }
  } catch (error) {
    logger.error(`[Action] Fallo en getLayoutForVariant`, {
      campaignId,
      variantId,
      error,
    });
    // En un entorno de producción, podríamos querer devolver un array vacío
    // pero para desarrollo, es mejor lanzar el error para depuración.
    throw new Error(
      `No se pudo obtener el layout para la variante: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
// app/[locale]/(dev)/dev/layout-configurator/_actions/getLayoutForVariant.action.ts
