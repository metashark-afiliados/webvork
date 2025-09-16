// components/dev/DevRouteMenu.tsx
/**
 * @file DevRouteMenu.tsx
 * @description Componente de presentación 100% puro para el menú de desarrollo.
 *              v2.1.0 (Holistic Refactor - Contract Alignment): Re-entrega para
 *              confirmar el contrato de props con el orquestador.
 * @version 2.1.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { DynamicIcon } from "@/components/ui";
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
import { logger } from "@/lib/logging";

interface DevRouteMenuProps {
  routeGroups: RouteGroup[];
  buttonLabel: string; // Contrato confirmado: espera un string.
}

export function DevRouteMenu({
  routeGroups,
  buttonLabel,
}: DevRouteMenuProps): React.ReactElement {
  logger.info(
    "[Observabilidad][DevRouteMenu] Renderizando componente de presentación puro."
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm">
          <DynamicIcon name="Wrench" className="mr-2 h-4 w-4" />
          {buttonLabel}
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
}
// components/dev/DevRouteMenu.tsx
