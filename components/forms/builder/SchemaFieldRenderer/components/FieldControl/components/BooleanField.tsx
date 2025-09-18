// components/forms/builder/SchemaFieldRenderer/components/FieldControl/components/BooleanField.tsx
/**
 * @file BooleanField.tsx
 * @description Aparato hiper-atómico para renderizar un control <Switch>.
 *              v2.1.0 (Code Hygiene): Se elimina la interfaz vacía.
 * @version 2.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import type { FieldValues } from "react-hook-form";
import { Switch } from "@/components/ui/Switch";
import type { FieldComponentProps } from "../types/field.types";
import { logger } from "@/lib/logging";

// --- [INICIO DE CORRECCIÓN: @typescript-eslint/no-empty-object-type] ---
// La interfaz vacía es redundante y se elimina. El tipo se usa directamente.
// --- [FIN DE CORRECCIÓN] ---

export function BooleanField<TFieldValues extends FieldValues>({
  field,
  onValueChange,
  fieldName,
}: FieldComponentProps<TFieldValues>): React.ReactElement {
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
