// .docs/development/04_DEVELOPER_COMMAND_CENTER_MANIFESTO.md
/**
 * @file 04_DEVELOPER_COMMAND_CENTER_MANIFESTO.md
 * @description Manifiesto Arquitectónico para el Developer Command Center.
 *              Define la visión, estructura y funcionalidades de la suite de
 *              herramientas de desarrollo interna del proyecto `curcumin-simplex`.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto del Developer Command Center (DCC)

## 1. Visión y Filosofía

El Developer Command Center (DCC) no es un simple conjunto de páginas de desarrollo; es una **interfaz de control y simulación de élite** diseñada para maximizar la productividad, la calidad y la velocidad de iteración. Su filosofía se basa en tres pilares:

1.  **Visualización Total:** Lo que se puede ver, se puede entender. El DCC debe permitir la visualización de cualquier pieza de la UI (componente atómico o campaña completa) en un entorno controlado.
2.  **Interacción Dinámica:** El desarrollador debe poder simular diferentes contextos (variantes de campaña, locales) sin necesidad de modificar código o URLs manualmente.
3.  **Fuente Única de Verdad (SSoT) para el Desarrollo:** El DCC debe leer directamente de los mismos manifiestos de configuración (`campaign.map.json`, etc.) que la aplicación de producción, asegurando que lo que se ve en desarrollo es un reflejo fiel de lo que se desplegará.

## 2. Arquitectura de Rutas y Vistas

El DCC reside bajo la ruta `/dev` y se organiza en las siguientes vistas principales, cada una con una responsabilidad única:

*   **/dev (Página Principal):**
    *   **Rol:** El portal de entrada. Presenta las herramientas disponibles a través de una interfaz de tarjetas clara y concisa.
    *   **Componente:** `src/app/[locale]/(dev)/dev/page.tsx`

*   **/dev/components (Lienzo de Componentes):**
    *   **Rol:** La herramienta para el desarrollo y la auditoría de componentes de UI atómicos en aislamiento.
    *   **Lógica:** Lee el `ComponentRegistry.ts` para listar todos los componentes disponibles. Cada componente se renderiza en su propia sub-ruta (`/dev/components/[componentName]`) utilizando el `ComponentLoader` para obtener datos de mock.
    *   **Componentes:** `.../dev/components/page.tsx` y `.../dev/components/[componentName]/page.tsx`

*   **/dev/simulator (Simulador de Campañas):**
    *   **Rol:** La herramienta principal para el equipo de marketing y desarrollo. Permite la previsualización en vivo de cualquier sub-campaña.
    *   **Lógica:** Lee los `campaign.map.json` para descubrir dinámicamente las campañas y variantes existentes. Genera enlaces con los parámetros de búsqueda (`?v={variantId}`) correctos para que la página de campaña (`/campaigns/[campaignId]`) renderice la variante seleccionada.
    *   **Componente:** `src/app/[locale]/(dev)/dev/simulator/page.tsx`

*   **/dev/branding (Visor de Branding):**
    *   **Rol:** Una página de referencia visual que muestra todas las variables del sistema de diseño (colores, tipografías, espaciado) definidas en `globals.css` y en los manifiestos de tema.
    *   **Lógica:** Renderiza una guía de estilo generada a partir de los tokens de diseño.
    *   **Componente:** (A ser creado) `src/app/[locale]/(dev)/dev/branding/page.tsx`

## 3. Flujo de Trabajo del Desarrollador/Marketing

1.  **Inicio:** El usuario accede a `http://localhost:3000/it-IT/dev`.
2.  **Selección de Herramienta:** El usuario elige entre "Component Canvas", "Campaign Simulator" o "Branding".
3.  **Caso de Uso A (Simulación de Campaña):**
    *   El usuario navega al "Campaign Simulator".
    *   La página lee el `campaign.map.json` de la campaña `12157`.
    *   Se muestra una tarjeta por cada una de las cuatro variantes ("Scientific", "Vitality", etc.).
    *   El usuario hace clic en la tarjeta "Vitality".
    *   Se abre una nueva pestaña en la URL `.../campaigns/12157?v=02`.
    *   La `CampaignPage` lee el `variantId=02`, invoca al motor de datos `getCampaignData`, y renderiza la landing page completa con el tema y el contenido de la variante "Vitality".
4.  **Caso de Uso B (Desarrollo de Componente):**
    *   El usuario navega al "Component Canvas".
    *   Se muestra una lista de todos los componentes registrados (`Header`, `Hero`, `Card`, etc.).
    *   El usuario hace clic en `Hero`.
    *   Navega a `.../dev/components/Hero`.
    *   La página `ComponentCanvas` carga el componente `Hero` y le inyecta los datos de la campaña "Vitality" (nuestro caso de prueba por defecto), renderizándolo en un entorno aislado.

Este manifiesto formaliza nuestra visión para el DCC, convirtiéndolo en una herramienta de desarrollo de nivel profesional que apoya directamente nuestra arquitectura de campañas modulares.

// .docs/development/04_DEVELOPER_COMMAND_CENTER_MANIFESTO.md