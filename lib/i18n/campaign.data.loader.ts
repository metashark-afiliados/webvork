// src/lib/i18n/campaign.data.loader.ts
/**
 * @file campaign.data.loader.ts
 * @description Aparato Atómico: Cargador de Datos de Campaña. Su única
 *              responsabilidad es cargar dinámicamente un archivo JSON desde una
 *              ruta relativa al directorio de la campaña.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import "server-only";
import { clientLogger } from "@/lib/logging";

/**
 * @function loadCampaignAsset
 * @description Carga dinámicamente un archivo JSON de activo de campaña.
 * @param campaignId El ID de la campaña para construir la ruta base.
 * @param assetPath La ruta relativa del activo desde el `campaign.map.json`.
 * @returns {Promise<any>} El contenido del archivo JSON parseado.
 * @throws {Error} Si el archivo no puede ser cargado.
 */
export async function loadCampaignAsset<T>(
  campaignId: string,
  assetPath: string
): Promise<T> {
  clientLogger.trace(`[Cargador] Cargando activo: ${assetPath}`);
  try {
    const assetModule = await import(
      `@/content/campaigns/${campaignId}/${assetPath}`
    );
    return assetModule.default;
  } catch (error) {
    clientLogger.error(
      `[Cargador] Error al cargar el activo "${assetPath}" para la campaña "${campaignId}".`,
      { error }
    );
    throw new Error(`No se pudo cargar el activo de campaña: ${assetPath}`);
  }
}
// src/lib/i18n/campaign.data.loader.ts
