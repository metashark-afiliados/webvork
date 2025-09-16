// app/[locale]/(dev)/dev/campaign-suite/_actions/getBaseCampaigns.action.ts
/**
 * @file getBaseCampaigns.action.ts
 * @description Server Action dedicada para obtener la lista de campañas base.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use server";

import { logger } from "@/lib/logging";
import { getAllCampaignsAndVariants } from "@/lib/dev/campaign.utils";
import type { ActionResult } from "@/lib/types/actions.types";

export async function getBaseCampaignsAction(): Promise<ActionResult<string[]>> {
  try {
    const campaigns = await getAllCampaignsAndVariants();
    const baseCampaigns = Array.from(new Set(campaigns.map((c) => c.campaignId)));
    logger.success(
      `[Action] ${baseCampaigns.length} campañas base encontradas.`
    );
    return { success: true, data: baseCampaigns };
  } catch (error) {
    logger.error("Fallo al obtener las campañas base.", { error });
    return {
      success: false,
      error: "No se pudieron cargar las campañas base desde el servidor.",
    };
  }
}
// app/[locale]/(dev)/dev/campaign-suite/_actions/getBaseCampaigns.action.ts
