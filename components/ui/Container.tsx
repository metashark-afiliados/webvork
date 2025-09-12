// src/components/ui/Container.tsx
import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @file Container.tsx
 * @description Componente de UI atómico y fundamental para la maquetación.
 * @version 2.0.0
 * @dependencies react, clsx, tailwind-merge
 *
 * @prop {React.ReactNode} children - Los elementos hijos que serán envueltos por el contenedor.
 * @prop {string} [className] - Clases de CSS adicionales para extender o sobreescribir los estilos base.
 */

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * @component Container
 * @description Renderiza un contenedor centrado con un ancho máximo y padding horizontal.
 *              Actúa como el principal limitador de ancho para el contenido de las secciones,
 *              asegurando consistencia visual y legibilidad en todo el sitio.
 * @param {ContainerProps} props Las propiedades del componente.
 * @returns {React.ReactElement} El elemento JSX que representa el contenedor.
 */
export function Container({
  children,
  className,
}: ContainerProps): React.ReactElement {
  console.log("[Observabilidad] Renderizando Container");

  // Se utiliza `twMerge` junto con `clsx` para fusionar inteligentemente
  // las clases de Tailwind CSS, permitiendo sobreescribir estilos de forma
  // predecible y sin conflictos.
  const finalClassName = twMerge(
    clsx("w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)
  );

  return <div className={finalClassName}>{children}</div>;
}
// src/components/ui/Container.tsx
