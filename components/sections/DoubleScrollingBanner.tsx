// components/sections/DoubleScrollingBanner.tsx
/**
 * @file DoubleScrollingBanner.tsx
 * @description Sección de prueba social con dos marquesinas animadas.
 *              - v3.1.0: Mejora la consistencia del sistema de iconos al reemplazar la
 *                importación directa de `Star` por el componente `DynamicIcon`.
 * @version 3.1.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
// import { Star } from "lucide-react"; // <-- ELIMINADO
import DynamicIcon from "@/components/ui/DynamicIcon"; // <-- AÑADIDO: Importación de DynamicIcon
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type {
  TestimonialItem as Testimonial,
  LogoItem as Logo,
} from "@/lib/schemas/components/double-scrolling-banner.schema";

interface DoubleScrollingBannerProps {
  content: Dictionary["doubleScrollingBanner"];
}

// --- Sub-componentes Internos Puros y Tipados ---
const StarRating = ({ rating }: { rating: number }) => {
  logger.trace(
    "[Observabilidad] Renderizando StarRating para DoubleScrollingBanner"
  ); // Añadido para observabilidad
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <DynamicIcon // <-- USO DE DYNAMICICON
          key={i}
          name="Star"
          className={`h-4 w-4 ${i < rating ? "text-accent" : "text-muted-foreground/50"}`}
          fill={i < rating ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
};

const TestimonialCard = ({ imageSrc, altText, name, rating }: Testimonial) => {
  logger.trace(
    "[Observabilidad] Renderizando TestimonialCard para DoubleScrollingBanner"
  ); // Añadido para observabilidad
  return (
    <div className="mx-4 flex w-64 flex-col items-center justify-center rounded-lg bg-background p-4 shadow-md border border-white/10">
      <Image
        src={imageSrc}
        alt={altText}
        width={80}
        height={80}
        className="h-20 w-20 rounded-full object-cover"
      />
      <p className="mt-3 text-center font-bold text-foreground">{name}</p>
      <div className="mt-1">
        <StarRating rating={rating} />
      </div>
    </div>
  );
};

// --- Componente Principal ---
export function DoubleScrollingBanner({
  content,
}: DoubleScrollingBannerProps): React.ReactElement | null {
  logger.info(
    "[Observabilidad] Renderizando DoubleScrollingBanner (Client Component)"
  ); // Observabilidad actualizada

  if (!content) {
    logger.warn(
      "[DoubleScrollingBanner] No se proporcionó contenido. La sección no se renderizará."
    );
    return null;
  }
  const { testimonials, logos } = content;

  return (
    <section className="w-full bg-background/50 py-12 overflow-x-hidden">
      <Marquee speed={40} autoFill={true} pauseOnHover={true} gradient={false}>
        {testimonials.map((testimonial: Testimonial) => (
          <TestimonialCard key={testimonial.name} {...testimonial} />
        ))}
      </Marquee>
      <div className="h-8" />
      <Marquee
        direction="right"
        speed={30}
        autoFill={true}
        pauseOnHover={true}
        gradient={false}
      >
        {logos.map((logo: Logo) => (
          <div
            key={logo.altText}
            className="mx-12 flex items-center justify-center"
          >
            <Image
              src={logo.imageSrc}
              alt={logo.altText}
              width={140}
              height={48}
              className="h-12 w-auto object-contain grayscale opacity-75 transition-all duration-300 hover:opacity-100"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
}
