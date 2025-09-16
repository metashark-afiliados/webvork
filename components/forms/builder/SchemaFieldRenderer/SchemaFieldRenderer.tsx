// components/forms/builder/SchemaFieldRenderer/SchemaFieldRenderer.tsx
/**
 * @file SchemaFieldRenderer.tsx
 * @description Orquestador que integra react-hook-form con el renderizado de controles de UI.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
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

interface SchemaFieldRendererProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  fieldName: Path<TFieldValues>;
  fieldSchema: z.ZodTypeAny;
  onValueChange: (field: Path<TFieldValues>, value: unknown) => void;
}

export function SchemaFieldRenderer<TFieldValues extends FieldValues>({
  control,
  fieldName,
  fieldSchema,
  onValueChange,
}: SchemaFieldRendererProps<TFieldValues>): React.ReactElement {
  const fieldType = fieldSchema._def.typeName;
  logger.trace(
    `[SchemaFieldRenderer] Orquestando campo '${String(fieldName)}' del tipo '${fieldType}'`
  );

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize text-foreground/80">
            {String(fieldName).replace(/([A-Z])/g, " $1")}
          </FormLabel>
          <FormControl>
            <FieldControl
              field={field}
              fieldType={fieldType}
              onValueChange={onValueChange}
              fieldName={fieldName}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
// components/forms/builder/SchemaFieldRenderer/SchemaFieldRenderer.tsx
