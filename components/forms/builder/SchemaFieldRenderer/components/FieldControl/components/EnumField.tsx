// components/forms/builder/SchemaFieldRenderer/components/FieldControl/components/EnumField.tsx
/**
 * @file EnumField.tsx
 * @description Aparato hiper-atómico para renderizar un control <Select> para campos Zod de tipo enum.
 *              Restaurado y nivelado para una funcionalidad completa y coherente con el proyecto.
 * @version 2.0.0 (Restored & Elite Leveling)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import type { FieldValues } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import type { FieldComponentProps } from "../types/field.types";
import { logger } from "@/lib/logging";
import type { z } from "zod"; // Importar z para inferir el tipo de enum

interface EnumFieldProps<TFieldValues extends FieldValues>
  extends FieldComponentProps<TFieldValues> {
  enumOptions: string[]; // Opciones extraídas del Zod enum
  placeholder?: string; // Nuevo: Placeholder para el Select
}

export function EnumField<TFieldValues extends FieldValues>({
  field,
  onValueChange,
  fieldName,
  enumOptions,
  placeholder, // Usar el nuevo placeholder
}: EnumFieldProps<TFieldValues>): React.ReactElement {
  logger.trace(`[EnumField] Renderizando para campo enum: ${String(fieldName)}`);

  // Asegurarse de que el valor por defecto esté en las opciones, o sea vacío.
  const currentValue = field.value && enumOptions.includes(field.value as string)
    ? field.value
    : "";

  return (
    <Select
      value={currentValue}
      onValueChange={(value) => {
        field.onChange(value);
        onValueChange(fieldName, value);
      }}
      onBlur={field.onBlur}
    >
      <SelectTrigger className="w-full transition-all duration-200 hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary">
        <SelectValue placeholder={placeholder || `Seleccionar ${String(fieldName).replace(/([A-Z])/g, " $1").toLowerCase()}`} />
      </SelectTrigger>
      <SelectContent>
        {enumOptions.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
