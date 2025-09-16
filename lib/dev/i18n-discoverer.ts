// lib/dev/i18n-discoverer.ts
/**
 * @file i18n-discoverer.ts
 * @description Utilidad pura y atómica del lado del servidor.
 *              v2.0.0 (Build Fix): Se elimina la importación de "server-only"
 *              para garantizar la compatibilidad con entornos de ejecución de
 *              scripts externos a Next.js (como tsx), resolviendo el error
 *              ERR_MODULE_NOT_FOUND.
 * @version 2.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
// import "server-only"; // <-- ¡ELIMINADO!
import * as fs from "fs/promises";
import * as path from "path";
import chalk from "chalk";
import { type Locale } from "@/lib/i18n.config";
import { logger } from "@/lib/logging";

// SSoT para las rutas de origen de contenido.
const CONTENT_ROOT_DIRS = [
  path.resolve(process.cwd(), "messages"),
  path.resolve(process.cwd(), "components/razBits"),
];

// SSoT para las rutas a ignorar en ciertos modos.
const DEV_CONTENT_PATHS_TO_IGNORE = [
  path.join("messages", "components", "dev"),
  path.join("messages", "pages", "dev"),
];

// Contrato de datos para el contenido de un archivo i18n.
export type I18nFileContent = { [key in Locale]?: Record<string, any> };

/**
 * @function discoverAndReadI18nFiles
 * @description Escanea recursivamente los directorios de contenido, lee todos los
 *              archivos `.i18n.json` y devuelve un array con sus contenidos parseados.
 * @param {object} [options] - Opciones de configuración.
 * @param {boolean} [options.excludeDevContent=false] - Si es true, omite los archivos de contenido de desarrollo.
 * @returns {Promise<I18nFileContent[]>} Un array de los contenidos de los archivos.
 */
export async function discoverAndReadI18nFiles(options?: {
  excludeDevContent?: boolean;
}): Promise<I18nFileContent[]> {
  const { excludeDevContent = false } = options || {};
  logger.trace("[i18n-discoverer] Iniciando descubrimiento de archivos...");

  const allContents: I18nFileContent[] = [];

  if (excludeDevContent) {
    logger.trace("[i18n-discoverer] Modo de exclusión de desarrollo activado.");
  }

  for (const dir of CONTENT_ROOT_DIRS) {
    try {
      const files = await fs.readdir(dir, {
        recursive: true,
        withFileTypes: true,
      });

      for (const file of files) {
        if (file.isFile() && file.name.endsWith(".i18n.json")) {
          const filePath = path.join(file.path, file.name);

          // Lógica de exclusión
          if (
            excludeDevContent &&
            DEV_CONTENT_PATHS_TO_IGNORE.some((devPath) =>
              filePath.includes(devPath)
            )
          ) {
            logger.trace(
              `[i18n-discoverer] Omitiendo archivo de desarrollo: ${path.relative(
                process.cwd(),
                filePath
              )}`
            );
            continue;
          }

          // Resiliencia a nivel de archivo
          try {
            const contentString = await fs.readFile(filePath, "utf-8");
            allContents.push(JSON.parse(contentString));
          } catch (error) {
            console.warn(
              chalk.yellow(
                `[i18n-discoverer] ADVERTENCIA: No se pudo leer o parsear el archivo ${path.relative(
                  process.cwd(),
                  filePath
                )}. Se omitirá.`
              )
            );
          }
        }
      }
    } catch (err) {
      logger.warn(
        `[i18n-discoverer] ADVERTENCIA: No se pudo escanear el directorio ${dir}.`
      );
    }
  }

  logger.trace(
    `[i18n-discoverer] Descubrimiento finalizado. Se encontraron ${allContents.length} archivos de contenido.`
  );
  return allContents;
}
// lib/dev/i18n-discoverer.ts
