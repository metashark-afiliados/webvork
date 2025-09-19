// app/[locale]/(dev)/bavi/_components/AssetSelectorModal.tsx
/**
 * @file AssetSelectorModal.tsx
 * @description Server Action atómica para registrar un nuevo activo en los manifiestos de BAVI.
 * @version 2.2.0 (Direct Import Fix)
 * @author RaZ Podestá - MetaShark Tech
 */
"use server";

import { promises as fs } from "fs";
import path from "path";
import type { UploadApiResponse } from "cloudinary";
import { logger } from "@/lib/logging";
import type { ActionResult } from "@/lib/types/actions.types";
import type { AssetUploadMetadata } from "@/lib/bavi/upload.schema";
import { connectToDatabase } from "@/lib/mongodb";
import type { RaZPromptsEntry } from "@/lib/schemas/raz-prompts/entry.schema";
// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
// Se importa la utilidad directamente desde su archivo de origen soberano.
import { normalizeKeywords } from "@/lib/search/keyword-normalizer";
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---

const BAVI_MANIFEST_PATH = path.join(
  process.cwd(),
  "content/bavi/bavi.manifest.json"
);
const SEARCH_INDEX_PATH = path.join(
  process.cwd(),
  "content/bavi/bavi.search-index.json"
);

export async function addAssetToManifestsAction(
  metadata: AssetUploadMetadata,
  cloudinaryResponse: UploadApiResponse
): Promise<ActionResult<{ assetId: string }>> {
  try {
    const baviManifestContent = await fs
      .readFile(BAVI_MANIFEST_PATH, "utf-8")
      .catch(() => '{ "assets": [] }');
    const baviManifest = JSON.parse(baviManifestContent);

    const newAssetEntry = {
      assetId: metadata.assetId,
      provider: "cloudinary",
      promptId: metadata.promptId,
      tags: metadata.sesaTags,
      variants: [
        {
          versionId: "v1-orig",
          publicId: cloudinaryResponse.public_id,
          state: "orig",
          dimensions: {
            width: cloudinaryResponse.width,
            height: cloudinaryResponse.height,
          },
        },
      ],
      metadata: {
        altText: metadata.altText,
      },
      imageUrl: metadata.promptId ? cloudinaryResponse.secure_url : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    baviManifest.assets.push(newAssetEntry);
    await fs.writeFile(
      BAVI_MANIFEST_PATH,
      JSON.stringify(baviManifest, null, 2)
    );
    logger.success(
      `[addAssetToManifests] Activo ${metadata.assetId} añadido a bavi.manifest.json`
    );

    const searchIndexContent = await fs
      .readFile(SEARCH_INDEX_PATH, "utf-8")
      .catch(() => '{ "version": "1.0.0", "index": {} }');
    const searchIndex = JSON.parse(searchIndexContent);

    searchIndex.index[metadata.assetId] = normalizeKeywords(metadata.keywords);

    await fs.writeFile(SEARCH_INDEX_PATH, JSON.stringify(searchIndex, null, 2));
    logger.success(
      `[addAssetToManifests] Activo ${metadata.assetId} añadido a bavi.search-index.json`
    );

    if (metadata.promptId && cloudinaryResponse.secure_url) {
      const client = await connectToDatabase();
      const db = client.db(process.env.MONGODB_DB_NAME);
      const collection = db.collection<RaZPromptsEntry>("prompts");

      await collection.updateOne(
        { promptId: metadata.promptId },
        { $set: { imageUrl: cloudinaryResponse.secure_url } }
      );
      logger.success(
        `[addAssetToManifests] imageUrl añadida a prompt ${metadata.promptId} en MongoDB.`
      );
    }

    return { success: true, data: { assetId: metadata.assetId } };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido.";
    logger.error("[addAssetToManifests] Fallo al actualizar los manifiestos.", {
      error: errorMessage,
    });
    return {
      success: false,
      error: "No se pudieron actualizar los manifiestos de la BAVI.",
    };
  }
}
