// components/ui/Button.tsx
/**
 * @file Button.tsx
 * @description Componente de UI atómico, polimórfico y kinestésico.
 *              v6.0.0 (Definitive Type Safety & Composition for Framer Motion):
 *              Resuelve los conflictos de tipado complejos con `framer-motion`,
 *              `next/link` y `radix-ui/react-slot` para una composición robusta y sin errores.
 * @version 6.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type MotionProps } from "framer-motion";
import { twMerge } from "tailwind-merge";

// --- SSoT para Estilos de Botón (sin cambios) ---
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

// Definimos un tipo base que incluye las props de las variantes y las MotionProps
// que queremos que el componente pueda aceptar.
type CommonProps = VariantProps<typeof buttonVariants> &
  MotionProps & {
    className?: string;
  };

// Las props para el caso de <button>
type ButtonAsButton = React.ButtonHTMLAttributes<HTMLButtonElement> &
  CommonProps & {
    asChild?: boolean;
    href?: never; // Si es un botón, no debe tener href
  };

// Las props para el caso de <Link> de Next.js
type ButtonAsLink = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  CommonProps & {
    asChild?: boolean;
    href: string; // Si es un enlace, href es obligatorio
  };

// El tipo final es una unión de los dos casos.
export type ButtonProps = ButtonAsButton | ButtonAsLink;

// --- Configuración de Animación (SSoT Kinestésica) ---
const tapAnimation: MotionProps = {
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 400, damping: 17 },
};

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const finalClassName = twMerge(buttonVariants({ variant, size, className }));

  // Extraer las MotionProps del objeto 'props' para aplicarlas solo al componente motion.
  // Las demás props se pasarán al componente subyacente (button, a, o Slot).
  const { whileTap, transition, ...restProps } = { ...tapAnimation, ...props };

  // Es un enlace (tiene la prop 'href')
  if ("href" in props && props.href !== undefined) {
    // Si `asChild` es true, el `Link` de Next.js será el `children` del `Slot`,
    // y asumimos que este `children` ya es un componente `motion` o manejará
    // sus propias animaciones.
    if (asChild) {
      return (
        <Slot
          className={finalClassName}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...restProps}
        />
      );
    }

    // Si no es `asChild`, creamos un `motion(Link)` y le pasamos las MotionProps directamente.
    const MotionLinkComponent = motion(Link);
    return (
      <MotionLinkComponent
        href={props.href}
        className={finalClassName}
        ref={ref as React.Ref<HTMLAnchorElement>}
        whileTap={whileTap}
        transition={transition}
        {...(restProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }

  // Es un botón
  // Si `asChild` es true, el `button` nativo será el `children` del `Slot`.
  if (asChild) {
    return (
      <Slot
        className={finalClassName}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...restProps}
      />
    );
  }

  // Si no es `asChild`, creamos un `motion.button` y le pasamos las MotionProps directamente.
  const MotionButtonComponent = motion.button;
  return (
    <MotionButtonComponent
      className={finalClassName}
      ref={ref as React.Ref<HTMLButtonElement>}
      whileTap={whileTap}
      transition={transition}
      {...(restProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
