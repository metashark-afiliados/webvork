// components/layout/SectionRenderer.tsx
/**
 * @file SectionRenderer.tsx
 * @description Motor de renderizado inteligente y resiliente. Ahora es consciente
 *              del "Modo Enfoque", pasando las props necesarias de foco y ref a
 *              las secciones hijas para habilitar el resaltado y scroll sincronizado.
 * @version 4.0.0 (Focus Mode Ready & Elite Leveling)
 * @author RaZ Podestá - MetaShark Tech
 */
import * as React from "react";
import { sectionsConfig, type SectionName } from "@/lib/config/sections.config";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { Locale } from "@/lib/i18n.config";
import { ValidationError } from "@/components/ui/ValidationError";

/**
 * @interface SectionRendererProps
 * @description Contrato de props para el motor de renderizado, ahora incluyendo
 *              las propiedades para gestionar el "Modo Enfoque".
 */
interface SectionRendererProps {
  sections: { name: string }[];
  dictionary: Dictionary;
  locale: Locale;
  /** El `name` de la sección que tiene el foco actualmente en el editor. */
  focusedSection: string | null;
  /** Un objeto ref mutable para almacenar las referencias a los nodos DOM de cada sección. */
  sectionRefs: React.MutableRefObject<Record<string, HTMLElement>>;
}

export function SectionRenderer({
  sections,
  dictionary,
  locale,
  focusedSection,
  sectionRefs,
}: SectionRendererProps): React.ReactElement {
  logger.info(
    "[SectionRenderer v4.0] Ensamblando página (Focus Mode Ready)..."
  );

  return (
    <>
      {sections.map((section, index) => {
        const sectionName = section.name as SectionName;
        const config = sectionsConfig[sectionName];

        if (!config) {
          logger.warn(
            `[SectionRenderer] Configuración para sección "${sectionName}" no encontrada. Se omitirá.`
          );
          return null;
        }

        const { component: Component, dictionaryKey, schema } = config;
        const contentData = dictionary[dictionaryKey as keyof Dictionary];

        const validation = schema.safeParse(contentData);

        if (!validation.success) {
          return (
            <ValidationError
              key={`${sectionName}-${index}-error`}
              sectionName={sectionName}
              error={validation.error}
            />
          );
        }

        // Determina si esta sección específica es la que tiene el foco.
        const isFocused = sectionName === focusedSection;

        const componentProps = {
          content: validation.data,
          locale: locale,
          isFocused, // Pasa el estado de foco a la sección.
          // Pasa una función de callback para la ref. Cuando el componente se monte,
          // registrará su nodo DOM en el objeto `sectionRefs` del LivePreviewCanvas.
          ref: (el: HTMLElement | null) => {
            if (el) {
              sectionRefs.current[sectionName] = el;
            } else {
              delete sectionRefs.current[sectionName];
            }
          },
        };

        logger.trace(
          `[SectionRenderer] Renderizando sección #${index + 1}: ${sectionName} (Focused: ${isFocused})`
        );

        // Se usa `as any` como una aserción de tipo controlada, ya que TypeScript
        // no puede inferir que el 'ref' en un componente forwardRef es compatible
        // con la prop `ref` que estamos pasando. La lógica es segura.
        return (
          <Component
            key={`${sectionName}-${index}`}
            {...(componentProps as any)}
          />
        );
      })}
    </>
  );
}
// components/layout/SectionRenderer.tsx
