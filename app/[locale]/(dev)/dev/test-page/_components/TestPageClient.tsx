// app/[locale]/(dev)/dev/test-page/_components/TestPageClient.tsx
/**
 * @file TestPageClient.tsx
 * @description Vitrina de Resiliencia de Componentes (Cliente).
 * @version 15.0.0 - Resuelve advertencia `exhaustive-deps` memoizando `sectionsToRender`.
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { logger } from "@/lib/logging";
import { type Locale } from "@/lib/i18n.config";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { AvailableTheme } from "../page";
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

interface TestPageClientProps {
  masterDictionary: Dictionary;
  availableThemes: AvailableTheme[];
  locale: Locale;
}

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

  // --- INICIO DE CORRECCIÓN: Se memoiza el array `sectionsToRender` con `useMemo` ---
  // Esto garantiza que la referencia del array sea estable entre renderizados,
  // evitando que el useEffect se ejecute innecesariamente.
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
    [] // El array de dependencias está vacío porque la lista es estática y no cambia.
  );
  // --- FIN DE CORRECCIÓN ---

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
        `%c${
          icons[status]
        } [${index + 1}/${totalComponents}] ${name}... ${status.toUpperCase()}`,
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
    () => ({
      layout: { sections: [] },
      fonts: { sans: "var(--font-sans)", serif: "var(--font-serif)" },
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
      <header className="py-3 sticky top-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border">
        <Container className="flex items-center justify-between gap-4">
          <Link
            href={`/${locale}/dev`}
            className="font-bold text-lg text-foreground hover:text-primary transition-colors"
          >
            {pageContent.title}
          </Link>
          <Select onValueChange={setSelectedThemeId} value={selectedThemeId}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder={pageContent.selectThemeLabel} />
            </SelectTrigger>
            <SelectContent>
              {themeOptions.map((opt) => (
                <SelectItem key={opt.id} value={opt.id}>
                  {opt.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Container>
      </header>
      <main>
        <PageHeader title={pageContent.title} subtitle={pageContent.subtitle} />
        <Container className="my-8">
          <div className="space-y-8">
            {sectionsToRender.map(({ name, Comp, contentKey }) => {
              const { node: renderedComponent } = TestComponentRenderer({
                Comp,
                content: masterDictionary[contentKey],
                extraProps: { locale },
              });
              return (
                <Card key={name} className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-accent">{name}</CardTitle>
                  </CardHeader>
                  <CardContent>{renderedComponent}</CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </main>
    </CampaignThemeProvider>
  );
}
// app/[locale]/(dev)/dev/test-page/_components/TestPageClient.tsx
