// /.docs/BRANDING_SSOT.md
/**
 * @file /.docs/BRANDING_SSOT.md
 * @description Manifiesto Técnico de Branding y SSoT del Sistema de Diseño
 *              para el proyecto Curcumin Simplex.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.0.0
 */

# Manifiesto Técnico de Branding: Curcumin Simplex

## 1. Filosofía de Diseño

La identidad visual de `curcumin-simplex` se fundamenta en la **Confianza Digital y la Claridad Moderna**. El diseño debe proyectar profesionalismo, seguridad y eficacia, utilizando una estética limpia y tecnológica que guíe al usuario de forma intuitiva hacia la conversión.

-   **Confianza y Profesionalismo:** Se logra a través de una paleta de colores controlada, dominada por azules profundos que evocan estabilidad y conocimiento.
-   **Claridad y Enfoque:** La estructura es minimalista, con amplio espacio negativo para evitar la sobrecarga cognitiva. La jerarquía visual es fuerte, con puntos de acento vibrantes que dirigen la atención a las llamadas a la acción.
-   **Modernidad y Dinamismo:** Se utilizan tipografías limpias (sans-serif para legibilidad, serif para impacto en titulares) y animaciones sutiles para crear una experiencia de usuario fluida y contemporánea.

## 2. Paleta de Colores Canónica (Tema por Defecto: `darkBlue`)

Esta es la SSoT para los valores de color del proyecto, controlados por nuestro sistema de Theming (`/src/lib/config/theme.config.ts`).

| Rol Estratégico            | Variable CSS (`--nombre`) | Valor HSL (SSoT)   | Descripción de Uso                                     |
| -------------------------- | ------------------------- | ------------------ | ------------------------------------------------------ |
| **Fondo Principal**        | `background`              | `240 10% 3.9%`     | El fondo oscuro principal de la aplicación.            |
| **Texto Principal**        | `foreground`              | `0 0% 98%`         | Texto principal y elementos de alto contraste.         |
| **Acento Primario**        | `primary`                 | `217 91% 60%`      | Color principal para titulares, iconos y acentos clave. |
| **Inicio de Gradiente (Alerta)** | `banner-alert-start`    | `22 96% 54%`       | Color de inicio para gradientes de alerta (ej. ScrollingBanner). |
| **Fin de Gradiente (Alerta)**    | `banner-alert-end`      | `0 84% 60%`        | Color de fin para gradientes de alerta.                |

*Nota: Todos los colores pueden ser anulados individualmente en el archivo `.env` a través de las variables `CUSTOM_COLOR_*`.*

## 3. Tipografía

La tipografía refuerza la claridad y la jerarquía del contenido.

-   **Familia Principal (Cuerpo):** `font-sans` (Familia de fuentes sans-serif por defecto del sistema). Optimizada para máxima legibilidad en párrafos y elementos de UI.
-   **Familia de Titulares:** `font-serif` (Familia de fuentes serif por defecto del sistema). Utilizada en `h1` y `h2` para crear impacto visual y un contraste elegante.

## 4. Geometría y Espaciado

La geometría del diseño es limpia y consistente, utilizando un sistema de espaciado y radios predecible.

-   **Radio de Borde:** Se utiliza una escala consistente a través de las utilidades de Tailwind (`rounded-lg`, `rounded-xl`, etc.) para mantener una apariencia cohesiva.
-   **Espaciado:** El espaciado entre elementos y secciones se gestiona a través de la escala de espaciado de Tailwind, garantizando un ritmo visual armónico y predecible.

// /.docs/BRANDING_SSOT.md