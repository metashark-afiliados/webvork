// app/[locale]/(dev)/dev/page.tsx
/**
 * @file page.tsx
 * @description Dashboard principal del Developer Command Center (DCC).
 *              - v3.0.0 (Deprecation Fix): Elimina la tarjeta y la lógica
 *                asociada al obsoleto "Simulador de Campañas", resolviendo el
 *                error de tipo TS2339 y alineando la UI con el manifiesto de rutas.
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import { getDictionary } from "@/lib/i18n";
import { routes } from "@/lib/navigation";
import { logger } from "@/lib/logging";
import type { Locale } from "@/lib/i18n.config";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import DynamicIcon from "@/components/ui/DynamicIcon";
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
}

const DevToolCard = ({
  title,
  description,
  href,
  icon,
  isFeatured = false,
}: DevToolCardProps) => {
  logger.trace(`[Observabilidad] Renderizando DevToolCard: ${title}`);
  return (
    <Card
      className={`transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
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
      <CardContent>
        <CardDescription>{description}</CardDescription>
        <Button
          href={href}
          variant={isFeatured ? "default" : "secondary"}
          className="mt-6"
        >
          {isFeatured ? "Iniciar" : "Abrir"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default async function DevDashboardPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  logger.info(
    `[Observabilidad] Renderizando DevDashboardPage para locale: ${locale}`
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
          Error de Configuración de Contenido
        </h1>
        <p>El contenido para el dashboard de desarrollo no pudo ser cargado.</p>
      </Container>
    );
  }

  const campaignSuitePath = routes.campaignSuiteCreate.path({ locale });

  return (
    <>
      <PageHeader title={content.title} subtitle={content.subtitle} />
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2">
            <DevToolCard
              title="Suite de Diseño de Campañas"
              description="Un asistente paso a paso para crear, configurar y generar todos los activos de una nueva variante de campaña, sin tocar el código."
              href={campaignSuitePath}
              icon="WandSparkles"
              isFeatured={true}
            />
          </div>
          {/* --- [INICIO DE CORRECCIÓN] --- */}
          {/* Se elimina la tarjeta que apuntaba a la ruta obsoleta */}
          {/*
          <DevToolCard
            title={content.tools.campaignSimulator.name}
            description={content.tools.campaignSimulator.description}
            href={routes.devCampaignSimulator.path({ locale })} // <-- ESTO CAUSABA EL ERROR
            icon="Rocket"
          />
          */}
          <DevToolCard
            title={content.tools.resilienceShowcase.name}
            description={content.tools.resilienceShowcase.description}
            href={routes.devTestPage.path({ locale })}
            icon="ShieldCheck"
          />
          {/* --- [FIN DE CORRECCIÓN] --- */}
        </div>
      </Container>
    </>
  );
}
// app/[locale]/(dev)/dev/page.tsx
