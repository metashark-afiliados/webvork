// app/[locale]/(dev)/dev/page.tsx
/**
 * @file page.tsx
 * @description Dashboard principal del DCC.
 * @version 6.0.0 (Holistic Route Fix & SSoT Alignment): Resuelve todos los
 *              errores de tipo, nomenclatura de rutas e inyecta una guardia
 *              de resiliencia para el contenido. Ahora consume la SSoT de
 *              rutas desde 'lib/navigation.ts'.
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { getDictionary } from "@/lib/i18n";
import { routes } from "@/lib/navigation"; // <-- IMPORTAR SSoT DE RUTAS
import { logger } from "@/lib/logging";
import type { Locale } from "@/lib/i18n.config";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container, DynamicIcon } from "@/components/ui";
import { TiltCard } from "@/components/ui/TiltCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { type LucideIconName } from "@/config/lucide-icon-names";

interface DevToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIconName;
  isFeatured?: boolean;
  buttonLabel: string;
  featuredButtonLabel: string;
}

const DevToolCard = ({
  title,
  description,
  href,
  icon,
  isFeatured = false,
  buttonLabel,
  featuredButtonLabel,
}: DevToolCardProps) => {
  logger.trace(`[Observabilidad] Renderizando DevToolCard: ${title}`);
  return (
    <TiltCard className="h-full">
      <Card
        className={`transition-all duration-300 h-full flex flex-col ${
          isFeatured
            ? "border-primary/50 ring-2 ring-primary/20"
            : "border-border"
        }`}
      >
        <CardHeader>
          <div className="flex items-center gap-4">
            <DynamicIcon
              name={icon}
              className={`h-8 w-8 ${
                isFeatured ? "text-primary" : "text-muted-foreground"
              }`}
            />
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          <CardDescription className="flex-grow">{description}</CardDescription>
          <Button
            href={href}
            variant={isFeatured ? "default" : "secondary"}
            className="mt-6"
          >
            {isFeatured ? featuredButtonLabel : buttonLabel}
          </Button>
        </CardContent>
      </Card>
    </TiltCard>
  );
};

export default async function DevDashboardPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  logger.info(
    `[Observabilidad] Renderizando DevDashboardPage v6.0 para locale: ${locale}`
  );
  const { dictionary } = await getDictionary(locale);
  const content = dictionary.devDashboardPage;

  if (!content) {
    logger.error(
      `[DevDashboardPage] Contenido 'devDashboardPage' no encontrado para locale: '${locale}'.`
    );
    return (
      <Container className="py-24 text-center">
        <h1 className="text-2xl font-bold text-destructive">
          Error de Contenido
        </h1>
        <p>El contenido para el dashboard de desarrollo no pudo ser cargado.</p>
      </Container>
    );
  }

  return (
    <>
      <PageHeader title={content.title} subtitle={content.subtitle} />
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-3">
            <DevToolCard
              title="Suite de Diseño de Campañas"
              description="Un asistente paso a paso para crear, configurar y generar todos los activos de una nueva variante de campaña, sin tocar el código."
              href={routes.devCampaignSuiteCreate.path({ locale })} // <-- RUTA CORREGIDA
              icon="WandSparkles"
              isFeatured={true}
              buttonLabel="Abrir"
              featuredButtonLabel="Iniciar"
            />
          </div>
          <DevToolCard
            title="Vitrina de Resiliencia"
            description="Renderiza todos los componentes para verificar la estabilidad y compatibilidad de los datos."
            href={routes.devTestPage.path({ locale })} // <-- RUTA CORREGIDA
            icon="ShieldCheck"
            buttonLabel="Abrir"
            featuredButtonLabel="Iniciar"
          />
          <DevToolCard
            title="BAVI"
            description="Biblioteca de Activos Visuales Integrada."
            href={routes.bavi.path({ locale })} // <-- RUTA CORREGIDA
            icon="LibraryBig"
            buttonLabel="Abrir"
            featuredButtonLabel="Iniciar"
          />
          <DevToolCard
            title="RaZPrompts"
            description="Bóveda de Conocimiento Generativo."
            href={routes.razPrompts.path({ locale })} // <-- RUTA CORREGIDA
            icon="BrainCircuit"
            buttonLabel="Abrir"
            featuredButtonLabel="Iniciar"
          />
        </div>
      </Container>
    </>
  );
}
// app/[locale]/(dev)/dev/page.tsx
