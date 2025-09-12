// src/components/ui/DropdownMenu/Label.tsx
/**
 * @file Label.tsx
 * @description Componente para una etiqueta de título no interactiva.
 * @version 4.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";
import * as React from "react";
import { twMerge } from "tailwind-merge";
interface LabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
export const Label = React.forwardRef<HTMLDivElement, LabelProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge(
        "px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
Label.displayName = "DropdownMenuLabel";
// src/components/ui/DropdownMenu/Label.tsx
