// components/sections/TestimonialGrid.tsx
/**
 * @file TestimonialGrid.tsx
 * @description Sección de prueba social. Muestra una cuadrícula de testimonios de clientes.
 *              - v3.1.0: Corrige la ruta de importación de `TestimonialCard` para alinearla
 *                con la estructura de archivos del snapshot SSoT actual.
 * @version 3.1.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
// --- [INICIO DE REFACTORIZACIÓN DE ALIAS] ---
import { Container } from "@/components/ui/Container";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { logger } from "@/lib/logging";
import type { Testimonial } from "@/lib/schemas/components/testimonial-grid.schema";
// --- [FIN DE REFACTORIZACIÓN DE ALIAS] ---

/**
 * @interface TestimonialGridProps
 * @description Contrato de props unificado para el SectionRenderer.
 */
interface TestimonialGridProps {
  content: Dictionary["testimonialGrid"];
}

/**
 * @component TestimonialGrid
 * @description Renderiza la sección de testimonios completa.
 * @param {TestimonialGridProps} props Las propiedades con el contenido a renderizar.
 * @returns {React.ReactElement | null} El elemento JSX de la sección, o null si no hay contenido.
 */
export function TestimonialGrid({
  content,
}: TestimonialGridProps): React.ReactElement | null {
  logger.info("[Observabilidad] Renderizando TestimonialGrid");

  if (!content) {
    logger.warn(
      "[TestimonialGrid] No se proporcionó contenido. La sección no se renderizará."
    );
    return null;
  }
  const { title, testimonials } = content;

  return (
    <section className="py-16 sm:py-24 bg-background">
      <Container>
        <h2 className="text-3xl font-bold text-center text-foreground mb-12 sm:text-4xl">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial: Testimonial) => (
            <TestimonialCard
              key={testimonial.author}
              quote={testimonial.quote}
              author={testimonial.author}
              location={testimonial.location}
              imageSrc={testimonial.imageSrc}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
// components/sections/TestimonialGrid.tsx
