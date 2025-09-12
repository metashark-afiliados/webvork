// .docs/I18N_STRATEGY_SSOT.md
/**
 * @file /.docs/I18N_STRATEGY_SSOT.md
 * @description Manifiesto de Estrategia de Internacionalización (i18n).
 *              Define la arquitectura soberana y desacoplada para la gestión
 *              de contenido multilingüe en Curcumin Simplex.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 2.0.0
 */

# Manifiesto de Estrategia de Internacionalización (i18n): Soberanía del Componente

## 1. Filosofía Arquitectónica

Este documento es la **Única Fuente de Verdad (SSoT)** para la internacionalización. La arquitectura se basa en el principio de **Soberanía y Cohesión**: cada componente de UI es el dueño absoluto de su propio contenido y de su contrato de datos.

Se abandona el modelo monolítico en favor de una **estructura espejo** que alinea directamente el contenido y los esquemas con la arquitectura de componentes de `src/components/`.

## 2. Estructura de Archivos (No Negociable)

La localización de un componente se define a través de dos archivos atómicos que **DEBEN** residir en una ruta espejo dentro de `src/messages/` y `src/lib/schemas/`.

1.  **Archivo de Contenido (`.i18n.json`):**
    *   **Ubicación:** `src/messages/components/{nombre-componente}/{nombre-componente}.i18n.json`
    *   **Estructura:** Un único archivo JSON que contiene un objeto de nivel superior para cada locale soportado.
    *   **Locales Soportados:** `es-ES`, `pt-BR`, `en-US`, `it-IT`.
    *   **Ejemplo (`hero.i18n.json`):**
        ```json
        {
          "es-ES": { "hero": { "title": "Título en Español" } },
          "pt-BR": { "hero": { "title": "Título em Português" } },
          "en-US": { "hero": { "title": "Title in English" } },
          "it-IT": { "hero": { "title": "Titolo in Italiano" } }
        }
        ```

2.  **Archivo de Esquema (`.schema.ts`):**
    *   **Ubicación:** `src/lib/schemas/components/{nombre-componente}.schema.ts`
    *   **Estructura:** Este archivo exporta dos esquemas de Zod:
        1.  `{ComponentName}LocaleSchema`: Valida el objeto de contenido para **un solo locale**.
        2.  `{ComponentName}I18nSchema`: Valida la estructura completa del archivo `.i18n.json` con todos sus locales.

## 3. Flujo de Datos en Tiempo de Build

El `getDictionary` (`src/lib/i18n.ts`) ahora funciona como un **Ensamblador de Contenido Dinámico**:

1.  **Lectura de Locale:** Lee la variable `NEXT_PUBLIC_SITE_LOCALE` del archivo `.env`.
2.  **Carga Dinámica:** Importa todos los archivos `*.i18n.json` de la estructura espejo.
3.  **Extracción y Fusión:** De cada archivo cargado, extrae únicamente el objeto del `locale` activo y lo fusiona en un único diccionario de contenido para la página.
4.  **Validación Final:** El `i18n.schema.ts` principal, que ahora también es un ensamblador de esquemas, valida la estructura final del diccionario fusionado de un solo idioma.

Esta arquitectura garantiza un sistema de i18n robusto, modular y altamente mantenible, donde la "superficie de ataque" de cualquier cambio se limita al propio componente.

// .docs/I18N_STRATEGY_SSOT.md