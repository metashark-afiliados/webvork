// app/[locale]/(dev)/dev/campaign-suite/_actions/_generators/generateContentFile.ts
/**
 * @file generateContentFile.ts
 * @description Módulo generador soberano para el archivo de contenido de la campaña.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use server-only";

import fs from "fs/promises";
import path from "path";
import { logger } from "@/shared/lib/logging";
import type { CampaignDraft } from "../../../_types/draft.types";
import { transformDraftToContentObject } from "../_utils/campaignDataTransformer";

/**
 * @function generateContentFile
 * @description Transforma los datos del borrador y los escribe en un archivo content.json.
 * @param {CampaignDraft} draft - El borrador de la campaña.
 * @param {string} targetDir - El directorio raíz del proyecto exportado.
 * @returns {Promise<void>}
 */
export async function generateContentFile(
  draft: CampaignDraft,
  targetDir: string
): Promise<void> {
  logger.trace("[Generator] Iniciando generación de content.json...");

  try {
    const contentObject = transformDraftToContentObject(draft);

    const contentDir = path.join(targetDir, "content");
    await fs.mkdir(contentDir, { recursive: true });

    const fileContent = JSON.stringify(contentObject, null, 2);
    const filePath = path.join(contentDir, "content.json");
    await fs.writeFile(filePath, fileContent);

    logger.trace(
      `[Generator] Archivo content.json escrito exitosamente en: ${filePath}`
    );
  } catch (error) {
    logger.error("[Generator] Fallo crítico al generar content.json.", {
      error,
    });
    throw error;
  }
}
// app/[locale]/(dev)/dev/campaign-suite/_actions/_generators/generateContentFile.ts
