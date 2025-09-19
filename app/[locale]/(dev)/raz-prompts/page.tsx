// app/[locale]/(dev)/raz-prompts/page.tsx
/**
 * @file page.tsx
 * @description Página principal para la Bóveda de RaZPrompts.
 * @version 6.0.0 (Developer Error Overlay): Implementa el escudo de resiliencia
 *              para mostrar errores de carga de datos en modo desarrollo.
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Container,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui";
import { DeveloperErrorDisplay } from "@/components/dev"; // <-- IMPORTAR NUEVO COMPONENTE
import { PromptCreator, PromptVault } from "./_components";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n.config";
import { logger } from "@/lib/logging";

export default async function RaZPromptsHomePage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  logger.info("[Observabilidad] Renderizando RaZPromptsHomePage v6.0");

  const { dictionary, error } = await getDictionary(locale);

  if (error) {
    const errorMessage = "Fallo CRÍTICO al cargar el diccionario base.";
    logger.error(`[RaZPromptsHomePage] ${errorMessage}`, { error });
    if (process.env.NODE_ENV === "development") {
      return (
        <DeveloperErrorDisplay
          context="RaZPromptsHomePage"
          errorMessage={errorMessage}
          errorDetails={error}
        />
      );
    }
    return notFound();
  }

  const promptCreatorContent = dictionary.promptCreator;
  const promptVaultContent = dictionary.promptVault;

  if (!promptCreatorContent || !promptVaultContent) {
    const errorMessage =
      "Contenido para 'promptCreator' o 'promptVault' no encontrado en el diccionario.";
    logger.error(`[RaZPromptsHomePage] ${errorMessage}`);
    if (process.env.NODE_ENV === "development") {
      return (
        <DeveloperErrorDisplay
          context="RaZPromptsHomePage"
          errorMessage={errorMessage}
          errorDetails="Verifica que las claves 'promptCreator' y 'promptVault' existan en tus archivos .i18n.json y estén incluidas en i18n.schema.ts. Ejecuta 'pnpm build:i18n' para refrescar."
        />
      );
    }
    return notFound();
  }

  return (
    <>
      <PageHeader
        title="RaZPrompts: Bóveda de Conocimiento Generativo"
        subtitle="El laboratorio para crear, catalogar y versionar el genoma de tus activos visuales."
      />
      <Container className="py-12">
        <Tabs defaultValue="vault">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px] mb-8">
            <TabsTrigger value="create">Crear Prompt</TabsTrigger>
            <TabsTrigger value="vault">Ver Bóveda</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <PromptCreator content={promptCreatorContent} />
          </TabsContent>

          <TabsContent value="vault">
            <PromptVault
              content={promptCreatorContent}
              vaultContent={promptVaultContent}
            />
          </TabsContent>
        </Tabs>
      </Container>
    </>
  );
}
// app/[locale]/(dev)/raz-prompts/page.tsx
