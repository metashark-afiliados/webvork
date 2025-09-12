// components/layout/sections/faq.tsx
/**
 * @file faq.tsx
 * @description Sección de FAQ. Refactorizada para usar el componente AccordionItem
 *              nivelado y consumir datos desde el diccionario i18n.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
// --- CORRECCIÓN CLAVE ---
// Se importa `AccordionItem` desde nuestra versión nivelada en `data-display`.
// Ya NO se importa nada desde `ui/accordion`.
import { AccordionItem } from "@/components/data-display/Accordion";
import { clientLogger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

interface FAQSectionProps {
  content: Dictionary["faqAccordion"];
}

export const FAQSection = ({
  content,
}: FAQSectionProps): React.ReactElement | null => {
  clientLogger.info("Renderizando FAQSection (Nivelada)");

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

      <div className="space-y-2">
        {faqs.map((faqItem) => (
          // Se pasa el objeto de contenido completo al componente nivelado.
          <AccordionItem key={faqItem.question} content={faqItem} />
        ))}
      </div>
    </section>
  );
};
// components/layout/sections/faq.tsx
