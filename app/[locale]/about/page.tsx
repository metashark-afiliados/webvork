// app/[locale]/about/page.tsx
/**
 * @file page.tsx
 * @description Página "Sobre Nosotros", ahora como un simple consumidor de datos.
 *              - v2.2.0 (Sincronización de Contrato): Actualizado para consumir el nuevo
 *                contrato de `getDictionary`, desestructurando la respuesta para obtener
 *                el diccionario y resolver los errores de tipo.
 * @version 2.2.0
 * @author RaZ Podestá - MetaShark Tech
 * @date 2025-09-14T18:20:40.121Z
 */
import React from "react";
import { getDictionary } from "@/lib/i18n";
import { PageHeader } from "@/components/layout/PageHeader";
import { TextSection } from "@/components/sections/TextSection";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { Locale } from "@/lib/i18n.config";

interface AboutPageProps {
  params: { locale: Locale };
}

export default async function AboutPage({
  params: { locale },
}: AboutPageProps) {
  logger.info(`[AboutPage] Renderizando para locale: ${locale}`);

  // --- [INICIO] CORRECCIÓN DE CONTRATO ---
  const { dictionary } = await getDictionary(locale);
  const content = dictionary.aboutPage;
  // --- [FIN] CORRECCIÓN DE CONTRATO ---

  if (!content) {
    logger.error(
      `[AboutPage] Contenido para 'aboutPage' no encontrado para locale: ${locale}.`
    );
    // Renderiza un fallback en lugar de fallar, manteniendo la página funcional.
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-destructive">Contenido no disponible.</p>
      </div>
    );
  }

  return (
    <>
      <PageHeader title={content.title} subtitle={content.subtitle} />
      <TextSection content={content.content} />
    </>
  );
}
