// components/sections/FaqAccordion.tsx
/**
 * @file FaqAccordion.tsx
 * @description Sección de Preguntas Frecuentes (FAQ). Totalmente refactorizada
 *              para ser un componente de presentación puro, data-driven y alineado
 *              con el contrato de props unificado del SectionRenderer.
 *              - v6.1.0 (Resilience): La prop `content` ahora es opcional.
 * @version 6.1.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { AccordionItem } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { logger } from "@/lib/logging";
import type { FaqItem } from "@/lib/schemas/components/faq-accordion.schema";

interface FaqAccordionProps {
  // --- [INICIO DE REFACTORIZACIÓN DE RESILIENCIA] ---
  content?: Dictionary["faqAccordion"];
  // --- [FIN DE REFACTORIZACIÓN DE RESILIENCIA] ---
}

export function FaqAccordion({
  content,
}: FaqAccordionProps): React.ReactElement | null {
  logger.info("[Observabilidad] Renderizando FaqAccordion (Data-Driven)");

  // --- [INICIO DE REFACTORIZACIÓN DE RESILIENCIA] ---
  if (!content) {
    logger.warn(
      "[FaqAccordion] No se proporcionó contenido. La sección no se renderizará."
    );
    return null;
  }
  // --- [FIN DE REFACTORIZACIÓN DE RESILIENCIA] ---

  const { title, faqs } = content;

  return (
    <section className="py-16 sm:py-24 bg-background/50">
      <Container className="max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12 sm:text-4xl">
          {title}
        </h2>
        <div className="space-y-4">
          {faqs.map((faqItem: FaqItem) => (
            <AccordionItem key={faqItem.question} content={faqItem} />
          ))}
        </div>
      </Container>
    </section>
  );
}
// components/sections/FaqAccordion.tsx
