// components/layout/sections/sponsors.tsx
/**
 * @file sponsors.tsx
 * @description Sección de patrocinadores. Totalmente refactorizada para ser
 *              data-driven, unificar la dependencia de marquesina a `react-fast-marquee`,
 *              y cumplir con todos los estándares del proyecto.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { SponsorItem } from "@/lib/schemas/components/sponsors-section.schema";

interface SponsorsSectionProps {
  content: Dictionary["sponsorsSection"];
}

export const SponsorsSection = ({
  content,
}: SponsorsSectionProps): React.ReactElement | null => {
  logger.info("[Observabilidad] Renderizando SponsorsSection");

  if (!content) {
    logger.warn(
      "[SponsorsSection] No se proporcionó contenido. La sección no se renderizará."
    );
    return null;
  }

  const { title, sponsors } = content;

  return (
    <section id="sponsors" className="container mx-auto pb-24 sm:pb-32">
      <h2 className="text-lg md:text-xl text-center text-muted-foreground mb-6">
        {title}
      </h2>
      <div className="mx-auto">
        <Marquee
          gradient={true}
          gradientColor="hsl(var(--background))"
          gradientWidth={100}
          speed={40}
          autoFill={true}
          pauseOnHover={true}
        >
          {sponsors.map((sponsor: SponsorItem) => (
            <div
              key={sponsor.name}
              className="flex items-center text-xl md:text-2xl font-medium text-foreground mx-8"
            >
              <DynamicIcon
                name={sponsor.icon}
                size={32}
                className="mr-3 text-primary"
              />
              {sponsor.name}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};
// components/layout/sections/sponsors.tsx
