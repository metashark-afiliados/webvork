// src/components/dev/DevToolsDropdown.tsx
/**
 * @file DevToolsDropdown.tsx
 * @description Orquestador de datos para el DevRouteMenu. Su única responsabilidad
 *              es obtener el locale, generar la estructura de datos del menú y
 *              pasarla al componente de presentación.
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/components/dev/DevToolsDropdown.tsx.md
 */
"use client";

import { usePathname } from "next/navigation";
import { clientLogger } from "@/lib/logging";
import { getCurrentLocaleFromPathname } from "@/lib/i18n.utils";
import { type Dictionary } from "@/lib/schemas/i18n.schema";
import { generateDevRoutes } from "./utils/route-menu.generator";
import { DevRouteMenu } from "./DevRouteMenu";

interface DevToolsDropdownProps {
  dictionary: NonNullable<Dictionary["devRouteMenu"]>;
}

/**
 * @component DevToolsDropdown
 * @description Componente "Smart" que orquesta la lógica para el menú de desarrollo.
 * @param {DevToolsDropdownProps} props Las propiedades con el diccionario necesario.
 * @returns {React.ReactElement} El componente de presentación `DevRouteMenu` con las props calculadas.
 */
const DevToolsDropdown = ({
  dictionary,
}: DevToolsDropdownProps): React.ReactElement => {
  console.log("[Observabilidad] Renderizando orquestador DevToolsDropdown");
  const pathname = usePathname();
  const currentLocale = getCurrentLocaleFromPathname(pathname);

  clientLogger.trace(
    `[DevToolsDropdown] Orquestando menú para locale: ${currentLocale}`
  );

  // 1. Obtiene el diccionario y el locale.
  // 2. Invoca al generador de lógica pura para crear la estructura de datos.
  const routeGroups = generateDevRoutes(dictionary, currentLocale);

  // 3. Pasa la estructura de datos al componente de presentación puro.
  return <DevRouteMenu routeGroups={routeGroups} />;
};

export default DevToolsDropdown;
// src/components/dev/DevToolsDropdown.tsx
