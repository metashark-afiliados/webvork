// app/[locale]/(dev)/dev/campaign-suite/_components/LivePreviewCanvas.tsx
/**
 * @file LivePreviewCanvas.tsx
 * @description Lienzo de vista previa en tiempo real para la SDC.
 *              v2.4.0: Resuelve errores de tipo de DOM y de contrato de datos
 *              mediante aserciones de tipo seguras.
 * @version 2.4.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { useCampaignDraft } from "../_hooks";
import { motion } from "framer-motion";

import { logger } from "@/lib/logging";
import { generateCampaignThemeVariablesStyle } from "@/lib/utils/theme.utils";
import { CampaignThemeProvider } from "@/components/layout/CampaignThemeProvider";
import { SectionRenderer } from "@/components/layout/SectionRenderer";
import { buildPreviewDictionary } from "../_utils/preview.utils";
import type { AssembledTheme } from "@/lib/schemas/theming/assembled-theme.schema";
import { deepMerge } from "@/lib/utils/merge";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

export function LivePreviewCanvas() {
  const draft = useCampaignDraft((state) => state.draft);
  const [iframeBody, setIframeBody] = useState<HTMLElement | null>(null);
  const [assembledTheme, setAssembledTheme] = useState<AssembledTheme | null>(
    null
  );
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Efecto para inyectar estilos y fuentes en el iframe una vez que está listo
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      const iframeDoc = iframe.contentDocument;
      if (iframeDoc) {
        // Inyectar Google Fonts
        const fontLink = iframeDoc.createElement("link");
        fontLink.href =
          "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Poppins:wght@700&display=swap";
        fontLink.rel = "stylesheet";
        iframeDoc.head.appendChild(fontLink);
        setIframeBody(iframeDoc.body);
      }
    };

    if (
      iframe.contentDocument &&
      iframe.contentDocument.readyState === "complete"
    ) {
      handleLoad();
    } else {
      iframe.addEventListener("load", handleLoad);
    }

    return () => {
      iframe.removeEventListener("load", handleLoad);
    };
  }, []);

  // Efecto para ensamblar el tema del lado del cliente
  useEffect(() => {
    const assembleTheme = async () => {
      if (
        !draft.themeConfig.colorPreset ||
        !draft.themeConfig.fontPreset ||
        !draft.themeConfig.radiusPreset
      ) {
        setAssembledTheme(null);
        return;
      }
      try {
        const [baseRes, colorsRes, fontsRes, radiiRes] = await Promise.all([
          fetch("/theme-fragments/base/global.theme.json").catch(() => null),
          fetch(
            `/theme-fragments/colors/${draft.themeConfig.colorPreset}.colors.json`
          ).catch(() => null),
          fetch(
            `/theme-fragments/fonts/${draft.themeConfig.fontPreset}.fonts.json`
          ).catch(() => null),
          fetch(
            `/theme-fragments/radii/${draft.themeConfig.radiusPreset}.radii.json`
          ).catch(() => null),
        ]);

        const themeParts = await Promise.all([
          baseRes?.json(),
          colorsRes?.json(),
          fontsRes?.json(),
          radiiRes?.json(),
        ]);

        const validParts = themeParts.filter((p) => p);
        if (validParts.length < 4) {
          logger.warn(
            "Faltan uno o más fragmentos de tema. La vista previa puede estar incompleta."
          );
          return;
        }

        const finalTheme = validParts.reduce(
          (acc, current) => deepMerge(acc, current),
          {}
        ) as AssembledTheme;

        setAssembledTheme(finalTheme);
      } catch (error) {
        logger.error("Fallo al ensamblar el tema de la vista previa", {
          error,
        });
      }
    };

    assembleTheme();
  }, [draft.themeConfig]);

  // --- [INICIO DE CORRECCIÓN DE TIPO] ---
  // Se realiza una aserción de tipo segura. Sabemos que SectionRenderer solo
  // accederá a las claves que existen en este objeto parcial.
  const previewDictionary = buildPreviewDictionary(
    draft.contentData,
    draft.layoutConfig,
    "it-IT"
  ) as Dictionary;
  // --- [FIN DE CORRECCIÓN DE TIPO] ---
  const previewSections = draft.layoutConfig;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full bg-muted/20 p-2 rounded-lg sticky top-24"
    >
      <iframe
        // --- [INICIO DE CORRECCIÓN DE TIPO] ---
        // Se utiliza la ref para obtener una referencia directa al elemento iframe.
        ref={iframeRef}
        // --- [FIN DE CORRECCIÓN DE TIPO] ---
        className="w-full h-full bg-background rounded-md border"
        title="Live Preview"
      />

      {iframeBody &&
        assembledTheme &&
        createPortal(
          <CampaignThemeProvider theme={assembledTheme}>
            <style>{generateCampaignThemeVariablesStyle(assembledTheme)}</style>
            <SectionRenderer
              sections={previewSections}
              dictionary={previewDictionary}
              locale={"it-IT"}
            />
          </CampaignThemeProvider>,
          iframeBody
        )}
    </motion.div>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/LivePreviewCanvas.tsx
