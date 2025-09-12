// src/components/sections/Hero.tsx
/**
 * @file Hero.tsx
 * @description Componente de presentación para la sección Hero.
 * @description_es Muestra el titular principal de la página, diseñado para crear
 *               una conexión emocional inmediata a través de una animación de cascada.
 * @version 2.0.0
 * @dependencies react, @/components/ui/Container
 */
import React from "react";
import { Container } from "@/components/ui/Container";

interface HeroProps {
  title: string;
  subtitle: string;
}

/**
 * @component Hero
 * @description Renderiza la sección principal de la cabecera de la página.
 * @param {HeroProps} props Las propiedades con el contenido textual.
 * @returns {React.ReactElement} El elemento JSX que representa la sección Hero.
 */
export function Hero({ title, subtitle }: HeroProps): React.ReactElement {
  console.log("[Observabilidad] Renderizando Hero");
  const titleWords = title.split(" ");

  return (
    <section className="bg-background pt-8 pb-16 text-center overflow-hidden">
      <Container className="max-w-4xl">
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight font-serif text-primary drop-shadow-md"
          aria-label={title}
        >
          {titleWords.map((word, index) => (
            <span key={index} className="inline-block overflow-hidden py-1">
              <span
                className="inline-block animate-word-cascade"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                {word}
                {/* Añade un espacio no separable para mantener el espaciado */}
                {index < titleWords.length - 1 && "\u00A0"}
              </span>
            </span>
          ))}
        </h1>
        <p
          className="mt-6 text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto animate-fade-in-up"
          style={{ animationDelay: "800ms" }}
        >
          {subtitle}
        </p>
      </Container>
    </section>
  );
}
// src/components/sections/Hero.tsx
