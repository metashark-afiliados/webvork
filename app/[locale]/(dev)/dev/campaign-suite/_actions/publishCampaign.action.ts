// app/[locale]/(dev)/dev/campaign-suite/_actions/publishCampaign.action.ts
/**
 * @file publishCampaign.action.ts
 * @description Server Action orquestadora para publicar los activos de una campaña.
 *              v4.0.0 (Atomic Map Update): Refactorizado para garantizar la atomicidad
 *              de las operaciones de actualización del mapa de campaña y los archivos de activos,
 *              resolviendo el bug crítico de race condition.
 * @version 4.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use server";

import { promises as fs } from "fs";
import path from "path";
import { logger } from "@/lib/logging";
import type { ActionResult } from "@/lib/types/actions.types";
import type { CampaignDraft } from "../_types/draft.types";
import { transformDraftToContentObject } from "./_utils/campaignDataTransformer";
import {
  getOrCreateNextVariantId,
  generateCampaignFileNames,
  updateCampaignMapEntry,
  type CampaignVariantFileNames,
} from "./_utils/campaignMapManager";

interface PublishSuccessPayload {
  message: string;
  variantId: string;
  contentPath: string;
  themePath: string;
  mapPath: string;
}

export async function publishCampaignAction(
  draft: CampaignDraft
): Promise<ActionResult<PublishSuccessPayload>> {
  const traceId = logger.startTrace(`publishCampaign:${draft.draftId}`);
  logger.startGroup(
    "[Action] Publicando activos de campaña (Atomic Update)..."
  );

  const { baseCampaignId, variantName, seoKeywords } = draft;

  if (!baseCampaignId || !variantName || !seoKeywords || !draft.themeConfig) {
    const errorMsg =
      "Faltan datos fundamentales del borrador para la publicación.";
    logger.error(errorMsg, { draft });
    logger.endGroup();
    return { success: false, error: errorMsg };
  }

  try {
    const productionCampaignDir = path.join(
      process.cwd(),
      "content",
      "campaigns",
      baseCampaignId
    );

    // 1. Obtener el próximo ID de variante y el mapa actual (en memoria) de forma atómica.
    const { nextVariantId, campaignMap } = await getOrCreateNextVariantId(
      productionCampaignDir
    );
    logger.traceEvent(traceId, "Próximo ID de variante obtenido.", {
      nextVariantId,
    });

    // 2. Generar los nombres de archivo finales utilizando el ID de variante.
    const fileNames: CampaignVariantFileNames = generateCampaignFileNames(
      draft,
      nextVariantId
    );
    logger.traceEvent(traceId, "Nombres de archivo finales generados.", {
      fileNames,
    });

    // 3. Transformar los datos del borrador a los objetos de contenido y tema.
    const contentObject = transformDraftToContentObject(draft);
    const themeObject = {
      layout: { sections: draft.layoutConfig },
      themeOverrides: draft.themeConfig.themeOverrides ?? {},
    };
    logger.traceEvent(
      traceId,
      "Datos del borrador transformados a objetos de contenido y tema."
    );

    // 4. Definir las rutas completas de los archivos.
    const themePath = path.join(
      productionCampaignDir,
      "themes",
      fileNames.themeFileName
    );
    const contentPath = path.join(
      productionCampaignDir,
      "content",
      fileNames.contentFileName
    );
    const mapPath = path.join(productionCampaignDir, "campaign.map.json");

    // 5. Asegurar que los directorios existan.
    await fs.mkdir(path.dirname(themePath), { recursive: true });
    await fs.mkdir(path.dirname(contentPath), { recursive: true });
    logger.traceEvent(traceId, "Directorios de destino asegurados.");

    // 6. Escribir los archivos de tema y contenido con sus nombres finales.
    await fs.writeFile(themePath, JSON.stringify(themeObject, null, 2));
    await fs.writeFile(contentPath, JSON.stringify(contentObject, null, 2));
    logger.success("Archivos de TEMA y CONTENIDO generados.", {
      themePath,
      contentPath,
    });
    logger.traceEvent(traceId, "Archivos de activos escritos en disco.");

    // 7. Actualizar el mapa de campaña con la nueva entrada y guardar el mapa una única vez.
    await updateCampaignMapEntry(
      productionCampaignDir,
      nextVariantId,
      draft,
      fileNames,
      campaignMap // Pasa el objeto del mapa en memoria para ser modificado y escrito
    );
    logger.success("campaign.map.json actualizado con la nueva variante.");
    logger.traceEvent(traceId, "Mapa de campaña actualizado y guardado.");

    logger.endGroup();
    logger.endTrace(traceId);
    return {
      success: true,
      data: {
        message: "¡Activos publicados con éxito!",
        variantId: nextVariantId,
        contentPath,
        themePath,
        mapPath,
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

