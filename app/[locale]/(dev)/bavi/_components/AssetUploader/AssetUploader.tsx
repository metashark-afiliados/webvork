// app/[locale]/(dev)/bavi/_components/AssetUploader/AssetUploader.tsx
/**
 * @file AssetUploader.tsx
 * @description Contenedor "smart" para la subida de activos.
 * @version 4.1.0 (SesaContent Contract Fix)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import { useAssetUploader } from "./_hooks/useAssetUploader";
import { AssetUploaderForm } from "./_components/AssetUploaderForm";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

interface AssetUploaderProps {
  content: NonNullable<Dictionary["baviUploader"]>;
  // --- [INICIO] REFACTORIZACIÓN DE TIPO ---
  sesaLabels: NonNullable<Dictionary["promptCreator"]>["sesaLabels"];
  sesaOptions: NonNullable<Dictionary["promptCreator"]>["sesaOptions"];
  // --- [FIN] REFACTORIZACIÓN DE TIPO ---
}

export function AssetUploader({
  content,
  sesaLabels,
  sesaOptions,
}: AssetUploaderProps) {
  const uploaderState = useAssetUploader({
    content,
    sesaLabels,
    sesaOptions,
  });

  return <AssetUploaderForm {...uploaderState} />;
}
// app/[locale]/(dev)/bavi/_components/AssetUploader/AssetUploader.tsx
