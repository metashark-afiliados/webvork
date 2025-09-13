// components/dev/utils/route-menu.generator.ts
/**
 * @file route-menu.generator.ts
 * @description Aparato de lógica pura para generar la estructura de datos del menú de desarrollo.
 *              Actúa como un "builder" que consume las SSoT de rutas (navigation.ts) y
 *              contenido (i18n) para producir un modelo de vista para el componente presentacional.
 * @version 6.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/components/dev/utils/route-menu.generator.ts.md
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
 * @description Construye la estructura de datos para el menú de desarrollo. Es una función pura
 *              que transforma la configuración y el contenido en un view-model.
 * @param {NonNullable<Dictionary["devRouteMenu"]>} dictionary - El objeto de contenido para el menú.
 * @param {Locale} locale - El locale actual para generar las URLs.
 * @returns {RouteGroup[]} La estructura de datos completa para renderizar el menú.
 */
export function generateDevRoutes(
  dictionary: NonNullable<Dictionary["devRouteMenu"]>,
  locale: Locale
): RouteGroup[] {
  logger.trace(
    "[RouteMenuGenerator] Generando estructura de datos del menú de desarrollo."
  );

  const CAMPAIGN_ID = producerConfig.LANDING_ID;

  return [
    {
      groupName: dictionary.devToolsGroup,
      items: [
        {
          name: dictionary.componentCanvas,
          path: routes.devComponentCanvas.path({ locale }),
          iconName: "FlaskConical",
        },
        {
          name: dictionary.campaignSimulator,
          path: routes.devCampaignSimulator.path({ locale }),
          iconName: "Rocket",
        },
        {
          name: dictionary.branding,
          path: routes.devBranding.path({ locale }),
          iconName: "LayoutDashboard",
        },
      ],
    },
    {
      groupName: dictionary.campaignPagesGroup,
      items: [
        {
          name: dictionary.campaignPage,
          path: routes.campaign.path({ locale, campaignId: CAMPAIGN_ID }),
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
