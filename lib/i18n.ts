// lib/i18n.ts
/**
 * @file i18n.ts
 * @description Motor i18n.
 *              - v15.1.0: Ajusta el tipo de retorno para ser más preciso.
 * @version 15.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
import "server-only";
import * as fs from "fs/promises";
import * as path from "path";
import { i18nSchema, type Dictionary } from "@/lib/schemas/i18n.schema";
import {
  supportedLocales,
  defaultLocale,
  type Locale,
} from "@/lib/i18n.config";
import { logger } from "@/lib/logging";
import type { ZodError } from "zod";

const dictionariesCache: Partial<
  Record<
    Locale,
    { dictionary: Partial<Dictionary>; error: ZodError | Error | null }
  >
> = {};

export const getDictionary = async (
  locale: string
): Promise<{
  dictionary: Partial<Dictionary>;
  error: ZodError | Error | null;
}> => {
  const validatedLocale = supportedLocales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;

  if (dictionariesCache[validatedLocale]) {
    return dictionariesCache[validatedLocale]!;
  }

  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "locales",
      `${validatedLocale}.json`
    );
    const fileContent = await fs.readFile(filePath, "utf-8");
    const dictionary = JSON.parse(fileContent);

    const validation = i18nSchema.safeParse(dictionary);

    if (!validation.success) {
      logger.error(
        `[i18n] ¡FALLO DE VALIDACIÓN! Diccionario para "${validatedLocale}" está corrupto.`,
        {
          errors: validation.error.flatten().fieldErrors,
        }
      );
      const result = { dictionary: dictionary, error: validation.error };
      dictionariesCache[validatedLocale] = result;
      return result;
    }

    const result = { dictionary: validation.data, error: null };
    dictionariesCache[validatedLocale] = result;
    return result;
  } catch (error) {
    logger.error(
      `[i18n] No se pudo cargar el diccionario pre-compilado para ${validatedLocale}.`,
      { error }
    );
    return {
      dictionary: {},
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
};
