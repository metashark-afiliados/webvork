// app/[locale]/(dev)/dev/campaign-suite/_actions/packageCampaign.action.ts
/**
 * @file packageCampaign.action.ts
 * @description Server Action orquestadora para el empaquetado de una campaña.
 * @version 7.1.0 (Elite Compliance Leveling)
 * @author RaZ Podestá - MetaShark Tech
 */
"use server";

import { promises as fs } from "fs";
import path from "path";
import os from "os";
import { logger } from "@/shared/lib/logging";
import type { ActionResult } from "@/shared/lib/types/actions.types";
import type { CampaignDraft } from "../_types/draft.types";
import { runScopedNextBuild } from "@/shared/lib/ssg/programmatic-builder";
import { packageDirectory } from "@/shared/lib/ssg/packager";
import {
  getOrCreateNextVariantId,
  updateCampaignMap,
} from "./_utils/campaignMapManager";
import { generateCampaignAssets } from "./_utils/assetGenerator";

interface PackageSuccessPayload {
  message: string;
  downloadUrl: string;
}

export async function packageCampaignAction(
  draft: CampaignDraft
): Promise<ActionResult<PackageSuccessPayload>> {
  const { draftId, baseCampaignId } = draft;
  if (!draftId || !baseCampaignId) {
    return {
      success: false,
      error: "Faltan datos fundamentales del borrador.",
    };
  }

  const traceId = logger.startTrace(`packageCampaign:${draftId}`);
  logger.startGroup("[Action] Empaquetando Campaña (DRY & Elite)...");
  let tempDir: string | null = null;

  try {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), `campaign-${draftId}-`));
    const tempCampaignDir = path.join(
      tempDir,
      "content",
      "campaigns",
      baseCampaignId
    );

    const { nextVariantId, campaignMap } =
      await getOrCreateNextVariantId(tempCampaignDir);
    const { updatedMap, mapPath } = await generateCampaignAssets(
      draft,
      campaignMap,
      nextVariantId,
      tempCampaignDir
    );
    await updateCampaignMap(updatedMap, mapPath);
    logger.traceEvent(traceId, "Activos temporales generados.");

    await runScopedNextBuild(baseCampaignId, nextVariantId, tempDir);
    logger.traceEvent(traceId, "Build estático de Next.js completado.");

    const buildOutputDir = path.join(process.cwd(), "out");
    const zipFileName = `campaign-package-${draftId}.zip`;
    const zipOutputPath = path.join(tempDir, zipFileName);

    await packageDirectory(buildOutputDir, zipOutputPath);
    logger.traceEvent(traceId, "Salida del build empaquetada en .zip.");

    const fileBuffer = await fs.readFile(zipOutputPath);
    const dataUrl = `data:application/zip;base64,${fileBuffer.toString("base64")}`;

    logger.endGroup();
    logger.endTrace(traceId);
    return {
      success: true,
      data: { message: "Paquete generado con éxito.", downloadUrl: dataUrl },
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido.";
    logger.error("Fallo crítico durante el empaquetado.", {
      error: errorMessage,
    });
    logger.endGroup();
    logger.endTrace(traceId);
    return {
      success: false,
      error: `No se pudo generar el paquete: ${errorMessage}`,
    };
  } finally {
    if (tempDir) {
      await fs.rm(tempDir, { recursive: true, force: true });
      logger.traceEvent(traceId, "Directorio temporal completo eliminado.");
    }
  }
}
// app/[locale]/(dev)/dev/campaign-suite/_actions/packageCampaign.action.ts
