// components/dev/DevRouteMenu.tsx
/**
 * @file DevRouteMenu.tsx
 * @description Componente de presentación puro para el menú desplegable de herramientas de desarrollo.
 *              - v20.1.0: Estandariza todas las importaciones de componentes de UI
 *                para usar el alias de ruta canónico `@/ui`, resolviendo errores de build.
 * @version 20.1.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import { Wrench } from "lucide-react";
import Link from "next/link";
import { Button } from "@/ui/Button";
import DynamicIcon from "@/ui/DynamicIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/DropdownMenu";
import { type RouteGroup } from "./utils/route-menu.generator";

interface DevRouteMenuProps {
  routeGroups: RouteGroup[];
}

/**
 * @component DevRouteMenu
 * @description Renderiza la UI del menú desplegable de desarrollo. Es un componente "dumb"
 *              que no contiene lógica de negocio, recibiendo todos sus datos
 *              y estructura a través de props.
 * @param {DevRouteMenuProps} props Las propiedades con la estructura de rutas a renderizar.
 * @returns {React.ReactElement} El elemento JSX del menú desplegable.
 */
export const DevRouteMenu = ({
  routeGroups,
}: DevRouteMenuProps): React.ReactElement => {
  console.log("[Observabilidad] Renderizando DevRouteMenu (Presentacional)");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="accent" size="sm">
          <Wrench className="mr-2 h-4 w-4" />
          Dev Menu
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end">
        {routeGroups.map((group, groupIndex) => (
          <DropdownMenuGroup key={group.groupName}>
            <DropdownMenuLabel>{group.groupName}</DropdownMenuLabel>
            {group.items.map((item) => (
              <Link href={item.path} key={item.path} passHref legacyBehavior>
                <DropdownMenuItem>
                  <DynamicIcon name={item.iconName} className="mr-3 h-4 w-4" />
                  <span>{item.name}</span>
                </DropdownMenuItem>
              </Link>
            ))}
            {groupIndex < routeGroups.length - 1 && <DropdownMenuSeparator />}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
