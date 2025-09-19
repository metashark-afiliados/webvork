// app/[locale]/(dev)/dev/campaign-suite/_actions/packageCampaign.action.ts
/**
 * @file packageCampaign.action.ts
 * @description Server Action orquestadora para el empaquetado de una campaña.
 *              v4.0.0 (Atomic Map Update): Refactorizado para garantizar la atomicidad
 *              de las operaciones de actualización del mapa de campaña durante el empaquetado.
 * @version 4.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use server";

import { promises as fs } from "fs";
import path from "path";
import os from "os";
import { logger } from "@/lib/logging";
import type { ActionResult } from "@/lib/types/actions.types";
import type { CampaignDraft } from "../_types/draft.types";
import { runScopedNextBuild } from "@/lib/ssg/programmatic-builder";
import { packageDirectory } from "@/lib/ssg/packager";
import { transformDraftToContentObject } from "./_utils/campaignDataTransformer";
import {
  getOrCreateNextVariantId,
  generateCampaignFileNames,
  updateCampaignMapEntry,
  type CampaignVariantFileNames,
} from "./_utils/campaignMapManager";

interface PackageSuccessPayload {
  message: string;
  downloadUrl: string;
}

export async function packageCampaignAction(
  draft: CampaignDraft
): Promise<ActionResult<PackageSuccessPayload>> {
  if (
    !draft.draftId ||
    !draft.baseCampaignId ||
    !draft.variantName ||
    !draft.seoKeywords ||
    !draft.themeConfig
  ) {
    const errorMsg =
      "ID de borrador, de campaña base, nombre de variante o configuración de tema no encontrado.";
    logger.error(errorMsg, { draft });
    return { success: false, error: errorMsg };
  }

  const traceId = logger.startTrace(`packageCampaign:${draft.draftId}`);
  logger.startGroup("[Action] Empaquetando Campaña (Atomic Update)...");
  let tempDir: string | null = null;

  try {
    tempDir = await fs.mkdtemp(
      path.join(os.tmpdir(), `campaign-${draft.draftId}-`)
    );
    logger.traceEvent(traceId, "Directorio temporal creado", { path: tempDir });

    const contentObject = transformDraftToContentObject(draft);
    const themeObject = {
      layout: { sections: draft.layoutConfig },
      themeOverrides: draft.themeConfig.themeOverrides ?? {},
    };

    const { nextVariantId, campaignMap } = await getOrCreateNextVariantId(
      path.join(process.cwd(), "content", "campaigns", draft.baseCampaignId)
    );
    logger.traceEvent(
      traceId,
      "Próximo ID de variante obtenido para empaquetado.",
      { nextVariantId }
    );

    const fileNames: CampaignVariantFileNames = generateCampaignFileNames(
      draft,
      nextVariantId
    );

    const tempCampaignDir = path.join(tempDir, draft.baseCampaignId);
    await fs.mkdir(path.join(tempCampaignDir, "content"), { recursive: true });
    await fs.mkdir(path.join(tempCampaignDir, "themes"), { recursive: true });

    const tempThemePath = path.join(
      tempCampaignDir,
      "themes",
      fileNames.themeFileName
    );
    const tempContentPath = path.join(
      tempCampaignDir,
      "content",
      fileNames.contentFileName
    );
    await fs.writeFile(tempThemePath, JSON.stringify(themeObject, null, 2));
    await fs.writeFile(tempContentPath, JSON.stringify(contentObject, null, 2));
    logger.traceEvent(
      traceId,
      "Activos temporales de tema y contenido escritos."
    );

    await updateCampaignMapEntry(
      tempCampaignDir,
      nextVariantId,
      draft,
      fileNames,
      campaignMap
    );
    logger.traceEvent(traceId, "campaign.map.json temporal actualizado.");

    await runScopedNextBuild(draft.baseCampaignId, nextVariantId);
    logger.traceEvent(traceId, "Build estático de Next.js completado.");

    const buildOutputDir = path.join(process.cwd(), "out");
    const zipFileName = `campaign-package-${draft.draftId}.zip`;
    const zipOutputPath = path.join(tempDir, zipFileName);

    await packageDirectory(buildOutputDir, zipOutputPath);
    logger.traceEvent(traceId, "Salida del build empaquetada en .zip.");

    const fileBuffer = await fs.readFile(zipOutputPath);
    const dataUrl = `data:application/zip;base64,${fileBuffer.toString("base64")}`;

    logger.endGroup();
    logger.endTrace(traceId);
    return {
      success: true,
      data: {
        message: "Paquete de campaña generado con éxito.",
        downloadUrl: dataUrl,
      },
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido.";
    logger.error("Fallo crítico durante el empaquetado de la campaña.", {
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
      logger.traceEvent(traceId, "Directorio temporal eliminado.");
    }
  }
}
