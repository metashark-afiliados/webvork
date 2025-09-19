// RUTA: components/dev/SuiteStyleComposerModal.tsx
/**
 * @file SuiteStyleComposerModal.tsx
 * @description Orquestador modal para la composición de temas.
 *              v5.0.0 (MEA/UX Injection & Architectural Decoupling): Integra
 *              animaciones de élite con Framer Motion y se alinea con la nueva
 *              arquitectura de hooks desacoplada, eliminando dependencias espurias.
 * @version 5.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui";
import { logger } from "@/lib/logging";
import { useSuiteStyleComposer } from "./SuiteStyleComposer/use-suite-style-composer";
import type {
  SuiteThemeConfig,
  LoadedFragments,
} from "./SuiteStyleComposer/types";
import { ComposerHeader } from "./SuiteStyleComposer/ComposerHeader";
import { ComposerFooter } from "./SuiteStyleComposer/ComposerFooter";
import { SuiteColorsTab } from "./SuiteStyleComposer/SuiteColorsTab";
import { SuiteTypographyTab } from "./SuiteStyleComposer/SuiteTypographyTab";
import { SuiteGeometryTab } from "./SuiteStyleComposer/SuiteGeometryTab";

/**
 * @interface ModalContent
 * @description Contrato de datos para todo el contenido i18n que el modal requiere.
 */
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

/**
 * @interface SuiteStyleComposerModalProps
 * @description Contrato de props para el orquestador del modal.
 */
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
  logger.info("[SuiteStyleComposerModal] Renderizando v5.0 (MEA & Decoupled)");

  // El modal consume el hook de lógica, que ahora es completamente autónomo.
  const {
    localSuiteConfig,
    handleConfigUpdate,
    handleGranularChange,
    clearPreview,
  } = useSuiteStyleComposer({
    initialConfig: currentSuiteConfig,
    allThemeFragments,
  });

  // Efecto para sincronizar el estado interno del compositor con las props externas.
  useEffect(() => {
    if (isOpen) {
      handleConfigUpdate(currentSuiteConfig);
    }
  }, [isOpen, currentSuiteConfig, handleConfigUpdate]);

  const handleSave = () => {
    clearPreview(); // Limpia la previsualización temporal del DOM.
    onSave(localSuiteConfig); // Persiste la configuración.
    onClose();
  };

  const handleCancel = () => {
    clearPreview(); // Limpia la previsualización temporal del DOM.
    onClose(); // Cierra el modal, el tema persistido se reaplicará por el hook padre.
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={handleCancel}>
          {/* El `DialogContent` ahora es un `motion.div` para la animación de élite */}
          <DialogContent
            className="max-w-6xl h-[90vh] flex flex-col p-0"
            asChild
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <ComposerHeader
                title={content.composerTitle}
                description={content.composerDescription}
              />
              <div className="flex-grow overflow-y-auto px-6">
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
                        radiusFilterPlaceholder:
                          content.radiusFilterPlaceholder,
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
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
