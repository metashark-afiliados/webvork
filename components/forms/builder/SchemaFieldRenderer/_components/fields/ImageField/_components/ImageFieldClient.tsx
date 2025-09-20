// components/forms/builder/SchemaFieldRenderer/_components/fields/ImageField/_components/ImageFieldClient.tsx
/**
 * @file ImageFieldClient.tsx
 * @description Componente de cliente puro para la lógica interactiva del ImageField.
 *              v2.0.0 (Holistic Integrity Restoration): Corregido para cumplir
 *              estrictamente su contrato de props, resolver todas las importaciones
 *              y adherirse a los 7 Pilares de Calidad.
 * @version 2.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import type { FieldValues } from "react-hook-form";
import { usePathname } from "next/navigation";
import { logger } from "@/lib/logging";
import { getCurrentLocaleFromPathname } from "@/lib/i18n.utils";
import { AssetSelectorModal } from "@/app/[locale]/(dev)/bavi/_components";
import { useImageField } from "../_hooks/use-image-field";
import { ImagePreview, ImageFieldActions } from "./";
// --- [INICIO DE CORRECCIÓN DE RUTA Y CONTRATO] ---
import type { FieldComponentProps } from "../../../../_types/field.types";
import type { BaviI18nContent } from "../ImageField";

interface ImageFieldClientProps<TFieldValues extends FieldValues>
  extends FieldComponentProps<TFieldValues> {
  i18nContent: BaviI18nContent;
}
// --- [FIN DE CORRECCIÓN DE RUTA Y CONTRATO] ---

export function ImageFieldClient<TFieldValues extends FieldValues>({
  field,
  onValueChange,
  fieldName,
  i18nContent,
}: ImageFieldClientProps<TFieldValues>) {
  logger.trace("[ImageFieldClient] Renderizando componente de cliente v2.0.");

  const pathname = usePathname();
  const locale = getCurrentLocaleFromPathname(pathname);

  const {
    isUploading,
    isSelectorOpen,
    setIsSelectorOpen,
    handleImageUpload,
    handleRemoveImage,
    handleAssetSelected,
  } = useImageField(onValueChange, fieldName);

  const currentImageValue = field.value as string | null;

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
// components/forms/builder/SchemaFieldRenderer/_components/fields/ImageField/_components/ImageFieldClient.tsx
