/\*\*

- @file app/globals.css
- @description SSoT Holística para el Sistema de Diseño.
- @version 8.0.0 (Full DCC Theming Support)
- @author RaZ Podestá - MetaShark Tech
  \*/

/\* ==========================================================================

1.  Importación del Motor y Directivas Globales
    ========================================================================== \*/
    @import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark \*));

/_ ========================================================================== 2. @theme: La SSoT de los Tokens de Diseño
========================================================================== _/
@theme {
--color-border: hsl(var(--border));
--color-input: hsl(var(--input));
--color-ring: hsl(var(--ring));
--color-background: hsl(var(--background));
--color-foreground: hsl(var(--foreground));
--color-primary: hsl(var(--primary));
--color-primary-foreground: hsl(var(--primary-foreground));
--color-secondary: hsl(var(--secondary));
--color-secondary-foreground: hsl(var(--secondary-foreground));
--color-destructive: hsl(var(--destructive));
--color-destructive-foreground: hsl(var(--destructive-foreground));
--color-muted: hsl(var(--muted));
--color-muted-foreground: hsl(var(--muted-foreground));
--color-accent: hsl(var(--accent));
--color-accent-foreground: hsl(var(--accent-foreground));
--color-popover: hsl(var(--popover));
--color-popover-foreground: hsl(var(--popover-foreground));
--color-card: hsl(var(--card));
--color-card-foreground: hsl(var(--card-foreground));
--radius-xl: calc(var(--radius) + 4px);
--radius-lg: var(--radius);
--radius-md: calc(var(--radius) - 2px);
--radius-sm: calc(var(--radius) - 4px);
--animate-accordion-down: accordion-down 0.2s ease-out;
--animate-accordion-up: accordion-up 0.2s ease-out;
--animate-collapsible-down: collapsible-down 0.2s ease-in-out;
--animate-collapsible-up: collapsible-up 0.2s ease-in-out;
--shadow-subtle: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-strong:
0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

/_ --- [INICIO DE AÑADIDO: Variables CSS para fuentes globales] --- _/
--font-sans: var(--font-inter);
--font-serif: var(--font-poppins);
--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;

/_ Variables para tamaños de fuente _/
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: 1.5rem;

/_ Variables para pesos de fuente _/
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

/_ Variables para alturas de línea _/
--leading-none: 1;
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;

/_ Variables para espaciado de letras _/
--tracking-tighter: -0.05em;
--tracking-tight: -0.025em;
--tracking-normal: 0em;
--tracking-wide: 0.025em;

/_ Variables para geometría _/
--border-width: 1px; /_ Grosor de borde por defecto _/
--space: 0.25rem; /_ Unidad de espaciado base _/
--input-height: 2.5rem; /_ Altura de inputs por defecto _/
/_ --- [FIN DE AÑADIDO] --- _/
}

/_ ========================================================================== 3. Definición de Keyframes
========================================================================== _/
@keyframes accordion-down {
from {
height: 0;
}
to {
height: var(--radix-accordion-content-height);
}
}
@keyframes accordion-up {
from {
height: var(--radix-accordion-content-height);
}
to {
height: 0;
}
}
@keyframes collapsible-down {
from {
height: 0;
}
to {
height: var(--radix-collapsible-content-height);
}
}
@keyframes collapsible-up {
from {
height: 0;
}
to {
height: 0;
}
}

/_ ========================================================================== 4. @layer base: Estilos Globales, Resets y Valores por Defecto
========================================================================== _/
@layer base {
:root {
--background: 0 0% 100%;
--foreground: 20 14.3% 4.1%;
--card: 0 0% 100%;
--card-foreground: 20 14.3% 4.1%;
--popover: 0 0% 100%;
--popover-foreground: 20 14.3% 4.1%;
--primary: 24.6 95% 53.1%;
--primary-foreground: 60 9.1% 97.8%;
--secondary: 60 4.8% 95.9%;
--secondary-foreground: 24 9.8% 10%;
--muted: 60 4.8% 95.9%;
--muted-foreground: 25 5.3% 44.7%;
--accent: 60 4.8% 95.9%;
--accent-foreground: 24 9.8% 10%;
--destructive: 0 84.2% 60.2%;
--destructive-foreground: 60 9.1% 97.8%;
--border: 20 5.9% 90%;
--input: 20 5.9% 90%;
--ring: 24.6 95% 53.1%;
--radius: 0.5rem;

    /* Aplicar las variables CSS de las fuentes de Google Fonts, por defecto Inter */
    font-family: var(--font-sans);
    font-size: var(--text-base); /* Tamaño de fuente base */
    line-height: var(--leading-normal); /* Altura de línea normal */

}

.dark {
--background: 20 14.3% 4.1%;
--foreground: 60 9.1% 97.8%;
--card: 24 9.8% 8%;
--card-foreground: 0 0% 95%;
--popover: 20 14.3% 4.1%;
--popover-foreground: 60 9.1% 97.8%;
--primary: 20.5 90.2% 48.2%;
--primary-foreground: 60 9.1% 97.8%;
--secondary: 12 6.5% 15.1%;
--secondary-foreground: 60 9.1% 97.8%;
--muted: 12 6.5% 15.1%;
--muted-foreground: 24 5.4% 63.9%;
--accent: 12 6.5% 15.1%;
--accent-foreground: 60 9.1% 97.8%;
--destructive: 0 72.2% 50.6%;
--destructive-foreground: 60 9.1% 97.8%;
--border: 12 6.5% 15.1%;
--input: 12 6.5% 15.1%;
--ring: 20.5 90.2% 48.2%;
}

- {
  border-color: hsl(var(--border));
  }

body {
background-color: hsl(var(--background));
color: hsl(var(--foreground));
font-family: var(--font-sans); /_ Asegura que se hereda _/
font-size: var(--text-base);
line-height: var(--leading-normal);
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
}

h1,
h2,
h3,
h4,
h5,
h6 {
text-wrap: balance;
font-family: var(--font-serif, var(--font-sans)); /_ Fallback a sans si no hay serif _/
font-weight: var(--font-weight-bold); /_ Títulos en negrita por defecto _/
letter-spacing: var(--tracking-tight); /_ Espaciado de letras ajustado para titulares _/
}

h1 {
font-size: var(--text-4xl);
line-height: var(--leading-tight);
}
h2 {
font-size: var(--text-2xl);
line-height: var(--leading-snug);
}
h3 {
font-size: var(--text-xl);
line-height: var(--leading-snug);
}
/_ Otros elementos para aplicar las nuevas variables _/
input, select, textarea, button {
height: var(--input-height);
border-width: var(--border-width);
}
div {
gap: var(--space); /_ Aplicar la unidad de espaciado base a los gaps _/
}
/_ Las utilidades de Tailwind como `p-4` usarán `var(--space)` implícitamente
si se configuran en `tailwind.config.ts` o se sobrescriben directamente.
Aquí solo afectamos las propiedades CSS directas. _/
}
