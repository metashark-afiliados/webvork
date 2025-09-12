// src/components/sections/SocialProofLogos.tsx
"use client";

import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

/**
 * @file SocialProofLogos.tsx
 * @description Componente de prueba social. Actualizado para aceptar `content`.
 * @version 4.0.0
 * @author RaZ podesta - MetaShark Tech
 */

// <<-- CORRECCIÓN: La prop ahora es un objeto `content`
interface SocialProofLogosProps {
  content: NonNullable<Dictionary["socialProof"]>;
}

export function SocialProofLogos({
  content,
}: SocialProofLogosProps): React.ReactElement | null {
  console.log("[Observabilidad] Renderizando SocialProofLogos");

  if (!content || !content.logos || content.logos.length === 0) {
    return null;
  }
  const { title, logos } = content;

  return (
    <section
      className="py-12 bg-background"
      aria-labelledby="social-proof-title"
    >
      <Container>
        <h2
          id="social-proof-title"
          className="text-center font-semibold text-foreground/70 uppercase tracking-wider mb-8"
        >
          {title}
        </h2>
        <Marquee
          gradient={true}
          gradientColor="hsl(var(--background))"
          gradientWidth={100}
          speed={40}
          autoFill={true}
          pauseOnHover={true}
        >
          {logos.map((logo) => (
            <div
              key={logo.alt}
              className="mx-12 flex items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={140}
                height={40}
                className="h-10 w-auto object-contain grayscale opacity-75 transition-opacity hover:opacity-100"
              />
            </div>
          ))}
        </Marquee>
      </Container>
    </section>
  );
}
// src/components/sections/SocialProofLogos.tsx
