// RUTA: components/ui/Button.tsx

/**
 * @file Button.tsx
 * @description Componente de UI atómico y polimórfico de élite.
 *              v10.0.0 (Holistic Elite Leveling & MEA): Refactorizado para
 *              cumplir con todos los pilares de calidad. Implementa una
 *              micro-interacción MEA/UX con `framer-motion` (`whileTap`) que
 *              proporciona retroalimentación táctil en cada clic, mejorando
 *              la experiencia de usuario en toda la aplicación.
 * @version 10.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { logger } from "@/lib/logging";

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
        ghost: "hover:bg-accent hover:text-accent-foreground",
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

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
}

const ButtonComponent = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, href, ...props }, ref) => {
    logger.trace("[Button] Renderizando v10.0 (Elite & MEA).");

    const Comp = asChild || href ? Slot : "button";

    const buttonContent = (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );

    if (href) {
      return (
        <Link href={href} passHref legacyBehavior>
          {buttonContent}
        </Link>
      );
    }

    return buttonContent;
  }
);
ButtonComponent.displayName = "ButtonComponent";

// HOC (High-Order Component) que envuelve el botón con la lógica de animación
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => (
    <motion.div whileTap={{ scale: 0.97, opacity: 0.9 }}>
      <ButtonComponent {...props} ref={ref} />
    </motion.div>
  )
);
Button.displayName = "Button";

export { buttonVariants };
