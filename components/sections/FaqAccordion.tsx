// components/sections/FaqAccordion.tsx
/**
 * @file FaqAccordion.tsx
 * @description Sección de Preguntas Frecuentes (FAQ). Totalmente refactorizada
 *              para ser un componente de presentación puro, data-driven y alineado
 *              con el contrato de props unificado del SectionRenderer.
 * @version 6.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
// Oportunidad de Atomización: Se consume el componente atómico desde su ubicación canónica.
import { AccordionItem } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { logger } from "@/lib/logging";
import type { FaqItem } from "@/lib/schemas/components/faq-accordion.schema";

/**
 * @interface FaqAccordionProps
 * @description Contrato de props unificado para el SectionRenderer.
 */
interface FaqAccordionProps {
  content: Dictionary["faqAccordion"];
}

/**
 * @component FaqAccordion
 * @description Renderiza la sección completa de FAQ, mapeando los datos y
 *              utilizando el componente atómico `AccordionItem`.
 * @param {FaqAccordionProps} props - Las propiedades que contienen el contenido de la sección.
 * @returns {React.ReactElement | null} El elemento JSX de la sección, o null si no hay contenido.
 */
export function FaqAccordion({
  content,
}: FaqAccordionProps): React.ReactElement | null {
  logger.info("[Observabilidad] Renderizando FaqAccordion (Data-Driven)");

  if (!content) {
    logger.warn(
      "[FaqAccordion] No se proporcionó contenido. La sección no se renderizará."
    );
    return null;
  }

  const { title, faqs } = content;

  return (
    <section className="py-16 sm:py-24 bg-background/50">
      <Container className="max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12 sm:text-4xl">
          {title}
        </h2>
        <div className="space-y-4">
          {faqs.map((faqItem: FaqItem) => (
            // La clave ahora está en el componente mapeado directamente.
            // Se pasa el objeto `content` completo al componente hijo.
            <AccordionItem key={faqItem.question} content={faqItem} />
          ))}
        </div>
      </Container>
    </section>
  );
}
// components/sections/FaqAccordion.tsx
