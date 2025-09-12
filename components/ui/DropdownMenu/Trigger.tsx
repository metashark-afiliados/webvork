// src/components/ui/DropdownMenu/Trigger.tsx
/**
 * @file Trigger.tsx
 * @description Componente activador para el DropdownMenu.
 *              - v14.0.0: Re-arquitectura Final. Se adopta el patrón `Slot` de
 *                @radix-ui/react-slot de forma canónica y segura, resolviendo
 *                definitivamente todos los errores de tipo.
 * @version 14.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/components/ui/DropdownMenu/DropdownMenu.md
 */
"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { useDropdownMenuContext } from "./Context";


interface TriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const Trigger = React.forwardRef<HTMLButtonElement, TriggerProps>(
  ({ children, asChild = false, ...props }, ref) => {
    console.log("[Observabilidad] Renderizando DropdownMenu.Trigger (v14.0.0)");
    const { isOpen, setIsOpen } = useDropdownMenuContext();

    // Si `asChild` es true, Slot se encargará de fusionar las props con el hijo.
    // Si es false, se renderizará un <button> por defecto.
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
// src/components/ui/DropdownMenu/Trigger.tsx
