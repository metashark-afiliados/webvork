// .docs-espejo/lib/config/sections.config.ts.md
/**
 * @file .docs-espejo/lib/config/sections.config.ts.md
 * @description Documento Espejo para el aparato sections.config.ts.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Conceptual: Registro de Secciones

## 1. Rol Estratégico

El aparato `sections.config.ts` es el **mapa maestro del renderizado dinámico de secciones**. Su rol estratégico es implementar el **Patrón de Registro (Registry Pattern)** para desacoplar completamente el `SectionRenderer` de los componentes de sección concretos.

Actúa como la Única Fuente de Verdad (SSoT) que responde a la pregunta: "Dado el nombre de una sección (un string), ¿qué componente React debo renderizar y de dónde saco su contenido?".

## 2. Arquitectura y Flujo de Ejecución

1.  **Definición del Contrato**: `SectionConfigEntry` define la información necesaria para cada sección: el componente en sí (`component`) y la clave para encontrar su contenido en el diccionario global (`dictionaryKey`).
2.  **Registro Central**: `sectionsConfig` es un objeto que actúa como un diccionario (mapa), donde las claves son los nombres de las secciones (ej. `"Hero"`) y los valores son objetos que cumplen el contrato `SectionConfigEntry`.
3.  **Consumo**: El `SectionRenderer` recibe un `sectionName` como prop (proveniente del `layout` de un `theme.json`). Utiliza este nombre para buscar la entrada correspondiente en `sectionsConfig`.
4.  **Renderizado Dinámico**: Una vez encontrada la entrada, el `SectionRenderer` sabe qué componente importar y renderizar, y qué `dictionaryKey` usar para extraer el contenido correcto del diccionario global y pasárselo como `props`.

Esta arquitectura es una implementación del **Principio Abierto/Cerrado**: para añadir una nueva sección a la aplicación, solo necesitamos **añadir** una nueva entrada a `sectionsConfig` y su correspondiente schema a `i18n.schema.ts`. No es necesario **modificar** la lógica del `SectionRenderer`.

## 3. Contrato de API (Exportaciones)

-   `sectionNames`: (Array de strings) Una lista inmutable de todos los nombres de sección válidos.
-   `SectionName`: (Tipo) Un tipo unión de TypeScript generado a partir de `sectionNames`.
-   `sectionsConfig`: (Objeto) El registro principal que mapea `SectionName` a `SectionConfigEntry`.

## 4. Zona de Melhorias Futuras

- **Carga Dinámica de Componentes**: Actualmente, todos los componentes de sección se importan estáticamente. Para una optimización de bundle más agresiva, se podría refactorizar para que `component` sea una función de importación dinámica (ej. `() => import('@/components/sections/Hero')`). El `SectionRenderer` usaría `next/dynamic` para cargarlos.
- **Validación de Cobertura**: Un script de CI podría verificar que cada componente en `src/components/sections` tiene una entrada correspondiente en `sectionsConfig`, previniendo omisiones.
- **Metadata Adicional**: El `SectionConfigEntry` podría extenderse para incluir metadatos adicionales, como `tags` de categoría o un booleano `isCampaignOnly`, para un control más granular en el Developer Command Center.
// .docs-espejo/lib/config/sections.config.ts.md