// app/[locale]/(dev)/dev/campaign-suite/_actions/_utils/zipper.ts
/**
 * @file zipper.ts
 * @description Módulo de utilidad de élite para la compresión de directorios en archivos .zip.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use server-only"; // ¡CRÍTICO! Este módulo solo debe ejecutarse en el servidor.

import fs from "fs";
import archiver from "archiver";
import { logger } from "@/shared/lib/logging";

/**
 * @function zipDirectory
 * @description Comprime el contenido de un directorio fuente en un archivo .zip de destino.
 * @param {string} sourceDir - La ruta al directorio que se va a comprimir.
 * @param {string} outPath - La ruta completa del archivo .zip de salida.
 * @returns {Promise<void>} Una promesa que se resuelve cuando la compresión ha finalizado.
 */
export function zipDirectory(sourceDir: string, outPath: string): Promise<void> {
  const traceId = logger.startTrace("zipDirectoryUtil");
  logger.info("[Zipper] Iniciando compresión de directorio...", { sourceDir, outPath });

  // Crea un stream de escritura para el archivo .zip de salida.
  const output = fs.createWriteStream(outPath);

  // Instancia el archivador, especificando el formato 'zip' y un alto nivel de compresión.
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Nivel de compresión máximo para archivos más pequeños.
  });

  return new Promise((resolve, reject) => {
    // Evento que se dispara cuando el stream de escritura se ha cerrado y el archivo está completo.
    output.on("close", () => {
      const bytes = archive.pointer();
      logger.success(
        `[Zipper] Compresión completada. Total: ${(
          bytes /
          1024 /
          1024
        ).toFixed(2)} MB`,
        { outPath, traceId }
      );
      resolve();
    });

    // Evento que se dispara si el archivador encuentra un error durante la operación.
    archive.on("error", (err) => {
      logger.error("[Zipper] Error crítico durante la compresión.", {
        error: err.message,
        traceId,
      });
      reject(err);
    });

    // Conecta el archivador al stream de salida.
    archive.pipe(output);

    // Añade el contenido del directorio fuente a la raíz del archivo .zip.
    // El segundo argumento `false` evita que se cree una carpeta contenedora con el nombre de `sourceDir`.
    archive.directory(sourceDir, false);

    // Finaliza el proceso de archivado. No se pueden añadir más archivos después de esto.
    // Esta llamada es la que inicia el proceso de compresión y escritura.
    archive.finalize();
  });
}
// app/[locale]/(dev)/dev/campaign-suite/_actions/_utils/zipper.ts
