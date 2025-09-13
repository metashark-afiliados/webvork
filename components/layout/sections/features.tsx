// components/layout/sections/features.tsx
/**
 * @file features.tsx
 * @description Sección de características del producto o servicio. Totalmente refactorizada
 *              para ser un componente de presentación puro, data-driven y alineado
 *              con la arquitectura del proyecto.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
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
 * @description Renderiza la sección de características. Es un componente de presentación puro.
 * @param {FeaturesSectionProps} props - Las propiedades con el contenido de la sección.
 * @returns {React.ReactElement | null} El elemento JSX de la sección, o null si no hay contenido.
 */
export const FeaturesSection = ({
  content,
}: FeaturesSectionProps): React.ReactElement | null => {
  logger.info("[Observabilidad] Renderizando FeaturesSection");

  if (!content) {
    logger.warn(
      "[FeaturesSection] No se proporcionó contenido. La sección no se renderizará."
    );
    return null;
  }

  const { eyebrow, title, subtitle, features } = content;

  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        {eyebrow}
      </h2>

      <h3 className="text-3xl md:text-4xl text-center font-bold mb-4">
        {title}
      </h3>

      <p className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        {subtitle}
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => (
          <div key={feature.title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <DynamicIcon
                    name={feature.icon}
                    size={24}
                    className="text-primary"
                  />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-center">
                {feature.description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
// components/layout/sections/features.tsx
