// components/dev/utils/component-props.ts
/**
 * @file component-props.ts
 * @description Utilidad para generar props de fallback robustas y estructuradas para componentes de desarrollo.
 *              Atomizado desde ComponentCanvas.tsx para respetar el Principio de Responsabilidad Única.
 *              - v1.2.0: Resuelve errores de compilación (`TS2749`, `TS1005`, etc.) al reemplazar
 *                la sintaxis JSX (`<DynamicIcon />`) por `React.createElement(DynamicIcon, ...)`,
 *                lo que es compatible con archivos `.ts`. Mantiene el uso de `DynamicIcon`.
 * @version 1.2.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
// import { Gauge } from "lucide-react"; // Ya eliminado
import DynamicIcon from "@/components/ui/DynamicIcon"; // Importación de DynamicIcon
import { logger } from "@/lib/logging";

/**
 * @function getFallbackProps
 * @description Genera props de fallback completas y tipadas para componentes específicos
 *              del Dev Canvas, asegurando que la estructura esperada por el componente
 *              esté presente para evitar TypeError.
 * @param {string} name - Nombre del componente para el cual generar las props de fallback.
 * @returns {Record<string, any>} Objeto de props de fallback estructuradas.
 */
export function getFallbackProps(name: string): Record<string, any> {
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
            icon: React.createElement(DynamicIcon, { name: "Gauge", size: 18 }), // <-- ¡CORRECCIÓN APLICADA AQUÍ!
            label: "Default Mock Item C",
            onClick: () => logger.info("Default Mock Item C clicked!"),
          },
          {
            icon: React.createElement(DynamicIcon, { name: "Gauge", size: 18 }), // <-- ¡CORRECCIÓN APLICADA AQUÍ!
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
        devDictionary: {}, // Proporcionar un mock vacío para devDictionary
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
