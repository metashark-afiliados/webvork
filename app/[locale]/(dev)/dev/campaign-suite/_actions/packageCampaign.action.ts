// app/[locale]/(dev)/dev/campaign-suite/_actions/packageCampaign.action.ts
/**
 * @file packageCampaign.action.ts
 * @description Server Action de élite que orquesta el empaquetado de una campaña
 *              en una aplicación Next.js completa, funcional y descargable.
 * @version 3.0.0 (Production Ready - Full Component Generation)
 * @author RaZ Podestá - MetaShark Tech
 */
"use server";

import fs from "fs/promises";
import path from "path";
import { put } from "@vercel/blob";
import { logger } from "@/shared/lib/logging";
import type { ActionResult } from "@/shared/lib/types/actions.types";
import type { CampaignDraft } from "../_types/draft.types";
import { CampaignDraftSchema } from "@/shared/lib/schemas/entities/draft.schema";

// Importación de todos los generadores y utilidades
import { zipDirectory } from "./_utils/zipper";
import { copyComponentDependencies } from "./_utils/componentCopier";
import * as Generators from "./_generators";

export async function packageCampaignAction(
  draft: CampaignDraft
): Promise<ActionResult<{ downloadUrl: string }>> {
  const traceId = logger.startTrace("packageCampaignAction_v3_Production");
  logger.info(
    "[Action] Iniciando proceso de empaquetado v3.0 (Production)...",
    {
      draftId: draft.draftId,
    }
  );

  const draftValidation = CampaignDraftSchema.safeParse(draft);
  if (!draftValidation.success) {
    logger.error("[Action] Borrador a empaquetar inválido.", {
      errors: draftValidation.error.flatten(),
      traceId,
    });
    return { success: false, error: "El borrador contiene datos corruptos." };
  }

  const validatedDraft = draftValidation.data;
  const tempDir = path.join("/tmp", `campaign-${validatedDraft.draftId}`);
  const zipPath = `${tempDir}.zip`;

  try {
    await fs.rm(tempDir, { recursive: true, force: true });
    await fs.mkdir(tempDir, { recursive: true });
    logger.traceEvent(traceId, "Directorio temporal limpio creado.", {
      path: tempDir,
    });

    // --- ORQUESTACIÓN DE GENERACIÓN COMPLETA ---
    await Promise.all([
      Generators.generatePackageJson(validatedDraft, tempDir),
      Generators.generateTailwindConfig(tempDir),
      Generators.generatePostcssConfig(tempDir),
      Generators.generateTsconfig(tempDir),
      Generators.generateNextConfig(validatedDraft, tempDir),
      Generators.generateGlobalsCss(validatedDraft, tempDir),
      Generators.generateLayout(validatedDraft, tempDir),
      Generators.generateContentFile(validatedDraft, tempDir),
      Generators.generateThemeFile(validatedDraft, tempDir),
      Generators.generatePage(validatedDraft, tempDir),
      // Generadores de archivos estáticos
      fs.writeFile(
        path.join(tempDir, ".gitignore"),
        "node_modules\n.next\nout\n.env*\n"
      ),
      fs.writeFile(
        path.join(tempDir, "next-env.d.ts"),
        '/// <reference types="next" />\n/// <reference types="next/image-types/global" />'
      ),
    ]);
    logger.traceEvent(
      traceId,
      "Generación de archivos de esqueleto y contenido completada."
    );

    // 4. Copiar componentes de React y sus dependencias
    await copyComponentDependencies(validatedDraft, tempDir);
    logger.traceEvent(
      traceId,
      "Copia de dependencias de componentes completada."
    );

    // 5. Comprimir el directorio generado
    await zipDirectory(tempDir, zipPath);
    logger.traceEvent(traceId, "Directorio comprimido en .zip exitosamente.");

    // 6. Subir el archivo .zip a Vercel Blob
    const zipBuffer = await fs.readFile(zipPath);
    const blob = await put(
      `campaign-packages/${validatedDraft.draftId}.zip`,
      zipBuffer,
      { access: "public", contentType: "application/zip" }
    );

    logger.success("[Action] Paquete subido a Vercel Blob.", {
      url: blob.url,
      traceId,
    });

    return { success: true, data: { downloadUrl: blob.url } };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido.";
    logger.error("[Action] Fallo crítico durante el empaquetado.", {
      error: errorMessage,
      traceId,
    });
    return {
      success: false,
      error: "No se pudo generar el paquete de la campaña.",
    };
  } finally {
    // 7. Limpieza
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
      await fs.unlink(zipPath).catch(() => {});
      logger.traceEvent(traceId, "Limpieza del entorno temporal completada.");
    } catch (cleanupError) {
      logger.warn("[Action] Fallo durante la limpieza.", { cleanupError });
    }
    logger.endTrace(traceId);
  }
}
// app/[locale]/(dev)/dev/campaign-suite/_actions/packageCampaign.action.ts
