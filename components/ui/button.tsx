// components/ui/Button.tsx
/**
 * @file Button.tsx
 * @description Componente de UI atómico, polimórfico y reutilizable para botones.
 *              v2.0.0 (Holistic Refactor): Amplía radicalmente el CVA para incluir
 *              todas las variantes y tamaños requeridos por el sistema, resolviendo
 *              una cascada de errores de tipo TS2322 en toda la aplicación.
 *              Mejora la lógica polimórfica para un manejo más seguro de `href`.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

// --- SSoT para Estilos de Botón ---
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-muted hover:text-muted-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// --- Contrato de Props Polimórfico y Robusto ---
type BaseProps = VariantProps<typeof buttonVariants> & {
  asChild?: boolean;
  className?: string;
};

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  console.log("[Observabilidad] Renderizando Button");
  const finalClassName = twMerge(buttonVariants({ variant, size, className }));

  // Lógica polimórfica: si se pasa `href`, se renderiza como un componente Link de Next.js.
  if ("href" in props && props.href !== undefined) {
    const { href, ...restProps } = props;
    const Comp = asChild ? Slot : Link;
    return (
      <Comp
        href={href}
        className={finalClassName}
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...restProps}
      />
    );
  }

  // Por defecto, se renderiza como un <button>.
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={finalClassName}
      ref={ref as React.Ref<HTMLButtonElement>}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
// components/ui/Button.tsx
