// app/[locale]/(dev)/cogniread/editor/_components/ArticleEditorForm.tsx
/**
 * @file ArticleEditorForm.tsx
 * @description Componente de presentación para el formulario del editor de artículos.
 * @version 4.1.0 (Type-Safe Casting Removal)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import type { UseFormReturn } from "react-hook-form";
import {
  Button,
  DynamicIcon,
  Card,
  CardContent,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import type { CogniReadArticle } from "@/shared/lib/schemas/cogniread/article.schema";
import { StudyDnaTab, ContentTab, EcosystemTab } from "./tabs";

interface ArticleEditorFormProps {
  form: UseFormReturn<CogniReadArticle>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isPending: boolean;
}

export function ArticleEditorForm({
  form,
  onSubmit,
  isPending,
}: ArticleEditorFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="dna" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dna">ADN del Estudio</TabsTrigger>
              <TabsTrigger value="content">Contenido Multilingüe</TabsTrigger>
              <TabsTrigger value="ecosystem">Ecosistema</TabsTrigger>
            </TabsList>

            <TabsContent value="dna" className="mt-6">
              {/* --- [INICIO DE CORRECCIÓN] --- */}
              {/* El 'casting' inseguro ha sido eliminado. Ahora es type-safe. */}
              <StudyDnaTab form={form} />
              {/* --- [FIN DE CORRECCIÓN] --- */}
            </TabsContent>

            <TabsContent value="content" className="mt-6">
              <ContentTab form={form} />
            </TabsContent>

            <TabsContent value="ecosystem" className="mt-6">
              <EcosystemTab form={form} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <div className="flex justify-end mt-6">
        <Button type="submit" disabled={isPending} size="lg">
          {isPending && (
            <DynamicIcon
              name="LoaderCircle"
              className="mr-2 h-4 w-4 animate-spin"
            />
          )}
          {isPending ? "Guardando..." : "Guardar Cambios en el Artículo"}
        </Button>
      </div>
    </form>
  );
}
// app/[locale]/(dev)/cogniread/editor/_components/ArticleEditorForm.tsx
