// components/ui/Accordion.tsx
/**
 * @file Accordion.tsx
 * @description Componente atómico reutilizable `AccordionItem`.
 *              - v5.0.0: Refactorizado a componente de presentación puro. Consume el
 *                tipo `FaqItem` desde su SSoT y cumple con la Directiva 003.
 *              - v5.1.0: Movido a la ubicación canónica `components/ui/` y rutas de
 *                importación corregidas para resolver errores TS2307.
 * @version 5.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";
import { logger } from "@/lib/logging";
import type { FaqItem } from "@/lib/schemas/components/faq-accordion.schema";

interface AccordionItemProps {
  content: FaqItem;
}

/**
 * @component AccordionItem
 * @description Renderiza un único panel expandible de pregunta y respuesta.
 * @param {AccordionItemProps} props - Las propiedades que contienen la pregunta y la respuesta.
 * @returns {React.ReactElement} El elemento JSX del item del acordeón.
 */
export function AccordionItem({
  content,
}: AccordionItemProps): React.ReactElement {
  logger.trace("[Observabilidad] Renderizando AccordionItem", {
    question: content.question,
  });

  const [isOpen, setIsOpen] = useState(false);
  const panelId = React.useId();

  return (
    <div className="border-b border-muted/50">
      <h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center py-4 text-left font-semibold text-foreground hover:text-primary transition-colors"
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          <span>{content.question}</span>
          <ChevronDown
            className={twMerge(
              clsx(
                "h-5 w-5 transform transition-transform duration-300 shrink-0",
                isOpen && "rotate-180"
              )
            )}
            aria-hidden="true"
          />
        </button>
      </h2>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="pb-4 pr-8 text-muted-foreground prose prose-invert prose-sm"
              dangerouslySetInnerHTML={{ __html: content.answer }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
// components/ui/Accordion.tsx
