// components/ui/TestimonialCard.tsx
/**
 * @file TestimonialCard.tsx
 * @description Componente atómico de UI para mostrar un testimonio individual.
 *              - v4.0.0 (Theming Sovereignty): Refactorizado para usar tokens
 *                de color semánticos (border-border).
 * @version 4.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import Image from "next/image";
import { logger } from "@/lib/logging";

interface TestimonialCardProps {
  quote: string;
  author: string;
  location: string;
  imageSrc: string;
}

export function TestimonialCard({
  quote,
  author,
  location,
  imageSrc,
}: TestimonialCardProps): React.ReactElement {
  logger.info("[Observabilidad] Renderizando TestimonialCard");

  return (
    <article className="h-full rounded-lg border border-border bg-background/50 p-6 shadow-lg transition-shadow hover:shadow-primary/20">
      <div className="flex items-start gap-4">
        <Image
          src={imageSrc}
          alt={`Foto de ${author}`}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover border-2 border-primary/50"
        />
        <div>
          <blockquote className="text-foreground">
            <p>&quot;{quote}&quot;</p>
          </blockquote>
          <footer className="mt-4">
            <p className="font-bold text-primary">{author}</p>
            <p className="text-sm text-muted-foreground">{location}</p>
          </footer>
        </div>
      </div>
    </article>
  );
}
// components/ui/TestimonialCard.tsx
