// components/forms/builder/SchemaFieldRenderer/components/FieldControl/FieldControl.tsx
/**
 * @file FieldControl.tsx
 * @description Componente despachador puro.
 *              v5.1.0 (EnumField & ImageField Integration): Asegura que los campos
 *              de tipo `ZodEnum` e `ImageField` se despachen correctamente,
 *              pasando todas las props necesarias, incluyendo `enumOptions` y `placeholder`.
 * @version 5.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import type { FieldValues } from "react-hook-form";
import { logger } from "@/lib/logging";
import type { z } from "zod";

import {
  BooleanField,
  NumberField,
  StringField,
  EnumField,
  ImageField,
} from "./components";
import type { FieldComponentProps } from "./types/field.types";

interface FieldControlProps<TFieldValues extends FieldValues>
  extends FieldComponentProps<TFieldValues> {
  fieldType: string;
  fieldSchema: z.ZodTypeAny;
}

export function FieldControl<TFieldValues extends FieldValues>({
  field,
  fieldType,
  onValueChange,
  fieldName,
  fieldSchema,
}: FieldControlProps<TFieldValues>): React.ReactElement {
  logger.trace(
    `[FieldControl] Despachando campo '${String(
      fieldName
    )}' del tipo: ${fieldType}`
  );

  const isImageField =
    fieldType === "ZodString" &&
    (fieldSchema.description === "image_url" ||
      fieldSchema.description === "image_asset_id");

  if (isImageField) {
    return (
      <ImageField
        field={field}
        onValueChange={onValueChange}
        fieldName={fieldName}
      />
    );
  }

  switch (fieldType) {
    case "ZodBoolean":
      return (
        <BooleanField
          field={field}
          onValueChange={onValueChange}
          fieldName={fieldName}
        />
      );
    case "ZodNumber":
      return (
        <NumberField
          field={field}
          onValueChange={onValueChange}
          fieldName={fieldName}
        />
      );
    case "ZodEnum":
      const enumOptions = (fieldSchema as z.ZodEnum<[string, ...string[]]>)
        .options;
      // Aquí puedes añadir un placeholder si el schema lo provee, ej. a través de .describe()
      const placeholder = (fieldSchema as any)._def.description; // Intenta leer el placeholder del schema
      return (
        <EnumField
          field={field}
          onValueChange={onValueChange}
          fieldName={fieldName}
          enumOptions={enumOptions}
          placeholder={placeholder} // Pasar placeholder al EnumField
        />
      );
    case "ZodString":
    default:
      return (
        <StringField
          field={field}
          onValueChange={onValueChange}
          fieldName={fieldName}
        />
      );
  }
}
