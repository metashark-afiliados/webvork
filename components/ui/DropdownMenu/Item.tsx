// RUTA: components/ui/DropdownMenu/Item.tsx
/**
 * @file Item.tsx
 * @description Componente para un item individual e interactivo dentro del DropdownMenu.
 * @version 5.1.0 (Holistic Elite Leveling)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";
import { useDropdownMenuContext } from "./Context";
import { logger } from "@/shared/lib/logging";

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ children, className, onClick, ...props }, ref) => {
    logger.trace("[DropdownMenu.Item] Renderizando item.");
    const { setIsOpen } = useDropdownMenuContext();

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (onClick) {
        onClick(event);
      }
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
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && handleClick(e as any)
        }
        {...props}
      >
        {children}
      </div>
    );
  }
);
Item.displayName = "DropdownMenuItem";
