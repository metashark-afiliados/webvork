// app/[locale]/(dev)/dev/page.tsx
/**
 * @file page.tsx
 * @description Dashboard principal del DCC, ahora con tarjetas interactivas.
 * @version 4.0.0 (MEA-01 Tilt Effect Integration)
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { getDictionary } from "@/lib/i18n";
import { routes } from "@/lib/navigation";
import { logger } from "@/lib/logging";
import type { Locale } from "@/lib/i18n.config";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container, DynamicIcon } from "@/components/ui";
import { TiltCard } from "@/components/ui/TiltCard"; // <-- NUEVA IMPORTACIÓN
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
    // La tarjeta ahora está envuelta en el componente TiltCard
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
            {isFeatured ? "Iniciar" : "Abrir"}
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
    `[Observabilidad] Renderizando DevDashboardPage v4.0 (MEA-01) para locale: ${locale}`
  );
  const { dictionary } = await getDictionary(locale);
  const content = dictionary.devDashboardPage;

  if (!content) {
    // ... (manejo de error sin cambios)
  }

  const campaignSuitePath = routes.campaignSuiteCreate.path({ locale });

  return (
    <>
      <PageHeader title={content.title} subtitle={content.subtitle} />
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-3">
            <DevToolCard
              title="Suite de Diseño de Campañas"
              description="Un asistente paso a paso para crear, configurar y generar todos los activos de una nueva variante de campaña, sin tocar el código."
              href={campaignSuitePath}
              icon="WandSparkles"
              isFeatured={true}
            />
          </div>
          <DevToolCard
            title="Vitrina de Resiliencia"
            description="Renderiza todos los componentes para verificar la estabilidad y compatibilidad de los datos."
            href={routes.devTestPage.path({ locale })}
            icon="ShieldCheck"
          />
          <DevToolCard
            title="BAVI"
            description="Biblioteca de Activos Visuales Integrada."
            href={`/${locale}/dev/bavi`}
            icon="LibraryBig"
          />
          <DevToolCard
            title="RaZPrompts"
            description="Bóveda de Conocimiento Generativo."
            href={`/${locale}/dev/raz-prompts`}
            icon="BrainCircuit"
          />
        </div>
      </Container>
    </>
  );
}
// app/[locale]/(dev)/dev/page.tsx
