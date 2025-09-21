// shared/lib/dev/i18n-discoverer.ts
/**
 * @file i18n-discoverer.ts
 * @description Utilidad pura y atómica del lado del servidor. Escanea el proyecto
 *              en busca de archivos de contenido .i18n.json, los lee y los parsea.
 *              Esta versión es resiliente a errores de parsing de JSON individuales
 *              y a fallos de lectura de directorios.
 * @version 4.0.0 (Holistic Elite Compliance & Resilience)
 * @author RaZ Podestá - MetaShark Tech
 */
import "server-only";
import * as fs from "fs/promises";
import * as path from "path";
import chalk from "chalk";
import { type Locale } from "@/shared/lib/i18n.config";
import { logger } from "@/shared/lib/logging";

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
export type I18nFileContent = { [key in Locale]?: Record<string, unknown> };

/**
 * @type DiscoveryResult
 * @description Define la estructura del objeto de retorno.
 */
export type DiscoveryResult = {
  files: string[];
  contents: I18nFileContent[];
};

/**
 * @function discoverAndReadI18nFiles
 * @description Escanea recursivamente los directorios de contenido, lee todos los
 *              archivos `.i18n.json` y devuelve sus rutas y contenidos parseados.
 * @param {object} [options] - Opciones de configuración.
 * @param {boolean} [options.excludeDevContent=false] - Si es true, omite los archivos de contenido de desarrollo.
 * @returns {Promise<DiscoveryResult>} Un objeto con dos arrays: `files` (rutas) y `contents` (contenidos).
 */
export async function discoverAndReadI18nFiles(options?: {
  excludeDevContent?: boolean;
}): Promise<DiscoveryResult> {
  const { excludeDevContent = false } = options || {};
  logger.trace(
    "[i18n-discoverer] Iniciando descubrimiento de archivos (v4.0 Elite)..."
  );

  const files: string[] = [];
  const contents: I18nFileContent[] = [];

  if (excludeDevContent) {
    logger.trace("[i18n-discoverer] Modo de exclusión de desarrollo activado.");
  }

  for (const dir of CONTENT_ROOT_DIRS) {
    try {
      const dirEntries = await fs.readdir(dir, {
        recursive: true,
        withFileTypes: true,
      });

      for (const entry of dirEntries) {
        if (entry.isFile() && entry.name.endsWith(".i18n.json")) {
          const filePath = path.join(entry.path, entry.name);

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

          try {
            const contentString = await fs.readFile(filePath, "utf-8");
            const parsedContent = JSON.parse(contentString);
            files.push(filePath);
            contents.push(parsedContent);
          } catch (error) {
            console.warn(
              chalk.yellow(
                `[i18n-discoverer] ADVERTENCIA: No se pudo leer o parsear el archivo ${path.relative(
                  process.cwd(),
                  filePath
                )}. Se omitirá.`
              ),
              { error: error instanceof Error ? error.message : String(error) }
            );
          }
        }
      }
    } catch (err) {
      logger.warn(
        `[i18n-discoverer] ADVERTENCIA: No se pudo escanear el directorio raíz ${path.relative(process.cwd(), dir)}. Se omitirá.`,
        { error: err instanceof Error ? err.message : String(err) }
      );
    }
  }

  logger.trace(
    `Descubrimiento finalizado. Se procesaron ${contents.length} archivos de contenido.`
  );
  return { files, contents };
}
// shared/lib/dev/i18n-discoverer.ts
