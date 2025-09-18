// app/[locale]/(dev)/layout.tsx
/**
 * @file layout.tsx
 * @description Layout raíz para el DCC.
 *              v4.0.0 (Full DCC Theming Integration): Ahora inyecta el `DevThemeSwitcher`
 *              en el `DevHeader`, permitiendo cambiar el tema visual completo (colores,
 *              fuentes, geometría) de toda la suite.
 * @version 4.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { headers } from "next/headers";
import { getDictionary } from "@/lib/i18n";
import { type Locale } from "@/lib/i18n.config";
import AppProviders from "@/components/layout/AppProviders";
import DevHeader from "@/components/dev/DevHeader";
import { logger } from "@/lib/logging";
import { Container } from "@/components/ui/Container";
import { WizardHeader } from "./dev/campaign-suite/_components/WizardHeader";
import { getThemeFragmentsAction } from "./dev/campaign-suite/_actions/getThemeFragments.action";
// --- [INICIO DE CORRECCIÓN: Ruta de importación a `_components`] ---
import { DevThemeSwitcher } from "./dev/_components/DevThemeSwitcher"; // <-- Importación correcta
// --- [FIN DE CORRECCIÓN] ---
import { loadEdgeJsonAsset } from "@/lib/i18n/i18n.edge";
import { deepMerge } from "@/lib/utils/merge";
import type { AssembledTheme } from "@/lib/schemas/theming/assembled-theme.schema";
import type { DiscoveredFragments } from "./dev/campaign-suite/_actions/getThemeFragments.action"; // Asegúrate de que el tipo es visible

interface DevLayoutProps {
  children: React.ReactNode;
  params: { locale: Locale };
}

export default async function DevLayout({
  children,
  params: { locale },
}: DevLayoutProps) {
  logger.info(
    `[DevLayout] Renderizando layout raíz para el entorno de desarrollo. Locale: [${locale}]`
  );

  const { dictionary, error } = await getDictionary(locale);
  const pathname = headers().get("x-next-pathname") || "";
  const isCampaignSuite = pathname.includes("/dev/campaign-suite/create");

  if (error || !dictionary.cookieConsentBanner) {
    logger.error(
      `[DevLayout] No se pudo cargar el diccionario para [${locale}].`,
      { error }
    );
    return (
      <html>
        <body>
          <div style={{ color: "red", padding: "20px" }}>
            Error crítico al cargar el diccionario de i18n para el entorno de
            desarrollo.
          </div>
          <AppProviders
            locale={locale}
            cookieConsentContent={{
              message: "Cookies",
              acceptButtonText: "Accept",
              rejectButtonText: "Reject",
              policyLinkText: "Policy",
            }}
          >
            <main className="py-8 md:py-12">
              <Container>{children}</Container>
            </main>
          </AppProviders>
        </body>
      </html>
    );
  }

  // --- [INICIO DE LÓGICA DE CARGA DE FRAGMENTOS COMPLETOS DEL DCC] ---
  const fragmentsResult: ActionResult<DiscoveredFragments> =
    await getThemeFragmentsAction();

  let allLoadedFragments: DiscoveredFragments & {
    base: Partial<AssembledTheme>;
  } = {
    base: {},
    colors: {},
    fonts: {},
    radii: {},
  };

  if (fragmentsResult.success) {
    allLoadedFragments.base = await loadEdgeJsonAsset<Partial<AssembledTheme>>(
      "theme-fragments",
      "base",
      "global.theme.json"
    ).catch((e) => {
      logger.error("Fallo al cargar global.theme.json", { e });
      return {};
    });

    // Cargar todos los fragmentos de colores, fuentes y radios
    const colorPromises = (fragmentsResult.data.colors || []).map(
      async (name) => {
        const fragment = await loadEdgeJsonAsset<Partial<AssembledTheme>>(
          "theme-fragments",
          "colors",
          `${name}.colors.json`
        ).catch((e) => {
          logger.warn(
            `Fallo al cargar fragmento de color ${name}.colors.json`,
            { e }
          );
          return {};
        });
        return { name, fragment };
      }
    );
    const fontPromises = (fragmentsResult.data.fonts || []).map(
      async (name) => {
        const fragment = await loadEdgeJsonAsset<Partial<AssembledTheme>>(
          "theme-fragments",
          "fonts",
          `${name}.fonts.json`
        ).catch((e) => {
          logger.warn(
            `Fallo al cargar fragmento de fuente ${name}.fonts.json`,
            { e }
          );
          return {};
        });
        return { name, fragment };
      }
    );
    const radiiPromises = (fragmentsResult.data.radii || []).map(
      async (name) => {
        const fragment = await loadEdgeJsonAsset<Partial<AssembledTheme>>(
          "theme-fragments",
          "radii",
          `${name}.radii.json`
        ).catch((e) => {
          logger.warn(`Fallo al cargar fragmento de radio ${name}.radii.json`, {
            e,
          });
          return {};
        });
        return { name, fragment };
      }
    );

    const [loadedColors, loadedFonts, loadedRadii] = await Promise.all([
      Promise.all(colorPromises),
      Promise.all(fontPromises),
      Promise.all(radiiPromises),
    ]);

    allLoadedFragments.colors = Object.fromEntries(
      loadedColors
        .filter((item) => Object.keys(item.fragment).length > 0)
        .map((item) => [item.name, item.fragment])
    );
    allLoadedFragments.fonts = Object.fromEntries(
      loadedFonts
        .filter((item) => Object.keys(item.fragment).length > 0)
        .map((item) => [item.name, item.fragment])
    );
    allLoadedFragments.radii = Object.fromEntries(
      loadedRadii
        .filter((item) => Object.keys(item.fragment).length > 0)
        .map((item) => [item.name, item.fragment])
    );

    // Añadir el tema por defecto del globals.css al mapa para que esté disponible
    allLoadedFragments.colors["default-dcc"] = {
      colors: {
        background: "0 0% 100%",
        foreground: "20 14.3% 4.1%",
        card: "0 0% 100%",
        cardForeground: "20 14.3% 4.1%",
        popover: "0 0% 100%",
        popoverForeground: "20 14.3% 4.1%",
        primary: "24.6 95% 53.1%",
        primaryForeground: "60 9.1% 97.8%",
        secondary: "60 4.8% 95.9%",
        secondaryForeground: "24 9.8% 10%",
        muted: "60 4.8% 95.9%",
        mutedForeground: "25 5.3% 44.7%",
        accent: "60 4.8% 95.9%",
        accentForeground: "24 9.8% 10%",
        destructive: "0 84.2% 60.2%",
        destructiveForeground: "60 9.1% 97.8%",
        dark: {
          background: "20 14.3% 4.1%",
          foreground: "60 9.1% 97.8%",
          card: "24 9.8% 8%",
          cardForeground: "0 0% 95%",
          popover: "20 14.3% 4.1%",
          popoverForeground: "60 9.1% 97.8%",
          primary: "20.5 90.2% 48.2%",
          primaryForeground: "60 9.1% 97.8%",
          secondary: "12 6.5% 15.1%",
          secondaryForeground: "60 9.1% 97.8%",
          muted: "12 6.5% 15.1%",
          mutedForeground: "24 5.4% 63.9%",
          accent: "12 6.5% 15.1%",
          accentForeground: "60 9.1% 97.8%",
          destructive: "0 72.2% 50.6%",
          destructiveForeground: "60 9.1% 97.8%",
        },
      },
    };
  } else {
    logger.error("[DevLayout] Fallo al obtener fragmentos de tema globales.", {
      error: fragmentsResult.error,
    });
  }
  // --- [FIN DE LÓGICA DE CARGA] ---

  const isHomePage = pathname === `/${locale}` || pathname === "/";
  const showDevHomepageHeader =
    process.env.NODE_ENV === "development" &&
    isHomePage &&
    dictionary.devHomepageHeader &&
    dictionary.devRouteMenu;

  return (
    <AppProviders
      locale={locale}
      cookieConsentContent={dictionary.cookieConsentBanner}
    >
      <DevHeader
        locale={locale}
        centerComponent={isCampaignSuite ? <WizardHeader /> : null}
        devThemeSwitcher={
          <DevThemeSwitcher
            allThemeFragments={allLoadedFragments}
            content={{
              selectThemeLabel:
                dictionary.devDashboardPage?.selectThemeLabel || "Select Theme",
              selectFontLabel:
                dictionary.devDashboardPage?.selectFontLabel || "Select Font",
              selectRadiusLabel:
                dictionary.devDashboardPage?.selectRadiusLabel ||
                "Select Radius",
              defaultPresetName:
                dictionary.devDashboardPage?.defaultPresetName || "Default",
              colorFilterPlaceholder:
                dictionary.devDashboardPage?.colorFilterPlaceholder ||
                "Choose color...",
              fontFilterPlaceholder:
                dictionary.devDashboardPage?.fontFilterPlaceholder ||
                "Choose font...",
              radiusFilterPlaceholder:
                dictionary.devDashboardPage?.radiusFilterPlaceholder ||
                "Choose radius...",
            }}
          />
        }
      />
      <main className="py-8 md:py-12">
        <Container>{children}</Container>
      </main>
    </AppProviders>
  );
}

