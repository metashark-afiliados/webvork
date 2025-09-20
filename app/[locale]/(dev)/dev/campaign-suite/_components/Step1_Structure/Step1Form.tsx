// app/[locale]/(dev)/dev/campaign-suite/_components/Step1_Structure/Step1Form.tsx
/**
 * @file Step1Form.tsx
 * @description Componente de Presentación para la UI del Paso 1.
 * @version 6.2.0 (Sovereign Type Contract)
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
  CardFooter,
} from "@/components/ui/Card";
import { logger } from "@/shared/lib/logging";
import type { HeaderConfig, FooterConfig } from "../../_types/draft.types";
import { WizardNavigation } from "../../_components/WizardNavigation";
import { galleryConfig } from "../../_config/gallery.config";
import { StructuralSectionConfig } from "./_components";
import { Step1ContentSchema } from "@/shared/lib/schemas/campaigns/steps/step1.schema";
import { z } from "zod";

type Step1Content = z.infer<typeof Step1ContentSchema>;

interface Step1FormProps {
  content: Step1Content; // <-- Contrato estricto y no opcional
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
  logger.info("Renderizando Step1Form (Contrato Soberano)");

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
        <CardDescription>{content.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            descriptions={content.galleryDescriptions}
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
            descriptions={content.galleryDescriptions}
          />
        </div>
      </CardContent>
      <CardFooter className="sticky bottom-0 bg-background/95 backdrop-blur-sm py-4 border-t z-10">
        <WizardNavigation onBack={onBack} onNext={onNext} />
      </CardFooter>
    </Card>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/Step1_Structure/Step1Form.tsx
