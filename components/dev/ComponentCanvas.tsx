// src/components/dev/ComponentCanvas.tsx
/**
 * @file ComponentCanvas.tsx
 * @description Componente orquestador para el Dev Component Canvas.
 *              Su única responsabilidad es invocar al `ComponentLoader` y pasar los
 *              datos resultantes a los sub-componentes de presentación, siguiendo
 *              el Principio de Responsabilidad Única.
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { clientLogger } from "@/lib/logging";
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
  clientLogger.info(
    `[CanvasOrchestrator] Orquestando renderizado para: ${componentName || "Indefinido"}, locale: ${locale}`
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
  } catch (error: any) {
    clientLogger.error(
      `[CanvasOrchestrator] Falla crítica al cargar "${componentName}":`,
      { error: error.message }
    );
    return (
      <div className="text-center text-destructive border border-red-500 p-8 rounded-lg">
        <h2 className="text-2xl font-bold">Error de Carga del Componente</h2>
        <p className="text-muted-foreground">
          No se pudo cargar el componente "<strong>{componentName}</strong>".
        </p>
        <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
      </div>
    );
  }
}
// src/components/dev/ComponentCanvas.tsx
