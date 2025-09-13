// components/ui/DropdownMenu/Separator.tsx
/**
 * @file Separator.tsx
 * @description Componente visual para una línea divisoria dentro del menú.
 * @version 5.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";
import * as React from "react";
import { twMerge } from "tailwind-merge";
interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}
export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, ...props }, ref) => {
    console.log("[Observabilidad] Renderizando DropdownMenu.Separator");
    return (
      <div
        ref={ref}
        className={twMerge("my-1 h-px bg-white/10", className)}
        role="separator"
        {...props}
      />
    );
  }
);
Separator.displayName = "DropdownMenuSeparator";
// components/ui/DropdownMenu/Separator.tsx
