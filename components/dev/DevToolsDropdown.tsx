// components/dev/DevToolsDropdown.tsx
/**
 * @file DevToolsDropdown.tsx
 * @description Orquestador de datos para el DevRouteMenu.
 *              v3.1.0 (Holistic Refactor - Contract Alignment): Re-entrega para
 *              confirmar el consumo del contrato de diccionario completo.
 * @version 3.1.0
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
}: DevToolsDropdownProps): React.ReactElement {
  logger.info(
    "[Observabilidad][DevToolsDropdown] Renderizando orquestador smart."
  );
  const pathname = usePathname();
  const currentLocale = getCurrentLocaleFromPathname(pathname);

  logger.trace(
    `[DevToolsDropdown] Orquestando menú para locale: ${currentLocale}`
  );

  const routeGroups = generateDevRoutes(dictionary, currentLocale);
  // Con el schema corregido y el build ejecutado, `devMenuLabel` existirá y será un string.
  const buttonLabel = dictionary.devMenuLabel;

  return <DevRouteMenu routeGroups={routeGroups} buttonLabel={buttonLabel} />;
}
// components/dev/DevToolsDropdown.tsx
