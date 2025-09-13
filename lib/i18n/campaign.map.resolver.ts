// lib/i18n/campaign.map.resolver.ts
/**
 * @file campaign.map.resolver.ts
 * @description Aparato Atómico: Resolver de Mapas de Campaña. Refactorizado para
 *              reutilizar el `loader` refactorizado y añadir validación de schema con
 *              Zod, garantizando la robustez y el cumplimiento del principio DRY.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import "server-only";
import { logger } from "@/lib/logging";
import { loadCampaignAsset } from "./campaign.data.loader";
import {
  CampaignMapSchema,
  type CampaignMap,
  type CampaignVariantMap,
} from "@/lib/schemas/campaigns/campaign-map.schema";

/**
 * @function resolveCampaignAssets
 * @description Carga, valida y resuelve las rutas de activos para una variante de campaña específica.
 * @param {string} campaignId - El ID de la campaña.
 * @param {string} variantId - El ID de la variante a resolver (ej. "01", "02").
 * @returns {Promise<CampaignVariantMap>} Un objeto con las rutas relativas al tema y contenido.
 * @throws {Error} Si el archivo `campaign.map.json` es inválido o la variante no se encuentra.
 */
export async function resolveCampaignAssets(
  campaignId: string,
  variantId: string
): Promise<CampaignVariantMap> {
  logger.trace(
    `[Resolver] Resolviendo activos para campaña ${campaignId}, variante ${variantId}`
  );

  try {
    // 1. Delegar la carga del archivo al loader, adhiriendo al principio DRY.
    const campaignMapData = await loadCampaignAsset<CampaignMap>(
      campaignId,
      "campaign.map.json"
    );

    // 2. Validar la estructura del mapa contra el schema de Zod.
    const validation = CampaignMapSchema.safeParse(campaignMapData);
    if (!validation.success) {
      logger.error(
        `[Resolver] El archivo campaign.map.json para la campaña "${campaignId}" es inválido.`,
        { errors: validation.error.flatten().fieldErrors }
      );
      throw new Error(
        `Validación fallida para campaign.map.json de la campaña ${campaignId}.`
      );
    }

    const campaignMap = validation.data;
    const variant = campaignMap.variants[variantId];

    // 3. Verificar que la variante solicitada exista en el mapa validado.
    if (!variant) {
      throw new Error(
        `Variante "${variantId}" no encontrada en campaign.map.json para la campaña "${campaignId}". Las variantes disponibles son: ${Object.keys(
          campaignMap.variants
        ).join(", ")}.`
      );
    }

    logger.success(
      `[Resolver] Rutas de activos para la variante "${variant.name}" (${variantId}) resueltas con éxito.`
    );
    return variant;
  } catch (error) {
    // El error ya fue logueado en el `loader` o en este mismo bloque.
    // Simplemente enriquecemos el mensaje para el consumidor final.
    logger.error(
      `[Resolver] Fallo al resolver activos para Campaña ${campaignId} / Variante ${variantId}.`
    );
    throw new Error(
      `No se pudo resolver el mapa de activos para la campaña "${campaignId}". Revisa los logs para más detalles.`
    );
  }
}
// lib/i18n/campaign.map.resolver.ts
