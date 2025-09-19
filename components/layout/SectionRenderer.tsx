// RUTA: components/layout/SectionRenderer.tsx

/**
 * @file SectionRenderer.tsx
 * @description Motor de renderizado de élite. Orquesta el renderizado de secciones,
 *              la validación de datos contra schemas, la gestión de errores i18n
 *              y la animación en cascada de entrada (MEA/UX).
 * @version 8.0.0 (Holistic Refactor & MEA Animation Engine)
 * @author RaZ Podestá - MetaShark Tech
 */
import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { sectionsConfig, type SectionName } from "@/lib/config/sections.config";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { Locale } from "@/lib/i18n.config";
import { ValidationError } from "@/components/ui/ValidationError";

interface SectionRendererProps {
  sections: { name?: string | undefined }[];
  dictionary: Dictionary;
  locale: Locale;
  focusedSection?: string | null;
  sectionRefs?: React.MutableRefObject<Record<string, HTMLElement>>;
}

// Variante de animación que cada sección (o error) utilizará para responder
// al `staggerChildren` del componente `Container` padre.
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // Curva de easing profesional
    },
  },
};

export function SectionRenderer({
  sections,
  dictionary,
  locale,
  focusedSection = null,
  sectionRefs,
}: SectionRendererProps): React.ReactElement {
  logger.info(
    "[SectionRenderer v8.0] Ensamblando página con motor de animación MEA."
  );

  const validSections = sections.filter(
    (section): section is { name: string } => {
      if (typeof section.name === "string" && section.name.length > 0) {
        return true;
      }
      logger.warn(
        `[SectionRenderer] Se ha omitido una sección inválida del layout (sin nombre).`,
        { sectionData: section }
      );
      return false;
    }
  );

  return (
    <>
      {validSections.map((section, index) => {
        const sectionName = section.name as SectionName;
        const config = sectionsConfig[sectionName];

        if (!config) {
          logger.warn(
            `[SectionRenderer] Configuración para sección "${sectionName}" no encontrada. Se omitirá.`
          );
          return null;
        }

        const { component: Component, dictionaryKey, schema } = config;

        if (
          typeof dictionaryKey !== "string" ||
          !(dictionaryKey in dictionary)
        ) {
          logger.warn(
            `[SectionRenderer] La clave de diccionario "${String(
              dictionaryKey
            )}" no es válida o no existe.`
          );
          return null;
        }
        const contentData = dictionary[dictionaryKey as keyof Dictionary];

        const validation = schema.safeParse(contentData);

        if (!validation.success) {
          // El componente de error también participa en la animación en cascada.
          return (
            dictionary.validationError && (
              <motion.div key={`${sectionName}-${index}-error`} variants={sectionVariants}>
                <ValidationError
                  sectionName={sectionName}
                  error={validation.error}
                  content={dictionary.validationError}
                />
              </motion.div>
            )
          );
        }

        const componentProps = {
          content: validation.data,
          locale: locale,
          isFocused: sectionName === focusedSection,
          ref: (el: HTMLElement | null) => {
            if (sectionRefs && el) {
              sectionRefs.current[sectionName] = el;
            } else if (sectionRefs) {
              delete sectionRefs.current[sectionName];
            }
          },
        };

        logger.trace(
          `[SectionRenderer] Renderizando sección #${index + 1}: ${sectionName}`
        );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const WrappedComponent = (props: any) => (
          <motion.div variants={sectionVariants}>
            <Component {...props} />
          </motion.div>
        );

        return (
          <WrappedComponent
            key={`${sectionName}-${index}`}
            {...componentProps}
          />
        );
      })}
    </>
  );
}
