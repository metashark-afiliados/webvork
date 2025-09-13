// .docs/development/03_CAMPAIGN_DESIGN_SUITE_WORKFLOW.md
/**
 * @file 03_CAMPAIGN_DESIGN_SUITE_WORKFLOW.md
 * @description Manifiesto y SSoT para la Suite de Diseño de Campañas (SDC).
 *              Define el proceso guiado para la creación de activos de campaña,
 *              reemplazando el obsoleto flujo de trabajo manual.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto de la Suite de Diseño de Campañas (SDC)

## 1. Visión y Filosofía

La SDC es una herramienta interna de élite, diseñada para transformar la creación de campañas de un proceso técnico y propenso a errores a un **flujo de trabajo estratégico, visual y guiado**. Su filosofía es **"Calidad por Diseño"**: los activos de campaña (`THEME` y `CONTENT`) se generan a partir de una interfaz controlada que se basa directamente en los schemas de Zod, garantizando que todo lo creado sea sintáctica y estructuralmente perfecto desde su concepción.

Esta suite es ahora la **única vía autorizada** para crear o modificar variantes de campaña.

## 2. Arquitectura de Alto Nivel

La SDC reside en el Developer Command Center (DCC) y se compone de tres elementos principales:

1.  **El Asistente de Creación (Frontend):** Una página en `/dev/campaigns/create` que guía al usuario a través de un proceso paso a paso.
2.  **El Intérprete de Schemas (Componente):** Un componente reutilizable (`SchemaDrivenForm`) capaz de leer un schema de Zod y renderizar un formulario de edición apropiado.
3.  **El Generador de Activos (Backend):** Una Server Action (`generateCampaignAssetsAction`) que recibe los datos del asistente, los valida por última vez y escribe los archivos `.json` en el sistema de archivos.

## 3. Flujo de Trabajo Detallado

### Paso 1: Creación y Configuración de Metadatos
-   **Interfaz:** Un formulario inicial donde el usuario define:
    -   **Campaña Base:** Selecciona de una lista de campañas existentes (ej. "12157 - Curcumin").
    -   **Nombre de Variante:** Un nombre legible (ej. "Vitality Boost").
    -   **Palabras Clave SEO:** Una lista de términos (ej. `energia, curcuma, vitalita`) que se usarán para generar un slug de URL amigable para SEO.

### Paso 2: Diseño de Layout y Tema Visual
-   **Interfaz:** Un panel de diseño visual.
    -   **Presets de Tema:** El usuario elige un tema visual base (ej. "Scientific", "Nature") que precarga una paleta de colores y tipografías. Los valores HSL del tema son editables.
    -   **Constructor de Layout:** Una interfaz de dos columnas.
        -   **Columna 1 (Disponibles):** Lista de todas las secciones disponibles registradas en `sections.config.ts`.
        -   **Columna 2 (Layout Actual):** Una lista reordenable (drag-and-drop) que representa el layout de la landing page. El usuario arrastra las secciones deseadas desde la columna 1 a la 2.

### Paso 3: Edición de Contenido Internacionalizado
-   **Interfaz:** Una vista previa del layout.
    -   Al hacer clic en una sección del layout (ej. "Hero"), se abre un modal.
    -   Dentro del modal, el componente `SchemaDrivenForm` inspecciona el schema correspondiente (`HeroLocaleSchema`) y genera los campos de entrada (`title`, `subtitle`).
    -   El formulario presenta pestañas para cada locale soportado (`it-IT`, `es-ES`, etc.), permitiendo la carga de todo el contenido i18n en un solo lugar.

### Paso 4: Generación y Despliegue Simulado
-   **Acción:** El usuario presiona "Generar Activos".
-   **Proceso (Server Action):**
    1.  Recopila todos los datos de los pasos anteriores.
    2.  Construye los objetos `themeObject` y `contentObject`.
    3.  Valida ambos objetos contra `CampaignThemeSchema` y `i18nSchema` respectivamente.
    4.  Si la validación es exitosa, genera los nombres de archivo estandarizados.
    5.  Escribe los archivos `.json` en la ruta `/src/content/campaigns/[campaignId]/...`.
    6.  Lee, actualiza y reescribe el archivo `campaign.map.json` para incluir la nueva variante.
    7.  **Respuesta:** Redirige al usuario al **Simulador de Campañas** (`/dev/simulator`), donde la nueva variante recién creada ya está disponible para su previsualización inmediata.

Este flujo de trabajo cerrado asegura un ciclo de vida de creación de campañas rápido, seguro y totalmente alineado con la arquitectura del proyecto.
// .docs/development/03_CAMPAIGN_DESIGN_SUITE_WORKFLOW.md```

---

La documentación estratégica ha sido actualizada para reflejar la nueva visión. Ahora continúo con la refactorización técnica para resolver los errores pendientes.

**Siguiente aparato a refactorizar:** `lib/i18n/campaign.i18n.ts`