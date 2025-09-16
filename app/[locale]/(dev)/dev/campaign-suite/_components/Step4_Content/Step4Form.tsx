// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/Step4Form.tsx
/**
 * @file Step4Form.tsx
 * @description Componente de Presentación Puro para la UI del Paso 4 (Contenido).
 *              v4.2.0: Sincroniza la firma de la prop 'onUpdateContent' con la del
 *              ContentEditor para resolver el conflicto de tipos TS2322.
 * @version 4.2.0
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
  DynamicIcon,
} from "@/components/ui";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { CampaignDraft, LayoutConfigItem } from "../../_types/draft.types";
import type { Locale } from "@/lib/i18n.config";
import { sectionsConfig } from "@/lib/config/sections.config";
import { ContentEditor } from "./ContentEditor";

type Step4Content = NonNullable<Dictionary["campaignSuitePage"]>["step4"];

interface Step4FormProps {
  content: Step4Content;
  draft: CampaignDraft;
  onEditSection: (sectionName: string) => void;
  onCloseEditor: () => void;
  editingSection: string | null;
  // --- [INICIO DE CORRECCIÓN DE CONTRATO] ---
  // La firma ahora es idéntica a la que espera ContentEditor.
  onUpdateContent: (
    sectionName: string,
    locale: Locale,
    field: string,
    value: any
  ) => void;
  // --- [FIN DE CORRECCIÓN DE CONTRATO] ---
  onBack: () => void;
  onNext: () => void;
  isPending: boolean;
}

export function Step4Form({
  content,
  draft,
  onEditSection,
  onCloseEditor,
  editingSection,
  onUpdateContent,
  onBack,
  onNext,
  isPending,
}: Step4FormProps): React.ReactElement {
  logger.info(
    "[Step4Form] Renderizando (Presentación Pura, Contrato Corregido)"
  );

  const editingSectionSchema = editingSection
    ? sectionsConfig[editingSection as keyof typeof sectionsConfig]?.schema
    : null;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{content.title}</CardTitle>
          <CardDescription>{content.contentEditorDescription}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {draft.layoutConfig.length > 0 ? (
            draft.layoutConfig.map((section: LayoutConfigItem) => (
              <div
                key={section.name}
                className="flex items-center justify-between p-3 border rounded-md bg-muted/30"
              >
                <span className="font-medium text-foreground">
                  {section.name}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEditSection(section.name)}
                >
                  <DynamicIcon name="Pen" className="mr-2 h-4 w-4" />
                  Editar Contenido
                </Button>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No hay secciones en el layout. Vuelve al Paso 2 para añadirlas.
            </p>
          )}

          <div className="flex justify-between items-center pt-6 border-t">
            <Button variant="ghost" onClick={onBack} disabled={isPending}>
              Retroceder
            </Button>
            <Button onClick={onNext} variant="default" disabled={isPending}>
              {isPending && (
                <DynamicIcon
                  name="LoaderCircle"
                  className="mr-2 h-4 w-4 animate-spin"
                />
              )}
              {isPending ? "Finalizando..." : "Finalizar y Continuar"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {editingSection && editingSectionSchema && (
        <ContentEditor
          sectionName={editingSection}
          sectionSchema={editingSectionSchema}
          draft={draft}
          onClose={onCloseEditor}
          onUpdateContent={onUpdateContent} // Ahora la firma coincide perfectamente.
        />
      )}
    </>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/Step4Form.tsx
