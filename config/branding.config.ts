// src/config/branding.config.ts
/**
 * @file src/config/branding.config.ts
 * @description SSoT programática del Manifiesto de Branding.
 *              Define y exporta todos los tokens de diseño (colores, fuentes, breakpoints)
 *              para ser consumidos por el resto de la aplicación, estableciendo una
 *              única fuente de verdad para el sistema de diseño.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

/**
 * @constant GLOBAL_DESIGN_TOKENS
 * @description Objeto que encapsula todos los tokens de diseño del proyecto.
 */
export const GLOBAL_DESIGN_TOKENS = {
  /**
   * @property {object} colors - Paleta de colores semántica en formato HSL string.
   */
  colors: {
    primary: "220 60% 26%",
    "primary-foreground": "220 15% 95%",
    secondary: "220 15% 25%",
    "secondary-foreground": "220 15% 95%",
    background: "222 25% 8%",
    foreground: "220 15% 95%",
    accent: "84 100% 59%",
    "accent-foreground": "84 100% 10%",
    muted: "220 15% 15%",
    "muted-foreground": "220 10% 60%",
  },
  /**
   * @property {object} rgbColors - Versiones RGB para uso en JS (ej. efectos de partículas).
   */
  rgbColors: {
    primary: "26, 78, 178",
    accent: "128, 255, 0",
  },
  /**
   * @property {object} fonts - Definiciones de las familias de fuentes.
   */
  fonts: {
    sans: "var(--font-sans)",
    serif: "var(--font-serif)",
  },
  /**
   * @property {object} breakpoints - Puntos de interrupción para diseño responsivo.
   */
  breakpoints: {
    sm: "40rem", // 640px
    md: "48rem", // 768px
    lg: "64rem", // 1024px
    xl: "80rem", // 1280px
    "2xl": "96rem", // 1536px
  },
} as const; // `as const` para asegurar la inmutabilidad de los valores.
// src/config/branding.config.ts
