// components/forms/builder/SchemaFieldRenderer/_components/fields/ImageField/ImageField.tsx
/**
 * @file ImageField.tsx
 * @description Componente de campo de imagen de élite, como un Client Component soberano.
 * @version 9.1.0 (Module Resolution Fix)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useState, useEffect } from "react";
import type { FieldValues } from "react-hook-form";
import { usePathname } from "next/navigation";
import { logger } from "@/shared/lib/logging";
import { getCurrentLocaleFromPathname } from "@/shared/lib/i18n.utils";
import { getBaviI18nContentAction } from "@/app/[locale]/(dev)/bavi/_actions";
import type { BaviI18nContent } from "@/app/[locale]/(dev)/bavi/_actions";
import type { FieldComponentProps } from "../../../_types/field.types";
import { useImageField } from "./_hooks/use-image-field";
import { ImagePreview, ImageFieldActions } from "./_components";
import { AssetSelectorModal } from "@/app/[locale]/(dev)/bavi/_components";
// --- [INICIO DE CORRECCIÓN DE RUTA] ---
import { Skeleton } from "@/components/ui";
// --- [FIN DE CORRECCIÓN DE RUTA] ---

export function ImageField<TFieldValues extends FieldValues>({
  field,
  onValueChange,
  fieldName,
}: FieldComponentProps<TFieldValues>) {
  const [i18nContent, setI18nContent] = useState<BaviI18nContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const locale = getCurrentLocaleFromPathname(pathname);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      const result = await getBaviI18nContentAction(locale);
      if (result.success) {
        setI18nContent(result.data);
      } else {
        logger.error("[ImageField] No se pudo cargar el contenido i18n.", {
          error: result.error,
        });
      }
      setIsLoading(false);
    };
    fetchContent();
  }, [locale]);

  const {
    isUploading,
    isSelectorOpen,
    setIsSelectorOpen,
    handleImageUpload,
    handleRemoveImage,
    handleAssetSelected,
  } = useImageField(onValueChange, fieldName);

  const currentImageValue = field.value as string | null;

  if (isLoading) {
    return <Skeleton className="h-36 w-full" />;
  }

  if (!i18nContent) {
    return (
      <div className="h-24 flex items-center justify-center bg-destructive/10 rounded-md text-sm text-destructive-foreground">
        Error al cargar contenido para el campo de imagen.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {currentImageValue && (
        <ImagePreview
          src={currentImageValue}
          alt={`Vista previa para ${String(fieldName)}`}
          onRemove={handleRemoveImage}
        />
      )}
      <ImageFieldActions
        onUpload={handleImageUpload}
        onSelectClick={() => setIsSelectorOpen(true)}
        isUploading={isUploading}
        hasImage={!!currentImageValue}
      />
      {isSelectorOpen && (
        <AssetSelectorModal
          isOpen={isSelectorOpen}
          onClose={() => setIsSelectorOpen(false)}
          onAssetSelect={handleAssetSelected}
          locale={locale}
          content={{
            modalTitle: i18nContent.baviUploader.assetSelectorModalTitle,
            modalDescription:
              i18nContent.baviUploader.assetSelectorModalDescription,
            assetExplorerContent: i18nContent.assetExplorer,
            sesaOptions: i18nContent.sesaOptions,
          }}
        />
      )}
    </div>
  );
}
// components/forms/builder/SchemaFieldRenderer/_components/fields/ImageField/ImageField.tsx
