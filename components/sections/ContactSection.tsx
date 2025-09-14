// components/sections/ContactSection.tsx
/**
 * @file ContactSection.tsx
 * @description Sección de Contacto. Orquestador que compone la información
 *              de contacto y el formulario atómico.
 *              - v3.1.0 (Build Stability Fix): Estandariza la ruta de importación
 *                a `@/components/ui/*` para resolver errores de build.
 * @version 3.1.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { Container } from "@/components/ui/Container";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { ContactForm } from "@/forms/ContactForm";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/schemas/i18n.schema";
import type { ContactInfoItem } from "@/schemas/components/contact-section.schema";

interface ContactSectionProps {
  content?: Dictionary["contactSection"];
}

export const ContactSection = ({
  content,
}: ContactSectionProps): React.ReactElement | null => {
  logger.info("[Observabilidad] Renderizando ContactSection (Orquestador)");

  if (!content) {
    logger.warn(
      "[ContactSection] No se proporcionó contenido. La sección no se renderizará."
    );
    return null;
  }

  const { eyebrow, title, description, contactInfo, form } = content;

  return (
    <section id="contact" className="py-24 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-4">
              <h2 className="text-lg text-primary mb-2 tracking-wider">
                {eyebrow}
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold">{title}</h3>
            </div>
            <p className="mb-8 text-muted-foreground lg:w-5/6">{description}</p>

            <div className="flex flex-col gap-4">
              {contactInfo.map((info: ContactInfoItem) => (
                <div key={info.label} className="flex items-center gap-4">
                  <DynamicIcon
                    name={info.iconName}
                    className="h-6 w-6 text-primary"
                  />
                  <div>
                    <p className="font-semibold text-foreground">
                      {info.label}
                    </p>
                    <p className="text-muted-foreground">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ContactForm content={form} />
        </div>
      </Container>
    </section>
  );
};
