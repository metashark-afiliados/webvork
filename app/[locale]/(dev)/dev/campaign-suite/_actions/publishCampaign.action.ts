// app/[locale]/(dev)/dev/campaign-suite/_actions/publishCampaign.action.ts
/**
 * @file publishCampaign.action.ts
 * @description Server Action para publicar los activos de una campaña.
 *              v2.0.0: Atomiza la lógica de generación de activos para reutilización.
 * @version 2.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use server";

import { promises as fs } from "fs";
import path from "path";
import { logger } from "@/lib/logging";
import type { ActionResult } from "@/lib/types/actions.types";
import type { CampaignDraft } from "../_types/draft.types";
import {
  CampaignMapSchema,
  type CampaignMap,
} from "@/lib/schemas/campaigns/campaign-map.schema";
import { supportedLocales, type Locale } from "@/lib/i18n.config";
import { sectionsConfig } from "@/lib/config/sections.config";

interface GenerationSuccessPayload {
  message: string;
  variantId: string;
}

/**
 * @function generateAssets
 * @description Utilidad interna y reutilizable para generar los archivos de una campaña.
 * @internal
 */
export async function generateAssets(
  draft: CampaignDraft,
  outputDir: string
): Promise<string> {
  const {
    baseCampaignId,
    variantName,
    seoKeywords,
    themeConfig,
    layoutConfig,
    contentData,
  } = draft;

  if (!baseCampaignId || !variantName || !seoKeywords) {
    throw new Error("Faltan datos fundamentales del Paso 0 en el borrador.");
  }

  const mapPath = path.join(outputDir, "campaign.map.json");
  const baseMapPath = path.join(
    process.cwd(),
    "content",
    "campaigns",
    baseCampaignId,
    "campaign.map.json"
  );

  await fs.mkdir(path.dirname(mapPath), { recursive: true });

  let campaignMap: CampaignMap;
  try {
    const mapContent = await fs.readFile(baseMapPath, "utf-8");
    campaignMap = CampaignMapSchema.parse(JSON.parse(mapContent));

    // Si estamos en un directorio temporal, empezamos con las variantes del original.
    // Si estamos en producción, simplemente lo leemos.
    const prodMapContent = await fs
      .readFile(mapPath, "utf-8")
      .catch(() => null);
    if (prodMapContent) {
      campaignMap = CampaignMapSchema.parse(JSON.parse(prodMapContent));
    }
  } catch (error) {
    throw new Error(
      "El archivo campaign.map.json de la campaña base es inválido o no se encuentra."
    );
  }

  const existingIds = Object.keys(campaignMap.variants).map((id) =>
    parseInt(id, 10)
  );
  const newVariantId = (Math.max(0, ...existingIds) + 1)
    .toString()
    .padStart(2, "0");

  const netString = [
    `cp-${themeConfig.colorPreset || "default"}`,
    `ft-${themeConfig.fontPreset || "default-sans"}`,
    `rd-${themeConfig.radiusPreset || "default"}`,
  ].join(".");

  const contentObject: Partial<Record<Locale, any>> = {};
  for (const locale of supportedLocales) {
    contentObject[locale] = {};
    for (const section of layoutConfig) {
      const sectionKey =
        sectionsConfig[section.name as keyof typeof sectionsConfig]
          ?.dictionaryKey;
      if (
        sectionKey &&
        contentData[section.name] &&
        contentData[section.name][locale]
      ) {
        contentObject[locale]![sectionKey] = contentData[section.name][locale];
      }
    }
  }

  const dateStamp = new Date().toISOString().split("T")[0].replace(/-/g, "");
  const safeVariantName = variantName.replace(/\s+/g, "_");
  const contentFileName = `${baseCampaignId}_${dateStamp}_CONTENT_${newVariantId}_${safeVariantName}.json`;
  const contentPath = path.join(outputDir, "content", contentFileName);

  await fs.mkdir(path.dirname(contentPath), { recursive: true });
  await fs.writeFile(contentPath, JSON.stringify(contentObject, null, 2));

  campaignMap.variants[newVariantId] = {
    name: variantName,
    description: `Variante generada por la SDC el ${new Date().toLocaleDateString()}`,
    theme: netString,
    content: `./content/${contentFileName}`,
    variantSlug: variantName.toLowerCase().replace(/\s+/g, "-"),
    seoKeywordSlug: seoKeywords.toLowerCase().replace(/\s+/g, "-"),
  };

  await fs.writeFile(mapPath, JSON.stringify(campaignMap, null, 2));
  logger.success("Activos de campaña y mapa actualizados.", { outputDir });

  return newVariantId;
}

/**
 * @function publishCampaignAction
 * @description Server Action que publica los activos en el directorio de producción.
 */
export async function publishCampaignAction(
  draft: CampaignDraft
): Promise<ActionResult<GenerationSuccessPayload>> {
  logger.startGroup("[Action] Publicando activos de campaña...");
  const { baseCampaignId } = draft;

  if (!baseCampaignId) {
    return { success: false, error: "ID de Campaña Base no encontrado." };
  }

  try {
    const productionCampaignDir = path.join(
      process.cwd(),
      "content",
      "campaigns",
      baseCampaignId
    );
    const newVariantId = await generateAssets(draft, productionCampaignDir);

    logger.endGroup();
    return {
      success: true,
      data: {
        message: "¡Activos publicados con éxito!",
        variantId: newVariantId,
      },
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido.";
    logger.error("Fallo crítico durante la publicación de activos.", {
      error: errorMessage,
    });
    logger.endGroup();
    return {
      success: false,
      error: `No se pudo publicar la campaña: ${errorMessage}`,
    };
  }
}
// app/[locale]/(dev)/dev/campaign-suite/_actions/publishCampaign.action.ts
