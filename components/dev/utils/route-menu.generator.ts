// components/dev/utils/route-menu.generator.ts
/**
 * @file route-menu.generator.ts
 * @description Aparato de lógica pura para generar la estructura de datos del menú de desarrollo.
 * @version 5.0.0 (Definitive Route Key Sync): Se alinea completamente con las claves
 *              de ruta generadas por el script v8.0+, resolviendo todos los errores 'TypeError'.
 * @author RaZ Podestá - MetaShark Tech
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

export function generateDevRoutes(
  dictionary: Dictionary["devRouteMenu"],
  locale: Locale
): RouteGroup[] {
  logger.info(
    "[Observabilidad][route-menu.generator] Generando estructura de datos v5.0..."
  );

  if (!dictionary) {
    logger.warn(
      "[route-menu.generator] El diccionario 'devRouteMenu' es undefined."
    );
    return [];
  }

  const CAMPAIGN_ID = producerConfig.LANDING_ID;

  const campaignParams = {
    locale,
    campaignId: CAMPAIGN_ID,
    variantSlug: "scientific",
    seoKeywordSlug: "benessere-evidenza-scientifica",
  };

  return [
    {
      groupName: dictionary.devToolsGroup,
      items: [
        {
          name: dictionary.campaignDesignSuite,
          // --- [INICIO DE CORRECCIÓN HOLÍSTICA] ---
          path: routes.devCampaignSuiteCreate.path({ locale }),
          iconName: "LayoutTemplate", // Icono más representativo
          // --- [FIN DE CORRECCIÓN HOLÍSTICA] ---
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
          path: routes.cByCampaignIdByVariantSlugBySeoKeywordSlug.path(
            campaignParams
          ),
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
