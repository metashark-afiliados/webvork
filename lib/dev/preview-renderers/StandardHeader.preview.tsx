// lib/dev/preview-renderers/StandardHeader.preview.tsx
/**
 * @file StandardHeader.preview.tsx
 * @description Renderizador de previsualización atómico que ahora utiliza
 *              estilos en línea para ser compatible con @vercel/og.
 * @version 3.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import * as React from "react";
import type { PreviewRenderResult, PreviewRenderer } from "./_types";
import { getEdgeDictionary } from "@/lib/i18n/i18n.edge";
import { logger } from "@/lib/logging";
import { getStyleFromTheme } from "./_utils";

export const StandardHeaderPreview: PreviewRenderer = async (
  locale,
  theme
): Promise<PreviewRenderResult | null> => {
  logger.trace(`[StandardHeader.preview] Renderizando para locale: ${locale}`);
  const { dictionary } = await getEdgeDictionary(locale);
  const content = dictionary.header;
  if (!content) return null;

  const styles = getStyleFromTheme(theme);

  return {
    jsx: (
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          border: `1px solid ${styles.borderColor}`,
          borderRadius: "0.5rem",
          fontFamily: theme.fonts.sans,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <span
            style={{
              fontWeight: "bold",
              fontSize: "1.125rem",
              color: styles.primaryColor,
            }}
          >
            GlobalFitwell
          </span>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              fontSize: "0.875rem",
              color: styles.mutedForegroundColor,
            }}
          >
            {content.navLinks.map((link) => (
              <span key={link.label}>{link.label}</span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: "1.25rem",
              height: "1.25rem",
              backgroundColor: styles.mutedBackgroundColor,
              borderRadius: "9999px",
            }}
          />
          <div
            style={{
              width: "1.25rem",
              height: "1.25rem",
              backgroundColor: styles.mutedBackgroundColor,
              borderRadius: "9999px",
            }}
          />
          <div
            style={{
              padding: "0.375rem 0.75rem",
              fontSize: "0.875rem",
              backgroundColor: styles.accentColor,
              color: styles.accentForegroundColor,
              borderRadius: "0.375rem",
            }}
          >
            {content.ctaButton.label}
          </div>
        </div>
      </div>
    ),
    width: 1200,
    height: 84,
  };
};
// lib/dev/preview-renderers/StandardHeader.preview.tsx
