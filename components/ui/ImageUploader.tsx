// components/ui/ImageUploader.tsx
/**
 * @file ImageUploader.tsx
 * @description Componente de UI global para la subida de imágenes.
 *              v2.2.0: Sincroniza el nombre del icono con la SSoT actualizada.
 * @version 2.2.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useDropzone, type Accept } from "react-dropzone";
import { logger } from "@/lib/logging";
import { cn } from "@/lib/utils";
import { DynamicIcon } from "@/components/ui";
import { toast } from "sonner";
import type { ActionResult } from "@/lib/types/actions.types";

interface ImageUploaderProps {
  onUpload: (formData: FormData) => Promise<ActionResult<{ path: string }>>;
  onUploadSuccess: (filePath: string) => void;
  acceptedFileTypes?: Accept;
  maxFiles?: number;
  content: {
    dropzoneText: string;
    dropzoneSubtext: string;
    loadingText?: string;
    activeDragText?: string;
  };
  className?: string;
}

export function ImageUploader({
  onUpload,
  onUploadSuccess,
  // ... resto de props sin cambios
  acceptedFileTypes = {
    "image/png": [".png"],
    "image/jpeg": [".jpg", ".jpeg"],
    "image/svg+xml": [".svg"],
  },
  maxFiles = 1,
  content,
  className,
}: ImageUploaderProps) {
  // ... lógica del componente sin cambios
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;
      setIsLoading(true);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      const formData = new FormData();
      formData.append("file", file);
      const result = await onUpload(formData);
      if (result.success) {
        onUploadSuccess(result.data.path);
        toast.success("Archivo subido con éxito.");
      } else {
        toast.error(result.error || "Ocurrió un error al subir el archivo.");
        setPreview(null);
        URL.revokeObjectURL(previewUrl);
      }
      setIsLoading(false);
    },
    [onUpload, onUploadSuccess]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxFiles: maxFiles,
  });
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className={cn("w-full", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive
            ? "border-primary bg-primary/10"
            : "border-muted-foreground/30 hover:border-primary/50",
          preview && "!p-0 !border-solid !border-primary"
        )}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="relative w-full aspect-[2/1] max-h-24">
            <Image
              src={preview}
              alt="Vista previa del archivo subido"
              fill
              className="object-contain p-2"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            {/* --- [INICIO DE CORRECCIÓN] --- */}
            <DynamicIcon
              name="Upload" // <-- Nombre canónico y más estable
              className="w-12 h-12 text-muted-foreground/50 mb-2"
            />
            {/* --- [FIN DE CORRECCIÓN] --- */}
            <p className="font-semibold text-foreground">
              {content.dropzoneText}
            </p>
            <p className="text-xs text-muted-foreground">
              {content.dropzoneSubtext}
            </p>
          </div>
        )}
        {(isDragActive || isLoading) && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
            <p className="font-bold text-primary animate-pulse">
              {isLoading
                ? content.loadingText || "Cargando..."
                : content.activeDragText || "¡Suelta el archivo!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
// components/ui/ImageUploader.tsx
