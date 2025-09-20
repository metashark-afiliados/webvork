// app/[locale]/(dev)/dev/campaign-suite/_components/Step5_Management/_components/CampaignSummary.tsx
/**
 * @file CampaignSummary.tsx
 * @description Aparato atómico para la vista de resumen de la campaña en el Paso 5.
 *              Ahora muestra un resumen estructurado y detallado del borrador de la campaña.
 * @version 2.0.0 (Detailed Draft Summary)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import { logger } from "@/shared/lib/logging";
import type { CampaignDraft } from "../../../_types/draft.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { DynamicIcon } from "@/components/ui";

interface CampaignSummaryProps {
  draft: CampaignDraft; // <-- NUEVO: Recibe el borrador completo
  title: string;
  placeholder: string; // Se mantiene, pero se usa como fallback o parte de una descripción general
}

export function CampaignSummary({
  draft,
  title,
  placeholder,
}: CampaignSummaryProps): React.ReactElement {
  logger.trace("[CampaignSummary] Renderizando resumen de campaña (v2.0).");

  const hasHeader = draft.headerConfig?.useHeader;
  const headerName = draft.headerConfig?.componentName;
  const hasFooter = draft.footerConfig?.useFooter;
  const footerName = draft.footerConfig?.componentName;
  const numSections = draft.layoutConfig?.length || 0;
  const themeConfigured =
    draft.themeConfig?.colorPreset &&
    draft.themeConfig.fontPreset &&
    draft.themeConfig.radiusPreset;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{placeholder}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-muted-foreground">
        <div>
          <h4 className="font-semibold text-foreground flex items-center mb-1">
            <DynamicIcon name="LayoutGrid" className="h-4 w-4 mr-2" />
            Identificación:
          </h4>
          <p>
            ID Base:{" "}
            <span className="font-medium text-foreground">
              {draft.baseCampaignId || "N/A"}
            </span>
          </p>
          <p>
            Nombre Variante:{" "}
            <span className="font-medium text-foreground">
              {draft.variantName || "N/A"}
            </span>
          </p>
          <p>
            Keywords SEO:{" "}
            <span className="font-medium text-foreground">
              {draft.seoKeywords || "N/A"}
            </span>
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground flex items-center mb-1">
            <DynamicIcon name="BookOpen" className="h-4 w-4 mr-2" />
            Estructura de Página:
          </h4>
          <p>
            Encabezado:{" "}
            {hasHeader ? (
              <span className="font-medium text-foreground">
                {headerName || "Seleccionado"}
              </span>
            ) : (
              "No incluido"
            )}
          </p>
          <p>
            Pie de Página:{" "}
            {hasFooter ? (
              <span className="font-medium text-foreground">
                {footerName || "Seleccionado"}
              </span>
            ) : (
              "No incluido"
            )}
          </p>
          <p>
            Secciones de Contenido:{" "}
            <span className="font-medium text-foreground">{numSections}</span>
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground flex items-center mb-1">
            <DynamicIcon name="Palette" className="h-4 w-4 mr-2" />
            Tema Visual:
          </h4>
          {themeConfigured ? (
            <>
              <p>
                Colores:{" "}
                <span className="font-medium text-foreground">
                  {draft.themeConfig?.colorPreset}
                </span>
              </p>
              <p>
                Fuentes:{" "}
                <span className="font-medium text-foreground">
                  {draft.themeConfig?.fontPreset}
                </span>
              </p>
              <p>
                Geometría:{" "}
                <span className="font-medium text-foreground">
                  {draft.themeConfig?.radiusPreset}
                </span>
              </p>
            </>
          ) : (
            <p>No configurado</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
