// app/[locale]/(dev)/dev/campaign-suite/_actions/publishCampaign.action.ts
/**
 * @file publishCampaign.action.ts
 * @description Server Action orquestadora para publicar los activos de una campaña.
 *              v7.0.0 (Functional & Elite Compliance): Implementación completa
 *              que orquesta las utilidades atómicas para una publicación robusta y
 *              desacoplada.
 * @version 7.0.0
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
import { CampaignDraftSchema } from "@/shared/lib/schemas/entities/draft.schema";

interface PublishSuccessPayload {
  message: string;
  variantId: string;
}

export async function publishCampaignAction(
  draft: CampaignDraft
): Promise<ActionResult<PublishSuccessPayload>> {
  const traceId = logger.startTrace(`publishCampaign:${draft.draftId}`);
  logger.startGroup("[Action] Publicando activos (v7.0 Elite)...");

  try {
    // 1. Validar el borrador completo
    const validation = CampaignDraftSchema.safeParse(draft);
    if (!validation.success) {
      logger.error("[Action] El borrador a publicar es inválido.", {
        errors: validation.error.flatten(),
        traceId,
      });
      return { success: false, error: "El borrador contiene datos corruptos." };
    }
    const validatedDraft = validation.data;
    const { baseCampaignId, draftId } = validatedDraft;

    if (!baseCampaignId) {
      throw new Error(
        "El borrador no tiene un ID de campaña base seleccionado."
      );
    }

    // 2. Definir el directorio de producción
    const productionCampaignDir = path.join(
      process.cwd(),
      "content",
      "campaigns",
      baseCampaignId
    );

    // 3. Delegar la obtención del próximo ID de variante y el mapa actual
    const { nextVariantId, campaignMap } = await getOrCreateNextVariantId(
      productionCampaignDir
    );
    logger.traceEvent(traceId, "Próximo ID de variante obtenido.", {
      nextVariantId,
    });

    // 4. Delegar la generación de archivos y la actualización del mapa en memoria
    const { updatedMap, mapPath } = await generateCampaignAssets(
      validatedDraft,
      campaignMap,
      nextVariantId,
      productionCampaignDir
    );
    logger.traceEvent(
      traceId,
      "Archivos de activos generados en el directorio de producción."
    );

    // 5. Delegar la escritura final del mapa actualizado en el disco
    await updateCampaignMap(updatedMap, mapPath);
    logger.traceEvent(
      traceId,
      "Mapa de campaña de producción actualizado en disco."
    );

    logger.endGroup();
    logger.success(
      `[Action] Publicación completada para la nueva variante: ${nextVariantId}`
    );
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
      traceId,
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
