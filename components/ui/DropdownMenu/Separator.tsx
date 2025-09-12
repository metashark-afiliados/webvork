// src/components/ui/DropdownMenu/Separator.tsx
/**
 * @file Separator.tsx
 * @description Componente para una línea divisoria.
 * @version 4.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";
import * as React from "react";
import { twMerge } from "tailwind-merge";
interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}
export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge("my-1 h-px bg-white/10", className)}
      role="separator"
      {...props}
    />
  )
);
Separator.displayName = "DropdownMenuSeparator";
// src/components/ui/DropdownMenu/Separator.tsx
