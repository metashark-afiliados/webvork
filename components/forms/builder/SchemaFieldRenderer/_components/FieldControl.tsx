// RUTA: components/forms/builder/SchemaFieldRenderer/_components/FieldControl.tsx
/**
 * @file FieldControl.tsx
 * @description Componente despachador puro.
 *              v3.1.0 (Module Resolution Fix): Corrige la ruta de importación
 *              de `useFieldMetadata` para alinearse con la SSoT de nomenclatura
 *              (kebab-case) y restaurar la integridad del build.
 * @version 3.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import type { FieldValues } from "react-hook-form";
import { logger } from "@/lib/logging";
import type { FieldComponentProps } from "../_types/field.types";
// --- [INICIO DE CORRECCIÓN DE INTEGRIDAD] ---
import { useFieldMetadata } from "../_hooks/use-field-metadata";
// --- [FIN DE CORRECCIÓN DE INTEGRIDAD] ---
import { FieldWrapper } from "./FieldWrapper";
import * as Fields from "./fields";

interface FieldControlProps<TFieldValues extends FieldValues>
  extends FieldComponentProps<TFieldValues> {
  sectionName: string;
}

export function FieldControl<TFieldValues extends FieldValues>({
  field,
  sectionName,
  fieldName,
  fieldSchema,
  onValueChange,
}: FieldControlProps<TFieldValues>): React.ReactElement {
  const metadata = useFieldMetadata(fieldSchema, String(fieldName));
  logger.trace(
    `[FieldControl] Despachando campo '${String(
      fieldName
    )}' con control: ${metadata.controlType}`
  );

  const renderField = () => {
    const props = { field, fieldSchema, onValueChange, fieldName };
    switch (metadata.controlType) {
      case "switch":
        return <Fields.BooleanField {...props} />;
      case "select":
        return (
          <Fields.EnumField {...props} placeholder={metadata.placeholder} />
        );
      case "image":
        return <Fields.ImageField {...props} />;
      case "input":
      default:
        return (
          <Fields.StringField {...props} placeholder={metadata.placeholder} />
        );
    }
  };

  return (
    <FieldWrapper
      metadata={metadata}
      sectionName={sectionName}
      fieldName={String(fieldName)}
    >
      {renderField()}
    </FieldWrapper>
  );
}
