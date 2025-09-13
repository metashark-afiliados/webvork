// app/[locale]/(dev)/dev/layout-configurator/_actions/saveLayoutForVariant.action.ts
/**
 * @file saveLayoutForVariant.action.ts
 * @description Server Action atómica para guardar la nueva configuración de
 *              layout de una variante de campaña.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use server";

import { promises as fs } from "fs";
import path from "path";
import { resolveCampaignAssets } from "@/lib/i18n/campaign.map.resolver";
import { CampaignThemeSchema } from "@/lib/i18n/campaign.data.processor";
import { logger } from "@/lib/logging";
import { revalidatePath } from "next/cache";

type SectionLayout = { name: string };

interface ActionResult {
  success: boolean;
  message?: string;
}

/**
 * @action saveLayoutForVariant
 * @description Modifica el archivo de tema de una variante de campaña con un
 *              nuevo array de `layout.sections`, validando la integridad del
 *              archivo antes de guardarlo.
 * @param {string} campaignId - El ID de la campaña a modificar.
 * @param {string} variantId - El ID de la variante a modificar.
 * @param {SectionLayout[]} newSections - El nuevo array de secciones.
 * @returns {Promise<ActionResult>} Un objeto indicando el resultado de la operación.
 */
export async function saveLayoutForVariant(
  campaignId: string,
  variantId: string,
  newSections: SectionLayout[]
): Promise<ActionResult> {
  logger.info(
    `[Action] Ejecutando saveLayoutForVariant para ${campaignId}/${variantId}`
  );
  try {
    const assetMap = await resolveCampaignAssets(campaignId, variantId);
    const themePath = path.join(
      process.cwd(),
      "src",
      "content",
      "campaigns",
      campaignId,
      assetMap.theme.replace("./", "")
    );

    const themeContent = await fs.readFile(themePath, "utf-8");
    const themeJson = JSON.parse(themeContent);

    // Modifica el layout
    themeJson.layout.sections = newSections;

    // Valida el nuevo objeto completo contra su SSoT
    const validation = CampaignThemeSchema.safeParse(themeJson);
    if (!validation.success) {
      logger.error("[Action] El nuevo layout es inválido y no se guardará.", {
        errors: validation.error.flatten(),
      });
      throw new Error("El nuevo layout es inválido.");
    }

    // Sobrescribe el archivo con el contenido validado y formateado
    await fs.writeFile(
      themePath,
      JSON.stringify(validation.data, null, 2),
      "utf-8"
    );

    // Invalida el caché de la ruta de la campaña para ver los cambios
    revalidatePath(`/c/${campaignId}/.*`, "layout");

    logger.success(
      `[Action] Layout para ${campaignId}/${variantId} guardado con éxito.`
    );
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`[Action] Fallo en saveLayoutForVariant`, {
      campaignId,
      variantId,
      error: errorMessage,
    });
    return { success: false, message: errorMessage };
  }
}
// app/[locale]/(dev)/dev/layout-configurator/_actions/saveLayoutForVariant.action.ts
