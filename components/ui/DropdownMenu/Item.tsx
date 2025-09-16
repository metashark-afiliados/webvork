// components/ui/DropdownMenu/Item.tsx
/**
 * @file Item.tsx
 * @description Componente para un item individual e interactivo dentro del DropdownMenu.
 *              Su responsabilidad es renderizar el contenido del item y gestionar la
 *              acción de cerrar el menú cuando se hace clic en él.
 * @version 5.0.0
 * @author RaZ Podestá - MetaShark Tech
 * @see .docs-espejo/components/ui/DropdownMenu/DropdownMenu.md
 */
"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";
import { useDropdownMenuContext } from "./Context";

/**
 * @interface ItemProps
 * @description Define el contrato de props para el componente DropdownMenuItem.
 *              Extiende los atributos HTML estándar de un div.
 */
interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * @component Item
 * @description Renderiza un elemento clickeable dentro del menú. Al ser presionado,
 *              ejecuta su `onClick` (si se proporciona) y luego cierra el menú.
 *              Utiliza `React.forwardRef` para permitir que las refs se pasen
 *              al elemento `div` subyacente.
 * @param {ItemProps} props - Las propiedades del componente.
 * @param {React.Ref<HTMLDivElement>} ref - La ref que se reenvía al elemento div.
 * @returns {React.ReactElement}
 */
export const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ children, className, onClick, ...props }, ref) => {
    console.log("[Observabilidad] Renderizando DropdownMenu.Item");
    const { setIsOpen } = useDropdownMenuContext();

    /**
     * @function handleClick
     * @description Manejador de clics que invoca el callback del usuario y luego
     *              cierra el menú, desacoplando la lógica de cierre de la acción
     *              específica del item.
     * @param {React.MouseEvent<HTMLDivElement>} event - El evento de clic.
     */
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      // Permite que el consumidor del componente ejecute su propia lógica primero.
      if (onClick) {
        onClick(event);
      }
      // Asegura que el menú se cierre después de la acción.
      setIsOpen(false);
    };

    return (
      <div
        ref={ref}
        className={twMerge(
          "flex items-center px-4 py-2 text-sm text-foreground/80 hover:bg-muted/50 hover:text-foreground cursor-pointer transition-colors rounded-md",
          className
        )}
        role="menuitem"
        tabIndex={-1} // Permite que sea enfocable programáticamente pero no por tabulación.
        onClick={handleClick}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Item.displayName = "DropdownMenuItem";
// components/ui/DropdownMenu/Item.tsx
