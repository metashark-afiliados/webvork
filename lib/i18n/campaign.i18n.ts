// src/lib/i18n/campaign.i18n.ts
/**
 * @file campaign.i18n.ts
 * @description Aparato Orquestador para la obtención de datos de campaña.
 *              Implementación final de la metodología MACS. Ahora es
 *              completamente dinámico y está gobernado por el `campaign.map.json`.
 * @version 6.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import "server-only";
import {
  supportedLocales,
  defaultLocale,
  type Locale,
} from "@/lib/i18n.config";
import { getDictionary as getGlobalDictionary } from "@/lib/i18n";
import { resolveCampaignAssets } from "./campaign.map.resolver";
import { loadCampaignAsset } from "./campaign.data.loader";
import {
  processCampaignData,
  type CampaignTheme,
} from "./campaign.data.processor";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { clientLogger } from "@/lib/logging";

export type CampaignData = {
  dictionary: Dictionary;
  theme: CampaignTheme;
};

/**
 * @function getCampaignData
 * @description Orquesta la obtención de datos de una campaña de forma dinámica.
 * @param campaignId El ID de la campaña a cargar.
 * @param locale El locale solicitado.
 * @param variantId El ID de la variante de sub-campaña a cargar.
 * @returns {Promise<CampaignData>} Los datos completos y validados de la campaña.
 */
export const getCampaignData = async (
  campaignId: string,
  locale: string,
  variantId: string
): Promise<CampaignData> => {
  const validatedLocale = supportedLocales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;

  clientLogger.startGroup(
    `[Orquestador] getCampaignData para Campaña ${campaignId} / Variante ${variantId}`
  );

  try {
    // 1. RESOLVER: Obtener las rutas de los activos desde el mapa.
    const assetMap = await resolveCampaignAssets(campaignId, variantId);

    // 2. CARGAR: Cargar todos los datos necesarios en paralelo.
    const [themeData, contentData, globalDictionary] = await Promise.all([
      loadCampaignAsset<object>(campaignId, assetMap.theme),
      loadCampaignAsset<object>(campaignId, assetMap.content),
      getGlobalDictionary(validatedLocale),
    ]);

    // 3. PROCESAR: Fusionar y validar los datos cargados.
    const processedData = processCampaignData(
      globalDictionary,
      contentData,
      themeData,
      validatedLocale
    );

    clientLogger.info(
      `[Orquestador] Datos para campaña ${campaignId} / ${variantId} ensamblados con éxito.`
    );
    return processedData;
  } catch (error) {
    clientLogger.error(
      `[Orquestador] Fallo crítico en el ensamblaje de datos de campaña.`,
      { error }
    );
    // Re-lanzar el error para que la página pueda manejarlo.
    throw error;
  } finally {
    clientLogger.endGroup();
  }
};
// src/lib/i18n/campaign.i18n.ts
