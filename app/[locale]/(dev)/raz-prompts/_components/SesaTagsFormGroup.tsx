// app/[locale]/(dev)/raz-prompts/_components/SesaTagsFormGroup.tsx
/**
 * @file SesaTagsFormGroup.tsx
 * @description Aparato de presentación atómico para el grupo de selectores de SESA.
 * @version 2.0.0 (Type Safe Iteration & Contract Fix): Refactorizado para usar
 *              una iteración segura a nivel de tipos y un contrato explícito,
 *              resolviendo la cascada de errores de inferencia y de importación.
 * @version 2.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";
import React from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";
// --- [INICIO DE CORRECCIÓN DE IMPORTACIÓN Y TIPO] ---
import {
  RaZPromptsSesaTagsSchema,
  type RaZPromptsSesaTags as SesaTags,
} from "@/lib/schemas/raz-prompts/atomic.schema";
// --- [FIN DE CORRECCIÓN DE IMPORTACIÓN Y TIPO] ---
import type { PromptCreatorContentSchema } from "@/lib/schemas/raz-prompts/prompt-creator.i18n.schema";
import { logger } from "@/lib/logging";
import type { z } from "zod";

type SesaContent = Pick<
  z.infer<typeof PromptCreatorContentSchema>,
  "sesaLabels" | "sesaOptions"
>;

type SesaFormFields = FieldValues & {
  tags: SesaTags; // El nombre del campo en el formulario es 'tags'
};

interface SesaTagsFormGroupProps<TFieldValues extends SesaFormFields> {
  control: Control<TFieldValues>;
  content: {
    [K in keyof SesaContent["sesaLabels"]]: string;
  } & {
    options: SesaContent["sesaOptions"];
  };
}

// --- [INICIO DE REFACTORIZACIÓN DE ITERACIÓN SEGURA] ---
// Se define explícitamente el array de claves con el tipo correcto.
// TypeScript ahora sabe que cada elemento es una clave válida de SesaTags.
const sesaFields: (keyof SesaTags)[] = Object.keys(
  RaZPromptsSesaTagsSchema.shape
) as (keyof SesaTags)[];
// --- [FIN DE REFACTORIZACIÓN DE ITERACIÓN SEGURA] ---

export function SesaTagsFormGroup<TFieldValues extends SesaFormFields>({
  control,
  content,
}: SesaTagsFormGroupProps<TFieldValues>) {
  logger.trace("[SesaTagsFormGroup] Renderizando grupo de tags SESA v2.0.");

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {sesaFields.map((tagName) => (
        <FormField
          key={tagName}
          control={control}
          // La construcción del path ahora es 100% segura
          name={`tags.${tagName}` as Path<TFieldValues>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{content[tagName]}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* TypeScript ahora sabe que content.options[tagName] existe y es un array */}
                  {content.options[tagName].map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
// app/[locale]/(dev)/raz-prompts/_components/SesaTagsFormGroup.tsx
