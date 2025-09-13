// lib/i18n/campaign.data.loader.ts
/**
 * @file campaign.data.loader.ts
 * @description Aparato Atómico: Cargador de Datos de Campaña. Refactorizado para
 *              utilizar `fs.promises.readFile` en lugar de `import()` dinámico,
 *              garantizando robustez en el build de producción y mejorando el
 *              manejo de errores y la observabilidad.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import "server-only";
import fs from "fs/promises";
import path from "path";
import { logger } from "@/lib/logging";

/**
 * @function constructAssetPath
 * @description Helper puro que construye una ruta de archivo absoluta y segura.
 * @param {string} campaignId - El ID de la campaña.
 * @param {string} assetPath - La ruta relativa del activo.
 * @returns {string} La ruta absoluta del archivo en el sistema.
 * @private
 */
const constructAssetPath = (campaignId: string, assetPath: string): string => {
  const normalizedAssetPath = assetPath.startsWith("./")
    ? assetPath.substring(2)
    : assetPath;

  return path.join(
    process.cwd(),
    "src",
    "content",
    "campaigns",
    campaignId,
    normalizedAssetPath
  );
};

/**
 * @function loadCampaignAsset
 * @description Carga y parsea un activo de campaña (archivo JSON) desde el sistema de archivos.
 *              Este es un componente de servidor y es la SSoT para la carga de datos de activos.
 * @template T - El tipo esperado del contenido del archivo JSON.
 * @param {string} campaignId - El identificador del directorio de la campaña (ej. "12157").
 * @param {string} assetPath - La ruta relativa al archivo de activo desde el directorio de la campaña (ej. "./themes/theme.json").
 * @returns {Promise<T>} Una promesa que resuelve con el contenido del archivo JSON parseado.
 * @throws {Error} Lanza un error enriquecido si el archivo no se encuentra, no se puede leer o no es un JSON válido.
 */
export async function loadCampaignAsset<T>(
  campaignId: string,
  assetPath: string
): Promise<T> {
  logger.startGroup(
    `[Cargador] Iniciando carga para Campaña: ${campaignId}, Activo: ${assetPath}`
  );

  const absolutePath = constructAssetPath(campaignId, assetPath);
  logger.trace(`Ruta absoluta resuelta: ${absolutePath}`);

  try {
    const fileContent = await fs.readFile(absolutePath, "utf-8");
    logger.trace(`Archivo leído exitosamente (${fileContent.length} bytes).`);

    const parsedContent: T = JSON.parse(fileContent);
    logger.success(`Activo parseado y cargado con éxito.`);

    return parsedContent;
  } catch (error: unknown) {
    let errorMessage = `Error desconocido al cargar el activo.`;
    if (error instanceof Error) {
      if ("code" in error && error.code === "ENOENT") {
        errorMessage = `El archivo de activo no se encontró en la ruta: ${absolutePath}`;
      } else if (error instanceof SyntaxError) {
        errorMessage = `Error de sintaxis al parsear el JSON del activo: ${absolutePath}`;
      } else {
        errorMessage = `Error al leer el archivo de activo: ${absolutePath}`;
      }
      // Adjuntamos el mensaje original para más contexto
      errorMessage += ` | Causa Original: ${error.message}`;
    }

    logger.error(`[Cargador] Fallo crítico al cargar activo.`, {
      campaignId,
      assetPath,
      absolutePath,
      originalError: error,
    });

    throw new Error(errorMessage);
  } finally {
    logger.endGroup();
  }
}
// lib/i18n/campaign.data.loader.ts
