// lib/ssg/packager.ts
/**
 * @file packager.ts
 * @description Utilidad de bajo nivel para empaquetar un directorio en un
 *              archivo .zip. NO es una Server Action.
 * @version 1.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
import "server-only";
import fs from "fs";
import path from "path";
import archiver from "archiver";
import { logger } from "@/shared/lib/logging";

export function packageDirectory(
  sourceDir: string,
  outPath: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    // ... (Lógica interna sin cambios)
    logger.info("Iniciando proceso de empaquetado .zip...", {
      source: sourceDir,
      destination: outPath,
    });
    const output = fs.createWriteStream(outPath);
    const archive = archiver("zip", { zlib: { level: 9 } });
    output.on("close", () => {
      const sizeInKb = (archive.pointer() / 1024).toFixed(2);
      logger.success(
        `Paquete .zip creado con éxito. Tamaño total: ${sizeInKb} KB`
      );
      resolve();
    });
    archive.on("error", (err) => {
      logger.error("Error durante el archivado .zip.", { err });
      reject(err);
    });
    archive.pipe(output);
    archive.directory(sourceDir, false);
    archive.finalize();
  });
}
// lib/ssg/packager.ts
