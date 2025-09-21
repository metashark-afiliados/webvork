// components/dev/DevToolsDropdown.tsx
/**
 * @file DevToolsDropdown.tsx
 * @description Orquestador de datos para el DevRouteMenu.
 *              v4.0.0 (Full i18n): Ahora consume el diccionario completo y es
 *              100% data-driven, cumpliendo con el Pilar I de Calidad.
 * @version 4.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import { usePathname } from "next/navigation";
import { logger } from "@/shared/lib/logging";
import { getCurrentLocaleFromPathname } from "@/shared/lib/i18n.utils";
import { type Dictionary } from "@/shared/lib/schemas/i18n.schema";
import { generateDevRoutes } from "./utils/route-menu.generator";
import { DevRouteMenu } from "./DevRouteMenu";

interface DevToolsDropdownProps {
  dictionary: NonNullable<Dictionary["devRouteMenu"]>;
}

export default function DevToolsDropdown({
  dictionary,
}: DevToolsDropdownProps): React.ReactElement | null {
  logger.info(
    "[Observabilidad][DevToolsDropdown] Renderizando orquestador smart v4.0."
  );
  const pathname = usePathname();
  const currentLocale = getCurrentLocaleFromPathname(pathname);

  // Guardia de resiliencia por si el diccionario no se carga correctamente.
  if (!dictionary) {
    logger.warn(
      "[DevToolsDropdown] Diccionario no proporcionado. No se renderizará el menú."
    );
    return null;
  }

  logger.trace(
    `[DevToolsDropdown] Orquestando menú para locale: ${currentLocale}`
  );

  const routeGroups = generateDevRoutes(dictionary, currentLocale);
  const buttonLabel = dictionary.devMenuLabel; // Consume la nueva clave i18n

  return <DevRouteMenu routeGroups={routeGroups} buttonLabel={buttonLabel} />;
}
// components/dev/DevToolsDropdown.tsx

