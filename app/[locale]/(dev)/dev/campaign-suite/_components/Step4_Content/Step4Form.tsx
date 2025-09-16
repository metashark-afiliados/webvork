// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/Step4Form.tsx
/**
 * @file Step4Form.tsx
 * @description Componente de Presentación Puro para la UI del Paso 4 (Contenido).
 *              v4.1.0: Corregida la importación de tipos, tipado explícito en `map`
 *              para resolver el error `any` implícito.
 * @version 4.1.0
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
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
import type { CampaignDraft, LayoutConfigItem } from "../../_types/draft.types";
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---
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
  onUpdateContent: (locale: Locale, field: string, value: any) => void;
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
  logger.info("Renderizando Step4Form (Presentación Pura)");

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
            // --- [INICIO DE CORRECCIÓN DE TIPO] ---
            draft.layoutConfig.map((section: LayoutConfigItem) => (
              // --- [FIN DE CORRECCIÓN DE TIPO] ---
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
              {isPending
                ? "Generando Activos..."
                : "Finalizar y Generar Activos"}
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
          onUpdateContent={onUpdateContent}
        />
      )}
    </>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/Step4Form.tsx
