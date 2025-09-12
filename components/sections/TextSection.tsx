// frontend/src/components/sections/TextSection.tsx
/**
 * @file TextSection.tsx
 * @description Componente de layout genérico y reutilizable para secciones de contenido textual.
 *              Ha sido refactorizado para ser data-driven, soportando variantes de espaciado
 *              y la aplicación automática de estilos de tipografía "prose".
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/components/sections/TextSection.tsx.md
 */
import React from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * @interface TextSectionProps
 * @description Define el contrato de propiedades para el componente TextSection.
 */
interface TextSectionProps {
  /**
   * @param {React.ReactNode} children - Los elementos hijos a renderizar dentro de la sección.
   */
  children: React.ReactNode;
  /**
   * @param {string} [className] - Clases de CSS adicionales para el elemento <section>.
   */
  className?: string;
  /**
   * @param {'default' | 'compact' | 'loose'} [spacing='default'] - Controla el espaciado vertical (padding) de la sección.
   */
  spacing?: "default" | "compact" | "loose";
  /**
   * @param {boolean} [prose=false] - Si es true, aplica estilos de tipografía optimizados para la lectura.
   */
  prose?: boolean;
}

/**
 * @component TextSection
 * @description Renderiza un contenedor semántico <section> con espaciado estandarizado
 *              y la opción de aplicar estilos de prosa para una legibilidad mejorada.
 * @param {TextSectionProps} props - Las propiedades para configurar la sección.
 * @returns {React.ReactElement} El elemento JSX de la sección de texto.
 */
export function TextSection({
  children,
  className,
  spacing = "default",
  prose = false,
}: TextSectionProps): React.ReactElement {
  console.log("[Observabilidad] Renderizando TextSection");

  const spacingClasses = {
    default: "py-16 sm:py-24",
    compact: "py-8 sm:py-12",
    loose: "py-24 sm:py-32",
  };

  const sectionClasses = cn(
    "w-full", // Asegura que la sección ocupe todo el ancho
    spacingClasses[spacing],
    className
  );

  const containerClasses = cn({
    "prose prose-invert lg:prose-xl mx-auto": prose,
  });

  return (
    <section className={sectionClasses}>
      <Container className={containerClasses}>{children}</Container>
    </section>
  );
}
// frontend/src/components/sections/TextSection.tsx
