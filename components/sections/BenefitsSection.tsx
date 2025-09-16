// components/sections/BenefitsSection.tsx
/**
 * @file BenefitsSection.tsx
 * @description Componente de presentación para la sección de Beneficios.
 *              - v3.2.0: Resuelve el error TS2741 haciendo que la prop `content` sea
 *                opcional (SOLUCIÓN ANTERIOR, AHORA REVERTIDA).
 *              - v4.0.0 (Strict Contract): La prop `content` vuelve a ser
 *                obligatoria, restaurando el contrato de datos estricto. La
 *                resiliencia se delega al SectionRenderer.
 * @version 4.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { BenefitItem } from "@/lib/schemas/components/benefits-section.schema";

interface BenefitsSectionProps {
  // --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
  // La prop `content` vuelve a ser obligatoria.
  content: Dictionary["benefitsSection"];
  // --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---
}

export const BenefitsSection = ({
  content,
}: BenefitsSectionProps): React.ReactElement | null => {
  logger.info("[Observabilidad] Renderizando componente: BenefitsSection");

  // La guarda de seguridad se mantiene como una defensa en tiempo de ejecución.
  if (!content) {
    logger.warn(
      "[BenefitsSection] No se proporcionó contenido. La sección no se renderizará."
    );
    return null;
  }

  const { eyebrow, title, subtitle, benefits } = content;

  return (
    <section id="benefits" className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div>
          <h2 className="text-lg text-primary mb-2 tracking-wider">
            {eyebrow}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">{title}</h3>
          <p className="text-xl text-muted-foreground mb-8">{subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {benefits.map((benefit: BenefitItem, index: number) => (
            <Card
              key={benefit.title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <DynamicIcon
                    name={benefit.icon}
                    size={32}
                    className="mb-6 text-primary"
                  />
                  <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>
                <CardTitle>{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {benefit.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
// components/sections/BenefitsSection.tsx
