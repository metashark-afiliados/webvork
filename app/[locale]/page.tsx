// app/[locale]/page.tsx
/**
 * @file page.tsx
 * @description Punto de entrada y página de inicio (Homepage) del portal Global Fitwell.
 *              - v1.3.0 (Sincronización de Contrato): Actualizado para consumir el nuevo
 *                contrato de `getDictionary`, desestructurando la respuesta y
 *                resolviendo los errores de tipo.
 * @version 1.3.0
 * @author RaZ Podestá - MetaShark Tech
 * @date 2025-09-14T18:20:40.121Z
 */
import React from "react";
import { getDictionary } from "@/lib/i18n";
import { HeroNews } from "@/components/sections/HeroNews";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { SocialProofLogos } from "@/components/sections/SocialProofLogos";
import { CommunitySection } from "@/components/sections/CommunitySection";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { Locale } from "@/lib/i18n.config";
import { logger } from "@/lib/logging";

interface HomePageProps {
  params: { locale: Locale };
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  logger.info(
    `[HomePage] Renderizando la página de inicio para locale: ${locale}`
  );

  // --- [INICIO] CORRECCIÓN DE CONTRATO ---
  const { dictionary } = await getDictionary(locale);
  // --- [FIN] CORRECCIÓN DE CONTRATO ---

  const heroNewsContent = dictionary.heroNews;
  const socialProofLogosContent = dictionary.socialProofLogos;
  const newsGridContent = dictionary.newsGrid;
  const communitySectionContent = dictionary.communitySection;

  if (!heroNewsContent)
    logger.warn(
      `[HomePage] Contenido para 'heroNews' no encontrado en el diccionario para locale: ${locale}.`
    );
  if (!socialProofLogosContent)
    logger.warn(
      `[HomePage] Contenido para 'socialProofLogos' no encontrado en el diccionario para locale: ${locale}.`
    );
  if (!newsGridContent)
    logger.warn(
      `[HomePage] Contenido para 'newsGrid' no encontrado en el diccionario para locale: ${locale}.`
    );
  if (!communitySectionContent)
    logger.warn(
      `[HomePage] Contenido para 'communitySection' no encontrado en el diccionario para locale: ${locale}.`
    );

  return (
    <>
      {heroNewsContent && <HeroNews content={heroNewsContent} />}
      {socialProofLogosContent && (
        <SocialProofLogos content={socialProofLogosContent} />
      )}
      {newsGridContent && (
        <NewsGrid content={newsGridContent} locale={locale} />
      )}
      {communitySectionContent && (
        <CommunitySection content={communitySectionContent} />
      )}
    </>
  );
}
