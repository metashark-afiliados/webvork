// lib/dev/campaign.utils.ts
/**
 * @file campaign.utils.ts
 * @description Utilidades del lado del servidor para el Developer Command Center,
 *              enfocadas en descubrir y leer configuraciones de campaña.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { logger } from "@/lib/logging";
import type { CampaignMap } from "@/lib/schemas/campaigns/campaign-map.schema";

/**
 * @interface CampaignVariantInfo
 * @description Define la estructura de datos simplificada para representar una variante de campaña en la UI del DCC.
 */
export interface CampaignVariantInfo {
  campaignId: string;
  variantId: string;
  name: string;
  description: string;
}

const CAMPAIGNS_DIR = path.join(process.cwd(), "src", "content", "campaigns");

/**
 * @function getAllCampaignsAndVariants
 * @description Escanea el directorio de campañas y lee cada `campaign.map.json`
 *              para construir una lista completa de todas las variantes disponibles.
 * @returns {Promise<CampaignVariantInfo[]>} Una lista de objetos con información de cada variante.
 */
export async function getAllCampaignsAndVariants(): Promise<
  CampaignVariantInfo[]
> {
  logger.info("[DevUtils] Descubriendo todas las campañas y variantes...");
  const allVariants: CampaignVariantInfo[] = [];

  try {
    const campaignDirs = await fs.readdir(CAMPAIGNS_DIR, {
      withFileTypes: true,
    });

    for (const campaignDir of campaignDirs) {
      if (campaignDir.isDirectory()) {
        const campaignId = campaignDir.name;
        const mapPath = path.join(
          CAMPAIGNS_DIR,
          campaignId,
          "campaign.map.json"
        );

        try {
          const mapContent = await fs.readFile(mapPath, "utf-8");
          const campaignMap: CampaignMap = JSON.parse(mapContent);

          for (const variantId in campaignMap.variants) {
            const variant = campaignMap.variants[variantId];
            allVariants.push({
              campaignId,
              variantId,
              name: `${campaignMap.campaignName} - ${variant.name}`,
              description: variant.description,
            });
          }
        } catch (error) {
          logger.warn(
            `No se pudo leer o parsear el campaign.map.json para la campaña ${campaignId}`,
            { error }
          );
        }
      }
    }
    logger.success(
      `[DevUtils] Se encontraron ${allVariants.length} variantes de campaña.`
    );
    return allVariants;
  } catch (error) {
    logger.error(
      "[DevUtils] Error crítico al escanear el directorio de campañas.",
      { error }
    );
    return []; // Devuelve un array vacío en caso de error para no romper la UI.
  }
}
// lib/dev/campaign.utils.ts
