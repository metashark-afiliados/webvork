// components/dev/DeveloperErrorDisplay.tsx
/**
 * @file DeveloperErrorDisplay.tsx
 * @description Componente de UI de élite, exclusivo para desarrollo, que muestra
 *              información detallada sobre errores de carga de datos en el servidor.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { Container, DynamicIcon } from "@/components/ui";

interface DeveloperErrorDisplayProps {
  context: string;
  errorMessage: string;
  errorDetails?: Error | string | null;
}

export function DeveloperErrorDisplay({
  context,
  errorMessage,
  errorDetails,
}: DeveloperErrorDisplayProps) {
  return (
    <Container className="py-12">
      <div className="border-2 border-dashed border-destructive rounded-lg bg-destructive/5 p-6 text-destructive">
        <div className="flex items-start gap-4">
          <DynamicIcon name="TriangleAlert" className="h-8 w-8 mt-1" />
          <div>
            <h1 className="text-2xl font-bold text-destructive-foreground">
              Error de Renderizado en Servidor (Modo DEV)
            </h1>
            <p className="mt-1 font-semibold">
              Contexto:{" "}
              <span className="font-mono bg-destructive/20 px-1 rounded">
                {context}
              </span>
            </p>
            <p className="mt-2 text-destructive-foreground/90">
              {errorMessage}
            </p>

            {errorDetails && (
              <details className="mt-4 text-xs">
                <summary className="cursor-pointer font-medium text-destructive-foreground/70 hover:text-destructive-foreground">
                  Ver Detalles Técnicos del Error
                </summary>
                <pre className="mt-2 p-3 bg-black/30 rounded-md whitespace-pre-wrap font-mono">
                  {errorDetails instanceof Error
                    ? `${errorDetails.name}: ${errorDetails.message}\n${errorDetails.stack}`
                    : JSON.stringify(errorDetails, null, 2)}
                </pre>
              </details>
            )}
            <p className="mt-4 text-xs text-destructive-foreground/60">
              Esta pantalla de error solo es visible en modo de desarrollo. En
              producción, esto se habría convertido en una página 404.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
// components/dev/DeveloperErrorDisplay.tsx
