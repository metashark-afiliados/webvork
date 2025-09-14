// app/[locale]/(dev)/dev/test-page/_components/TestPageClient.tsx
/**
 * @file TestPageClient.tsx
 * @description Vitrina de Componentes de Resiliencia (Cliente).
 *              - v10.1.0 (Build Stability Fix): Se estandarizan las rutas de importación
 *                a `@/ui/*` para resolver los errores de `Module not found`,
 *                alineando con el `tsconfig.json`.
 * @version 10.1.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { logger } from "@/lib/logging";
import { type Locale } from "@/lib/i18n.config";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { AvailableTheme } from "../page";

// --- Component Imports ---
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/ui/Container";
// --- INICIO DE CORRECCIÓN: Rutas de importación corregidas ---
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/Select";
import { CampaignThemeProvider } from "@/components/layout/CampaignThemeProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";
import { Separator } from "@/ui/Separator";
// --- FIN DE CORRECCIÓN ---

// --- Section Component Imports via Barrel File ---
import * as Sections from "@/components/sections";

interface TestPageClientProps {
  masterDictionary: Dictionary;
  availableThemes: AvailableTheme[];
  locale: Locale;
}

type RenderStatus = "success" | "error" | "warning";

const TestComponentRenderer = ({
  name,
  position,
  total,
  Comp,
  content,
  logRender,
  extraProps = {},
}: any) => {
  let renderResult: React.ReactElement;
  if (!content) {
    logRender(
      name,
      position,
      "warning",
      new Error("Content not found in dictionary.")
    );
    renderResult = (
      <div className="p-4 text-yellow-500 border border-yellow-500 rounded-md bg-yellow-500/10">
        <strong>⚠️ Advertencia:</strong>
        <p className="text-xs">Contenido no encontrado. Renderizado omitido.</p>
      </div>
    );
  } else {
    try {
      renderResult = <Comp content={content} {...extraProps} />;
      logRender(name, position, "success");
    } catch (error) {
      logRender(name, position, "error", error as Error);
      renderResult = (
        <div className="p-4 text-destructive border border-destructive rounded-md bg-destructive/10">
          <strong>❌ Error al renderizar:</strong>
          <pre className="text-xs whitespace-pre-wrap mt-2">
            {error instanceof Error ? error.message : String(error)}
          </pre>
        </div>
      );
    }
  }
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-foreground/80">{name}</h3>
      {renderResult}
    </div>
  );
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

  const sectionsToRender = [
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
      name: "SocialProofLogos",
      Comp: Sections.SocialProofLogos,
      contentKey: "socialProofLogos" as const,
    },
    {
      name: "TestimonialGrid",
      Comp: Sections.TestimonialGrid,
      contentKey: "testimonialGrid" as const,
    },
    {
      name: "ThumbnailCarousel",
      Comp: Sections.ThumbnailCarousel,
      contentKey: "thumbnailCarousel" as const,
    },
  ];

  const totalComponents = sectionsToRender.length;

  const logRender = (
    name: string,
    position: number,
    status: RenderStatus,
    error?: Error
  ) => {
    const icons = { success: "✅", error: "❌", warning: "⚠️" };
    const styles = {
      success: "color: #22c55e;",
      error: "color: #ef4444;",
      warning: "color: #f59e0b;",
    };
    const icon = icons[status];
    const style = `font-weight: bold; ${styles[status]}`;
    console.log(
      `%c${icon} [${position}/${totalComponents}] ${name}... ${status.toUpperCase()}`,
      style
    );
    renderStatusRef.current[name] = { status, error: error?.message };
  };

  useEffect(() => {
    const statusRef = renderStatusRef.current;
    return () => {
      console.log("\n\n--- SUMARIO FINAL DE RENDERIZADO ---");
      const summary = Object.entries(statusRef).map(
        ([name, { status, error }]) => ({
          Componente: name,
          Estado: status,
          Error: error || "N/A",
        })
      );
      console.table(summary);
    };
  }, []);

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
    <>
      <header className="py-3 sticky top-0 z-50 bg-gray-900/90 backdrop-blur-lg border-b border-gray-700">
        <Container className="flex items-center justify-between gap-4">
          <Link
            href={`/${locale}/dev`}
            className="font-bold text-lg text-white hover:text-primary transition-colors"
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
      <CampaignThemeProvider theme={currentThemeData}>
        <Container className="my-8">
          <PageHeader
            title={pageContent.title}
            subtitle={pageContent.subtitle}
          />
          <div className="space-y-12 mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-accent">
                  Section Components Showcase
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {sectionsToRender.map(({ name, Comp, contentKey }, index) => (
                  <React.Fragment key={name}>
                    <TestComponentRenderer
                      name={name}
                      position={index + 1}
                      total={totalComponents}
                      Comp={Comp}
                      content={masterDictionary[contentKey]}
                      logRender={logRender}
                      extraProps={{ locale }}
                    />
                    {index < sectionsToRender.length - 1 && (
                      <Separator className="mt-8" />
                    )}
                  </React.Fragment>
                ))}
              </CardContent>
            </Card>
          </div>
        </Container>
      </CampaignThemeProvider>
    </>
  );
}
// app/[locale]/(dev)/dev/test-page/_components/TestPageClient.tsx
