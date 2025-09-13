// lib/navigation.ts
/**
 * @file navigation.ts
 * @description Manifiesto y SSoT (Single Source of Truth) para la definición de TODAS
 *              las rutas de la aplicación.
 *              - v7.0.0: Añade rutas dinámicas para productos (`storeProduct`) y
 *                artículos de noticias (`newsArticle`), permitiendo la construcción
 *                de URLs desacopladas del contenido.
 * @version 7.0.0
 * @author Gemini AI - Asistente de IA de Google
 */
import { type LucideIconName } from "@/config/lucide-icon-names";
import { defaultLocale, type Locale } from "@/lib/i18n.config";

export const RouteType = {
  Public: "public",
  Guest: "guest",
  Protected: "protected",
  DevOnly: "dev-only",
} as const;

export type RouteType = (typeof RouteType)[keyof typeof RouteType];

export type RouteParams = {
  locale?: Locale;
  [key: string]: string | number | undefined;
};

export interface RouteConfig {
  path: (params?: RouteParams) => string;
  type: RouteType;
}

export const routes = {
  home: {
    path: (params: RouteParams = {}) => `/${params.locale || defaultLocale}`,
    type: RouteType.Public,
  },
  about: {
    path: (params: RouteParams = {}) =>
      `/${params.locale || defaultLocale}/about`,
    type: RouteType.Public,
  },
  store: {
    path: (params: RouteParams = {}) =>
      `/${params.locale || defaultLocale}/store`,
    type: RouteType.Public,
  },
  storeProduct: {
    path: (params: RouteParams & { slug: string }) =>
      `/${params.locale || defaultLocale}/store/${params.slug}`,
    type: RouteType.Public,
  },
  news: {
    path: (params: RouteParams = {}) =>
      `/${params.locale || defaultLocale}/news`,
    type: RouteType.Public,
  },
  newsArticle: {
    path: (params: RouteParams & { slug: string }) =>
      `/${params.locale || defaultLocale}/news/${params.slug}`,
    type: RouteType.Public,
  },
  campaign: {
    path: (params: RouteParams) =>
      `/${params.locale}/campaigns/${params.campaignId}`,
    type: RouteType.Public,
  },
  terms: {
    path: (params: RouteParams = {}) =>
      `/${params.locale || defaultLocale}/terms`,
    type: RouteType.Public,
  },
  privacy: {
    path: (params: RouteParams = {}) =>
      `/${params.locale || defaultLocale}/privacy`,
    type: RouteType.Public,
  },
  cookies: {
    path: (params: RouteParams = {}) =>
      `/${params.locale || defaultLocale}/cookies`,
    type: RouteType.Public,
  },
  devDashboard: {
    path: (params: RouteParams = {}) =>
      `/${params.locale || defaultLocale}/dev`,
    type: RouteType.DevOnly,
  },
  devComponentCanvas: {
    path: (params: RouteParams = {}) =>
      `/${params.locale || defaultLocale}/dev/components`,
    type: RouteType.DevOnly,
  },
  devComponentDetail: {
    path: (params: RouteParams) =>
      `/${params.locale}/dev/components/${params.componentName}`,
    type: RouteType.DevOnly,
  },
  devCampaignSimulator: {
    path: (params: RouteParams = {}) =>
      `/${params.locale || defaultLocale}/dev/simulator`,
    type: RouteType.DevOnly,
  },
  devBranding: {
    path: (params: RouteParams = {}) =>
      `/${params.locale || defaultLocale}/dev/branding`,
    type: RouteType.DevOnly,
  },
} as const;
// lib/navigation.ts
