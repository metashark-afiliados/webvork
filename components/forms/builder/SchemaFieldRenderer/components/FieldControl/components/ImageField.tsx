// components/forms/builder/SchemaFieldRenderer/components/FieldControl/components/ImageField.tsx
/**
 * @file ImageField.tsx
 * @description Aparato hiper-atómico para renderizar un control de subida/selección de imagen.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useState } from "react";
import type { FieldValues } from "react-hook-form";
import { Button, ImageUploader, DynamicIcon } from "@/components/ui";
import type { FieldComponentProps } from "../types/field.types";
import { logger } from "@/lib/logging";
import { toast } from "sonner";
import { uploadAssetAction } from "@/app/[locale]/(dev)/bavi/_actions"; // Reutilizamos la acción de BAVI
import type { AssetUploadMetadata } from "@/lib/bavi/upload.schema";

interface ImageFieldProps<TFieldValues extends FieldValues>
  extends FieldComponentProps<TFieldValues> {}

export function ImageField<TFieldValues extends FieldValues>({
  field,
  onValueChange,
  fieldName,
}: ImageFieldProps<TFieldValues>): React.ReactElement {
  logger.trace(`[ImageField] Renderizando para campo imagen: ${String(fieldName)}`);

  // El valor del campo puede ser un string (URL/assetId) o null
  const [currentImageValue, setCurrentImageValue] = useState<string | null>(
    (field.value as string) || null
  );
  const [isUploading, setIsUploading] = useState(false);

  // Simula metadata mínima para la acción de subida de BAVI.
  // En un futuro AssetSelector, esta metadata se generaría con más inteligencia.
  const mockMetadata: AssetUploadMetadata = {
    assetId: `i-dynamic-${String(fieldName)}-${Date.now()}`,
    keywords: [String(fieldName), "dynamic"],
    sesaTags: { ai: "manual", sty: "ui", fmt: "1x1", typ: "ui", sbj: "abs" },
    altText: { "en-US": `Dynamic image for ${String(fieldName)}` },
  };

  const handleImageUpload = async (formData: FormData) => {
    setIsUploading(true);
    // La acción de subida de BAVI espera un FormData con 'file' y 'metadata'
    formData.append("metadata", JSON.stringify(mockMetadata));
    const result = await uploadAssetAction(formData); // Reutilizamos la acción de BAVI
    setIsUploading(false);

    if (result.success) {
      const imageUrl = result.data.secure_url; // Cloudinary devuelve secure_url
      setCurrentImageValue(imageUrl);
      onValueChange(fieldName, imageUrl); // Actualizar el valor en el formulario
      return { success: true, data: { path: imageUrl } };
    } else {
      toast.error("Fallo al subir imagen", { description: result.error });
      return { success: false, error: result.error || "Error desconocido al subir." };
    }
  };

  const handleRemoveImage = () => {
    setCurrentImageValue(null);
    onValueChange(fieldName, null);
    toast.info("Imagen eliminada del campo.");
  };

  return (
    <div className="space-y-2">
      {currentImageValue && (
        <div className="relative w-full aspect-video rounded-md overflow-hidden bg-muted/20 mb-4">
          <img
            src={currentImageValue}
            alt={`Current image for ${String(fieldName)}`}
            className="object-contain w-full h-full"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 z-10"
            onClick={handleRemoveImage}
          >
            <DynamicIcon name="X" className="h-4 w-4" />
          </Button>
        </div>
      )}

      <ImageUploader
        onUpload={handleImageUpload}
        onUploadSuccess={(path) => {
          logger.trace(`[ImageField] Carga exitosa, path: ${path}`);
          // setCurrentImageValue(path); // Ya lo gestiona handleImageUpload
        }}
        content={{
          dropzoneText: currentImageValue ? "Cambiar imagen" : "Arrastra o selecciona una imagen",
          dropzoneSubtext: "PNG, JPG o SVG (max 5MB)",
          loadingText: "Subiendo imagen...",
        }}
        className="w-full"
      />

      {/* Futuro: Selector de activos de BAVI */}
      <Button variant="outline" className="w-full" disabled={isUploading}>
        <DynamicIcon name="LibraryBig" className="mr-2 h-4 w-4" />
        Seleccionar de BAVI (Próximamente)
      </Button>
    </div>
  );
}
