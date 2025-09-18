// app/[locale]/(dev)/raz-prompts/_actions/getPrompts.action.ts
/**
 * @file getPrompts.action.ts
 * @description Server Action para obtener una lista paginada y filtrada de prompts de la base de datos.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use server";

import { connectToDatabase } from "@/lib/mongodb";
import {
  RaZPromptsEntrySchema,
  type RaZPromptsEntry,
  type RaZPromptsSesaTags,
} from "@/lib/schemas/raz-prompts/entry.schema";
import type { ActionResult } from "@/lib/types/actions.types";
import { logger } from "@/lib/logging";
import { z } from "zod";
import { ObjectId } from "mongodb"; // Para IDs de MongoDB

const MOCK_USER_ID = "raz-podesta"; // Placeholder hasta tener sistema de auth

// Schema para validar los parámetros de entrada de la acción de búsqueda/filtrado
const GetPromptsInputSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
  query: z.string().optional(),
  tags: RaZPromptsSesaTagsSchema.partial().optional(), // Permite filtrar por tags SESA
});

export type GetPromptsInput = z.infer<typeof GetPromptsInputSchema>;

export async function getPromptsAction(
  input: GetPromptsInput
): Promise<ActionResult<{ prompts: RaZPromptsEntry[]; total: number }>> {
  const traceId = logger.startTrace("getPromptsAction");
  try {
    const validatedInput = GetPromptsInputSchema.safeParse(input);
    if (!validatedInput.success) {
      logger.error("[getPromptsAction] Fallo de validación de entrada.", {
        errors: validatedInput.error.flatten(),
      });
      return { success: false, error: "Parámetros de búsqueda inválidos." };
    }

    const { page, limit, query, tags } = validatedInput.data;

    const client = await connectToDatabase();
    const db = client.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection<RaZPromptsEntry>("prompts");

    const matchStage: any = { userId: MOCK_USER_ID };

    // Filtro por query (búsqueda de texto libre en keywords, title, promptText)
    if (query) {
      const searchRegex = new RegExp(query, "i"); // Case-insensitive search
      matchStage.$or = [
        { title: { $regex: searchRegex } },
        { "versions.promptText": { $regex: searchRegex } },
        { keywords: { $elemMatch: { $regex: searchRegex } } },
      ];
    }

    // Filtro por tags SESA
    if (tags) {
      for (const key in tags) {
        if (tags[key as keyof RaZPromptsSesaTags]) {
          matchStage[`tags.${key}`] = tags[key as keyof RaZPromptsSesaTags];
        }
      }
    }

    const pipeline = [
      { $match: matchStage },
      { $sort: { createdAt: -1 } }, // Ordenar por más reciente
      {
        $facet: {
          totalCount: [{ $count: "count" }],
          prompts: [{ $skip: (page - 1) * limit }, { $limit: limit }],
        },
      },
    ];

    const result = await collection
      .aggregate<{
        totalCount: [{ count: number }];
        prompts: RaZPromptsEntry[];
      }>(pipeline)
      .toArray();

    const prompts = result[0]?.prompts || [];
    const total = result[0]?.totalCount[0]?.count || 0;

    logger.success(
      `[getPromptsAction] Prompts obtenidos: ${prompts.length} de ${total}.`
    );
    logger.endTrace(traceId);
    return { success: true, data: { prompts, total } };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido.";
    logger.error("[getPromptsAction] Fallo al obtener prompts.", {
      error: errorMessage,
    });
    logger.endTrace(traceId);
    return { success: false, error: "No se pudieron cargar los prompts." };
  }
}

