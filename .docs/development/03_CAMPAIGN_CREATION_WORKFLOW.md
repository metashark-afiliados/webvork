// .docs/development/03_CAMPAIGN_CREATION_WORKFLOW.md
/**
 * @file 03_CAMPAIGN_CREATION_WORKFLOW.md
 * @description Manifiesto de Usabilidad para la Creación de Campañas v1.0 (Temporario).
 *              Define el proceso paso a paso para ensamblar y personalizar
 *              landing pages de campaña dentro de la arquitectura "Curcumin Simplex".
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto de Creación de Campañas v1.0 (Guía Táctica)

## 1. Propósito y Filosofía

Este documento es la Guía de Campo y Única Fuente de Verdad (SSoT) para el **proceso** de creación y modificación de Landing Pages. La filosofía es **"Configuración sobre Código"**: el arquitecto tiene el poder de diseñar y personalizar campañas sin escribir una sola línea de código React.

## 2. Lógica Fundamental: El Ecosistema de una Campaña

Cada campaña, identificada por su `campaignId`, es un ecosistema autocontenido que se define por tres pilares:

1.  **El Manifiesto de Layout (`theme.json`):**
    *   **Ubicación:** `src/content/campaigns/[campaignId]/theme.json`
    *   **Función:** Es su panel de control. La clave `"layout.sections"` en este archivo es un array que dicta **qué componentes de sección se renderizan y en qué orden exacto**. Modificar este array es equivalente a rediseñar la estructura de la landing page.

2.  **El Contenido Específico (`.../components/*.i18n.json`):**
    *   **Ubicación:** `src/content/campaigns/[campaignId]/components/`
    *   **Función:** Permite la **personalización del texto**. Si desea cambiar el texto de una sección para una campaña específica, copie el archivo de contenido por defecto desde `src/messages/components/[nombre-seccion]/` a este directorio y modifíquelo. El sistema lo detectará y usará su versión personalizada automáticamente (mecanismo de "override").

3.  **Los Activos Visuales (Imágenes):**
    *   **Ubicación:** `public/img/campaigns/[campaignId]/` (Recomendado)
    *   **Función:** Almacena las imágenes específicas de la campaña. Siga las directrices del `ASSET_MANAGEMENT_MANIFESTO.md`.

## 3. Workflow de Creación y Modificación (Paso a Paso)

Este es el proceso canónico para ensamblar o modificar una landing page.

### Paso 0: Identificación de la Campaña
Asegúrese de tener el `campaignId` correcto. Para nuestro caso actual, es `12157`.

### Paso 1: Definir la Estructura (El "Blueprint")
1.  **Navegue a:** `src/content/campaigns/12157/`
2.  **Abra el manifiesto:** `theme.json`
3.  **Edite el array `layout.sections`**:
    *   Para **añadir** una sección: Inserte un nuevo objeto `{ "name": "NombreDeLaSeccion" }` en la posición deseada.
    *   Para **eliminar** una sección: Simplemente borre su objeto del array.
    *   Para **reordenar** secciones: Cambie el orden de los objetos en el array.

### Paso 2: Personalizar el Contenido (El "Copywriting")
1.  **Identifique la sección** cuyo texto desea cambiar (ej. `Hero`).
2.  **Localice el contenido por defecto** en `src/messages/components/hero/hero.i18n.json`.
3.  **Copie** ese archivo a `src/content/campaigns/12157/components/hero.i18n.json`.
4.  **Modifique el texto** dentro del nuevo archivo copiado. El sistema dará prioridad a esta versión. Si el archivo no existe en la carpeta de la campaña, usará la versión por defecto.

### Paso 3: Verificación en Tiempo Real
1.  Ejecute el servidor de desarrollo: `pnpm run dev`.
2.  Navegue a la URL de su campaña: `http://localhost:3000/[locale]/campaigns/12157`.
3.  Observe sus cambios reflejados instantáneamente.

Este workflow le otorga control total sobre la estructura y contenido de cada landing page de manera independiente y segura.

// .docs/development/03_CAMPAIGN_CREATION_WORKFLOW.md