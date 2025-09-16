// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/components/SectionList.tsx
/**
 * @file SectionList.tsx
 * @description Aparato de presentación atómico para mostrar la lista de secciones
 *              en el layout de la campaña.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import { Button, DynamicIcon } from "@/components/ui";
import type { LayoutConfigItem } from "../../../_types/draft.types";
import { logger } from "@/lib/logging";

interface SectionListProps {
  layoutConfig: LayoutConfigItem[];
  onEditSection: (sectionName: string) => void;
}

export function SectionList({
  layoutConfig,
  onEditSection,
}: SectionListProps): React.ReactElement {
  logger.trace("[SectionList] Renderizando lista de secciones del layout.");

  return (
    <div className="space-y-4 mb-10">
      {layoutConfig.length > 0 ? (
        layoutConfig.map((section) => (
          <div
            key={section.name}
            className="flex items-center justify-between p-4 border rounded-lg bg-muted/20"
          >
            <div className="flex items-center gap-3">
              <DynamicIcon
                name="GripVertical"
                className="h-5 w-5 text-muted-foreground"
              />
              <span className="font-medium text-foreground">
                {section.name}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEditSection(section.name)}
            >
              <DynamicIcon name="Pencil" className="mr-2 h-4 w-4" />
              Editar Contenido
            </Button>
          </div>
        ))
      ) : (
        <div className="text-center py-12 border border-dashed rounded-lg">
          <p className="text-muted-foreground">
            No hay secciones en el layout.
            <br />
            Vuelve al Paso 2 para añadir secciones a tu campaña.
          </p>
        </div>
      )}
    </div>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/components/SectionList.tsx
