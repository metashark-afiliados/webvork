// app/[locale]/(dev)/dev/test-page/_components/TestPageClient.tsx
/**
 * @file TestPageClient.tsx
 * @description Vitrina de Resiliencia de Componentes (Cliente).
 * @version 24.0.0 (Pragmatic Type Safety for Dynamic Rendering)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useState, useMemo, ComponentType } from "react";
import Link from "next/link";
import { type Locale } from "@/lib/i18n.config";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { AvailableTheme } from "../_types/themes.types";
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

// --- [INICIO DE REFACTORIZACIÓN DE ÉLITE: Tipado Pragmático] ---
// Para este componente de vitrina dinámica, es una decisión de diseño
// deliberada y segura usar `any` para el tipo del componente, ya que
// renderizamos una colección heterogénea de componentes con diferentes props.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyComponentType = ComponentType<any>;

interface SectionToRender {
  name: string;
  Comp: AnyComponentType;
  contentKey: keyof Dictionary;
}
// --- [FIN DE REFACTORIZACIÓN DE ÉLITE] ---

export default function TestPageClient({
  masterDictionary,
  availableThemes,
  locale,
}: TestPageClientProps) {
  const [selectedThemeId, setSelectedThemeId] = useState<string>("default");

  const sectionsToRender: SectionToRender[] = useMemo(
    () => [
      { name: "BenefitsSection", Comp: Sections.BenefitsSection, contentKey: "benefitsSection" },
      { name: "CommunitySection", Comp: Sections.CommunitySection, contentKey: "communitySection" },
      { name: "ContactSection", Comp: Sections.ContactSection, contentKey: "contactSection" },
      { name: "DoubleScrollingBanner", Comp: Sections.DoubleScrollingBanner, contentKey: "doubleScrollingBanner" },
      { name: "FaqAccordion", Comp: Sections.FaqAccordion, contentKey: "faqAccordion" },
      { name: "FeaturedArticlesCarousel", Comp: Sections.FeaturedArticlesCarousel, contentKey: "featuredArticlesCarousel" },
      { name: "FeaturesSection", Comp: Sections.FeaturesSection, contentKey: "featuresSection" },
      { name: "GuaranteeSection", Comp: Sections.GuaranteeSection, contentKey: "guaranteeSection" },
      { name: "Hero", Comp: Sections.Hero, contentKey: "hero" },
      { name: "HeroNews", Comp: Sections.HeroNews, contentKey: "heroNews" },
      { name: "IngredientAnalysis", Comp: Sections.IngredientAnalysis, contentKey: "ingredientAnalysis" },
      { name: "NewsGrid", Comp: Sections.NewsGrid, contentKey: "newsGrid" },
      { name: "OrderSection", Comp: Sections.OrderSection, contentKey: "orderSection" },
      { name: "PricingSection", Comp: Sections.PricingSection, contentKey: "pricingSection" },
      { name: "ProductShowcase", Comp: Sections.ProductShowcase, contentKey: "productShowcase" },
      { name: "ServicesSection", Comp: Sections.ServicesSection, contentKey: "servicesSection" },
      { name: "SocialProofLogos", Comp: Sections.SocialProofLogos, contentKey: "socialProofLogos" },
      { name: "SponsorsSection", Comp: Sections.SponsorsSection, contentKey: "sponsorsSection" },
      { name: "TeamSection", Comp: Sections.TeamSection, contentKey: "teamSection" },
      { name: "TestimonialCarouselSection", Comp: Sections.TestimonialCarouselSection, contentKey: "testimonialCarouselSection" },
      { name: "TestimonialGrid", Comp: Sections.TestimonialGrid, contentKey: "testimonialGrid" },
      { name: "TextSection", Comp: Sections.TextSection, contentKey: "aboutPage" },
      { name: "ThumbnailCarousel", Comp: Sections.ThumbnailCarousel, contentKey: "thumbnailCarousel" },
    ],
    []
  );

  const pageContent = masterDictionary.devTestPage;

  const defaultThemeObject: AssembledTheme = useMemo(
    () => ({
      layout: { sections: [] },
      colors: {},
      fonts: { sans: "var(--font-sans)", serif: "var(--font-serif)" },
      geometry: { "--radius": "0.5rem" },
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
              {[
                { id: "default", name: `Default Theme (${locale})` },
                ...availableThemes,
              ].map((opt) => (
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
              if (typeof contentKey !== 'string' || !(contentKey in masterDictionary)) {
                return (
                  <Card key={name} className="overflow-hidden border-destructive">
                     <CardHeader><CardTitle className="text-destructive">{name}</CardTitle></CardHeader>
                     <CardContent>Error: Clave de diccionario '{String(contentKey)}' no válida.</CardContent>
                  </Card>
                );
              }
              const content = masterDictionary[contentKey];

              let renderOutput;

              if (!content) {
                renderOutput = (
                  <div className="p-4 text-yellow-500 border border-yellow-500 rounded-md bg-yellow-500/10">
                    <strong>⚠️ Advertencia:</strong>
                    <p className="text-xs">
                      Contenido para '{String(contentKey)}' no encontrado en el diccionario.
                    </p>
                  </div>
                );
              } else {
                try {
                  renderOutput = <Comp content={content} locale={locale} />;
                } catch (error) {
                  renderOutput = (
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
                <Card key={name} className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-accent">{name}</CardTitle>
                  </CardHeader>
                  <CardContent>{renderOutput}</CardContent>
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
