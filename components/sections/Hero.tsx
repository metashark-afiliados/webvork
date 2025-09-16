// components/sections/Hero.tsx
/**
 * @file Hero.tsx
 * @description Componente de presentación para la sección Hero.
 *              - v5.0.0 (Client Component & Theming Upgrade): Refactorizado a cliente.
 *              - v5.1.0 (Resilience): Se añade guarda de seguridad explícita.
 * @version 5.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

interface HeroProps {
  content?: Dictionary["hero"];
}

const FALLBACK_CONTENT = {
  title: "Fallback Title",
  subtitle: "This is the default fallback subtitle for the Hero component.",
};

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

export function Hero({ content }: HeroProps): React.ReactElement {
  logger.info("[Hero] Renderizando componente de cliente...");

  // --- [INICIO DE REFACTORIZACIÓN DE RESILIENCIA] ---
  if (!content) {
    logger.warn(
      "[Hero] No se proporcionó contenido. Se usará contenido de fallback."
    );
  }
  const { title, subtitle } = content || FALLBACK_CONTENT;
  // --- [FIN DE REFACTORIZACIÓN DE RESILIENCIA] ---

  const titleWords = title.split(" ");

  return (
    <section className="bg-background pt-8 pb-16 text-center overflow-hidden">
      <Container className="max-w-4xl">
        <motion.h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight font-serif text-primary drop-shadow-md"
          aria-label={title}
          variants={containerVariants}
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
    </section>
  );
}
// components/sections/Hero.tsx
