// components/forms/builder/SchemaFieldRenderer/_components/fields/StringField.tsx
/**
 * @file StringField.tsx
 * @description Aparato hiper-atómico para renderizar un control <Textarea>.
 * @version 2.1.0 (Absolute Path & Contract Fix)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import type { FieldValues } from "react-hook-form";
import { Textarea } from "@/components/ui/Textarea";
// --- [INICIO DE CORRECCIÓN DE RUTA Y CONTRATO] ---
import type { FieldComponentProps } from "../../_types/field.types";
import { logger } from "@/shared/lib/logging";

interface StringFieldProps<TFieldValues extends FieldValues>
  extends FieldComponentProps<TFieldValues> {
  placeholder?: string;
}

export function StringField<TFieldValues extends FieldValues>({
  field,
  onValueChange,
  fieldName,
  placeholder,
}: StringFieldProps<TFieldValues>): React.ReactElement {
  // --- [FIN DE CORRECCIÓN DE RUTA Y CONTRATO] ---
  logger.trace(`[StringField] Renderizando para: ${String(fieldName)}`);
  return (
    <Textarea
      {...field}
      placeholder={placeholder}
      value={field.value ?? ""}
      onBlur={(e) => {
        field.onBlur();
        onValueChange(fieldName, e.target.value);
      }}
      className="min-h-[100px] transition-all duration-200 hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary"
    />
  );
}
// components/forms/builder/SchemaFieldRenderer/_components/fields/StringField.tsx
