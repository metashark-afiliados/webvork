// app/[locale]/(dev)/bavi/_components/AssetUploader/AssetUploader.tsx
/**
 * @file AssetUploader.tsx
 * @description Contenedor "smart" para la subida de activos. Orquesta la lógica y la presentación.
 * @version 4.0.0 (Pure Container Pattern)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import { useAssetUploader } from "./_hooks/useAssetUploader";
import { AssetUploaderForm } from "./_components/AssetUploaderForm";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

interface AssetUploaderProps {
  content: NonNullable<Dictionary["baviUploader"]>;
  sesaContent: NonNullable<Dictionary["promptCreator"]>["sesaOptions"] &
    NonNullable<Dictionary["promptCreator"]>["sesaLabels"];
}

export function AssetUploader({ content, sesaContent }: AssetUploaderProps) {
  const uploaderState = useAssetUploader({ content, sesaContent });

  return <AssetUploaderForm {...uploaderState} />;
}
// app/[locale]/(dev)/bavi/_components/AssetUploader/AssetUploader.tsx
