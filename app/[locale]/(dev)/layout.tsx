// app/[locale]/(dev)/layout.tsx
/**
 * @file layout.tsx
 * @description Layout raíz para el DCC. v7.1.0 (A11y Fix): Resuelve el error de
 *              linting 'jsx-a11y/html-has-lang' asegurando que el estado de
 *              fallback de error también incluya el atributo 'lang'.
 * @version 7.1.0
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
import { DevThemeSwitcher } from "@/components/dev";
import { loadEdgeJsonAsset } from "@/lib/i18n/i18n.edge";
import type { AssembledTheme } from "@/lib/schemas/theming/assembled-theme.schema";
import type { DiscoveredFragments } from "./dev/campaign-suite/_actions/getThemeFragments.action";
import type { ActionResult } from "@/lib/types/actions.types";

interface DevLayoutProps {
  children: React.ReactNode;
  params: { locale: Locale };
}

export default async function DevLayout({
  children,
  params: { locale },
}: DevLayoutProps) {
  logger.info(
    `[DevLayout] Renderizando layout raíz del DCC v7.1 para locale: [${locale}]`
  );

  const { dictionary, error } = await getDictionary(locale);
  const pathname = headers().get("x-next-pathname") || "";
  const isCampaignSuite = pathname.includes("/dev/campaign-suite/create");

  if (
    error ||
    !dictionary.devDashboardPage ||
    !dictionary.cookieConsentBanner
  ) {
    logger.error(`[DevLayout] Diccionario esencial no cargado.`, { error });
    // --- [INICIO DE CORRECCIÓN DE ACCESIBILIDAD] ---
    return (
      <html lang={locale}>
        <body>
          <div style={{ color: "red", padding: "20px" }}>
            Error crítico al cargar el diccionario para el DCC.
          </div>
        </body>
      </html>
    );
    // --- [FIN DE CORRECCIÓN DE ACCESIBILIDAD] ---
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
      />
      <main className="py-8 md:py-12">
        <Container>{children}</Container>
      </main>
    </AppProviders>
  );
}
// app/[locale]/(dev)/layout.tsx
