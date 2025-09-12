// .docs/components/reactbits/LightRays.md
/\*\*

- @file LightRays.md
- @description Manifiesto de Conocimiento para el componente LightRays de ReactBits.
- @version 1.0.0
- @author RaZ podesta - MetaShark Tech
  \*/

# Manifiesto de Conocimiento: LightRays (ReactBits)

## 1. Descripción y Propósito

**LightRays** es un componente de efecto visual avanzado de ReactBits que utiliza WebGL para renderizar un fondo dinámico de rayos de luz volumétricos. Está diseñado para crear ambientes inmersivos y atmósferas de alta tecnología, ideales para secciones "hero" o fondos de página.

Su propósito estratégico en `curcumin-simplex` es servir como el fondo dinámico para la página de la tienda (`/store`), proporcionando un atractivo visual premium que captura la atención del usuario y refuerza la identidad de marca innovadora de Global Fitwell.

## 2. Configuración y Dependencias

- **Librería Principal:** `ogl`
  - **Rol:** Una micro-librería de WebGL que proporciona las abstracciones necesarias (Renderer, Program, Mesh) para dibujar en un canvas con WebGL sin la complejidad del API nativo.

## 3. Proceso de Naturalización

La integración de este componente es un caso de estudio para el **Protocolo de Naturalización**:

1.  **Atomización Lógica:** La lógica de WebGL, shaders, y gestión de eventos será abstraída en un hook `useLightRays`. El componente `LightRays` se convertirá en un contenedor de presentación puro.
2.  **Sistema de Theming:** La configuración de color (`raysColor`) se integrará con nuestro sistema de diseño semántico. En lugar de un valor hex, aceptará claves de tema (`primary`, `accent`).
3.  **Configuración por Contrato (Zod):** Todas las numerosas props de personalización serán agrupadas en un único objeto `config`, cuya estructura será validada por un schema de Zod. Este schema servirá como la SSoT para la API del componente.
4.  **Observabilidad:** Se integrará `clientLogger` en el hook `useLightRays` para monitorear el ciclo de vida de WebGL (inicialización, renderizado, limpieza), lo cual es crucial para detectar leaks de memoria o errores de renderizado.

## 4. Estructura de Datos (Post-Naturalización)

- **Entrada:** Un único objeto `config` opcional, validado por `LightRaysConfigSchema`.
- **Salida:** Un elemento `<div>` listo para que el hook `useLightRays` inyecte el canvas de WebGL.
  // .docs/components/reactbits/LightRays.md
