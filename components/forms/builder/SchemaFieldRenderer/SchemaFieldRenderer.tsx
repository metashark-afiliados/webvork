// components/forms/builder/SchemaFieldRenderer/SchemaFieldRenderer.tsx
/**
 * @file SchemaFieldRenderer.tsx
 * @description Orquestador de élite que integra react-hook-form con el renderizado
 *              dinámico de controles de UI basados en un schema de Zod. Ahora notifica
 *              el estado de foco al store global para habilitar el "Modo Enfoque Sincronizado"
 *              y pasa el `fieldSchema` completo al `FieldControl` para soportar `ZodEnum` e `ImageField`.
 * @version 5.1.0 (EnumField Placeholder Integration)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import { z } from "zod";
import type { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { logger } from "@/lib/logging";
import { FieldControl } from "./components/FieldControl";
import { useFocusStore } from "@/app/[locale]/(dev)/dev/campaign-suite/_context/FocusContext";

/**
 * @interface SchemaFieldRendererProps
 * @description Contrato de props para el renderizador de campos.
 * @template TFieldValues - El tipo del objeto de datos del formulario.
 */
interface SchemaFieldRendererProps<TFieldValues extends FieldValues> {
  /**
   * @prop control - La instancia de control de react-hook-form.
   */
  control: Control<TFieldValues>;
  /**
   * @prop sectionName - El nombre de la sección padre, para el contexto de foco.
   */
  sectionName: string;
  /**
   * @prop fieldName - El nombre (path) del campo dentro de los datos del formulario.
   */
  fieldName: Path<TFieldValues>;
  /**
   * @prop fieldSchema - El sub-schema de Zod que define el tipo y las validaciones del campo.
   */
  fieldSchema: z.ZodTypeAny;
  /**
   * @prop onValueChange - Callback que persiste los cambios en el borrador principal.
   */
  onValueChange: (field: Path<TFieldValues>, value: unknown) => void;
}

/**
 * @component SchemaFieldRenderer
 * @description Un componente inteligente que inspecciona un schema de Zod y renderiza
 *              el control de formulario apropiado. Actúa como el emisor de eventos de foco.
 *              Ahora soporta `ZodEnum` e `ImageField` pasando el schema completo al despachador `FieldControl`.
 */
export function SchemaFieldRenderer<TFieldValues extends FieldValues>({
  control,
  sectionName,
  fieldName,
  fieldSchema, // <-- Recibir fieldSchema
  onValueChange,
}: SchemaFieldRendererProps<TFieldValues>): React.ReactElement {
  // Extrae el estado y las acciones del store de foco.
  const { setFocus, clearFocus } = useFocusStore();

  // Determina el tipo de campo a renderizar a partir del schema de Zod.
  const fieldType = fieldSchema._def.typeName;

  logger.trace(
    `[SchemaFieldRenderer] Orquestando campo '${String(
      fieldName
    )}' (tipo: '${fieldType}') en sección '${sectionName}'`
  );

  // El div envolvente captura los eventos de foco y desenfoque para toda el área del campo.
  return (
    <div
      onFocus={() => setFocus(sectionName, String(fieldName))}
      onBlur={clearFocus}
    >
      <FormField
        control={control}
        name={fieldName}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="capitalize text-foreground/80">
              {/* Genera una etiqueta legible a partir del nombre del campo. */}
              {String(fieldName).replace(/([A-Z])/g, " $1")}
            </FormLabel>
            <FormControl>
              {/* Delega la lógica de renderizado del control específico al componente FieldControl. */}
              <FieldControl
                field={field}
                fieldType={fieldType}
                onValueChange={onValueChange}
                fieldName={fieldName}
                fieldSchema={fieldSchema} // <-- Pasar fieldSchema a FieldControl
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
