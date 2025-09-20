// RUTA: app/[locale]/(dev)/raz-prompts/page.tsx
/**
 * @file page.tsx
 * @description Página principal de élite para la Bóveda de RaZPrompts, con
 *              animación, resiliencia y cumplimiento holístico de la Directiva 026.
 * @version 7.0.0 (Holistic Elite Compliance & MEA/UX)
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n.config";
import { logger } from "@/lib/logging";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Container,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui";
import { DeveloperErrorDisplay } from "@/components/dev";
import { SectionAnimator } from "@/components/layout/SectionAnimator";
import { PromptCreator, PromptVault } from "./_components";
import { notFound } from "next/navigation";

interface RaZPromptsHomePageProps {
  params: { locale: Locale };
}

export default async function RaZPromptsHomePage({ params: { locale } }: RaZPromptsHomePageProps) {
  logger.info("[RaZPromptsHomePage] Renderizando v7.0 (Elite Compliance).");

  const { dictionary, error } = await getDictionary(locale);

  // SSoT de contenido para cada aparato
  const pageContent = dictionary.razPromptsHomePage;
  const promptCreatorContent = dictionary.promptCreator;
  const promptVaultContent = dictionary.promptVault;

  // --- Pilar III: Guardia de Resiliencia Robusta ---
  if (error || !pageContent || !promptCreatorContent || !promptVaultContent) {
    const errorMessage = "Fallo al cargar el contenido i18n para la página principal de RaZPrompts.";
    logger.error(`[RaZPromptsHomePage] ${errorMessage}`, { error });
    if (process.env.NODE_ENV === "production") {
      return notFound();
    }
    return (
      <DeveloperErrorDisplay
        context="RaZPromptsHomePage"
        errorMessage={errorMessage}
        errorDetails={error || "Una o más claves (razPromptsHomePage, promptCreator, promptVault) faltan en el diccionario."}
      />
    );
  }

  return (
    <>
      <SectionAnimator>
        {/* Pilar V: Adherencia al Contrato de PageHeader */}
        <PageHeader content={pageContent} />
        <Container className="py-12">
          <Tabs defaultValue="vault">
            <TabsList className="grid w-full grid-cols-2 md:w-[400px] mb-8">
              {/* Pilar I: Cero Texto Hardcodeado */}
              <TabsTrigger value="create">{pageContent.createPromptTab}</TabsTrigger>
              <TabsTrigger value="vault">{pageContent.viewVaultTab}</TabsTrigger>
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
      </SectionAnimator>
    </>
  );
}
