// app/[locale]/(dev)/dev/test-page/_components/TestPageClient.tsx
/**
 * @file TestPageClient.tsx
 * @description Vitrina de Resiliencia de Componentes (Cliente).
 *              v16.2.0: Importa el tipo `AvailableTheme` desde la nueva SSoT,
 *              rompiendo la dependencia circular y resolviendo el error de build.
 * @version 16.2.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { logger } from "@/lib/logging";
import { type Locale } from "@/lib/i18n.config";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
// --- [INICIO DE CORRECCIÓN ARQUITECTÓNICA] ---
import type { AvailableTheme } from "../_types/themes.types";
// --- [FIN DE CORRECCIÓN ARQUITECTÓNICA] ---
import { PageHeader } from "@/components/layout/PageHeader";
import { CampaignThemeProvider } from "@/components/layout/CampaignThemeProvider";
import {
  Container,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import * as Sections from "@/components/sections";
import { type AssembledTheme } from "@/lib/schemas/theming/assembled-theme.schema";

interface TestPageClientProps {
  masterDictionary: Dictionary;
  availableThemes: AvailableTheme[];
  locale: Locale;
}

// ... (El resto del componente permanece exactamente igual)
type RenderStatus = "success" | "error" | "warning";
const TestComponentRenderer = ({ Comp, content, extraProps = {} }: any) => {
  let finalContent = content;
  if (content && typeof content === "object" && "content" in content) {
    finalContent = content.content;
  }
  if (!finalContent) {
    return {
      status: "warning" as RenderStatus,
      node: (
        <div className="p-4 text-yellow-500 border border-yellow-500 rounded-md bg-yellow-500/10">
          <strong>⚠️ Advertencia:</strong>
          <p className="text-xs">
            Contenido no encontrado en el diccionario maestro.
          </p>
        </div>
      ),
      error: "Content not found in dictionary.",
    };
  }
  try {
    return {
      status: "success" as RenderStatus,
      node: <Comp content={finalContent} {...extraProps} />,
      error: undefined,
    };
  } catch (error) {
    return {
      status: "error" as RenderStatus,
      node: (
        <div className="p-4 text-destructive border border-destructive rounded-md bg-destructive/10">
          <strong>❌ Error al renderizar:</strong>
          <pre className="text-xs whitespace-pre-wrap mt-2">
            {error instanceof Error ? error.message : String(error)}
          </pre>
        </div>
      ),
      error: error instanceof Error ? error.message : String(error),
    };
  }
};
export default function TestPageClient({
  masterDictionary,
  availableThemes,
  locale,
}: TestPageClientProps) {
  const [selectedThemeId, setSelectedThemeId] = useState<string>("default");
  const renderStatusRef = useRef<
    Record<string, { status: RenderStatus; error?: string }>
  >({});
  const sectionsToRender = useMemo(
    () => [
      {
        name: "BenefitsSection",
        Comp: Sections.BenefitsSection,
        contentKey: "benefitsSection" as const,
      },
      {
        name: "CommunitySection",
        Comp: Sections.CommunitySection,
        contentKey: "communitySection" as const,
      },
      {
        name: "ContactSection",
        Comp: Sections.ContactSection,
        contentKey: "contactSection" as const,
      },
      {
        name: "DoubleScrollingBanner",
        Comp: Sections.DoubleScrollingBanner,
        contentKey: "doubleScrollingBanner" as const,
      },
      {
        name: "FaqAccordion",
        Comp: Sections.FaqAccordion,
        contentKey: "faqAccordion" as const,
      },
      {
        name: "FeaturedArticlesCarousel",
        Comp: Sections.FeaturedArticlesCarousel,
        contentKey: "featuredArticlesCarousel" as const,
      },
      {
        name: "FeaturesSection",
        Comp: Sections.FeaturesSection,
        contentKey: "featuresSection" as const,
      },
      {
        name: "GuaranteeSection",
        Comp: Sections.GuaranteeSection,
        contentKey: "guaranteeSection" as const,
      },
      { name: "Hero", Comp: Sections.Hero, contentKey: "hero" as const },
      {
        name: "HeroNews",
        Comp: Sections.HeroNews,
        contentKey: "heroNews" as const,
      },
      {
        name: "IngredientAnalysis",
        Comp: Sections.IngredientAnalysis,
        contentKey: "ingredientAnalysis" as const,
      },
      {
        name: "NewsGrid",
        Comp: Sections.NewsGrid,
        contentKey: "newsGrid" as const,
      },
      {
        name: "OrderSection",
        Comp: Sections.OrderSection,
        contentKey: "orderSection" as const,
      },
      {
        name: "PricingSection",
        Comp: Sections.PricingSection,
        contentKey: "pricingSection" as const,
      },
      {
        name: "ProductShowcase",
        Comp: Sections.ProductShowcase,
        contentKey: "productShowcase" as const,
      },
      {
        name: "ServicesSection",
        Comp: Sections.ServicesSection,
        contentKey: "servicesSection" as const,
      },
      {
        name: "SocialProofLogos",
        Comp: Sections.SocialProofLogos,
        contentKey: "socialProofLogos" as const,
      },
      {
        name: "SponsorsSection",
        Comp: Sections.SponsorsSection,
        contentKey: "sponsorsSection" as const,
      },
      {
        name: "TeamSection",
        Comp: Sections.TeamSection,
        contentKey: "teamSection" as const,
      },
      {
        name: "TestimonialCarouselSection",
        Comp: Sections.TestimonialCarouselSection,
        contentKey: "testimonialCarouselSection" as const,
      },
      {
        name: "TestimonialGrid",
        Comp: Sections.TestimonialGrid,
        contentKey: "testimonialGrid" as const,
      },
      {
        name: "TextSection",
        Comp: Sections.TextSection,
        contentKey: "aboutPage" as const,
      },
      {
        name: "ThumbnailCarousel",
        Comp: Sections.ThumbnailCarousel,
        contentKey: "thumbnailCarousel" as const,
      },
    ],
    []
  );
  const totalComponents = sectionsToRender.length;
  useEffect(() => {
    logger.startGroup("Sumario de Renderizado de Componentes");
    sectionsToRender.forEach(({ name, Comp, contentKey }, index) => {
      const { status, error } = TestComponentRenderer({
        Comp,
        content: masterDictionary[contentKey],
        extraProps: { locale },
      });
      renderStatusRef.current[name] = { status, error };
      const icons = { success: "✅", error: "❌", warning: "⚠️" };
      const styles = {
        success: "color: #22c55e;",
        error: "color: #ef4444;",
        warning: "color: #f59e0b;",
      };
      console.log(
        `%c${icons[status]} [${index + 1}/${totalComponents}] ${name}... ${status.toUpperCase()}`,
        `font-weight: bold; ${styles[status]}`
      );
    });
    logger.endGroup();
    console.table(
      Object.entries(renderStatusRef.current).map(([name, data]) => ({
        Componente: name,
        ...data,
      }))
    );
  }, [masterDictionary, locale, sectionsToRender, totalComponents]);
  const pageContent = masterDictionary.devTestPage;
  const themeOptions = [
    { id: "default", name: `Default Theme (${locale})` },
    ...availableThemes.map((t) => ({ id: t.id, name: t.name })),
  ];
  const defaultThemeObject = useMemo(
    (): AssembledTheme => ({
      layout: { sections: [] },
      colors: {
        background: "0 0% 100%",
        foreground: "0 0% 3.9%",
        card: "0 0% 100%",
        cardForeground: "0 0% 3.9%",
        popover: "0 0% 100%",
        popoverForeground: "0 0% 3.9%",
        primary: "0 0% 9%",
        primaryForeground: "0 0% 98%",
        secondary: "0 0% 96.1%",
        secondaryForeground: "0 0% 9%",
        muted: "0 0% 96.1%",
        mutedForeground: "0 0% 45.1%",
        accent: "0 0% 96.1%",
        accentForeground: "0 0% 9%",
        destructive: "0 84.2% 60.2%",
        destructiveForeground: "0 0% 98%",
      },
      fonts: { sans: "var(--font-sans)", serif: "var(--font-serif)" },
      geometry: {
        "--radius": "0.5rem",
        "--border": "0 0% 89.8%",
        "--input": "0 0% 89.8%",
        "--ring": "0 0% 3.9%",
      },
    }),
    []
  );
  const currentThemeData = useMemo(() => {
    if (selectedThemeId === "default") return defaultThemeObject;
    return (
      availableThemes.find((t) => t.id === selectedThemeId)?.themeData ??
      defaultThemeObject
    );
  }, [selectedThemeId, availableThemes, defaultThemeObject]);
  if (!pageContent) return <div>Error: Content for devTestPage not found.</div>;
  return (
    <CampaignThemeProvider theme={currentThemeData}>
      {" "}
      <header className="py-3 sticky top-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border">
        {" "}
        <Container className="flex items-center justify-between gap-4">
          {" "}
          <Link
            href={`/${locale}/dev`}
            className="font-bold text-lg text-foreground hover:text-primary transition-colors"
          >
            {pageContent.title}
          </Link>{" "}
          <Select onValueChange={setSelectedThemeId} value={selectedThemeId}>
            {" "}
            <SelectTrigger className="w-[280px]">
              {" "}
              <SelectValue placeholder={pageContent.selectThemeLabel} />{" "}
            </SelectTrigger>{" "}
            <SelectContent>
              {" "}
              {themeOptions.map((opt) => (
                <SelectItem key={opt.id} value={opt.id}>
                  {opt.name}
                </SelectItem>
              ))}{" "}
            </SelectContent>{" "}
          </Select>{" "}
        </Container>{" "}
      </header>{" "}
      <main>
        {" "}
        <PageHeader
          title={pageContent.title}
          subtitle={pageContent.subtitle}
        />{" "}
        <Container className="my-8">
          {" "}
          <div className="space-y-8">
            {" "}
            {sectionsToRender.map(({ name, Comp, contentKey }) => {
              const { node: renderedComponent } = TestComponentRenderer({
                Comp,
                content: masterDictionary[contentKey],
                extraProps: { locale },
              });
              return (
                <Card key={name} className="overflow-hidden">
                  {" "}
                  <CardHeader>
                    {" "}
                    <CardTitle className="text-accent">{name}</CardTitle>{" "}
                  </CardHeader>{" "}
                  <CardContent>{renderedComponent}</CardContent>{" "}
                </Card>
              );
            })}{" "}
          </div>{" "}
        </Container>{" "}
      </main>{" "}
    </CampaignThemeProvider>
  );
}
// app/[locale]/(dev)/dev/test-page/_components/TestPageClient.tsx
