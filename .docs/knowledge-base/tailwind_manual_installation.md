# Instalación de Tailwind CSS 4.0

Tailwind CSS funciona escaneando todos tus archivos HTML, componentes de JavaScript y cualquier otra plantilla en busca de nombres de clase, generando los estilos correspondientes y luego escribiéndolos en un archivo CSS estático.

Es rápido, flexible y confiable, con cero tiempo de ejecución.

## Instalación

La instalación de Tailwind CSS como un plugin de Vite es la forma más sencilla de integrarlo con frameworks como Laravel, SvelteKit, React Router, Nuxt y SolidJS.

### 01. Crear tu proyecto

Comienza creando un nuevo proyecto de Vite si aún no tienes uno configurado. El enfoque más común es usar [Create Vite](https://vitejs.dev/guide/#getting-started).

```bash
npm create vite@latest my-project
cd my-project
```

### 02. Instalar Tailwind CSS

Instala `tailwindcss` y `@tailwindcss/vite` a través de npm.

```bash
npm install tailwindcss @tailwindcss/vite
```

### 03. Configurar el plugin de Vite

Añade el plugin `@tailwindcss/vite` a tu configuración de Vite.

```javascript
// vite.config.ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

### 04. Importar Tailwind CSS

Añade un `@import` a tu archivo CSS que importe Tailwind CSS.

```css
/* input.css */
@import "tailwindcss";
```

### 05. Iniciar tu proceso de compilación

Ejecuta tu proceso de compilación con `npm run dev` o cualquier comando configurado en tu archivo `package.json`.

```bash
npm run dev
```

### 06. Empezar a usar Tailwind en tu HTML

Asegúrate de que tu CSS compilado esté incluido en el `<head>` (tu framework podría encargarse de esto), luego comienza a usar las clases de utilidad de Tailwind para estilizar tu contenido.

```html
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/src/style.css" rel="stylesheet">
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>
```

**¿Estás atascado?** La configuración de Tailwind con Vite puede ser un poco diferente entre las distintas herramientas de compilación. Consulta nuestras guías de frameworks para ver si tenemos instrucciones más específicas para tu configuración particular.




# Configuración del Editor

Herramientas para mejorar la experiencia del desarrollador al trabajar con Tailwind CSS.

## Soporte de Sintaxis

Tailwind CSS utiliza sintaxis CSS personalizada como `@theme`, `@variant` y `@source`, y en algunos editores esto puede generar advertencias o errores donde estas reglas no son reconocidas.

Si estás usando VS Code, nuestro plugin oficial [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) incluye un modo de lenguaje dedicado a Tailwind CSS que soporta todas las reglas y funciones personalizadas que utiliza Tailwind.

En algunos casos, es posible que necesites deshabilitar el linting/validaciones CSS nativas si tu editor es muy estricto con la sintaxis que espera en tus archivos CSS.

## IntelliSense para VS Code

La extensión oficial [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) para Visual Studio Code mejora la experiencia de desarrollo de Tailwind al proporcionar a los usuarios características avanzadas como autocompletado, resaltado de sintaxis y linting.

*   **Autocompletado** — proporciona sugerencias inteligentes para clases de utilidad, así como [funciones y directivas CSS](https://tailwindcss.com/docs/functions-and-directives).
*   **Linting** — resalta errores y posibles fallos tanto en tu CSS como en tu marcado.
*   **Vistas previas al pasar el ratón** — revela el CSS completo para las clases de utilidad al pasar el ratón sobre ellas.
*   **Resaltado de sintaxis** — para que las características de Tailwind que utilizan sintaxis CSS personalizada se resalten correctamente.

Consulta el proyecto [en GitHub](https://github.com/tailwindlabs/tailwindcss-intellisense) para obtener más información, o [añádelo a Visual Studio Code](vscode:extension/bradlc.vscode-tailwindcss) para empezar ahora.

## Ordenación de Clases con Prettier

Mantenemos un [plugin oficial de Prettier](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) para Tailwind CSS que ordena automáticamente tus clases siguiendo nuestro [orden de clases recomendado](https://tailwindcss.com/docs/reusing-styles#recommended-class-order).

Funciona sin problemas con configuraciones personalizadas de Tailwind, y como es solo un plugin de Prettier, funciona dondequiera que Prettier funcione, incluyendo todos los editores e IDE populares, y por supuesto en la línea de comandos.

```html
<!-- Antes -->
<button class="text-white px-4 sm:px-8 py-2 sm:py-3 bg-sky-700 hover:bg-sky-800">Submit</button>

<!-- Después -->
<button class="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">Submit</button>
```

Consulta el plugin [en GitHub](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) para obtener más información y empezar.

## IDEs de JetBrains

Los IDEs de JetBrains como WebStorm, PhpStorm y otros incluyen soporte para autocompletado inteligente de Tailwind CSS en tu HTML.

## Zed

Zed incluye soporte integrado para autocompletado, linting y vistas previas al pasar el ratón de Tailwind CSS para una variedad de lenguajes. También soporta Prettier, por lo que nuestro [plugin oficial de Prettier](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) funciona sin problemas en Zed cuando está instalado.




# Compatibilidad

Aprende sobre el soporte de navegadores y la compatibilidad con otras herramientas.

## Soporte de Navegadores

Tailwind CSS v4.0 está diseñado y probado en navegadores modernos, y la funcionalidad principal del framework depende específicamente de estas versiones de navegador:

*   **Chrome 111** (lanzado en marzo de 2023)
*   **Safari 16.4** (lanzado en marzo de 2023)
*   **Firefox 128** (lanzado en julio de 2024)

Tailwind también incluye soporte para muchas características de plataforma de vanguardia como `field-sizing: content`, `@starting-style` y `text-wrap: balance` que tienen soporte limitado en navegadores. Depende de ti si quieres usar estas características modernas en tus proyectos; si los navegadores a los que te diriges no las soportan, simplemente no uses esas utilidades y variantes.

Si no estás seguro sobre el soporte de una característica de plataforma moderna, la base de datos [Can I use](https://caniuse.com/) es un gran recurso.

## Sass, Less y Stylus

Tailwind CSS v4.0 es una herramienta de construcción CSS con todas las funciones diseñada para un flujo de trabajo específico, y no está diseñada para ser utilizada con preprocesadores CSS como Sass, Less o Stylus.

**Piensa en Tailwind CSS como tu preprocesador** — no deberías usar Tailwind con Sass por la misma razón por la que no usarías Sass con Stylus.

Dado que Tailwind está diseñado para navegadores modernos, en realidad no necesitas un preprocesador para cosas como anidamiento o variables, y el propio Tailwind hará cosas como agrupar tus importaciones y añadir prefijos de proveedor.

### Importaciones en tiempo de compilación

Tailwind agrupará automáticamente otros archivos CSS que incluyas con `@import`, sin necesidad de una herramienta de preprocesamiento separada.

```css
/* app.css */
@import "tailwindcss";
@import "./typography.css";
```

En este ejemplo, el archivo `typography.css` será agrupado en tu CSS compilado por Tailwind, sin ninguna otra herramienta como Sass o `postcss-import`.

### Variables

Todos los navegadores modernos soportan [variables CSS nativas](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) sin necesidad de ningún tipo de preprocesador:

```css
/* typography.css */
.typography {
  font-size: var(--text-base);
  color: var(--color-gray-700);
}
```

Tailwind se basa en gran medida en las variables CSS internamente, por lo que si puedes usar Tailwind en tu proyecto, puedes usar variables CSS nativas.

### Anidamiento

Bajo el capó, Tailwind utiliza [Lightning CSS](https://lightningcss.dev/) para procesar CSS anidado como este:

```css
/* typography.css */
.typography {
  p {
    font-size: var(--text-base);
  }
  img {
    border-radius: var(--radius-lg);
  }
}
```

Tailwind aplana ese CSS anidado para que pueda ser entendido por todos los navegadores modernos:

```css
/* output.css */
.typography p {
  font-size: var(--text-base);
}
.typography img {
  border-radius: var(--radius-lg);
}
```

El soporte nativo de anidamiento CSS también es muy bueno hoy en día, por lo que realmente no necesitas un preprocesador para el anidamiento, incluso si no estás usando Tailwind.

### Bucles

En Tailwind, las clases para las que podrías haber usado bucles en el pasado (como `col-span-1`, `col-span-2`, etc.) son generadas por Tailwind bajo demanda cada vez que las usas, en lugar de tener que ser predefinidas.

Además, cuando construyes cosas con Tailwind CSS, la gran mayoría de tu estilo lo haces en tu HTML, no en archivos CSS. Dado que no estás escribiendo toneladas de CSS en primer lugar, simplemente no necesitas características como los bucles que están diseñadas para generar programáticamente muchas reglas CSS personalizadas.

### Funciones de color y matemáticas

Al usar preprocesadores como Sass o Less, es posible que hayas usado funciones como `darken` o `lighten` para ajustar colores.

Al usar Tailwind, el flujo de trabajo recomendado es usar una paleta de colores predefinida que incluya tonos claros y oscuros de cada color, como la [paleta de colores predeterminada](https://tailwindcss.com/docs/customizing-colors#default-color-palette) diseñada por expertos incluida con el framework.

```html
<button class="bg-indigo-500 hover:bg-indigo-600 ...">
</button>
```

También puedes usar características CSS modernas como [color-mix()](https://developer.mozilla.org/en-US/docs/Web/CSS/color-mix) para ajustar colores en tiempo de ejecución directamente en el navegador. Esto incluso te permite ajustar colores definidos usando variables CSS o la palabra clave `currentcolor`, lo cual no es posible con preprocesadores.

De manera similar, los navegadores ahora soportan funciones matemáticas como `min()`, `max()` y `round()` de forma nativa, por lo que ya no es necesario depender de un preprocesador para estas características.

## Módulos CSS

Tailwind es compatible con los módulos CSS y puede coexistir con ellos si estás introduciendo Tailwind en un proyecto que ya los utiliza, pero **no recomendamos usar módulos CSS y Tailwind juntos** si puedes evitarlo.

### Problemas de alcance

Los módulos CSS están diseñados para resolver problemas de alcance que simplemente no existen al componer clases de utilidad en tu HTML en lugar de escribir CSS personalizado.

Los estilos se limitan de forma natural con Tailwind porque cada clase de utilidad siempre hace lo mismo, sin importar dónde se use; no hay riesgo de que añadir una clase de utilidad a una parte de tu interfaz de usuario cree un efecto secundario inesperado en otro lugar.

### Rendimiento

Al usar módulos CSS, las herramientas de construcción como Vite, Parcel y Turbopack procesan cada módulo CSS por separado. Esto significa que si tienes 50 módulos CSS en un proyecto, **Tailwind necesita ejecutarse 50 veces por separado**, lo que lleva a tiempos de construcción mucho más lentos y una peor experiencia para el desarrollador.

### Compartir contexto explícito

Dado que cada módulo CSS se procesa por separado, no tienen `@theme` a menos que importes uno.

Esto significa que características como `@apply` no funcionarán como esperas a menos que importes explícitamente tus estilos globales como referencia:

Importa tus estilos globales como referencia para asegurarte de que tus variables de tema estén definidas

```css
/* Button.module.css */
@reference "../app.css";
button {
  @apply bg-blue-500;
}
```

Alternativamente, también puedes usar variables CSS en lugar de `@apply`, lo que tiene el beneficio adicional de permitir que Tailwind omita el procesamiento de esos archivos y mejorará el rendimiento de tu construcción:

```css
/* Button.module.css */
button {
  background: var(--color-blue-500);
}
```

## Vue, Svelte y Astro

Vue, Svelte y Astro soportan bloques `<style>` en archivos de componentes que se comportan de manera muy similar a los [módulos CSS](https://tailwindcss.com/docs/compatibility#css-modules), lo que significa que cada uno es procesado por tus herramientas de construcción de forma totalmente separada y tienen todos los mismos inconvenientes.

Si estás usando Tailwind con estas herramientas, **recomendamos evitar los bloques `<style>` en tus componentes** y simplemente estilizar las cosas con clases de utilidad directamente en tu marcado, como se supone que debe usarse Tailwind.

Si usas bloques `<style>`, asegúrate de importar tus estilos globales como referencia si quieres que características como `@apply` funcionen como esperas:

Importa tus estilos globales como referencia para asegurarte de que tus variables de tema estén definidas

```html
<!-- Button.vue -->
<template>
  <button><slot /></button>
</template>

<style scoped>
  @reference "../app.css";
  button {
    @apply bg-blue-500;
  }
</style>
```

O simplemente usa tus variables CSS definidas globalmente en lugar de características como `@apply`, que no requieren que Tailwind procese el CSS de tu componente en absoluto:

```html
<!-- Button.vue -->
<template>
  <button><slot /></button>
</template>

<style scoped>
  button {
    background-color: var(--color-blue-500);
  }
</style>
```




# Guía de Actualización

Actualización de tus proyectos de Tailwind CSS de v3 a v4.

Tailwind CSS v4.0 es una nueva versión principal del framework, por lo que, aunque hemos trabajado muy duro para minimizar los cambios importantes, algunas actualizaciones son necesarias. Esta guía describe todos los pasos necesarios para actualizar tus proyectos de v3 a v4.

**Tailwind CSS v4.0 está diseñado para Safari 16.4+, Chrome 111+ y Firefox 128+.** Si necesitas soportar navegadores más antiguos, quédate con la v3.4 hasta que cambien tus requisitos de soporte de navegadores.

Si deseas actualizar un proyecto de v3 a v4, puedes usar nuestra herramienta de actualización para hacer la mayor parte del trabajo pesado por ti:

```bash
$ npx @tailwindcss/upgrade
```

Para la mayoría de los proyectos, la herramienta de actualización automatizará todo el proceso de migración, incluyendo la actualización de tus dependencias, la migración de tu archivo de configuración a CSS y el manejo de cualquier cambio en tus archivos de plantilla.

La herramienta de actualización requiere Node.js 20 o superior, así que asegúrate de que tu entorno esté actualizado antes de ejecutarla.

**Recomendamos ejecutar la herramienta de actualización en una nueva rama**, luego revisar cuidadosamente el `diff` y probar tu proyecto en el navegador para asegurarte de que todos los cambios se vean correctos. Es posible que necesites ajustar algunas cosas manualmente en proyectos complejos, pero la herramienta te ahorrará mucho tiempo de cualquier manera.

También es una buena idea revisar todos los [cambios importantes](https://tailwindcss.com/docs/upgrade-guide#changes-from-v3) en la v4 y comprender bien lo que ha cambiado, en caso de que haya otras cosas que necesites actualizar en tu proyecto que la herramienta de actualización no detecte.

## Actualización Manual

### Usando PostCSS

En la v3, el paquete `tailwindcss` era un plugin de PostCSS, pero en la v4 el plugin de PostCSS reside en un paquete dedicado `@tailwindcss/postcss`.

Además, en la v4 las importaciones y el prefijo de proveedor se manejan automáticamente, por lo que puedes eliminar `postcss-import` y `autoprefixer` si están en tu proyecto:

```javascript
// postcss.config.mjs
export default {
  plugins: {
    "postcss-import": {},
    tailwindcss: {},
    autoprefixer: {},
    "@tailwindcss/postcss": {},
  },
};
```

### Usando Vite

Si estás usando Vite, recomendamos migrar del plugin de PostCSS a nuestro nuevo plugin dedicado de Vite para un rendimiento mejorado y la mejor experiencia de desarrollador:

```javascript
// vite.config.ts
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
});
```

### Usando Tailwind CLI

En la v4, Tailwind CLI reside en un paquete dedicado `@tailwindcss/cli`. Actualiza cualquiera de tus comandos de construcción para usar el nuevo paquete en su lugar:

```bash
npx tailwindcss -i input.css -o output.css
npx @tailwindcss/cli -i input.css -o output.css
```

## Cambios de la v3

Aquí tienes una lista completa de todos los cambios importantes en Tailwind CSS v4.0.

Nuestra [herramienta de actualización](https://tailwindcss.com/docs/upgrade-guide#using-the-upgrade-tool) manejará la mayoría de estos cambios automáticamente, por lo que recomendamos encarecidamente usarla si puedes.

### Requisitos del navegador

Tailwind CSS v4.0 está diseñado para navegadores modernos y apunta a Safari 16.4, Chrome 111 y Firefox 128. Dependemos de características CSS modernas como `@property` y `color-mix()` para las características principales del framework, y Tailwind CSS v4.0 no funcionará en navegadores más antiguos.

Si necesitas soportar navegadores más antiguos, recomendamos quedarte con la v3.4 por ahora. Estamos explorando activamente un modo de compatibilidad para ayudar a las personas a actualizar antes, y esperamos compartir más noticias al respecto en el futuro.

### Directivas `@tailwind` eliminadas

En la v4, importas Tailwind usando una declaración `@import` de CSS regular, no usando las directivas `@tailwind` que usabas en la v3:

```css
/* CSS */
@tailwind base;
@tailwind components;
@tailwind utilities;
@import "tailwindcss";
```

### Utilidades obsoletas eliminadas

Hemos eliminado cualquier utilidad que estuviera obsoleta en la v3 y que no estuviera documentada desde hace varios años. Aquí tienes una lista de lo que se ha eliminado junto con la alternativa moderna:

| Obsoleto | Reemplazo |
| --- | --- |
| `bg-opacity-*` | Usa modificadores de opacidad como `bg-black/50` |
| `text-opacity-*` | Usa modificadores de opacidad como `text-black/50` |
| `border-opacity-*` | Usa modificadores de opacidad como `border-black/50` |
| `divide-opacity-*` | Usa modificadores de opacidad como `divide-black/50` |
| `ring-opacity-*` | Usa modificadores de opacidad como `ring-black/50` |
| `placeholder-opacity-*` | Usa modificadores de opacidad como `placeholder-black/50` |
| `flex-shrink-*` | `shrink-*` |
| `flex-grow-*` | `grow-*` |
| `overflow-ellipsis` | `text-ellipsis` |
| `decoration-slice` | `box-decoration-slice` |
| `decoration-clone` | `box-decoration-clone` |

### Utilidades renombradas

Hemos renombrado las siguientes utilidades en la v4 para hacerlas más consistentes y predecibles:

| v3 | v4 |
| --- | --- |
| `shadow-sm` | `shadow-xs` |
| `shadow` | `shadow-sm` |
| `drop-shadow-sm` | `drop-shadow-xs` |
| `drop-shadow` | `drop-shadow-sm` |
| `blur-sm` | `blur-xs` |
| `blur` | `blur-sm` |
| `backdrop-blur-sm` | `backdrop-blur-xs` |
| `backdrop-blur` | `backdrop-blur-sm` |
| `rounded-sm` | `rounded-xs` |
| `rounded` | `rounded-sm` |
| `outline-none` | `outline-hidden` |
| `ring` | `ring-3` |

#### Escalas de sombra, radio y desenfoque actualizadas

Hemos renombrado las escalas predeterminadas de sombra, radio y desenfoque para asegurarnos de que cada utilidad tenga un valor nombrado. Las versiones "desnudas" aún funcionan para la compatibilidad con versiones anteriores, pero las utilidades `_<utility>_-sm` se verán diferentes a menos que se actualicen a sus respectivas versiones `_<utility>_-xs`.

Para actualizar tu proyecto para estos cambios, reemplaza todas las utilidades de la v3 con sus versiones de la v4:

```html
<!-- HTML -->
<input class="shadow-sm" />
<input class="shadow-xs" />
<input class="shadow" />
<input class="shadow-sm" />
```

#### Utilidad `outline` renombrada

La utilidad `outline` ahora establece `outline-width: 1px` por defecto para ser más consistente con las utilidades de borde y anillo. Además, todas las utilidades `outline-<number>` establecen `outline-style` en `solid` por defecto, omitiendo la necesidad de combinarlas con `outline`:

```html
<!-- HTML -->
<input class="outline outline-2" />
<input class="outline-2" />
```

La utilidad `outline-none` anteriormente no establecía `outline-style: none`, y en su lugar establecía un contorno invisible que aún se mostraría en el modo de colores forzados por razones de accesibilidad.

Para que esto sea más claro, hemos renombrado esta utilidad a `outline-hidden` y hemos añadido una nueva utilidad `outline-none` que realmente establece `outline-style: none`.

Para actualizar tu proyecto para este cambio, reemplaza cualquier uso de `outline-none` con `outline-hidden`:

```html
<!-- HTML -->
<input class="focus:outline-none" />
<input class="focus:outline-hidden" />
```

#### Cambio de ancho de anillo predeterminado

En la v3, la utilidad `ring` añadía un anillo de `3px`. Hemos cambiado esto en la v4 a `1px` para que sea consistente con los bordes y contornos.

Para actualizar tu proyecto para este cambio, reemplaza cualquier uso de `ring` con `ring-3`:

```html
<!-- HTML -->
<input class="ring ring-blue-500" />
<input class="ring-3 ring-blue-500" />
```

### Selector `space-between`

Hemos cambiado el selector utilizado por las utilidades [`space-x-*` y `space-y-*`](https://tailwindcss.com/docs/space) para abordar problemas graves de rendimiento en páginas grandes:

```css
/* Antes */
.space-y-4 > :not([hidden]) ~ :not([hidden]) {
  margin-top: 1rem;
}

