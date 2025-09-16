// app/[locale]/(dev)/dev/campaign-suite/create/layout.tsx
/**
 * @file layout.tsx
 * @description Layout de Servidor para la SDC. Simplificado para delegar
 *              la carga de datos al nuevo layout raíz de desarrollo.
 * @version 4.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { getDictionary } from "@/lib/i18n";
import { logger } from "@/lib/logging";
import type { Locale } from "@/lib/i18n.config";
import { WizardClientLayout } from "../_components";

interface WizardLayoutProps {
  children: React.ReactNode;
  params: { locale: Locale };
}

export default async function WizardLayout({
  children,
  params,
}: WizardLayoutProps) {
  logger.info(
    `[WizardLayout] Renderizando layout específico de la SDC. Locale: [${params.locale}]`
  );

  // Mantiene la carga de su propio contenido específico.
  const { dictionary, error } = await getDictionary(params.locale);
  const wizardContent = dictionary.campaignSuitePage;

  if (error || !wizardContent) {
    logger.error(
      `[WizardLayout] No se pudo cargar el contenido (campaignSuitePage).`,
      { error }
    );
    return (
      <div className="text-destructive text-center p-8">
        Error al cargar la estructura del asistente.
      </div>
    );
  }

  // Este layout ahora es un hijo del nuevo (dev)/layout.tsx, por lo que
  // hereda automáticamente el theming.
  return (
    <WizardClientLayout wizardContent={wizardContent}>
      {children}
    </WizardClientLayout>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/create/layout.tsx
