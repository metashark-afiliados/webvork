// components/data-display/Accordion.tsx
/**
 * @file Accordion.tsx
 * @description Componente de Acordeón Nivelado (SSoT). Refactorizado para importar
 *              el tipo `FaqItem` directamente desde su SSoT en el schema y utilizar
 *              el logger isomórfico.
 * @version 4.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";
import { logger } from "@/lib/logging";
// --- INICIO DE CORRECCIONES Y MEJORAS ---
// Se importa directamente el tipo `FaqItem` desde su SSoT, resolviendo TS2305.
import type { FaqItem } from "@/lib/schemas/components/faq-accordion.schema";
// --- FIN DE CORRECCIONES Y MEJORAS ---

interface AccordionItemProps {
  content: FaqItem;
}

export function AccordionItem({
  content,
}: AccordionItemProps): React.ReactElement {
  logger.trace("Renderizando AccordionItem (Nivelado)", {
    question: content.question,
  });

  const [isOpen, setIsOpen] = useState(false);
  const panelId = React.useId();

  return (
    <div className="border-b border-muted/50">
      <h3>
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
                "h-5 w-5 transform transition-transform duration-300",
                isOpen && "rotate-180"
              )
            )}
            aria-hidden="true"
          />
        </button>
      </h3>
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
// components/data-display/Accordion.tsx
