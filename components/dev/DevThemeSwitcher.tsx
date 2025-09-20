// RUTA: components/dev/DevThemeSwitcher.tsx

/**
 * @file DevThemeSwitcher.tsx
 * @description Componente de UI para activar el Compositor de Estilos.
 *              v4.4.0 (Module Resolution Fix): Corrige la ruta de importación
 *              del hook `useDevThemeManager` para alinearse con la convención
 *              de nomenclatura kebab-case, resolviendo un error crítico de build.
 * @version 4.4.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useState } from "react";
import { DynamicIcon, Button } from "@/components/ui";
import { logger } from "@/shared/lib/logging";
import { SuiteStyleComposerModal } from "./SuiteStyleComposerModal";
import { useDevThemeManager } from "./SuiteStyleComposer/use-dev-theme-manager";
import type {
  SuiteThemeConfig,
  LoadedFragments,
} from "./SuiteStyleComposer/types";

interface DevThemeSwitcherProps {
  allThemeFragments: LoadedFragments;
  content: {
    customizeButton: string;
    composerTitle: string;
    composerDescription: string;
    composerColorsTab: string;
    composerTypographyTab: string;
    composerGeometryTab: string;
    composerSaveButton: string;
    composerCancelButton: string;
    selectThemeLabel: string;
    selectFontLabel: string;
    selectRadiusLabel: string;
    defaultPresetName: string;
    colorFilterPlaceholder: string;
    fontFilterPlaceholder: string;
    radiusFilterPlaceholder: string;
    fontSizeLabel: string;
    fontWeightLabel: string;
    lineHeightLabel: string;
    letterSpacingLabel: string;
    borderRadiusLabel: string;
    borderWidthLabel: string;
    baseSpacingUnitLabel: string;
    inputHeightLabel: string;
  };
}

export function DevThemeSwitcher({
  allThemeFragments,
  content,
}: DevThemeSwitcherProps) {
  logger.info("[DevThemeSwitcher] Renderizando (v4.4 - Module Resolution Fix)");

  const { currentSuiteConfig, setCurrentSuiteConfig } = useDevThemeManager({
    allThemeFragments,
  });

  const [isComposerOpen, setIsComposerOpen] = useState(false);

  const handleSaveSuiteConfig = (newConfig: SuiteThemeConfig) => {
    setCurrentSuiteConfig(newConfig);
    setIsComposerOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsComposerOpen(true)}
      >
        <DynamicIcon name="Sparkles" className="mr-2 h-4 w-4" />
        {content.customizeButton}
      </Button>

      {isComposerOpen && (
        <SuiteStyleComposerModal
          isOpen={isComposerOpen}
          onClose={() => setIsComposerOpen(false)}
          allThemeFragments={allThemeFragments}
          currentSuiteConfig={currentSuiteConfig}
          onSave={handleSaveSuiteConfig}
          content={content}
        />
      )}
    </div>
  );
}
