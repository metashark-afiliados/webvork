// .docs/development/05_CLIENT_SIDE_OBSERVABILITY_MANIFESTO.md
/**
 * @file 05_CLIENT_SIDE_OBSERVABILITY_MANIFESTO.md
 * @description Manifiesto y guía de uso para el aparato de logging del cliente.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto de Observabilidad del Cliente

## 1. Filosofía y Propósito

Este manifiesto describe el uso del aparato `lib/logging.ts`, nuestra Única Fuente de Verdad (SSoT) para la observabilidad del lado del cliente. Su propósito es proporcionar una herramienta de diagnóstico de élite durante el desarrollo, sin impactar el rendimiento en producción.

El `clientLogger` es un requisito para cumplir con el criterio de **Observabilidad** de la `Directiva 003: Manifiesto de Calidad de Componentes`.

## 2. API y Casos de Uso

El logger exporta un único objeto `clientLogger` con los siguientes métodos principales:

*   **`clientLogger.startGroup(label, [style])` y `.endGroup()`:**
    *   **Uso:** Para agrupar una serie de logs relacionados bajo un título colapsable. Ideal para el ciclo de vida de un componente (`useEffect`) o de un hook.
    *   **Ejemplo:** `clientLogger.startGroup("Renderizando HeroSection");`

*   **`clientLogger.info(message, [context])`:**
    *   **Uso:** Para registrar eventos informativos de bajo nivel.
    *   **Ejemplo:** `clientLogger.info("Datos de la API recibidos", { data });`

*   **`clientLogger.success(message, [context])`:**
    *   **Uso:** Para indicar que una operación importante ha finalizado con éxito.
    *   **Ejemplo:** `clientLogger.success("Formulario enviado correctamente");`

*   **`clientLogger.warn(message, [context])`:**
    *   **Uso:** Para advertir sobre condiciones no críticas pero inesperadas.
    *   **Ejemplo:** `clientLogger.warn("Prop 'imageUrl' no encontrada, usando fallback");`

*   **`clientLogger.error(message, [context])`:**
    *   **Uso:** Para registrar errores capturados en bloques `try/catch`.
    *   **Ejemplo:** `clientLogger.error("Falló la obtención de datos", { error });`

*   **`clientLogger.time(label)` y `.timeEnd(label)`:**
    *   **Uso:** Para medir el tiempo de ejecución de operaciones específicas.
    *   **Ejemplo:** `clientLogger.time("procesamiento-de-datos"); ... clientLogger.timeEnd("procesamiento-de-datos");`

*   **`clientLogger.startTrace(name)`, `.traceEvent(id, ...)` y `.endTrace(id)`:**
    *   **Uso:** Para seguir un flujo de ejecución complejo a través de múltiples funciones o componentes.
    *   **Ejemplo:** `const traceId = clientLogger.startTrace("carga-de-campaña");`

## 3. Comportamiento en Entornos

*   **Desarrollo:** Todos los métodos funcionan y producen una salida detallada y coloreada en la consola del navegador.
*   **Producción:** Todos los métodos son "no-ops" (funciones vacías) excepto `clientLogger.error`, que se mantiene para la captura de errores en producción.
// .docs/development/05_CLIENT_SIDE_OBSERVABILITY_MANIFESTO.md