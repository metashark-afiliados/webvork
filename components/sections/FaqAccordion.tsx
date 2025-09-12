// src/components/sections/FaqAccordion.tsx
/**
 * @file FaqAccordion.tsx
 * @description Sección de Preguntas Frecuentes (FAQ).
 * @version 2.1.0
 * @author IA Ingeniera de Software Senior v2.0
 */
import React from "react";
import { AccordionItem } from "@/components/data-display/Accordion";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

// <<-- CORREGIDO: Interfaz para tipado explícito
interface Faq {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  content: Dictionary["faqAccordion"];
}

export function FaqAccordion({
  content,
}: FaqAccordionProps): React.ReactElement | null {
  console.log("[Observabilidad] Renderizando FaqAccordion");

  if (!content) return null;
  const { title, faqs } = content;

  return (
    <section className="py-16 sm:py-24 bg-background/50">
      <Container className="max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12 sm:text-4xl">
          {title}
        </h2>
        <div className="space-y-4">
          {faqs.map(
            (
              faq: Faq // <<-- CORREGIDO: Tipo explícito
            ) => (
              <AccordionItem key={faq.question} title={faq.question}>
                {faq.answer}
              </AccordionItem>
            )
          )}
        </div>
      </Container>
    </section>
  );
}
// src/components/sections/FaqAccordion.tsx
