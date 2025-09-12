// src/components/dev/ComponentCanvasHeader.tsx
/**
 * @file src/components/dev/ComponentCanvasHeader.tsx
 * @description Componente de presentación para el encabezado visual del Dev Component Canvas.
 *              Muestra el nombre del componente y elementos decorativos de "escuadra de diseño".
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { LayoutGrid } from "lucide-react";

interface ComponentCanvasHeaderProps {
  entryName: string;
}

/**
 * @component ComponentCanvasHeader
 * @description Renderiza el área superior del canvas de componentes, incluyendo el nombre
 *              del componente y la "escuadra de diseño" decorativa.
 * @param {ComponentCanvasHeaderProps} props - Las propiedades del encabezado del canvas.
 * @returns {React.ReactElement} El elemento JSX del encabezado.
 */
export function ComponentCanvasHeader({
  entryName,
}: ComponentCanvasHeaderProps): React.ReactElement {
  return (
    <>
      <div className="absolute inset-0 border-4 border-dashed border-accent/20 rounded-lg pointer-events-none z-0"></div>
      <div className="absolute -top-3 -left-3 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-background text-xs font-bold z-10">
        <LayoutGrid className="h-4 w-4" />
      </div>
      <h1 className="text-3xl font-bold text-primary mb-4">{entryName}</h1>
      <p className="text-muted-foreground mb-6">
        Visualización de componente aislado.
      </p>
    </>
  );
}
// src/components/dev/ComponentCanvasHeader.tsx
