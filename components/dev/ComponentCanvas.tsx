// components/dev/ComponentCanvas.tsx
/**
 * @file ComponentCanvas.tsx
 * @description Componente orquestador para el Dev Component Canvas.
 *              - v3.2.0 (Type Safety): Erradica el uso de 'any'.
 * @version 3.2.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { logger } from "@/shared/lib/logging";
import { ComponentCanvasHeader } from "./ComponentCanvasHeader";
import { ComponentMetadataPanel } from "./ComponentMetadataPanel";
import { loadComponentAndProps } from "./ComponentLoader";
import Link from "next/link";

interface ComponentCanvasProps {
  componentName?: string;
  locale: string;
}

export async function ComponentCanvas({
  componentName,
  locale,
}: ComponentCanvasProps): Promise<React.ReactElement> {
  logger.info(
    `[CanvasOrchestrator] Orquestando renderizado para: ${
      componentName || "Indefinido"
    }, locale: ${locale}`
  );

  if (!componentName) {
    return (
      <div className="text-center text-destructive">
        <h2 className="text-2xl font-bold">Error</h2>
        <p>No se especificó un nombre de componente para renderizar.</p>
        <p className="text-sm text-muted-foreground">
          Por favor, selecciona un componente del{" "}
          <Link href={`/${locale}/dev`} className="underline text-primary">
            dashboard de desarrollo
          </Link>
          .
        </p>
      </div>
    );
  }

  try {
    const { ComponentToRender, componentProps, appliedTheme, entry } =
      await loadComponentAndProps(componentName, locale);

    return (
      <div className="border border-primary/50 rounded-lg p-6 bg-background/50 shadow-lg relative">
        <ComponentCanvasHeader entryName={entry.name} />

        <ComponentMetadataPanel
          appliedTheme={appliedTheme}
          componentProps={componentProps}
        />

        <div className="relative z-10 p-4 border border-dashed border-primary/40 rounded-md min-h-[300px] flex items-center justify-center">
          <ComponentToRender {...componentProps} />
        </div>
      </div>
    );
  } catch (error) {
    // --- [INICIO DE CORRECCIÓN: @typescript-eslint/no-explicit-any] ---
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(
      `[CanvasOrchestrator] Falla crítica al cargar "${componentName}":`,
      { error: errorMessage }
    );
    // --- [FIN DE CORRECCIÓN] ---
    return (
      <div className="text-center text-destructive border border-red-500 p-8 rounded-lg">
        <h2 className="text-2xl font-bold">Error de Carga del Componente</h2>
        <p className="text-muted-foreground">
          No se pudo cargar el componente &quot;
          <strong>{componentName}</strong>&quot;.
        </p>
        <p className="text-sm text-muted-foreground mt-2">{errorMessage}</p>
      </div>
    );
  }
}
// components/dev/ComponentCanvas.tsx
