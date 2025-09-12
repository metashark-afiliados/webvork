// .docs/proyecto/05_DOMINIO_CAMPANAS.md
/**
 * @file 05_DOMINIO_CAMPANAS.md
 * @description Manifiesto de Dominio para el Motor de Campañas.
 *              ACTUALIZACIÓN: Refactorizado para alinearse con la arquitectura
 *              MACS y el uso del Manifiesto de Mapeo.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto de Dominio: El Motor de Campañas v2.0

## 1. Rol Estratégico

El dominio de Campañas es el **motor de conversión de alto rendimiento** del proyecto. Cada página dentro de `/campaigns/[campaignId]` es una Landing Page (LP) optimizada para un objetivo específico.

La filosofía es la **máxima flexibilidad a través de la configuración de datos estructurados**. El equipo de marketing debe poder lanzar y testear A/B múltiples variantes de campaña (`sub-campañas`) sin tocar el código de la aplicación.

## 2. Arquitectura y Lógica

*   **Enrutamiento Dinámico:** Utiliza una única ruta de archivo, `src/app/[locale]/(campaigns)/[campaignId]/page.tsx`, para renderizar todas las campañas. El `campaignId` se extrae de la URL. Una futura mejora pasará un `variantId` a través de un parámetro de búsqueda (ej. `?v=02`).

*   **Datos Soberanos por Variante:** La lógica de contenido es gestionada por el orquestador `getCampaignData`, que implementa la arquitectura MACS:
    1.  Consulta el **`campaign.map.json`** para resolver las rutas de los activos.
    2.  Carga un **único archivo de tema** (`..._THEME_...json`) que define el layout y el branding.
    3.  Carga un **único archivo de contenido** (`..._CONTENT_...json`) que contiene todos los textos.
    4.  Fusiona el contenido de la campaña con el diccionario global, dando prioridad al de la campaña.

*   **Layout y Theming por Manifiesto:** La estructura (secciones y orden) y el branding (colores, fuentes) están definidos en el archivo de tema de cada variante, permitiendo diseños y estilos completamente distintos.

*   **Seguridad:** Todas las páginas de campaña están envueltas por el layout de grupo `src/app/[locale]/(campaigns)/layout.tsx`, que aplica el `AntiCopyHandler`.

## 3. Flujo de Creación de una Nueva Variante de Campaña

1.  **Definir Estrategia:** Crear los manifiestos conceptuales en `.docs/campaign_intelligence/`.
2.  **Crear Manifiesto de Tema:** Crear un nuevo archivo `..._THEME_{variantId}_{name}.json` en `src/content/campaigns/[campaignId]/themes/`. Definir el `layout` y el branding.
3.  **Crear Manifiesto de Contenido:** Crear un nuevo archivo `..._CONTENT_{variantId}_{name}.json` en `src/content/campaigns/[campaignId]/content/`. Añadir todo el texto para todas las secciones y todos los idiomas.
4.  **Actualizar el Mapa:** Abrir `src/content/campaigns/[campaignId]/campaign.map.json` y añadir una nueva entrada para la `variantId`, apuntando a los dos archivos recién creados.
5.  **Desplegar:** No se requiere **ningún cambio en el código React**.

Esta arquitectura convierte la creación y el A/B testing de campañas en un proceso de gestión de datos puros, eliminando la dependencia del ciclo de desarrollo de software.

// .docs/proyecto/05_DOMINIO_CAMPANAS.md