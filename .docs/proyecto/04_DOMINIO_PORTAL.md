// .docs/proyecto/04_DOMINIO_PORTAL.md
# Manifiesto de Dominio: El Portal

## 1. Rol Estratégico

El Portal es el **corazón de contenido y la cara pública principal** de la marca Global Fitwell. A diferencia de las campañas, su objetivo no es la conversión inmediata, sino construir **confianza, autoridad y tráfico orgánico a largo plazo**. Es el tronco del árbol del cual las campañas son las ramas.

## 2. Rutas y Funcionalidades Clave

-   **Homepage (`/`):**
    -   **Propósito:** Actuar como un "hub" dinámico que muestra el contenido más reciente y relevante.
    -   **Componentes Clave:** `NewsGrid`, `FeaturedArticle`.
-   **Tienda (`/store`):**
    -   **Propósito:** Presentar el catálogo de productos de Global Fitwell de una manera informativa y no agresiva.
    -   **Lógica Futura:** Implementar filtros por categoría, funcionalidad y precio. Cada producto enlazará a su propia página de detalle.
-   **Noticias/Blog (`/news` y `/news/[slug]`):**
    -   **Propósito:** El motor principal de SEO. Contendrá artículos de formato largo, bien investigados y optimizados para palabras clave de "cola larga".
    -   **Lógica:** La ruta `/news` será una página de archivo paginada, y `/[slug]` será la plantilla para cada artículo individual.
-   **Páginas Estáticas (`/about`, `/privacy`, etc.):**
    -   **Propósito:** Proveer información corporativa y legal esencial, lo cual es un factor de confianza importante para los usuarios y para Google (señales E-E-A-T).

## 3. Lógica de Contenido

El contenido del Portal se gestiona a través del ensamblador global `src/lib/i18n.ts` (`getDictionary`). A diferencia de las campañas, no utiliza el sistema de federación y fallback, sino que consume directamente el contenido definido en `src/messages/components/` y `src/messages/pages/`.
// .docs/proyecto/04_DOMINIO_PORTAL.md