/* Ahora */
.space-y-4 > :not(:last-child) {
  margin-bottom: 1rem;
}
```

Es posible que veas cambios en tu proyecto si alguna vez usaste estas utilidades con elementos en línea, o si estabas añadiendo otros márgenes a los elementos secundarios para ajustar su espaciado.

Si este cambio causa algún problema en tu proyecto, recomendamos migrar a un diseño `flex` o `grid` y usar `gap` en su lugar:

```html
<!-- HTML -->
<div class="space-y-4 p-4">
  <div class="flex flex-col gap-4 p-4">
    <label for="name">Name</label>
    <input type="text" name="name" />
  </div>
</div>
```

### Usando variantes con gradientes

En la v3, anular parte de un gradiente con una variante "reiniciaría" todo el gradiente, por lo que en este ejemplo el color `to-*` sería transparente en modo oscuro en lugar de amarillo:

```html
<!-- HTML -->
<div class="bg-gradient-to-r from-red-500 to-yellow-400 dark:from-blue-500">
  <!-- ... -->
</div>
```

En la v4, estos valores se conservan, lo que es más consistente con cómo funcionan otras utilidades en Tailwind.




# Estilizando con Clases de Utilidad

Construyendo componentes complejos a partir de un conjunto restringido de utilidades primitivas.

## Visión General

Estilizas cosas con Tailwind combinando muchas clases presentacionales de un solo propósito (clases de utilidad) directamente en tu marcado:

```html
<div class="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">

  <div>
    <div class="text-xl font-medium text-black dark:text-white">ChitChat</div>
    <p class="text-gray-500 dark:text-gray-400">You have a new message!</p>
  </div>
