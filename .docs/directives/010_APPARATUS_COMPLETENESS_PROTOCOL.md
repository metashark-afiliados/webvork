// .docs/directives/010_APPARATUS_COMPLETENESS_PROTOCOL.md
/**
 * @file 010_APPARATUS_COMPLETENESS_PROTOCOL.md
 * @description Directiva de Desarrollo No Negociable 010.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
# Directiva 010: Protocolo de Completitud de Aparatos y Configuración Explícita

## 1. Principio Fundamental

Un aparato no está completo hasta que su método de ejecución, configuración e integración en el ecosistema del proyecto están explícita y completamente documentados. La entrega de código sin una guía de implementación clara es una entrega incompleta y crea ambigüedad, lo cual es inaceptable.

## 2. Reglas Mandatorias

Para cada entrega de un aparato nuevo o refactorizado que introduce o modifica una funcionalidad, se debe incluir una sección denominada **"Protocolo de Implementación y Uso"**. Esta sección debe contener:

1.  **Configuración de Prerrequisitos:** Si el aparato requiere nuevas dependencias o scripts en `package.json`, se debe proporcionar el comando de instalación (`pnpm add ...`) y/o el bloque de código JSON con la modificación exacta del `package.json`.

2.  **Comando de Ejecución (Para Scripts):** Si el aparato es un script, se debe proporcionar el comando exacto para ejecutarlo desde la raíz del proyecto, encapsulado en un bloque de código `cmd` para Windows 10.

3.  **Resultado Esperado:** Se debe describir de forma clara y concisa el resultado observable que se espera después de ejecutar el comando. Esto incluye qué archivos se crearán o modificarán, y cuál será la salida en la consola.

4.  **Integración en el Ecosistema:** Si el aparato es un componente o un hook, se debe explicar brevemente cómo los demás aparatos del sistema (ej. ensambladores de schemas, páginas, layouts) deben ser modificados para consumirlo.

## 3. Justificación

Esta directiva erradica la ambigüedad del proceso de desarrollo. Transforma cada entrega en una unidad de trabajo autocontenida, accionable y verificable, garantizando que el arquitecto tenga toda la información necesaria para integrar y validar la funcionalidad sin necesidad de hacer suposiciones. Cumple con el principio de **Confianza Absoluta**.
// .docs/directives/010_APPARATUS_COMPLETENESS_PROTOCOL.md