// RUTA: components/razBits/LightRays/LightRays.tsx
/**
 * @file LightRays.tsx
 * @description Componente de presentación puro para el efecto de fondo de rayos de luz.
 *              v2.1.0 (Resilient Parsing): Ahora es responsable de parsear la
 *              prop `config` contra su schema SSoT, garantizando que el hook
 *              subyacente siempre reciba una configuración completa y validada.
 * @version 2.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useRef } from "react";
import { twMerge } from "tailwind-merge";
import { useLightRays } from "./useLightRays";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { LightRaysConfigSchema } from "./light-rays.schema"; // Importamos el schema
import { logger } from "@/lib/logging";

interface LightRaysProps {
  config: Dictionary["lightRays"];
  className?: string;
}

export function LightRays({
  config,
  className,
}: LightRaysProps): React.ReactElement | null {
  logger.info("[Observabilidad] Renderizando componente LightRays v2.1");
  const containerRef = useRef<HTMLDivElement | null>(null);

  // --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
  // El componente AHORA es responsable de validar y completar la configuración.
  // `zod.parse` aplicará todos los `.default()` para las propiedades que falten en `config`.
  // Esto garantiza que `validatedConfig` siempre será un objeto completo.
  const validatedConfig = LightRaysConfigSchema.parse(config || {});

  // El hook ahora recibe una configuración garantizada y completa.
  useLightRays(containerRef, validatedConfig);
  // --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---

  return (
    <div
      ref={containerRef}
      className={twMerge(
        "w-full h-full pointer-events-none z-0 overflow-hidden relative",
        className
      )}
      aria-hidden="true"
    />
  );
}
