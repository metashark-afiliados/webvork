// app/[locale]/(dev)/dev/layout-configurator/_actions/layout.actions.ts
/**
 * @file layout.actions.ts
 * @description Server Actions para leer y escribir configuraciones de layout.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use server";

import { promises as fs } from "fs";
import path from "path";
import { resolveCampaignAssets } from "@/lib/i18n/campaign.map.resolver";
import { CampaignThemeSchema } from "@/lib/i18n/campaign.data.processor";

// Implementación simplificada. Una versión de producción tendría más validaciones.
export async function getLayoutForVariant(
  campaignId: string,
  variantId: string
) {
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
  return themeJson.layout.sections;
}

export async function saveLayoutForVariant(
  campaignId: string,
  variantId: string,
  newSections: { name: string }[]
) {
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

  // Valida el nuevo objeto completo
  const validation = CampaignThemeSchema.safeParse(themeJson);
  if (!validation.success) {
    throw new Error("El nuevo layout es inválido.");
  }

  // Sobrescribe el archivo
  await fs.writeFile(
    themePath,
    JSON.stringify(validation.data, null, 2),
    "utf-8"
  );

  return { success: true };
}
// app/[locale]/(dev)/dev/layout-configurator/_actions/layout.actions.ts
