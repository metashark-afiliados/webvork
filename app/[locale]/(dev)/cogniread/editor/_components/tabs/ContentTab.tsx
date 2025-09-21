// app/[locale]/(dev)/cogniread/editor/_components/tabs/ContentTab.tsx
/**
 * @file ContentTab.tsx
 * @description Componente de presentación para la pestaña "Contenido Multilingüe".
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import type { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import {
  supportedLocales,
  type Locale,
} from "@/shared/lib/i18n.config";
import type { CogniReadArticle } from "@/shared/lib/schemas/cogniread/article.schema";
import { logger } from "@/shared/lib/logging";

interface ContentTabProps {
  form: UseFormReturn<CogniReadArticle>;
}

export function ContentTab({ form }: ContentTabProps): React.ReactElement {
  logger.trace("[ContentTab] Renderizando formulario de contenido multilingüe.");

  return (
    <Form {...form}>
      <div className="space-y-8">
        <Tabs defaultValue={supportedLocales[0]} className="w-full">
          <TabsList>
            {supportedLocales.map((locale) => (
              <TabsTrigger key={locale} value={locale}>
                {locale.toUpperCase()}
              </TabsTrigger>
            ))}
          </TabsList>

          {supportedLocales.map((locale: Locale) => (
            <TabsContent key={locale} value={locale} className="mt-6 space-y-6">
              <FormField
                control={form.control}
                name={`content.${locale}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título del Artículo ({locale})</FormLabel>
                    <FormControl>
                      <Input placeholder="El título que se mostrará en el blog..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`content.${locale}.slug`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug (URL) ({locale})</FormLabel>
                    <FormControl>
                      <Input placeholder="ejemplo-de-slug-amigable" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`content.${locale}.summary`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resumen (para vistas previas) ({locale})</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Un resumen corto y atractivo para las tarjetas del blog..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`content.${locale}.body`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cuerpo del Artículo (Markdown) ({locale})</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Escribe el contenido completo del artículo aquí. Puedes usar Markdown."
                        className="min-h-[300px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Form>
  );
}
// app/[locale]/(dev)/cogniread/editor/_components/tabs/ContentTab.tsx
