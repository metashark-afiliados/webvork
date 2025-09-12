// /.docs/directives/004_REQUIREMENTS_PRECHECK_PROTOCOL.md
/**
 * @file .docs/directives/004_REQUIREMENTS_PRECHECK_PROTOCOL.md
 * @description Directiva de Desarrollo No Negociable 004. Establece el protocolo
 *              para la verificación de dependencias antes de la implementación.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 * @priority 3/5
 */
# Directiva 004: Protocolo de Pre-chequeo de Requisitos

## 1. Principio Fundamental

El desarrollo no puede proceder sobre una base inestable. Antes de implementar cualquier funcionalidad que dependa de una librería o herramienta externa, es mandatorio verificar que dicha dependencia está correctamente instalada y que nuestro conocimiento sobre ella está actualizado. Esto previene errores de build, fallos en tiempo de ejecución y el uso de APIs obsoletas.

## 2. Reglas Mandatorias

Antes de entregar el código de un aparato que introduce o utiliza una dependencia externa, se debe seguir el siguiente workflow de pre-chequeo:

1.  **Verificación de Instalación:**
    *   Consultar el `package.json` de la última SSoT (snapshot o refactorización previa) para verificar si la dependencia necesaria está listada en `dependencies` o `devDependencies`.
    *   **Si la dependencia no está instalada:** La primera acción debe ser entregar el comando `pnpm` necesario (en un bloque de código CMD para Windows 10) para instalarla. La implementación del código que la utiliza solo procederá después de la instalación.

2.  **Verificación de Conocimiento:**
    *   Consultar el "Banco de Conocimiento" interno (`/.docs/knowledge-base/`) para verificar si existe un manifiesto para la librería en cuestión.
    *   **Si el manifiesto existe:** Comparar la versión analizada en el manifiesto con la versión instalada en `package.json`. Si coinciden, proceder. Si la versión instalada es más reciente, solicitar un nuevo snapshot de la librería para actualizar la base de conocimiento antes de continuar.
    *   **Si el manifiesto no existe:** Tratarlo como una dependencia nueva. Si es relevante, solicitar un snapshot de la librería para crear su manifiesto de conocimiento, conforme a la Directiva 009.

## 3. Justificación

Esta directiva asegura que el entorno de desarrollo sea siempre consistente y esté preparado para la siguiente tarea. Cumple con los principios de **Análisis Profundo y Persistente** y **Confianza Absoluta**, garantizando que cada pieza de código se construye sobre cimientos sólidos y bien comprendidos.