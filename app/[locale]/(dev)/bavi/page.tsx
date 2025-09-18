// app/[locale]/(dev)/bavi/page.tsx
/**
 * @file page.tsx
 * @description Página principal de la Central de Operaciones BAVI.
 * @version 3.0.0 (Asset Explorer Integration)
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
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent, // <-- NUEVA IMPORTACIÓN
} from "@/components/ui";
import { AssetUploader, AssetExplorer } from "./_components"; // <-- IMPORTACIÓN ACTUALIZADA
import { logger } from "@/lib/logging";

export default async function BaviHomePage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  logger.info(
    "[BaviHomePage] Renderizando la página principal de la BAVI (v3.0 - Asset Explorer)."
  );
  const { dictionary } = await getDictionary(locale);
  const uploaderContent = dictionary.baviUploader;
  const promptCreatorContent = dictionary.promptCreator; // Necesitamos esto para las opciones SESA
  const assetExplorerContent = dictionary.assetExplorer; // <-- NUEVA VARIABLE

  if (!uploaderContent || !promptCreatorContent || !assetExplorerContent) {
    logger.error(
      `[BaviHomePage] Contenido i18n incompleto para locale: ${locale}.`
    );
    return <div>Error: Contenido de la página BAVI no encontrado.</div>;
  }

  const sesaContent = {
    ...promptCreatorContent.sesaLabels,
    options: promptCreatorContent.sesaOptions,
  };

  return (
    <>
      <PageHeader
        title="BAVI: Biblioteca de Activos Visuales Integrada"
        subtitle="La central de operaciones para la gestión, optimización e indexación de todos los activos del ecosistema."
      />
      <Container className="py-12">
        <Tabs defaultValue="upload">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px] mb-8">
            <TabsTrigger value="upload">Ingestar Activos</TabsTrigger>
            <TabsTrigger value="explore">Explorar Bóveda</TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>{uploaderContent.metadataFormTitle}</CardTitle>
                <CardDescription>
                  {uploaderContent.dropzoneDefault}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AssetUploader
                  content={uploaderContent}
                  sesaContent={sesaContent}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="explore">
            <AssetExplorer
              locale={locale}
              content={assetExplorerContent}
              sesaOptions={sesaOptions}
            />
          </TabsContent>
        </Tabs>

        <Card className="border-dashed mt-12">
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
