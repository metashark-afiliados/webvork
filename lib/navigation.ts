// lib/navigation.ts
/**
 * @file navigation.ts
 * @description Manifiesto y SSoT (Single Source of Truth) para la definición de TODAS
 *              las rutas de la aplicación. Centraliza las plantillas de URL, los tipos
 *              de ruta y los manifiestos de menú estáticos para garantizar la consistencia
 *              y facilitar el mantenimiento.
 * @version 6.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/lib/navigation.ts.md
 */
import { type LucideIconName } from "@/config/lucide-icon-names";
import { defaultLocale, type Locale } from "@/lib/i18n.config";

/**
 * @constant RouteType
 * @description Define los tipos de acceso para las rutas, utilizados por el middleware
 *              para aplicar la lógica de control de acceso.
 */
export const RouteType = {
  Public: "public",
  Guest: "guest",
  Protected: "protected",
  DevOnly: "dev-only",
} as const;

export type RouteType = (typeof RouteType)[keyof typeof RouteType];

/**
 * @type RouteParams
 * @description Define la estructura base para los parámetros de una función de ruta.
 *              Toda función `path` aceptará un objeto con `locale` y otros parámetros dinámicos.
 */
export type RouteParams = {
  locale?: Locale;
  [key: string]: string | number | undefined;
};

/**
 * @interface RouteConfig
 * @description Define el contrato para una entrada individual en el objeto `routes`.
 */
export interface RouteConfig {
  path: (params?: RouteParams) => string;
  type: RouteType;
}

/**
 * @constant routes
 * @description El objeto SSoT que contiene todas las rutas de la aplicación.
 *              Cada entrada proporciona una función `path` para generar la URL de forma segura
 *              y un `type` para la lógica de middleware.
 */
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

/**
 * @interface NavLink
 * @description Contrato para los enlaces de navegación, utilizado para construir menús estáticos.
 */
export interface NavLink {
  href: string;
  label: string;
  icon?: LucideIconName; // <<-- MEJORA: Utiliza la SSoT LucideIconName (PascalCase)
}

/**
 * @constant navigationManifest
 * @description Manifiesto estático para menús de navegación, como el menú de desarrollo.
 */
export const navigationManifest: { devRoutes: NavLink[] } = {
  devRoutes: [
    {
      href: routes.devDashboard.path(),
      label: "Dashboard",
      icon: "LayoutDashboard", // <<-- CORRECCIÓN: PascalCase
    },
    {
      href: routes.devComponentCanvas.path(),
      label: "Component Canvas",
      icon: "Component", // <<-- CORRECCIÓN: PascalCase
    },
    {
      href: routes.devCampaignSimulator.path(),
      label: "Campaign Simulator",
      icon: "PlayCircle", // <<-- CORRECCIÓN: PascalCase (Resuelve el error TS2322)
    },
    {
      href: routes.devBranding.path(),
      label: "Branding",
      icon: "Palette", // <<-- CORRECCIÓN: PascalCase
    },
  ],
};
// lib/navigation.ts
