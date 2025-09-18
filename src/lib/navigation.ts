// src/lib/navigation.ts
/**
 * @file navigation.ts
 * @description Manifiesto y SSoT para la definición de rutas.
 *              ESTE ARCHIVO ES GENERADO AUTOMÁTICAMENTE. NO LO EDITE MANUALMENTE.
 *              Ejecute 'pnpm gen:routes' para actualizarlo.
 * @version 2025-09-17T23:25:08.972Z
 * @author Script de Generación Automática de Élite
 */
import { defaultLocale, type Locale } from "@/lib/i18n.config";

export const RouteType = {
  Public: "public",
  DevOnly: "dev-only",
} as const;

export type RouteType = (typeof RouteType)[keyof typeof RouteType];

export type RouteParams = {
  locale?: Locale;
  [key: string]: string | number | undefined;
};

export const routes = {
  about: {
    path: (params: RouteParams & { locale: string | number }) => `/${params.locale || defaultLocale}/${params.locale}/about`.replace(/\/\/+/g, '/').replace(/\/$/, '') || '/',
    type: RouteType.Public,
  },
  bavi: {
    path: (params: RouteParams & { locale: string | number }) => `/${params.locale || defaultLocale}/${params.locale}/bavi`.replace(/\/\/+/g, '/').replace(/\/$/, '') || '/',
    type: RouteType.Public,
  },
  cBycampaignIdByvariantSlugByseoKeywordSlug: {
    path: (params: RouteParams & { locale: string | number; campaignId: string | number; variantSlug: string | number; seoKeywordSlug: string | number }) => `/${params.locale || defaultLocale}/${params.locale}/c/${params.campaignId}/${params.variantSlug}/${params.seoKeywordSlug}`.replace(/\/\/+/g, '/').replace(/\/$/, '') || '/',
    type: RouteType.Public,
  },
  cookies: {
    path: (params: RouteParams & { locale: string | number }) => `/${params.locale || defaultLocale}/${params.locale}/cookies`.replace(/\/\/+/g, '/').replace(/\/$/, '') || '/',
    type: RouteType.Public,
  },
  dev: {
    path: (params: RouteParams & { locale: string | number }) => `/${params.locale || defaultLocale}/${params.locale}/dev`.replace(/\/\/+/g, '/').replace(/\/$/, '') || '/',
    type: RouteType.Public,
  },
  devCampaignSuiteCreate: {
    path: (params: RouteParams & { locale: string | number }) => `/${params.locale || defaultLocale}/${params.locale}/dev/campaign-suite/create`.replace(/\/\/+/g, '/').replace(/\/$/, '') || '/',
    type: RouteType.Public,
  },
  devComponentShowcase: {
    path: (params: RouteParams & { locale: string | number }) => `/${params.locale || defaultLocale}/${params.locale}/dev/component-showcase`.replace(/\/\/+/g, '/').replace(/\/$/, '') || '/',
    type: RouteType.Public,
  },
  devTestPage: {
    path: (params: RouteParams & { locale: string | number }) => `/${params.locale || defaultLocale}/${params.locale}/dev/test-page`.replace(/\/\/+/g, '/').replace(/\/$/, '') || '/',
    type: RouteType.Public,
  },
  home: {
    path: (params: RouteParams & { locale: string | number }) => `/${params.locale || defaultLocale}/${params.locale}`.replace(/\/\/+/g, '/').replace(/\/$/, '') || '/',
    type: RouteType.Public,
  },
  login: {
    path: (params: RouteParams & { locale: string | number }) => `/${params.locale || defaultLocale}/${params.locale}/login`.replace(/\/\/+/g, '/').replace(/\/$/, '') || '/',
    type: RouteType.Public,
  },
  news: {
    path: (params: RouteParams & { locale: string | number }) => `/${params.locale || defaultLocale}/${params.locale}/news`.replace(/\/\/+/g, '/').replace(/\/$/, '') || '/',
    type: RouteType.Public,
  },
  newsByslug: {
    path: (params: RouteParams & { locale: string | number; slug: string | number }) => `/${params.locale || defaultLocale}/${params.locale}/news/${params.slug}`.replace(/\/\/+/g, '/').replace(/\/$/, '') || '/',
    type: RouteType.Public,
  },
  notFound: {
    path: (params: RouteParams & { locale: string | number }) => `/${params.locale || defaultLocale}/${params.locale}/not-found`.replace(/\/\/+/g, '/').replace(/\/$/, '') || '/',
    type: RouteType.Public,
  },
  privacy: {
    path: (params: RouteParams & { locale: string | number }) => `/${params.locale || defaultLocale}/${params.locale}/privacy`.replace(/\/\/+/g, '/').replace(/\/$/, '') || '/',
    type: RouteType.Public,
  },
  razPrompts: {
    path: (params: RouteParams & { locale: string | number }) => `/${params.locale || defaultLocale}/${params.locale}/raz-prompts`.replace(/\/\/+/g, '/').replace(/\/$/, '') || '/',
    type: RouteType.Public,
  },
  store: {
    path: (params: RouteParams & { locale: string | number }) => `/${params.locale || defaultLocale}/${params.locale}/store`.replace(/\/\/+/g, '/').replace(/\/$/, '') || '/',
    type: RouteType.Public,
  },
  storeByslug: {
    path: (params: RouteParams & { locale: string | number; slug: string | number }) => `/${params.locale || defaultLocale}/${params.locale}/store/${params.slug}`.replace(/\/\/+/g, '/').replace(/\/$/, '') || '/',
    type: RouteType.Public,
  },
  terms: {
    path: (params: RouteParams & { locale: string | number }) => `/${params.locale || defaultLocale}/${params.locale}/terms`.replace(/\/\/+/g, '/').replace(/\/$/, '') || '/',
    type: RouteType.Public,
  }
} as const;
