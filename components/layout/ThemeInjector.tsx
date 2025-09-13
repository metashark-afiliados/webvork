// frontend/src/components/layout/ThemeInjector.tsx
/**
 * @file ThemeInjector.tsx
 * @description Componente de servidor atómico cuya única responsabilidad es
 *              generar e inyectar las variables de tema CSS en el <head>.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
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
  logger.trace("[ThemeInjector] Inyectando tema global en el servidor.");
  const themeStyleString = generateThemeVariablesStyle();

  if (!themeStyleString) {
    return null;
  }

  return <style dangerouslySetInnerHTML={{ __html: themeStyleString }} />;
}
// frontend/src/components/layout/ThemeInjector.tsx
