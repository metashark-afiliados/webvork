// RUTA: components/dev/SuiteStyleComposerModal.tsx

/**
 * @file SuiteStyleComposerModal.tsx
 * @description Orquestador modal para la composición de temas.
 *              v4.3.0 (Module Resolution Fix): Corrige la ruta de importación
 *              del hook `useSuiteStyleComposer` para alinearse con la convención
 *              de nomenclatura kebab-case.
 * @version 4.3.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui";
import { logger } from "@/lib/logging";
import {
  useSuiteStyleComposer,
} from "./SuiteStyleComposer/use-suite-style-composer"; // <-- RUTA CORREGIDA
import {
    type SuiteThemeConfig,
    type LoadedFragments,
} from "./SuiteStyleComposer/types"; // <-- Importación separada para claridad
import { ComposerHeader } from "./SuiteStyleComposer/ComposerHeader";
import { ComposerFooter } from "./SuiteStyleComposer/ComposerFooter";
import { SuiteColorsTab } from "./SuiteStyleComposer/SuiteColorsTab";
import { SuiteTypographyTab } from "./SuiteStyleComposer/SuiteTypographyTab";
import { SuiteGeometryTab } from "./SuiteStyleComposer/SuiteGeometryTab";

interface ModalContent {
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
}

interface SuiteStyleComposerModalProps {
  isOpen: boolean;
  onClose: () => void;
  allThemeFragments: LoadedFragments;
  currentSuiteConfig: SuiteThemeConfig;
  onSave: (newConfig: SuiteThemeConfig) => void;
  content: ModalContent;
}

export function SuiteStyleComposerModal({
  isOpen,
  onClose,
  allThemeFragments,
  currentSuiteConfig,
  onSave,
  content,
}: SuiteStyleComposerModalProps): React.ReactElement {
  logger.info("[SuiteStyleComposerModal] Renderizando (v4.3 - Module Fix)");

  const {
    localSuiteConfig,
    handleConfigUpdate,
    handleGranularChange,
    clearPreview,
  } = useSuiteStyleComposer({
    initialConfig: currentSuiteConfig,
    allThemeFragments,
  });

  useEffect(() => {
    if (isOpen) {
      handleConfigUpdate(currentSuiteConfig);
    } else {
      clearPreview();
    }
  }, [isOpen, currentSuiteConfig, handleConfigUpdate, clearPreview]);

  const handleSave = () => {
    onSave(localSuiteConfig);
    onClose();
  };

  const handleCancel = () => {
    clearPreview();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
        <ComposerHeader
          title={content.composerTitle}
          description={content.composerDescription}
        />
        <div className="flex-grow overflow-y-auto pr-2">
          <Tabs defaultValue="colors" className="w-full">
            <TabsList>
              <TabsTrigger value="colors">
                {content.composerColorsTab}
              </TabsTrigger>
              <TabsTrigger value="typography">
                {content.composerTypographyTab}
              </TabsTrigger>
              <TabsTrigger value="geometry">
                {content.composerGeometryTab}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="colors" className="mt-4">
              <SuiteColorsTab
                allThemeFragments={allThemeFragments}
                selectedColorPreset={localSuiteConfig.colorPreset || ""}
                onColorPresetChange={(value) =>
                  handleConfigUpdate({ colorPreset: value })
                }
                content={{
                  selectThemeLabel: content.selectThemeLabel,
                  colorFilterPlaceholder: content.colorFilterPlaceholder,
                  defaultPresetName: content.defaultPresetName,
                }}
              />
            </TabsContent>

            <TabsContent value="typography" className="mt-4">
              <SuiteTypographyTab
                allThemeFragments={allThemeFragments}
                selectedFontPreset={localSuiteConfig.fontPreset || ""}
                granularFonts={localSuiteConfig.granularFonts || {}}
                onFontPresetChange={(value) =>
                  handleConfigUpdate({ fontPreset: value })
                }
                onGranularChange={handleGranularChange}
                content={{
                  selectFontLabel: content.selectFontLabel,
                  fontFilterPlaceholder: content.fontFilterPlaceholder,
                  defaultPresetName: content.defaultPresetName,
                  fontSizeLabel: content.fontSizeLabel,
                  fontWeightLabel: content.fontWeightLabel,
                  lineHeightLabel: content.lineHeightLabel,
                  letterSpacingLabel: content.letterSpacingLabel,
                }}
              />
            </TabsContent>

            <TabsContent value="geometry" className="mt-4">
              <SuiteGeometryTab
                allThemeFragments={allThemeFragments}
                selectedRadiusPreset={localSuiteConfig.radiusPreset || ""}
                granularGeometry={localSuiteConfig.granularGeometry || {}}
                onRadiusPresetChange={(value) =>
                  handleConfigUpdate({ radiusPreset: value })
                }
                onGranularChange={handleGranularChange}
                content={{
                  selectRadiusLabel: content.selectRadiusLabel,
                  radiusFilterPlaceholder: content.radiusFilterPlaceholder,
                  defaultPresetName: content.defaultPresetName,
                  borderRadiusLabel: content.borderRadiusLabel,
                  borderWidthLabel: content.borderWidthLabel,
                  baseSpacingUnitLabel: content.baseSpacingUnitLabel,
                  inputHeightLabel: content.inputHeightLabel,
                }}
              />
            </TabsContent>
          </Tabs>
        </div>
        <ComposerFooter
          onSave={handleSave}
          onCancel={handleCancel}
          saveButtonText={content.composerSaveButton}
          cancelButtonText={content.composerCancelButton}
        />
      </DialogContent>
    </Dialog>
  );
}
