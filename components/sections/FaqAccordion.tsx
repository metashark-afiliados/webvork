// components/sections/FaqAccordion.tsx
/**
 * @file FaqAccordion.tsx
 * @description Sección de Preguntas Frecuentes (FAQ). Nivelada para consumir
 *              el componente AccordionItem de élite y sus contratos de datos,
 *              resolviendo el error de tipo implícito TS7006.
 * @version 4.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { AccordionItem } from "@/components/data-display/Accordion";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { logger } from "@/lib/logging";
// --- INICIO DE MODIFICACIÓN ---
import type { FaqItem } from "@/lib/schemas/components/faq-accordion.schema";
// --- FIN DE MODIFICACIÓN ---

interface FaqAccordionProps {
  content: Dictionary["faqAccordion"];
}

export function FaqAccordion({
  content,
}: FaqAccordionProps): React.ReactElement | null {
  logger.info(
    "[FaqAccordion] Renderizando sección de FAQ (v4.0.0 - Tipo explícito)"
  );

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
          {/* --- INICIO DE CORRECCIÓN --- */}
          {/* Se aplica el tipo explícito `FaqItem` al parámetro del map. */}
          {faqs.map((faqItem: FaqItem) => (
            <AccordionItem key={faqItem.question} content={faqItem} />
          ))}
          {/* --- FIN DE CORRECCIÓN --- */}
        </div>
      </Container>
    </section>
  );
}
// components/sections/FaqAccordion.tsx
