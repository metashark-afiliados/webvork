// src/components/layout/SectionRenderer.tsx
/**
 * @file SectionRenderer.tsx
 * @description Componente de renderizado dinámico. Actúa como una fábrica que
 *              consulta el registro de secciones y renderiza el componente
 *              apropiado, adhiriéndose al Principio Abierto/Cerrado.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/components/layout/SectionRenderer.md
 */
import React from "react";
import { type SectionName, sectionsConfig } from "@/lib/config/sections.config";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import { clientLogger } from "@/lib/logging";

interface SectionRendererProps {
  sectionName: SectionName;
  dictionary: Dictionary;
  locale: string;
}

export function SectionRenderer({
  sectionName,
  dictionary,
  locale,
}: SectionRendererProps): React.ReactElement | null {
  // 1. Consultar el registro para obtener la configuración de la sección.
  const config = sectionsConfig[sectionName];

  if (!config) {
    clientLogger.warn(
      `[SectionRenderer] No se encontró configuración para la sección "${sectionName}". No se renderizará.`
    );
    return null;
  }

  const { component: ComponentToRender, dictionaryKey } = config;

  // 2. Extraer los datos específicos para este componente del diccionario.
  const componentProps = dictionary[dictionaryKey];

  // 3. Renderizar el componente solo si sus datos existen.
  if (componentProps) {
    // Para casos especiales como TestimonialGrid u OrderSection, que tienen una
    // estructura de props anidada, los renombramos para que coincidan con lo que
    // el componente espera. Se podría mejorar en el futuro.
    const propsToPass = {
      content: componentProps, // Prop genérica para la mayoría de los componentes
      ...componentProps, // Desestructurar para componentes que esperan props de nivel superior
      locale: locale, // Pasar el locale a todos por consistencia.
    };

    return <ComponentToRender {...propsToPass} />;
  }

  // Si no hay datos para esta sección en el diccionario, no se renderiza.
  return null;
}
// src/components/layout/SectionRenderer.tsx
