// scripts/generation/generate-navigation-manifest.ts
/**
 * @file generate-navigation-manifest.ts
 * @description Script de élite para descubrir y generar automáticamente el manifiesto
 *              de rutas `src/lib/navigation.ts`. Es semánticamente consciente de la
 *              estructura del App Router, incluyendo Grupos de Rutas y segmentos dinámicos.
 *              Esta versión es más robusta y verbosa, asegurando la creación del
 *              directorio de salida y mejorando el diagnóstico de errores.
 * @version 3.6.0 (Robust File Writing & Verbose Error Handling)
 * @author RaZ Podestá - MetaShark Tech
 */
import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";

// La raíz del App Router de Next.js es `app`.
const APP_ROOT_DIR = path.resolve(process.cwd(), "app");
const OUTPUT_FILE = path.resolve(process.cwd(), "src/lib/navigation.ts");
const IGNORED_ENTITIES = new Set([
  "_components",
  "_hooks",
  "_lib",
  "favicon.ico",
  "sitemap.ts",
  "layout.tsx",
  "loading.tsx",
  "error.tsx",
  "global-error.tsx",
  "not-found.tsx",
  "api", // Ignorar el directorio /api para la navegación de páginas
]);

interface RouteInfo {
  key: string;
  pathTemplate: string;
  params: string[];
  type: "Public" | "DevOnly";
}

function toCamelCase(str: string): string {
  return str.replace(/[-_](.)/g, (_, char) => char.toUpperCase());
}

function generateKeyFromSegments(segments: string[]): string {
  const relevantSegments =
    segments[0] === "[locale]" ? segments.slice(1) : segments;
  if (relevantSegments.length === 0) return "home";

  const keyParts = relevantSegments.map((segment) =>
    segment
      .replace(/\[([^\]]+)\]/g, "By$1")
      .replace(/^\(.*\)$/, "")
      .replace(/^./, (c) => c.toUpperCase())
  );
  const filteredKeyParts = keyParts.filter((part) => part !== "");

  const baseKey = toCamelCase(filteredKeyParts.join(""));
  return baseKey.charAt(0).toLowerCase() + baseKey.slice(1);
}

function discoverRoutes(
  currentDir: string,
  relativePathSegments: string[] = [] // Segments relative to APP_ROOT_DIR
): RouteInfo[] {
  const routes: RouteInfo[] = [];
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(currentDir, { withFileTypes: true });
  } catch (error) {
    console.error(
      chalk.red(
        `[Generator Error] No se pudo escanear el directorio: ${currentDir}.`
      )
    );
    throw error; // Re-lanzar para que el main lo capture
  }

  const hasPageFile = entries.some((e) => e.isFile() && e.name === "page.tsx");
  const pathTemplate = "/" + relativePathSegments.join("/");

  if (hasPageFile) {
    const key = generateKeyFromSegments(relativePathSegments);
    const paramsInPathTemplate = (
      pathTemplate.match(/\[([^\]]+)\]/g) || []
    ).map((p) => p.slice(1, -1));
    const type = relativePathSegments.includes("(dev)") ? "DevOnly" : "Public";

    routes.push({
      key,
      pathTemplate: pathTemplate,
      params: paramsInPathTemplate,
      type,
    });
  }

  for (const entry of entries) {
    if (entry.isDirectory() && !IGNORED_ENTITIES.has(entry.name)) {
      const isRouteGroup = /^\(.*\)$/.test(entry.name);
      const nextRelativePathSegments = isRouteGroup
        ? relativePathSegments
        : [...relativePathSegments, entry.name];

      routes.push(
        ...discoverRoutes(
          path.join(currentDir, entry.name),
          nextRelativePathSegments
        )
      );
    }
  }

  return routes;
}

function generateNavigationFileContent(routes: RouteInfo[]): string {
  const routesObjectContent = routes
    .map((route) => {
      const hasParams = route.params.length > 0;
      const paramsType = hasParams
        ? `RouteParams & { ${route.params.map((p) => `${toCamelCase(p)}: string | number`).join("; ")} }`
        : "RouteParams";

      let pathFunctionBody = route.pathTemplate;

      route.params.forEach((param) => {
        pathFunctionBody = pathFunctionBody.replace(
          `[${param}]`,
          `\${params.${toCamelCase(param)}}`
        );
      });

      const pathFunction = `(params: ${paramsType}) => \`/\${params.locale || defaultLocale}${pathFunctionBody}\`.replace(/\\/\\/+/g, '/').replace(/\\/$/, '') || '/'`;

      return `
  ${route.key}: {
    path: ${pathFunction},
    type: RouteType.${route.type},
  }`;
    })
    .join(",");

  return `// src/lib/navigation.ts
/**
 * @file navigation.ts
 * @description Manifiesto y SSoT para la definición de rutas.
 *              ESTE ARCHIVO ES GENERADO AUTOMÁTICAMENTE. NO LO EDITE MANUALMENTE.
 *              Ejecute 'pnpm gen:routes' para actualizarlo.
 * @version ${new Date().toISOString()}
 * @author Script de Generación Automática de Élite
 */
import { defaultLocale, type Locale } from "@/lib/i18n.config";

export const RouteType = {
  Public: "public",
  DevOnly: "dev-only",
} as const;

export type RouteType = (typeof RouteType)[keyof typeof RouteType];

export type RouteParams = {
  locale?: Locale;
  [key: string]: string | number | undefined;
};

export const routes = {${routesObjectContent}
} as const;
`;
}

function main() {
  console.log(
    chalk.blue.bold("🚀 Iniciando Generador de Manifiesto de Rutas de Élite...")
  );
  try {
    // --- [INICIO DE CORRECCIÓN DEFINITIVA DE RUTA DE ESCANEO] ---
    // La ruta base de escaneo es directamente `app/[locale]` para Next.js App Router.
    // Esto se construye uniendo `APP_ROOT_DIR` con `[locale]`.
    const appLocalePath = path.join(APP_ROOT_DIR, "[locale]");
    console.log(chalk.gray(`   Escaneando directorio base: ${appLocalePath}`));

    const discoveredRoutes = discoverRoutes(appLocalePath, ["[locale]"]);
    // --- [FIN DE CORRECCIÓN DEFINITIVA DE RUTA DE ESCANEO] ---

    if (discoveredRoutes.length === 0) {
      console.warn(
        chalk.yellow(
          "⚠️ No se descubrieron rutas. Verifica la estructura de 'app/[locale]'."
        )
      );
    }

    discoveredRoutes.sort((a, b) => a.key.localeCompare(b.key));

    // --- [INICIO DE CORRECCIÓN: Crear directorio padre si no existe] ---
    const outputDirPath = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDirPath)) {
      console.log(
        chalk.gray(`   Creando directorio de salida: ${outputDirPath}`)
      );
      fs.mkdirSync(outputDirPath, { recursive: true });
    }
    // --- [FIN DE CORRECCIÓN] ---

    const fileContent = generateNavigationFileContent(discoveredRoutes);
    fs.writeFileSync(OUTPUT_FILE, fileContent, "utf-8");

    console.log(
      chalk.green(
        `✅ Manifiesto de navegación generado con éxito en ${chalk.yellow(path.relative(process.cwd(), OUTPUT_FILE))}`
      )
    );
    console.log(
      chalk.cyan(
        `   Total de ${discoveredRoutes.length} rutas descubiertas y registradas.`
      )
    );
  } catch (error) {
    console.error(
      chalk.red.bold("🔥 Error crítico durante la generación del manifiesto:"),
      error
    );
    process.exit(1);
  }
}

main();
