// lib/i18n/campaign.i18n.ts
/**
 * @file campaign.i18n.ts
 * @description Aparato Orquestador para la obtención de datos de campaña.
 *              - v8.0.0 (Ingeniería de Resiliencia): Se implementa una guarda de
 *                seguridad. Ahora valida que el `globalDictionary` (obtenido del
 *                motor antifrágil) sea completo antes de pasarlo al procesador.
 *                Si el diccionario base está corrupto, se lanza un error explícito,
 *                previniendo fallos de tipo (TS2345) y asegurando la integridad de los datos.
 * @version 8.0.0
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
import type { CampaignVariantMap } from "@/lib/schemas/campaigns/campaign-map.schema";
import { logger } from "@/lib/logging";

export type CampaignData = {
  dictionary: Dictionary;
  theme: CampaignTheme;
};

const loadCampaignCoreAssets = async (
  campaignId: string,
  assetMap: CampaignVariantMap
): Promise<[CampaignTheme, object]> => {
  logger.trace(
    `[CoreLoader] Cargando activos principales para la variante "${assetMap.name}"...`
  );
  return Promise.all([
    loadCampaignAsset<CampaignTheme>(campaignId, assetMap.theme),
    loadCampaignAsset<object>(campaignId, assetMap.content),
  ]);
};

export const getCampaignData = async (
  campaignId: string,
  locale: string,
  variantId: string
): Promise<CampaignData> => {
  const validatedLocale = supportedLocales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;
  const traceId = logger.startTrace(
    `getCampaignData:${campaignId}-${variantId}`
  );

  try {
    logger.traceEvent(traceId, "Iniciando resolución de activos...");
    const assetMap = await resolveCampaignAssets(campaignId, variantId);

    logger.traceEvent(
      traceId,
      "Cargando activos de campaña y diccionario global en paralelo..."
    );
    const [[themeData, contentData], globalDictionary] = await Promise.all([
      loadCampaignCoreAssets(campaignId, assetMap),
      getGlobalDictionary(validatedLocale),
    ]);

    // --- INICIO DE CORRECCIÓN: GUARDA DE SEGURIDAD PARA DICCIONARIO GLOBAL ---
    // Verificamos si el diccionario global se cargó correctamente. Si `getGlobalDictionary`
    // encontró errores de validación, devolverá un objeto parcial al que le pueden faltar
    // claves no opcionales como `metadata`.
    if (!globalDictionary || !globalDictionary.metadata) {
      throw new Error(
        "El diccionario global base está incompleto o corrupto. No se puede proceder con el ensamblaje de la campaña. Revisa los logs de error de i18n."
      );
    }
    // --- FIN DE CORRECCIÓN ---

    logger.traceEvent(traceId, "Procesando, fusionando y validando datos...");
    // Ahora es seguro pasar `globalDictionary` porque hemos verificado su integridad.
    // TypeScript ya no se quejará del tipo.
    const processedData = processCampaignData(
      globalDictionary as Dictionary, // Cast seguro gracias a la guarda anterior.
      contentData,
      themeData,
      validatedLocale
    );

    logger.success(
      `[Orquestador] Datos para Campaña ${campaignId} / Variante "${assetMap.name}" ensamblados con éxito.`
    );
    return processedData;
  } catch (error) {
    logger.error(
      `[Orquestador] Fallo crítico en el ensamblaje de datos de campaña.`,
      { campaignId, variantId, locale, error }
    );
    // Re-lanzamos el error para que Next.js pueda capturarlo y mostrar una página de error.
    throw error;
  } finally {
    logger.endTrace(traceId);
  }
};
// lib/i18n/campaign.i18n.ts
