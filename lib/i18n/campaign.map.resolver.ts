// src/lib/i18n/campaign.map.resolver.ts
/**
 * @file campaign.map.resolver.ts
 * @description Aparato Atómico: Resolver de Mapas de Campaña. Su única
 *              responsabilidad es leer el manifiesto `campaign.map.json` y
 *              devolver las rutas de los activos para una variante específica.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import "server-only";
import { clientLogger } from "@/lib/logging";

interface CampaignVariantMap {
  name: string;
  theme: string;
  content: string;
}

/**
 * @function resolveCampaignAssets
 * @description Carga el mapa de una campaña y resuelve las rutas para una variante.
 * @param campaignId El ID de la campaña.
 * @param variantId El ID de la variante (ej. "01", "02").
 * @returns {Promise<CampaignVariantMap>} Un objeto con las rutas relativas al tema y contenido.
 * @throws {Error} Si el mapa o la variante no se encuentran.
 */
export async function resolveCampaignAssets(
  campaignId: string,
  variantId: string
): Promise<CampaignVariantMap> {
  clientLogger.trace(
    `[Resolver] Resolviendo activos para campaña ${campaignId}, variante ${variantId}`
  );

  try {
    const mapModule = await import(
      `@/content/campaigns/${campaignId}/campaign.map.json`
    );
    const campaignMap = mapModule.default;

    if (!campaignMap.variants || !campaignMap.variants[variantId]) {
      throw new Error(
        `Variante "${variantId}" no encontrada en campaign.map.json para la campaña "${campaignId}".`
      );
    }

    clientLogger.trace(`[Resolver] Rutas de activos encontradas con éxito.`);
    return campaignMap.variants[variantId];
  } catch (error) {
    clientLogger.error(
      `[Resolver] No se pudo cargar o parsear el campaign.map.json para la campaña "${campaignId}".`,
      { error }
    );
    throw new Error(
      `No se pudo resolver el mapa de activos para la campaña "${campaignId}".`
    );
  }
}
// src/lib/i18n/campaign.map.resolver.ts
