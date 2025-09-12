// src/components/data-display/Accordion.tsx
/**
 * @file Accordion.tsx
 * @description Aparato de UI atómico para un item de acordeón individual.
 *              Permite mostrar y ocultar contenido de forma interactiva.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

/**
 * @interface AccordionItemProps
 * @description Define el contrato de propiedades para el componente AccordionItem.
 */
interface AccordionItemProps {
  /**
   * @param title El texto que siempre es visible y actúa como el botón para expandir/colapsar.
   */
  title: string;
  /**
   * @param children El contenido que se muestra cuando el acordeón está expandido.
   */
  children: React.ReactNode;
}

/**
 * @component AccordionItem
 * @description Renderiza un único panel expandible/colapsable. Es un componente
 *              cliente que gestiona su propio estado de visibilidad.
 * @param {AccordionItemProps} props - Las propiedades para renderizar el item.
 * @returns {React.ReactElement} El elemento JSX del item de acordeón.
 */
export function AccordionItem({
  title,
  children,
}: AccordionItemProps): React.ReactElement {
  console.log(`[Observabilidad] Renderizando AccordionItem (Título: ${title})`);
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
          <span>{title}</span>
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
            <div className="pb-4 pr-8 text-muted-foreground">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
// src/components/data-display/Accordion.tsx
