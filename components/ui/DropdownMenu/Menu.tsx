// RUTA: components/ui/DropdownMenu/Menu.tsx
/**
 * @file Menu.tsx
 * @description Componente principal y proveedor de estado para el sistema DropdownMenu.
 * @version 5.1.0 (Client Component Directive)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client"; // <-- DIRECTIVA AÑADIDA

import * as React from "react";
import { DropdownMenuContext } from "./Context";

export const Menu = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  console.log("[Observabilidad] Renderizando DropdownMenu.Provider");
  const [isOpen, setIsOpen] = React.useState(false);
  const contextValue = React.useMemo(() => ({ isOpen, setIsOpen }), [isOpen]);
  return (
    <DropdownMenuContext.Provider value={contextValue}>
      <div className="relative inline-block text-left">{children}</div>
    </DropdownMenuContext.Provider>
  );
};
