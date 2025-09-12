// src/components/razBits/LightRays/LightRays.tsx
/**
 * @file LightRays.tsx
 * @description Componente de presentación puro para el efecto de fondo de rayos de luz.
 * @version 1.1.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useRef } from "react";
import { twMerge } from "tailwind-merge";
import { useLightRays } from "./useLightRays"; // <<-- Ruta relativa al hook co-ubicado
import type { Dictionary } from "@/lib/schemas/i18n.schema";

/**
 * @interface LightRaysProps
 * @description Define las props para el componente LightRays.
 */
interface LightRaysProps {
  /**
   * @param config La configuración de i18n para el efecto. Puede ser undefined si no está en el diccionario.
   */
  config: Dictionary["lightRays"];
  /**
   * @param className Clases CSS adicionales para el contenedor.
   */
  className?: string;
}

/**
 * @component LightRays
 * @description Renderiza un contenedor div y delega toda la lógica de renderizado
 *              de WebGL al hook `useLightRays`. Actúa como la capa de presentación.
 * @returns {React.ReactElement | null} El elemento JSX del contenedor, o null si no hay configuración.
 */
export function LightRays({
  config,
  className,
}: LightRaysProps): React.ReactElement | null {
  console.log("[Observabilidad] Renderizando componente LightRays");
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Guarda de seguridad: Si no hay configuración, no renderizamos el efecto.
  // Esto hace que el componente sea más resiliente.
  if (!config) {
    return null;
  }

  // El hook `useLightRays` es invocado aquí. No devuelve nada, pero
  // aplica el efecto de WebGL al `div` referenciado.
  useLightRays(containerRef, config);

  return (
    <div
      ref={containerRef}
      className={twMerge(
        "w-full h-full pointer-events-none z-0 overflow-hidden relative",
        className
      )}
      aria-hidden="true" // Es un elemento puramente decorativo.
    />
  );
}
// src/components/razBits/LightRays/LightRays.tsx
