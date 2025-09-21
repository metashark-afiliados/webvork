// app/[locale]/(dev)/dev/campaign-suite/_components/LivePreviewCanvas.tsx
/**
 * @file LivePreviewCanvas.tsx
 * @description Lienzo de vista previa en tiempo real (EDVI) de élite.
 *              Renderiza dinámicamente secciones y componentes estructurales
 *              (Header/Footer) con animaciones MEA/UX, y soporta "Modo Enfoque"
 *              sincronizado. Cumple con los 7 Pilares de Calidad.
 * @version 9.1.0 (Type Inference Fix & Elite Compliance)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCampaignDraft } from "../_hooks/use-campaign-draft";
import { usePreviewTheme } from "../_hooks/use-preview-theme";
import { useFocusStore } from "../_context/FocusContext";
import { generateCssVariablesFromTheme } from "@/shared/lib/theming/theme-utils";
import { CampaignThemeProvider } from "@/components/layout/CampaignThemeProvider";
import { SectionRenderer } from "@/components/layout/SectionRenderer";
import { buildPreviewDictionary } from "../_utils/preview.utils";
import { DynamicIcon } from "@/components/ui";
import type { Dictionary } from "@/shared/lib/schemas/i18n.schema";
import type { CampaignDraftState } from "../_types/draft.types";
import { logger } from "@/shared/lib/logging";
import { livePreviewComponentMap } from "@/shared/lib/dev/live-previews.config";
import { mockHeader, mockFooter } from "../_config/previews.mock-data";

/**
 * @interface IframeOverlayProps
 * @description Contrato de props para el componente de superposición del iframe.
 */
interface IframeOverlayProps {
  children: React.ReactNode;
}

/**
 * @component IframeOverlay
 * @description Componente de UI atómico para mostrar estados (carga, error) sobre el iframe.
 */
const IframeOverlay = ({ children }: IframeOverlayProps) => (
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
      backgroundColor: "hsl(var(--overlay))",
      color: "hsl(var(--overlay-foreground))",
      fontFamily: "sans-serif",
    }}
  >
    {children}
  </div>
);

/**
 * @interface LivePreviewCanvasProps
 * @description Contrato de props para el componente LivePreviewCanvas.
 */
interface LivePreviewCanvasProps {
  content: {
    loadingTheme: string;
    errorLoadingTheme: string;
  };
}

export function LivePreviewCanvas({ content }: LivePreviewCanvasProps) {
  logger.info("[LivePreviewCanvas] Renderizando v9.1 (Elite Compliance).");

  const draft = useCampaignDraft((state: CampaignDraftState) => state.draft);
  const { theme, isLoading, error } = usePreviewTheme();
  const [iframeBody, setIframeBody] = useState<HTMLElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const focusedSection = useFocusStore((state) => state.focusedSection);
  const sectionRefs = useRef<Record<string, HTMLElement>>({});

  useEffect(() => {
    if (focusedSection && sectionRefs.current[focusedSection]) {
      logger.trace(`[LivePreviewCanvas] Enfocando sección: ${focusedSection}`);
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
        logger.trace(
          "[LivePreviewCanvas] Iframe cargado. Inyectando estilos base."
        );
        iframeDoc.head.innerHTML = `
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Poppins:wght@700&family=Playfair+Display:wght@700&display=swap');
            body { margin: 0; font-family: 'Inter', sans-serif; background-color: hsl(var(--background)); color: hsl(var(--foreground)); transition: background-color 0.3s ease, color 0.3s ease; scroll-behavior: smooth; }
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

  const HeaderComponent =
    draft.headerConfig.useHeader && draft.headerConfig.componentName
      ? livePreviewComponentMap[draft.headerConfig.componentName]
      : null;

  const FooterComponent =
    draft.footerConfig.useFooter && draft.footerConfig.componentName
      ? livePreviewComponentMap[draft.footerConfig.componentName]
      : null;

  const animationProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.3, ease: "easeInOut" },
  } as const;

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
                  {content.loadingTheme}
                </p>
              </IframeOverlay>
            )}
            {error && (
              <IframeOverlay>
                <DynamicIcon
                  name="TriangleAlert"
                  className="w-8 h-8"
                  style={{ color: "hsl(var(--destructive))" }}
                />
                <p
                  style={{
                    marginTop: "1rem",
                    fontSize: "0.875rem",
                    color: "hsl(var(--destructive))",
                  }}
                >
                  {content.errorLoadingTheme}
                </p>
                <p style={{ fontSize: "0.75rem", opacity: 0.7 }}>{error}</p>
              </IframeOverlay>
            )}
            {theme && (
              <CampaignThemeProvider theme={theme}>
                <style>{generateCssVariablesFromTheme(theme)}</style>
                <AnimatePresence>
                  {HeaderComponent && (
                    <motion.div key="header" {...animationProps}>
                      <HeaderComponent {...mockHeader} />
                    </motion.div>
                  )}
                </AnimatePresence>

                <SectionRenderer
                  sections={draft.layoutConfig}
                  dictionary={previewDictionary}
                  locale={"it-IT"}
                  focusedSection={focusedSection}
                  sectionRefs={sectionRefs}
                />

                <AnimatePresence>
                  {FooterComponent && (
                    <motion.div key="footer" {...animationProps}>
                      <FooterComponent {...mockFooter} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </CampaignThemeProvider>
            )}
          </>,
          iframeBody
        )}
    </motion.div>
  );
}
// app/[locale]/(dev)/dev/campaign-suite/_components/LivePreviewCanvas.tsx
