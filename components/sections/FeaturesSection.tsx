// components/sections/FeaturesSection.tsx
/**
 * @file FeaturesSection.tsx
 * @description Componente de sección para mostrar una lista de características clave.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { Container } from "@/components/ui/Container";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

/**
 * @interface FeaturesSectionProps
 * @description Define el contrato de props para el componente FeaturesSection.
 */
interface FeaturesSectionProps {
  content: Dictionary["featuresSection"];
}

/**
 * @component FeaturesSection
 * @description Renderiza una cuadrícula de características, cada una con un icono, título y descripción.
 * @param {FeaturesSectionProps} props - Las propiedades que contienen el contenido de la sección.
 * @returns {React.ReactElement | null} El elemento JSX de la sección, o null si no hay contenido.
 */
export function FeaturesSection({
  content,
}: FeaturesSectionProps): React.ReactElement | null {
  logger.info("[Observabilidad] Renderizando FeaturesSection");

  if (!content) {
    logger.warn(
      "[FeaturesSection] No se proporcionó contenido. La sección no se renderizará."
    );
    return null;
  }

  const { eyebrow, title, subtitle, features } = content;

  return (
    <section id="features" className="py-24 sm:py-32 bg-background/50">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            {eyebrow}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {subtitle}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.title} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <DynamicIcon
                      name={feature.icon}
                      className="h-6 w-6 text-primary-foreground"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.title}
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
// components/sections/FeaturesSection.tsx
