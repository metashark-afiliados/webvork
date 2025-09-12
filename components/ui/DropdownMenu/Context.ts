// src/components/ui/DropdownMenu/Context.ts
/**
 * @file Context.ts
 * @description Define el Contexto de React y el hook personalizado para el sistema DropdownMenu.
 *              Esta es la SSoT para la gestión del estado compartido (abierto/cerrado) del menú.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/components/ui/DropdownMenu/DropdownMenu.md
 */
"use client";

import * as React from "react";

interface DropdownMenuContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DropdownMenuContext =
  React.createContext<DropdownMenuContextType | null>(null);

export const useDropdownMenuContext = (): DropdownMenuContextType => {
  const context = React.useContext(DropdownMenuContext);
  if (!context) {
    throw new Error(
      "Error de composición: Los componentes de DropdownMenu deben usarse dentro de un <DropdownMenu>"
    );
  }
  return context;
};
// src/components/ui/DropdownMenu/Context.ts
