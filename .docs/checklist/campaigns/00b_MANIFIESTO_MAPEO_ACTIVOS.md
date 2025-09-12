// .docs/checklist/campaigns/00b_MANIFIESTO_MAPEO_ACTIVOS.md
/**
 * @file 00b_MANIFIESTO_MAPEO_ACTIVOS.md
 * @description Fase 0, Paso 0.C. Introduce el concepto del Manifiesto de Mapeo
 *              de Activos de Campaña (MMAC) como la SSoT para la resolución de
 *              rutas de archivos de configuración y contenido.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto de Mapeo de Activos de Campaña (MMAC)

## 1. Problema Arquitectónico

A medida que las campañas evolucionan y se crean múltiples variantes (sub-campañas), la lógica para cargar los archivos de configuración (`theme`) y contenido (`i18n`) correctos se vuelve compleja. Acoplar el código de la aplicación (el "motor de renderizado") directamente a un sistema de nomenclatura de archivos estructurado (SNEAC) es frágil y viola el principio de separación de intereses.

## 2. La Solución: Una Capa de Abstracción

La solución es un **Manifiesto de Mapeo de Activos de Campaña (MMAC)**.

*   **Definición:** Un archivo JSON (`campaign.map.json`) ubicado en la raíz del directorio de cada campaña (ej. `src/content/campaigns/12157/`).
*   **Función:** Actúa como un índice o "tabla de punteros". El código de la aplicación **solo consulta este archivo** para determinar la ruta relativa del archivo de tema y los archivos de contenido que debe cargar para una variante específica.

## 3. Estructura del `campaign.map.json`

El archivo tendrá una estructura clara que mapea cada `ID_VARIANTE` a sus activos correspondientes.

```json
{
  "productId": "12157",
  "campaignName": "Curcumin Spirulina Saffron",
  "variants": {
    "01": {
      "name": "Scientific",
      "theme": "./12157_20250910_TM_01_scientific.json",
      "content": {
        "hero": "./components/12157_20250910_CI_01_hero.i18n.json",
        "benefitsSection": "./components/12157_20250910_CI_01_benefits.i18n.json"
      }
    },
    "02": {
      "name": "Vitality",
      "theme": "./12157_20250910_TM_02_vitality.json",
      "content": {
        "hero": "./components/12157_20250910_CI_02_hero.i18n.json"
      }
    }
  }
}
4. Flujo de Ejecución Actualizado
La página de campaña (page.tsx) recibe campaignId y un variantId (ej. '02') de la URL.
Invoca a getCampaignData(campaignId, variantId, locale).
getCampaignData carga src/content/campaigns/{campaignId}/campaign.map.json.
Busca la entrada para el variantId solicitado.
Usa las rutas del mapa (theme y content) para importar dinámicamente los archivos correctos.
Este sistema es la práctica estándar de la industria para gestionar configuraciones complejas de forma desacoplada y escalable.
// .docs/checklist/campaigns/00b_MANIFIESTO_MAPEO_ACTIVOS.md