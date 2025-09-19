// app/[locale]/(dev)/bavi/page.tsx
/**
 * @file page.tsx
 * @description Página principal de la Central de Operaciones BAVI.
 * @version 2.1.0 (SesaContent Prop Drilling Fix)
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n.config";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Container,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui";
import { AssetUploader } from "./_components/AssetUploader";
import { logger } from "@/lib/logging";

export default async function BaviHomePage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  logger.info(
    "[BaviHomePage] Renderizando la página principal de la BAVI (v2.1)."
  );
  const { dictionary } = await getDictionary(locale);
  const uploaderContent = dictionary.baviUploader;
  const promptCreatorContent = dictionary.promptCreator;

  if (!uploaderContent || !promptCreatorContent) {
    return <div>Error: Contenido de la página BAVI no encontrado.</div>;
  }

  return (
    <>
      <PageHeader
        title="BAVI: Biblioteca de Activos Visuales Integrada"
        subtitle="La central de operaciones para la gestión, optimización e indexación de todos los activos del ecosistema."
      />
      <Container className="py-12 space-y-12">
        <Card>
          <CardHeader>
            <CardTitle>Ingesta de Nuevos Activos</CardTitle>
            <CardDescription>
              Sube un nuevo activo. Se optimizará automáticamente y se preparará
              para su indexación en el manifiesto.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* --- [INICIO] REFACTORIZACIÓN DE PROPS --- */}
            <AssetUploader
              content={uploaderContent}
              sesaLabels={promptCreatorContent.sesaLabels}
              sesaOptions={promptCreatorContent.sesaOptions}
            />
            {/* --- [FIN] REFACTORIZACIÓN DE PROPS --- */}
          </CardContent>
        </Card>

        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-muted-foreground">
              Boiler de IA (Próximamente)
            </CardTitle>
            <CardDescription>
              Genera variaciones, elimina fondos y crea activos sintéticos con
              IA.
            </CardDescription>
          </CardHeader>
        </Card>
      </Container>
    </>
  );
}
// app/[locale]/(dev)/bavi/page.tsx