</div>
```

Por ejemplo, en la interfaz de usuario anterior hemos usado:

*   Las utilidades de [display](https://tailwindcss.com/docs/display) y [padding](https://tailwindcss.com/docs/padding) (`flex`, `shrink-0` y `p-6`) para controlar el diseño general.
*   Las utilidades de [max-width](https://tailwindcss.com/docs/max-width) y [margin](https://tailwindcss.com/docs/margin) (`max-w-sm` y `mx-auto`) para restringir el ancho de la tarjeta y centrarla horizontalmente.
*   Las utilidades de [background-color](https://tailwindcss.com/docs/background-color), [border-radius](https://tailwindcss.com/docs/border-radius) y [box-shadow](https://tailwindcss.com/docs/box-shadow) (`bg-white`, `rounded-xl` y `shadow-lg`) para estilizar la apariencia de la tarjeta.
*   Las utilidades de [width](https://tailwindcss.com/docs/width) y [height](https://tailwindcss.com/docs/height) (`size-12`) para establecer el ancho y alto de la imagen del logotipo.
*   Las utilidades de [gap](https://tailwindcss.com/docs/gap) (`gap-x-4`) para manejar el espaciado entre el logotipo y el texto.
*   Las utilidades de [font-size](https://tailwindcss.com/docs/font-size), [color](https://tailwindcss.com/docs/color) y [font-weight](https://tailwindcss.com/docs/font-weight) (`text-xl`, `text-black`, `font-medium`, etc.) para estilizar el texto de la tarjeta.

Estilizar las cosas de esta manera contradice muchas de las mejores prácticas tradicionales, pero una vez que lo pruebas, rápidamente notarás algunos beneficios realmente importantes:

*   **Terminas las cosas más rápido** — no pasas tiempo pensando en nombres de clases, tomando decisiones sobre selectores o cambiando entre archivos HTML y CSS, por lo que tus diseños se unen muy rápido.
*   **Hacer cambios se siente más seguro** — añadir o eliminar una clase de utilidad a un elemento solo afecta a ese elemento, por lo que nunca tienes que preocuparte por romper accidentalmente algo en otra página que esté usando el mismo CSS.
*   **Mantener proyectos antiguos es más fácil** — cambiar algo solo significa encontrar ese elemento en tu proyecto y cambiar las clases, no tratar de recordar cómo funciona todo ese CSS personalizado que no has tocado en seis meses.
*   **Tu código es más portable** — dado que tanto la estructura como el estilo viven en el mismo lugar, puedes copiar y pegar fácilmente trozos enteros de la interfaz de usuario, incluso entre diferentes proyectos.
*   **Tu CSS deja de crecer** — dado que las clases de utilidad son tan reutilizables, tu CSS no sigue creciendo linealmente con cada nueva característica que añades a un proyecto.

Estos beneficios marcan una gran diferencia en proyectos pequeños, pero son aún más valiosos para equipos que trabajan en proyectos de larga duración a escala.

### ¿Por qué no usar simplemente estilos en línea?

Una reacción común a este enfoque es preguntarse, "¿no son esto solo estilos en línea?" y en cierto modo lo son — estás aplicando estilos directamente a los elementos en lugar de asignarles un nombre de clase y luego estilizar esa clase.

Pero usar clases de utilidad tiene muchas ventajas importantes sobre los estilos en línea, por ejemplo:

*   **Diseñar con restricciones** — usando estilos en línea, cada valor es un número mágico. Con las utilidades, estás eligiendo estilos de un [sistema de diseño predefinido](https://tailwindcss.com/docs/customizing-spacing), lo que hace mucho más fácil construir interfaces de usuario visualmente consistentes.
*   **Estados de `:hover`, `:focus` y otros** — los estilos en línea no pueden apuntar a estados como `:hover` o `:focus`, pero las [variantes de estado](https://tailwindcss.com/docs/hover-focus-and-other-states) de Tailwind facilitan el estilo de esos estados con clases de utilidad.
*   **Consultas de medios** — no puedes usar consultas de medios en estilos en línea, pero puedes usar las [variantes responsivas](https://tailwindcss.com/docs/responsive-design) de Tailwind para construir interfaces totalmente responsivas fácilmente.

Este componente es totalmente responsivo e incluye un botón con estilos de `:hover` y `:active`, y está construido completamente con clases de utilidad:

```html
<div class="flex flex-col gap-2 p-8 sm:flex-row sm:items-center sm:gap-6 sm:py-4 ...">

  <div class="space-y-2 text-center sm:text-left">
    <div class="space-y-0.5">
      <p class="text-lg font-semibold text-black">Erin Lindford</p>
      <p class="font-medium text-gray-500">Product Engineer</p>
    </div>
    <button class="border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 ...">
      Message
    </button>
  </div>
</div>
```

## Pensando en Clases de Utilidad

### Estilizando estados de `:hover` y `:focus`

Para estilizar un elemento en estados como `:hover` o `:focus`, prefija cualquier utilidad con el estado al que deseas apuntar, por ejemplo `hover:bg-sky-700`:

```html
<button class="bg-sky-500 hover:bg-sky-700 ...">Save changes</button>
```

Estos prefijos se llaman [variantes](https://tailwindcss.com/docs/hover-focus-and-other-states) en Tailwind, y solo aplican los estilos de una clase de utilidad cuando la condición para esa variante coincide.

Así es como se ve el CSS generado para la clase `hover:bg-sky-700`:

```css
.hover\:bg-sky-700 {
  &:hover {
    background-color: var(--color-sky-700);
  }
}
```

¿Notas cómo esta clase no hace nada _a menos_ que el elemento esté en `:hover`? Su _único_ trabajo es proporcionar estilos de `:hover` — nada más.

Esto es diferente de cómo escribirías CSS tradicional, donde una sola clase generalmente proporcionaría los estilos para muchos estados:

```html
<button class="btn">Save changes</button>
<style>
  .btn {
    background-color: var(--color-sky-500);
    &:hover {
      background-color: var(--color-sky-700);
    }
  }
</style>
```

Incluso puedes apilar variantes en Tailwind para aplicar una utilidad cuando coinciden múltiples condiciones, como combinar `hover:` y `disabled:`

```html
<button class="bg-sky-500 disabled:hover:bg-sky-500 ...">Save changes</button>
```

Obtén más información en la documentación sobre cómo estilizar elementos en [hover, focus y otros estados](https://tailwindcss.com/docs/hover-focus-and-other-states).

Al igual que los estados de `:hover` y `:focus`, puedes estilizar elementos en diferentes puntos de interrupción prefijando cualquier utilidad con el punto de interrupción donde deseas que se aplique ese estilo:

```html
<div class="grid grid-cols-2 sm:grid-cols-3">
  <!-- ... -->
