// src/components/sections/ThumbnailCarousel.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * @file ThumbnailCarousel.tsx
 * @description Un carrusel visual que cicla a través de una serie de imágenes (thumbnails)
 *              con una transición de fundido cruzado (cross-fade).
 * @version 3.0.1
 * @dependencies react, next/image, framer-motion, @/components/ui/Button, @/components/ui/Container
 *
 * @prop {Array<{src: string, alt: string}>} thumbnails - Las imágenes a mostrar en el carrusel.
 * @prop {string} affiliateUrl - La URL de destino para el botón de "play".
 * @prop {string} playButtonAriaLabel - Etiqueta ARIA para el botón de reproducción.
 * @prop {string} playButtonTitle - Título para el icono SVG de reproducción.
 * @prop {number} [interval=5000] - El intervalo en milisegundos para cambiar de imagen.
 */

export interface Thumbnail {
  src: string;
  alt: string;
}

interface ThumbnailCarouselProps {
  thumbnails: Thumbnail[];
  affiliateUrl: string;
  playButtonAriaLabel: string;
  playButtonTitle: string;
  interval?: number;
}

/**
 * @component ThumbnailCarousel
 * @description Renderiza un carrusel de imágenes automático y interactivo.
 * @param {ThumbnailCarouselProps} props Las propiedades del componente.
 * @returns {React.ReactElement | null} El elemento JSX o null si no hay thumbnails.
 */
export function ThumbnailCarousel({
  thumbnails,
  affiliateUrl,
  playButtonAriaLabel,
  playButtonTitle,
  interval = 5000,
}: ThumbnailCarouselProps): React.ReactElement | null {
  console.log("[Observabilidad] Renderizando ThumbnailCarousel");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!thumbnails || thumbnails.length <= 1) return;

    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % thumbnails.length);
    }, interval);

    return () => clearTimeout(timer);
  }, [currentIndex, thumbnails, interval]);

  if (!thumbnails || thumbnails.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-4xl">
        <div className="relative aspect-video w-full group rounded-lg overflow-hidden border-4 border-foreground/10 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out hover:-translate-y-1">
          <AnimatePresence>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
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
// src/components/sections/ThumbnailCarousel.tsx
