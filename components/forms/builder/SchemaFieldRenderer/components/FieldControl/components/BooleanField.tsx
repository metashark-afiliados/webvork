// components/forms/builder/SchemaFieldRenderer/components/FieldControl/components/BooleanField.tsx
/**
 * @file BooleanField.tsx
 * @description Aparato hiper-atómico para renderizar un control <Switch>.
 *              v2.0.0 (Architectural Fix): Corrige la ruta de importación de
 *              tipos y el contrato de props para alinearse con la SSoT.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React from "react";
import type { FieldValues } from "react-hook-form";
import { Switch } from "@/components/ui/Switch";
import type { FieldComponentProps } from "../types/field.types";
import { logger } from "@/lib/logging";

interface BooleanFieldProps<TFieldValues extends FieldValues>
  extends FieldComponentProps<TFieldValues> {}

export function BooleanField<TFieldValues extends FieldValues>({
  field,
  onValueChange,
  fieldName,
}: BooleanFieldProps<TFieldValues>): React.ReactElement {
  logger.trace(`[BooleanField] Renderizando para campo: ${String(fieldName)}`);
  return (
    <div className="flex items-center space-x-2 h-10 group">
      <Switch
        checked={field.value}
        onCheckedChange={(checked) => {
          field.onChange(checked);
          onValueChange(fieldName, checked);
        }}
        className="transition-all duration-200 group-hover:scale-105 group-focus-within:ring-2 group-focus-within:ring-primary"
      />
    </div>
  );
}
// components/forms/builder/SchemaFieldRenderer/components/FieldControl/components/BooleanField.tsx
