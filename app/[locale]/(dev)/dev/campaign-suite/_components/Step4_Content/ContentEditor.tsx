// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/ContentEditor.tsx
/**
 * @file ContentEditor.tsx
 * @description Editor de contenido dinámico.
 *              v2.3.0: Corregida la importación de tipos para apuntar a la SSoT atomizada.
 * @version 2.3.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { logger } from "@/lib/logging";
// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
import type { CampaignDraft } from "../../_types/draft.types";
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---
import { supportedLocales, type Locale } from "@/lib/i18n.config";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Textarea } from "@/components/ui/Textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import DynamicIcon from "@/components/ui/DynamicIcon";

interface ContentEditorProps {
  sectionName: string;
  sectionSchema: z.ZodObject<any>;
  draft: CampaignDraft;
  onClose: () => void;
  onUpdateContent: (locale: Locale, field: string, value: any) => void;
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

  const onSubmit = (data: any) => {
    logger.success(
      `[ContentEditor] Datos validados para ${sectionName} [${activeLocale}]:`,
      data
    );
    Object.entries(data).forEach(([field, value]) => {
      onUpdateContent(activeLocale, field, value as unknown);
    });
    toast.success(
      `Contenido para "${sectionName}" guardado en [${activeLocale}].`
    );
  };

  const handleTabChange = (value: string) => {
    setActiveLocale(value as Locale);
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
          <Tabs defaultValue={activeLocale} onValueChange={handleTabChange}>
            <TabsList>
              {supportedLocales.map((locale) => (
                <TabsTrigger key={locale} value={locale}>
                  {locale.toUpperCase()}
                </TabsTrigger>
              ))}
            </TabsList>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
                {supportedLocales.map((locale) => (
                  <TabsContent key={locale} value={locale} forceMount>
                    <div className="space-y-4">
                      {fieldsToRender.map((fieldName) => (
                        <FormField
                          key={`${locale}-${fieldName}`}
                          control={form.control}
                          name={fieldName}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="capitalize">
                                {fieldName.replace(/([A-Z])/g, " $1")}
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder={`Contenido para ${fieldName} en ${locale.toUpperCase()}`}
                                  {...field}
                                  onBlur={(e) => {
                                    field.onBlur();
                                    onUpdateContent(
                                      locale,
                                      fieldName,
                                      e.target.value
                                    );
                                  }}
                                  className="min-h-[80px]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </form>
            </Form>
          </Tabs>
        </div>
        <footer className="p-4 border-t flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)}>Guardar Cambios</Button>
        </footer>
      </div>
    </div>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step4_Content/ContentEditor.tsx
