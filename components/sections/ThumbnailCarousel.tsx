// components/sections/ThumbnailCarousel.tsx
/**
 * @file ThumbnailCarousel.tsx
 * @description Un carrusel visual que cicla a través de una serie de imágenes.
 *              - v4.2.1 (Nivelación de Calidad de Élite): Se resuelven todas las advertencias de
 *                linting (rules-of-hooks, exhaustive-deps) y se alinea el aparato con
 *                todos los protocolos de entrega de código y calidad definidos en las directivas
 *                del proyecto. Se ha añadido documentación TSDoc completa.
 * @version 4.2.1
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/ui/Button";
import { Container } from "@/ui/Container";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/schemas/i18n.schema";
import type { Thumbnail } from "@/schemas/components/thumbnail-carousel.schema";

/**
 * @interface ThumbnailCarouselProps
 * @description Define el contrato de props para el componente.
 */
interface ThumbnailCarouselProps {
  /**
   * @param {Dictionary['thumbnailCarousel']} content - El objeto de contenido para la sección,
   * validado por el schema de Zod correspondiente.
   */
  content: Dictionary["thumbnailCarousel"];
  /**
   * @param {number} [interval=5000] - El intervalo en milisegundos para el cambio automático de imágenes.
   */
  interval?: number;
}

/**
 * @component ThumbnailCarousel
 * @description Renderiza un carrusel de imágenes automático y interactivo. Es un componente
 *              de cliente debido a su gestión de estado interno y efectos de temporizador.
 * @param {ThumbnailCarouselProps} props Las propiedades del componente.
 * @returns {React.ReactElement | null} El elemento JSX o null si no hay contenido válido.
 */
export function ThumbnailCarousel({
  content,
  interval = 5000,
}: ThumbnailCarouselProps): React.ReactElement | null {
  // 1. Llamadas a Hooks en el Nivel Superior (Cumple react-hooks/rules-of-hooks)
  const [currentIndex, setCurrentIndex] = useState(0);

  // 2. Memoización de Dependencias (Cumple react-hooks/exhaustive-deps)
  // Garantiza que la referencia a `thumbnails` sea estable entre renders.
  const thumbnails = useMemo(
    () => content?.thumbnails || [],
    [content?.thumbnails]
  );

  // La lógica del carrusel se encapsula en un `useEffect`.
  useEffect(() => {
    if (thumbnails.length <= 1) return;

    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % thumbnails.length);
    }, interval);

    // Función de limpieza para evitar fugas de memoria.
    return () => clearTimeout(timer);
  }, [currentIndex, thumbnails, interval]);

  // 3. Guarda de Seguridad (Después de los Hooks)
  if (!content || thumbnails.length === 0) {
    logger.warn(
      "[ThumbnailCarousel] No se proporcionó contenido válido. La sección no se renderizará."
    );
    return null;
  }

  // 4. Observabilidad
  logger.info("[Observabilidad] Renderizando ThumbnailCarousel");

  const { affiliateUrl, playButtonAriaLabel, playButtonTitle } = content;

  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-4xl">
        <div className="relative aspect-video w-full group rounded-lg overflow-hidden border-4 border-foreground/10 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out hover:-translate-y-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0.8, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.8, scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={thumbnails[currentIndex].src}
                alt={thumbnails[currentIndex].alt}
                fill
                className="object-cover"
                priority={currentIndex === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 896px"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-foreground/10 flex items-center justify-center transition-opacity duration-300 group-hover:bg-foreground/20">
            <Button
              href={affiliateUrl}
              className="p-0 bg-transparent shadow-none hover:scale-110 transition-transform duration-300 focus-visible:ring-0 focus-visible:ring-offset-0"
              aria-label={playButtonAriaLabel}
            >
              <div className="bg-black/50 rounded-full p-4 sm:p-6 backdrop-blur-sm">
                <svg
                  className="w-12 h-12 sm:w-16 sm:h-16 text-foreground"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <title>{playButtonTitle}</title>
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
                </svg>
              </div>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
// components/sections/ThumbnailCarousel.tsx
