// .docs/ASSET_MANAGEMENT_MANIFESTO.md
/**
 * @file /.docs/ASSET_MANAGEMENT_MANIFESTO.md
 * @description Manifiesto de Gestión de Activos Visuales. SSoT que define la
 *              estrategia, estructura y especificaciones técnicas para todos
 *              los recursos estáticos del proyecto Curcumin Simplex.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */

# Manifiesto de Gestión de Activos: Rendimiento por Diseño

## 1. Filosofía

La gestión de activos en `curcumin-simplex` se rige por la filosofía de **"Rendimiento por Diseño y Coherencia Estructural"**. Cada imagen es un activo de ingeniería que debe ser optimizado antes de su integración. La estructura de almacenamiento de estos activos debe reflejar directamente la arquitectura de componentes para una mantenibilidad intuitiva.

## 2. Principios Fundamentales (No Negociables)

1.  **Directorio `public` como SSoT:** Toda imagen, icono o recurso estático visible para el usuario **DEBE** residir dentro del directorio `/public/img/`. Este es el único origen de verdad para los activos.

2.  **Estructura Espejo:** La organización de subdirectorios dentro de `/public/img/` **DEBE** ser un espejo de la estructura de `src/components/`. Si un componente en `src/components/sections/Hero.tsx` requiere una imagen, esta debe estar en `public/img/sections/hero/`.

3.  **Convención de Nomenclatura Estricta:** Todos los archivos de imagen **DEBEN** seguir el formato `componente_proposito_variante.ext` (ej. `hero_background_desktop.webp`, `social-proof_logo_marca-a.png`). Esto elimina la ambigüedad y hace que los activos sean auto-descriptivos.

4.  **Optimización Mandatoria:** Ninguna imagen se integrará sin una optimización previa. Esto incluye:
    *   **Formato:** Priorizar formatos modernos como **WebP** sobre JPEG/PNG por su superior compresión.
    *   **Dimensiones:** Redimensionar las imágenes a las dimensiones máximas requeridas en el diseño.
    *   **Compresión:** Aplicar compresión con pérdida (calidad ~80-85%) para un equilibrio óptimo entre calidad y tamaño de archivo.

5.  **Implementación con `next/image`:** Todo tag `<img>` en el código **DEBE** ser implementado a través del componente `<Image>` de Next.js para aprovechar la optimización automática (lazy loading, responsive `srcset`, etc.). El uso de la etiqueta `<img>` nativa está prohibido.

## 3. Especificaciones Técnicas por Tipo de Activo

| Tipo de Activo | Componente Asociado | Formato Preferido | Dimensiones Máximas (WxH) | Calidad (Compresión) | Nomenclatura Ejemplo |
| :---| :--- | :--- | :--- | :--- | :--- |
| **Imagen de Fondo (Hero)** | `Hero.tsx` | WebP | 1920x1080 (Desktop) | 80% | `hero_background_desktop.webp` |
| **Logo de Sitio** | `Header.tsx` | SVG / WebP | 512x128 | 90% | `header_logo_principal.svg` |
| **Logos de Prueba Social** | `SocialProofLogos.tsx` | PNG / WebP | 300x100 (aprox.) | 90% | `social-proof_logo_anvisa.png` |
| **Thumbnails de Carrusel** | `ThumbnailCarousel.tsx`| WebP | 800x450 (16:9) | 85% | `carousel_actividad-aire-libre.webp` |
| **Iconos de Beneficios** | `BenefitsSection.tsx`| SVG | 64x64 | N/A | `benefits_icon_antioxidante.svg` |
| **Avatares de Testimonios**| `TestimonialGrid.tsx`| WebP | 128x128 | 85% | `testimonial_avatar_maria-g.webp` |

Este manifiesto asegura que el rendimiento visual no sea una ocurrencia tardía, sino una parte integral y disciplinada del ciclo de desarrollo.

// .docs/ASSET_MANAGEMENT_MANIFESTO.md

---
public/
└── img/
    ├── logos/
    │   └── .gitkeep
    └── sections/
        ├── benefits/
        │   └── .gitkeep
        ├── hero/
        │   └── .gitkeep
        ├── ingredient-analysis/
        │   └── .gitkeep
        ├── social-proof/
        │   └── .gitkeep
        ├── testimonial-grid/
        │   └── .gitkeep
        └── thumbnail-carousel/
            └── .gitkeep