// lib/i18n.ts
/**
 * @file i18n.ts
 * @description Motor i18n de alto rendimiento para el portal.
 *              - v14.0.0 (Build-Time Filesystem Access): Refactorizado para leer
 *                los diccionarios pre-compilados directamente desde el sistema de
 *                archivos usando `fs.promises.readFile`. Esto elimina la dependencia
 *                de la red (`fetch`) durante el proceso de build, resolviendo los
 *                errores `ECONNREFUSED` y mejorando drásticamente la velocidad.
 * @version 14.0.0
 * @author Gemini AI - Asistente de IA de Google
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

// La caché en memoria sigue siendo crucial para evitar lecturas de disco repetidas
// dentro de una misma renderización de página.
const dictionariesCache: Partial<Record<Locale, Partial<Dictionary>>> = {};

export const getDictionary = async (
  locale: string
): Promise<Partial<Dictionary>> => {
  const validatedLocale = supportedLocales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;

  if (dictionariesCache[validatedLocale]) {
    return dictionariesCache[validatedLocale]!;
  }

  logger.info(
    `[i18n] Cargando diccionario pre-compilado para locale: ${validatedLocale}`
  );

  try {
    // --- INICIO DE MODIFICACIÓN: Acceso Directo al Sistema de Archivos ---
    // Construimos la ruta al archivo estático dentro del directorio `public`.
    const filePath = path.join(
      process.cwd(),
      "public",
      "locales",
      `${validatedLocale}.json`
    );

    const fileContent = await fs.readFile(filePath, "utf-8");
    const dictionary = JSON.parse(fileContent);
    // --- FIN DE MODIFICACIÓN ---

    // La validación de defensa en profundidad se mantiene.
    const validation = i18nSchema.safeParse(dictionary);

    if (!validation.success) {
      logger.error(
        `[i18n] ¡FALLO DE VALIDACIÓN DE DATOS EN TIEMPO DE EJECUCIÓN! El diccionario para "${validatedLocale}" está corrupto.`,
        { errors: validation.error.flatten().fieldErrors }
      );
      dictionariesCache[validatedLocale] = validation.data || {};
      return dictionariesCache[validatedLocale]!;
    }

    logger.success(
      `[i18n] Diccionario para '${validatedLocale}' cargado y validado con éxito.`
    );
    dictionariesCache[validatedLocale] = validation.data;
    return validation.data;
  } catch (error) {
    logger.error(
      `[i18n] No se pudo cargar el diccionario pre-compilado para ${validatedLocale}.`,
      { error }
    );
    // En caso de un error de lectura (ej. archivo no encontrado), devuelve un objeto vacío.
    return {};
  }
};
// lib/i18n.ts
