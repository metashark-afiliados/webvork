// app/[locale]/(dev)/dev/campaign-suite/_actions/saveCampaignAsset.action.ts
/**
 * @file saveCampaignAsset.action.ts
 * @description Server Action para guardar un activo de campaña (ej. logo).
 * @version 1.0.0
 * @author IA Ingeniera de Software Senior v2.0 (Gemini)
 */
"use server";

import { promises as fs } from "fs";
import path from "path";
import { logger } from "@/lib/logging";

interface ActionResult {
  success: boolean;
  error?: string;
  path?: string;
}

export async function saveCampaignAssetAction(
  campaignId: string,
  variantId: string,
  formData: FormData
): Promise<ActionResult> {
  const file = formData.get("file") as File;
  if (!file) {
    return { success: false, error: "No se proporcionó ningún archivo." };
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const assetsDir = path.join(
      process.cwd(),
      "content",
      "campaigns",
      campaignId,
      "assets",
      variantId
    );

    // Crear el directorio si no existe
    await fs.mkdir(assetsDir, { recursive: true });

    const filePath = path.join(assetsDir, file.name);
    await fs.writeFile(filePath, buffer);

    const publicPath = `/content/campaigns/${campaignId}/assets/${variantId}/${file.name}`;

    logger.success("Activo de campaña guardado con éxito:", {
      path: publicPath,
    });
    return { success: true, path: publicPath };
  } catch (error) {
    logger.error("Error al guardar el activo de campaña:", { error });
    return {
      success: false,
      error: "No se pudo guardar el archivo en el servidor.",
    };
  }
}
// app/[locale]/(dev)/dev/campaign-suite/_actions/saveCampaignAsset.action.ts
