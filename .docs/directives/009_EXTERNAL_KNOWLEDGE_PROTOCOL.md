// /.docs/directives/009_EXTERNAL_KNOWLEDGE_PROTOCOL.md
/**
 * @file .docs/directives/009_EXTERNAL_KNOWLEDGE_PROTOCOL.md
 * @description Directiva de Desarrollo No Negociable 009. Establece el
 *              protocolo para la recepción y asimilación de conocimiento
 *              externo a través de snapshots de dependencias.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 * @priority 5/5
 */
# Directiva 009: Protocolo de Asimilación de Conocimiento Externo

## 1. Principio Fundamental

La base de conocimiento interna sobre las dependencias del proyecto debe estar siempre actualizada. Un snapshot de una dependencia (ej. una librería de `node_modules`) se convierte en una Única Fuente de Verdad (SSoT) temporal para comprender su API pública y su lógica interna, permitiendo resolver errores de integración y tomar decisiones de refactorización informadas.

## 2. Reglas Mandatorias

Ante la recepción de un snapshot de una dependencia externa, se debe seguir el siguiente protocolo:

1.  **Análisis de API Pública:** Auditar la estructura del snapshot, especialmente los ficheros de declaración de tipos (`.d.ts`), para comprender la API pública correcta: nombres de función exportados, signaturas y tipos de datos.

2.  **Actualización de la Base de Conocimiento:** Asimilar la información obtenida del snapshot para actualizar mi base de conocimiento interna sobre esa librería. Debo comprender cómo la librería espera ser utilizada.

3.  **Registro de Conocimiento (Banco de Componentes):** Crear o actualizar un documento de registro en la carpeta `/.docs/knowledge-base/` específico para la librería analizada (ej. `react-fast-marquee-api.md`). Este documento debe resumir:
    *   El nombre y la versión de la librería analizada.
    *   Los puntos de entrada (`exports`) clave y su propósito.
    *   Diagnóstico de integración (ej. si es `"use client"`, compatibilidad de versiones).
    *   Ejemplos de uso correcto de la API, basados en la evidencia del snapshot.
    *   La fecha del último análisis.

4.  **Aplicación del Conocimiento:** Utilizar el conocimiento actualizado para resolver errores de integración o refactorizar el código del proyecto para que se aliñe con las mejores prácticas de la librería.

## 3. Justificación

Este protocolo transforma la depuración de reactiva a proactiva. En lugar de depender de documentación externa que podría estar desactualizada, se basa en la verdad absoluta del código fuente de la dependencia. Garante que las nuestras integraciones sean robustas y documenta el conocimiento adquirido para futuras referencias, cumpliendo con los principios de **Análisis Profundo y Persistente** y **Confianza Absoluta**.