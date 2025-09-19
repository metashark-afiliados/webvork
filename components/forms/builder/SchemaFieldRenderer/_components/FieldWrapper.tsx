// components/forms/builder/SchemaFieldRenderer/_components/FieldWrapper.tsx
/**
 * @file FieldWrapper.tsx
 * @description Componente de envoltura de alto orden para campos de formulario.
 * @version 1.1.0 (Absolute Path Fix)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/Form";
import { useFocusStore } from "@/app/[locale]/(dev)/dev/campaign-suite/_context/FocusContext";
import { logger } from "@/lib/logging";
import { cn } from "@/lib/utils";
// --- [INICIO DE CORRECCIÓN DE RUTA] ---
import type { FieldMetadata } from "../_types/field.types";
// --- [FIN DE CORRECCIÓN DE RUTA] ---

interface FieldWrapperProps {
  children: React.ReactNode;
  metadata: FieldMetadata;
  sectionName: string;
  fieldName: string;
}

export function FieldWrapper({
  children,
  metadata,
  sectionName,
  fieldName,
}: FieldWrapperProps): React.ReactElement {
  logger.trace(`[FieldWrapper] Envolviendo campo: ${fieldName}`);
  const { setFocus, clearFocus } = useFocusStore();

  return (
    <FormItem
      onFocus={() => setFocus(sectionName, fieldName)}
      onBlur={clearFocus}
      className="group"
    >
      <FormLabel
        className={cn(
          "transition-colors duration-200",
          "group-focus-within:text-primary"
        )}
      >
        {metadata.label}
      </FormLabel>
      {metadata.description && (
        <FormDescription>{metadata.description}</FormDescription>
      )}
      <FormControl>{children}</FormControl>
      <FormMessage />
    </FormItem>
  );
}
// components/forms/builder/SchemaFieldRenderer/_components/FieldWrapper.tsx
