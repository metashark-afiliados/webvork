// .docs/directives/012_KNOWLEDGE_BASE_VALIDATION_PROTOCOL.md
/**
 * @file 012_KNOWLEDGE_BASE_VALIDATION_PROTOCOL.md
 * @description Directiva de Desarrollo No Negociable 012. Establece el protocolo
 *              para la validación y actualización del conocimiento sobre dependencias.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Directiva 012: Protocolo de Validación de Base de Conocimiento

## 1. Principio Fundamental: "Veritas in Code" (La Verdad está en el Código)

La única fuente de verdad (SSoT) sobre el comportamiento y la API de una dependencia externa no es nuestra documentación interna (`/.docs/knowledge-base/`), ni la documentación pública (que puede estar desactualizada), sino su **código fuente actual** en el directorio `node_modules` del proyecto.

Operar sobre conocimiento obsoleto es la causa raíz de errores de integración sutiles y de ciclos de depuración ineficientes. Por lo tanto, se establece una política de **"Confianza Cero"** hacia el conocimiento no verificado.

## 2. Regla Mandatoria (Workflow ante Errores de Dependencia)

Ante la aparición de cualquier error (de tipo, de ejecución, de build) que involucre a una librería de terceros (ej. `lucide-react`, `framer-motion`, `next`, etc.), se debe seguir el siguiente protocolo **antes de proponer una solución**:

1.  **Declaración de Conocimiento Obsoleto:** Identificar la librería implicada en el error. Declarar explícitamente que la base de conocimiento interna (`/.docs/knowledge-base/`) sobre dicha librería se considera potencialmente desactualizada y, por lo tanto, no confiable.

2.  **Solicitud de SSoT de Código (Snapshot de Dependencia):** Solicitar formalmente un snapshot del código fuente de la librería directamente desde el directorio `node_modules` del proyecto.
    *   **Comando Ejemplo:** `node snapshot.js --dir=node_modules/lucide-react`

3.  **Análisis de la Nueva SSoT:** Una vez recibido el snapshot de la dependencia, realizar un análisis profundo de sus archivos de declaración de tipos (`.d.ts`), su `package.json` y sus puntos de entrada (`exports`) para comprender su API y estructura actuales.

4.  **Actualización de la Base de Conocimiento Interna:** Actualizar o crear el manifiesto de conocimiento correspondiente en `/.docs/knowledge-base/` con los hallazgos del análisis. Este documento debe reflejar la nueva verdad.

5.  **Formulación de la Solución Basada en Evidencia:** Con el conocimiento actualizado y verificado, formular una hipótesis y proponer una solución al error original.

## 3. Justificación

Este protocolo erradica la depuración basada en suposiciones. Asegura que cada solución a un problema de integración se fundamenta en la realidad tangible del código que se está ejecutando. Transforma la gestión de dependencias de una práctica reactiva a un proceso de ingeniería disciplinado, mejorando la robustez de las soluciones y enriqueciendo de forma continua y fiable la base de conocimiento del proyecto.