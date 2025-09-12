// src/components/sections/GuaranteeSection.tsx
/**
 * @file GuaranteeSection.tsx
 * @description Muestra una marquesina con los sellos de calidad y confianza.
 * @version 3.0.0
 * @author IA Ingeniera de Software Senior v2.0
 */
"use client";

import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

interface GuaranteeSectionProps {
  content: Dictionary["guaranteeSection"];
}

export function GuaranteeSection({
  content,
}: GuaranteeSectionProps): React.ReactElement | null {
  console.log("[Observabilidad] Renderizando GuaranteeSection");

  if (!content) return null;
  const { title, seals } = content;

  return (
    <section className="py-16 sm:py-24 bg-background">
      <Container>
        <h2 className="text-3xl font-bold text-center text-foreground mb-12 sm:text-4xl">
          {title}
        </h2>
        <Marquee
          gradient={true}
          gradientColor="hsl(var(--background))"
          gradientWidth={100}
          speed={50}
          autoFill={true}
          pauseOnHover={true}
        >
          {seals.map((seal) => (
            <div
              key={seal.imageAlt}
              className="mx-12 flex items-center justify-center"
            >
              <Image
                src={seal.imageUrl}
                alt={seal.imageAlt}
                width={120}
                height={120}
                className="h-24 w-24 md:h-32 md:w-32 object-contain"
              />
            </div>
          ))}
        </Marquee>
      </Container>
    </section>
  );
}
// src/components/sections/GuaranteeSection.tsx
