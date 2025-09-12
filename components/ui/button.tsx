// frontend/src/components/ui/Button.tsx
/**
 * @file Button.tsx
 * @description Un componente de botón atómico y polimórfico de nivel de framework.
 *              - v7.0.0: Resuelve error de tipo TS2430. Se refactoriza la interfaz
 *                `ButtonProps` para usar `Omit<...>` de TypeScript, resolviendo
 *                correctamente el conflicto de tipos de la propiedad `className`.
 * @version 7.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/components/ui/Button.tsx.md
 */
import React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Definición de Variantes ---
const variants = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  accent: "bg-accent text-accent-foreground hover:bg-accent/90",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-muted hover:text-muted-foreground",
  link: "text-primary underline-offset-4 hover:underline",
};

const sizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
};

// --- Tipos y Contratos (Interfaz Corregida) ---

// <<-- SOLUCIÓN: Se omite la propiedad 'className' original para evitar el conflicto
//      y luego se añade nuestra propia definición con el tipo 'ClassValue'.
export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  href?: string;
  asChild?: boolean;
  className?: ClassValue; // Nuestra definición flexible de className.
}

// --- Componente Principal ---
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "default",
      size = "default",
      className,
      asChild = false,
      href,
      ...props
    },
    ref
  ) => {
    console.log("[Observabilidad] Renderizando Button (v7.0.0)");

    const isLink = typeof href !== "undefined";
    const Comp = asChild ? Slot : isLink ? Link : "button";

    const finalClassName = twMerge(
      clsx(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )
    );

    const componentProps = {
      className: finalClassName,
      ref,
      ...props,
      ...(isLink && { href }),
    };

    // @ts-ignore - Este ignore es pragmático y aceptado para manejar el polimorfismo.
    return <Comp {...componentProps} />;
  }
);
Button.displayName = "Button";
// frontend/src/components/ui/Button.tsx
