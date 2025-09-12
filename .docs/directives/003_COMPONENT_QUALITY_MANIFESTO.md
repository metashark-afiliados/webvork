// /.docs/directives/003_COMPONENT_QUALITY_MANIFESTO.md
/**
 * @file .docs/directives/003_COMPONENT_QUALITY_MANIFESTO.md
 * @description Directiva de Desarrollo No Negociable 003. Define los
 *              criterios de calidad que todo componente de UI debe cumplir.
 * @author IA Ingeniera de Software Senior v2.0
 * @version 1.0.0
 * @priority 5/5
 */
# Directiva 003: Manifiesto de Calidad de Componentes

## 1. Principio Fundamental

Un componente de UI no es solo un fragmento de código; es un activo reutilizable, resiliente y auto-documentado. Cada componente debe ser construido con la máxima calidad para garantizar la mantenibilidad, escalabilidad y una experiencia de desarrollo de élite.

## 2. Criterios de Calidad Mandatorios (El Checklist de Nivelación)

Todo componente de UI dentro del proyecto `curcumin-simplex` debe cumplir con los siguientes siete (7) criterios para ser considerado "nivelado" y "listo para producción":

1.  **Responsabilidad Única (PRU):** El componente debe tener una única y bien definida responsabilidad. Debe ser un **Componente de Presentación Puro** (Dumb Component), recibiendo todos los datos y callbacks a través de `props`. No debe contener lógica de negocio ni de obtención de datos.

2.  **Documentación Completa (TSDoc):** Debe tener un bloque TSDoc completo que describa su propósito (`@file`, `@description`) y el contrato de su API (`@param` para cada prop).

3.  **Manifestación Conceptual (Documento Espejo):** Debe existir un documento espejo en `/.docs-espejo/` que explique su rol estratégico, arquitectura y mejoras futuras.

4.  **Internacionalización (i18n-B):** **No debe contener ninguna cadena de texto hardcodeada** visible para el usuario. Todo el texto debe ser recibido a través de `props` desde un diccionario de i18n.

5.  **Estilo Semántico:** Debe utilizar exclusivamente las variables y tokens definidos en el sistema de diseño (`tailwind.config.ts`). El uso de valores de estilo arbitrarios (ej. `bg-[#123456]`) está prohibido.

6.  **Observabilidad:** Debe incluir un `console.log` a nivel de `[Observabilidad]` que anuncie su renderizado, facilitando la depuración del ciclo de vida.

7.  **Accesibilidad (A11y):** Debe utilizar HTML semántico (`<nav>`, `<button>`, etc.) y atributos ARIA (`aria-label`, `role`, etc.) cuando sea necesario para ser accesible a todos los usuarios.

## 3. Justificación

Este manifiesto transforma la calidad de un concepto subjetivo a un conjunto de métricas objetivas y verificables. Asegura que la base de código sea consistente, fácil de entender y robusta, reduciendo la deuda técnica y acelerando el desarrollo a largo plazo.