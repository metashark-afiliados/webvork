// app/[locale]/(dev)/bavi/_actions/uploadAsset.action.ts
/**
 * @file uploadAsset.action.ts
 * @description Server Action orquestadora para la ingesta completa de activos.
 * @version 4.0.0 (Prompt Image URL Integration)
 * @author RaZ Podestá - MetaShark Tech
 */
"use server";

import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import { logger } from "@/lib/logging";
import type { ActionResult } from "@/lib/types/actions.types";
import { assetUploadMetadataSchema } from "@/lib/bavi/upload.schema";
import { addAssetToManifestsAction } from "./addAssetToManifests.action";
import { linkPromptToBaviAssetAction } from "../../raz-prompts/_actions";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadAssetAction(
  formData: FormData
): Promise<ActionResult<UploadApiResponse>> {
  const traceId = logger.startTrace("uploadAssetOrchestration");
  try {
    const file = formData.get("file") as File;
    const metadataString = formData.get("metadata") as string;

    if (!file || !metadataString)
      return { success: false, error: "Datos incompletos." };

    const metadata = assetUploadMetadataSchema.parse(
      JSON.parse(metadataString)
    );

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const cloudinaryResponse = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              public_id: metadata.assetId,
              folder: `webvork/assets/${metadata.assetId}/v1-original`,
              resource_type: "auto",
            },
            (error, result) => {
              if (error) return reject(error);
              if (result) return resolve(result);
              reject(new Error("Respuesta de Cloudinary indefinida."));
            }
          )
          .end(buffer);
      }
    );
    logger.traceEvent(traceId, "Subida a Cloudinary exitosa.");

    const manifestResult = await addAssetToManifestsAction(
      metadata,
      cloudinaryResponse
    );
    if (!manifestResult.success) return manifestResult;
    logger.traceEvent(traceId, "Manifiestos de BAVI actualizados.");

    if (metadata.promptId) {
      const linkResult = await linkPromptToBaviAssetAction({
        promptId: metadata.promptId,
        baviAssetId: metadata.assetId,
        baviVariantId: "v1-orig", // Siempre es la primera versión
        imageUrl: cloudinaryResponse.secure_url, // <-- NUEVO: Pasar la URL de la imagen
      });
      if (!linkResult.success) return linkResult;
      logger.traceEvent(traceId, "Vínculo con RaZPrompts completado.");
    }

    logger.endTrace(traceId);
    return { success: true, data: cloudinaryResponse };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido.";
    logger.error("[uploadAssetAction] Fallo en la orquestación.", {
      error: errorMessage,
    });
    logger.endTrace(traceId);
    return { success: false, error: "Fallo el proceso de ingesta del activo." };
  }
}
