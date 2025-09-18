// app/[locale]/(dev)/bavi/_components/AssetUploader/_components/MetadataForm.tsx
/**
 * @file MetadataForm.tsx
 * @description Componente de presentación puro para el formulario de metadatos de BAVI.
 * @version 3.0.0 (React Hook Form Integration)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from "@/components/ui";
import type { Control } from "react-hook-form";
import type { AssetUploadMetadata } from "@/lib/bavi/upload.schema";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

type UploaderContent = NonNullable<Dictionary["baviUploader"]>;

interface MetadataFormProps {
  control: Control<AssetUploadMetadata>;
  content: UploaderContent;
}

export function MetadataForm({
  control,
  content,
}: MetadataFormProps): React.ReactElement {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="assetId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{content.assetIdLabel}</FormLabel>
            <FormControl>
              <Input placeholder={content.assetIdPlaceholder} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="keywords"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{content.keywordsLabel}</FormLabel>
            <FormControl>
              <Input
                placeholder={content.keywordsPlaceholder}
                {...field}
                onChange={(e) => field.onChange(e.target.value.split(","))}
                value={Array.isArray(field.value) ? field.value.join(", ") : ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="altText.it-IT"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{content.altTextLabel}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={content.altTextPlaceholder}
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="promptId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{content.promptIdLabel}</FormLabel>
            <FormControl>
              <Input
                placeholder={content.promptIdPlaceholder}
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
// app/[locale]/(dev)/bavi/_components/AssetUploader/_components/MetadataForm.tsx
