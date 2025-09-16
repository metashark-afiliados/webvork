// app/[locale]/(dev)/dev/campaign-suite/_actions/generateAndPackageCampaign.action.ts
/**
 * @file generateAndPackageCampaign.action.ts
 * @description Server Action orquestadora para el proceso completo de generación y empaquetado.
 *              v1.1.0: Corregida la importación de tipos para apuntar a la SSoT atomizada.
 * @version 1.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use server";

import { logger } from "@/lib/logging";
import type { ActionResult } from "@/lib/types/actions.types";
// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
import type { CampaignDraft } from "../_types/draft.types";
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---
import { generateCampaignAssetsAction } from "./generateCampaignAssets.action";

interface GenerationSuccessPayload {
  message: string;
  downloadUrl: string;
}

export async function generateAndPackageCampaignAction(
  draft: CampaignDraft
): Promise<ActionResult<GenerationSuccessPayload>> {
  logger.startGroup(
    "[Action] Orquestando Generación y Empaquetado de Campaña..."
  );

  try {
    const assetResult = await generateCampaignAssetsAction(draft);
    if (!assetResult.success) {
      return assetResult;
    }

    logger.info("Activos .json generados con éxito.");

    // TODO: Implementar la lógica de build y empaquetado real.
    logger.info("Invocando build estático de Next.js (simulado)...");
    const buildSuccess = true;
    if (!buildSuccess) {
      throw new Error("El proceso de build de Next.js falló.");
    }
    logger.success("Build estático completado con éxito (simulado).");

    logger.info(
      "Empaquetando la salida del build en un archivo .zip (simulado)..."
    );
    const downloadUrl = `/downloads/campaign-${draft.draftId}.zip`;
    logger.success(`Paquete creado. URL de descarga: ${downloadUrl}`);

    logger.endGroup();
    return {
      success: true,
      data: {
        message: "Paquete de campaña generado y listo para descargar.",
        downloadUrl,
      },
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido.";
    logger.error("Fallo crítico durante la orquestación de la generación.", {
      error: errorMessage,
    });
    logger.endGroup();
    return {
      success: false,
      error: `No se pudo generar el paquete de la campaña: ${errorMessage}`,
    };
  }
}
// app/[locale]/(dev)/dev/campaign-suite/_actions/generateAndPackageCampaign.action.ts
