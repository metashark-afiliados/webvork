// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/SchemaFieldRenderer.tsx
/**
 * @file SchemaFieldRenderer.tsx
 * @description Componente inteligente que renderiza un campo de formulario
 *              basado en su tipo de schema de Zod.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React from "react";
import { z } from "zod";
import type { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Switch,
  Textarea,
} from "@/components/ui";

interface SchemaFieldRendererProps {
  control: Control<any>;
  fieldName: string;
  fieldSchema: z.ZodTypeAny;
  currentValue: any;
  onValueChange: (field: string, value: any) => void;
}

export function SchemaFieldRenderer({
  control,
  fieldName,
  fieldSchema,
  currentValue,
  onValueChange,
}: SchemaFieldRendererProps) {
  const fieldType = fieldSchema._def.typeName;

  const renderField = (field: any) => {
    switch (fieldType) {
      case "ZodBoolean":
        return (
          <div className="flex items-center space-x-2 h-10">
            <Switch
              checked={field.value}
              onCheckedChange={(checked) => {
                field.onChange(checked);
                onValueChange(fieldName, checked);
              }}
            />
          </div>
        );
      case "ZodNumber":
        return (
          <Input
            type="number"
            {...field}
            onBlur={(e) => {
              field.onBlur();
              onValueChange(fieldName, Number(e.target.value));
            }}
          />
        );
      // Por defecto, tratamos los strings. Podríamos añadir más lógica para diferenciar
      // entre Input y Textarea basado en metadatos del schema si fuera necesario.
      case "ZodString":
      default:
        return (
          <Textarea
            {...field}
            onBlur={(e) => {
              field.onBlur();
              onValueChange(fieldName, e.target.value);
            }}
            className="min-h-[80px]"
          />
        );
    }
  };

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">
            {fieldName.replace(/([A-Z])/g, " $1")}
          </FormLabel>
          <FormControl>{renderField(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/SchemaFieldRenderer.tsx
