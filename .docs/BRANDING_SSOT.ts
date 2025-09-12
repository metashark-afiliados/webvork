// .docs/BRANDING_SSOT.ts
/**
 * @file .docs/BRANDING_SSOT.ts
 * @description Representación programática del Manifiesto Técnico de Branding (SSoT).
 *              Exporta los tokens de diseño clave para ser consumidos directamente en el código.
 * @version 1.0.0
 * @author IA Ingeniera de Software Senior v2.0
 */

// NOTA: Los valores HSL se almacenan como strings para coincidir con la variable CSS.
// Si se necesitan los valores HSL como números para cálculos JS, se deberían parsear.

export const BRADING_SSOT_DATA = {
  defaultTheme: {
    colors: {
      primary: "220 60% 26%",
      background: "222 25% 8%",
      foreground: "220 15% 95%",
      accent: "84 100% 59%",
      secondary: "220 15% 25%",
      "muted-foreground": "220 10% 60%",
      // Añadir aquí otros colores del tema por defecto si son relevantes para mostrar
    },
    fonts: {
      sans: "Inter, sans-serif",
      serif: "Poppins, serif",
      // Añadir aquí otras fuentes del tema por defecto
    },
  },
  breakpoints: {
    sm: "40rem (640px)",
    md: "48rem (768px)",
    lg: "64rem (1024px)",
    xl: "80rem (1280px)",
    "2xl": "96rem (1536px)",
  },
  // Añadir aquí otros metadatos de branding si son relevantes para el canvas de desarrollo
};
