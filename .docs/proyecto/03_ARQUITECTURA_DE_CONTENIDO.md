// .docs/proyecto/03_ARQUITECTURA_DE_CONTENIDO.md
/**
 * @file 03_ARQUITECTURA_DE_CONTENIDO.md
 * @description Manifiesto de Arquitectura de Contenido.
 *              ACTUALIZACIÓN: Refactorizado para describir la Metodología de Activos
 *              de Campaña Soberanos (MACS), el rol del Manifiesto de Mapeo (MMAC)
 *              y la estructura isomórfica de datos.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto de Arquitectura de Contenido v2.0

## 1. Filosofía: Activos Soberanos y Datos Isomórficos

La gestión de contenido en `curcumin-simplex` se basa en la **Metodología de Activos de Campaña Soberanos (MACS)**. El objetivo es lograr la máxima flexibilidad, escalabilidad y una transición transparente a un futuro Headless CMS o base de datos.

*   **Soberanía del Activo:** Cada sub-campaña es una entidad de datos atómica. Toda su configuración de tema (layout, colores) y su contenido textual (para todos los idiomas) se consolidan en **un único archivo por tipo**.
*   **Abstracción vía Manifiesto de Mapeo:** El código de la aplicación está completamente desacoplado de la estructura de archivos. Un **Manifiesto de Mapeo (`campaign.map.json`)** por campaña actúa como un índice, indicando al motor de renderizado qué archivos de activos cargar para cada variante.
*   **Isomorfismo de Datos:** La estructura de los archivos de contenido (`..._CONTENT_...json`) está diseñada para ser **isomórfica** con la estructura que tendría un registro en una columna `JSONB` de una base de datos (como Supabase). Esto significa que la migración futura requerirá una transformación mínima de datos.

## 2. Estructura de Directorios

La estructura de archivos es la SSoT de esta arquitectura:

*   **Contenido Global/Default (`src/messages/`):** Contiene los diccionarios base, que actúan como fallback y proveen el contenido para el portal principal.

*   **Activos Específicos de Campaña (`src/content/campaigns/[campaignId]/`):**
    *   **`campaign.map.json` (El Índice):** El único punto de entrada para el motor de carga. Mapea `variantId` a sus respectivos archivos de tema y contenido.
    *   **`/themes/` (Los Estilos):** Contiene los manifiestos de tema. Cada archivo (ej. `..._THEME_02_vitality.json`) define el layout y las variables CSS para una sub-campaña.
    *   **`/content/` (Los Textos):** Contiene los manifiestos de contenido. Cada archivo (ej. `..._CONTENT_02_vitality.json`) contiene **todo el texto para todas las secciones** de esa sub-campaña, estructurado por idioma.

## 3. Lógica de Ensamblaje (El Orquestador `getCampaignData`)

El aparato `src/lib/i18n/campaign.i18n.ts` orquesta el flujo de datos:

1.  **Entrada:** Recibe `campaignId`, `variantId`, y `locale`.
2.  **Resolución (vía `campaign.map.resolver.ts`):** Lee el `campaign.map.json` para obtener las rutas de los archivos de tema y contenido para la `variantId` solicitada.
3.  **Carga (vía `campaign.data.loader.ts`):** Carga en paralelo los dos archivos de la campaña (tema y contenido) y el diccionario global para el `locale` solicitado.
4.  **Procesamiento (vía `campaign.data.processor.ts`):**
    *   Fusiona el diccionario global con el contenido específico de la campaña (el de la campaña tiene prioridad).
    *   Valida el diccionario fusionado y el archivo de tema contra sus respectivos esquemas Zod.
5.  **Entrega:** La función retorna un objeto `{ dictionary, theme }` validado y listo para ser renderizado por la página.

Esta arquitectura convierte la gestión de campañas en un sistema de gestión de datos estructurados, robusto y preparado para el futuro.

// .docs/proyecto/03_ARQUITECTURA_DE_CONTENIDO.md