// lib/i18n/campaign.i18n.ts
/**
 * @file campaign.i18n.ts
 * @description Aparato Orquestador Soberano para la obtención de datos de campaña.
 *              v15.1.0 (Definitive Type Assertion): Resuelve la cascada de errores
 *              de tipo mediante aserciones de tipo explícitas tras el Promise.all,
 *              eliminando la ambigüedad para el compilador de TypeScript.
 * @version 15.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
import "server-only";
import {
  supportedLocales,
  defaultLocale,
  type Locale,
} from "@/lib/i18n.config";
import { getDictionary as getGlobalDictionary } from "@/lib/i18n";
import { loadJsonAsset } from "./campaign.data.loader";
import { processCampaignData } from "./campaign.data.processor";
import { deepMerge } from "@/lib/utils/merge";
import { parseThemeNetString } from "@/lib/utils/theme.utils";
import { netTracePrefixToPathMap } from "@/lib/config/theming.config.ts";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { type AssembledTheme } from "@/lib/schemas/theming/assembled-theme.schema";
import {
  CampaignMapSchema,
  type CampaignMap,
  type CampaignVariantMap,
} from "@/lib/schemas/campaigns/campaign-map.schema";
import { logger } from "@/lib/logging";
import { ZodError } from "zod";

export async function resolveCampaignVariant(
  campaignId: string,
  identifier: string,
  bySlug = false
): Promise<{ variantId: string; variant: CampaignVariantMap }> {
  logger.trace(
    `[Resolver] Resolviendo para campaña ${campaignId}, ${
      bySlug ? "slug" : "ID"
    }: ${identifier}`
  );
  try {
    const campaignMap = await loadJsonAsset<CampaignMap>(
      "campaigns",
      campaignId,
      "campaign.map.json"
    );
    const validation = CampaignMapSchema.safeParse(campaignMap);
    if (!validation.success) throw new Error("Mapa de campaña inválido.");

    const { variants } = validation.data;
    let foundEntry: [string, CampaignVariantMap] | undefined;

    if (bySlug) {
      foundEntry = Object.entries(variants).find(
        ([, v]) => v.variantSlug === identifier
      );
    } else {
      const variant = variants[identifier];
      if (variant) foundEntry = [identifier, variant];
    }

    if (!foundEntry)
      throw new Error(
        `Variante con ${bySlug ? "slug" : "ID"} "${identifier}" no encontrada.`
      );

    const [variantId, variant] = foundEntry;
    return { variantId, variant };
  } catch (error) {
    logger.error(`[Resolver] Fallo al resolver la variante.`, { error });
    throw error;
  }
}

export type CampaignData = {
  dictionary: Dictionary;
  theme: AssembledTheme;
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
    const { variant } = await resolveCampaignVariant(campaignId, variantId);
    const themePlan = parseThemeNetString(variant.theme);

    type CampaignContentFile = Partial<Record<Locale, Record<string, unknown>>>;
    type GlobalDictionaryResult = {
      dictionary: Partial<Dictionary>;
      error: ZodError | Error | null;
    };

    const promises = [
      loadJsonAsset<Partial<AssembledTheme>>(
        "theme-fragments",
        "base",
        "global.theme.json"
      ),
      loadJsonAsset<CampaignContentFile>(
        "campaigns",
        campaignId,
        variant.content.replace("./", "")
      ),
      getGlobalDictionary(validatedLocale),
      ...Object.entries(themePlan).map(([prefix, name]) => {
        const dir =
          netTracePrefixToPathMap[
            prefix as keyof typeof netTracePrefixToPathMap
          ];
        if (!dir) return Promise.resolve({});
        const filename = `${name}.${dir}.json`;
        return loadJsonAsset<Partial<AssembledTheme>>(
          "theme-fragments",
          dir,
          filename
        );
      }),
    ];

    const resolvedPromises = await Promise.all(promises);

    const baseTheme = resolvedPromises[0] as Partial<AssembledTheme>;
    const campaignContent = resolvedPromises[1] as CampaignContentFile;
    const { dictionary: globalDictionary, error: dictError } =
      resolvedPromises[2] as GlobalDictionaryResult;
    const themeFragments = resolvedPromises.slice(
      3
    ) as Partial<AssembledTheme>[];

    if (dictError || !globalDictionary) {
      throw new Error("El diccionario global base está corrupto.", {
        cause: dictError,
      });
    }

    const themeToMerge = [
      baseTheme,
      ...themeFragments,
      variant.themeOverrides ?? {},
    ];
    const finalAssembledTheme = themeToMerge.reduce(
      (acc, current) => deepMerge(acc, current as object),
      {}
    );

    const campaignLocaleContent = campaignContent[validatedLocale] || {};
    const processedData = processCampaignData(
      globalDictionary as Dictionary,
      campaignLocaleContent,
      finalAssembledTheme
    );

    logger.success(
      `[Orquestador v15.1] Datos para Campaña ${campaignId} / Variante "${variant.name}" ensamblados con éxito.`
    );
    return processedData;
  } catch (error) {
    logger.error(
      `[Orquestador v15.1] Fallo crítico en el ensamblaje de datos de campaña.`,
      { error }
    );
    throw error;
  } finally {
    logger.endTrace(traceId);
  }
};
// lib/i18n/campaign.i18n.ts
