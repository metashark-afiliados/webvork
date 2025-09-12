// src/components/sections/BenefitsSection.tsx
/**
 * @file BenefitsSection.tsx
 * @description Componente de presentación para la sección de Beneficios.
 * @description_es Muestra los beneficios clave del producto en un formato de
 *               cuadrícula fácil de escanear para comunicar valor rápidamente.
 * @version 2.0.0
 * @dependencies react, lucide-react, @/components/ui/Container
 *
 * @prop {string} title - El título principal de la sección.
 * @prop {string} subtitle - Un subtítulo descriptivo que contextualiza los beneficios.
 * @prop {string[]} benefits - Un array de strings, donde cada string es un beneficio.
 */
import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";

interface BenefitsSectionProps {
  title: string;
  subtitle: string;
  benefits: string[];
}

/**
 * @component BenefitsSection
 * @description Renderiza una sección que destaca los beneficios del producto.
 * @param {BenefitsSectionProps} props Las propiedades con el contenido textual.
 * @returns {React.ReactElement} El elemento JSX que representa la sección.
 */
export function BenefitsSection({
  title,
  subtitle,
  benefits,
}: BenefitsSectionProps): React.ReactElement {
  console.log("[Observabilidad] Renderizando BenefitsSection");

  return (
    <section className="py-16 sm:py-24 bg-background">
      <Container className="text-center">
        <h2 className="text-3xl font-bold text-foreground tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
          {subtitle}
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10 text-left max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-4">
              <CheckCircle2
                className="h-7 w-7 text-primary flex-shrink-0 mt-1"
                aria-hidden="true"
              />
              <p className="font-semibold text-foreground">{benefit}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
// src/components/sections/BenefitsSection.tsx
