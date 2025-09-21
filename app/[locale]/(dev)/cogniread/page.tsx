// app/[locale]/(dev)/cogniread/page.tsx
/**
 * @file page.tsx
 * @description Página principal del dashboard de CogniRead, ahora data-driven.
 * @version 2.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import Link from "next/link";
import { getDictionary } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n.config";
import { logger } from "@/shared/lib/logging";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Container,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
} from "@/components/ui";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { routes } from "@/shared/lib/navigation";
import { getAllArticlesAction } from "./_actions";
import { ArticleList } from "./_components";
import { DeveloperErrorDisplay } from "@/components/dev";

export default async function CogniReadDashboardPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  logger.info("[CogniReadDashboard] Renderizando v2.0 (Data-Driven)...");

  // En un futuro, el contenido de la UI del dashboard también vendrá del diccionario.
  // const { dictionary } = await getDictionary(locale);
  // const pageContent = dictionary.cogniReadDashboard;

  const articlesResult = await getAllArticlesAction({ page: 1, limit: 20 });

  return (
    <>
      <PageHeader
        content={{
          title: "CogniRead: Scientific Knowledge Management",
          subtitle:
            "El motor de credibilidad de Global Fitwell. Gestiona aquí todos los análisis de estudios científicos.",
        }}
      />
      <Container className="py-12 space-y-8">
        <div className="flex justify-end">
          <Button asChild>
            <Link href={routes.cogniReadEditor.path({ locale })}>
              <DynamicIcon name="Plus" className="mr-2 h-4 w-4" />
              Nuevo Análisis de Estudio
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Biblioteca de Artículos</CardTitle>
            <CardDescription>
              Aquí se listan todos los artículos analizados, tanto en borrador
              como publicados.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {articlesResult.success ? (
              <ArticleList
                articles={articlesResult.data.articles}
                locale={locale}
              />
            ) : (
              <DeveloperErrorDisplay
                context="CogniReadDashboard"
                errorMessage="No se pudieron cargar los artículos desde la base de datos."
                errorDetails={articlesResult.error}
              />
            )}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
// app/[locale]/(dev)/cogniread/page.tsx
