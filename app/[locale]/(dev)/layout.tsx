// RUTA: app/[locale]/(dev)/layout.tsx

/**
 * @file layout.tsx
 * @description Layout raíz para el DCC.
 *              v7.4.0 (LanguageSwitcher Sync): Obtiene y pasa el contenido i18n
 *              para el nuevo componente de élite LanguageSwitcher y robustece
 *              la guardia de resiliencia de carga de datos.
 * @version 7.4.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import { headers } from "next/headers";
import { getDictionary } from "@/shared/lib/i18n";
import { type Locale } from "@/shared/lib/i18n.config";
import AppProviders from "@/components/layout/AppProviders";
import DevHeader from "@/components/dev/DevHeader";
import { logger } from "@/shared/lib/logging";
import { Container } from "@/components/ui/Container";
import { WizardHeader } from "./dev/campaign-suite/_components/WizardHeader";
import { getThemeFragmentsAction } from "./dev/campaign-suite/_actions/getThemeFragments.action";
import { DevThemeSwitcher } from "@/components/dev";
import { loadEdgeJsonAsset } from "@/shared/lib/i18n/i18n.edge";
import type { AssembledTheme } from "@/shared/lib/schemas/theming/assembled-theme.schema";
import type { DiscoveredFragments } from "./dev/campaign-suite/_actions/getThemeFragments.action";
import type { ActionResult } from "@/shared/lib/types/actions.types";

interface DevLayoutProps {
  children: React.ReactNode;
  params: { locale: Locale };
}

export default async function DevLayout({
  children,
  params: { locale },
}: DevLayoutProps) {
  logger.info(
    `[DevLayout] Renderizando layout raíz del DCC v7.4 para locale: [${locale}]`
  );

  const { dictionary, error } = await getDictionary(locale);
  const pathname = headers().get("x-next-pathname") || "";
  const isCampaignSuite = pathname.includes("/dev/campaign-suite/create");

  if (
    error ||
    !dictionary.devHeader ||
    !dictionary.devRouteMenu ||
    !dictionary.devDashboardPage ||
    !dictionary.cookieConsentBanner ||
    !dictionary.toggleTheme ||
    !dictionary.languageSwitcher // <-- NUEVA GUARDIA
  ) {
    logger.error(`[DevLayout] Diccionario esencial no cargado.`, { error });
    return (
      <html lang={locale}>
        <body>
          <div style={{ color: "hsl(var(--destructive))", padding: "20px" }}>
            Error crítico al cargar el diccionario para el DCC.
          </div>
        </body>
      </html>
    );
  }

  const fragmentsResult: ActionResult<DiscoveredFragments> =
    await getThemeFragmentsAction();

  const allLoadedFragments: {
    base: Partial<AssembledTheme>;
    colors: Record<string, Partial<AssembledTheme>>;
    fonts: Record<string, Partial<AssembledTheme>>;
    radii: Record<string, Partial<AssembledTheme>>;
  } = {
    base: {},
    colors: {},
    fonts: {},
    radii: {},
  };

  if (fragmentsResult.success) {
    const { colors = [], fonts = [], radii = [] } = fragmentsResult.data;
    const [base, loadedColors, loadedFonts, loadedRadii] = await Promise.all([
      loadEdgeJsonAsset<Partial<AssembledTheme>>(
        "theme-fragments",
        "base",
        "global.theme.json"
      ).catch(() => ({})),
      Promise.all(
        colors.map((name) =>
          loadEdgeJsonAsset<Partial<AssembledTheme>>(
            "theme-fragments",
            "colors",
            `${name}.colors.json`
          )
            .then((data) => ({ name, data }))
            .catch(() => null)
        )
      ),
      Promise.all(
        fonts.map((name) =>
          loadEdgeJsonAsset<Partial<AssembledTheme>>(
            "theme-fragments",
            "fonts",
            `${name}.fonts.json`
          )
            .then((data) => ({ name, data }))
            .catch(() => null)
        )
      ),
      Promise.all(
        radii.map((name) =>
          loadEdgeJsonAsset<Partial<AssembledTheme>>(
            "theme-fragments",
            "radii",
            `${name}.radii.json`
          )
            .then((data) => ({ name, data }))
            .catch(() => null)
        )
      ),
    ]);
    allLoadedFragments.base = base;
    allLoadedFragments.colors = Object.fromEntries(
      loadedColors.filter(Boolean).map((item) => [item!.name, item!.data])
    );
    allLoadedFragments.fonts = Object.fromEntries(
      loadedFonts.filter(Boolean).map((item) => [item!.name, item!.data])
    );
    allLoadedFragments.radii = Object.fromEntries(
      loadedRadii.filter(Boolean).map((item) => [item!.name, item!.data])
    );
  } else {
    logger.error("[DevLayout] Fallo al obtener fragmentos de tema globales.", {
      error: fragmentsResult.error,
    });
  }

  const dccContent = dictionary.devDashboardPage;
  const devSwitcherContent = {
    customizeButton: dccContent.customizeButton,
    composerTitle: dccContent.composerTitle,
    composerDescription: dccContent.composerDescription,
    composerColorsTab: dccContent.composerColorsTab,
    composerTypographyTab: dccContent.composerTypographyTab,
    composerGeometryTab: dccContent.composerGeometryTab,
    composerSaveButton: dccContent.composerSaveButton,
    composerCancelButton: dccContent.composerCancelButton,
    selectThemeLabel: dccContent.selectThemeLabel,
    selectFontLabel: dccContent.selectFontLabel,
    selectRadiusLabel: dccContent.selectRadiusLabel,
    defaultPresetName: dccContent.defaultPresetName,
    colorFilterPlaceholder: dccContent.colorFilterPlaceholder,
    fontFilterPlaceholder: dccContent.fontFilterPlaceholder,
    radiusFilterPlaceholder: dccContent.radiusFilterPlaceholder,
    fontSizeLabel: dccContent.fontSizeLabel,
    fontWeightLabel: dccContent.fontWeightLabel,
    lineHeightLabel: dccContent.lineHeightLabel,
    letterSpacingLabel: dccContent.letterSpacingLabel,
    borderRadiusLabel: dccContent.borderRadiusLabel,
    borderWidthLabel: dccContent.borderWidthLabel,
    baseSpacingUnitLabel: dccContent.baseSpacingUnitLabel,
    inputHeightLabel: dccContent.inputHeightLabel,
  };

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
            content={devSwitcherContent}
          />
        }
        content={dictionary.devHeader}
        devMenuContent={dictionary.devRouteMenu}
        toggleThemeContent={dictionary.toggleTheme}
        languageSwitcherContent={dictionary.languageSwitcher} // <-- NUEVO PASO DE PROP
      />
      <main className="py-8 md:py-12">
        <Container>{children}</Container>
      </main>
    </AppProviders>
  );
}