</div>
```

En el ejemplo anterior, el prefijo `sm:` asegura que `grid-cols-3` solo se active en el punto de interrupción `sm` y superiores, que es de 40rem de forma predeterminada:

```css
.sm\:grid-cols-3 {
  @media (width >= 40rem) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
```

Obtén más información en la documentación de [diseño responsivo](https://tailwindcss.com/docs/responsive-design).

### Apuntando al modo oscuro

Estilizar un elemento en modo oscuro es simplemente cuestión de añadir el prefijo `dark:` a cualquier utilidad que desees aplicar cuando el modo oscuro esté activo:

```html
<div class="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
  <div>
    <span class="inline-flex items-center justify-center rounded-md bg-indigo-500 p-2 shadow-lg">
      <svg
        class="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <!-- ... -->
      </svg>
    </span>
  </div>
  <h3 class="text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight ">Writes upside-down</h3>
  <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm ">
    The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
  </p>
</div>
```

Al igual que con los estados de `:hover` o las consultas de medios, lo importante a entender es que una sola clase de utilidad nunca incluirá _ambos_ estilos claros y oscuros — estilizas las cosas en modo oscuro usando...




# Hover, Focus y Otros Estados

Uso de utilidades para estilizar elementos en hover, focus y más.

Cada clase de utilidad en Tailwind se puede aplicar _condicionalmente_ añadiendo una variante al principio del nombre de la clase que describe la condición que deseas apuntar.

Por ejemplo, para aplicar la clase `bg-sky-700` en hover, usa la clase `hover:bg-sky-700`:

```html
<button class="bg-sky-500 hover:bg-sky-700 ...">Save changes</button>
```

## ¿Cómo se compara esto con el CSS tradicional?

Al escribir CSS de la manera tradicional, un solo nombre de clase haría cosas diferentes según el estado actual:

```css
.btn-primary {
  background-color: #0ea5e9;
}
.btn-primary:hover {
  background-color: #0369a1;
}
```

En Tailwind, en lugar de añadir los estilos para un estado de hover a una clase existente, añades otra clase al elemento que _solo_ hace algo en hover:

```css
.bg-sky-500 {
  background-color: #0ea5e9;
}
.hover\:bg-sky-700:hover {
  background-color: #0369a1;
}
```

¿Notas cómo `hover:bg-sky-700` _solo_ define estilos para el estado `:hover`? No hace nada por defecto, pero tan pronto como pasas el ratón sobre un elemento con esa clase, el color de fondo cambiará a `sky-700`.

Esto es lo que queremos decir cuando decimos que una clase de utilidad se puede aplicar _condicionalmente_ — al usar variantes puedes controlar exactamente cómo se comporta tu diseño en diferentes estados, sin salir de tu HTML.

Tailwind incluye variantes para casi todo lo que necesitarás, incluyendo:

*   [Pseudo-clases](https://tailwindcss.com/docs/hover-focus-and-other-states#pseudo-classes), como `:hover`, `:focus`, `:first-child` y `:required`
*   [Pseudo-elementos](https://tailwindcss.com/docs/hover-focus-and-other-states#pseudo-elements), como `::before`, `::after`, `::placeholder` y `::selection`
*   [Consultas de medios y características](https://tailwindcss.com/docs/hover-focus-and-other-states#media-and-feature-queries), como puntos de interrupción responsivos, modo oscuro y `prefers-reduced-motion`
*   [Selectores de atributos](https://tailwindcss.com/docs/hover-focus-and-other-states#attribute-selectors), como `[dir="rtl"]` y `[open]`
*   [Selectores de hijos](https://tailwindcss.com/docs/hover-focus-and-other-states#child-selectors), como `& > *` y `& *`

Estas variantes incluso se pueden apilar para apuntar a situaciones más específicas, por ejemplo, cambiar el color de fondo en modo oscuro, en el punto de interrupción medio, en hover:

```html
<button class="dark:md:hover:bg-fuchsia-600 ...">Save changes</button>
```

En esta guía aprenderás sobre cada variante disponible en el framework, cómo usarlas con tus propias clases personalizadas e incluso cómo crear las tuyas propias.

## Pseudo-clases

### `:hover`, `:focus` y `:active`

Estiliza elementos en hover, focus y active usando las variantes `hover`, `focus` y `active`:

```html
<button class="bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 ...">
  Save changes
</button>
```

Tailwind también incluye variantes para otros estados interactivos como `:visited`, `:focus-within`, `:focus-visible` y más.

Consulta la [referencia de pseudo-clases](https://tailwindcss.com/docs/pseudo-class-reference) para obtener una lista completa de las variantes de pseudo-clases disponibles.

### `:first`, `:last`, `:odd` y `:even`

Estiliza un elemento cuando es el primer hijo o el último hijo usando las variantes `first` y `last`:

```html
<ul role="list">
  {#each people as person}
    <!-- Remove top/bottom padding when first/last child -->
    <li class="flex py-4 first:pt-0 last:pb-0">
      <img class="h-10 w-10 rounded-full" src={person.imageUrl} alt="" />
      <div class="ml-3 overflow-hidden">
        <p class="text-sm font-medium text-gray-900 dark:text-white">{person.name}</p>
        <p class="truncate text-sm text-gray-500 dark:text-gray-400">{person.email}</p>
      </div>
    </li>
  {/each}
</ul>
```

También puedes estilizar un elemento cuando es un hijo impar o par usando las variantes `odd` y `even`:

```html
<table>
  <!-- ... -->
  <tbody>
    {#each people as person}
      <!-- Use different background colors for odd and even rows -->
      <tr class="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
        <td>{person.name}</td>
        <td>{person.title}</td>
        <td>{person.email}</td>
      </tr>
    {/each}
  </tbody>
</table>
```

Usa las variantes `nth-*` y `nth-last-*` para estilizar hijos según su posición en la lista:

```html
<div class="nth-3:underline">
  <!-- ... -->
</div>
<div class="nth-last-5:underline">
  <!-- ... -->
</div>
<div class="nth-of-type-4:underline">
  <!-- ... -->
</div>
<div class="nth-last-of-type-6:underline">
  <!-- ... -->
</div>
```

Puedes pasar cualquier número que desees a estos por defecto, y usar valores arbitrarios para expresiones más complejas como `nth-[2n+1_of_li]`.

Tailwind también incluye variantes para otras pseudo-clases estructurales como `:only-child`, `:first-of-type`, `:empty` y más.

Consulta la [referencia de pseudo-clases](https://tailwindcss.com/docs/pseudo-class-reference) para obtener una lista completa de las variantes de pseudo-clases disponibles.

### `:required` y `:disabled`

Estiliza elementos de formulario en diferentes estados usando variantes como `required`, `invalid` y `disabled`:

```html
<input
  type="text"
  value="tbone"
  disabled
  class="invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 ..."
/>
```

El uso de variantes para este tipo de cosas puede reducir la cantidad de lógica condicional en tus plantillas, permitiéndote usar el mismo conjunto de clases independientemente del estado en que se encuentre una entrada y dejando que el navegador aplique los estilos correctos por ti.

Tailwind también incluye variantes para otros estados de formulario como `:read-only`, `:indeterminate`, `:checked` y más.

Consulta la [referencia de pseudo-clases](https://tailwindcss.com/docs/pseudo-class-reference) para obtener una lista completa de las variantes de pseudo-clases disponibles.

### `:has()`

Usa la variante `has-*` para estilizar un elemento basándose en el estado o contenido de sus descendientes:

```html
<label
  class="has-checked:bg-indigo-50 has-checked:text-indigo-900 has-checked:ring-indigo-200 dark:has-checked:bg-indigo-950 dark:has-checked:text-indigo-200 dark:has-checked:ring-indigo-900 ...">
  <svg fill="currentColor">
    <!-- ... -->
  </svg>
  Google Pay
  <input type="radio" class="checked:border-indigo-500 ..." />
</label>
```

Puedes usar `has-*` con una pseudo-clase, como `has-[:focus]`, para estilizar un elemento basándose en el estado de sus descendientes. También puedes usar selectores de elementos, como `has-[img]` o `has-[a]`, para estilizar un elemento basándose en el contenido de sus descendientes.

#### Estilizando basándose en los descendientes de un grupo

Si necesitas estilizar un elemento basándose en los descendientes de un elemento padre, puedes marcar el padre con la clase `group` y usar la variante `group-has-*` para estilizar el elemento objetivo:

```html
<div class="group ...">
  <img src="..." />
  <h4>Spencer Sharp</h4>
  <svg class="hidden group-has-[a]:block ..."><!-- ... --></svg>
  <p>Product Designer at <a href="...">planeteria.tech</a></p>
</div>
```

#### Estilizando basándose en los descendientes de un par

Si necesitas estilizar un elemento basándose en los descendientes de un elemento hermano, puedes marcar el hermano con la clase `peer` y usar la variante `peer-has-*` para estilizar el elemento objetivo:

```html
<label class="peer ...">
  <input type="checkbox" />
  Remember me
</label>
<div class="peer-has-checked:bg-blue-500 ...">
  <!-- ... -->
</div>
```

## Pseudo-elementos

### `::before` y `::after`

Estiliza los pseudo-elementos `::before` y `::after` usando las variantes `before` y `after`:

```html
<p class="before:content-['*'] before:text-red-500 ...">
  Required field
</p>
```

Estas variantes añaden un pseudo-elemento `::before` o `::after` al elemento y le aplican los estilos. Por defecto, el contenido del pseudo-elemento es una cadena vacía. Puedes cambiar esto usando la utilidad `content-*`.

### `::placeholder`

Estiliza el texto del marcador de posición de un input usando la variante `placeholder`:

```html
<input class="placeholder:text-gray-400 ..." placeholder="Enter your email" />
```

### `::selection`

Estiliza el texto seleccionado por el usuario usando la variante `selection`:

```html
<p class="selection:bg-purple-500 selection:text-white ...">
  Select this text
</p>
```

### `::file-selector-button`

Estiliza el botón del selector de archivos de un input de tipo `file` usando la variante `file-selector-button`:

```html
<input type="file" class="file-selector-button:bg-blue-500 ..." />
```

### `::marker`

Estiliza los marcadores de lista (puntos o números) usando la variante `marker`:

```html
<ul class="list-disc marker:text-green-500 ...">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

### `::backdrop`

Estiliza el fondo de un elemento `<dialog>` o `fullscreen` usando la variante `backdrop`:

```html
<dialog class="backdrop:bg-black/50 ...">
  <!-- ... -->
</dialog>
```

## Consultas de Medios y Características

### Puntos de interrupción responsivos

Estiliza elementos en diferentes puntos de interrupción responsivos usando las variantes `sm`, `md`, `lg`, `xl` y `2xl`:

```html
<img class="sm:w-full md:w-auto ..." src="..." />
```

Estas variantes aplican estilos solo cuando el tamaño de la pantalla es mayor o igual al punto de interrupción especificado. Por ejemplo, `sm:w-full` aplicará `width: 100%` cuando la pantalla sea `sm` (640px) o más grande.

### Modo oscuro

Estiliza elementos en modo oscuro usando la variante `dark`:

```html
<div class="bg-white dark:bg-gray-800 ...">
  <!-- ... -->
</div>
```

Esta variante aplica estilos solo cuando el modo oscuro está activo en el sistema del usuario.

### `prefers-reduced-motion`

Estiliza elementos cuando el usuario ha solicitado reducir el movimiento usando la variante `motion-reduce`:

```html
<div class="transition motion-reduce:transition-none ...">
  <!-- ... -->
</div>
```

### `prefers-contrast`

Estiliza elementos cuando el usuario ha solicitado un contraste de color preferido usando las variantes `contrast-more` y `contrast-less`:

```html
<div class="contrast-more:bg-black contrast-less:bg-white ...">
  <!-- ... -->
</div>
```

### `print`

Estiliza elementos solo cuando la página se está imprimiendo usando la variante `print`:

```html
<div class="print:hidden ...">
  <!-- ... -->
</div>
```

## Selectores de Atributos

### `[dir="rtl"]` y `[dir="ltr"]`

Estiliza elementos basándose en la dirección del texto (derecha a izquierda o izquierda a derecha) usando las variantes `rtl` y `ltr`:

```html
<div dir="rtl" class="rtl:text-right ...">
  <!-- ... -->
</div>
```

### `[open]`

Estiliza elementos cuando tienen el atributo `open` (por ejemplo, `<details>` o `<dialog>`) usando la variante `open`:

```html
<details open class="open:bg-blue-100 ...">
  <!-- ... -->
</details>
```

## Selectores de Hijos

### `& > *`

Estiliza los hijos directos de un elemento usando la variante `>`:

```html
<div class=">*:text-red-500 ...">
  <span>Child 1</span>
  <span>Child 2</span>
</div>
```

### `& *`

Estiliza todos los descendientes de un elemento usando la variante `*`:

```html
<div class="*:text-blue-500 ...">
  <span>Child 1</span>
  <div>
    <span>Grandchild 1</span>
  </div>
</div>
```

## Variantes Personalizadas

Puedes crear tus propias variantes personalizadas usando la directiva `@variant` en tu CSS:

```css
@variant my-custom-variant {
  .my-custom-class {
    color: red;
  }
}
```

Luego puedes usar esta variante en tu HTML:

```html
<div class="my-custom-variant:my-custom-class ...">
  <!-- ... -->
</div>
```

Esto es útil para crear variantes para estados personalizados o para integrar con librerías de JavaScript que gestionan estados complejos. 

## Conclusión

Las variantes en Tailwind CSS proporcionan una forma potente y flexible de aplicar estilos condicionalmente, lo que permite crear interfaces de usuario dinámicas y responsivas directamente en tu marcado. Al comprender y utilizar estas variantes, puedes escribir CSS más limpio, mantenible y eficiente.




# Diseño Responsivo

Uso de variantes de utilidad responsivas para construir interfaces de usuario adaptativas.

## Visión General

Cada clase de utilidad en Tailwind se puede aplicar condicionalmente en diferentes puntos de interrupción, lo que facilita la construcción de interfaces responsivas complejas sin salir de tu HTML.

Primero, asegúrate de haber añadido la [etiqueta meta de viewport](https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag) al `<head>` de tu documento:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

Luego, para añadir una utilidad pero que solo tenga efecto en un punto de interrupción determinado, todo lo que necesitas hacer es prefijar la utilidad con el nombre del punto de interrupción, seguido del carácter `:`:

```html
<!-- Ancho de 16 por defecto, 32 en pantallas medianas y 48 en pantallas grandes -->
<img class="w-16 md:w-32 lg:w-48" src="..." />
```

Hay cinco puntos de interrupción por defecto, inspirados en resoluciones de dispositivos comunes:

| Prefijo del punto de interrupción | Ancho mínimo | CSS |
| --- | --- | --- |
| `sm` | 40rem _(640px)_ | `@media (width >= 40rem) { ... }` |
| `md` | 48rem _(768px)_ | `@media (width >= 48rem) { ... }` |
| `lg` | 64rem _(1024px)_ | `@media (width >= 64rem) { ... }` |
| `xl` | 80rem _(1280px)_ | `@media (width >= 80rem) { ... }` |
| `2xl` | 96rem _(1536px)_ | `@media (width >= 96rem) { ... }` |

Esto funciona para **cada clase de utilidad en el framework**, lo que significa que puedes cambiar literalmente cualquier cosa en un punto de interrupción dado, incluso cosas como el espaciado entre letras o los estilos del cursor.

Aquí tienes un ejemplo simple de un componente de página de marketing que utiliza un diseño apilado en pantallas pequeñas y un diseño lado a lado en pantallas más grandes:

```html
<div class="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
  <div class="md:flex">
    <div class="md:shrink-0">

    </div>
    <div class="p-8">
      <div class="text-sm font-semibold tracking-wide text-indigo-500 uppercase">Company retreats</div>
      <a href="#" class="mt-1 block text-lg leading-tight font-medium text-black hover:underline">
        Incredible accommodation for your team
      </a>
      <p class="mt-2 text-gray-500">
        Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of
        places to do just that.
      </p>
    </div>
  </div>
</div>
```

Así es como funciona el ejemplo anterior:

*   Por defecto, el `div` exterior es `display: block`, pero al añadir la utilidad `md:flex`, se convierte en `display: flex` en pantallas medianas y más grandes.
*   Cuando el padre es un contenedor flex, queremos asegurarnos de que la imagen nunca se encoja, por lo que hemos añadido `md:shrink-0` para evitar que se encoja en pantallas medianas y más grandes. Técnicamente podríamos haber usado solo `shrink-0` ya que no haría nada en pantallas más pequeñas, pero como solo importa en pantallas `md`, es una buena idea dejarlo claro en el nombre de la clase.
*   En pantallas pequeñas, la imagen es automáticamente de ancho completo por defecto. En pantallas medianas y superiores, hemos restringido el ancho a un tamaño fijo y nos hemos asegurado de que la imagen tenga la altura completa usando `md:h-full md:w-48`.

Solo hemos usado un punto de interrupción en este ejemplo, pero podrías personalizar fácilmente este componente en otros tamaños usando los prefijos responsivos `sm`, `lg`, `xl` o `2xl` también.

## Trabajando Mobile-First

Tailwind utiliza un sistema de puntos de interrupción mobile-first, similar a lo que podrías estar acostumbrado en otros frameworks como Bootstrap.

Lo que esto significa es que las utilidades sin prefijo (como `uppercase`) tienen efecto en todos los tamaños de pantalla, mientras que las utilidades con prefijo (como `md:uppercase`) solo tienen efecto en el punto de interrupción especificado _y superiores_.

### Apuntando a pantallas móviles

Donde este enfoque sorprende más a menudo a la gente es que para estilizar algo para móvil, necesitas usar la versión sin prefijo de una utilidad, no la versión con prefijo `sm:`. No pienses en `sm:` como "en pantallas pequeñas", piensa en ello como "en el _punto de interrupción_ pequeño".

No uses `sm:` para apuntar a dispositivos móviles

```html
<!-- Esto solo centrará el texto en pantallas de 640px o más, no en pantallas pequeñas -->
<div class="sm:text-center"></div>
```

Usa utilidades sin prefijo para apuntar a móvil, y anúlalos en puntos de interrupción más grandes

```html
<!-- Esto centrará el texto en móvil, y lo alineará a la izquierda en pantallas de 640px o más -->
<div class="text-center sm:text-left"></div>
```

Por esta razón, a menudo es una buena idea implementar primero el diseño móvil, luego añadir cualquier cambio que tenga sentido para pantallas `sm`, seguido de pantallas `md`, etc.

### Apuntando a un rango de puntos de interrupción

Por defecto, los estilos aplicados por reglas como `md:flex` se aplicarán en ese punto de interrupción y se mantendrán aplicados en puntos de interrupción más grandes.

Si deseas aplicar una utilidad _solo_ cuando un rango de puntos de interrupción específico está activo, apila una variante responsiva como `md` con una variante `max-*` para limitar ese estilo a un rango específico:

```html
<div class="md:max-xl:flex">
  <!-- ... -->
</div>
```

Tailwind genera una variante `max-*` correspondiente para cada punto de interrupción, por lo que de forma predeterminada están disponibles las siguientes variantes:

| Variante | Media query |
| --- | --- |
| `max-sm` | `@media (width < 40rem) { ... }` |
| `max-md` | `@media (width < 48rem) { ... }` |
| `max-lg` | `@media (width < 64rem) { ... }` |
| `max-xl` | `@media (width < 80rem) { ... }` |\n| `max-2xl` | `@media (width < 96rem) { ... }` |

### Apuntando a un solo punto de interrupción

Para apuntar a un solo punto de interrupción, apunta al rango de ese punto de interrupción apilando una variante responsiva como `md` con la variante `max-*` para el siguiente punto de interrupción:

```html
<div class="md:max-lg:flex">
  <!-- ... -->
</div>
```

Lee sobre [apuntar a rangos de puntos de interrupción](https://tailwindcss.com/docs/responsive-design#targeting-a-breakpoint-range) para obtener más información.

## Usando Puntos de Interrupción Personalizados

### Personalizando tu tema

Usa las variables de tema `--breakpoint-*` para personalizar tus puntos de interrupción:

```css
/* app.css */
@import "tailwindcss";
@theme {
  --breakpoint-xs: 30rem;
  --breakpoint-2xl: 100rem;
  --breakpoint-3xl: 120rem;
}
```

Esto actualiza el punto de interrupción `2xl` para usar `100rem` en lugar del `96rem` predeterminado, y crea nuevos puntos de interrupción `xs` y `3xl` que se pueden usar en tu marcado:

```html
<div class="grid xs:grid-cols-2 3xl:grid-cols-6">
  <!-- ... -->
</div>
```

Ten en cuenta que es importante usar siempre la misma unidad para definir tus puntos de interrupción o las utilidades generadas pueden ordenarse de forma inesperada, haciendo que las clases de punto de interrupción se anulen entre sí de formas inesperadas.

Tailwind usa `rem` para los puntos de interrupción predeterminados, así que si estás añadiendo puntos de interrupción adicionales a los predeterminados, asegúrate de usar `rem` también.

Obtén más información sobre cómo personalizar tu tema en la [documentación del tema](https://tailwindcss.com/docs/theme).

### Eliminando puntos de interrupción predeterminados

Para eliminar un punto de interrupción predeterminado, restablece su valor a la palabra clave `initial`:

```css
/* app.css */
@import "tailwindcss";
@theme {
  --breakpoint-2xl: initial;
}
```

También puedes restablecer todos los puntos de interrupción predeterminados usando `--breakpoint-*: initial`, luego definir todos tus puntos de interrupción desde cero:

```css
/* app.css */
@import "tailwindcss";
@theme {
  --breakpoint-*: initial;
  --breakpoint-tablet: 40rem;
  --breakpoint-laptop: 64rem;
  --breakpoint-desktop: 80rem;
}
```

Obtén más información sobre cómo eliminar valores de tema predeterminados en la [documentación del tema](https://tailwindcss.com/docs/theme).

### Usando valores arbitrarios

Si necesitas usar un punto de interrupción único que no tiene sentido incluir en tu tema, usa las variantes `min` o `max` para generar un punto de interrupción personalizado sobre la marcha usando cualquier valor arbitrario.

```html
<div class="max-[600px]:bg-sky-300 min-[320px]:text-center">
  <!-- ... -->
</div>
```

Obtén más información sobre el soporte de valores arbitrarios en la [documentación de valores arbitrarios](https://tailwindcss.com/docs/adding-custom-styles#arbitrary-values).

## Consultas de Contenedor

### ¿Qué son las consultas de contenedor?

Las [consultas de contenedor](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries) son una característica CSS moderna que te permite estilizar algo basándose en el tamaño de un elemento padre en lugar del tamaño de todo el viewport. Te permiten construir componentes que son mucho más portátiles y reutilizables porque pueden cambiar según el espacio real disponible para ese componente.

### Ejemplo básico

Usa la directiva `@container` para definir un contenedor y luego usa las variantes `container-*` para estilizar los elementos dentro de ese contenedor:

```html
<div class="@container">
  <div class="@lg:text-lg">
    <!-- ... -->
  </div>
</div>
```

Esto es similar a cómo funcionan los puntos de interrupción responsivos, pero en lugar de basarse en el tamaño del viewport, se basan en el tamaño del contenedor. Esto es útil para componentes que se pueden reutilizar en diferentes partes de tu sitio web con diferentes tamaños.

## Conclusión

El diseño responsivo en Tailwind CSS se logra de manera eficiente y flexible mediante el uso de variantes de utilidad. El enfoque mobile-first, junto con la capacidad de personalizar puntos de interrupción y utilizar consultas de contenedor, permite a los desarrolladores crear interfaces de usuario adaptables y de alto rendimiento con facilidad.




# Modo Oscuro

Uso de variantes para estilizar tu sitio en modo oscuro.

## Visión General

Ahora que el modo oscuro es una característica de primera clase en muchos sistemas operativos, se está volviendo cada vez más común diseñar una versión oscura de tu sitio web para acompañar el diseño predeterminado.

Para hacer esto lo más fácil posible, Tailwind incluye una variante `dark` que te permite estilizar tu sitio de manera diferente cuando el modo oscuro está habilitado:

```html
<div class="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
  <div>
    <span class="inline-flex items-center justify-center rounded-md bg-indigo-500 p-2 shadow-lg">
      <!-- Icono SVG -->
    </span>
  </div>
  <h3 class="text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight ">Writes upside-down</h3>
  <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm ">
    The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
  </p>
</div>
```

Por defecto, esto utiliza la característica de medios CSS `prefers-color-scheme`, pero también puedes construir sitios que soporten [alternar el modo oscuro manualmente](https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually) anulando la variante oscura.

## Alternar el modo oscuro manualmente

Si deseas que tu tema oscuro sea impulsado por un selector CSS en lugar de la consulta de medios `prefers-color-scheme`, anula la variante `dark` para usar tu selector personalizado:

```css
/* app.css */
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

Ahora, en lugar de que las utilidades `dark:*` se apliquen basándose en `prefers-color-scheme`, se aplicarán siempre que la clase `dark` esté presente antes en el árbol HTML:

```html
<html class="dark">
  <body>
    <div class="bg-white dark:bg-black">
      <!-- ... -->
    </div>
  </body>
</html>
```

Cómo añades la clase `dark` al elemento `html` depende de ti, pero un enfoque común es usar un poco de JavaScript que actualice el atributo `class` y sincronice esa preferencia con algún lugar como `localStorage`.

### Usando un atributo de datos

Para usar un atributo de datos en lugar de una clase para activar el modo oscuro, simplemente anula la variante `dark` con un selector de atributo en su lugar:

```css
/* app.css */
@import "tailwindcss";
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
```

Ahora las utilidades del modo oscuro se aplicarán siempre que el atributo `data-theme` esté configurado en `dark` en algún lugar del árbol:

```html
<html data-theme="dark">
  <body>
    <div class="bg-white dark:bg-black">
      <!-- ... -->
    </div>
  </body>
</html>
```

### Con soporte de tema del sistema

Para construir alternadores de tema de tres vías que soporten el modo claro, el modo oscuro y el tema de tu sistema, usa un selector de modo oscuro personalizado y la [API `window.matchMedia()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) para detectar el tema del sistema y actualizar el elemento `html` cuando sea necesario.

Aquí tienes un ejemplo simple de cómo puedes soportar el modo claro, el modo oscuro, así como respetar la preferencia del sistema operativo:

```javascript
// spaghetti.js
// On page load or when changing themes, best to add inline in `head` to avoid FOUC
document.documentElement.classList.toggle(
  "dark",
  localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
);

// Whenever the user explicitly chooses light mode
localStorage.theme = "light";

// Whenever the user explicitly chooses dark mode
localStorage.theme = "dark";

// Whenever the user explicitly chooses to respect the OS preference
localStorage.removeItem("theme");
```

De nuevo, puedes gestionar esto como quieras, incluso almacenando la preferencia en el servidor en una base de datos y renderizando la clase en el servidor — depende totalmente de ti.




# Colores

Uso y personalización de la paleta de colores en proyectos de Tailwind CSS.

Tailwind CSS incluye una paleta de colores vasta y hermosa de forma predeterminada, cuidadosamente elaborada por diseñadores expertos y adecuada para una amplia gama de estilos de diseño diferentes.

Cada color de la paleta predeterminada incluye 11 pasos, siendo 50 el más claro y 950 el más oscuro:

> Toda la paleta de colores está disponible en todas las utilidades relacionadas con el color, incluyendo cosas como [color de fondo](https://tailwindcss.com/docs/background-color), [color de borde](https://tailwindcss.com/docs/border-color), [relleno](https://tailwindcss.com/docs/fill), [color de cursor](https://tailwindcss.com/docs/caret-color) y muchos más.

### Uso de utilidades de color

Usa utilidades de color como `bg-white`, `border-pink-300` y `text-gray-950` para establecer las diferentes propiedades de color de los elementos en tu diseño:

```html
<div class="flex items-center gap-4 rounded-lg bg-white p-6 shadow-md outline outline-black/5 dark:bg-gray-800">
  <span class="inline-flex shrink-0 rounded-full border border-pink-300 bg-pink-100 p-2 dark:border-pink-300/10 dark:bg-pink-400/10">
    <!-- Icono SVG -->
  </span>
  <div>
    <p class="text-gray-700 dark:text-gray-400">
      <span class="font-medium text-gray-950 dark:text-white">Tom Watson</span> mentioned you in
      <span class="font-medium text-gray-950 dark:text-white">Logo redesign</span>
    </p>
    <time class="mt-1 block text-gray-500" datetime="9:37">9:37am</time>
  </div>
</div>
```

Aquí tienes una lista completa de utilidades que usan tu paleta de colores:

| Utilidad | Descripción |
| --- | --- |
| `bg-*` | Establece el [color de fondo](https://tailwindcss.com/docs/background-color) de un elemento |
| `text-*` | Establece el [color del texto](https://tailwindcss.com/docs/text-color) de un elemento |
| `decoration-*` | Establece el [color de la decoración del texto](https://tailwindcss.com/docs/text-decoration-color) de un elemento |
| `border-*` | Establece el [color del borde](https://tailwindcss.com/docs/border-color) de un elemento |
| `outline-*` | Establece el [color del contorno](https://tailwindcss.com/docs/outline-color) de un elemento |
| `shadow-*` | Establece el color de las [sombras de caja](https://tailwindcss.com/docs/box-shadow) |
| `inset-shadow-*` | Establece el color de las [sombras de caja internas](https://tailwindcss.com/docs/box-shadow#inset-shadow) |
| `ring-*` | Establece el color de las [sombras de anillo](https://tailwindcss.com/docs/ring-color) |
| `inset-ring-*` | Establece el color de las [sombras de anillo internas](https://tailwindcss.com/docs/ring-color#inset-ring) |
| `accent-*` | Establece el [color de acento](https://tailwindcss.com/docs/accent-color) de los controles de formulario |
| `caret-*` | Establece el [color del cursor](https://tailwindcss.com/docs/caret-color) en los controles de formulario |
| `fill-*` | Establece el [color de relleno](https://tailwindcss.com/docs/fill) de los elementos SVG |
| `stroke-*` | Establece el [color del trazo](https://tailwindcss.com/docs/stroke) de los elementos SVG |

### Ajuste de opacidad

Puedes ajustar la opacidad de un color usando una sintaxis como `bg-black/75`, donde `75` establece el canal alfa del color al 75%:

```html
<div>
  <div class="bg-sky-500/10"></div>
  <div class="bg-sky-500/20"></div>
  <div class="bg-sky-500/30"></div>
  <div class="bg-sky-500/40"></div>
  <div class="bg-sky-500/50"></div>
  <div class="bg-sky-500/60"></div>
  <div class="bg-sky-500/70"></div>
  <div class="bg-sky-500/80"></div>
  <div class="bg-sky-500/90"></div>
  <div class="bg-sky-500/100"></div>
</div>
```

Esta sintaxis también soporta valores arbitrarios y la abreviatura de variable CSS:

```html
<div class="bg-pink-500/[71.37%]"><!-- ... --></div>
<div class="bg-cyan-400/(--my-alpha-value)"><!-- ... --></div>
```

### Apuntando al modo oscuro

Usa la variante `dark` para escribir clases como `dark:bg-gray-800` que solo aplican un color cuando el modo oscuro está activo:

```html
<div class="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
  <div>
    <span class="inline-flex items-center justify-center rounded-md bg-indigo-500 p-2 shadow-lg">
      <!-- Icono SVG -->
    </span>
  </div>
  <h3 class="text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight ">Writes upside-down</h3>
  <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm ">
    The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
  </p>
</div>
```

Obtén más información sobre cómo estilizar para el modo oscuro en la [documentación del modo oscuro](https://tailwindcss.com/docs/dark-mode).

### Referencia en CSS

Los colores se exponen como variables CSS en el espacio de nombres `--color-*`, por lo que puedes referenciarlos en CSS con variables como `--color-blue-500` y `--color-pink-700`:

```css
/* CSS */
@import "tailwindcss";
@layer components {
  .typography {
    color: var(--color-gray-950);
    a {
      color: var(--color-blue-500);
      &:hover {
        color: var(--color-blue-800);
      }
    }
  }
}
```

También puedes usarlos como [valores arbitrarios](https://tailwindcss.com/docs/adding-custom-styles#arbitrary-values) en clases de utilidad:

```html
<div class="bg-[light-dark(var(--color-white),var(--color-gray-950))]">
  <!-- ... -->
</div>
```

Para ajustar rápidamente la opacidad de un color al referenciarlo como una variable en CSS, Tailwind incluye una función especial `--alpha()`:

```css
/* CSS */
@import "tailwindcss";
@layer components {
  .DocSearch-Hit--Result {
    background-color: --alpha(var(--color-gray-950) / 10%);
  }
}
```

## Personalizando tus colores

Usa `@theme` para añadir colores personalizados a tu proyecto bajo el espacio de nombres de tema `--color-*`:

```css
/* CSS */
@import "tailwindcss";
@theme {
  --color-midnight: #121063;
  --color-tahiti: #3ab7bf;
  --color-bermuda: #78dcca;
}
```

Ahora, utilidades como `bg-midnight`, `text-tahiti` y `fill-bermuda` estarán disponibles en tu proyecto además de los colores predeterminados.

Obtén más información sobre las variables de tema en la [documentación de variables de tema](https://tailwindcss.com/docs/theme-variables).

### Anulando colores predeterminados

Anula cualquiera de los colores predeterminados definiendo nuevas variables de tema con el mismo nombre:

```css
/* CSS */
@import "tailwindcss";
@theme {
  --color-gray-50: oklch(0.984 0.003 247.858);
  --color-gray-100: oklch(0.968 0.007 247.896);
  --color-gray-200: oklch(0.929 0.013 255.508);
  --color-gray-300: oklch(0.869 0.022 252.894);
  --color-gray-400: oklch(0.704 0.04 256.788);
  --color-gray-500: oklch(0.554 0.046 257.417);
  --color-gray-600: oklch(0.446 0.043 257.281);
  --color-gray-700: oklch(0.372 0.044 257.287);
  --color-gray-800: oklch(0.279 0.041 260.031);
  --color-gray-900: oklch(0.208 0.042 265.755);
  --color-gray-950: oklch(0.129 0.042 264.695);
}
```

### Deshabilitando colores predeterminados

Deshabilita cualquier color predeterminado estableciendo el espacio de nombres del tema para ese color en `initial`:

```css
/* CSS */
@import "tailwindcss";
@theme {
  --color-lime-*: initial;
  --color-fuchsia-*: initial;
}
```


# Theme variables

Using utility classes as an API for your design tokens.

## Overview

Tailwind is a framework for building custom designs, and different designs need different typography, colors, shadows, breakpoints, and more.

These low-level design decisions are often called _design tokens_, and in Tailwind projects you store those values in _theme variables_.

### What are theme variables?

Theme variables are special CSS variables defined using the `@theme` directive that influence which utility classes exist in your project.

For example, you can add a new color to your project by defining a theme variable like `--color-mint-500`:

```css
@import "tailwindcss";

@theme {
  --color-mint-500: oklch(0.72 0.11 178);
}
```

Now you can use utility classes like `bg-mint-500`, `text-mint-500`, or `fill-mint-500` in your HTML:

```html
<div class="bg-mint-500">
  <!-- ... -->
</div>
```

Tailwind also generates regular CSS variables for your theme variables so you can reference your design tokens in arbitrary values or inline styles:

```html
<div style="background-color: var(--color-mint-500)">
  <!-- ... -->
</div>
```

Learn more about how theme variables map to different utility classes in the [theme variable namespaces](https://tailwindcss.com/docs/theme#namespaces) documentation.

#### Why `@theme` instead of `:root`?

Theme variables aren't _just_ CSS variables — they also instruct Tailwind to create new utility classes that you can use in your HTML.

Since they do more than regular CSS variables, Tailwind uses special syntax so that defining theme variables is always explicit. Theme variables are also required to be defined top-level and not nested under other selectors or media queries, and using a special syntax makes it possible to enforce that.

Defining regular CSS variables with `:root` can still be useful in Tailwind projects when you want to define a variable that isn't meant to be connected to a utility class. Use `@theme` when you want a design token to map directly to a utility class, and use `:root` for defining regular CSS variables that shouldn't have corresponding utility classes.

### Relationship to utility classes

Some utility classes in Tailwind like `flex` and `object-cover` are static, and are always the same from project to project. But many others are driven by theme variables, and only exist because of the theme variables you've defined.

For example, theme variables defined in the `--font-*` namespace determine all of the `font-family` utilities that exist in a project:

```css
@theme {
  --font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  /* ... */
}
```

The `font-sans`, `font-serif`, and `font-mono` utilities only exist by default because Tailwind's default theme defines the `--font-sans`, `--font-serif`, and `--font-mono` theme variables.

If another theme variable like `--font-poppins` were defined, a `font-poppins` utility class would become available to go with it:

```css
@import "tailwindcss";

@theme {
  --font-poppins: Poppins, sans-serif;
}
```

```html
<h1 class="font-poppins">This headline will use Poppins.</h1>
```

You can name your theme variables whatever you want within these namespaces, and a corresponding utility with the same name will become available to use in your HTML.

#### Relationship to variants

Some theme variables are used to define variants rather than utilities. For example theme variables in the `--breakpoint-*` namespace determine which responsive breakpoint variants exist in your project:

```css
@import "tailwindcss";

@theme {
  --breakpoint-3xl: 120rem;
}
```

Now you can use the `3xl:*` variant to only trigger a utility when the viewport is 120rem or wider:

```html
<div class="3xl:grid-cols-6 grid grid-cols-2 md:grid-cols-4">
  <!-- ... -->
</div>
```

Learn more about how theme variables map to different utility classes and variants in the [theme variable namespaces](https://tailwindcss.com/docs/theme#namespaces) documentation.

### Theme variable namespaces

Theme variables are defined in _namespaces_ and each namespace corresponds to one or more utility class or variant APIs.

Defining new theme variables in these namespaces will make new corresponding utilities and variants available in your project:

| Namespace | Utility classes |
| --- | --- |
| `--color-*` | Color utilities like `bg-red-500`, `text-sky-300`, and many more |
| `--font-*` | Font family utilities like `font-sans` |
| `--text-*` | Font size utilities like `text-xl` |
| `--font-weight-*` | Font weight utilities like `font-bold` |
| `--tracking-*` | Letter spacing utilities like `tracking-wide` |
| `--leading-*` | Line height utilities like `leading-tight` |
| `--breakpoint-*` | Responsive breakpoint variants like `sm:*` |
| `--container-*` | Container query variants like `@sm:*` and size utilities like `max-w-md` |
| `--spacing-*` | Spacing and sizing utilities like `px-4`, `max-h-16`, and many more |
| `--radius-*` | Border radius utilities like `rounded-sm` |
| `--shadow-*` | Box shadow utilities like `shadow-md` |
| `--inset-shadow-*` | Inset box shadow utilities like `inset-shadow-xs` |
| `--drop-shadow-*` | Drop shadow filter utilities like `drop-shadow-md` |
| `--blur-*` | Blur filter utilities like `blur-md` |
| `--perspective-*` | Perspective utilities like `perspective-near` |
| `--aspect-*` | Aspect ratio utilities like `aspect-video` |
| `--ease-*` | Transition timing function utilities like `ease-out` |
| `--animate-*` | Animation utilities like `animate-spin` |

For a list of all of the default theme variables, see the [default theme variable reference](https://tailwindcss.com/docs/theme#default-theme-variables).

### Default theme variables

When you import `tailwindcss` at the top of your CSS file, it includes a set of default theme variables to get you started.

Here's what you're actually importing when you import `tailwindcss`:

```css
@layer theme, base, components, utilities;

@import "./theme.css" layer(theme);
@import "./preflight.css" layer(base);
@import "./utilities.css" layer(utilities);
```

That `theme.css` file includes the default color palette, type scale, shadows, fonts, and more:

```css
@theme {
  --font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;

  --color-red-50: oklch(0.971 0.013 17.38);
  --color-red-100: oklch(0.936 0.032 17.717);
  --color-red-200: oklch(0.885 0.062 18.334);
  /* ... */

  --shadow-2xs: 0 1px rgb(0 0 0 / 0.05);
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  /* ... */
}
```

This is why utilities like `bg-red-200`, `font-serif`, and `shadow-sm` exist out of the box — they're driven by the default theme, not hardcoded into the framework like `flex-col` or `pointer-events-none`.

For a list of all of the default theme variables, see the [default theme variable reference](https://tailwindcss.com/docs/theme#default-theme-variables).

## Customizing your theme

The default theme variables are very general purpose and suitable for building dramatically different designs, but they are still just a starting point. It's very common to customize things like the color palette, fonts, and shadows to build exactly the design you have in mind.

### Extending the default theme

Use `@theme` to define new theme variables and extend the default theme:

```css
@import "tailwindcss";

@theme {
  --font-script: Great Vibes, cursive;
}
```

This makes a new `font-script` utility class available that you can use in your HTML, just like the default `font-sans` or `font-serif` utilities.

### Overriding the default theme

To override a default theme variable, just redefine it in your own CSS file after importing `tailwindcss`:

```css
@import "tailwindcss";

@theme {
  --font-sans: Inter, sans-serif;
}
```

This will replace the default `--font-sans` value, and now the `font-sans` utility will use `Inter` instead of the default system font stack.

### Referencing other theme variables

You can reference other theme variables using the `theme()` function:

```css
@import "tailwindcss";

@theme {
  --color-primary: theme(colors.indigo.500);
  --color-secondary: theme(colors.gray.700);
}
```

This can be useful when you want to give a more meaningful name to an existing theme variable.

### Disabling the default theme

If you want to start with a completely blank slate, you can disable the default theme by setting the `theme.default` option to `false` in your CSS:

```css
@import "tailwindcss" with (theme.default: false);

@theme {
  /* Your custom theme variables go here */
}
```

This can be useful for projects where you want to be very explicit about every design token you're using.



# Adding custom styles

Best practices for adding your own custom styles in Tailwind projects.

Often the biggest challenge when working with a framework is figuring out what you’re supposed to do when there’s something you need that the framework doesn’t handle for you.

Tailwind has been designed from the ground up to be extensible and customizable, so that no matter what you’re building you never feel like you’re fighting the framework.

This guide covers topics like customizing your design tokens, how to break out of those constraints when necessary, adding your own custom CSS, and extending the framework with plugins.

## Customizing your theme

If you want to change things like your color palette, spacing scale, typography scale, or breakpoints, add your customizations using the `@theme` directive in your CSS:

```css
@theme {
  --font-display: "Satoshi", "sans-serif";
  --breakpoint-3xl: 120rem;
  --color-avocado-100: oklch(0.99 0 0);
  --color-avocado-200: oklch(0.98 0.04 113.22);
  --color-avocado-300: oklch(0.94 0.11 115.03);
  --color-avocado-400: oklch(0.92 0.19 114.08);
  --color-avocado-500: oklch(0.84 0.18 117.33);
  --color-avocado-600: oklch(0.53 0.12 118.34);
  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);
  /* ... */
}
```

Learn more about customizing your theme in the [theme variables documentation](https://tailwindcss.com/docs/theme).

## Using arbitrary values

While you can usually build the bulk of a well-crafted design using a constrained set of design tokens, once in a while you need to break out of those constraints to get things pixel-perfect.

When you find yourself really needing something like `top: 117px` to get a background image in just the right spot, use Tailwind's square bracket notation to generate a class on the fly with any arbitrary value:

```html
<div class="top-[117px]">
  <!-- ... -->
</div>
```

This is basically like inline styles, with the major benefit that you can combine it with interactive modifiers like `hover` and responsive modifiers like `lg`:

```html
<div class="top-[117px] lg:top-[344px]">
  <!-- ... -->
</div>
```

This works for everything in the framework, including things like background colors, font sizes, pseudo-element content, and more:

```html
<div class="bg-[#bada55] text-[22px] before:content-["Festivus"]"><!-- ... --></div>
```

If you're referencing a CSS variable as an arbitrary value, you can use the custom property syntax:

```html
<div class="fill-(--my-brand-color)">
  <!-- ... -->
</div>
```

This is just a shorthand for `fill-[var(--my-brand-color)]` that adds the `var()` function for you automatically.

### Arbitrary properties

If you ever need to use a CSS property that Tailwind doesn't include a utility for out of the box, you can also use square bracket notation to write completely arbitrary CSS:

```html
<div class="[mask-type:luminance]">
  <!-- ... -->
</div>
```

This is _really_ like inline styles, but again with the benefit that you can use modifiers:

```html
<div class="[mask-type:luminance] hover:[mask-type:alpha]">
  <!-- ... -->
</div>
```

This can be useful for things like CSS variables as well, especially when they need to change under different conditions:

```html
<div class="[--scroll-offset:56px] lg:[--scroll-offset:44px]">
  <!-- ... -->
</div>
```

### Arbitrary variants

Arbitrary _variants_ are like arbitrary values but for doing on-the-fly selector modification, like you can with built-in pseudo-class variants like `hover:{utility}` or responsive variants like `md:{utility}` but using square bracket notation directly in your HTML.

```html
<ul role="list">
  {#each items as item}
    <li class="lg:[&:nth-child(-n+3)]:hover:underline">{item}</li>
  {/each}
</ul>
```

Learn more in the [arbitrary variants](https://tailwindcss.com/docs/adding-custom-styles#arbitrary-variants) documentation.

### Handling whitespace

When an arbitrary value needs to contain a space, use an underscore (`_`) instead and Tailwind will automatically convert it to a space at build-time:

```html
<div class="grid grid-cols-[1fr_500px_2fr]">
  <!-- ... -->
</div>
```

In situations where underscores are common but spaces are invalid, Tailwind will preserve the underscore instead of converting it to a space, for example in URLs:

```html
<div class="bg-[url('/what_a_rush.png')]">
  <!-- ... -->
</div>
```

In the rare case that you actually need to use an underscore but it's ambiguous because a space is valid as well, escape the underscore with a backslash and Tailwind won't convert it to a space:

```html
<div class="before:content-['hello\_world']">
  <!-- ... -->
</div>
```

If you're using something like JSX where the backslash is stripped from the rendered HTML, use [String.raw()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw) so the backslash isn't treated as a JavaScript escape character:

```javascript
<div className={String.raw`before:content-['hello\_world']`}>
  <!-- ... -->
</div>
```

### Resolving ambiguities

Many utilities in Tailwind share a common namespace but map to different CSS properties. For example `text-lg` and `text-black` both share the `text-` namespace, but one is for `font-size` and the other is for `color`.

When using arbitrary values, Tailwind can generally handle this ambiguity automatically based on the value you pass in:

```html
<!-- Will generate a font-size utility -->
<div class="text-[22px]">...</div>

<!-- Will generate a color utility -->
<div class="text-[#bada55]">...</div>
```

Sometimes it really is ambiguous though, for example when using CSS variables:

```html
<div class="text-(--my-var)">...</div>
```

In these situations, you can "hint" the underlying type to Tailwind by adding a [CSS data type](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units#data_types) before the value:

```html
<!-- Will generate a font-size utility -->
<div class="text-(length:--my-var)">...</div>

<!-- Will generate a color utility -->
<div class="text-(color:--my-var)">...</div>
```

## Using custom CSS

While Tailwind is designed to handle the bulk of your styling needs, there is nothing stopping you from just writing plain CSS when you need to:

```css
@import "tailwindcss";

.my-custom-style {
  /* ... */
}
```

### Adding base styles

If you just want to set some defaults for the page (like the text color, background color, or font family), the easiest option is just adding some classes to the `html` or `body` elements:

```html
<!doctype html>
<html lang="en" class="bg-gray-100 font-serif text-gray-900">
  <!-- ... -->
</html>
```

This keeps your base styling decisions in your markup alongside all of your other styles, instead of hiding them in a separate file.

If you want to add your own default base styles for specific HTML elements, use the `@layer` directive to add those styles to Tailwind's `base` layer:

```css
@layer base {
  h1 {
    font-size: var(--text-2xl);
  }
  h2 {
    font-size: var(--text-xl);
  }
}
```

### Adding component classes

Use the `components` layer for any more complicated classes you want to add to your project that you'd still like to be able to override with utility classes.

Traditionally these would be classes like `card`, `btn`, `badge` — that kind of thing.

```css
@layer components {
  .card {
    background-color: var(--color-white);
    border-radius: var(--radius-lg);
    padding: --spacing(6);
    box-shadow: var(--shadow-xl);
  }
}
```

By defining component classes in the `components` layer, you can still use utility classes to override them when necessary:

```html
<!-- Will look like a card, but with square corners -->
<div class="card rounded-none">
  <!-- ... -->
</div>
```

Using Tailwind you probably don't need these types of classes as often as you think. Read our guide on [managing duplication](https://tailwindcss.com/docs/managing-duplication) for our recommendations.

The `components` layer is also a good place to put custom styles for any third-party components you're using:

```css
@layer components {
  .select2-dropdown {
    /* ... */
  }
}
```

### Using variants

Use the `@variant` directive to apply a Tailwind variant within custom CSS:

```css
.my-element {
  background: white;

  @variant dark {
    background: black;
  }
}
```

Compiled CSS:

```css
.my-element {
  background: white;
}

.dark .my-element {
  background: black;
}
```

This is especially useful when you need to use a variant with a custom selector, for example to apply a variant to a parent element:

```css
.my-element {
  background: white;

  @variant .parent:hover & {
    background: black;
  }
}
```

Compiled CSS:

```css
.my-element {
  background: white;
}

.parent:hover .my-element {
  background: black;
}
```

### Using `@apply`

Use Tailwind's `@apply` directive to inline any existing utility classes into your own custom CSS:

```css
.btn {
  @apply font-bold py-2 px-4 rounded;
}
.btn-blue {
  @apply bg-blue-500 text-white;
}
.btn-blue:hover {
  @apply bg-blue-700;
}
```

This is useful when you need to write custom CSS but still want to leverage Tailwind's utility classes. For example, you might use `@apply` to create a custom button component:

```html
<button class="btn btn-blue">Button</button>
```

### Using `@screen`

Use the `@screen` directive to create media queries that reference your [configured breakpoints](https://tailwindcss.com/docs/responsive-design#customizing-breakpoints):

```css
@screen sm {
  /* ... */
}
```

This is useful when you need to write custom CSS that responds to different screen sizes.

### Using `@layer`

Use the `@layer` directive to tell Tailwind to add your custom styles to a specific layer. This is useful for controlling the order of your CSS and ensuring that your custom styles can be overridden by utility classes:

```css
@layer base {
  /* ... */
}

@layer components {
  /* ... */
}

@layer utilities {
  /* ... */
}
```

### Using `@config`

Use the `@config` directive to specify a custom configuration file for Tailwind CSS:

```css
@config "./tailwind.config.js";
```

This is useful when you need to use a different configuration file for a specific part of your project.

## Using plugins

Tailwind CSS is designed to be extended with plugins. Plugins allow you to add new utility classes, components, and variants to Tailwind. You can write your own plugins or use plugins created by the community.

### Writing a plugin

To write a plugin, you'll need to create a JavaScript file that exports a function. This function will receive a `plugin` object as its first argument. The `plugin` object provides methods for adding new utility classes, components, and variants.

```javascript
// tailwindcss-plugin.js
const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addUtilities, addComponents, addVariant }) {
  addUtilities({
    '.no-scrollbar': {
      '-ms-overflow-style': 'none',
      'scrollbar-width': 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  });

  addComponents({
    '.btn': {
      padding: '.5rem 1rem',
      borderRadius: '.25rem',
      fontWeight: '600',
    },
  });

  addVariant('hocus', ['&:hover', '&:focus']);
});
```

### Using a plugin

To use a plugin, you'll need to add it to your `tailwind.config.js` file:

```javascript
// tailwind.config.js
module.exports = {
  plugins: [
    require('./tailwindcss-plugin.js'),
  ],
};
```

### Official plugins

Tailwind CSS provides several official plugins that you can use in your projects:

*   `@tailwindcss/typography`: Adds a set of `prose` classes that can be used to add beautiful typographic defaults to any vanilla HTML.
*   `@tailwindcss/forms`: Adds a basic reset for form styles that makes it easier to style form elements with utility classes.
*   `@tailwindcss/aspect-ratio`: Adds `aspect-ratio` utilities for easily controlling the aspect ratio of an element.
*   `@tailwindcss/line-clamp`: Provides `line-clamp` utilities for clamping text to a specific number of lines.

## Best practices

### Don't over-abstract

One of the biggest mistakes people make when they first start using Tailwind is trying to over-abstract everything. They'll create a component for every little thing, even if it's only used once. This defeats the purpose of Tailwind, which is to make it easy to build UIs quickly.

Instead, embrace the utility-first approach. Don't be afraid to use a lot of utility classes directly in your HTML. Only create components when you find yourself repeating the same set of utility classes over and over again.

### Use `@apply` sparingly

The `@apply` directive can be useful for extracting repeated utility patterns into custom classes, but it's easy to overuse. If you find yourself using `@apply` for every single component, you're probably doing it wrong.

Remember, the goal of Tailwind is to make it easy to build UIs quickly. If you're spending all your time writing custom CSS with `@apply`, you're not getting the full benefit of Tailwind.

### Use meaningful names

When you do create custom classes or components, make sure to use meaningful names. Don't just name them `btn` or `card`. Instead, use names that describe what the component does or what it represents.

For example, instead of `btn`, you might use `btn-primary` or `btn-secondary`. This makes your code more readable and easier to understand.

### Keep your CSS small

Tailwind CSS is designed to produce small CSS files. To keep your CSS small, make sure to only include the utilities you actually use. You can do this by using PurgeCSS or by configuring Tailwind to only include the utilities you need.

### Use a consistent workflow

Consistency is key when working with Tailwind CSS. Make sure everyone on your team is using the same workflow and best practices. This will help to keep your codebase clean and maintainable.

### Stay up to date

Tailwind CSS is constantly evolving. Make sure to stay up to date with the latest releases and best practices. This will help you to get the most out of Tailwind and avoid any potential issues.



# Detecting classes in source files

Understanding and customizing how Tailwind scans your source files.

## Overview

Tailwind works by scanning your project for utility classes, then generating all of the necessary CSS based on the classes you've actually used.

This makes sure your CSS is as small as possible, and is also what makes features like [arbitrary values](https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values) possible.

### How classes are detected

Tailwind treats all of your source files as plain text, and doesn't attempt to actually parse your files as code in any way.

Instead it just looks for any tokens in your file that could be classes based on which characters Tailwind is expecting in class names:

```jsx
export function Button({ color, children }) {
  const colors = {
    black: "bg-black text-white",
    blue: "bg-blue-500 text-white",
    white: "bg-white text-black",
  };
  return (
    <button className={`${colors[color]} rounded-full px-2 py-1.5 font-sans text-sm/6 font-medium shadow`}>
      {children}
    </button>
  );
}
```

Then it tries to generate the CSS for all of these tokens, throwing away any tokens that don't map to a utility class the framework knows about.

### Dynamic class names

Since Tailwind scans your source files as plain text, it has no way of understanding string concatenation or interpolation in the programming language you're using.

**Don't construct class names dynamically**

```html
<div class="text-{{ error ? 'red' : 'green' }}-600"></div>
```

In the example above, the strings `text-red-600` and `text-green-600` do not exist, so Tailwind will not generate those classes.

Instead, make sure any class names you’re using exist in full:

**Always use complete class names**

```html
<div class="{{ error ? 'text-red-600' : 'text-green-600' }}"></div>
```

If you're using a component library like React or Vue, this means you shouldn't use props to dynamically construct classes:

**Don't use props to build class names dynamically**

```jsx
function Button({ color, children }) {
  return <button className={`bg-${color}-600 hover:bg-${color}-500 ...`}>{children}</button>;
}
```

Instead, map props to complete class names that are statically detectable at build-time:

**Always map props to static class names**

```jsx
function Button({ color, children }) {
  const colorVariants = {
    blue: "bg-blue-600 hover:bg-blue-500",
    red: "bg-red-600 hover:bg-red-500",
  };
  return <button className={`${colorVariants[color]} ...`}>{children}</button>;
}
```

This has the added benefit of letting you map different prop values to different color shades for example:

```jsx
function Button({ color, children }) {
  const colorVariants = {
    blue: "bg-blue-600 hover:bg-blue-500 text-white",
    red: "bg-red-500 hover:bg-red-400 text-white",
    yellow: "bg-yellow-300 hover:bg-yellow-400 text-black",
  };
  return <button className={`${colorVariants[color]} ...`}>{children}</button>;
}
```

As long as you always use complete class names in your code, Tailwind will generate all of your CSS perfectly every time.

### Which files are scanned

Tailwind will scan every file in your project for class names, except in the following cases:

*   Files that are in your `.gitignore` file
*   Files in the `node_modules` directory
*   Binary files like images, videos, or zip files
*   CSS files
*   Common package manager lock files

If you need to scan any files that Tailwind is ignoring by default, you can [explicitly register](https://tailwindcss.com/docs/detecting-classes-in-source-files#explicitly-registering-sources) those sources.

## Explicitly registering sources

Use `@source` to explicitly register source paths relative to the stylesheet:

```css
@import "tailwindcss";

@source "../node_modules/@acmecorp/ui-lib";
```

This is especially useful when you need to scan an external library that is built with Tailwind, since dependencies are usually listed in your `.gitignore` file and ignored by Tailwind by default.

### Setting your base path

Tailwind uses the current working directory as its starting point when scanning for class names by default.

To set the base path for source detection explicitly, use the `source()` function when importing Tailwind in your CSS:

```css
@import "tailwindcss" source("../src");
```

This can be useful when working with monorepos where your build commands run from the root of the monorepo instead of the root of each project.

### Ignoring specific paths

Use `@source not` to ignore specific paths, relative to the stylesheet, when scanning for class names:

```css
@import "tailwindcss";

@source not "../src/components/legacy";
```

This is useful when you have large directories in your project that you know don't use Tailwind classes, like legacy components or third-party libraries.

### Disabling automatic detection

Use `source(none)` to completely disable automatic source detection if you want to register all of your sources explicitly:

```css
@import "tailwindcss" source(none);

@source "../admin";
@source "../shared";
```

This can be useful in projects that have multiple Tailwind stylesheets where you want to make sure each one only includes the classes each stylesheet needs.

## Safelisting specific utilities

If you need to make sure Tailwind generates certain class names that don’t exist in your content files, use `@source inline()` to force them to be generated:

```css
@import "tailwindcss";

@source inline("underline");
```

Generated CSS

```css
.underline {
  text-decoration-line: underline;
}
```

### Safelisting variants

You can also use `@source inline()` to generate classes with variants. For example, to generate the `underline` class with hover and focus variants, add `{hover:,focus:,}` to the source input:

```css
@import "tailwindcss";

@source inline("{hover:,focus:,}underline");
```

Generated CSS

```css
.underline {
  text-decoration-line: underline;
}

@media (hover: hover) {
  .hover\:underline:hover {
    text-decoration-line: underline;
  }
}

@media (focus: focus) {
  .focus\:underline:focus {
    text-decoration-line: underline;
  }
}
```

### Safelisting with ranges

The source input is [brace expanded](https://tailwindcss.com/docs/detecting-classes-in-source-files#brace-expansion), so you can generate multiple classes at once. For example, to generate all the red background colors with hover variants, use a range:

```css
@import "tailwindcss";

@source inline("{hover:,}bg-red-{50,{100..900..100},950}");
```

Generated CSS

```css
.bg-red-50 {
  background-color: var(--color-red-50);
}
.bg-red-100 {
  background-color: var(--color-red-100);
}
.bg-red-200 {
  background-color: var(--color-red-200);
}
/* ... */
.bg-red-800 {
  background-color: var(--color-red-800);
}
.bg-red-900 {
  background-color: var(--color-red-900);
}
.bg-red-950 {
  background-color: var(--color-red-950);
}

@media (hover: hover) {
  .hover\:bg-red-50:hover {
    background-color: var(--color-red-50);
  }
  /* ... */
  .hover\:bg-red-950:hover {
    background-color: var(--color-red-950);
  }
}
```

This generates red background colors from 100 to 900 in increments of 100, along with the first and last shades of 50 and 950. It also adds the `hover:` variant for each of those classes.

### Explicitly excluding classes

Use `@source not inline()` to prevent specific classes from being generated, even if they are detected in your source files:

```css
@import "tailwindcss";

@source not inline("{hover:,focus:,}bg-red-{50,{100..900..100},950}");
```

This will explicitly exclude the red background utilities, along with their hover and focus variants, from being generated.



# Functions and directives

A reference for the custom functions and directives Tailwind exposes to your CSS.

## Directives

Directives are custom Tailwind-specific [at-rules](https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule) you can use in your CSS that offer special functionality for Tailwind CSS projects.

### @import

Use the `@import` directive to inline import CSS files, including Tailwind itself:

```css
@import "tailwindcss";
```

### @theme

Use the `@theme` directive to define your project's custom design tokens, like fonts, colors, and breakpoints:

```css
@theme {
  --font-display: "Satoshi", "sans-serif";
  --breakpoint-3xl: 120rem;
  --color-avocado-100: oklch(0.99 0 0);
  --color-avocado-200: oklch(0.98 0.04 113.22);
  --color-avocado-300: oklch(0.94 0.11 115.03);
  --color-avocado-400: oklch(0.92 0.19 114.08);
  --color-avocado-500: oklch(0.84 0.18 117.33);
  --color-avocado-600: oklch(0.53 0.12 118.34);
  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);
  /* ... */
}
```

Learn more about customizing your theme in the [theme variables documentation](https://tailwindcss.com/docs/theme).

### @source

Use the `@source` directive to explicitly specify source files that aren't picked up by Tailwind's automatic content detection:

```css
@source "../node_modules/@my-company/ui-lib";
```

Learn more about automatic content detection in the [detecting classes in source files documentation](https://tailwindcss.com/docs/detecting-classes-in-source-files).

### @utility

Use the `@utility` directive to add custom utilities to your project that work with variants like `hover`, `focus` and `lg`:

```css
@utility tab-4 {
  tab-size: 4;
}
```

Learn more about registering custom utilities in the [adding custom utilities documentation](https://tailwindcss.com/docs/adding-custom-styles#adding-custom-utilities).

### @variant

Use the `@variant` directive to apply a Tailwind variant to styles in your CSS:

```css
.my-element {
  background: white;

  @variant dark {
    background: black;
  }
}
```

Learn more using variants in the [using variants documentation](https://tailwindcss.com/docs/adding-custom-styles#using-variants).

### @custom-variant

Use the `@custom-variant` directive to add a custom variant in your project:

```css
@custom-variant theme-midnight (&:where([data-theme="midnight"] *));
```

This lets you write utilities `theme-midnight:bg-black` and `theme-midnight:text-white`.

Learn more about adding custom variants in the [adding custom variants documentation](https://tailwindcss.com/docs/adding-custom-styles#adding-custom-variants).

### @apply

Use the `@apply` directive to inline any existing utility classes into your own custom CSS:

```css
.select2-dropdown {
  @apply rounded-b-lg shadow-md;
}
.select2-search {
  @apply rounded border border-gray-300;
}
.select2-results__group {
  @apply text-lg font-bold text-gray-900;
}
```

This is useful when you need to write custom CSS (like to override the styles in a third-party library) but still want to leverage Tailwind's utility classes. For example, you might use `@apply` to create a custom button component:

```html
<button class="btn btn-blue">Button</button>
```

### @reference

If you want to use `@apply` or `@variant` in the `<style>` block of a Vue or Svelte component, or within CSS modules, you will need to import your theme variables, custom utilities, and custom variants to make those values available in that context.

To do this without duplicating any CSS in your output, use the `@reference` directive to import your main stylesheet for reference without actually including the styles:

```vue
<template>
  <h1>Hello world!</h1>
</template>

<style>
  @reference "../../app.css";

  h1 {
    @apply text-2xl font-bold text-red-500;
  }
</style>
```

If you’re just using the default theme with no customizations, you can import `tailwindcss` directly:

```vue
<template>
  <h1>Hello world!</h1>
</template>

<style>
  @reference "tailwindcss";

  h1 {
    @apply text-2xl font-bold text-red-500;
  }
</style>
```

## Functions

Tailwind provides the following build-time functions to make working with colors and the spacing scale easier.

### --alpha()

Use the `--alpha()` function to adjust the opacity of a color:

Input CSS

```css
.my-element {
  color: --alpha(var(--color-lime-300) / 50%);
}
```

Compiled CSS

```css
.my-element {
  color: color-mix(in oklab, var(--color-lime-300) 50%, transparent);
}
```

### --spacing()

Use the `--spacing()` function to generate a spacing value based on your theme:

Input CSS

```css
.my-element {
  margin: --spacing(4);
}
```

Compiled CSS

```css
.my-element {
  margin: calc(var(--spacing) * 4);
}
```

This can also be useful in arbitrary values, especially in combination with `calc()`:

```html
<div class="py-[calc(--spacing(4)-1px)]">
  <!-- ... -->
</div>
```

## Compatibility

The following directives and functions exist solely for compatibility with Tailwind CSS v3.x.

The `@config` and `@plugin` directives may be used in conjunction with `@theme`, `@utility`, and other CSS-driven features. This can be used to incrementally move over your theme, custom configuration, utilities, variants, and presets to CSS. Things defined in CSS will be merged where possible and otherwise take precedence over those defined in configs, presets, and plugins.

### @config

Use the `@config` directive to load a legacy JavaScript-based configuration file:

```css
@config "../../tailwind.config.js";
```

The `corePlugins`, `safelist`, and `separator` options from the JavaScript-based config are not supported in v4.0. To safelist utilities in v4 use [`@source inline()`](https://tailwindcss.com/docs/detecting-classes-in-source-files#safelisting-specific-utilities).

### @plugin

Use the `@plugin` directive to load a legacy JavaScript-based plugin:

```css
@plugin "@tailwindcss/typography";
```

The `@plugin` directive accepts either a package name or a local path.

### theme()

Use the `theme()` function to access your Tailwind theme values using dot notation:

```css
.my-element {
  margin: theme(spacing.12);
}
```

This function is deprecated, and we recommend [using CSS theme variables](https://tailwindcss.com/docs/theme#referencing-other-theme-variables) instead.


