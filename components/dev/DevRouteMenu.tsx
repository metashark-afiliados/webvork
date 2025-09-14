// components/dev/DevRouteMenu.tsx
/**
 * @file DevRouteMenu.tsx
 * @description Componente de presentación puro para el menú de desarrollo.
 *              - v20.3.0: Mejora la consistencia del sistema de iconos al reemplazar
 *                la importación directa de `Wrench` por el componente `DynamicIcon`
 *                en el `DropdownMenuTrigger`.
 * @version 20.3.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

// import { Wrench } from "lucide-react"; // <-- ELIMINADO
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import DynamicIcon from "@/components/ui/DynamicIcon"; // <-- Importación existente
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { type RouteGroup } from "./utils/route-menu.generator";

interface DevRouteMenuProps {
  routeGroups: RouteGroup[];
}

export const DevRouteMenu = ({
  routeGroups,
}: DevRouteMenuProps): React.ReactElement => {
  console.log("[Observabilidad] Renderizando DevRouteMenu (Presentacional)");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="accent" size="sm">
          <DynamicIcon name="Wrench" className="mr-2 h-4 w-4" />{" "}
          {/* <-- USO DE DYNAMICICON */}
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
