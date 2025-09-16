// lib/i18n/campaign.data.loader.ts
/**
 * @file campaign.data.loader.ts
 * @description Aparato Atómico: Cargador de Activos JSON.
 *              v3.0.0 - Generalizado para cargar desde diferentes directorios raíz.
 * @version 3.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import "server-only";
import fs from "fs/promises";
import path from "path";
import { logger } from "@/lib/logging";

// El tipo ahora es más genérico para permitir cualquier subdirectorio de 'content'
type AssetRoot = "campaigns" | "themes" | "theme-fragments";

export async function loadJsonAsset<T>(
  rootDir: AssetRoot,
  ...pathSegments: string[]
): Promise<T> {
  const fullPath = path.join(
    process.cwd(),
    "content",
    rootDir,
    ...pathSegments
  );
  logger.trace(`[Cargador] Cargando activo JSON desde: ${fullPath}`);

  try {
    const fileContent = await fs.readFile(fullPath, "utf-8");
    return JSON.parse(fileContent) as T;
  } catch (error: unknown) {
    logger.error(
      `[Cargador] Fallo crítico al cargar activo desde ${fullPath}`,
      {
        error,
      }
    );
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      throw new Error(`Activo no encontrado: ${fullPath}`);
    }
    throw new Error(`No se pudo cargar o parsear el activo: ${fullPath}`);
  }
}
// lib/i18n/campaign.data.loader.ts
