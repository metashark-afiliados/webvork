// app/[locale]/(dev)/bavi/_components/AssetUploader/_hooks/useAssetUploader.ts
/**
 * @file useAssetUploader.ts
 * @description Hook "cerebro" soberano para la lógica de subida de activos a la BAVI.
 * @version 3.3.0 (SesaContent Contract Fix)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import { useState, useCallback, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import type { UploadApiResponse } from "cloudinary";
import { uploadAssetAction } from "../../../_actions";
import {
  assetUploadMetadataSchema,
  type AssetUploadMetadata,
} from "@/lib/bavi/upload.schema";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

type UploaderContent = NonNullable<Dictionary["baviUploader"]>;
// --- [INICIO] REFACTORIZACIÓN DE TIPO ---
// Definimos los tipos base de forma más clara
type SesaLabels = NonNullable<Dictionary["promptCreator"]>["sesaLabels"];
type SesaOptions = NonNullable<Dictionary["promptCreator"]>["sesaOptions"];

interface UseAssetUploaderProps {
  content: UploaderContent;
  sesaLabels: SesaLabels;
  sesaOptions: SesaOptions;
}
// --- [FIN] REFACTORIZACIÓN DE TIPO ---

export function useAssetUploader({
  content,
  sesaLabels,
  sesaOptions,
}: UseAssetUploaderProps) {
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadResult, setUploadResult] = useState<UploadApiResponse | null>(
    null
  );

  const form = useForm<AssetUploadMetadata>({
    resolver: zodResolver(assetUploadMetadataSchema),
    defaultValues: {
      assetId: "",
      keywords: [],
      sesaTags: {},
      altText: { "it-IT": "" },
      promptId: "",
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0];
      if (selectedFile) {
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        const baseName = selectedFile.name.split(".").slice(0, -1).join(".");
        form.setValue(
          "assetId",
          `i-generic-${baseName.toLowerCase().replace(/[^a-z0-9]/g, "-")}-01`
        );
      }
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview);
    },
    [preview]
  );

  const onSubmit = (data: AssetUploadMetadata) => {
    if (!file) {
      toast.error("Nessun file selezionato.");
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("metadata", JSON.stringify(data));
      const result = await uploadAssetAction(formData);
      if (result.success) {
        toast.success("Ingestione dell'asset completata!");
        setUploadResult(result.data);
        form.reset();
        setFile(null);
        setPreview(null);
      } else {
        toast.error("Errore di ingestione", { description: result.error });
      }
    });
  };

  // --- [INICIO] REFACTORIZACIÓN DE CONSTRUCCIÓN DE OBJETO ---
  const sesaContentForForm = {
    ...sesaLabels,
    options: sesaOptions,
  };
  // --- [FIN] REFACTORIZACIÓN DE CONSTRUCCIÓN DE OBJETO ---

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending,
    preview,
    uploadResult,
    getRootProps,
    getInputProps,
    isDragActive,
    content,
    sesaContent: sesaContentForForm,
  };
}
// app/[locale]/(dev)/bavi/_components/AssetUploader/_hooks/useAssetUploader.ts
