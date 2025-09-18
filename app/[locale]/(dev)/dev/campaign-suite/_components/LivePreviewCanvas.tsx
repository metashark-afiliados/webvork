// app/[locale]/(dev)/dev/campaign-suite/_components/LivePreviewCanvas.tsx
/**
 * @file LivePreviewCanvas.tsx
 * @description Lienzo de vista previa en tiempo real (EDVI), ahora con scroll
 *              y resaltado sincronizado con el editor de contenido ("Modo Enfoque").
 * @version 4.0.0 (Synchronized Focus Mode)
 * @author RaZ Podestá - MetaShark Tech
 * @see .docs/suite-de-diseno-campanas/README.md "Experiencia Adrenalínica"
 */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useCampaignDraft } from "../_hooks/useCampaignDraft";
import { usePreviewTheme } from "../_hooks/usePreviewTheme";
import { useFocusStore } from "../_context/FocusContext";
import { generateCampaignThemeVariablesStyle } from "@/lib/utils/theme.utils";
import { CampaignThemeProvider } from "@/components/layout/CampaignThemeProvider";
import { SectionRenderer } from "@/components/layout/SectionRenderer";
import { buildPreviewDictionary } from "../_utils/preview.utils";
import { DynamicIcon } from "@/components/ui";
import type { Dictionary } from "@/lib/schemas/i18n.schema";

/**
 * @component IframeOverlay
 * @description Micro-componente atómico para mostrar estados (carga, error)
 *              dentro del iframe, asegurando que los estilos no se filtren.
 * @private
 */
const IframeOverlay = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      textAlign: "center",
      backgroundColor: "rgba(0,0,0,0.7)",
      color: "white",
      fontFamily: "sans-serif",
    }}
  >
    {children}
  </div>
);

export function LivePreviewCanvas() {
  const draft = useCampaignDraft((state) => state.draft);
  const { theme, isLoading, error } = usePreviewTheme();
  const [iframeBody, setIframeBody] = useState<HTMLElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // --- Lógica de Modo Enfoque ---
  const focusedSection = useFocusStore((state) => state.focusedSection);
  const sectionRefs = useRef<Record<string, HTMLElement>>({});

  useEffect(() => {
    if (focusedSection && sectionRefs.current[focusedSection]) {
      sectionRefs.current[focusedSection].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [focusedSection]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      const iframeDoc = iframe.contentDocument;
      if (iframeDoc) {
        iframeDoc.head.innerHTML = `
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Poppins:wght@700&family=Playfair+Display:wght@700&display=swap');
            body {
              margin: 0;
              font-family: 'Inter', sans-serif;
              background-color: hsl(var(--background));
              color: hsl(var(--foreground));
              transition: background-color 0.3s ease, color 0.3s ease;
              scroll-behavior: smooth;
            }
            * { box-sizing: border-box; }
          </style>
        `;
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
    return () => iframe.removeEventListener("load", handleLoad);
  }, []);

  const previewDictionary = buildPreviewDictionary(
    draft.contentData,
    draft.layoutConfig,
    "it-IT"
  ) as Dictionary;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full bg-muted/20 p-2 rounded-lg sticky top-24"
    >
      <iframe
        ref={iframeRef}
        className="w-full h-full bg-background rounded-md border"
        title="Live Preview"
      />
      {iframeBody &&
        createPortal(
          <>
            {isLoading && (
              <IframeOverlay>
                <DynamicIcon
                  name="LoaderCircle"
                  className="w-8 h-8 animate-spin"
                />
                <p style={{ marginTop: "1rem", fontSize: "0.875rem" }}>
                  Ensamblando tema...
                </p>
              </IframeOverlay>
            )}
            {error && (
              <IframeOverlay>
                <DynamicIcon
                  name="TriangleAlert"
                  className="w-8 h-8"
                  style={{ color: "#ef4444" }}
                />
                <p
                  style={{
                    marginTop: "1rem",
                    fontSize: "0.875rem",
                    color: "#ef4444",
                  }}
                >
                  Error al cargar el tema.
                </p>
                <p style={{ fontSize: "0.75rem", opacity: 0.7 }}>{error}</p>
              </IframeOverlay>
            )}
            {theme && (
              <CampaignThemeProvider theme={theme}>
                <style>{generateCampaignThemeVariablesStyle(theme)}</style>
                <SectionRenderer
                  sections={draft.layoutConfig}
                  dictionary={previewDictionary}
                  locale={"it-IT"}
                  focusedSection={focusedSection}
                  sectionRefs={sectionRefs}
                />
              </CampaignThemeProvider>
            )}
          </>,
          iframeBody
        )}
    </motion.div>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/LivePreviewCanvas.tsx
