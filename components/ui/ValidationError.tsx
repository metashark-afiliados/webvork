// components/ui/ValidationError.tsx
/**
 * @file ValidationError.tsx
 * @description Componente de UI atómico para mostrar errores de validación de Zod.
 *              v1.1.0: Sincroniza el nombre del icono con la SSoT actualizada.
 * @version 1.1.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { type ZodError } from "zod";
import { DynamicIcon } from "@/components/ui";
import { logger } from "@/lib/logging";

interface ValidationErrorProps {
  sectionName: string;
  error: ZodError;
}

export function ValidationError({
  sectionName,
  error,
}: ValidationErrorProps): React.ReactElement | null {
  logger.error(
    `[ValidationError] Error de validación de datos para la sección: ${sectionName}`,
    { validationErrors: error.flatten().fieldErrors }
  );

  if (process.env.NODE_ENV !== "production") {
    return (
      <div className="container my-12 p-4 border-2 border-dashed border-destructive rounded-lg bg-destructive/10 text-destructive">
        <div className="flex items-start gap-4">
          {/* --- [INICIO DE CORRECCIÓN] --- */}
          {/* 'AlertTriangle' ahora es 'TriangleAlert'. */}
          <DynamicIcon name="TriangleAlert" className="h-6 w-6 mt-1" />
          {/* --- [FIN DE CORRECCIÓN] --- */}
          <div>
            <h3 className="font-bold text-lg">
              Error de Contrato de Datos en la Sección: &quot;{sectionName}
              &quot;
            </h3>
            <p className="text-sm mt-1">
              Los datos proporcionados para esta sección desde el archivo de
              contenido no cumplen con el schema de Zod esperado. La sección no
              se puede renderizar.
            </p>
            <details className="mt-3 text-xs">
              <summary className="cursor-pointer font-medium">
                Ver detalles del error de validación
              </summary>
              <pre className="mt-2 p-2 bg-black/20 rounded-md whitespace-pre-wrap">
                {JSON.stringify(error.flatten().fieldErrors, null, 2)}
              </pre>
            </details>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
// components/ui/ValidationError.tsx
