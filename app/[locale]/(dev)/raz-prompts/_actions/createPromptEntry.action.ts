// app/[locale]/(dev)/raz-prompts/_actions/createPromptEntry.action.ts
/**
 * @file createPromptEntry.action.ts
 * @description Server Action para crear una nueva entrada de prompt en la base de datos.
 *              v1.1.0 (Type Safety & DRY Fix): Se refactoriza el tipo de entrada para
 *              eliminar la redundancia de datos ('aiService'), haciendo que el servidor
 *              sea el único responsable de derivar este valor desde el objeto 'tags'.
 *              Esto resuelve el error TS2344 y fortalece el contrato de la API.
 * @version 1.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use server";

import { createId } from "@paralleldrive/cuid2";
import { connectToDatabase } from "@/lib/mongodb";
import {
  RaZPromptsEntrySchema,
  type RaZPromptsEntry,
} from "@/lib/schemas/raz-prompts/entry.schema";
import type { ActionResult } from "@/lib/types/actions.types";
import { logger } from "@/lib/logging";

// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
// El contrato de entrada ahora solo pide los datos fundamentales.
// Se ha eliminado 'aiService' del Pick, ya que es un dato derivado.
type CreatePromptInput = Pick<
  RaZPromptsEntry,
  "title" | "versions" | "tags" | "keywords"
>;
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---

export async function createPromptEntryAction(
  input: CreatePromptInput
): Promise<ActionResult<{ promptId: string }>> {
  const traceId = logger.startTrace("createPromptEntry");
  try {
    const now = new Date().toISOString();
    const newPromptId = createId();
    const userId = "raz-podesta"; // Placeholder hasta tener sistema de auth

    const promptDocument: RaZPromptsEntry = {
      ...input,
      // El servidor deriva 'aiService' del objeto 'tags', que es la SSoT.
      aiService: input.tags.ai,
      promptId: newPromptId,
      userId,
      status: "pending_generation",
      createdAt: now,
      updatedAt: now,
      baviAssetId: undefined,
      baviVariantId: undefined,
    };

    const validation = RaZPromptsEntrySchema.safeParse(promptDocument);
    if (!validation.success) {
      logger.error("[createPromptEntry] Fallo de validación de Zod.", {
        error: validation.error.flatten(),
      });
      return { success: false, error: "Los datos del prompt son inválidos." };
    }

    const client = await connectToDatabase();
    const db = client.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection<RaZPromptsEntry>("prompts");

    const result = await collection.insertOne(validation.data);

    if (!result.acknowledged) {
      throw new Error("La inserción en la base de datos no fue confirmada.");
    }

    logger.success(
      `[createPromptEntry] Nuevo prompt creado con ID: ${newPromptId}`
    );
    logger.endTrace(traceId);
    return { success: true, data: { promptId: newPromptId } };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido.";
    logger.error("[createPromptEntry] Fallo crítico en la acción.", {
      error: errorMessage,
    });
    logger.endTrace(traceId);
    return { success: false, error: "No se pudo crear la entrada del prompt." };
  }
}
// app/[locale]/(dev)/raz-prompts/_actions/createPromptEntry.action.ts
