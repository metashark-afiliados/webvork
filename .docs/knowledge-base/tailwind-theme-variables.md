// .docs/knowledge-base/tailwind-theme-variables.md
/**
 * @file tailwind-theme-variables.md
 * @description Manifiesto de Conocimiento y SSoT para el sistema de Theming de Tailwind CSS v4.
 *              Destila la documentación oficial para su aplicación en la arquitectura de Curcumin Simplex.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech (Basado en documentación oficial de Tailwind Labs)
 */

# Manifiesto de Conocimiento: Variables de Tema en Tailwind CSS v4

## 1. Filosofía y Principio Fundamental: "CSS-First"

Tailwind CSS v4 revoluciona la gestión de los "design tokens" (colores, fuentes, espaciado, etc.) adoptando un enfoque **"CSS-first"**. La Única Fuente de Verdad (SSoT) para el sistema de diseño ya no es un objeto JavaScript en `tailwind.config.ts`, sino un conjunto de **variables de tema** definidas directamente en tus archivos CSS.

El principio es que los design tokens son la API para tu UI, y esta API ahora se declara en el mismo lenguaje que la estiliza: CSS.

## 2. El Aparato Central: La Directiva `@theme`

Las **variables de tema** son variables CSS especiales que se declaran dentro de un bloque `@theme { ... }`. Su función es dual:

1.  **Actúan como variables CSS normales:** Pueden ser referenciadas en cualquier parte de tu CSS con `var(--nombre-variable)`.
2.  **Instruyen a Tailwind para generar clases de utilidad:** Este es su poder principal. Una variable de tema como `--color-primary` genera automáticamente clases como `bg-primary`, `text-primary`, `border-primary`, etc.

**Ejemplo Canónico:**
```css
/* en src/app/globals.css */
@import "tailwindcss";

@theme {
  /* Esto crea clases como bg-accent, text-accent, etc. */
  --color-accent: hsl(22 96% 54%);
  
  /* Esto crea la variante responsiva lg: */
  --breakpoint-lg: 64rem;
  
  /* Esto crea la clase font-serif */
  --font-serif: "Poppins", sans-serif;
}
Diferencia Clave: @theme vs. :root
Usa @theme cuando quieres que una variable CSS se convierta en una clase de utilidad o una variante de Tailwind. Es para tus design tokens.
Usa :root para variables CSS estándar que no necesitas que tengan una clase de utilidad asociada.
3. Espacios de Nombres (Namespaces) y su Rol
Las variables de tema se organizan en "espacios de nombres" que le indican a Tailwind qué tipo de utilidades generar. El formato es --namespace-nombre.
Espacio de Nombres	Utilidades / Variantes Generadas	Ejemplo de Variable
--color-*	bg-*, text-*, border-*, fill-*, etc.	--color-primary: hsl(217 91% 60%)
--font-*	font-* (familias de fuentes)	--font-sans: "Inter", sans-serif
--text-*	text-* (tamaños de fuente)	--text-lg: 1.125rem
--spacing-*	p-*, m-*, w-*, h-*, gap-*, etc.	--spacing-4: 1rem
--radius-*	rounded-* (radio de borde)	--radius-lg: 0.5rem
--shadow-*	shadow-* (sombra de caja)	--shadow-md: 0 4px...
--breakpoint-*	sm:*, md:*, lg:* (variantes responsivas)	--breakpoint-md: 48rem
4. Estrategia de Personalización del Tema
Extender el Tema: Simplemente define nuevas variables de tema en tu bloque @theme después de @import "tailwindcss";. Tu nueva variable se añadirá al tema por defecto.
Sobrescribir el Tema: Redefine una variable de tema existente. Tu definición tendrá prioridad sobre la de Tailwind.
code
CSS
@theme {
  /* Sobrescribe el color primario por defecto */
  --color-primary: hsl(43 96% 54%); 
}
Deshabilitar un Namespace: Para eliminar por completo una sección del tema por defecto (ej. todos los colores "lime"), usa la sintaxis de asterisco:
code
CSS
@theme {
  /* Elimina todos los colores 'lime' por defecto */
  --color-lime-*: initial;
}
5. Aplicación en la Arquitectura curcumin-simplex
Tu proyecto utiliza esta nueva filosofía de Tailwind de una manera avanzada y dual:
Tema Global del Portal: El archivo src/app/globals.css define el @theme base para todo el portal. Sin embargo, no define valores de color hardcodeados. En su lugar, mapea nombres semánticos a variables HSL (--color-primary: hsl(var(--primary));). Los valores HSL reales son inyectados dinámicamente por src/app/[locale]/layout.tsx a través del generateThemeVariablesStyle, que lee la configuración desde src/config/branding.config.ts.
Tema Dinámico por Campaña: Esta es la implementación más potente. Para las páginas de campaña (/campaigns/[campaignId]), el componente CampaignThemeProvider recibe un objeto de tema (theme.json) y, usando la misma utilidad generate...Style, inyecta un bloque <style> con las variables de tema específicas para esa campaña.
Esta arquitectura te permite tener un sistema de diseño global y consistente para el portal, mientras que cada campaña puede tener una identidad visual (colores, fuentes) completamente única y soberana, todo ello siguiendo el moderno paradigma "CSS-first" de Tailwind 4.