// components/dev/utils/route-menu.generator.ts
/**
 * @file route-menu.generator.ts
 * @description Aparato de lógica pura para generar la estructura de datos del menú de desarrollo.
 *              v2.0.0 (Holistic Refactor): Ahora es completamente resiliente. Maneja
 *              contenido `undefined` devolviendo un array vacío y logueando una
 *              advertencia clara. Resuelve todos los errores de tipo TS2339.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import { type LucideIconName } from "@/config/lucide-icon-names";
import { producerConfig } from "@/config/producer.config";
import { routes } from "@/lib/navigation";
import { type Locale } from "@/lib/i18n.config";
import { type Dictionary } from "@/lib/schemas/i18n.schema";
import { logger } from "@/lib/logging";

export interface RouteItem {
  name: string;
  path: string;
  iconName: LucideIconName;
}

export interface RouteGroup {
  groupName: string;
  items: RouteItem[];
}

/**
 * @function generateDevRoutes
 * @description Función pura y resiliente que transforma el diccionario i18n y
 *              el locale en una estructura de datos navegable.
 * @param {Dictionary['devRouteMenu']} dictionary - El fragmento del diccionario. Puede ser undefined.
 * @param {Locale} locale - El locale actual.
 * @returns {RouteGroup[]} La estructura de datos del menú, o un array vacío si el contenido es inválido.
 */
export function generateDevRoutes(
  dictionary: Dictionary["devRouteMenu"], // Acepta `undefined`
  locale: Locale
): RouteGroup[] {
  logger.info(
    "[Observabilidad][route-menu.generator] Generando estructura de datos..."
  );

  // --- [INICIO DE REFACTORIZACIÓN HOLÍSTICA] ---
  // 1. Guarda de seguridad: Si el diccionario no existe, no se puede generar el menú.
  if (!dictionary) {
    logger.warn(
      "[route-menu.generator] El diccionario 'devRouteMenu' es undefined. No se puede generar el menú de desarrollo. Esto es esperado si el archivo i18n está incompleto."
    );
    return []; // Devuelve un array vacío para evitar errores de runtime.
  }
  // --- [FIN DE REFACTORIZACIÓN HOLÍSTICA] ---

  const CAMPAIGN_ID = producerConfig.LANDING_ID;
  const campaignParams = {
    locale,
    campaignId: CAMPAIGN_ID,
    variantSlug: "default-variant",
    seoKeywordSlug: "default-seo-slug",
  };

  return [
    {
      groupName: dictionary.devToolsGroup,
      items: [
        {
          name: dictionary.campaignDesignSuite,
          path: routes.campaignSuiteCreate.path({ locale }),
          iconName: "WandSparkles",
        },
        {
          name: dictionary.testPage,
          path: routes.devTestPage.path({ locale }),
          iconName: "ShieldCheck",
        },
      ],
    },
    {
      groupName: dictionary.campaignPagesGroup,
      items: [
        {
          name: dictionary.campaignPage,
          path: routes.campaign.path(campaignParams),
          iconName: "Rocket",
        },
      ],
    },
    {
      groupName: dictionary.portalPagesGroup,
      items: [
        {
          name: dictionary.home,
          path: routes.home.path({ locale }),
          iconName: "Home",
        },
        {
          name: dictionary.store,
          path: routes.store.path({ locale }),
          iconName: "Store",
        },
        {
          name: dictionary.news,
          path: routes.news.path({ locale }),
          iconName: "Newspaper",
        },
        {
          name: dictionary.about,
          path: routes.about.path({ locale }),
          iconName: "Info",
        },
      ],
    },
    {
      groupName: dictionary.legalPagesGroup,
      items: [
        {
          name: dictionary.terms,
          path: routes.terms.path({ locale }),
          iconName: "BookCopy",
        },
        {
          name: dictionary.privacy,
          path: routes.privacy.path({ locale }),
          iconName: "Shield",
        },
        {
          name: dictionary.cookies,
          path: routes.cookies.path({ locale }),
          iconName: "Cookie",
        },
      ],
    },
  ];
}
// components/dev/utils/route-menu.generator.ts
