// components/forms/builder/SchemaFieldRenderer/components/FieldControl/components/StringField.tsx
/**
 * @file StringField.tsx
 * @description Aparato hiper-atómico para renderizar un control <Textarea>.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React from "react";
import type { FieldValues } from "react-hook-form";
import { Textarea } from "@/components/ui/Textarea";
import type { FieldComponentProps } from "../types/field.types";
import { logger } from "@/lib/logging";

interface StringFieldProps<TFieldValues extends FieldValues>
  extends FieldComponentProps<TFieldValues> {}

export function StringField<TFieldValues extends FieldValues>({
  field,
  onValueChange,
  fieldName,
}: StringFieldProps<TFieldValues>): React.ReactElement {
  logger.trace(`[StringField] Renderizando para campo: ${String(fieldName)}`);
  return (
    <Textarea
      {...field}
      value={field.value ?? ""}
      onBlur={(e) => {
        field.onBlur();
        onValueChange(fieldName, e.target.value);
      }}
      className="min-h-[100px] transition-all duration-200 hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary"
    />
  );
}
// components/forms/builder/SchemaFieldRenderer/components/FieldControl/components/StringField.tsx
