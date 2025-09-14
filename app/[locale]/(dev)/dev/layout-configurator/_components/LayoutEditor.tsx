// app/[locale]/(dev)/dev/layout-configurator/_components/LayoutEditor.tsx
/**
 * @file LayoutEditor.tsx
 * @description Componente cliente interactivo para la edición de layouts de campaña.
 *              - v3.6.0 (Build Stability Fix): Estandariza las rutas de importación
 *                al alias robusto `@/components/ui/*` para resolver definitivamente
 *                los errores de `Module not found` en Vercel.
 * @version 3.6.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useState, useEffect, useMemo, useTransition } from "react";
// --- INICIO DE CORRECCIÓN: Rutas de importación estandarizadas ---
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
// --- FIN DE CORRECCIÓN ---
import { logger } from "@/lib/logging";
import { getLayoutForVariant, saveLayoutForVariant } from "../_actions";
import type { Dictionary } from "@/schemas/i18n.schema";
import type { CampaignVariantInfo as CampaignVariant } from "@/lib/dev/campaign.utils";

type LayoutConfiguratorContent = NonNullable<
  Dictionary["devLayoutConfiguratorPage"]
>;

interface LayoutEditorProps {
  campaigns: CampaignVariant[];
  availableSections: string[];
  content: LayoutConfiguratorContent;
}

export function LayoutEditor({
  campaigns,
  availableSections,
  content,
}: LayoutEditorProps) {
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [activeSections, setActiveSections] = useState<string[]>([]);
  const [isLoadingLayout, setIsLoadingLayout] = useState(false);
  const [isPending, startTransition] = useTransition();

  const campaignVariants = useMemo(() => {
    if (!selectedCampaign) return [];
    return campaigns.filter((c) => c.campaignId === selectedCampaign);
  }, [selectedCampaign, campaigns]);

  useEffect(() => {
    if (selectedVariant && selectedCampaign) {
      setIsLoadingLayout(true);
      getLayoutForVariant(selectedCampaign, selectedVariant)
        .then((layout) => {
          setActiveSections(layout.map((sec) => sec.name));
        })
        .catch((err) => {
          logger.error("Error al cargar el layout", { err });
          alert(content.errorMessage);
        })
        .finally(() => setIsLoadingLayout(false));
    } else {
      setActiveSections([]);
    }
  }, [selectedVariant, selectedCampaign, content.errorMessage]);

  const handleSave = () => {
    if (selectedCampaign && selectedVariant) {
      startTransition(async () => {
        logger.info(
          `Guardando layout para ${selectedCampaign}/${selectedVariant}...`
        );
        const result = await saveLayoutForVariant(
          selectedCampaign,
          selectedVariant,
          activeSections.map((name) => ({ name }))
        );
        if (result.success) {
          alert(content.successMessage);
        } else {
          alert(result.message || content.errorMessage);
        }
      });
    }
  };

  return (
    <div className="mt-8 p-6 border rounded-lg bg-card text-card-foreground">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-sm font-medium">
            {content.selectCampaignLabel}
          </label>
          <Select
            onValueChange={(value) => {
              setSelectedCampaign(value);
              setSelectedVariant(null);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={content.selectCampaignPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {Array.from(new Set(campaigns.map((c) => c.campaignId))).map(
                (id) => (
                  <SelectItem key={id} value={id}>
                    {id}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium">
            {content.selectVariantLabel}
          </label>
          <Select
            onValueChange={setSelectedVariant}
            disabled={!selectedCampaign}
          >
            <SelectTrigger>
              <SelectValue placeholder={content.selectVariantPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {campaignVariants.map((v) => (
                <SelectItem key={v.variantId} value={v.variantId}>
                  {v.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {(isLoadingLayout || selectedVariant) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[300px]">
          {isLoadingLayout ? (
            <div className="md:col-span-2 flex items-center justify-center text-muted-foreground">
              <p>Cargando layout...</p>
            </div>
          ) : (
            <>
              <div>
                <h3 className="font-bold mb-2">
                  {content.activeSectionsTitle}
                </h3>
                <div className="p-2 border rounded-md bg-background min-h-[200px] space-y-2">
                  {activeSections.map((name) => (
                    <div
                      key={name}
                      className="p-2 bg-secondary text-secondary-foreground rounded"
                    >
                      {name}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-2">
                  {content.availableSectionsTitle}
                </h3>
                <div className="p-2 border rounded-md bg-background min-h-[200px] space-y-2">
                  {availableSections
                    .filter((s) => !activeSections.includes(s))
                    .map((name) => (
                      <div
                        key={name}
                        className="p-2 bg-muted text-muted-foreground rounded"
                      >
                        {name}
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <Button onClick={handleSave} disabled={isPending || !selectedVariant}>
          {isPending ? content.savingButtonText : content.saveButtonText}
        </Button>
      </div>
    </div>
  );
}
