// components/ui/DropdownMenu/Context.ts
/**
 * @file Context.ts
 * @description Define el Contexto de React y el hook personalizado para el sistema DropdownMenu.
 *              Esta es la SSoT para la gestión del estado compartido (abierto/cerrado) del menú.
 *              Cumple con la Directiva 003 de Calidad de Componentes.
 * @version 3.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import * as React from "react";
import { logger } from "@/lib/logging";

interface DropdownMenuContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DropdownMenuContext =
  React.createContext<DropdownMenuContextType | null>(null);

/**
 * @hook useDropdownMenuContext
 * @description Hook para acceder al estado del DropdownMenu. Lanza un error si se
 *              usa fuera de un proveedor, garantizando una composición correcta.
 * @returns {DropdownMenuContextType} El contexto del menú.
 */
export const useDropdownMenuContext = (): DropdownMenuContextType => {
  const context = React.useContext(DropdownMenuContext);
  if (!context) {
    const errorMsg =
      "Error de composición: Los componentes de DropdownMenu deben usarse dentro de un <DropdownMenu>";
    logger.error(errorMsg);
    throw new Error(errorMsg);
  }
  return context;
};
// components/ui/DropdownMenu/Context.ts
