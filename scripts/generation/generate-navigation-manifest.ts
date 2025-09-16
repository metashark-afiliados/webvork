// scripts/generation/generate-navigation-manifest.ts
/**
 * @file generate-navigation-manifest.ts
 * @description Script de élite para descubrir y generar automáticamente el manifiesto
 *              de rutas `src/lib/navigation.ts`. Es semánticamente consciente de la
 *              estructura del App Router, incluyendo Grupos de Rutas.
 * @version 3.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";

const APP_DIR = path.resolve(process.cwd(), "src/app/[locale]");
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

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateKeyFromSegments(segments: string[]): string {
  if (segments.length === 0) return "home";
  const keyParts = segments.map((segment) =>
    segment
      .replace(/\[([^\]]+)\]/g, "By$1")
      .replace(/^./, (c) => c.toUpperCase())
  );
  const baseKey = toCamelCase(keyParts.join(""));
  return baseKey.charAt(0).toLowerCase() + baseKey.slice(1);
}

function discoverRoutes(
  dir: string,
  urlPath = "",
  keySegments: string[] = []
): RouteInfo[] {
  let routes: RouteInfo[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  if (entries.some((e) => e.isFile() && e.name === "page.tsx")) {
    const finalUrlPath = urlPath || "/";
    const key = generateKeyFromSegments(keySegments);
    const params = (finalUrlPath.match(/\[([^\]]+)\]/g) || []).map((p) =>
      p.slice(1, -1)
    );
    const type = finalUrlPath.startsWith("/dev") ? "DevOnly" : "Public";

    routes.push({ key, pathTemplate: finalUrlPath, params, type });
  }

  for (const entry of entries) {
    if (entry.isDirectory() && !IGNORED_ENTITIES.has(entry.name)) {
      const isRouteGroup = /^\(.*\)$/.test(entry.name);
      const newUrlPath = isRouteGroup ? urlPath : `${urlPath}/${entry.name}`;
      const newKeySegments = isRouteGroup
        ? keySegments
        : [...keySegments, entry.name];
      routes.push(
        ...discoverRoutes(
          path.join(dir, entry.name),
          newUrlPath,
          newKeySegments
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

      let pathLiteral = route.pathTemplate;
      route.params.forEach((param) => {
        pathLiteral = pathLiteral.replace(
          `[${param}]`,
          `\${params.${toCamelCase(param)}}`
        );
      });

      const pathFunction = `(params: ${paramsType}) => \`/\${params.locale || defaultLocale}${pathLiteral}\`.replace(/\\/\\/+/g, '/')`;

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
    const discoveredRoutes = discoverRoutes(APP_DIR);
    if (discoveredRoutes.length === 0) {
      console.warn(
        chalk.yellow(
          "⚠️ No se descubrieron rutas. Verifica la estructura de 'src/app/[locale]'."
        )
      );
      return;
    }

    // Ordena las rutas para un resultado predecible y limpio
    discoveredRoutes.sort((a, b) => a.key.localeCompare(b.key));

    const fileContent = generateNavigationFileContent(discoveredRoutes);
    fs.writeFileSync(OUTPUT_FILE, fileContent, "utf-8");

    console.log(
      chalk.green(
        `✅ Manifiesto de navegación generado con éxito en ${chalk.yellow(OUTPUT_FILE)}`
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
// scripts/generation/generate-navigation-manifest.ts
