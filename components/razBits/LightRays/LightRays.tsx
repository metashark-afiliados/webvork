// components/razBits/LightRays/LightRays.tsx
/**
 * @file LightRays.tsx
 * @description Componente de presentación puro para el efecto de fondo de rayos de luz.
 *              - v2.0.0: Resuelve el error de linting `react-hooks/rules-of-hooks` al
 *                mover la llamada al hook `useLightRays` al nivel superior del componente,
 *                asegurando que se ejecute incondicionalmente.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useRef } from "react";
import { twMerge } from "tailwind-merge";
import { useLightRays } from "./useLightRays";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { logger } from "@/lib/logging";

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
  logger.info("[Observabilidad] Renderizando componente LightRays");
  const containerRef = useRef<HTMLDivElement | null>(null);

  // --- INICIO DE LA CORRECCIÓN ---
  // El hook `useLightRays` ahora se llama incondicionalmente en el nivel superior,
  // cumpliendo con las reglas de los hooks. Le pasamos el `config` o un objeto
  // vacío para que el hook siempre reciba un objeto definido.
  useLightRays(containerRef, config || {});

  // La guarda de seguridad para no renderizar el componente si no hay config
  // se mantiene, pero se ejecuta DESPUÉS de todas las llamadas a hooks.
  if (!config) {
    logger.warn(
      "[LightRays] No se proporcionó configuración. El efecto no se renderizará."
    );
    return null;
  }
  // --- FIN DE LA CORRECCIÓN ---

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
// components/razBits/LightRays/LightRays.tsx
