// shared/lib/navigation.ts
/**
 * @file navigation.ts
 * @description Manifiesto y SSoT para la definición de rutas del ecosistema.
 *              ESTE ARCHIVO ES GENERADO Y MANTENIDO PARA REFLEJAR LA ARQUITECTURA
 *              COMPLETA DEL PROYECTO.
 * @version 9.0.0 (CogniRead Domain Integration)
 * @author RaZ Podestá - MetaShark Tech
 */
import { defaultLocale, type Locale } from "@/shared/lib/i18n.config";
import { logger } from "@/shared/lib/logging";

logger.info(
  "[Observabilidad][ARQUITECTURA-RAIZ] Cargando Manifiesto de Rutas v9.0..."
);

/**
 * @const RouteType
 * @description Define los tipos de acceso para las rutas.
 */
export const RouteType = {
  Public: "public",
  DevOnly: "dev-only",
} as const;

export type RouteType = (typeof RouteType)[keyof typeof RouteType];

/**
 * @type RouteParams
 * @description Contrato de tipo base para los parámetros de una función de ruta.
 *              Toda ruta requiere, como mínimo, un `locale`.
 */
export type RouteParams = {
  locale?: Locale;
  [key: string]: string | number | undefined;
};

/**
 * @const routes
 * @description El registro soberano de todas las rutas de la aplicación. Cada entrada
 *              define una función `path` para construir la URL de forma segura y un `type`
 *              para control de acceso.
 */
export const routes = {
  // --- Dominio Público ---
  home: {
    path: (params: RouteParams) =>
      `/${params.locale || defaultLocale}`.replace(/\/$/, "") || "/",
    type: RouteType.Public,
  },
  store: {
    path: (params: RouteParams) => `/${params.locale || defaultLocale}/store`,
    type: RouteType.Public,
  },
  storeBySlug: {
    path: (params: RouteParams & { slug: string | number }) =>
      `/${params.locale || defaultLocale}/store/${params.slug}`,
    type: RouteType.Public,
  },
  news: {
    path: (params: RouteParams) => `/${params.locale || defaultLocale}/news`,
    type: RouteType.Public,
  },
  newsBySlug: {
    path: (params: RouteParams & { slug: string | number }) =>
      `/${params.locale || defaultLocale}/news/${params.slug}`,
    type: RouteType.Public,
  },
  about: {
    path: (params: RouteParams) => `/${params.locale || defaultLocale}/about`,
    type: RouteType.Public,
  },
  terms: {
    path: (params: RouteParams) => `/${params.locale || defaultLocale}/terms`,
    type: RouteType.Public,
  },
  privacy: {
    path: (params: RouteParams) => `/${params.locale || defaultLocale}/privacy`,
    type: RouteType.Public,
  },
  cookies: {
    path: (params: RouteParams) => `/${params.locale || defaultLocale}/cookies`,
    type: RouteType.Public,
  },
  notFound: {
    path: (params: RouteParams) =>
      `/${params.locale || defaultLocale}/not-found`,
    type: RouteType.Public,
  },
  // --- Dominio de Campañas ---
  cByCampaignIdByVariantSlugBySeoKeywordSlug: {
    path: (
      params: RouteParams & {
        campaignId: string | number;
        variantSlug: string | number;
        seoKeywordSlug: string | number;
      }
    ) =>
      `/${params.locale || defaultLocale}/c/${params.campaignId}/${
        params.variantSlug
      }/${params.seoKeywordSlug}`,
    type: RouteType.Public,
  },

  // --- Dominio del Developer Command Center (DCC) ---
  devDashboard: {
    path: (params: RouteParams) => `/${params.locale || defaultLocale}/dev`,
    type: RouteType.DevOnly,
  },
  devLogin: {
    path: (params: RouteParams) =>
      `/${params.locale || defaultLocale}/dev/login`,
    type: RouteType.DevOnly,
  },
  devTestPage: {
    path: (params: RouteParams) =>
      `/${params.locale || defaultLocale}/dev/test-page`,
    type: RouteType.DevOnly,
  },
  devComponentShowcase: {
    path: (params: RouteParams) =>
      `/${params.locale || defaultLocale}/dev/component-showcase`,
    type: RouteType.DevOnly,
  },
  // Sub-dominio: Suite de Diseño de Campañas (SDC)
  devCampaignSuiteCreate: {
    path: (params: RouteParams) =>
      `/${params.locale || defaultLocale}/dev/campaign-suite/create`,
    type: RouteType.DevOnly,
  },
  // Sub-dominio: BAVI
  bavi: {
    path: (params: RouteParams) =>
      `/${params.locale || defaultLocale}/dev/bavi`,
    type: RouteType.DevOnly,
  },
  // Sub-dominio: RaZPrompts
  razPrompts: {
    path: (params: RouteParams) =>
      `/${params.locale || defaultLocale}/dev/raz-prompts`,
    type: RouteType.DevOnly,
  },
  // --- (NUEVO) Sub-dominio: CogniRead ---
  cogniReadDashboard: {
    path: (params: RouteParams) =>
      `/${params.locale || defaultLocale}/dev/cogniread`,
    type: RouteType.DevOnly,
  },
  cogniReadEditor: {
    path: (params: RouteParams) =>
      `/${params.locale || defaultLocale}/dev/cogniread/editor`,
    type: RouteType.DevOnly,
  },
} as const;
// shared/lib/navigation.ts
