// lib/i18n.ts
/**
 * @file i18n.ts
 * @description Orquestador de i18n consciente del entorno. Delega la carga
 *              de diccionarios al motor apropiado. En producción, utiliza
 *              `React.cache` para memoizar la lectura de archivos.
 * @version 17.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import "server-only";
import { cache } from "react";
import * as fs from "fs/promises";
import * as path from "path";
import { type ZodError } from "zod";
import { i18nSchema, type Dictionary } from "@/shared/lib/schemas/i18n.schema";
import {
  supportedLocales,
  defaultLocale,
  type Locale,
} from "@/shared/lib/i18n.config";
import { logger } from "@/shared/lib/logging";
import { getDevDictionary } from "@/shared/lib/i18n/i18n.dev";

// --- Lógica de Producción Cacheada ---

const prodDictionariesCache: Partial<
  Record<
    Locale,
    { dictionary: Partial<Dictionary>; error: ZodError | Error | null }
  >
> = {};

/**
 * @function getProductionDictionary
 * @description Lógica pura para cargar y validar un diccionario en producción.
 *              Esta función será envuelta por `React.cache`.
 * @private
 */
const getProductionDictionary = async (
  locale: Locale
): Promise<{
  dictionary: Partial<Dictionary>;
  error: ZodError | Error | null;
}> => {
  if (prodDictionariesCache[locale]) {
    return prodDictionariesCache[locale]!;
  }

  logger.trace(
    `[i18n Orquestador - PROD] Leyendo del sistema de archivos para [${locale}].`
  );

  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "locales",
      `${locale}.json`
    );
    const fileContent = await fs.readFile(filePath, "utf-8");
    const dictionary = JSON.parse(fileContent);

    const validation = i18nSchema.safeParse(dictionary);
    if (!validation.success) {
      logger.error(
        `[i18n Orquestador - PROD] ¡FALLO DE VALIDACIÓN! Diccionario para "${locale}" está corrupto.`,
        { errors: validation.error.flatten().fieldErrors }
      );
      const result = { dictionary, error: validation.error };
      prodDictionariesCache[locale] = result;
      return result;
    }

    const result = { dictionary: validation.data, error: null };
    prodDictionariesCache[locale] = result;
    return result;
  } catch (error) {
    logger.error(
      `[i18n Orquestador - PROD] No se pudo cargar el diccionario para ${locale}.`,
      { error }
    );
    return {
      dictionary: {},
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
};

/**
 * @const getCachedProductionDictionary
 * @description Versión memoizada de `getProductionDictionary` usando `React.cache`.
 *              Esto asegura que, dentro de un mismo ciclo de renderizado en servidor,
 *              la lectura y parseo de un archivo de locale solo ocurra una vez. [1]
 */
const getCachedProductionDictionary = cache(getProductionDictionary);

// --- Orquestador Principal ---

/**
 * @function getDictionary
 * @description SSoT para la obtención de diccionarios i18n.
 *              Detecta el entorno y utiliza la estrategia de carga óptima.
 * @param {string} locale - El código de idioma solicitado (ej. "es-ES").
 * @returns {Promise<{ dictionary: Partial<Dictionary>; error: ZodError | Error | null; }>}
 */
export const getDictionary = async (
  locale: string
): Promise<{
  dictionary: Partial<Dictionary>;
  error: ZodError | Error | null;
}> => {
  const validatedLocale = supportedLocales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;

  if (process.env.NODE_ENV === "development") {
    logger.trace(`[i18n Orquestador] Entorno DEV. Delegando a i18n.dev.ts...`);
    return getDevDictionary(validatedLocale);
  }

  logger.trace(`[i18n Orquestador] Entorno PROD. Usando motor cacheado...`);
  return getCachedProductionDictionary(validatedLocale);
};
