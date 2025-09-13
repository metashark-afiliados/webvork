// components/sections/Hero.tsx
/**
 * @file Hero.tsx
 * @description Componente de presentación para la sección Hero.
 *              - v4.0.0: Se hace auto-contenido con su propia lógica de fallback,
 *                desacoplando el contenido por defecto del diccionario global i18n.
 * @version 4.0.0
 * @author Gemini AI - Asistente de IA de Google
 */
import React from "react";
import { Container } from "@/ui/Container";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/schemas/i18n.schema";

interface HeroProps {
  content?: Dictionary["hero"]; // La prop 'content' ahora es opcional
}

// SSoT para el contenido de fallback
const FALLBACK_CONTENT = {
  title: "Fallback Title",
  subtitle: "This is the default fallback subtitle for the Hero component.",
};

export function Hero({ content }: HeroProps): React.ReactElement {
  logger.info("[Observabilidad] Renderizando Hero");

  // --- INICIO DE MODIFICACIÓN: Lógica de Fallback ---
  // Si `content` no se proporciona, se utiliza el objeto de fallback.
  const { title, subtitle } = content || FALLBACK_CONTENT;
  // --- FIN DE MODIFICACIÓN ---

  const titleWords = title.split(" ");

  return (
    // ... el resto del JSX permanece sin cambios ...
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
