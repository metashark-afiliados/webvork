// app/[locale]/(dev)/dev/campaign-suite/create/page.tsx
/**
 * @file page.tsx
 * @description Página de entrada única (SPA) para la SDC. Simplificada para
 *              delegar toda la carga de datos específicos del paso a los
 *              módulos correspondientes.
 * @version 5.0.0 (Data Fetching Decoupling)
 * @author RaZ Podestá - MetaShark Tech
 */
import React, { Suspense } from "react";
import { getDictionary } from "@/lib/i18n";
import { logger } from "@/lib/logging";
import type { Locale } from "@/lib/i18n.config";
import { StepClientWrapper } from "../_components";

interface CreatePageProps {
  params: { locale: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function CreatePage({ params }: CreatePageProps) {
  logger.info(`[CreatePage] Renderizando. Locale: [${params.locale}]`);

  // --- MEJORA: La página ahora solo carga los datos universales del wizard ---
  const { dictionary, error } = await getDictionary(params.locale);

  if (error || !dictionary.campaignSuitePage) {
    const errorMsg =
      "Contenido del Asistente (campaignSuitePage) no encontrado en el diccionario.";
    logger.error(`[CreatePage] ${errorMsg}`, { error });
    return <div>Error: {errorMsg}</div>;
  }

  const wizardContent = dictionary.campaignSuitePage;

  return (
    <Suspense fallback={<div>Cargando asistente...</div>}>
      <StepClientWrapper wizardContent={wizardContent} />
    </Suspense>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/create/page.tsx
