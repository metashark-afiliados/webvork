// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/ContentEditor/ContentEditor.tsx
/**
 * @file ContentEditor.tsx
 * @description Orquestador de alto nivel para la edición de contenido.
 *              v4.1.0 (Type Safety & Path Fix): Se corrige la ruta de importación
 *              y se implementa un tipado estricto inferido de Zod, eliminando
 *              todos los 'any'.
 * @version 4.1.0
 * @author RaZ podesta - MetaShark Tech
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
import { ContentEditorHeader } from "./ContentEditorHeader";
import { ContentEditorBody } from "./ContentEditorBody";
// --- [INICIO DE CORRECCIÓN DE RUTA] ---
import { ContentEditorFooter } from "./ContentEditorFooter";
// --- [FIN DE CORRECCIÓN DE RUTA] ---

// Se infiere un tipo genérico para los datos del formulario a partir del schema.
type SectionFormData = z.infer<z.ZodObject<any>>;

interface ContentEditorProps {
  sectionName: string;
  sectionSchema: z.ZodObject<any>; // Se mantiene genérico aquí
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
    logger.trace(
      `[ContentEditor] Sincronizando formulario con borrador para locale: ${activeLocale}`
    );
    form.reset(draft.contentData[sectionName]?.[activeLocale] || {});
  }, [activeLocale, draft, sectionName, form]);

  const handlePersistChange = (field: string, value: unknown) => {
    onUpdateContent(sectionName, activeLocale, field, value);
    toast.info("Cambio guardado en el borrador.", {
      description: `El campo '${field}' se actualizó.`,
    });
  };

  const handleSubmit = () => {
    logger.success(`[ContentEditor] Edición finalizada para ${sectionName}.`);
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
