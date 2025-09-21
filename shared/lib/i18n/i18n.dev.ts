// shared/lib/i18n/i18n.dev.ts
/**
 * @file i18n.dev.ts
 * @description Motor de i18n para el entorno de desarrollo. Ensambla diccionarios
 *              "en caliente" a partir de múltiples archivos fuente.
 * @version 3.0.0 (Holistic Elite Compliance & Critical Bug Fix)
 * @author RaZ Podestá - MetaShark Tech
 */
import "server-only";
import { type ZodError } from "zod";
import { type Locale } from "@/shared/lib/i18n.config";
import { i18nSchema, type Dictionary } from "@/shared/lib/schemas/i18n.schema";
import { logger } from "@/shared/lib/logging";
import {
  discoverAndReadI18nFiles,
  type I18nFileContent,
} from "@/shared/lib/dev/i18n-discoverer";

// Caché en memoria para el entorno de desarrollo para acelerar las recargas en caliente (HMR).
const devDictionariesCache: Partial<
  Record<
    Locale,
    { dictionary: Partial<Dictionary>; error: ZodError | Error | null }
  >
> = {};

/**
 * @function getDevDictionary
 * @description Obtiene el diccionario para un locale específico en entorno de desarrollo.
 * @param {Locale} locale - El locale a obtener.
 * @returns {Promise<{ dictionary: Partial<Dictionary>; error: ZodError | Error | null; }>}
 */
export async function getDevDictionary(locale: Locale): Promise<{
  dictionary: Partial<Dictionary>;
  error: ZodError | Error | null;
}> {
  // En desarrollo, no usamos una caché persistente entre peticiones para reflejar cambios al instante.
  // La caché aquí es solo para el ciclo de vida de una única petición si se llama varias veces.
  if (devDictionariesCache[locale]) {
    logger.trace(
      `[i18n.dev] Sirviendo diccionario para [${locale}] desde caché de petición.`
    );
    return devDictionariesCache[locale]!;
  }

  logger.startGroup(
    `[i18n.dev] Ensamblando diccionario "en caliente" para [${locale}]...`
  );

  try {
    const allI18nContents = await discoverAndReadI18nFiles();

    // --- [INICIO DE CORRECCIÓN DE ERROR CRÍTICO TS2345] ---
    // El método .reduce() debe llamarse sobre el array 'contents' dentro del objeto 'allI18nContents'.
    const assembledDictionary: Partial<Dictionary> =
      allI18nContents.contents.reduce(
        (acc: Partial<Dictionary>, moduleContent: I18nFileContent) => {
          const contentForLocale = moduleContent[locale];
          // Fusiona el contenido del locale actual en el acumulador.
          return { ...acc, ...(contentForLocale || {}) };
        },
        {}
      );
    // --- [FIN DE CORRECCIÓN DE ERROR CRÍTICO TS2345] ---

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
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(
      `[i18n.dev] Fallo crítico al ensamblar el diccionario para ${locale}.`,
      { error: errorMessage }
    );
    const result = {
      dictionary: {},
      error: error instanceof Error ? error : new Error(errorMessage),
    };
    devDictionariesCache[locale] = result;
    logger.endGroup();
    return result;
  }
}
// shared/lib/i18n/i18n.dev.ts
