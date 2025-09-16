// lib/config/theming.config.ts
/**
 * @file theming.config.ts
 * @description SSoT para la configuración del sistema de Theming.
 *              Define el mapeo entre los prefijos de la Nomenclatura
 *              Estructurada de Trazos (NET) y sus directorios correspondientes.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { logger } from "@/lib/logging";

logger.trace("[Theming Config] Módulo de configuración de theming cargado.");

/**
 * @const netTracePrefixToPathMap
 * @description El mapa canónico que traduce un prefijo de trazo NET
 *              (ej. 'cp') a su directorio de fragmentos correspondiente.
 */
export const netTracePrefixToPathMap: Record<string, string> = {
  cp: "colors", // Color Palette
  ft: "fonts", // Fonts
  rd: "radii", // Radius (geometría)
  // Futuros prefijos se añadirán aquí. Ejemplo:
  // sh: "shadows",
};
// lib/config/theming.config.ts
