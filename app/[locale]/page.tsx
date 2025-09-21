// app/[locale]/page.tsx
/**
 * @file page.tsx
 * @description Página de inicio del portal, con contrato de props corregido.
 * @version 2.1.0 (Props Contract Fix)
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { getDictionary } from "@/shared/lib/i18n";
import { HeroNews } from "@/components/sections/HeroNews";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { SocialProofLogos } from "@/components/sections/SocialProofLogos";
import { CommunitySection } from "@/components/sections/CommunitySection";
import type { Locale } from "@/shared/lib/i18n.config";
import { logger } from "@/shared/lib/logging";
import { getPublishedArticlesAction } from "./(dev)/cogniread/_actions";
import { DeveloperErrorDisplay } from "@/components/dev";

interface HomePageProps {
  params: { locale: Locale };
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  logger.info(`[HomePage] Renderizando v2.1 (Contract Fix) para locale: ${locale}`);

  const [{ dictionary }, articlesResult] = await Promise.all([
    getDictionary(locale),
    getPublishedArticlesAction({ page: 1, limit: 3 })
  ]);

  const heroNewsContent = dictionary.heroNews;
  const socialProofLogosContent = dictionary.socialProofLogos;
  const communitySectionContent = dictionary.communitySection;

  if (!articlesResult.success) {
      return <DeveloperErrorDisplay context="HomePage" errorMessage="No se pudieron cargar los artículos." errorDetails={articlesResult.error} />
  }

  return (
    <>
      {heroNewsContent && <HeroNews content={heroNewsContent} />}
      {socialProofLogosContent && <SocialProofLogos content={socialProofLogosContent} />}

      {/* --- [INICIO DE CORRECCIÓN DE CONTRATO] --- */}
      {/* Ahora pasamos la prop 'articles' con los datos correctos desde la Server Action. */}
      <NewsGrid articles={articlesResult.data.articles} locale={locale} />
      {/* --- [FIN DE CORRECCIÓN DE CONTRATO] --- */}

      {communitySectionContent && <CommunitySection content={communitySectionContent} />}
    </>
  );
}
// app/[locale]/page.tsx
