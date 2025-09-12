// src/components/layout/PageHeader.tsx
import React from "react";
import { Container } from "@/components/ui/Container";

/**
 * @file PageHeader.tsx
 * @description Componente atómico para renderizar el encabezado de una página de contenido.
 * @version 1.0.0
 */
interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export function PageHeader({
  title,
  subtitle,
}: PageHeaderProps): React.ReactElement {
  console.log("[Observabilidad] Renderizando PageHeader");
  return (
    <div className="bg-muted/20 py-16 sm:py-20 text-center">
      <Container>
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      </Container>
    </div>
  );
}
// src/components/layout/PageHeader.tsx
