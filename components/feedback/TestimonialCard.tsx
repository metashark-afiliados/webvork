// src/components/feedback/TestimonialCard.tsx
/**
 * @file TestimonialCard.tsx
 * @description Card individual para exibir um testemunho de cliente.
 * @version 2.0.0
 * @author IA Ingeniera de Software Senior v2.0
 */
import React from "react";
import Image from "next/image";

interface TestimonialCardProps {
  quote: string;
  author: string;
  location: string;
  imageSrc: string;
}

/**
 * @component TestimonialCard
 * @description Renderiza una tarjeta de testimonio individual con una cita,
 *              autor y avatar. Ha sido nivelado para usar el sistema de diseño
 *              semántico del proyecto.
 * @returns {React.ReactElement} El elemento JSX de la tarjeta.
 */
export function TestimonialCard({
  quote,
  author,
  location,
  imageSrc,
}: TestimonialCardProps): React.ReactElement {
  console.log("[Observabilidad] Renderizando TestimonialCard");

  return (
    <article className="h-full rounded-lg border border-white/10 bg-background/50 p-6 shadow-lg transition-shadow hover:shadow-primary/20">
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
            <p>{`"${quote}"`}</p>
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
// src/components/feedback/TestimonialCard.tsx
