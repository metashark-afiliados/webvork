// app/[locale]/(dev)/dev/campaign-suite/_actions/_utils/campaignMapManager.ts
/**
 * @file campaignMapManager.ts
 * @description Utilidad para gestionar la lectura y escritura del campaign.map.json.
 * @version 1.3.0 (Atomic Map Update)
 * @author RaZ Podestá - MetaShark Tech
 */
import { promises as fs } from "fs";
import path from "path";
import {
  CampaignMapSchema,
  type CampaignMap,
  type CampaignVariantMap,
} from "@/lib/schemas/campaigns/campaign-map.schema";
import type { CampaignDraft } from "../../_types/draft.types";
import { logger } from "@/lib/logging";

/**
 * @interface CampaignVariantFileNames
 * @description Contrato de datos para los nombres de archivo generados.
 */
export interface CampaignVariantFileNames {
  themeFileName: string;
  contentFileName: string;
}

/**
 * @function getOrCreateNextVariantId
 * @description Lee el mapa de campaña y determina el próximo ID de variante disponible.
 *              No modifica el archivo en disco.
 * @param {string} campaignDir El directorio de la campaña de producción donde reside el mapa.
 * @returns {Promise<{ nextVariantId: string; campaignMap: CampaignMap }>} El próximo ID de variante y el mapa de campaña cargado.
 * @throws {Error} Si el mapa base no se puede leer o parsear.
 */
export async function getOrCreateNextVariantId(
  campaignDir: string
): Promise<{ nextVariantId: string; campaignMap: CampaignMap }> {
  const mapPath = path.join(campaignDir, "campaign.map.json");

  let campaignMap: CampaignMap;
  try {
    const mapContent = await fs.readFile(mapPath, "utf-8");
    campaignMap = CampaignMapSchema.parse(JSON.parse(mapContent));
  } catch (error) {
    logger.error(
      "[MapManager] No se pudo leer o parsear el campaign.map.json.",
      { error }
    );
    throw new Error(
      "El archivo campaign.map.json de la campaña base está corrupto o no existe."
    );
  }

  const existingIds = Object.keys(campaignMap.variants).map((id) =>
    parseInt(id, 10)
  );
  const nextVariantId = (Math.max(0, ...existingIds) + 1)
    .toString()
    .padStart(2, "0");

  logger.trace(
    `[MapManager] Próximo ID de variante generado: ${nextVariantId}`
  );
  return { nextVariantId, campaignMap };
}

/**
 * @function generateCampaignFileNames
 * @description Genera los nombres de archivo para el tema y el contenido basados en el borrador.
 * @param {CampaignDraft} draft El estado del borrador de la campaña.
 * @param {string} newVariantId El ID de la nueva variante.
 * @returns {CampaignVariantFileNames} Los nombres de archivo finales.
 */
export function generateCampaignFileNames(
  draft: CampaignDraft,
  newVariantId: string
): CampaignVariantFileNames {
  const { baseCampaignId, variantName } = draft;

  if (!baseCampaignId || !variantName || !draft.themeConfig) {
    throw new Error(
      "[MapManager] Error: Datos del borrador incompletos para generar nombres de archivo."
    );
  }

  const dateStamp = new Date().toISOString().split("T")[0].replace(/-/g, "");
  const safeVariantName = variantName.replace(/\s+/g, "_");

  const themeFileName = `${baseCampaignId}_${dateStamp}_THEME_${newVariantId}_${safeVariantName}.json`;
  const contentFileName = `${baseCampaignId}_${dateStamp}_CONTENT_${newVariantId}_${safeVariantName}.json`;

  logger.trace(
    `[MapManager] Nombres de archivo generados: Tema='${themeFileName}', Contenido='${contentFileName}'`
  );
  return { themeFileName, contentFileName };
}

/**
 * @function updateCampaignMapEntry
 * @description Añade o actualiza una entrada de variante en el objeto del mapa de campaña y lo guarda.
 * @param {string} campaignDir El directorio de la campaña de producción donde reside el mapa.
 * @param {string} newVariantId El ID de la nueva variante a añadir/actualizar.
 * @param {CampaignDraft} draft El estado completo del borrador de la campaña.
 * @param {CampaignVariantFileNames} fileNames Los nombres de archivo generados para el tema y el contenido.
 * @param {CampaignMap} currentCampaignMap El objeto del mapa de campaña a modificar (en memoria).
 * @returns {Promise<void>}
 * @throws {Error} Si los datos del borrador son incompletos o si no se pudo escribir el mapa.
 */
export async function updateCampaignMapEntry(
  campaignDir: string,
  newVariantId: string,
  draft: CampaignDraft,
  fileNames: CampaignVariantFileNames,
  currentCampaignMap: CampaignMap // Recibe el objeto del mapa en memoria
): Promise<void> {
  logger.trace(
    `[MapManager] Actualizando entrada para variante ${newVariantId} en campaign.map.json...`
  );
  const { variantName, seoKeywords, themeConfig } = draft;

  if (!variantName || !seoKeywords || !themeConfig) {
    throw new Error(
      "[MapManager] Error: Datos de identificación del borrador incompletos para actualizar el mapa."
    );
  }

  const mapPath = path.join(campaignDir, "campaign.map.json");

  const netString = [
    `cp-${themeConfig.colorPreset || "default"}`,
    `ft-${themeConfig.fontPreset || "default-sans"}`,
    `rd-${themeConfig.radiusPreset || "default"}`,
  ].join(".");

  const newVariantEntry: CampaignVariantMap = {
    name: variantName,
    description: `Variante generada por la SDC el ${new Date().toLocaleDateString()}`,
    theme: netString,
    content: `./content/${fileNames.contentFileName}`,
    variantSlug: variantName.toLowerCase().replace(/\s+/g, "-"),
    seoKeywordSlug: seoKeywords.toLowerCase().replace(/\s+/g, "-"),
    themeOverrides: draft.themeConfig.themeOverrides ?? undefined,
  };

  currentCampaignMap.variants[newVariantId] = newVariantEntry;

  await fs.writeFile(mapPath, JSON.stringify(currentCampaignMap, null, 2));
  logger.success("[MapManager] campaign.map.json actualizado con éxito.", {
    newVariantId,
  });
}
