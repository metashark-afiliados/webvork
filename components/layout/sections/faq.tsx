// components/layout/sections/faq.tsx
/**
 * @file faq.tsx
 * @description Sección de FAQ. Consume el AccordionItem nivelado.
 * @version 2.1.0
 * @author RaZ podesta - MetaShark Tech
 */
import { AccordionItem } from "@/components/data-display/Accordion";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

interface FAQSectionProps {
  content: Dictionary["faqAccordion"];
}

export const FAQSection = ({
  content,
}: FAQSectionProps): React.ReactElement | null => {
  logger.info("Renderizando FAQSection (Nivelada)");

  if (!content) {
    logger.warn(
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
          <AccordionItem key={faqItem.question} content={faqItem} />
        ))}
      </div>
    </section>
  );
};
// components/layout/sections/faq.tsx
