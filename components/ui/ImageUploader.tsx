// components/ui/ImageUploader.tsx
/**
 * @file ImageUploader.tsx
 * @description Componente de UI global, atómico y reutilizable para la subida
 *              y previsualización de imágenes.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useDropzone, type Accept } from "react-dropzone";
import { logger } from "@/lib/logging";
import { cn } from "@/lib/utils";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { toast } from "sonner";

interface ImageUploaderProps {
  onUpload: (
    file: File
  ) => Promise<{ success: boolean; error?: string; path?: string }>;
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
  acceptedFileTypes = {
    "image/png": [".png"],
    "image/jpeg": [".jpg", ".jpeg"],
  },
  maxFiles = 1,
  content,
  className,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setIsLoading(true);

      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      logger.info("Iniciando subida de archivo...", {
        name: file.name,
        type: file.type,
      });
      const result = await onUpload(file);

      if (result.success && result.path) {
        onUploadSuccess(result.path);
        toast.success("Archivo subido con éxito.");
      } else {
        toast.error(result.error || "Ocurrió un error al subir el archivo.");
        setPreview(null);
        URL.revokeObjectURL(previewUrl); // Liberar memoria si la subida falla
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
        URL.revokeObjectURL(preview); // Limpieza al desmontar
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
            <DynamicIcon
              name="UploadCloud"
              className="w-12 h-12 text-muted-foreground/50 mb-2"
            />
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
