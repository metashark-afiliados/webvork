// components/layout/ThemeInjector.tsx // <-- ¡COMENTARIO CORREGIDO!
/**
 * @file ThemeInjector.tsx
 * @description Componente de servidor atómico cuya única responsabilidad es
 *              generar e inyectar las variables de tema CSS en el <head>.
 *              - v1.1.0: Corrige el comentario de ruta interno para reflejar la
 *                ubicación real del archivo en el proyecto.
 * @version 1.1.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/components/layout/ThemeInjector.tsx.md
 */
import React from "react";
import { generateThemeVariablesStyle } from "@/lib/utils/theme.utils";
import { logger } from "@/lib/logging";

/**
 * @component ThemeInjector
 * @description Genera las variables CSS del tema global y las inyecta como
 *              una etiqueta <style>. Este enfoque del lado del servidor previene
 *              el FOUC (Flash of Unstyled Content).
 * @returns {React.ReactElement | null} La etiqueta <style> o null.
 */
export function ThemeInjector(): React.ReactElement | null {
  logger.trace(
    "[Observabilidad] Renderizando ThemeInjector (Server Component) e inyectando tema global en el servidor."
  ); // Observabilidad actualizada
  const themeStyleString = generateThemeVariablesStyle();

  if (!themeStyleString) {
    logger.warn(
      "[ThemeInjector] No se generaron variables de tema globales. No se inyectará ningún estilo."
    ); // Observabilidad
    return null;
  }

  return <style dangerouslySetInnerHTML={{ __html: themeStyleString }} />;
}
