// components/sections/Hero.tsx
/**
 * @file Hero.tsx
 * @description Componente de presentación para la sección Hero.
 *              - v4.1.0 (Build Stability Fix): Estandariza la ruta de importación
 *                a `@/components/ui/*` para resolver errores de build.
 * @version 4.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { Container } from "@/components/ui/Container";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/schemas/i18n.schema";

interface HeroProps {
  content?: Dictionary["hero"];
}

const FALLBACK_CONTENT = {
  title: "Fallback Title",
  subtitle: "This is the default fallback subtitle for the Hero component.",
};

export function Hero({ content }: HeroProps): React.ReactElement {
  logger.info("[Observabilidad] Renderizando Hero");

  const { title, subtitle } = content || FALLBACK_CONTENT;
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
