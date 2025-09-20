// RUTA: app/[locale]/terms/page.tsx
/**
 * @file page.tsx
 * @description Página de Términos de Servicio, elevada a un estándar de élite
 *              con animación de entrada y cumplimiento holístico de la Directiva 026.
 * @version 2.0.0 (Holistic Elite Compliance & MEA/UX)
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n.config";
import { logger } from "@/lib/logging";
import { PageHeader } from "@/components/layout/PageHeader";
import { TextSection } from "@/components/sections/TextSection";
import { DeveloperErrorDisplay } from "@/components/dev";
import { SectionAnimator } from "@/components/layout/SectionAnimator";
import { notFound } from "next/navigation";

interface TermsPageProps {
  params: { locale: Locale };
}

export default async function TermsPage({
  params: { locale },
}: TermsPageProps) {
  logger.info(
    `[TermsPage] Renderizando v2.0 (Elite Compliance) para locale: ${locale}`
  );

  const { dictionary, error } = await getDictionary(locale);
  const content = dictionary.termsPage;

  // --- Pilar III: Guardia de Resiliencia Robusta ---
  if (error || !content) {
    const errorMessage =
      "Fallo al cargar el contenido i18n para la página de Términos de Servicio.";
    logger.error(`[TermsPage] ${errorMessage}`, { error });
    if (process.env.NODE_ENV === "production") {
      return notFound();
    }
    return (
      <DeveloperErrorDisplay
        context="TermsPage"
        errorMessage={errorMessage}
        errorDetails={error || "La clave 'termsPage' falta en el diccionario."}
      />
    );
  }

  return (
    // --- MEA/UX: Orquestador de Animación ---
    <SectionAnimator>
      {/* --- Pilar V: Adherencia al Contrato de PageHeader --- */}
      <PageHeader content={content} />
      <TextSection content={content.content} />
    </SectionAnimator>
  );
}
