// app/[locale]/(dev)/dev/campaign-suite/_actions/saveAsTemplate.action.ts
/**
 * @file saveAsTemplate.action.ts
 * @description Server Action para guardar un borrador como una nueva plantilla.
 * @version 2.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use server";

import { promises as fs } from "fs";
import path from "path";
import type { ActionResult } from "@/shared/lib/types/actions.types";
import type { CampaignDraft } from "../_types/draft.types";
import {
  CampaignTemplateSchema,
  TemplatesManifestSchema,
} from "@/shared/lib/schemas/templates/template.schema";
import { logger } from "@/shared/lib/logging";

export async function saveAsTemplateAction(
  draft: CampaignDraft,
  templateName: string,
  description: string
): Promise<ActionResult<{ templateId: string }>> {
  if (!draft.baseCampaignId) {
    return { success: false, error: "El borrador no tiene una campaña base." };
  }

  const templateId = `${templateName
    .toLowerCase()
    .replace(/\s+/g, "-")}-${Date.now()}`;

  const templateData = {
    templateId,
    name: templateName,
    description,
    sourceCampaignId: draft.baseCampaignId,
    headerConfig: draft.headerConfig,
    footerConfig: draft.footerConfig,
    layoutConfig: draft.layoutConfig,
    themeConfig: draft.themeConfig,
    contentData: draft.contentData,
  };

  const validation = CampaignTemplateSchema.safeParse(templateData);
  if (!validation.success) {
    logger.error(
      "Los datos del borrador no son válidos para crear una plantilla.",
      {
        error: validation.error.flatten(),
      }
    );
    return { success: false, error: "Los datos del borrador son inválidos." };
  }

  try {
    const manifestPath = path.join(
      process.cwd(),
      "content/templates/templates.manifest.json"
    );
    const templatePath = path.join(
      process.cwd(),
      `content/templates/${templateId}.json`
    );

    await fs.writeFile(templatePath, JSON.stringify(validation.data, null, 2));

    const manifestFile = await fs
      .readFile(manifestPath, "utf-8")
      .catch(() => "[]");
    const manifest = TemplatesManifestSchema.parse(JSON.parse(manifestFile));

    manifest.push({
      templateId,
      name: templateName,
      description: description,
      createdAt: new Date().toISOString(),
    });

    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));

    return { success: true, data: { templateId } };
  } catch (error) {
    logger.error("No se pudo guardar la plantilla.", { error });
    return {
      success: false,
      error: "Error del servidor al guardar la plantilla.",
    };
  }
}
