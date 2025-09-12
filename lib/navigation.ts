// src/lib/navigation.ts
/**
 * @file navigation.ts
 * @description Manifiesto y SSoT para la definición de TODAS las rutas de la aplicación.
 *              - v5.0.0: Restaura el objeto `routes` como SSoT completo,
 *                corrigiendo errores en cascada en sitemap y componentes.
 *                Se ajustan las firmas de las funciones `path` para ser type-safe.
 * @version 5.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import type { LucideIcon } from "lucide-react";
import type dynamicIconImports from "lucide-react/dynamicIconImports";
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

// CORRECCIÓN: Se restauran TODAS las rutas para que este objeto sea la SSoT.
// Las funciones `path` ahora aceptan `params` con un tipo explícito.
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
  news: {
    path: (params: RouteParams = {}) =>
      `/${params.locale || defaultLocale}/news`,
    type: RouteType.Public,
  },
  newsArticle: {
    path: (params: RouteParams) => `/${params.locale}/news/${params.slug}`,
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

export interface NavLink {
  href: string;
  label: string;
  icon?: keyof typeof dynamicIconImports;
}

export const navigationManifest: { devRoutes: NavLink[] } = {
  devRoutes: [
    {
      href: routes.devDashboard.path(),
      label: "Dashboard",
      icon: "layout-dashboard",
    },
    {
      href: routes.devComponentCanvas.path(),
      label: "Component Canvas",
      icon: "component",
    },
    {
      href: routes.devCampaignSimulator.path(),
      label: "Campaign Simulator",
      icon: "play-circle",
    },
    { href: routes.devBranding.path(), label: "Branding", icon: "palette" },
  ],
};
