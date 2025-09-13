// components/ui/DropdownMenu/Trigger.tsx
/**
 * @file Trigger.tsx
 * @description Componente activador para el DropdownMenu.
 *              Adopta el patrón `Slot` de @radix-ui/react-slot de forma canónica
 *              y segura para máxima flexibilidad y accesibilidad.
 * @version 15.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { useDropdownMenuContext } from "./Context";

interface TriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

/**
 * @component Trigger
 * @description Botón o elemento que abre/cierra el menú. Si `asChild` es true,
 *              fusiona sus props con el componente hijo, permitiendo cualquier
 *              componente (como nuestro `Button`) ser el activador.
 */
export const Trigger = React.forwardRef<HTMLButtonElement, TriggerProps>(
  ({ children, asChild = false, ...props }, ref) => {
    console.log("[Observabilidad] Renderizando DropdownMenu.Trigger");
    const { isOpen, setIsOpen } = useDropdownMenuContext();

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        data-state={isOpen ? "open" : "closed"}
        onClick={() => setIsOpen((prev) => !prev)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Trigger.displayName = "DropdownMenuTrigger";
// components/ui/DropdownMenu/Trigger.tsx
