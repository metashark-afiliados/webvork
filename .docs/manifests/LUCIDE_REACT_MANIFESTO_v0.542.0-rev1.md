# Manifiesto de Lucide React v0.542.0 (Revisión 1)

## Protocolo de Interfaz de Props

1.  **Fuente de Verdad:** El tipo `LucideProps` exportado desde `lucide-react` es la única fuente de verdad.
2.  **Contrato de Props:** `LucideProps` extiende `React.SVGProps<SVGSVGElement>`, por lo tanto, **acepta todos los atributos estándar de un SVG, incluyendo `className`, `style`, `onClick`, etc.**
3.  **Conflictos con `next/dynamic`:** La importación dinámica de iconos (`next/dynamic`) puede causar una pérdida en la inferencia de tipos, llevando al error `TS2769`. TypeScript puede fallar en reconocer que el componente cargado dinámicamente acepta `className` y otras `SVGProps`.
4.  **Solución Definitiva:** Para resolver esto, se debe asegurar que el objeto de `props` que se pasa al componente dinámico (`<LucideIcon {...} />`) sea del tipo `LucideProps`. El componente `DynamicIcon` debe ser tipado explícitamente para aceptar `LucideProps`, garantizando que todas las propiedades, incluido `className`, se pasen correctamente a través del `spread operator` (`{...props}`).
Fase 3: Solución de Ingeniería Definitiva
Basado en este nuevo entendimiento, he refactorizado DynamicIcon.tsx para que sea robusto, completamente tipado y a prueba de errores de inferencia. Esta solución no es un parche; corrige la arquitectura del componente.