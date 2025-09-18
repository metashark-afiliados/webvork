// lib/i18n/i18n.dev.ts
/**
 * @file i18n.dev.ts
 * @description Motor de i18n para el entorno de desarrollo.
 *              - v2.2.0 (Critical Bug Fix: DiscoveryResult Reduction): Resuelve el error
 *                de la propiedad 'reduce' no encontrada en `DiscoveryResult` al acceder
 *                correctamente al array `contents` dentro del objeto.
 * @version 2.2.0
 * @author RaZ Podestá - MetaShark Tech
 */
import "server-only";
import { type ZodError } from "zod";
import { type Locale } from "@/lib/i18n.config";
import { i18nSchema, type Dictionary } from "@/lib/schemas/i18n.schema";
import { logger } from "@/lib/logging";
// --- [INICIO DE CORRECCIÓN: Importación correcta de tipos] ---
import {
  discoverAndReadI18nFiles,
  type I18nFileContent,
} from "@/lib/dev/i18n-discoverer";
// --- [FIN DE CORRECCIÓN] ---

const devDictionariesCache: Partial<
  Record<
    Locale,
    { dictionary: Partial<Dictionary>; error: ZodError | Error | null }
  >
> = {};

export async function getDevDictionary(locale: Locale): Promise<{
  dictionary: Partial<Dictionary>;
  error: ZodError | Error | null;
}> {
  if (devDictionariesCache[locale]) {
    logger.trace(
      `[i18n.dev] Sirviendo diccionario para [${locale}] desde caché.`
    );
    return devDictionariesCache[locale]!;
  }

  logger.startGroup(`[i18n.dev] Creando diccionario para [${locale}]...`);

  try {
    const allI18nContents = await discoverAndReadI18nFiles();

    // --- [INICIO DE CORRECCIÓN CRÍTICA] ---
    // El método .reduce() debe llamarse sobre el array 'contents' dentro del objeto 'allI18nContents'.
    const assembledDictionary: Partial<Dictionary> =
      allI18nContents.contents.reduce(
        (acc: Partial<Dictionary>, moduleContent: I18nFileContent) => {
          const contentForLocale = moduleContent[locale];
          return { ...acc, ...(contentForLocale || {}) };
        },
        {}
      );
    // --- [FIN DE CORRECCIÓN CRÍTICA] ---

    const validation = i18nSchema.safeParse(assembledDictionary);

    if (!validation.success) {
      logger.error(
        `[i18n.dev] ¡FALLO DE VALIDACIÓN! Diccionario para [${locale}] está corrupto.`,
        { errors: validation.error.flatten().fieldErrors }
      );
      const result = {
        dictionary: assembledDictionary,
        error: validation.error,
      };
      devDictionariesCache[locale] = result;
      logger.endGroup();
      return result;
    }

    logger.success(
      `[i18n.dev] Diccionario para [${locale}] ensamblado y validado con éxito.`
    );
    const result = { dictionary: validation.data, error: null };
    devDictionariesCache[locale] = result;
    logger.endGroup();
    return result;
  } catch (error) {
    logger.error(
      `[i18n.dev] Fallo crítico al ensamblar el diccionario para ${locale}.`,
      { error }
    );
    const result = {
      dictionary: {},
      error: error instanceof Error ? error : new Error(String(error)),
    };
    devDictionariesCache[locale] = result;
    logger.endGroup();
    return result;
  }
}
