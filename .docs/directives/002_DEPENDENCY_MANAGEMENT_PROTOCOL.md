// /.docs/directives/002_DEPENDENCY_MANAGEMENT_PROTOCOL.md
/**
 * @file .docs/directives/002_DEPENDENCY_MANAGEMENT_PROTOCOL.md
 * @description Directiva de Desarrollo No Negociable 002. Protocolo para la
 *              gestión segura y predecible del archivo package.json.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 * @priority 2/5
 */
# Directiva 002: Protocolo de Gestión de package.json

## 1. Principio Fundamental

La gestión del archivo `package.json` debe ser predecible, reproducible y auditable. Las modificaciones manuales de las listas de dependencias son una fuente principal de inconsistencias en el archivo de bloqueo (`pnpm-lock.yaml`), lo que compromete la estabilidad de los builds.

## 2. Reglas Mandatorias

### 2.1. Gestión de Dependencias (`dependencies` y `devDependencies`)

Toda adición, eliminación o actualización de dependencias **debe realizarse exclusivamente a través de comandos del gestor de paquetes `pnpm`** ejecutados en un entorno de línea de comandos CMD de Windows 10.

*   **Ejemplos de Comandos Válidos:**
    *   `pnpm add framer-motion`: Añade `framer-motion` a `dependencies`.
    *   `pnpm add -D prettier`: Añade `prettier` a `devDependencies`.
    *   `pnpm remove eslint`: Elimina `eslint`.

Está **estrictamente prohibido** editar manualmente las secciones `dependencies` y `devDependencies` del archivo `package.json`.

### 2.2. Gestión de Scripts y Metadatos

Las demás secciones del `package.json`, incluyendo `scripts` y los campos de metadatos (`name`, `description`, `version`, etc.), **sí pueden ser modificadas directamente**.

### 2.3. Protocolo de Entrega

Al entregar una versión actualizada del `package.json`, esta debe estar **completamente limpia, sin ningún tipo de comentario**.

## 3. Justificación

Esta directiva garantiza:
*   **Integridad del Lockfile:** `pnpm` gestionará de forma óptima el `pnpm-lock.yaml`, asegurando builds reproducibles y eliminando errores del tipo "funciona en mi máquina".
*   **Claridad del Cambio:** Al utilizar comandos, el historial de la terminal se convierte en un registro explícito de las operaciones de dependencias realizadas.