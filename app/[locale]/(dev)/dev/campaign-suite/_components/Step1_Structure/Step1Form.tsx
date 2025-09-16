// app/[locale]/(dev)/dev/campaign-suite/_components/Step1_Structure/Step1Form.tsx
/**
 * @file Step1Form.tsx
 * @description Componente de Presentación para la UI del Paso 1.
 *              v4.0.0 (Hyper-Atomization): Re-arquitecturado para ser un orquestador
 *              puro que consume el componente atómico StructuralSectionConfig.
 * @version 4.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { logger } from "@/lib/logging";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { HeaderConfig, FooterConfig } from "../../_types/draft.types";
import { WizardNavigation } from "../../_components/WizardNavigation";
import { galleryConfig } from "../../_config/gallery.config";
import { StructuralSectionConfig } from "./_components"; // <-- Importación del nuevo átomo

type Step1Content = NonNullable<Dictionary["campaignSuitePage"]>["step1"];

interface Step1FormProps {
  content: Step1Content;
  headerConfig: HeaderConfig;
  footerConfig: FooterConfig;
  onHeaderConfigChange: (newConfig: Partial<HeaderConfig>) => void;
  onFooterConfigChange: (newConfig: Partial<FooterConfig>) => void;
  onBack: () => void;
  onNext: () => void;
}

export function Step1Form({
  content,
  headerConfig,
  footerConfig,
  onHeaderConfigChange,
  onFooterConfigChange,
  onBack,
  onNext,
}: Step1FormProps): React.ReactElement {
  logger.info("Renderizando Step1Form (Presentación Pura - Hiper-Atomizada)");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
        <CardDescription>{content.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-10">
        <div className="space-y-6">
          <StructuralSectionConfig
            switchId="use-header"
            switchLabel={content.headerSwitchLabel}
            galleryTitle={content.headerGalleryTitle}
            isEnabled={headerConfig.useHeader}
            onToggle={(checked) => onHeaderConfigChange({ useHeader: checked })}
            galleryItems={galleryConfig.headers}
            selectedValue={headerConfig.componentName}
            onSelectionChange={(value) =>
              onHeaderConfigChange({ componentName: value })
            }
          />

          <StructuralSectionConfig
            switchId="use-footer"
            switchLabel={content.footerSwitchLabel}
            galleryTitle={content.footerGalleryTitle}
            isEnabled={footerConfig.useFooter}
            onToggle={(checked) => onFooterConfigChange({ useFooter: checked })}
            galleryItems={galleryConfig.footers}
            selectedValue={footerConfig.componentName}
            onSelectionChange={(value) =>
              onFooterConfigChange({ componentName: value })
            }
          />
        </div>

        <WizardNavigation onBack={onBack} onNext={onNext} />
      </CardContent>
    </Card>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step1_Structure/Step1Form.tsx
