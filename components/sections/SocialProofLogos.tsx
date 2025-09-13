// components/sections/SocialProofLogos.tsx
/**
 * @file SocialProofLogos.tsx
 * @description Componente de prueba social con logos en marquesina.
 *              - v5.0.0 (Alineación de Contrato): Refactorizado para consumir la clave
 *                correcta del diccionario ('socialProofLogos') y utilizar tipos
 *                explícitos, resolviendo los errores de TypeScript TS2339 y TS7006.
 * @version 5.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { logger } from "@/lib/logging";
// --- INICIO DE CORRECCIÓN: Se importa el tipo atómico desde su SSoT ---
import type { Logo } from "@/lib/schemas/components/social-proof-logos.schema";
// --- FIN DE CORRECCIÓN ---

interface SocialProofLogosProps {
  // --- INICIO DE CORRECCIÓN: Se consume la clave correcta del diccionario ---
  content: Dictionary["socialProofLogos"];
  // --- FIN DE CORRECCIÓN ---
}

export function SocialProofLogos({
  content,
}: SocialProofLogosProps): React.ReactElement | null {
  logger.info("[Observabilidad] Renderizando SocialProofLogos");

  if (!content || !content.logos || content.logos.length === 0) {
    logger.warn(
      "[SocialProofLogos] No se proporcionó contenido válido. La sección no se renderizará."
    );
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
          {/* --- INICIO DE CORRECCIÓN: Se aplica el tipo explícito 'Logo' --- */}
          {logos.map((logo: Logo) => (
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
          {/* --- FIN DE CORRECCIÓN --- */}
        </Marquee>
      </Container>
    </section>
  );
}
// components/sections/SocialProofLogos.tsx
