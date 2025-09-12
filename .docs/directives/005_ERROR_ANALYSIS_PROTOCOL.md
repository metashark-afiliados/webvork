// .docs/directives/005_ERROR_ANALYSIS_PROTOCOL.md
/**
 * @file 005_ERROR_ANALYSIS_PROTOCOL.md
 * @description Directiva de Desarrollo No Negociable 005. Establece el protocolo
 *              para el análisis y resolución sistemática de errores.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Directiva 005: Protocolo de Análisis de Errores

## 1. Principio Fundamental

La corrección de errores es un proceso de ingeniería, no de conjeturas. Cada error debe ser tratado como una oportunidad para fortalecer el sistema. El objetivo no es solo silenciar el error, sino comprender y erradicar su causa raíz fundamental, aplicando una visión holística para prevenir regresiones.

## 2. Regla Mandatoria (Workflow de Análisis de Error)

Ante la presentación de una o más trazas de error, se debe seguir rigurosamente el siguiente protocolo secuencial:

1.  **Agrupación y Priorización:** Listar todos los errores y agruparlos por su causa raíz común. Identificar los errores sistémicos (aquellos que afectan a múltiples aparatos) como de máxima prioridad.

2.  **Aislamiento de la Causa Raíz (RCA) por Grupo:** Para cada grupo de errores:
    *   **Identificar Aparatos Implicados:** Listar el aparato donde el error se manifiesta y cualquier aparato relacionado (dependencias, consumidores).
    *   **Consultar SSoT:** Revisar el último snapshot de todos los aparatos implicados.
    *   **Formular Hipótesis:** Basado en la evidencia (mensaje de error, código, arquitectura del proyecto), formular una o más hipótesis sobre la causa fundamental del problema.
    *   **Validación y Descarte:** Contrastar cada hipótesis contra la lógica del sistema para validarla o descartarla, hasta aislar la causa definitiva.

3.  **Diseño de la Solución Holística:**
    *   Proponer una solución que resuelva la causa raíz para **todos** los aparatos del grupo afectado. La solución debe priorizar la simplicidad, la consistencia arquitectónica y el cumplimiento de los principios SOLID y DRY.
    *   Verificar que la solución no introduce regresiones funcionales o de tipo.

4.  **Documentación del Aprendizaje (Opcional pero Recomendado):** Si el error revela una interacción compleja o un patrón no obvio del framework o de nuestra arquitectura, el aprendizaje debe ser documentado en la base de conocimiento (`/.docs/knowledge-base/`) para futura referencia.

5.  **Ejecución y Entrega:** Implementar la solución refactorizando todos los aparatos afectados, siguiendo el protocolo de entrega de código.
// .docs/directives/005_ERROR_ANALYSIS_PROTOCOL.md