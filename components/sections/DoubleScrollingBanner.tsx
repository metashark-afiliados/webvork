// src/components/sections/DoubleScrollingBanner.tsx
/**
 * @file DoubleScrollingBanner.tsx
 * @description Sección de prueba social con dos marquesinas animadas.
 * @version 2.0.0
 * @author IA Ingeniera de Software Senior v2.0
 */
"use client";

import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Star } from "lucide-react";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

// --- Tipos de Datos (extraídos del schema) ---
type TestimonialItem = NonNullable<
  Dictionary["doubleScrollingBanner"]
>["testimonials"][0];
type LogoItem = NonNullable<Dictionary["doubleScrollingBanner"]>["logos"][0];

interface DoubleScrollingBannerProps {
  content: Dictionary["doubleScrollingBanner"];
}

// --- Sub-componentes Nivelados ---
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "text-accent" : "text-muted-foreground/50"}`}
        fill={i < rating ? "currentColor" : "none"}
      />
    ))}
  </div>
);

const TestimonialCard = ({
  imageSrc,
  altText,
  name,
  rating,
}: TestimonialItem) => (
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

// --- Componente Principal Nivelado ---
export function DoubleScrollingBanner({
  content,
}: DoubleScrollingBannerProps): React.ReactElement | null {
  console.log("[Observabilidad] Renderizando DoubleScrollingBanner");

  if (!content) return null;
  const { testimonials, logos } = content;

  return (
    <section className="w-full bg-background/50 py-12 overflow-x-hidden">
      <Marquee speed={40} autoFill={true} pauseOnHover={true} gradient={false}>
        {testimonials.map((testimonial) => (
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
        {logos.map((logo) => (
          <div
            key={logo.altText}
            className="mx-12 flex items-center justify-center"
          >
            <Image
              src={logo.imageSrc}
              alt={logo.altText}
              width={140}
              height={48}
              className="h-12 w-auto object-contain grayscale transition-all duration-300 hover:grayscale-0"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
}
// src/components/sections/DoubleScrollingBanner.tsx
