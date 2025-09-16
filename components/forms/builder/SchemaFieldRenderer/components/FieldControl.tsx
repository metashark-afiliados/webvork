// components/forms/builder/SchemaFieldRenderer/components/FieldControl.tsx
/**
 * @file FieldControl.tsx
 * @description Componente despachador puro.
 *              v2.2.0 (Architectural Fix): Corrige rutas de importación y
 *              contratos de props tras la hiper-atomización.
 * @version 2.2.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React from "react";
import type { FieldValues } from "react-hook-form";
import { logger } from "@/lib/logging";
import { BooleanField, NumberField, StringField } from "./components";
import type { FieldComponentProps } from "./types/field.types";

interface FieldControlProps<TFieldValues extends FieldValues>
  extends FieldComponentProps<TFieldValues> {
  fieldType: string;
}

export function FieldControl<TFieldValues extends FieldValues>({
  field,
  fieldType,
  onValueChange,
  fieldName,
}: FieldControlProps<TFieldValues>): React.ReactElement {
  logger.trace(
    `[FieldControl] Despachando campo '${String(fieldName)}' del tipo: ${fieldType}`
  );
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
// components/forms/builder/SchemaFieldRenderer/components/FieldControl.tsx
