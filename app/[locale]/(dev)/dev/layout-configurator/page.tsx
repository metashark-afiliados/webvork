// app/[locale]/(dev)/dev/layout-configurator/page.tsx
/**
 * @file page.tsx
 * @description Página del configurador de layouts de campaña para el entorno de desarrollo.
 *              - v3.1.0 (Sincronización de Contrato): Actualizado para consumir el nuevo
 *                contrato de `getDictionary`, desestructurando la respuesta para obtener
 *                el diccionario y resolver los errores de tipo en cascada.
 * @version 3.1.0
 * @author RaZ Podestá - MetaShark Tech
 * @date 2025-09-14T18:20:40.121Z
 */
import React from "react";
import { getDictionary } from "@/lib/i18n";
import { LayoutEditor } from "./_components/LayoutEditor";
import { getAllCampaignsAndVariants } from "@/lib/dev/campaign.utils";
import { sectionsConfig } from "@/lib/config/sections.config";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { Locale } from "@/lib/i18n.config";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { logger } from "@/lib/logging";

interface DevLayoutConfiguratorPageProps {
  params: { locale: Locale };
}

export default async function DevLayoutConfiguratorPage({
  params: { locale },
}: DevLayoutConfiguratorPageProps) {
  logger.info(
    `[DevLayoutConfiguratorPage] Renderizando para locale: ${locale}`
  );

  // --- [INICIO] CORRECCIÓN DE CONTRATO ---
  const { dictionary } = await getDictionary(locale);
  const content = dictionary.devLayoutConfiguratorPage;
  // --- [FIN] CORRECCIÓN DE CONTRATO ---

  if (!content) {
    logger.error(
      `[DevLayoutConfiguratorPage] Contenido para la página de configurador no encontrado para locale: '${locale}'.`
    );
    return (
      <div className="text-center text-destructive p-8">
        <h2 className="text-2xl font-bold">Error de Contenido</h2>
        <p>
          El contenido para la página &apos;devLayoutConfiguratorPage&apos; no
          se encontró en el diccionario.
        </p>
      </div>
    );
  }

  const campaigns = await getAllCampaignsAndVariants();
  const availableSections = Object.keys(sectionsConfig);

  return (
    <div className="min-h-screen">
      <PageHeader title={content.title} subtitle={content.subtitle} />
      <Container className="mt-8 mb-16">
        <LayoutEditor
          campaigns={campaigns}
          availableSections={availableSections as string[]}
          content={content}
        />
      </Container>
    </div>
  );
}
