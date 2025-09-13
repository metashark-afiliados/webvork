// lib/schemas/i18n.schema.ts
/**
 * @file i18n.schema.ts
 * @description SSoT Ensamblador para la estructura de datos de i18n global.
 *              Esta versión se ha refactorizado exhaustivamente para incluir TODOS
 *              los schemas de componentes y páginas, resolviendo errores críticos de
 *              validación de contenido en tiempo de ejecución.
 * @version 24.1.0
 * @author RaZ podesta - MetaShark Tech
 */
import { z } from "zod";

// --- Schemas de Componentes Core ---
import { GlobalsLocaleSchema } from "./globals.schema";
import { HeaderLocaleSchema } from "./components/header.schema";
import { FooterLocaleSchema } from "./components/footer.schema";
import { ScrollingBannerLocaleSchema } from "./components/scrolling-banner.schema";
import { HeroLocaleSchema } from "./components/hero.schema";
import { SocialProofLocaleSchema } from "./components/social-proof.schema";
import { BenefitsSectionLocaleSchema } from "./components/benefits-section.schema";
import { IngredientAnalysisLocaleSchema } from "./components/ingredient-analysis.schema";
import { ThumbnailCarouselLocaleSchema } from "./components/thumbnail-carousel.schema";
import { TestimonialGridLocaleSchema } from "./components/testimonial-grid.schema";
import { DoubleScrollingBannerLocaleSchema } from "./components/double-scrolling-banner.schema";
import { FaqAccordionLocaleSchema } from "./components/faq-accordion.schema";
import { GuaranteeSectionLocaleSchema } from "./components/guarantee-section.schema";
import { OrderFormLocaleSchema } from "./components/order-form.schema";
import { NewsGridLocaleSchema } from "./components/news-grid.schema";
import { HeroNewsLocaleSchema } from "./components/hero-news.schema";
import { ProductShowcaseLocaleSchema } from "./components/product-showcase.schema";
import { CookieConsentBannerLocaleSchema } from "./components/cookie-consent-banner.schema";
import { CommunitySectionLocaleSchema } from "./components/community-section.schema";
import { ContactSectionLocaleSchema } from "./components/contact-section.schema";
import { FeaturesSectionLocaleSchema } from "./components/features-section.schema";
import { PricingSectionLocaleSchema } from "./components/pricing-section.schema";
import { ServicesSectionLocaleSchema } from "./components/services-section.schema";
import { SponsorsSectionLocaleSchema } from "./components/sponsors-section.schema";
import { TeamSectionLocaleSchema } from "./components/team-section.schema";
import { TestimonialCarouselSectionLocaleSchema } from "./components/testimonial-carousel-section.schema";

// --- Schemas de Componentes Naturalizados (razBits) ---
import { CardNavLocaleSchema } from "@/components/razBits/CardNav/card-nav.schema";
import { LightRaysLocaleSchema } from "@/components/razBits/LightRays/light-rays.schema";
import { MagicBentoLocaleSchema } from "@/components/razBits/MagicBento/magic-bento.schema";
import { DockLocaleSchema } from "@/components/razBits/Dock/dock.schema";

// --- Schemas de Componentes de Desarrollo ---
import { DevRouteMenuLocaleSchema } from "./components/dev/dev-route-menu.schema";
import { DevHomepageHeaderLocaleSchema } from "./components/dev/dev-homepage-header.schema";
import { DevHeaderLocaleSchema } from "./components/dev/dev-header.schema";

// --- Schemas de Páginas ---
import { StorePageLocaleSchema } from "./pages/store-page.schema";
import { TextPageLocaleSchema } from "./pages/text-page.schema";
import { DevDashboardLocaleSchema } from "./pages/dev-dashboard.schema";
import { DevCampaignSimulatorLocaleSchema } from "./pages/dev-campaign-simulator.schema";

// --- Ensamblador de Schemas ---
export const i18nSchema = z
  .object({})
  // Componentes Core
  .merge(GlobalsLocaleSchema)
  .merge(HeaderLocaleSchema)
  .merge(FooterLocaleSchema)
  .merge(ScrollingBannerLocaleSchema)
  .merge(NewsGridLocaleSchema)
  .merge(HeroLocaleSchema)
  .merge(SocialProofLocaleSchema)
  .merge(BenefitsSectionLocaleSchema)
  .merge(IngredientAnalysisLocaleSchema)
  .merge(ThumbnailCarouselLocaleSchema)
  .merge(TestimonialGridLocaleSchema)
  .merge(DoubleScrollingBannerLocaleSchema)
  .merge(FaqAccordionLocaleSchema)
  .merge(GuaranteeSectionLocaleSchema)
  .merge(OrderFormLocaleSchema)
  .merge(HeroNewsLocaleSchema)
  .merge(ProductShowcaseLocaleSchema)
  .merge(CookieConsentBannerLocaleSchema)
  .merge(CommunitySectionLocaleSchema)
  .merge(ContactSectionLocaleSchema)
  .merge(FeaturesSectionLocaleSchema)
  .merge(PricingSectionLocaleSchema)
  .merge(ServicesSectionLocaleSchema)
  .merge(SponsorsSectionLocaleSchema)
  .merge(TeamSectionLocaleSchema)
  .merge(TestimonialCarouselSectionLocaleSchema)

  // Componentes Naturalizados (razBits)
  .merge(CardNavLocaleSchema)
  .merge(LightRaysLocaleSchema)
  .merge(MagicBentoLocaleSchema)
  .merge(DockLocaleSchema)

  // Componentes de Desarrollo
  .merge(DevRouteMenuLocaleSchema)
  .merge(DevHomepageHeaderLocaleSchema)
  .merge(DevHeaderLocaleSchema)

  // Páginas
  .merge(StorePageLocaleSchema)
  .merge(z.object({ aboutPage: TextPageLocaleSchema.optional() }))
  .merge(z.object({ privacyPage: TextPageLocaleSchema.optional() }))
  .merge(z.object({ termsPage: TextPageLocaleSchema.optional() }))
  .merge(DevDashboardLocaleSchema)
  .merge(DevCampaignSimulatorLocaleSchema);

// --- Tipo de Diccionario Global ---
export type Dictionary = z.infer<typeof i18nSchema>;
// lib/schemas/i18n.schema.ts
