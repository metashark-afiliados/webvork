// src/components/ui/DropdownMenu/Item.tsx
/**
 * @file Item.tsx
 * @description Componente para un item individual interactivo. Cierra el menú al hacer clic.
 * @version 4.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";
import { useDropdownMenuContext } from "./Context";

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ children, className, onClick, ...props }, ref) => {
    const { setIsOpen } = useDropdownMenuContext();
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(event);
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
        tabIndex={-1}
        onClick={handleClick}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Item.displayName = "DropdownMenuItem";
// src/components/ui/DropdownMenu/Item.tsx
