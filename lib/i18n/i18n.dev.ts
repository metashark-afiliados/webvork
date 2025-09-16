// lib/i18n/i18n.dev.ts
/**
 * @file i18n.dev.ts
 * @description Motor de i18n para el entorno de desarrollo.
 *              - v2.1.0 (Type Fix): Resuelve el error de tipo TS2322 asegurando
 *                que el diccionario ensamblado sea consistentemente del tipo
 *                `Partial<Dictionary>`, alineando el contrato interno.
 * @version 2.1.0
 * @author RaZ podesta - MetaShark Tech
 */
import "server-only";
import { type ZodError } from "zod";
import { type Locale } from "@/lib/i18n.config";
import { i18nSchema, type Dictionary } from "@/lib/schemas/i18n.schema";
import { logger } from "@/lib/logging";
import { discoverAndReadI18nFiles } from "@/lib/dev/i18n-discoverer";

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

    // --- INICIO DE CORRECCIÓN: Se declara con el tipo correcto `Partial<Dictionary>` ---
    const assembledDictionary: Partial<Dictionary> = allI18nContents.reduce(
      (acc: Partial<Dictionary>, moduleContent) => {
        const contentForLocale = moduleContent[locale];
        return { ...acc, ...(contentForLocale || {}) };
      },
      {}
    );
    // --- FIN DE CORRECCIÓN ---

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
// lib/i18n/i18n.dev.ts
