// lib/navigation.ts
/**
 * @file navigation.ts
 * @description Manifiesto y SSoT para la definición de rutas.
 *              ESTE ARCHIVO ES GENERADO AUTOMÁTICAMENTE. NO LO EDITE MANUALMENTE.
 *              Ejecute 'pnpm gen:routes' para actualizarlo.
 * @version 2025-09-18T17:06:28.479Z
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
    path: (params: RouteParams) =>
      `/${params.locale || defaultLocale}/about`
        .replace(/[/]{2,}/g, "/")
        .replace(/[/]$/, "") || "/",
    type: RouteType.Public,
  },
  bavi: {
    path: (params: RouteParams) =>
      `/${params.locale || defaultLocale}/dev/bavi`
        .replace(/[/]{2,}/g, "/")
        .replace(/[/]$/, "") || "/",
    type: RouteType.DevOnly,
  },
  cByCampaignIdByVariantSlugBySeoKeywordSlug: {
    path: (
      params: RouteParams & {
        campaignId: string | number;
        variantSlug: string | number;
        seoKeywordSlug: string | number;
      }
    ) =>
      `/${params.locale || defaultLocale}/c/${params.campaignId}/${params.variantSlug}/${params.seoKeywordSlug}`
        .replace(/[/]{2,}/g, "/")
        .replace(/[/]$/, "") || "/",
    type: RouteType.Public,
  },
  cookies: {
    path: (params: RouteParams) =>
      `/${params.locale || defaultLocale}/cookies`
        .replace(/[/]{2,}/g, "/")
        .replace(/[/]$/, "") || "/",
    type: RouteType.Public,
  },
  devCampaignSuiteCreate: {
    path: (params: RouteParams) =>
      `/${params.locale || defaultLocale}/dev/campaign-suite/create`
        .replace(/[/]{2,}/g, "/")
        .replace(/[/]$/, "") || "/",
    type: RouteType.DevOnly,
  },
  devComponentShowcase: {
    path: (params: RouteParams) =>
      `/${params.locale || defaultLocale}/dev/component-showcase`
        .replace(/[/]{2,}/g, "/")
        .replace(/[/]$/, "") || "/",
    type: RouteType.DevOnly,
  },
  devDashboard: {
    path: (params: RouteParams) =>
      `/${params.locale || defaultLocale}/dev`
        .replace(/[/]{2,}/g, "/")
        .replace(/[/]$/, "") || "/",
    type: RouteType.DevOnly,
  },
  devLogin: {
    path: (params: RouteParams) =>
      `/${params.locale || defaultLocale}/dev/login`
        .replace(/[/]{2,}/g, "/")
        .replace(/[/]$/, "") || "/",
    type: RouteType.DevOnly,
  },
  devTestPage: {
    path: (params: RouteParams) =>
      `/${params.locale || defaultLocale}/dev/test-page`
        .replace(/[/]{2,}/g, "/")
        .replace(/[/]$/, "") || "/",
    type: RouteType.DevOnly,
  },
  home: {
    path: (params: RouteParams) =>
      `/${params.locale || defaultLocale}/`
        .replace(/[/]{2,}/g, "/")
        .replace(/[/]$/, "") || "/",
    type: RouteType.Public,
  },
  news: {
    path: (params: RouteParams) =>
      `/${params.locale || defaultLocale}/news`
        .replace(/[/]{2,}/g, "/")
        .replace(/[/]$/, "") || "/",
    type: RouteType.Public,
  },
  newsBySlug: {
    path: (params: RouteParams & { slug: string | number }) =>
      `/${params.locale || defaultLocale}/news/${params.slug}`
        .replace(/[/]{2,}/g, "/")
        .replace(/[/]$/, "") || "/",
    type: RouteType.Public,
  },
  notFound: {
    path: (params: RouteParams) =>
      `/${params.locale || defaultLocale}/not-found`
        .replace(/[/]{2,}/g, "/")
        .replace(/[/]$/, "") || "/",
    type: RouteType.Public,
  },
  privacy: {
    path: (params: RouteParams) =>
      `/${params.locale || defaultLocale}/privacy`
        .replace(/[/]{2,}/g, "/")
        .replace(/[/]$/, "") || "/",
    type: RouteType.Public,
  },
  razPrompts: {
    path: (params: RouteParams) =>
      `/${params.locale || defaultLocale}/dev/raz-prompts`
        .replace(/[/]{2,}/g, "/")
        .replace(/[/]$/, "") || "/",
    type: RouteType.DevOnly,
  },
  store: {
    path: (params: RouteParams) =>
      `/${params.locale || defaultLocale}/store`
        .replace(/[/]{2,}/g, "/")
        .replace(/[/]$/, "") || "/",
    type: RouteType.Public,
  },
  storeBySlug: {
    path: (params: RouteParams & { slug: string | number }) =>
      `/${params.locale || defaultLocale}/store/${params.slug}`
        .replace(/[/]{2,}/g, "/")
        .replace(/[/]$/, "") || "/",
    type: RouteType.Public,
  },
  terms: {
    path: (params: RouteParams) =>
      `/${params.locale || defaultLocale}/terms`
        .replace(/[/]{2,}/g, "/")
        .replace(/[/]$/, "") || "/",
    type: RouteType.Public,
  },
} as const;
