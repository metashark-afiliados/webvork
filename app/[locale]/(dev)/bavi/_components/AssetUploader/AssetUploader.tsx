// app/[locale]/(dev)/bavi/_components/AssetUploader/AssetUploader.tsx
/**
 * @file AssetUploader.tsx
 * @description Contenedor "smart" para la subida de activos.
 * @version 5.0.0 (FSD Architecture Alignment)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import { useAssetUploader } from "./_hooks/use-asset-uploader";
import { AssetUploaderForm } from "./_components/AssetUploaderForm";
import type { Dictionary } from "@/shared/lib/schemas/i18n.schema";

interface AssetUploaderProps {
  content: NonNullable<Dictionary["baviUploader"]>;
  sesaLabels: NonNullable<Dictionary["promptCreator"]>["sesaLabels"];
  sesaOptions: NonNullable<Dictionary["promptCreator"]>["sesaOptions"];
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
