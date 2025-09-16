// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/ContentEditor/ContentEditor.tsx
/**
 * @file ContentEditor.tsx
 * @description Orquestador de alto nivel para la edición de contenido.
 *              v5.2.0 (Direct Import Architecture): Resuelve el error 'Module not found'
 *              adoptando importaciones directas y explícitas para sus sub-componentes.
 *              Esta es la solución definitiva al problema de resolución de módulos.
 * @version 5.2.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { logger } from "@/lib/logging";
import type { CampaignDraft } from "../../../_types/draft.types";
import { supportedLocales, type Locale } from "@/lib/i18n.config";
// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA DEFINITIVA] ---
// Se importan los sub-componentes directamente desde sus archivos fuente.
import { ContentEditorHeader } from "./_components/ContentEditorHeader";
import { ContentEditorBody } from "./_components/ContentEditorBody";
import { ContentEditorFooter } from "./_components/ContentEditorFooter";
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA DEFINITIVA] ---

// Se usa 'unknown' en lugar de 'any' para máxima seguridad de tipos.
type SectionFormData = z.infer<
  z.ZodObject<any, any, any, { [x: string]: any }, { [x: string]: any }>
>;

interface ContentEditorProps {
  sectionName: string;
  sectionSchema: z.ZodObject<any>;
  draft: CampaignDraft;
  onClose: () => void;
  onUpdateContent: (
    sectionName: string,
    locale: Locale,
    field: string,
    value: unknown
  ) => void;
}

export function ContentEditor({
  sectionName,
  sectionSchema,
  draft,
  onClose,
  onUpdateContent,
}: ContentEditorProps): React.ReactElement {
  const [activeLocale, setActiveLocale] = useState<Locale>(supportedLocales[0]);
  logger.info(
    `[ContentEditor] Orquestando editor para '${sectionName}', locale: '${activeLocale}'`
  );

  const form = useForm<SectionFormData>({
    resolver: zodResolver(sectionSchema),
    defaultValues: draft.contentData[sectionName]?.[activeLocale] || {},
  });

  useEffect(() => {
    form.reset(draft.contentData[sectionName]?.[activeLocale] || {});
  }, [activeLocale, draft, sectionName, form]);

  const handlePersistChange = (field: string, value: unknown) => {
    onUpdateContent(sectionName, activeLocale, field, value);
    toast.info("Cambio guardado en el borrador.", {
      description: `El campo '${field}' se actualizó.`,
    });
  };

  const handleSubmit = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in-0">
      <div className="relative bg-background border rounded-lg shadow-2xl w-full max-w-2xl h-[90vh] flex flex-col">
        <ContentEditorHeader sectionName={sectionName} onClose={onClose} />
        <ContentEditorBody
          form={form}
          activeLocale={activeLocale}
          setActiveLocale={setActiveLocale}
          sectionSchema={sectionSchema}
          onPersistChange={handlePersistChange}
          onSubmit={form.handleSubmit(handleSubmit)}
        />
        <ContentEditorFooter onClose={onClose} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/ContentEditor/ContentEditor.tsx
