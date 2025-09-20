// app/[locale]/(dev)/dev/campaign-suite/_actions/_utils/assetGenerator.ts
/**
 * @file assetGenerator.ts
 * @description Motor de generación de activos de campaña. SSoT para la lógica de
 *              transformación de un borrador a archivos físicos.
 * @version 1.1.0 (Elite Compliance Leveling)
 * @author RaZ Podestá - MetaShark Tech
 */
import { promises as fs } from "fs";
import path from "path";
import { logger } from "@/shared/lib/logging";
import type { CampaignDraft } from "../../_types/draft.types";
import type {
  CampaignMap,
  CampaignVariantMap,
} from "@/shared/lib/schemas/campaigns/campaign-map.schema";
import { transformDraftToContentObject } from "./campaignDataTransformer";
import { generateCampaignFileNames } from "./campaignMapManager";

interface AssetGenerationResult {
  themePath: string;
  contentPath: string;
  mapPath: string;
  updatedMap: CampaignMap;
}

/**
 * @function generateCampaignAssets
 * @description Toma un borrador, un mapa de campaña, un ID de variante y un directorio de destino,
 *              y genera los archivos de tema y contenido, devolviendo el mapa actualizado.
 * @param {CampaignDraft} draft El borrador de campaña.
 * @param {CampaignMap} campaignMap El estado actual del mapa de campaña.
 * @param {string} variantId El ID para la nueva variante.
 * @param {string} outputDir El directorio base donde se escribirán los archivos.
 * @returns {Promise<AssetGenerationResult>} Las rutas de los archivos generados y el mapa actualizado.
 * @throws {Error} Si faltan datos en el borrador.
 */
export async function generateCampaignAssets(
  draft: CampaignDraft,
  campaignMap: CampaignMap,
  variantId: string,
  outputDir: string
): Promise<AssetGenerationResult> {
  const { variantName, seoKeywords, themeConfig } = draft;

  if (!variantName || !seoKeywords || !themeConfig) {
    const errorMsg =
      "[AssetGenerator] Datos de identificación del borrador incompletos.";
    logger.error(errorMsg, { draftId: draft.draftId });
    throw new Error(errorMsg);
  }

  const fileNames = generateCampaignFileNames(draft, variantId);
  const contentObject = transformDraftToContentObject(draft);
  const themeObject = {
    layout: { sections: draft.layoutConfig },
    themeOverrides: themeConfig.themeOverrides ?? {},
  };

  const themesDir = path.join(outputDir, "themes");
  const contentDir = path.join(outputDir, "content");
  await fs.mkdir(themesDir, { recursive: true });
  await fs.mkdir(contentDir, { recursive: true });

  const themePath = path.join(themesDir, fileNames.themeFileName);
  const contentPath = path.join(contentDir, fileNames.contentFileName);
  const mapPath = path.join(outputDir, "campaign.map.json");

  await fs.writeFile(themePath, JSON.stringify(themeObject, null, 2));
  await fs.writeFile(contentPath, JSON.stringify(contentObject, null, 2));
  logger.trace("[AssetGenerator] Archivos de TEMA y CONTENIDO generados.", {
    themePath,
    contentPath,
  });

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
    themeOverrides: themeConfig.themeOverrides ?? undefined,
  };

  const updatedMap = {
    ...campaignMap,
    variants: { ...campaignMap.variants, [variantId]: newVariantEntry },
  };

  return { themePath, contentPath, mapPath, updatedMap };
}
// app/[locale]/(dev)/dev/campaign-suite/_actions/_utils/assetGenerator.ts
