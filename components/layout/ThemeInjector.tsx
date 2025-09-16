// components/layout/ThemeInjector.tsx
/**
 * @file ThemeInjector.tsx
 * @description Componente de servidor atómico para inyectar variables de tema.
 *              - v3.0.0 (Coherence Fix): Se elimina la lógica de generación de estilos.
 *                Según la arquitectura de Theming v3.0, el tema global es estático
 *                y se carga desde globals.css. Este componente queda como un placeholder
 *                arquitectónico para futuras capacidades de theming global dinámico.
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { logger } from "@/lib/logging";

/**
 * @component ThemeInjector
 * @description Placeholder arquitectónico. En la arquitectura actual, el tema
 *              global es estático. Este componente no necesita renderizar nada.
 * @returns {null} No renderiza ningún elemento.
 */
export function ThemeInjector(): null {
  logger.trace(
    "[Observabilidad] Renderizando ThemeInjector (no-op en la arquitectura actual)."
  );
  return null;
}
// components/layout/ThemeInjector.tsx
