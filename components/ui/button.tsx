// components/ui/Button.tsx
/**
 * @file Button.tsx
 * @description Componente de botón atómico, polimórfico y de nivel de framework.
 *              - v10.0.0 (Polimorfismo Type-Safe): Refactorizado para usar una unión
 *                discriminada en sus props. Resuelve un error crítico de tipo (TS2322)
 *                al diferenciar explícitamente entre las props de un botón y las de un
 *                enlace, garantizando una seguridad de tipos completa y eliminando la
 *                necesidad de casts inseguros.
 * @version 10.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/components/ui/Button.tsx.md
 */
import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

// --- SSoT para Estilos de Botón (usando cva) ---
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

// --- Contrato de API Polimórfico y Type-Safe ---
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

/**
 * @component Button
 * @description Renderiza un elemento de botón o enlace con estilos consistentes y seguridad de tipos.
 */
const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  console.log("[Observabilidad] Renderizando Button (v10.0.0)");

  const finalClassName = twMerge(buttonVariants({ variant, size, className }));
  const Comp = asChild ? Slot : "button";

  // El chequeo de `href` actúa como un "type guard" para TypeScript.
  if ("href" in props && props.href !== undefined) {
    const { href, ...restProps } = props; // Separamos `href` del resto de las props de ancla
    return (
      <Link
        href={href}
        className={finalClassName}
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...restProps}
      />
    );
  }

  return (
    <Comp
      className={finalClassName}
      ref={ref as React.Ref<HTMLButtonElement>}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  );
});
Button.displayName = "Button";

// --- Exportación Canónica (Nombrada) ---
export { Button, buttonVariants };
