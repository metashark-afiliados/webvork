// app/[locale]/(dev)/dev/campaign-suite/_actions/generateCampaignAssets.action.ts
/**
 * @file generateCampaignAssets.action.ts
 * @description Server Action para generar y guardar los activos de una campaña.
 *              v2.4.0 (Type Safety): Erradica el uso de 'any', garantizando la
 *              seguridad de tipos en la construcción del objeto de contenido.
 * @version 2.4.0
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

interface GenerationSuccessPayload {
  message: string;
  variantId: string;
  themePath: string;
  contentPath: string;
  mapPath: string;
}

export async function generateCampaignAssetsAction(
  draft: CampaignDraft,
  outputDir?: string
): Promise<ActionResult<GenerationSuccessPayload>> {
  logger.startGroup("[Action] Generando activos de campaña...");
  const {
    baseCampaignId,
    variantName,
    seoKeywords,
    themeConfig,
    layoutConfig,
    contentData,
  } = draft;

  if (!baseCampaignId || !variantName || !seoKeywords) {
    return { success: false, error: "Faltan datos fundamentales del Paso 0." };
  }

  try {
    const campaignDir =
      outputDir ||
      path.join(process.cwd(), "content", "campaigns", baseCampaignId);
    const mapPath = path.join(campaignDir, "campaign.map.json");

    let campaignMap: CampaignMap;
    try {
      const mapContent = await fs.readFile(mapPath, "utf-8");
      campaignMap = CampaignMapSchema.parse(JSON.parse(mapContent));
    } catch (error) {
      logger.error("No se pudo leer o parsear el campaign.map.json.", {
        error,
      });
      return {
        success: false,
        error:
          "El archivo campaign.map.json de la campaña base está corrupto o no existe.",
      };
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

    const themeObject = {
      layout: { sections: layoutConfig },
      themeOverrides: {},
    };

    const contentObject: Partial<Record<Locale, Record<string, unknown>>> = {};
    for (const locale of supportedLocales) {
      contentObject[locale] = {};
      for (const sectionName in contentData) {
        if (
          Object.prototype.hasOwnProperty.call(contentData, sectionName) &&
          contentData[sectionName][locale]
        ) {
          if (contentObject[locale]) {
            contentObject[locale]![sectionName] =
              contentData[sectionName][locale];
          }
        }
      }
    }

    const dateStamp = new Date().toISOString().split("T")[0].replace(/-/g, "");
    const safeVariantName = variantName.replace(/\s+/g, "_");
    const themeFileName = `${baseCampaignId}_${dateStamp}_THEME_${newVariantId}_${safeVariantName}.json`;
    const contentFileName = `${baseCampaignId}_${dateStamp}_CONTENT_${newVariantId}_${safeVariantName}.json`;

    const themePath = path.join(campaignDir, "themes", themeFileName);
    const contentPath = path.join(campaignDir, "content", contentFileName);

    await fs.mkdir(path.dirname(themePath), { recursive: true });
    await fs.mkdir(path.dirname(contentPath), { recursive: true });

    await fs.writeFile(themePath, JSON.stringify(themeObject, null, 2));
    await fs.writeFile(contentPath, JSON.stringify(contentObject, null, 2));

    logger.success("Archivos de TEMA y CONTENIDO generados.", {
      themePath,
      contentPath,
    });

    campaignMap.variants[newVariantId] = {
      name: variantName,
      description: `Variante generada por la SDC el ${new Date().toLocaleDateString()}`,
      theme: netString,
      content: `./content/${contentFileName}`,
      variantSlug: variantName.toLowerCase().replace(/\s+/g, "-"),
      seoKeywordSlug: seoKeywords.toLowerCase().replace(/\s+/g, "-"),
    };

    await fs.writeFile(mapPath, JSON.stringify(campaignMap, null, 2));
    logger.success("campaign.map.json actualizado con la nueva variante.");

    logger.endGroup();
    return {
      success: true,
      data: {
        message: "¡Activos generados con éxito!",
        variantId: newVariantId,
        themePath,
        contentPath,
        mapPath,
      },
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido.";
    logger.error("Fallo crítico durante la generación de activos.", {
      error: errorMessage,
    });
    logger.endGroup();
    return {
      success: false,
      error: `No se pudo generar el paquete de la campaña: ${errorMessage}`,
    };
  }
}
// app/[locale]/(dev)/dev/campaign-suite/_actions/generateCampaignAssets.action.ts
