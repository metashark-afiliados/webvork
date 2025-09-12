// src/components/ui/FormInput.tsx
/**
 * @file FormInput.tsx
 * @description Componente de UI atómico y reutilizable para campos de texto de formulario.
 * @description_es Encapsula un input, un icono, una etiqueta flotante y la
 *               visualización de mensajes de error, integrándose directamente
 *               con react-hook-form.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { LucideIcon } from "lucide-react";

// Define las propiedades que el componente aceptará.
export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
  label: string;
  error?: string;
  containerClassName?: string;
}

/**
 * @component FormInput
 * @description Renderiza un campo de entrada estilizado. Utilizamos `forwardRef`
 *              para pasar la `ref` de react-hook-form directamente al elemento `input`,
 *              lo cual es esencial para que la librería pueda registrar y controlar el campo.
 */
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      name,
      icon: Icon,
      label,
      error,
      className,
      containerClassName,
      ...props
    },
    ref
  ) => {
    console.log(`[Observabilidad] Renderizando FormInput (ID: ${id})`);

    return (
      <div className={twMerge("relative", containerClassName)}>
        <label
          htmlFor={id || name}
          className="absolute left-3 -top-2.5 bg-background px-1 text-xs text-muted-foreground"
        >
          {label}
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon
              className={clsx(
                "h-5 w-5",
                error ? "text-destructive" : "text-muted-foreground"
              )}
              aria-hidden="true"
            />
          </div>
          <input
            id={id || name}
            name={name}
            ref={ref}
            className={twMerge(
              clsx(
                "block w-full rounded-md border-0 bg-background/50 py-3 pl-10 pr-3 text-foreground ring-1 ring-inset transition-all duration-150 placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
                error
                  ? "ring-destructive focus:ring-destructive"
                  : "ring-white/20 focus:ring-primary"
              ),
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 pl-3 text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput"; // Recomendado por React para debugging.
// src/components/ui/FormInput.tsx
