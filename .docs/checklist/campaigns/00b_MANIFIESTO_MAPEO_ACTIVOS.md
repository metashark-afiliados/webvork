// .docs/checklist/campaigns/00b_MANIFIESTO_MAPEO_ACTIVOS.md
/**
 * @file 00b_MANIFIESTO_MAPEO_ACTIVOS.md
 * @description Manifiesto de Mapeo de Activos de Campaña (MMAC) v2.0.
 *              Define la estructura del `campaign.map.json` como la SSoT para
 *              la resolución de rutas de activos y la generación de URLs semánticas.
 * @version 2.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto de Mapeo de Activos de Campaña (MMAC) v2.0

## 1. Problema Arquitectónico y Solución

El acoplamiento del código de la aplicación a una estructura de archivos fija es frágil. La gestión de variantes de campaña y la optimización de URLs para SEO requieren una capa de abstracción.

**La Solución:** Un **Manifiesto de Mapeo de Activos de Campaña (MMAC)**. Este archivo `campaign.map.json`, ubicado en la raíz del directorio de cada campaña (ej. `content/campaigns/12157/`), actúa como un "panel de control" para cada campaña. El código de la aplicación **solo consulta este archivo** para saber qué activos cargar y cómo construir la URL.

## 2. Estructura del `campaign.map.json` (SSoT Mandatoria)

Esta es la estructura que **DEBE** seguir todo manifiesto de mapeo.

```json
{
  "productId": "12157",
  "campaignName": "Curcumin Spirulina Saffron",
  "description": "Manifiesto de Mapeo para la campaña de Curcumina.",
  "variants": {
    "01": {
      "name": "Scientific",
      "variantSlug": "scientific",
      "seoKeywordSlug": "benessere-evidenza-scientifica",
      "description": "Ángulo de marketing enfocado en la ciencia y la credibilidad.",
      "theme": "./themes/12157_THEME_01_scientific.json",
      "content": "./content/12157_CONTENT_01_scientific.json"
    },
    "02": {
      "name": "Vitality",
      "variantSlug": "vitality",
      "seoKeywordSlug": "energia-e-benessere-naturale",
      "description": "Ángulo de marketing enfocado en la emoción y la aspiración.",
      "theme": "./themes/12157_THEME_02_vitality.json",
      "content": "./content/12157_CONTENT_02_vitality.json"
    }
  }
}
2.1. Desglose de Campos y Ubicación de Palabras Clave
productId: (string) El ID numérico inmutable de la campaña.
campaignName: (string) El nombre legible de la campaña.
variants: (object) Un objeto donde cada clave es un variantId numérico (ej. "01", "02").
name: (string) El nombre legible de la variante (ej. "Scientific").
variantSlug: (string) El slug que identificará a la variante en la URL. Debe ser corto, en inglés y en kebab-case.
seoKeywordSlug (Requisito Mandatorio): (string) Aquí es donde se colocan las palabras clave para SEO.
Regla: Deben ser de 2 a 5 palabras clave que resuman el ángulo de la campaña.
Formato: kebab-case (minúsculas y separadas por guiones).
Ejemplo: curcuma-piperina-zafferano.
theme: (string) La ruta relativa al archivo de tema (THEME) de la variante.
content: (string) La ruta relativa al archivo de contenido (CONTENT) soberano de la variante.
3. Flujo de Ejecución de Rutas
URL Solicitada: Un usuario accede a .../c/12157/scientific/benessere-evidenza-scientifica.
Next.js: La página en app/[locale]/c/[campaignId]/[variantSlug]/[seoKeywordSlug]/page.tsx se activa.
Obtención de Datos: El componente de página recibe campaignId: "12157" y variantSlug: "scientific" desde los parámetros de la ruta.
Resolución: La lógica de obtención de datos:
a. Carga el archivo content/campaigns/12157/campaign.map.json.
b. Itera sobre las variantes hasta encontrar la que tiene variantSlug === "scientific".
c. Obtiene la variantId ("01") y las rutas a los archivos de tema y contenido.
d. Procede a cargar los activos ..._THEME_01_scientific.json y ..._CONTENT_01_scientific.json.
Este sistema desacopla completamente la lógica de negocio de la presentación, cumpliendo con los requisitos de SEO y proporcionando una SSoT clara para la configuración de cada campaña.