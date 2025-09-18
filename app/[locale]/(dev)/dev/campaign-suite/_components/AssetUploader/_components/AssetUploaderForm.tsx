// app/[locale]/(dev)/dev/campaign-suite/_components/AssetUploader/_components/AssetUploaderForm.tsx
/**
 * @file AssetUploaderForm.tsx
 * @description Componente de presentación puro para la UI del AssetUploader.
 * @version 2.1.0 (Code Hygiene): Se elimina la importación no utilizada 'Control'
 *              para resolver el error de linting y mantener el código limpio.
 * @version 2.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
// --- [INICIO DE CORRECCIÓN DE HIGIENE] ---
// Se elimina 'Control' de la importación de react-hook-form.
import type { UseFormReturn } from "react-hook-form";
// --- [FIN DE CORRECCIÓN DE HIGIENE] ---
import type { DropzoneRootProps, DropzoneInputProps } from "react-dropzone";
import type { UploadApiResponse } from "cloudinary";
import { Form, Button, DynamicIcon } from "@/components/ui";
import { AssetDropzone, MetadataForm, UploadPreview } from "./";
import { SesaTagsFormGroup } from "../../../raz-prompts/_components/SesaTagsFormGroup";
import type { AssetUploadMetadata } from "@/lib/bavi/upload.schema";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

type UploaderContent = NonNullable<Dictionary["baviUploader"]>;
type SesaContent = NonNullable<Dictionary["promptCreator"]>["sesaLabels"] & {
  options: NonNullable<Dictionary["promptCreator"]>["sesaOptions"];
};

interface AssetUploaderFormProps {
  form: UseFormReturn<AssetUploadMetadata>;
  onSubmit: () => void;
  isPending: boolean;
  preview: string | null;
  uploadResult: UploadApiResponse | null;
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  isDragActive: boolean;
  content: UploaderContent;
  sesaContent: SesaContent;
}

export function AssetUploaderForm({
  form,
  onSubmit,
  isPending,
  preview,
  uploadResult,
  getRootProps,
  getInputProps,
  isDragActive,
  content,
  sesaContent,
}: AssetUploaderFormProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
      >
        <AssetDropzone
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
          preview={preview}
          text={content.dropzoneDefault}
        />
        <div className="space-y-6">
          <MetadataForm control={form.control} content={content} />
          <SesaTagsFormGroup control={form.control} content={sesaContent} />
          <Button
            type="submit"
            disabled={isPending || !preview}
            className="w-full"
            size="lg"
          >
            {isPending && (
              <DynamicIcon
                name="LoaderCircle"
                className="mr-2 h-4 w-4 animate-spin"
              />
            )}
            {content.submitButtonText}
          </Button>
          <UploadPreview uploadResult={uploadResult} />
        </div>
      </form>
    </Form>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/AssetUploader/_components/AssetUploaderForm.tsx
