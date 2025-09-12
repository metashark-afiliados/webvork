// .docs/proyecto/01_ARQUITECTURA_GENERAL.md
# Manifiesto Arquitectónico v3.0: Portal de Bienestar Global Fitwell

## 1. Visión y Filosofía

Global Fitwell es un **ecosistema digital de bienestar**, no un simple sitio web. Su arquitectura está diseñada bajo la filosofía de **"Contenido de Autoridad, Conversión Especializada"**. El sistema opera sobre tres pilares estratégicos:

1.  **El Portal (Ruta Raíz `/`):** Es el hub de contenido principal, diseñado para construir autoridad de marca y atraer tráfico orgánico a través de noticias, artículos y páginas informativas.
2.  **La Tienda (`/store`):** Una vitrina de productos de bienestar, que sirve como un canal de conversión suave para el tráfico orgánico.
3.  **El Motor de Campañas (`/campaigns/[id]`):** Un sistema de landing pages de alta conversión, optimizadas para tráfico de pago, donde cada campaña es una unidad de contenido, diseño y layout completamente soberana.

La base técnica es la **Generación de Sitios Estáticos (SSG) con Renderizado Híbrido**, utilizando Next.js para una performance de élite y un SEO óptimo.

## 2. Principios Arquitectónicos Fundamentales

-   **Internacionalización Basada en Rutas:** Toda la navegación pública reside bajo un segmento de ruta dinámico `[locale]`. Esto es la SSoT para la localización y es una mejor práctica de SEO.
-   **Contenido Federado por Campaña:** Cada campaña es un "silo" de contenido autocontenido (`/src/content/campaigns/[id]`). Esto incluye textos, imágenes y configuraciones de tema/layout, lo que permite una personalización infinita sin tocar el código de la aplicación.
-   **Componentes Atómicos y Reutilizables:** La UI se construye a partir de una librería interna de componentes de presentación puros (`/src/components/`) que son agnósticos al contexto y reciben todos sus datos a través de `props`.
-   **Calidad por Contrato (Zod):** La integridad de todo el contenido (tanto global como de campañas) se valida en tiempo de build contra esquemas de Zod. Un contrato roto detiene el despliegue, previniendo errores en producción.
-   **Middleware por Pipeline:** La lógica de "borde" (rutas, i18n, futura autenticación) se gestiona a través de un pipeline de manejadores atómicos, asegurando una separación de intereses clara y una alta mantenibilidad.

## 3. Flujo de Datos y Renderizado

1.  **Request:** Un usuario solicita una URL, por ejemplo, `/campaigns/12157`.
2.  **Middleware:**
    -   El **`i18nHandler`** detecta la ausencia de un `locale` en la ruta.
    -   Determina el `locale` por defecto (ej. `it-IT`).
    -   Emite una redirección 307 a `/it-IT/campaigns/12157`.
3.  **Enrutamiento de Next.js:**
    -   La petición ahora coincide con la ruta de archivo `src/app/[locale]/(campaigns)/[campaignId]/page.tsx`.
    -   Next.js invoca al componente de página, pasando `{ locale: 'it-IT', campaignId: '12157' }` como `params`.
4.  **Obtención de Datos (Servidor):**
    -   La página `CampaignPage` invoca a `getCampaignData('12157', 'it-IT')`.
    -   Esta función lee el `theme.json` de la campaña para obtener la configuración de layout.
    -   Luego, ensambla el diccionario de contenido, priorizando los archivos de `src/content/campaigns/12157/` y usando los de `src/messages/components/` como fallback.
5.  **Renderizado (Servidor):**
    -   La página itera sobre la configuración de `layout` del `theme.json`.
    -   Para cada sección, invoca al componente `SectionRenderer`, que mapea el nombre de la sección al componente React correspondiente y le inyecta los datos del diccionario.
6.  **Respuesta:** Se envía al cliente una página HTML estática, optimizada y completamente renderizada.

Este manifiesto establece los principios y el flujo de alto nivel que gobiernan todo el sistema.
// .docs/proyecto/01_ARQUITECTURA_GENERAL.md