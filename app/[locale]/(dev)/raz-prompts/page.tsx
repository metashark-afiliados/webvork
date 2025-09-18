// app/[locale]/(dev)/raz-prompts/page.tsx
/**
 * @file page.tsx
 * @description Página principal para la Bóveda de RaZPrompts.
 * @version 3.0.0 (Vault Integration & Tabbed UI)
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Container,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui";
import { PromptCreator } from "./_components/PromptCreator";
import { PromptVault } from "./_components/PromptVault"; // <-- NUEVA IMPORTACIÓN
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n.config";
import { logger } from "@/lib/logging";

export default async function RaZPromptsHomePage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const { dictionary } = await getDictionary(locale);
  const content = dictionary.promptCreator; // Reutilizamos este contenido para las etiquetas generales.
  const baviUploaderContent = dictionary.baviUploader;

  if (!content || !baviUploaderContent) {
    logger.error(
      `[RaZPromptsHomePage] Contenido 'promptCreator' o 'baviUploader' no encontrado para locale: ${locale}`
    );
    return <div>Error: Contenido no encontrado para RaZPrompts.</div>;
  }

  return (
    <>
      <PageHeader
        title="RaZPrompts: Bóveda de Conocimiento Generativo"
        subtitle="El laboratorio para crear, catalogar y versionar el genoma de tus activos visuales."
      />
      <Container className="py-12">
        <Tabs defaultValue="create">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px] mb-8">
            <TabsTrigger value="create">Crear Prompt</TabsTrigger>
            <TabsTrigger value="vault">Ver Bóveda</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <PromptCreator content={content} />
          </TabsContent>

          <TabsContent value="vault">
            <PromptVault content={content} />
          </TabsContent>
        </Tabs>
      </Container>
    </>
  );
}
