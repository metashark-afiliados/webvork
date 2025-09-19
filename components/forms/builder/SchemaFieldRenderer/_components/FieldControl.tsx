// components/forms/builder/SchemaFieldRenderer/_components/FieldControl.tsx
/**
 * @file FieldControl.tsx
 * @description Componente despachador puro. Ahora soporta la delegación a ImageField.
 * @version 3.0.0 (ImageField Delegation)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import type { FieldValues } from "react-hook-form";
import { logger } from "@/lib/logging";
import type { FieldComponentProps } from "../_types/field.types";
import { useFieldMetadata } from "../_hooks/useFieldMetadata";
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
      // --- [INICIO DE NUEVA LÓGICA DE DESPACHO] ---
      case "image":
        return <Fields.ImageField {...props} />;
      // --- [FIN DE NUEVA LÓGICA DE DESPACHO] ---
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
// components/forms/builder/SchemaFieldRenderer/_components/FieldControl.tsx
