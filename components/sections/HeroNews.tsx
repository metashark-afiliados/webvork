// src/components/sections/HeroNews.tsx
"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

/**
 * @file HeroNews.tsx
 * @description Sección Hero. Actualizado para aceptar una única prop `content`.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */

// <<-- CORRECCIÓN: La prop ahora es un objeto `content`
interface HeroNewsProps {
  content: NonNullable<Dictionary["heroNews"]>;
}

export function HeroNews({ content }: HeroNewsProps): React.ReactElement {
  console.log("[Observabilidad] Renderizando HeroNews");
  const { mainTitle, featuredArticle } = content;

  const FADE_UP_ANIMATION_VARIANTS: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 20 },
    },
  };

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 bg-background text-center">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          animate="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.2 } } }}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground"
            variants={FADE_UP_ANIMATION_VARIANTS}
          >
            {mainTitle}
          </motion.h1>

          <motion.div
            className="mt-16 mx-auto max-w-2xl"
            variants={FADE_UP_ANIMATION_VARIANTS}
          >
            <div className="group relative cursor-pointer overflow-hidden rounded-xl border border-muted bg-muted/30 p-6 text-left shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-primary/50 hover:-translate-y-1.5">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-accent">
                  {featuredArticle.tag}
                </span>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent" />
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-primary mb-2">
                {featuredArticle.title}
              </h2>
              <p className="text-sm text-muted-foreground">{`Por ${featuredArticle.author} · ${featuredArticle.readTime} min de lectura`}</p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
// src/components/sections/HeroNews.tsx
