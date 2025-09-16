// .docs/TODO.md
/**
 * @file TODO.md
 * @description Manifiesto de Tareas Pendientes y Roadmap Estratégico del Proyecto.
 *              v2.0.0: Actualizado tras la auditoría holística de rutas del 16/09/2025.
 *              Define el plan de acción para la implementación de las funcionalidades
 *              del portal público.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto de Tareas Pendientes y Roadmap Estratégico

Este documento es la Única Fuente de Verdad (SSoT) para las futuras fases de desarrollo del proyecto. La fase actual se centra en el perfeccionamiento de la Suite de Diseño de Campañas (SDC). Las tareas aquí listadas serán abordadas subsecuentemente.

---

### **ÉPICA 1: Implementación del Portal Público v1.0**

*   **Visión:** Transformar el proyecto de una herramienta de desarrollo a un portal de contenido y comercio funcional, utilizando el aparataje de componentes existente.

#### **TAREA 1.1 (Prioridad Crítica): Implementar la Página de la Tienda (`/store`)**

*   **Estado:** PENDIENTE
*   **Requisitos:**
    1.  Crear el archivo `app/[locale]/store/page.tsx`.
    2.  Crear el contenido y schema SSoT (`store-page.i18n.json`, `store-page.schema.ts`).
    3.  El `page.tsx` debe ensamblar los siguientes componentes existentes:
        *   `PageHeader` (para el título/subtítulo).
        *   Un layout de dos columnas que contenga:
            *   `ProductFilters` (barra lateral).
            *   `ProductGrid` (cuadrícula principal).
        *   `FaqAccordion` (para preguntas frecuentes sobre compras).
        *   `CommunitySection` (como CTA final).
*   **Criterio de Aceptación:** La ruta `/store` debe renderizar una página de tienda completamente funcional y estilizada.

#### **TAREA 1.2 (Prioridad Crítica): Implementar el Archivo de Noticias (`/news`)**

*   **Estado:** PENDIENTE
*   **Requisitos:**
    1.  Crear el archivo `app/[locale]/news/page.tsx`.
    2.  Crear el contenido y schema SSoT (`news-archive-page.i18n.json`, `news-archive-page.schema.ts`).
    3.  El `page.tsx` debe ensamblar los siguientes componentes:
        *   `PageHeader`.
        *   `FeaturedArticlesCarousel` (para destacar artículos).
        *   `NewsGrid` (para listar todos los artículos).
        *   Una sección final con el componente `NewsletterForm`.
*   **Criterio de Aceptación:** La ruta `/news` debe renderizar un índice de blog funcional.

#### **TAREA 1.3 (Prioridad Requerida): Implementar las Páginas Legales**

*   **Estado:** PENDIENTE
*   **Requisitos:**
    1.  Crear los archivos `page.tsx` para las rutas `/terms`, `/privacy` y `/cookies`.
    2.  Crear el contenido y schema SSoT para cada una (`terms-page.i18n.json`, etc.), siguiendo el contrato del `TextPageLocaleSchema`.
    3.  Cada `page.tsx` debe utilizar los componentes `PageHeader` y `TextSection` para renderizar su contenido.
*   **Criterio de Aceptación:** Las rutas legales deben ser accesibles y mostrar su contenido correspondiente.

---
 "La IA nunca ofrecera seguir con el TODO a menos que el usuario le pida."
