// app/[locale]/(dev)/dev/campaign-suite/_components/Step2_Layout/Step2Form.tsx
/**
 * @file Step2Form.tsx
 * @description Componente de Presentación Puro para la UI del Paso 2 (Layout).
 *              v5.0.0 (Holistic Contract Fix): Sincronizado completamente con el
 *              contrato de datos unificado de i18n, resolviendo todos los errores TS2339.
 * @version 5.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { LayoutConfigItem } from "../../_types/draft.types";
import { LayoutBuilder } from "./LayoutBuilder";
import { WizardNavigation } from "../../_components/WizardNavigation";

type Step2Content = NonNullable<Dictionary["campaignSuitePage"]>["step2"];

interface Step2FormProps {
  content: Step2Content;
  layoutConfig: LayoutConfigItem[];
  onLayoutChange: (newLayout: LayoutConfigItem[]) => void;
  onBack: () => void;
  onNext: () => void;
}

export function Step2Form({
  content,
  layoutConfig,
  onLayoutChange,
  onBack,
  onNext,
}: Step2FormProps): React.ReactElement {
  logger.info(
    "[Step2Form] Renderizando formulario de presentación puro (v5.0)."
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
        {/* --- [INICIO DE CORRECCIÓN] --- */}
        <CardDescription>{content.description}</CardDescription>
        {/* --- [FIN DE CORRECCIÓN] --- */}
      </CardHeader>
      <CardContent className="space-y-10">
        <LayoutBuilder
          initialLayout={layoutConfig}
          onLayoutChange={onLayoutChange}
          content={{
            libraryTitle: content.libraryTitle,
            canvasTitle: content.canvasTitle,
            // --- [INICIO DE CORRECCIÓN] ---
            addSectionButtonText: content.addSectionButtonText,
            emptyLibraryText: content.emptyLibraryText,
            emptyCanvasText: content.emptyCanvasText,
            // --- [FIN DE CORRECCIÓN] ---
          }}
        />
        {/* --- [INICIO DE CORRECCIÓN] --- */}
        <WizardNavigation
          onBack={onBack}
          onNext={onNext}
          nextButtonText={content.nextButtonText}
        />
        {/* --- [FIN DE CORRECCIÓN] --- */}
      </CardContent>
    </Card>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step2_Layout/Step2Form.tsx
