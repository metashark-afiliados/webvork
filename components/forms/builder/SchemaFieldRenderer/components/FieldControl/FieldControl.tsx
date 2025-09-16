// components/forms/builder/SchemaFieldRenderer/components/FieldControl/FieldControl.tsx
/**
 * @file FieldControl.tsx
 * @description Componente despachador puro.
 *              v3.0.0 (Architectural Alignment): Movido a su ubicación canónica y
 *              rutas de importación corregidas para resolver la ambigüedad del módulo.
 * @version 3.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import type { FieldValues } from "react-hook-form";
import { logger } from "@/lib/logging";

// --- [INICIO DE CORRECCIÓN DE RUTA DEFINITIVA] ---
// Desde su nueva ubicación, estas rutas relativas ahora son correctas e inequívocas.
import { BooleanField, NumberField, StringField } from "./components";
import type { FieldComponentProps } from "./types/field.types";
// --- [FIN DE CORRECCIÓN DE RUTA DEFINITIVA] ---

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
    `[FieldControl] Despachando campo '${String(
      fieldName
    )}' del tipo: ${fieldType}`
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
// components/forms/builder/SchemaFieldRenderer/components/FieldControl/FieldControl.tsx
