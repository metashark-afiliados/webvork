// RUTA: components/sections/TestimonialGrid.tsx

/**
 * @file TestimonialGrid.tsx
 * @description Sección de prueba social. Muestra una cuadrícula de testimonios de clientes.
 *              v4.0.0 (Holistic Elite Leveling & MEA): Refactorizado para actuar
 *              como un orquestador de animaciones MEA/UX. Implementa `framer-motion`
 *              para animar la entrada de cada TestimonialCard en una cascada
 *              suave y elegante, cumpliendo con todos los pilares de calidad.
 * @version 4.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import {
  TestimonialCard,
  testimonialCardVariants, // Importa las variantes del hijo
} from "@/components/ui/TestimonialCard";
import type { Dictionary } from "@/shared/lib/schemas/i18n.schema";
import { logger } from "@/shared/lib/logging";
import type { Testimonial } from "@/shared/lib/schemas/components/testimonial-grid.schema";

interface TestimonialGridProps {
  content: Dictionary["testimonialGrid"];
}

// Variantes para el contenedor de la cuadrícula, que orquesta a los hijos.
const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Retraso entre la animación de cada tarjeta
    },
  },
};

export function TestimonialGrid({
  content,
}: TestimonialGridProps): React.ReactElement | null {
  logger.info("[TestimonialGrid] Renderizando v4.0 (Elite & MEA).");

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
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {testimonials.map((testimonial: Testimonial) => (
            // TestimonialCard es ahora un motion component que recibe sus propias variantes
            <TestimonialCard
              key={testimonial.author}
              quote={testimonial.quote}
              author={testimonial.author}
              location={testimonial.location}
              imageSrc={testimonial.imageSrc}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
