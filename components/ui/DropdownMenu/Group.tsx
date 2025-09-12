// src/components/ui/DropdownMenu/Group.tsx
/**
 * @file Group.tsx
 * @description Componente de agrupación semántica.
 * @version 4.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";
import * as React from "react";
import { twMerge } from "tailwind-merge";
interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
export const Group = React.forwardRef<HTMLDivElement, GroupProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={twMerge(className)} role="group" {...props}>
      {children}
    </div>
  )
);
Group.displayName = "DropdownMenuGroup";
// src/components/ui/DropdownMenu/Group.tsx
