// .docs/RUTAS-IMAGENES.md
/**
 * @file RUTAS-IMAGENES.md
 * @description Manifiesto y SSoT para la gestión de activos visuales.
 *              v3.0: Impone la directiva "JPG por Defecto". Todos los activos
 *              visuales no vectoriales deben ser .jpg para estandarizar la optimización.
 * @version 3.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto de Activos Visuales v3.0: "JPG por Defecto"

## 1. Filosofía: "Realidad Primero, Coherencia Absoluta."

Este manifiesto se basa en los activos existentes en el proyecto y establece un estándar inmutable para todos los activos futuros.

1.  **Formato de Archivo Único:** Todo activo visual no vectorial (fotografías, sellos renderizados, fondos) **DEBE** ser `.jpg`. El formato `.svg` se reserva exclusivamente para logotipos o iconografía compleja que requiera escalabilidad vectorial.
2.  **Estructura Espejo:** La ubicación de un activo en `/public/img/` **DEBE** ser un espejo de la ubicación del componente que lo consume en `components/`.
3.  **Nomenclatura Estructurada:** Los nombres de archivo deben ser predecibles y auto-descriptivos.

## 2. Fórmulas de Nomenclatura y Ruta

*   **Fórmula de Ruta:** `public/img/{ruta-espejo-del-componente-kebab-case}/`
*   **Fórmula de Nomenclatura:** `{proposito}_{variante-descriptiva}.jpg`
    *   **`{proposito}`:** `logo`, `avatar`, `seal`, `background`, `showcase`, `product`, `article`.
    *   **`{variante-descriptiva}`:** Un nombre claro en kebab-case.

## 3. Inventario Maestro de Activos v3.0 (SSoT)

| Componente Consumidor         | Activo                          | Ruta Relativa Completa (Desde la raíz del proyecto)                            |
| :---------------------------- | :------------------------------ | :----------------------------------------------------------------------------- |
| `Header`                      | Logo Principal                  | `public/img/layout/header/logo_principal.svg`                                  |
| `Hero`                        | Imagen de Producto              | `public/img/sections/hero/background_product-ingredients.jpg`                  |
| `SocialProofLogos`            | Sello 1: Cert. Natural          | `public/img/sections/social-proof-logos/seal_natural-certified.jpg`            |
| `SocialProofLogos`            | Sello 2: Calidad Prem.          | `public/img/sections/social-proof-logos/seal_premium-quality.jpg`              |
| `SocialProofLogos`            | Sello 3: Testeado Lab.          | `public/img/sections/social-proof-logos/seal_lab-tested.jpg`                   |
| `ThumbnailCarousel`           | Imagen Estilo de Vida           | `public/img/sections/thumbnail-carousel/showcase_lifestyle-activity.jpg`       |
| `ThumbnailCarousel`           | Imagen Ingredientes             | `public/img/sections/thumbnail-carousel/showcase_ingredients-natural.jpg`      |
| `ThumbnailCarousel`           | Imagen Producto                 | `public/img/sections/thumbnail-carousel/showcase_product-context.jpg`          |
| `TestimonialGrid`             | Avatares                        | `public/img/sections/testimonial-grid/avatar_{nombre}.jpg`                     |
| `GuaranteeSection`            | Sellos 1-13                     | `public/img/sections/guarantee-section/seal_garantia-{1-13}.jpg`               |
| `NewsGrid`                    | Imágenes de Artículos           | `public/img/news/{slug-del-articulo}.jpg`                                      |
| `ProductShowcase`             | Imágenes de Productos           | `public/img/products/{nombre-producto}.jpg`                                    |
| `DevLoginPage`                | Fondos Decorativos 1-5          | `public/img/dev/login/background_{1-5}.jpg`                                    |

// .docs/RUTAS-IMAGENES.md
