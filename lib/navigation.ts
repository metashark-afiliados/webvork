// lib/navigation.ts
/**
 * @file navigation.ts
 * @description Manifiesto y SSoT para la definición de rutas.
 *              - v11.0.0: Elimina la ruta obsoleta 'devCampaignSimulator' tras la
 *                deprecación del Configurador de Layouts.
 * @version 11.0.0
 * @author RaZ Podestá - MetaShark Tech
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
  // --- Rutas Públicas del Portal ---
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
  // --- Rutas de Campaña ---
  campaign: {
    path: (
      params: RouteParams & {
        campaignId: string | number;
        variantSlug: string;
        seoKeywordSlug: string;
      }
    ) =>
      `/${params.locale || defaultLocale}/c/${params.campaignId}/${params.variantSlug}/${params.seoKeywordSlug}`,
    type: RouteType.Public,
  },
  // --- Rutas Legales ---
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
  // --- Rutas del Developer Command Center (DCC) ---
  devDashboard: {
    path: (params: RouteParams = {}) =>
      `/${params.locale || defaultLocale}/dev`,
    type: RouteType.DevOnly,
  },
  devTestPage: {
    path: (params: RouteParams = {}) =>
      `/${params.locale || defaultLocale}/dev/test-page`,
    type: RouteType.DevOnly,
  },
  campaignSuiteCreate: {
    path: (params: RouteParams & { step?: number | string }) => {
      const baseUrl = `/${
        params.locale || defaultLocale
      }/dev/campaign-suite/create`;
      return params.step !== undefined
        ? `${baseUrl}?step=${params.step}`
        : baseUrl;
    },
    type: RouteType.DevOnly,
  },
} as const;
// lib/navigation.ts
