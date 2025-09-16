// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/ContentEditor.tsx
/**
 * @file ContentEditor.tsx
 * @description Editor de contenido dinámico.
 *              v3.0.0 (Schema-Aware): Refactorizado para usar SchemaFieldRenderer,
 *              renderizando el control de UI apropiado para cada tipo de dato.
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { logger } from "@/lib/logging";
import type { CampaignDraft } from "../../_types/draft.types";
import { supportedLocales, type Locale } from "@/lib/i18n.config";
import {
  Button,
  Form,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  DynamicIcon,
} from "@/components/ui";
import { SchemaFieldRenderer } from "./SchemaFieldRenderer"; // <-- Importar el nuevo renderer

interface ContentEditorProps {
  sectionName: string;
  sectionSchema: z.ZodObject<any>;
  draft: CampaignDraft;
  onClose: () => void;
  onUpdateContent: (
    sectionName: string,
    locale: Locale,
    field: string,
    value: any
  ) => void;
}

export function ContentEditor({
  sectionName,
  sectionSchema,
  draft,
  onClose,
  onUpdateContent,
}: ContentEditorProps) {
  logger.info(`Renderizando ContentEditor para la sección: ${sectionName}`);
  const [activeLocale, setActiveLocale] = useState<Locale>(supportedLocales[0]);

  const form = useForm({
    resolver: zodResolver(sectionSchema),
    defaultValues: draft.contentData[sectionName]?.[activeLocale] || {},
  });

  // Sincroniza el formulario cuando cambia el locale o el borrador
  useEffect(() => {
    form.reset(draft.contentData[sectionName]?.[activeLocale] || {});
  }, [activeLocale, draft, sectionName, form]);

  const handleUpdateAndPersist = (field: string, value: any) => {
    onUpdateContent(sectionName, activeLocale, field, value);
  };

  const onSubmit = (data: any) => {
    logger.success(
      `[ContentEditor] Cambios guardados para ${sectionName} [${activeLocale}]`
    );
    toast.success(
      `Contenido para "${sectionName}" guardado en [${activeLocale}].`
    );
    onClose();
  };

  const fieldsToRender = Object.keys(sectionSchema.shape);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in-0">
      <div className="relative bg-background border rounded-lg shadow-2xl w-full max-w-2xl h-[90vh] flex flex-col">
        <header className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Editando Contenido:{" "}
            <span className="text-primary">{sectionName}</span>
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <DynamicIcon name="X" className="h-4 w-4" />
            <span className="sr-only">Cerrar editor</span>
          </Button>
        </header>
        <div className="flex-grow overflow-y-auto p-6 pr-4">
          <Tabs
            defaultValue={activeLocale}
            onValueChange={(v) => setActiveLocale(v as Locale)}
            className="w-full"
          >
            <TabsList>
              {supportedLocales.map((locale) => (
                <TabsTrigger key={locale} value={locale}>
                  {locale.toUpperCase()}
                </TabsTrigger>
              ))}
            </TabsList>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
                <div className="space-y-4">
                  {fieldsToRender.map((fieldName) => (
                    <SchemaFieldRenderer
                      key={`${activeLocale}-${fieldName}`}
                      control={form.control}
                      fieldName={fieldName}
                      fieldSchema={sectionSchema.shape[fieldName]}
                      currentValue={
                        draft.contentData[sectionName]?.[activeLocale]?.[
                          fieldName
                        ]
                      }
                      onValueChange={handleUpdateAndPersist}
                    />
                  ))}
                </div>
              </form>
            </Form>
          </Tabs>
        </div>
        <footer className="p-4 border-t flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)}>
            Guardar y Cerrar
          </Button>
        </footer>
      </div>
    </div>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/ContentEditor.tsx
