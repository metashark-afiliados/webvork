Manual de Configuración de Archivos Base de Tailwind CSS 4.0 
Este manual proporciona una guía detallada sobre cómo configurar los archivos base para un proyecto de Tailwind CSS 4.0, incluyendo postcss.config.mjs , tailwind.config.js y la configuración para la última versión de Next.js. 
Configuración de PostCSS ( postcss.config.mjs ) 
Cuando se utiliza Tailwind CSS con PostCSS, es necesario configurar el plugin @tailwindcss/postcss en tu archivo postcss.config.mjs . 
// postcss.config.mjs 
export default { 
plugins: { 
"@tailwindcss/postcss": {}, 
}, 
}; 
Importar Tailwind CSS 
En tu archivo CSS principal (por ejemplo, input.css ), importa Tailwind CSS utilizando la directiva @import . 
/* input.css */ 
@import "tailwindcss"; 
Este @import se encargará de incluir las directivas @tailwind base , @tailwind components y @tailwind utilities por ti.
Configuración de Vite 
Si estás utilizando Vite, la configuración es aún más sencilla con el plugin @tailwindcss/vite . 
// vite.config.ts 
import { defineConfig } from 'vite' 
import tailwindcss from '@tailwindcss/vite' 
export default defineConfig({ 
plugins: [ 
tailwindcss(), 
], 
}) 
En este caso, no es necesario un archivo postcss.config.mjs a menos que necesites usar otros plugins de PostCSS. 
Configuración del Tema ( @theme y 
tailwind.config.js ) 
Tailwind CSS 4.0 introduce un enfoque de configuración "CSS-first", donde muchas de las configuraciones se realizan directamente en tu archivo CSS principal utilizando la directiva @theme . Sin embargo, para configuraciones más avanzadas o para integrar con ciertas herramientas (como Next.js), aún puedes utilizar un archivo tailwind.config.js (o tailwind.config.mjs ). 
Uso de @theme (Configuración CSS-first) 
Tailwind CSS 4.0 utiliza variables de tema ( @theme ) para definir los tokens de diseño de tu proyecto, como colores, tipografía, sombras, etc. Estas variables influyen en las clases de utilidad que se generan. 
// app.css 
@import "tailwindcss"; 
@theme { 
--color-mint-500: oklch(0.72 0.11 178); 
--font-poppins: Poppins, sans-serif; 
--breakpoint-3xl: 120rem; 
}
--color-* : Define colores (ej. --color-mint-500 para bg-mint-500 ). --font-* : Define familias de fuentes (ej. --font-poppins para font-poppins ). 
--breakpoint-* : Define puntos de interrupción responsivos (ej. --breakpoint 3xl para 3xl: ). 
Para una lista completa de los namespaces de variables de tema, consulta la documentación oficial de Tailwind CSS 4.0. 
Uso de tailwind.config.js (o tailwind.config.mjs ) 
Aunque la configuración principal se realiza con @theme , puedes seguir utilizando un archivo tailwind.config.js para extender o personalizar el tema, o para configurar plugins. En Tailwind CSS 4.0, este archivo se utiliza principalmente para la directiva @config en tu CSS. 
// tailwind.config.js (o tailwind.config.mjs) 
/** @type {import('tailwindcss').Config} */ 
export default { 
content: [ 
'./app/**/*.{js,ts,jsx,tsx,mdx}', 
'./pages/**/*.{js,ts,jsx,tsx,mdx}', 
'./components/**/*.{js,ts,jsx,tsx,mdx}', 
], 
theme: { 
extend: {}, 
}, 
plugins: [], 
} 
Para que Tailwind CSS reconozca este archivo de configuración, debes referenciarlo en tu CSS principal usando la directiva @config : 
/* app.css */ 
@import "tailwindcss"; 
@config "./tailwind.config.js"; /* O "./tailwind.config.mjs" */ 
@theme { 
/* ... tus variables de tema ... */ 
}
Configuración para Next.js (Última Versión) 
Para integrar Tailwind CSS 4.0 con la última versión de Next.js, los pasos son los siguientes: 
1. Instalar las dependencias: 
bash npm install -D tailwindcss@next @tailwindcss/postcss postcss 2. Crear postcss.config.mjs : 
javascript // postcss.config.mjs export default { plugins: { "@tailwindcss/postcss": {}, }, }; 
3. Crear tailwind.config.js (opcional, pero recomendado para content ): 
javascript // tailwind.config.js /** @type {import('tailwindcss').Config} */ module.exports = { content: [ './app/**/*.{js,ts,jsx,tsx,mdx}', './pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', ], theme: { extend: {}, }, plugins: [], } 
4. Importar Tailwind CSS en tu CSS global: 
Crea un archivo CSS global (por ejemplo, app/globals.css si usas el App Router de Next.js) e importa Tailwind CSS: 
```css / app/globals.css / @import "tailwindcss"; @config "../../tailwind.config.js"; / Ajusta la ruta según tu estructura / 
@theme { / Tus variables de tema personalizadas / } ``` 
Asegúrate de importar este archivo CSS global en tu layout.js o _app.js (para Pages Router). 
5. Ejecutar el comando de desarrollo de Next.js: 
bash npm run dev 
Tailwind CSS escaneará automáticamente los archivos especificados en la propiedad content de tailwind.config.js y generará los estilos necesarios.