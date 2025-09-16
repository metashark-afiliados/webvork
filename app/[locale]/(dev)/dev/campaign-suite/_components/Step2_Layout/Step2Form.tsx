// app/[locale]/(dev)/dev/campaign-suite/_components/Step2_Layout/Step2Form.tsx
/**
 * @file Step2Form.tsx
 * @description Componente de Presentación Puro para la UI del Paso 2 (Layout).
 *              v3.0.0: Integra el componente LayoutBuilder funcional.
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
} from "@/components/ui";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { LayoutConfigItem } from "../../_types/draft.types";
import { LayoutBuilder } from "./LayoutBuilder";

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
  logger.info("Renderizando Step2Form (Presentación Pura)");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
        <CardDescription>{content.layoutBuilderDescription}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-10">
        <LayoutBuilder
          initialLayout={layoutConfig}
          onLayoutChange={onLayoutChange}
          content={{
            libraryTitle: content.libraryTitle,
            canvasTitle: content.canvasTitle,
          }}
        />
        <div className="flex justify-between items-center pt-6 border-t">
          <Button variant="ghost" onClick={onBack}>
            Retroceder
          </Button>
          <Button onClick={onNext}>Guardar y Continuar</Button>
        </div>
      </CardContent>
    </Card>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step2_Layout/Step2Form.tsx
