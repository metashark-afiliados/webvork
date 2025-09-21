// app/[locale]/(dev)/dev/campaign-suite/_actions/saveAsTemplate.action.ts
/**
 * @file saveAsTemplate.action.ts
 * @description Server Action para persistir un borrador de campaña como una plantilla reutilizable.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use server";

import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";
import { logger } from "@/shared/lib/logging";
import { connectToDatabase } from "@/shared/lib/mongodb";
import type { ActionResult } from "@/shared/lib/types/actions.types";
import type { CampaignDraft } from "../_types/draft.types";
import {
  CampaignTemplateSchema,
  type CampaignTemplate,
} from "@/shared/lib/schemas/entities/template.schema";
import { CampaignDraftSchema } from "@/shared/lib/schemas/entities/draft.schema";

const InputSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
  description: z.string().optional(),
});

export async function saveAsTemplateAction(
  draft: CampaignDraft,
  name: string,
  description: string
): Promise<ActionResult<{ templateId: string }>> {
  const traceId = logger.startTrace("saveAsTemplateAction");
  logger.info("[Action] Intentando guardar el borrador como plantilla...", {
    name,
    draftId: draft.draftId,
  });

  try {
    // 1. Validar las entradas del formulario (nombre, descripción)
    const inputValidation = InputSchema.safeParse({ name, description });
    if (!inputValidation.success) {
      logger.warn("[Action] Validación de entrada fallida.", {
        errors: inputValidation.error.flatten(),
        traceId,
      });
      return {
        success: false,
        error: "Los datos proporcionados son inválidos.",
      };
    }

    // 2. Validar la estructura del borrador completo
    const draftValidation = CampaignDraftSchema.safeParse(draft);
    if (!draftValidation.success) {
      logger.error(
        "[Action] El borrador a guardar es estructuralmente inválido.",
        {
          errors: draftValidation.error.flatten(),
          traceId,
        }
      );
      return { success: false, error: "El borrador contiene datos corruptos." };
    }

    // 3. Construir el documento de la plantilla
    const now = new Date().toISOString();
    const templateDocument: CampaignTemplate = {
      templateId: createId(),
      name: inputValidation.data.name,
      description: inputValidation.data.description,
      draft: draftValidation.data,
      createdAt: now,
      updatedAt: now,
    };

    // 4. Persistir en la base de datos
    const client = await connectToDatabase();
    const db = client.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection<CampaignTemplate>("campaign_templates");
    await collection.insertOne(templateDocument);

    logger.success(
      "[Action] Plantilla guardada exitosamente en la base de datos.",
      {
        templateId: templateDocument.templateId,
        traceId,
      }
    );

    return { success: true, data: { templateId: templateDocument.templateId } };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido.";
    logger.error(
      "[Action] Fallo crítico al guardar la plantilla en la base de datos.",
      { error: errorMessage, traceId }
    );
    return {
      success: false,
      error: "No se pudo conectar con el servicio de base de datos.",
    };
  } finally {
    logger.endTrace(traceId);
  }
}
// app/[locale]/(dev)/dev/campaign-suite/_actions/saveAsTemplate.action.ts
