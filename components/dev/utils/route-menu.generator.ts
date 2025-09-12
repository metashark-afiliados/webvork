// src/components/dev/utils/route-menu.generator.ts
/**
 * @file route-menu.generator.ts
 * @description Aparato de lógica pura para generar la estructura de datos del menú de desarrollo.
 *              Refactorizado para usar las claves de ruta correctas desde la SSoT `navigation.ts`,
 *              resolviendo errores de tipo TS2339 y mejorando la observabilidad.
 * @version 6.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs-espejo/components/dev/utils/route-menu.generator.ts.md
 */
import { type LucideIconName } from "@/config/lucide-icon-names";
import { producerConfig } from "@/config/producer.config";
import { routes } from "@/lib/navigation";
import { type Locale } from "@/lib/i18n.config";
import { type Dictionary } from "@/lib/schemas/i18n.schema";
import { clientLogger } from "@/lib/logging";

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
 * @description Construye la estructura de datos para el menú de desarrollo.
 * @param {NonNullable<Dictionary["devRouteMenu"]>} dictionary - El objeto de contenido para el menú.
 * @param {Locale} locale - El locale actual para generar las URLs.
 * @returns {RouteGroup[]} La estructura de datos completa para renderizar el menú.
 */
export function generateDevRoutes(
  dictionary: NonNullable<Dictionary["devRouteMenu"]>,
  locale: Locale
): RouteGroup[] {
  clientLogger.trace(
    "[RouteMenuGenerator] Generando estructura de datos del menú de desarrollo."
  );

  const CAMPAIGN_ID = producerConfig.LANDING_ID;

  return [
    {
      groupName: dictionary.devToolsGroup,
      items: [
        {
          name: dictionary.componentCanvas,
          // <<-- CORRECCIÓN: La página de listado no existe. Se enlaza al dashboard principal como fallback.
          // Se usa la clave correcta 'devDashboard' del snapshot de navigation.ts.
          path: routes.devDashboard.path({ locale }),
          iconName: "FlaskConical",
        },
        {
          name: dictionary.campaignSimulator,
          // <<-- CORRECCIÓN: Se usa la clave correcta 'devCampaignSimulator' del snapshot de navigation.ts.
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
          // <<-- CORRECCIÓN: Se usa la clave correcta 'campaign' del snapshot de navigation.ts.
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
// src/components/dev/utils/route-menu.generator.ts
