// components/ui/DropdownMenu/Menu.tsx
/**
 * @file Menu.tsx
 * @description Componente principal y proveedor de estado para el sistema DropdownMenu.
 *              Encapsula la lógica de estado y proporciona el contexto a sus hijos.
 * @version 5.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import * as React from "react";
import { DropdownMenuContext } from "./Context";

/**
 * @component Menu
 * @description El componente raíz que debe envolver todo el sistema de Dropdown.
 *              Gestiona el estado `isOpen` y lo provee a través del contexto.
 * @param {{ children: React.ReactNode }} props
 * @returns {React.ReactElement}
 */
export const Menu = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  console.log("[Observabilidad] Renderizando DropdownMenu.Provider");
  const [isOpen, setIsOpen] = React.useState(false);

  // useMemo optimiza para que el objeto de contexto no se recree en cada render
  // a menos que el estado `isOpen` cambie.
  const contextValue = React.useMemo(() => ({ isOpen, setIsOpen }), [isOpen]);

  return (
    <DropdownMenuContext.Provider value={contextValue}>
      <div className="relative inline-block text-left">{children}</div>
    </DropdownMenuContext.Provider>
  );
};
// components/ui/DropdownMenu/Menu.tsx
