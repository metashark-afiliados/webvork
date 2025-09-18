// components/sections/Hero.tsx
/**
 * @file Hero.tsx
 * @description Componente de presentación para la sección Hero. Ahora es un
 *              componente de cliente que utiliza framer-motion para animaciones
 *              en cascada y soporta resaltado visual para el "Modo Enfoque".
 * @version 6.0.0 (Focus Mode Aware & Elite Leveling)
 * @author RaZ Podestá - MetaShark Tech
 * @see .docs/suite-de-diseno-campanas/README.md "Experiencia Adrenalínica"
 */
"use client";

import React, { forwardRef } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

/**
 * @interface HeroProps
 * @description Contrato de props para el componente Hero.
 */
interface HeroProps {
  /**
   * @prop content - El objeto de contenido para la sección, validado por Zod.
   */
  content: Dictionary["hero"];
  /**
   * @prop isFocused - Booleano que indica si el editor de la SDC está enfocando esta sección.
   */
  isFocused?: boolean;
}

// Constantes de animación para limpieza de código y rendimiento.
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

/**
 * @component Hero
 * @description Componente Hero principal, diseñado para ser la primera impresión
 *              impactante de una página de campaña. Utiliza `forwardRef` para
 *              permitir que el SectionRenderer le asigne una ref.
 */
export const Hero = forwardRef<HTMLElement, HeroProps>(
  ({ content, isFocused }, ref) => {
    logger.info("[Hero] Renderizando componente (v6.0 - Focus Mode Aware)");

    if (!content) {
      logger.warn("[Hero] No se proporcionó contenido. No se renderizará.");
      return null;
    }

    const { title, subtitle } = content;
    const titleWords = title.split(" ");

    return (
      <section
        ref={ref}
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
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {titleWords.map((word, index) => (
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
      </section>
    );
  }
);
Hero.displayName = "Hero";
// components/sections/Hero.tsx
