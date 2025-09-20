// components/forms/builder/SchemaFieldRenderer/_components/fields/ImageField/ImageField.tsx
/**
 * @file ImageField.tsx
 * @description Orquestador "Server Shell" para el campo de imagen. Carga los
 *              datos i18n de forma segura y los delega al componente cliente
 *              para la interacción, resolviendo el conflicto de runtimes.
 * @version 8.0.0 (Server Component Architecture)
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import type { FieldValues } from "react-hook-form";
import { headers } from "next/headers";
import { getBaviI18nContentAction } from "@/app/[locale]/(dev)/bavi/_actions";
import { getCurrentLocaleFromPathname } from "@/lib/i18n.utils";
import type { FieldComponentProps } from "../../../_types/field.types";
import { ImageFieldClient } from "./_components/ImageFieldClient";

// Exportamos el tipo que el ImageFieldClient necesitará.
export type { BaviI18nContent } from "@/app/[locale]/(dev)/bavi/_actions";

export async function ImageField<TFieldValues extends FieldValues>(
  props: FieldComponentProps<TFieldValues>
) {
  const pathname = headers().get("x-next-pathname") || "";
  const locale = getCurrentLocaleFromPathname(pathname);
  const i18nResult = await getBaviI18nContentAction(locale);

  if (!i18nResult.success) {
    // Renderiza un estado de error claro si la carga de contenido falla.
    return (
      <div className="h-24 flex items-center justify-center bg-destructive/10 rounded-md text-sm text-destructive-foreground">
        {i18nResult.error}
      </div>
    );
  }

  // Pasa TODAS las props originales MÁS el contenido i18n cargado al cliente.
  return <ImageFieldClient {...props} i18nContent={i18nResult.data} />;
}
// components/forms/builder/SchemaFieldRenderer/_components/fields/ImageField/ImageField.tsx
