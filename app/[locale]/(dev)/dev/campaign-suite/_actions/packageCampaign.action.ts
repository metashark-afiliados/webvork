// app/[locale]/(dev)/dev/campaign-suite/_actions/packageCampaign.action.ts
/**
 * @file packageCampaign.action.ts
 * @description Server Action orquestadora para el empaquetado de una campaña.
 *              v2.1.0: Lógica de orquestación corregida para ser funcional.
 * @version 2.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use server";

import { promises as fs } from "fs";
import path from "path";
import os from "os";
import { logger } from "@/lib/logging";
import type { ActionResult } from "@/lib/types/actions.types";
import type { CampaignDraft } from "../_types/draft.types";
import { generateAssets } from "./publishCampaign.action"; // <-- Se importa la utilidad correcta
import { runScopedNextBuild } from "@/lib/ssg/programmatic-builder";
import { packageDirectory } from "@/lib/ssg/packager";

interface PackageSuccessPayload {
  message: string;
  downloadUrl: string;
}

export async function packageCampaignAction(
  draft: CampaignDraft
): Promise<ActionResult<PackageSuccessPayload>> {
  if (!draft.draftId || !draft.baseCampaignId) {
    return {
      success: false,
      error: "ID de borrador o de campaña base no encontrado.",
    };
  }

  const traceId = logger.startTrace(`packageCampaign:${draft.draftId}`);
  let tempDir: string | null = null;

  try {
    // 1. Crear entorno temporal
    tempDir = await fs.mkdtemp(
      path.join(os.tmpdir(), `campaign-${draft.draftId}-`)
    );
    logger.traceEvent(traceId, "Directorio temporal creado", { path: tempDir });

    // 2. Generar activos en el directorio temporal
    const newVariantId = await generateAssets(draft, tempDir);
    logger.traceEvent(
      traceId,
      "Activos de campaña generados en directorio temporal."
    );

    // 3. Ejecutar build de Next.js (apuntando a los activos temporales - requiere mayor refactorización de la lógica de carga de datos)
    // NOTA: La lógica actual de `getCampaignData` lee desde `/content`, no desde una ruta temporal.
    // Para un build verdaderamente "scoped", `getCampaignData` necesitaría ser consciente del entorno de build.
    // Por ahora, asumimos que el build utiliza los activos de producción, pero la lógica está aquí como placeholder.
    await runScopedNextBuild(draft.baseCampaignId, newVariantId);
    logger.traceEvent(traceId, "Build estático de Next.js completado.");

    // 4. Empaquetar el resultado del directorio /out
    const buildOutputDir = path.join(process.cwd(), "out"); // <-- RUTA CORRECTA
    const zipFileName = `campaign-package-${draft.draftId}.zip`;
    const zipOutputPath = path.join(tempDir, zipFileName);

    await packageDirectory(buildOutputDir, zipOutputPath);
    logger.traceEvent(traceId, "Salida del build empaquetada en .zip.");

    // 5. Devolver el contenido del archivo como Data URL para la descarga
    const fileBuffer = await fs.readFile(zipOutputPath);
    const dataUrl = `data:application/zip;base64,${fileBuffer.toString("base64")}`;

    return {
      success: true,
      data: {
        message: "Paquete de campaña generado con éxito.",
        downloadUrl: dataUrl,
      },
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido.";
    logger.error("Fallo crítico durante el empaquetado de la campaña.", {
      error: errorMessage,
    });
    return {
      success: false,
      error: `No se pudo generar el paquete: ${errorMessage}`,
    };
  } finally {
    // 6. Limpieza
    if (tempDir) {
      await fs.rm(tempDir, { recursive: true, force: true });
      logger.traceEvent(traceId, "Directorio temporal eliminado.");
    }
    logger.endTrace(traceId);
  }
}
// app/[locale]/(dev)/dev/campaign-suite/_actions/packageCampaign.action.ts
