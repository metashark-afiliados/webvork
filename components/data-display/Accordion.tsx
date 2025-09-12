// components/layout/sections/faq.tsx
/**
 * @file faq.tsx
 * @description Sección de FAQ. Refactorizada para usar el componente AccordionItem
 *              nivelado y consumir datos desde el diccionario i18n.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { AccordionItem } from "@/components/data-display/Accordion"; // <<-- CORRECCIÓN #1: Ruta de importación corregida.
import { clientLogger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

// <<-- CORRECCIÓN #2: Se elimina la lista hardcodeada `FAQList`.

interface FAQSectionProps {
  // <<-- CORRECCIÓN #3: Se define un contrato de props basado en el diccionario.
  content: Dictionary["faqAccordion"];
}

export const FAQSection = ({
  content,
}: FAQSectionProps): React.ReactElement | null => {
  clientLogger.info("Renderizando FAQSection (Nivelada)");

  // Guarda de seguridad: si no hay contenido, no se renderiza la sección.
  if (!content) {
    clientLogger.warn(
      "[FAQSection] No se proporcionó contenido. La sección no se renderizará."
    );
    return null;
  }

  const { title, faqs } = content;

  return (
    <section id="faq" className="container md:w-[700px] py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          FAQS
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold">{title}</h2>
      </div>

      {/* 
        El componente `Accordion` de Radix ya no es necesario aquí.
        Simplemente renderizamos una lista de nuestros `AccordionItem` autocontenidos.
      */}
      <div className="space-y-2">
        {faqs.map((faqItem) => (
          // <<-- CORRECCIÓN #4: Se utiliza nuestro componente y se le pasa la prop `content`.
          <AccordionItem key={faqItem.question} content={faqItem} />
        ))}
      </div>
    </section>
  );
};
// components/layout/sections/faq.tsx
