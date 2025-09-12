// /.docs/knowledge-base/react-fast-marquee-api.md
/**
 * @file /.docs/knowledge-base/react-fast-marquee-api.md
 * @description Manifiesto de Conocimiento y SSoT para la librería react-fast-marquee.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 */

# Manifiesto de Conocimiento: `react-fast-marquee`

## 1. Metadatos de la Librería

-   **Nombre:** `react-fast-marquee`
-   **Versión Analizada:** `1.6.5` (según `package.json` del snapshot)
-   **Fecha de Análisis:** 2025-09-09

## 2. Diagnóstico de Integración

El análisis del snapshot revela dos puntos críticos para la integración en `curcumin-simplex`:

1.  **Uso Exclusivo en Cliente:** El fichero de entrada de la librería (`dist/index.js`) contiene la directiva `"use client"`. **Esto es mandatorio.** Cualquier componente que utilice `Marquee` debe ser un Componente Cliente de React.

2.  **Compatibilidad de Versión (Riesgo Potencial):** El `package.json` de la librería define `peerDependencies` como `react: ">= 16.8.0 || ^18.0.0"`. Nuestro proyecto utiliza `react: "19.0.0-rc..."`. Aunque React 19 se esfuerza por la retrocompatibilidad, esta discrepancia podría generar advertencias o comportamientos inesperados. Se requiere monitoreo durante la implementación.

## 3. Contrato de API Pública (Props Principales)

El punto de entrada principal es el componente `Marquee`. Sus `props` más relevantes para el proyecto `curcumin-simplex`, según el fichero `dist/components/Marquee.d.ts`, son:

| Prop           | Tipo      | Por Defecto | Descripción Estratégica                                                                    |
| :------------- | :-------- | :---------- | :----------------------------------------------------------------------------------------- |
| `play`         | `boolean` | `true`      | Controla si la animación está activa.                                                      |
| `pauseOnHover` | `boolean` | `false`     | **Recomendado activar (`true`)** para mejorar la UX, permitiendo al usuario pausar para leer. |
| `speed`        | `number`  | `50`        | Velocidad en píxeles por segundo. Permite ajustar el ritmo a la identidad de la marca.     |
| `direction`    | `string`  | `"left"`    | Dirección del desplazamiento (`"left"` o `"right"`).                                       |
| `gradient`     | `boolean` | `false`     | **Recomendado activar (`true`)** para un efecto de desvanecimiento suave en los bordes.      |
| `autoFill`     | `boolean` | `false`     | **Recomendado activar (`true`)** para rellenar el espacio si el contenido es más corto que el contenedor. |

## 4. Ejemplo de Uso Correcto (Alineado con `curcumin-simplex`)

El siguiente es un ejemplo canónico de cómo implementar `Marquee` dentro de nuestra arquitectura.