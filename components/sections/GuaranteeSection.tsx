// components/sections/GuaranteeSection.tsx
/**
 * @file GuaranteeSection.tsx
 * @description Muestra una marquesina con los sellos de calidad y confianza.
 *              Resuelve el error de tipo TS7006 al utilizar un tipo explícito `Seal`.
 * @version 4.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
// --- INICIO DE MODIFICACIÓN ---
import type { Seal } from "@/lib/schemas/components/guarantee-section.schema";
import { logger } from "@/lib/logging";
// --- FIN DE MODIFICACIÓN ---

interface GuaranteeSectionProps {
  content: Dictionary["guaranteeSection"];
}

export function GuaranteeSection({
  content,
}: GuaranteeSectionProps): React.ReactElement | null {
  logger.info(
    "[Observabilidad] Renderizando GuaranteeSection (v4.0.0 - Tipo explícito)"
  );

  if (!content) {
    logger.warn(
      "[GuaranteeSection] No se proporcionó contenido. La sección no se renderizará."
    );
    return null;
  }
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
          {/* --- INICIO DE CORRECCIÓN --- */}
          {seals.map((seal: Seal) => (
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
          {/* --- FIN DE CORRECCIÓN --- */}
        </Marquee>
      </Container>
    </section>
  );
}
// components/sections/GuaranteeSection.tsx
