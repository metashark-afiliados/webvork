// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/ContentEditor/ContentEditorBody.tsx
/**
 * @file ContentEditorBody.tsx
 * @description Aparato de presentación atómico para el cuerpo del editor.
 *              v1.3.0 (Architectural Migration): Se actualiza la ruta de
 *              importación de SchemaFieldRenderer.
 * @version 1.3.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { supportedLocales, type Locale } from "@/lib/i18n.config";
import { Form, Tabs, TabsList, TabsTrigger } from "@/components/ui";
import { SchemaFieldRenderer } from "@/components/forms/builder";
import { logger } from "@/lib/logging";

type SectionFormData = z.infer<z.ZodObject<any>>;

interface ContentEditorBodyProps {
  form: ReturnType<typeof useForm<SectionFormData>>;
  activeLocale: Locale;
  setActiveLocale: (locale: Locale) => void;
  sectionSchema: z.ZodObject<any>;
  onPersistChange: (field: string, value: unknown) => void;
  onSubmit: () => void;
}

export function ContentEditorBody({
  form,
  activeLocale,
  setActiveLocale,
  sectionSchema,
  onPersistChange,
  onSubmit,
}: ContentEditorBodyProps): React.ReactElement {
  logger.trace(`[ContentEditorBody] Renderizando para locale: ${activeLocale}`);
  const fieldsToRender = Object.keys(sectionSchema.shape);

  return (
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
            <div className="space-y-6">
              {fieldsToRender.map((fieldName) => (
                <SchemaFieldRenderer
                  key={`${activeLocale}-${fieldName}`}
                  control={form.control}
                  fieldName={fieldName}
                  fieldSchema={sectionSchema.shape[fieldName]}
                  onValueChange={onPersistChange}
                />
              ))}
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/ContentEditor/ContentEditorBody.tsx
