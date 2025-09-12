// src/components/sections/TestimonialGrid.tsx
/**
 * @file TestimonialGrid.tsx
 * @description Muestra una cuadrícula de testimonios de clientes, un elemento
 *              clave para la prueba social.
 * @version 2.0.0
 * @author IA Ingeniera de Software Senior v2.0
 */
import React from "react";
import { Container } from "@/components/ui/Container";
import { TestimonialCard } from "@/components/feedback/TestimonialCard";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

interface TestimonialGridProps {
  content: Dictionary["testimonialGrid"];
}

/**
 * @component TestimonialGrid
 * @description Renderiza la sección de testimonios completa.
 * @param {TestimonialGridProps} props Las propiedades con el contenido.
 * @returns {React.ReactElement | null} El elemento JSX de la sección.
 */
export function TestimonialGrid({
  content,
}: TestimonialGridProps): React.ReactElement | null {
  console.log("[Observabilidad] Renderizando TestimonialGrid");

  if (!content) return null;
  const { title, testimonials } = content;

  return (
    <section className="py-16 sm:py-24 bg-background">
      <Container>
        <h2 className="text-3xl font-bold text-center text-foreground mb-12 sm:text-4xl">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
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
// src/components/sections/TestimonialGrid.tsx
