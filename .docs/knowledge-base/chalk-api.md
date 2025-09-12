// .docs/knowledge-base/chalk-api.md
/**
 * @file chalk-api.md
 * @description Manifiesto de Conocimiento y SSoT para la librería chalk.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto de Conocimiento: `chalk`

## 1. Metadatos de la Librería

-   **Nombre:** `chalk`
-   **Versión Analizada y Utilizada:** `4.1.2`
-   **Fecha de Análisis:** 2025-09-11

## 2. Diagnóstico de Integración y API Pública

-   **Compatibilidad de Módulos:** La versión `4.1.2` ha sido seleccionada explícitamente por su robusto soporte dual para módulos CommonJS (`require`) y ES Modules (`import`). Esto garantiza la máxima compatibilidad con el ecosistema de herramientas de Node.js utilizado en este proyecto (TypeScript, tsx, etc.).

-   **API de Uso:** `chalk` se utiliza para colorear la salida de la consola en los scripts de desarrollo, mejorando significativamente la legibilidad de los logs. La sintaxis de importación recomendada y utilizada es:
    ```typescript
    import chalk from "chalk";
    ```
-   **Ejemplo Canónico:**
    ```typescript
    console.log(chalk.green("Operación exitosa."));
    console.log(chalk.red.bold("Error crítico detectado."));
    ```

## 3. Estrategia de Uso en `curcumin-simplex`

`chalk` es una dependencia exclusiva de desarrollo (`devDependency`). Su uso está confinado a los scripts ubicados en el directorio `scripts/`. Su propósito es mejorar la Experiencia del Desarrollador (DX) al proporcionar feedback visual claro durante la ejecución de tareas de build, generación de código o diagnóstico.
// .docs/knowledge-base/chalk-api.md