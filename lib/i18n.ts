// lib/i18n.ts
/**
 * @file i18n.ts
 * @description Aparato ensamblador de diccionarios para el portal.
 * @version 6.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import "server-only";
import { i18nSchema, type Dictionary } from "@/lib/schemas/i18n.schema";
import {
  supportedLocales,
  defaultLocale,
  type Locale,
} from "@/lib/i18n.config";
import { logger } from "@/lib/logging";

// --- Importaciones de Contenido ---
import globalI18n from "@/messages/global.i18n.json";
import headerI18n from "@/messages/components/header/header.i18n.json";
import footerI18n from "@/messages/components/footer/footer.i18n.json";
import scrollingBannerI18n from "@/messages/components/scrolling-banner/scrolling-banner.i18n.json";
import heroNewsI18n from "@/messages/components/hero-news/hero-news.i18n.json";
import newsGridI18n from "@/messages/components/news-grid/news-grid.i18n.json";
import productShowcaseI18n from "@/messages/components/product-showcase/product-showcase.i18n.json";
import socialProofI18n from "@/messages/components/social-proof/social-proof.i18n.json";
import cookieConsentBannerI18n from "@/messages/components/cookie-consent-banner/cookie-consent-banner.i18n.json";
// --- INICIO DE MODIFICACIÓN ---
import benefitsSectionI18n from "@/messages/components/benefits-section/benefits-section.i18n.json";
// --- FIN DE MODIFICACIÓN ---
import cardNavI18n from "@/components/razBits/CardNav/card-nav.i18n.json";
import lightRaysI18n from "@/components/razBits/LightRays/light-rays.i18n.json";
import magicBentoI18n from "@/components/razBits/MagicBento/magic-bento.i18n.json";
import dockI18n from "@/components/razBits/Dock/dock.i18n.json";
import devHeaderI18n from "@/messages/components/dev/dev-header.i18n.json";
import devHomepageHeaderI18n from "@/messages/components/dev/dev-homepage-header.i18n.json";
import devRouteMenuI18n from "@/messages/components/dev/dev-route-menu.i18n.json";
import aboutPageI18n from "@/messages/pages/about-page.i18n.json";
import privacyPageI18n from "@/messages/pages/privacy-page.i18n.json";
import storePageI18n from "@/messages/pages/store-page.i18n.json";
import termsPageI18n from "@/messages/pages/terms-page.i18n.json";
import devDashboardI18n from "@/messages/pages/dev-dashboard.i18n.json";
import devCampaignSimulatorI18n from "@/messages/pages/dev-campaign-simulator.i18n.json";

type I18nModuleContent = {
  [key in Locale]?: Record<string, any>;
};

const allI18nModules: I18nModuleContent[] = [
  globalI18n,
  headerI18n,
  footerI18n,
  scrollingBannerI18n,
  heroNewsI18n,
  newsGridI18n,
  productShowcaseI18n,
  socialProofI18n,
  cookieConsentBannerI18n,
  // --- INICIO DE MODIFICACIÓN ---
  benefitsSectionI18n,
  // --- FIN DE MODIFICACIÓN ---
  cardNavI18n,
  lightRaysI18n,
  magicBentoI18n,
  dockI18n,
  devHeaderI18n,
  devHomepageHeaderI18n,
  devRouteMenuI18n,
  aboutPageI18n,
  privacyPageI18n,
  storePageI18n,
  termsPageI18n,
  devDashboardI18n,
  devCampaignSimulatorI18n,
];

const dictionariesCache: Partial<Record<Locale, Dictionary>> = {};

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  const validatedLocale = supportedLocales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;

  if (dictionariesCache[validatedLocale]) {
    logger.trace(
      `[i18n] Diccionario para '${validatedLocale}' encontrado en caché.`
    );
    return dictionariesCache[validatedLocale] as Dictionary;
  }

  logger.info(
    `[i18n] Ensamblando y validando diccionario para locale: ${validatedLocale}`
  );

  const fullDictionary = allI18nModules.reduce((acc, moduleContent) => {
    const localeSpecificContent = moduleContent[validatedLocale];
    return { ...acc, ...(localeSpecificContent || {}) };
  }, {});

  const validation = i18nSchema.safeParse(fullDictionary);

  if (!validation.success) {
    logger.error(
      `[i18n] Error de validación de contenido para portal en locale "${validatedLocale}":`,
      {
        errors: validation.error.flatten().fieldErrors,
        "diccionario-keys": Object.keys(fullDictionary),
      }
    );
    throw new Error(
      `El contenido del portal para el locale "${validatedLocale}" es inválido. Revise los esquemas y los archivos .i18n.json.`
    );
  }

  dictionariesCache[validatedLocale] = validation.data;
  logger.info(
    `[i18n] Diccionario para '${validatedLocale}' ensamblado y validado exitosamente.`
  );
  return validation.data;
};
// lib/i18n.ts
