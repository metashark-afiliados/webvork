// components/sections/FeaturedArticlesCarousel.tsx
/**
 * @file FeaturedArticlesCarousel.tsx
 * @description Un carrusel interactivo y automático que muestra artículos de blog destacados.
 *              - v1.1.0 (Resilience): La prop `content` ahora es opcional.
 * @version 1.1.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { logger } from "@/lib/logging";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

interface FeaturedArticlesCarouselProps {
  // --- [INICIO DE REFACTORIZACIÓN DE RESILIENCIA] ---
  content?: Dictionary["featuredArticlesCarousel"];
  // --- [FIN DE REFACTORIZACIÓN DE RESILIENCIA] ---
  interval?: number;
}

export function FeaturedArticlesCarousel({
  content,
  interval = 4000,
}: FeaturedArticlesCarouselProps): React.ReactElement | null {
  logger.info("[Observabilidad] Renderizando FeaturedArticlesCarousel");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    if (content?.articles) {
      setCurrentIndex((prev) => (prev + 1) % content.articles.length);
    }
  }, [content?.articles]);

  const prevSlide = () => {
    if (content?.articles) {
      setCurrentIndex(
        (prev) => (prev - 1 + content.articles.length) % content.articles.length
      );
    }
  };

  useEffect(() => {
    if (!isHovered && content?.articles && content.articles.length > 1) {
      const timer = setInterval(nextSlide, interval);
      return () => clearInterval(timer);
    }
  }, [currentIndex, isHovered, interval, nextSlide, content?.articles]);

  // --- [INICIO DE REFACTORIZACIÓN DE RESILIENCIA] ---
  if (!content || !content.articles || content.articles.length === 0) {
    logger.warn(
      "[FeaturedArticlesCarousel] No se proporcionó contenido válido. La sección no se renderizará."
    );
    return null;
  }
  // --- [FIN DE REFACTORIZACIÓN DE RESILIENCIA] ---

  const { eyebrow, title, articles } = content;

  return (
    <section
      id="featured-articles"
      className="py-24 sm:py-32 bg-background/50 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Container className="text-center">
        <h2 className="text-lg text-primary mb-2 tracking-wider">{eyebrow}</h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-12">{title}</h3>
      </Container>
      <div className="relative h-[400px] flex items-center justify-center">
        <AnimatePresence>
          {[-2, -1, 0, 1, 2].map((offset) => {
            const index =
              (currentIndex + offset + articles.length) % articles.length;
            const article = articles[index];
            if (!article) return null;

            const isCenter = offset === 0;
            const zIndex = 5 - Math.abs(offset);
            const scale = 1 - Math.abs(offset) * 0.2;
            const opacity = 1 - Math.abs(offset) * 0.4;

            return (
              <motion.div
                key={index}
                className="absolute w-[60%] md:w-[45%] lg:w-[35%] aspect-video"
                initial={{
                  x: `${offset * 50}%`,
                  scale: 0.8,
                  opacity: 0,
                  zIndex: 0,
                }}
                animate={{
                  x: `${offset * 50}%`,
                  scale: scale,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
              >
                <div
                  className={cn(
                    "relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 transition-all duration-300",
                    isCenter ? "border-primary" : "border-transparent"
                  )}
                >
                  <Image
                    src={article.imageUrl}
                    alt={article.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 60vw, 35vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 md:p-6 text-left">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">
                      {article.category}
                    </span>
                    <Link href={`/news/${article.slug}`} className="block mt-1">
                      <h4 className="text-lg md:text-xl font-bold text-white hover:underline">
                        {article.title}
                      </h4>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <Button
          onClick={prevSlide}
          variant="secondary"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 opacity-50 hover:opacity-100 transition-opacity"
          aria-label="Artículo anterior"
        >
          <ChevronLeft />
        </Button>
        <Button
          onClick={nextSlide}
          variant="secondary"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 opacity-50 hover:opacity-100 transition-opacity"
          aria-label="Siguiente artículo"
        >
          <ChevronRight />
        </Button>
      </div>
    </section>
  );
}
// components/sections/FeaturedArticlesCarousel.tsx
