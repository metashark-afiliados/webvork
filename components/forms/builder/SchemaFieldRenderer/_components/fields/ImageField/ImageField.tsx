// components/forms/builder/SchemaFieldRenderer/_components/fields/ImageField/ImageField.tsx
/**
 * @file ImageField.tsx
 * @description Orquestador "smart" atomizado y de élite para el campo de imagen.
 * @version 7.0.0 (Holistic Import & Naming Fix)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import type { FieldValues } from "react-hook-form";
import { logger } from "@/lib/logging";
// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
import { getCurrentLocaleFromPathname } from "@/lib/i18n.utils";
import { AssetSelectorModal } from "@/app/[locale]/(dev)/bavi/_components";
import type { FieldComponentProps } from "../../../_types/field.types";
import { useImageField } from "./_hooks/use-image-field";
import { ImagePreview, ImageFieldActions } from "./_components";
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---
import type { Dictionary } from "@/lib/schemas/i18n.schema";

type I18nContent = NonNullable<Dictionary["baviUploader"]> & {
  assetExplorer: NonNullable<Dictionary["assetExplorer"]>;
  sesaOptions: NonNullable<Dictionary["promptCreator"]>["sesaOptions"];
};

export function ImageField<TFieldValues extends FieldValues>(
  props: FieldComponentProps<TFieldValues>
): React.ReactElement {
  const { field, onValueChange, fieldName } = props;
  logger.trace(
    `[ImageField Orchestrator] Renderizando para: ${String(fieldName)}`
  );

  const pathname = usePathname();
  const locale = getCurrentLocaleFromPathname(pathname);
  const [i18nContent, setI18nContent] = useState<I18nContent | null>(null);

  useEffect(() => {
    const fetchI18n = async () => {
      try {
        const response = await fetch(`/api/i18n?locale=${locale}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const fullDictionary: Dictionary = await response.json();
        if (
          fullDictionary.baviUploader &&
          fullDictionary.assetExplorer &&
          fullDictionary.promptCreator
        ) {
          setI18nContent({
            ...fullDictionary.baviUploader,
            assetExplorer: fullDictionary.assetExplorer,
            sesaOptions: fullDictionary.promptCreator.sesaOptions,
          });
        } else {
          throw new Error("Contenido i18n para BAVI incompleto.");
        }
      } catch (error) {
        logger.error("Fallo al cargar contenido i18n para ImageField", {
          error,
        });
      }
    };
    fetchI18n();
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

  return (
    <div className="space-y-2">
      {currentImageValue && (
        <ImagePreview
          src={currentImageValue}
          alt={`Vista previa para ${String(fieldName)}`}
          onRemove={handleRemoveImage}
        />
      )}

      {i18nContent ? (
        <>
          <ImageFieldActions
            onUpload={handleImageUpload}
            onSelectClick={() => setIsSelectorOpen(true)}
            isUploading={isUploading}
            hasImage={!!currentImageValue}
          />
          <AssetSelectorModal
            isOpen={isSelectorOpen}
            onClose={() => setIsSelectorOpen(false)}
            onAssetSelect={handleAssetSelected}
            locale={locale}
            content={{
              modalTitle: i18nContent.assetSelectorModalTitle,
              modalDescription: i18nContent.assetSelectorModalDescription,
              assetExplorerContent: i18nContent.assetExplorer,
              sesaOptions: i18nContent.sesaOptions,
            }}
          />
        </>
      ) : (
        <div className="h-24 flex items-center justify-center bg-muted/50 rounded-md text-sm text-muted-foreground">
          Cargando configuración de BAVI...
        </div>
      )}
    </div>
  );
}
