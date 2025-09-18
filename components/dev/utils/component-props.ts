// components/dev/utils/component-props.ts
/**
 * @file component-props.ts
 * @description Utilidad para generar props de fallback robustas y estructuradas para componentes de desarrollo.
 *              - v1.3.0 (Type Safety): Erradica el uso de 'any'.
 * @version 1.3.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { DynamicIcon } from "@/components/ui";
import { logger } from "@/lib/logging";

/**
 * @function getFallbackProps
 * @description Genera props de fallback completas y tipadas para componentes específicos
 *              del Dev Canvas, asegurando que la estructura esperada por el componente
 *              esté presente para evitar TypeError.
 * @param {string} name - Nombre del componente para el cual generar las props de fallback.
 * @returns {Record<string, unknown>} Objeto de props de fallback estructuradas.
 */
export function getFallbackProps(name: string): Record<string, unknown> {
  logger.trace(`[getFallbackProps] Generando props de fallback para: ${name}`);
  switch (name) {
    case "Hero":
      return {
        title: "Título de fallback para Hero",
        subtitle:
          "Subtítulo de fallback. El contenido real no fue cargado correctamente.",
      };
    case "BenefitsSection":
      return {
        title: "Beneficios de Fallback",
        subtitle: "Subtítulo de beneficios de fallback.",
        benefits: [
          "Beneficio 1 de fallback",
          "Beneficio 2 de fallback",
          "Beneficio 3 de fallback",
        ],
      };
    case "Dock":
      return {
        items: [
          {
            icon: React.createElement(DynamicIcon, { name: "Gauge", size: 18 }),
            label: "Default Mock Item C",
            onClick: () => logger.info("Default Mock Item C clicked!"),
          },
          {
            icon: React.createElement(DynamicIcon, { name: "Gauge", size: 18 }),
            label: "Default Mock Item D",
            onClick: () => logger.info("Default Mock Item D clicked!"),
          },
        ],
        config: {},
      };
    case "LightRays":
      return { config: { raysColor: "primary", raysOrigin: "top-center" } };
    case "Header":
      return {
        content: {
          logoUrl: "/img/logos/globalfitwell-logo-v2.svg",
          logoAlt: "Logo Global Fitwell Mock",
          navLinks: [{ label: "Mock Link", href: "/dev" }],
          ctaButton: { label: "CTA Mock", href: "/dev" },
        },
        devDictionary: {},
      };
    case "Footer":
      return {
        copyright: "© 2025 Global Fitwell Mock",
        links: [{ label: "Privacidad Mock", href: "/privacy" }],
        disclaimer: "Disclaimer Mock",
      };
    case "ScrollingBanner":
      return {
        message:
          "Mensaje de banner de fallback: ¡Descuento especial por tiempo limitado!",
      };
    default:
      return {};
  }
}
// components/dev/utils/component-props.ts
