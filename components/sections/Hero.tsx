// RUTA: components/sections/Hero.tsx

/**
 * @file Hero.tsx
 * @description Componente de presentación para la sección Hero.
 *              v9.0.0 (Orchestrated Animation & Elite Compliance): Refactorizado
 *              para participar en la animación en cascada orquestada por el
 *              componente Container (MEA/UX). El componente en sí mismo es ahora
 *              un `motion.section` que responde a las variantes del padre.
 * @version 9.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { forwardRef } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

interface HeroProps {
  content: Dictionary["hero"];
  isFocused?: boolean;
}

// Variante para la animación del contenedor de la sección, orquestada por el `Container` padre.
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Variantes para la animación interna de las palabras del título.
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.8,
    },
  },
};

export const Hero = forwardRef<HTMLElement, HeroProps>(
  ({ content, isFocused }, ref) => {
    logger.info(
      "[Hero] Renderizando componente v9.0 (Orchestrated Animation)."
    );

    if (!content) {
      logger.warn("[Hero] No se proporcionó contenido. No se renderizará.");
      return null;
    }

    const { title, subtitle } = content;
    const titleWords = title.split(" ");

    return (
      <motion.section
        ref={ref}
        variants={sectionVariants} // <-- Responde al stagger del Container padre
        id="hero"
        className={cn(
          "bg-background pt-8 pb-16 text-center overflow-hidden transition-all duration-300 rounded-lg",
          isFocused &&
            "ring-2 ring-primary ring-offset-4 ring-offset-background"
        )}
      >
        <Container className="max-w-4xl">
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight font-serif text-primary drop-shadow-md"
            aria-label={title}
            variants={containerVariants} // <-- Orquesta la animación de sus hijos
            initial="hidden"
            animate="visible"
          >
            {titleWords.map((word: string, index: number) => (
              <motion.span
                key={`${word}-${index}`}
                className="inline-block"
                variants={wordVariants}
                style={{ marginRight: "0.25em" }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            className="mt-6 text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto"
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
          >
            {subtitle}
          </motion.p>
        </Container>
      </motion.section>
    );
  }
);

Hero.displayName = "Hero";
