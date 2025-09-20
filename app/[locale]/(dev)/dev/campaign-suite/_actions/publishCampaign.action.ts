// app/[locale]/(dev)/dev/campaign-suite/_actions/publishCampaign.action.ts
/**
 * @file publishCampaign.action.ts
 * @description Server Action orquestadora para publicar los activos de una campaña.
 * @version 6.1.0 (Elite Compliance Leveling)
 * @author RaZ Podestá - MetaShark Tech
 */
"use server";

import path from "path";
import { logger } from "@/shared/lib/logging";
import type { ActionResult } from "@/shared/lib/types/actions.types";
import type { CampaignDraft } from "../_types/draft.types";
import {
  getOrCreateNextVariantId,
  updateCampaignMap,
} from "./_utils/campaignMapManager";
import { generateCampaignAssets } from "./_utils/assetGenerator";

interface PublishSuccessPayload {
  message: string;
  variantId: string;
}

export async function publishCampaignAction(
  draft: CampaignDraft
): Promise<ActionResult<PublishSuccessPayload>> {
  const { baseCampaignId, draftId } = draft;
  if (!baseCampaignId) {
    return {
      success: false,
      error: "Faltan datos fundamentales del borrador.",
    };
  }

  const traceId = logger.startTrace(`publishCampaign:${draftId}`);
  logger.startGroup("[Action] Publicando activos (DRY & Elite)...");

  try {
    const productionCampaignDir = path.join(
      process.cwd(),
      "content",
      "campaigns",
      baseCampaignId
    );

    const { nextVariantId, campaignMap } = await getOrCreateNextVariantId(
      productionCampaignDir
    );
    logger.traceEvent(traceId, "Próximo ID de variante obtenido.", {
      nextVariantId,
    });

    // Delegar la generación de archivos y la actualización del mapa en memoria
    const { updatedMap, mapPath } = await generateCampaignAssets(
      draft,
      campaignMap,
      nextVariantId,
      productionCampaignDir
    );
    logger.traceEvent(
      traceId,
      "Archivos de activos generados en el directorio de producción."
    );

    // Escribir el mapa actualizado en el disco
    await updateCampaignMap(updatedMap, mapPath);
    logger.traceEvent(
      traceId,
      "Mapa de campaña de producción actualizado en disco."
    );

    logger.endGroup();
    logger.endTrace(traceId);
    return {
      success: true,
      data: {
        message: "¡Activos publicados con éxito!",
        variantId: nextVariantId,
      },
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido.";
    logger.error("Fallo crítico durante la publicación de activos.", {
      error: errorMessage,
    });
    logger.endGroup();
    logger.endTrace(traceId);
    return {
      success: false,
      error: `No se pudo publicar la campaña: ${errorMessage}`,
    };
  }
}
// app/[locale]/(dev)/dev/campaign-suite/_actions/publishCampaign.action.ts
